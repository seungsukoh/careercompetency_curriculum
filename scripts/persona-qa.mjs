import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appPath = path.join(rootDir, "app.js");
const baseDataPath = path.join(rootDir, "data", "baseData.js");
const expansionPath = path.join(rootDir, "data", "roleExpansions.js");

const appSource = fs.readFileSync(appPath, "utf8")
  .replace(/^import\s+\{[\s\S]*?\}\s+from\s+["']\.\/data\/baseData\.js["'];\s*/m, "");
const baseDataSource = fs.readFileSync(baseDataPath, "utf8")
  .replace(/^import\s+\{\s*applyRoleExpansions\s*\}\s+from\s+["']\.\/roleExpansions\.js["'];\s*/m, "")
  .replace(/\nexport\s+\{[\s\S]*?\};\s*$/m, "");
const expansionSource = fs.readFileSync(expansionPath, "utf8")
  .replace("export function applyRoleExpansions", "function applyRoleExpansions");

const personaCases = [
  {
    id: "undecided-before-check",
    name: "직무 미확신/역량 체크 전 학생",
    trackId: "embedded-control",
    roleId: "embedded-firmware-engineer",
    major: "computer",
    industry: "mobility",
    durationWeeks: "4",
    checked: "none",
    expectedTitle: "역량 체크 전 학생",
    expectedPathway: "direct"
  },
  {
    id: "short-window",
    name: "단기 준비 학생",
    trackId: "embedded-control",
    roleId: "embedded-firmware-engineer",
    major: "computer",
    industry: "mobility",
    durationWeeks: "2",
    checked: "all",
    expectedTitle: "단기 준비 학생",
    expectedPathway: "direct"
  },
  {
    id: "major-extension",
    name: "전공 확장 학생",
    trackId: "data-center-infra",
    roleId: "data-center-electrical-infra-engineer",
    major: "electrical",
    industry: "infrastructure",
    durationWeeks: "4",
    checked: "all",
    expectedTitle: "전공 확장 학생",
    expectedPathway: "bridge"
  },
  {
    id: "challenge-role",
    name: "도전 직무 학생",
    trackId: "autonomous-sdv",
    roleId: "autonomous-perception-engineer",
    major: "mechanical",
    industry: "mobility",
    durationWeeks: "4",
    checked: "all",
    expectedTitle: "도전 직무 학생",
    expectedPathway: "challenge"
  },
  {
    id: "foundation-gap",
    name: "기초 보완 학생",
    trackId: "production-quality",
    roleId: "quality-engineer",
    major: "industrial",
    industry: "manufacturing",
    durationWeeks: "4",
    checked: 1,
    expectedTitle: "기초 보완 학생",
    expectedPathway: "direct"
  },
  {
    id: "execution-plan",
    name: "실행 계획 학생",
    trackId: "production-quality",
    roleId: "quality-engineer",
    major: "industrial",
    industry: "manufacturing",
    durationWeeks: "4",
    checked: "all",
    saved: ["coursera-six-sigma-quality"],
    expectedTitle: "실행 계획 학생",
    expectedPathway: "direct"
  },
  {
    id: "direct-major",
    name: "전공 직결 학생",
    trackId: "production-quality",
    roleId: "quality-engineer",
    major: "industrial",
    industry: "manufacturing",
    durationWeeks: "4",
    checked: "all",
    expectedTitle: "전공 직결 학생",
    expectedPathway: "direct"
  }
];

const sandbox = {
  console,
  document: {
    addEventListener: () => {},
    querySelectorAll: () => [],
    querySelector: () => null
  },
  localStorage: {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
  },
  navigator: {
    serviceWorker: {
      getRegistrations: () => Promise.resolve([])
    }
  },
  window: {
    confirm: () => true,
    matchMedia: () => ({ matches: false })
  },
  setTimeout: () => 0,
  clearTimeout: () => {},
  requestAnimationFrame: (listener) => {
    if (typeof listener === "function") listener();
    return 1;
  },
  cancelAnimationFrame: () => {}
};
sandbox.globalThis = sandbox;
sandbox.window.window = sandbox.window;

vm.createContext(sandbox);
vm.runInContext(`
${expansionSource}
${baseDataSource}
${appSource}

function buildCheckedState(track, mode) {
  const items = getDiagnosticItems(track);
  if (mode === "none") return {};
  const checked = {};
  const count = mode === "all" ? items.length : Math.max(0, Number(mode) || 0);
  items.slice(0, count).forEach((item) => {
    checked[item.id] = true;
  });
  return checked;
}

function collectTaskResources(track, tasks, context) {
  const useCounts = new Map();
  return tasks.slice(0, 2).map((task) => {
    const taskResources = getRoadmapResourcesForTask(track, task, context, useCounts);
    taskResources.forEach((resource) => {
      useCounts.set(resource.id, (useCounts.get(resource.id) || 0) + 1);
    });
    return {
      title: task.title,
      resources: taskResources.map((resource) => resource.title)
    };
  });
}

function runPersonaCase(config) {
  state = {
    ...defaultState,
    selectedTrackId: config.trackId,
    hasSelectedRoleSelection: true,
    view: "roadmap",
    profile: {
      ...defaultState.profile,
      major: config.major,
      industry: config.industry,
      durationWeeks: config.durationWeeks
    },
    selectedRoles: { [config.trackId]: config.roleId },
    checked: {},
    saved: config.saved || [],
    completed: [],
    completedRoadmap: [],
    postingText: ""
  };

  const track = getSelectedTrack();
  const role = getSelectedRole(track.id);
  state.checked = buildCheckedState(track, config.checked);
  const diagnosticItems = getDiagnosticItems(track);
  const tasks = getVisibleRoadmapTasks(track.id);
  const context = getRecommendationContext(track, getGapSkills(track.id), tasks);
  const personaReview = getStudentPersonaReview(context);
  const expertReview = getExpertCurriculumReview(context, tasks);
  const pathway = getMajorPathway(track, role);
  const firstTwoWeeks = collectTaskResources(track, tasks, context);
  const firstTwoResourceTitles = firstTwoWeeks.flatMap((week) => week.resources);
  const duplicateFirstTwoResources = firstTwoResourceTitles.filter((title, index) => (
    firstTwoResourceTitles.indexOf(title) !== index
  ));
  const panelHtml = renderPersonaExpertAuditPanel(context, tasks);
  const panelLabels = [
    "직무 미확신 학생",
    "전공 직결 학생",
    "전공 확장 학생",
    "도전 직무 학생",
    "단기 준비 학생"
  ];

  const failures = [];
  if (!role || role.id !== config.roleId) failures.push("selected role mismatch");
  if (personaReview.title !== config.expectedTitle) {
    failures.push("expected persona " + config.expectedTitle + " but got " + personaReview.title);
  }
  if (pathway !== config.expectedPathway) {
    failures.push("expected pathway " + config.expectedPathway + " but got " + pathway);
  }
  if (!tasks.length) failures.push("no visible roadmap tasks");
  if (firstTwoWeeks.some((week) => !week.resources.length)) {
    failures.push("first two weeks include an empty education recommendation");
  }
  if (duplicateFirstTwoResources.length) {
    failures.push("duplicate education across first two weeks: " + duplicateFirstTwoResources.join(", "));
  }
  if (expertReview.title !== "교육 매핑 확인") {
    failures.push("expert review did not confirm education mapping: " + expertReview.title);
  }
  panelLabels.forEach((label) => {
    if (!panelHtml.includes(label)) failures.push("persona audit panel missing " + label);
  });

  return {
    id: config.id,
    name: config.name,
    roleTitle: role?.title || "",
    pathway,
    personaTitle: personaReview.title,
    checkedCount: context.acquiredSkills.length,
    gapCount: context.gapSkills.length,
    savedCount: getSavedResources().length,
    firstTwoWeeks,
    expertReviewTitle: expertReview.title,
    failures
  };
}

globalThis.__personaQa = {
  run() {
    return ${JSON.stringify(personaCases)}.map(runPersonaCase);
  }
};
`, sandbox, { filename: "persona-qa.vm.js" });

const results = sandbox.__personaQa.run();
const failures = results.flatMap((result) => (
  result.failures.map((failure) => `${result.name}: ${failure}`)
));

console.log("Persona QA summary:");
console.log(JSON.stringify({
  personas: results.length,
  failures: failures.length,
  results: results.map((result) => ({
    id: result.id,
    personaTitle: result.personaTitle,
    pathway: result.pathway,
    checkedCount: result.checkedCount,
    gapCount: result.gapCount,
    savedCount: result.savedCount,
    firstTwoWeekResourceCounts: result.firstTwoWeeks.map((week) => week.resources.length)
  }))
}, null, 2));

if (failures.length) {
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
