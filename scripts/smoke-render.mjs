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

class FakeElement {
  constructor(id = "") {
    this.id = id;
    this.value = "";
    this.textContent = "";
    this.innerHTML = "";
    this.dataset = {};
    this.style = {};
    this.checked = false;
    this.selectedIndex = 0;
    this.options = [{ textContent: "", value: "" }];
    this.classList = {
      add: () => {},
      remove: () => {},
      toggle: () => {},
      contains: () => false
    };
  }

  addEventListener() {}
  appendChild() {}
  remove() {}
  click() {}
  focus() {}
  scrollIntoView() {}
  querySelector() { return null; }
  querySelectorAll() { return []; }
  setAttribute(name, value) { this[name] = value; }
  getAttribute(name) { return this[name] ?? null; }
}

const elementsById = new Map();
const getElement = (id) => {
  if (!elementsById.has(id)) elementsById.set(id, new FakeElement(id));
  return elementsById.get(id);
};

const sandbox = {
  console,
  localStorage: {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
  },
  document: {
    addEventListener: () => {},
    getElementById: getElement,
    querySelector: () => null,
    querySelectorAll: () => [],
    createElement: (tagName) => new FakeElement(tagName),
    body: new FakeElement("body")
  },
  window: {
    addEventListener: () => {},
    matchMedia: () => ({ matches: false })
  },
  navigator: {},
  Blob: class {},
  URL: {
    createObjectURL: () => "",
    revokeObjectURL: () => {}
  },
  setTimeout: () => 0,
  clearTimeout: () => {},
  requestAnimationFrame: () => 0,
  cancelAnimationFrame: () => {}
};
sandbox.globalThis = sandbox;

vm.createContext(sandbox);
vm.runInContext(`
${expansionSource}
${baseDataSource}
${appSource}

globalThis.__renderSmoke = {
  renderScenario(config) {
    bindElements();
    state = {
      ...defaultState,
      selectedTrackId: config.trackId,
      hasSelectedRoleSelection: true,
      currentView: config.currentView || "tracks",
      profile: {
        ...defaultState.profile,
        major: config.major,
        industry: config.industry,
        durationWeeks: config.durationWeeks || "4"
      },
      selectedRoles: { [config.trackId]: config.roleId },
      checked: config.checked || {},
      saved: config.saved || [],
      completed: [],
      completedRoadmap: []
    };
    render();
    return {
      selectedRoleOverview: elements.selectedRoleOverview.innerHTML,
      roadmapList: elements.roadmapList.innerHTML,
      savedList: elements.savedList.innerHTML,
      trackDetail: elements.trackDetail.innerHTML,
      headerStatus: elements.headerStatus.textContent
    };
  }
};
`, sandbox, { filename: "render-smoke.vm.js" });

const scenarios = [
  {
    name: "role overview separates major, work, and education",
    config: {
      trackId: "aerospace-defense",
      roleId: "uav-flight-control-engineer",
      major: "mechanical",
      industry: "aerospace",
      durationWeeks: "4"
    },
    assertions: [
      ["selectedRoleOverview", "전공"],
      ["selectedRoleOverview", "상세직무내용"],
      ["selectedRoleOverview", "직무 관련 교육"],
      ["roadmapList", "추천 교육·실습자료"]
    ]
  },
  {
    name: "posting-fit empty state is explicit",
    config: {
      trackId: "chemical-sustainability",
      roleId: "hydrogen-process-engineer",
      major: "chemical",
      industry: "environment",
      durationWeeks: "4"
    },
    assertions: [
      ["roadmapList", "공통 broad 교육 대신"],
      ["roadmapList", "공고 키워드"]
    ]
  },
  {
    name: "extended roadmap explains repeat weeks",
    config: {
      trackId: "autonomous-sdv",
      roleId: "sensor-fusion-localization-engineer",
      major: "electrical",
      industry: "mobility",
      durationWeeks: "8"
    },
    assertions: [
      ["roadmapList", "반복·보강"],
      ["savedList", "반복·보강"]
    ]
  }
];

const failures = [];

scenarios.forEach((scenario) => {
  const result = sandbox.__renderSmoke.renderScenario(scenario.config);
  scenario.assertions.forEach(([field, expected]) => {
    if (!String(result[field] || "").includes(expected)) {
      failures.push(`${scenario.name}: expected ${field} to include "${expected}"`);
    }
  });
});

if (failures.length) {
  console.error("Render smoke failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Render smoke passed: ${scenarios.length} scenarios`);
