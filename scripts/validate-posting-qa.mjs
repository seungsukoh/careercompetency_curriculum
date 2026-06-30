import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appPath = path.join(rootDir, "app.js");
const expansionPath = path.join(rootDir, "data", "roleExpansions.js");

const appSource = fs.readFileSync(appPath, "utf8")
  .replace(/^import\s+\{\s*applyRoleExpansions\s*\}\s+from\s+["']\.\/data\/roleExpansions\.js["'];\s*/m, "");
const expansionSource = fs.readFileSync(expansionPath, "utf8")
  .replace("export function applyRoleExpansions", "function applyRoleExpansions");

const fixtures = [
  {
    id: "pm-ai",
    label: "예지보전 AI 공고",
    major: "mechanical",
    industry: "ai",
    trackId: "ai-engineering",
    roleId: "predictive-maintenance-ai-engineer",
    minScore: 80,
    expectedMatches: ["예지보전", "이상탐지", "센서데이터", "시계열", "정비이력"],
    expectedResourceIds: ["mathworks-predictive-maintenance", "machine-learning-onramp", "google-ml-crash-course"],
    expectedTodayResourceIds: ["mathworks-predictive-maintenance"],
    forbiddenResourceIds: ["mathworks-ros-toolbox-examples", "nvidia-jetson-ai-course"],
    postingText: "담당업무: 설비 센서데이터와 정비이력을 활용한 예지보전 모델 개발, 이상탐지 및 시계열 분석. Python 기반 데이터 전처리와 현장 설비 로그 분석, 고장 예측 모델 검증. 자격요건: 공정데이터 분석, 머신러닝 기초, 통계 지식. 우대사항: MLOps, 대시보드, 제조 설비 이해."
  },
  {
    id: "pcb-layout",
    label: "PCB 설계 공고",
    major: "electrical",
    industry: "electronics",
    trackId: "electronics-pcb",
    roleId: "pcb-design-engineer",
    minScore: 65,
    expectedMatches: ["PCB Layout", "Stack-up", "리턴패스", "return path", "EMC", "디커플링"],
    expectedResourceIds: ["kicad-pcb-docs", "ti-power-management-training", "youtube-emc-emi-basics"],
    postingText: "담당업무: PCB Layout 검토, Stack-up 설계, 리턴패스와 디커플링 검토, EMC/EMI 개선. 자격요건: 회로이론, 전원회로, PCB CAD 사용 경험. 우대사항: Altium, OrCAD, 신호 무결성, 측정 장비 활용."
  },
  {
    id: "hil-sil",
    label: "차량 HIL/SIL 검증 공고",
    major: "electrical",
    industry: "mobility",
    trackId: "automotive-mobility",
    roleId: "hil-sil-validation-engineer",
    minScore: 55,
    expectedMatches: ["HIL", "SIL", "Test Case", "CANoe", "요구사항검증"],
    expectedResourceIds: ["mathworks-simulink-test-manager", "mathworks-fault-tolerant-fuel-control", "ni-learn-test-measurement"],
    expectedTodayResourceIds: ["mathworks-simulink-test-manager"],
    postingText: "담당업무: 차량 제어기 HIL/SIL 검증, Test Case 작성, CANoe 기반 요구사항검증, 시뮬레이션 환경 구축. 자격요건: Simulink, Stateflow, CAN 통신 이해. 우대사항: dSPACE, NI VeriStand, 자동화 스크립트."
  },
  {
    id: "semiconductor-etch",
    label: "반도체 식각 공정 공고",
    major: "chemical",
    industry: "semiconductor",
    trackId: "semiconductor-equipment",
    roleId: "etch-process-engineer",
    minScore: 70,
    expectedMatches: ["Etch", "식각", "Plasma", "RF power", "RF 파워", "Selectivity", "선택비"],
    expectedResourceIds: ["kocw-semiconductor-process-cbnu", "mit-semiconductor-devices", "moresteam-doe"],
    postingText: "담당업무: Etch 공정 Recipe 조건 변경, Plasma RF power 조정, Selectivity 및 CD 관리, 공정개선과 수율 분석. 자격요건: 반도체 공정, 식각, 계측 데이터 해석. 우대사항: DOE, SPC, JMP, Wafer map 분석."
  },
  {
    id: "process-safety",
    label: "공정안전·환경 공고",
    major: "chemical",
    industry: "chemical",
    trackId: "chemical-process",
    roleId: "process-safety-engineer",
    minScore: 55,
    expectedMatches: ["PSM", "HAZOP", "MSDS", "환경안전", "Risk Assessment", "hazard assessment"],
    expectedResourceIds: ["youtube-nptel-hazop", "aiche-ccps-process-safety-beacon", "learncheme-chemical-process"],
    postingText: "담당업무: PSM 운영, HAZOP 검토, MSDS 기반 화학물질 위험성 평가, 환경안전 및 사고 예방 대책 수립. 자격요건: 공정안전, 화학공정 이해. 우대사항: KOSHA, 안전보건 규정 대응."
  },
  {
    id: "quality",
    label: "품질보증·품질관리 공고",
    major: "mechanical",
    industry: "manufacturing",
    trackId: "production-quality",
    roleId: "quality-engineer",
    minScore: 60,
    expectedMatches: ["SPC", "Cpk", "FMEA", "8D", "ISO/IATF"],
    expectedResourceIds: ["nist-control-charts", "nist-process-capability", "asq-fmea", "asq-eight-d"],
    postingText: "담당업무: 품질보증, SPC 관리도 운영, Cpk 공정능력 분석, FMEA 및 8D 개선 보고서 작성. 자격요건: ISO/IATF 이해, 통계 분석, 계측 데이터 해석. 우대사항: Minitab, 고객 클레임 대응."
  },
  {
    id: "battery-process",
    label: "배터리 공정 공고",
    major: "chemical",
    industry: "battery",
    trackId: "chemical-process",
    roleId: "battery-process-engineer",
    minScore: 60,
    expectedMatches: ["전극공정", "슬러리", "mixing", "코팅", "drying", "calendering", "조립", "수율"],
    expectedResourceIds: ["statistics-onramp", "moresteam-doe", "learncheme-material-balances"],
    postingText: "담당업무: 전극공정 슬러리 혼합, 코팅 조건 최적화, 건조와 캘린더링 조건 관리, 조립 공정 수율 개선, Recipe 조건변경. 자격요건: 배터리 소재와 화학공정 이해, DOE 실험계획, 품질 데이터 분석. 우대사항: Scale-up, 양산 공정 경험."
  },
  {
    id: "vehicle-thermal",
    label: "차량 열관리 공고",
    major: "mechanical",
    industry: "mobility",
    trackId: "automotive-mobility",
    roleId: "vehicle-thermal-management-engineer",
    minScore: 60,
    expectedMatches: ["열관리", "냉각회로", "coolant loop", "HVAC", "배터리온도", "battery thermal", "CFD"],
    expectedResourceIds: ["ansys-innovation-courses", "simscape-onramp", "youtube-skilllync-ev-crash-course"],
    postingText: "담당업무: 차량 열관리 시스템 개발, 냉각회로 설계, HVAC 성능 검증, 배터리온도 관리, CFD 해석. 자격요건: 열전달, 유체역학, 시험 데이터 분석. 우대사항: Simscape, GT-SUITE, 열해석 경험."
  },
  {
    id: "ev-power",
    label: "EV 전력전자 공고",
    major: "electrical_power",
    industry: "mobility",
    trackId: "automotive-mobility",
    roleId: "ev-power-electronics-engineer",
    minScore: 60,
    expectedMatches: ["인버터", "inverter", "OBC", "DC-DC", "전력전자", "게이트드라이브", "gate driver"],
    expectedResourceIds: ["kocw-power-electronics-system-analysis", "mathworks-simscape-electrical", "youtube-emc-emi-basics"],
    postingText: "담당업무: EV 인버터, OBC, DC-DC 컨버터 회로 검토, 게이트드라이브 설계, 전력전자 효율 및 Thermal 검증. 자격요건: 전력전자, 회로이론, EMI 대책. 우대사항: PLECS, SPICE, Simscape Electrical."
  },
  {
    id: "production-data",
    label: "생산 데이터 분석 공고",
    major: "mechanical",
    industry: "manufacturing",
    trackId: "production-quality",
    roleId: "production-data-engineer",
    minScore: 65,
    expectedMatches: ["MES", "공정데이터", "Python", "SQL", "Pareto"],
    expectedResourceIds: ["machine-learning-onramp", "coursera-engineering-data", "freecodecamp-python-data"],
    expectedTodayResourceIds: ["nist-control-charts"],
    expectedTodayEvidenceLabels: ["보완 역량", "자료 신뢰"],
    postingText: "담당업무: MES 공정데이터 수집, Python SQL 기반 불량 Pareto 분석, 대시보드 구축, 설비 데이터 이상 패턴 탐지. 자격요건: 통계, 데이터 전처리, 제조 공정 이해. 우대사항: Power BI, Tableau, Spotfire."
  },
  {
    id: "production-data-advanced",
    label: "생산 데이터 분석 공고 - 기초 체크 완료",
    major: "mechanical",
    industry: "manufacturing",
    trackId: "production-quality",
    roleId: "production-data-engineer",
    minScore: 65,
    checkedSkills: ["통계", "SPC", "데이터 분석", "데이터 전처리", "MES/SQL", "Pareto"],
    expectedMatches: ["MES", "공정데이터", "Python", "SQL", "Pareto"],
    expectedResourceIds: ["machine-learning-onramp", "coursera-engineering-data", "freecodecamp-python-data"],
    expectedTodayResourceIds: ["machine-learning-onramp"],
    expectedTodayEvidenceLabels: ["공고 신호", "체크 반영", "자료 신뢰"],
    postingText: "담당업무: MES 공정데이터 수집, Python SQL 기반 불량 Pareto 분석, 대시보드 구축, 설비 데이터 이상 패턴 탐지. 자격요건: 통계, 데이터 전처리, 제조 공정 이해. 우대사항: Power BI, Tableau, Spotfire."
  }
];

const sandbox = {
  console,
  localStorage: {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
  },
  document: {
    addEventListener: () => {},
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null
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
${appSource}
globalThis.__runPostingQaCase = function runPostingQaCase(fixture) {
  state = {
    ...defaultState,
    profile: {
      ...defaultState.profile,
      major: fixture.major,
      industry: fixture.industry || "all",
      durationWeeks: fixture.durationWeeks || "4"
    },
    selectedTrackId: fixture.trackId,
    hasSelectedRoleSelection: true,
    selectedRoles: { [fixture.trackId]: fixture.roleId },
    checked: {},
    saved: [],
    completed: [],
    completedRoadmap: [],
    postingText: fixture.postingText,
    view: "saved"
  };
  const track = getSelectedTrack();
  const checkedSkillKeys = new Set((fixture.checkedSkills || [])
    .map((skill) => String(skill || "").toLowerCase().replace(/[\\s/_-]+/g, "")));
  state.checked = Object.fromEntries(
    getDiagnosticItems(track)
      .filter((item) => checkedSkillKeys.has(String(item.skill || "").toLowerCase().replace(/[\\s/_-]+/g, "")))
      .map((item) => [item.id, true])
  );
  const role = getSelectedRole(track.id);
  const tasks = getVisibleRoadmapTasks(track.id);
  const context = getRecommendationContext(track, getGapSkills(track.id), tasks);
  const comparison = getPostingComparison(context, tasks);
  const recommendedResources = getRecommendedResources(track, context).slice(0, 12);
  const roadmapResources = getRoadmapRecommendedResources(track, tasks, context).slice(0, 12);
  const todayAction = getTodayStartAction(context, tasks);
  return {
    selectedTrackId: track.id,
    selectedRoleId: role?.id || null,
    selectedRoleTitle: role?.title || "",
    score: comparison.score,
    matchedLabels: comparison.matched.map((item) => item.label),
    matchedTerms: comparison.matched.flatMap((item) => item.matchedTerms),
    missingLabels: comparison.missing.map((item) => item.label),
    postingOnlyTerms: comparison.postingOnlyTerms.map((item) => item.term),
    recommendedResourceIds: recommendedResources.map((resource) => resource.id),
    roadmapResourceIds: roadmapResources.map((resource) => resource.id),
    todayResourceId: todayAction?.resource?.id || null,
    todayTaskTitle: todayAction?.task?.title || "",
    todayEvidenceLabels: (todayAction?.evidence || []).map((item) => item.label)
  };
};
`, sandbox, { filename: "posting-qa.vm.js" });

const errors = [];
const summaries = [];

const normalize = (value) => String(value || "").toLowerCase().replace(/[\s/_-]+/g, "");
const includesToken = (values, expected) => values.some((value) => normalize(value).includes(normalize(expected)));

fixtures.forEach((fixture) => {
  const result = sandbox.__runPostingQaCase(fixture);
  const caseErrors = [];
  const combinedResourceIds = [
    ...result.recommendedResourceIds,
    ...result.roadmapResourceIds,
    result.todayResourceId
  ].filter(Boolean);

  if (result.selectedTrackId !== fixture.trackId) {
    caseErrors.push(`selected track mismatch: expected ${fixture.trackId}, got ${result.selectedTrackId}`);
  }
  if (result.selectedRoleId !== fixture.roleId) {
    caseErrors.push(`selected role mismatch: expected ${fixture.roleId}, got ${result.selectedRoleId || "none"}`);
  }
  if (result.score < fixture.minScore) {
    caseErrors.push(`posting score too low: expected >= ${fixture.minScore}, got ${result.score}`);
  }

  fixture.expectedMatches.forEach((expected) => {
    if (!includesToken([...result.matchedLabels, ...result.matchedTerms], expected)) {
      caseErrors.push(`missing posting match "${expected}"`);
    }
  });

  fixture.expectedResourceIds.forEach((resourceId) => {
    if (!combinedResourceIds.includes(resourceId)) {
      caseErrors.push(`missing expected resource "${resourceId}"`);
    }
  });

  (fixture.expectedTodayResourceIds || []).forEach((resourceId) => {
    if (result.todayResourceId !== resourceId) {
      caseErrors.push(`unexpected today resource: expected ${resourceId}, got ${result.todayResourceId || "none"}`);
    }
  });

  (fixture.expectedTodayEvidenceLabels || []).forEach((label) => {
    if (!result.todayEvidenceLabels.includes(label)) {
      caseErrors.push(`missing today evidence label "${label}"`);
    }
  });

  (fixture.forbiddenResourceIds || []).forEach((resourceId) => {
    if (combinedResourceIds.includes(resourceId)) {
      caseErrors.push(`forbidden resource appeared "${resourceId}"`);
    }
  });

  summaries.push({
    id: fixture.id,
    label: fixture.label,
    role: result.selectedRoleTitle,
    score: result.score,
    today: result.todayResourceId,
    todayTask: result.todayTaskTitle,
    todayEvidence: result.todayEvidenceLabels,
    recommended: result.recommendedResourceIds.slice(0, 5),
    matched: result.matchedLabels.slice(0, 5),
    errors: caseErrors
  });

  if (caseErrors.length) {
    errors.push(`${fixture.id} (${fixture.label})\n  - ${caseErrors.join("\n  - ")}`);
  }
});

console.log("Posting QA summary:");
summaries.forEach((summary) => {
  const status = summary.errors.length ? "FAIL" : "PASS";
  console.log(`- ${status} ${summary.id}: ${summary.role} / ${summary.score}% / today=${summary.today}`);
  console.log(`  today task: ${summary.todayTask}`);
  console.log(`  today evidence: ${summary.todayEvidence.join(", ")}`);
  console.log(`  matches: ${summary.matched.join(", ")}`);
  console.log(`  resources: ${summary.recommended.join(", ")}`);
});

if (errors.length) {
  console.error("\nPosting QA failed:");
  errors.forEach((message) => console.error(message));
  process.exit(1);
}

console.log(`\nPosting QA passed: ${fixtures.length} cases`);
