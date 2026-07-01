import {
  tracks,
  resources,
  diagnostics,
  roadmaps,
  curriculumTasks,
  majorRoleFitProfiles,
  majorBridgeTracks,
  jobRoles,
  roleDiagnostics,
  resourceTaskLinks,
  roleResourceLinks,
  roleCompetencyResourceLinks,
  starterKeywords,
  industryLabels,
  majorLabels,
  durationLabels,
  durationStrategies,
  learningGoals,
  roleResourceExclusions,
  industryDiagnostics
} from "./data/baseData.js";

const storageKey = "careerCompetencyPilot";
const primaryViews = ["tracks", "diagnosis", "roadmap", "saved", "references"];

const defaultState = {
  selectedTrackId: null,
  hasSelectedRoleSelection: false,
  profile: { major: "mechanical", industry: "all", goal: "foundation", durationWeeks: "4" },
  roleSearch: "",
  roleGroupFilter: "all",
  selectedRoles: {},
  checked: {},
  saved: [],
  completed: [],
  completedRoadmap: [],
  postingText: "",
  view: "tracks"
};

let state = loadState();
let wordCloudLayoutFrame = null;

const elements = {};

document.addEventListener("DOMContentLoaded", () => {
  bindElements();
  bindEvents();
  render();
  disableServiceWorkerCache();
});

function bindElements() {
  [
    "majorSelect",
    "industrySelect",
    "durationSelect",
    "selectedTrackMetric",
    "diagnosticMetric",
    "savedMetric",
    "headerStatus",
    "nextActionPanel",
    "profileImpactPanel",
    "workflowStatus",
    "roleContextBar",
    "trackCount",
    "roleSearchInput",
    "roleGroupFilter",
    "selectedRoleOverview",
    "trackList",
    "trackDetail",
    "diagnosisGuide",
    "diagnosisTitle",
    "scoreBadge",
    "scoreBar",
    "diagnosticList",
    "gapList",
    "roadmapTitle",
    "roadmapGuidance",
    "roadmapList",
    "referenceCount",
    "referenceGuidance",
    "referenceList",
    "savedGuidance",
    "savedList",
    "clearSavedButton",
    "resetPlanButton",
    "exportPlanButton"
  ].forEach((id) => {
    elements[id] = document.getElementById(id);
  });
}

function bindEvents() {
  elements.majorSelect.addEventListener("change", (event) => {
    state.profile.major = event.target.value;
    saveState();
    render();
  });

  elements.industrySelect.addEventListener("change", (event) => {
    state.profile.industry = event.target.value;
    saveState();
    render();
  });

  elements.durationSelect.addEventListener("change", (event) => {
    state.profile.durationWeeks = event.target.value;
    saveState();
    render();
  });

  elements.roleSearchInput.addEventListener("input", (event) => {
    state.roleSearch = event.target.value;
    saveState();
    render();
  });

  elements.roleGroupFilter.addEventListener("change", (event) => {
    state.roleGroupFilter = event.target.value;
    saveState();
    render();
  });

  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      state.view = button.dataset.view;
      saveState();
      renderViews();
    });
  });

  document.addEventListener("click", (event) => {
    const selectAllEducationTarget = event.target.closest("[data-roadmap-select-all]");
    if (selectAllEducationTarget) {
      selectAllCurrentRoadmapResources();
      return;
    }

    const clearAllEducationTarget = event.target.closest("[data-roadmap-clear-all]");
    if (clearAllEducationTarget) {
      clearCurrentRoadmapResourceSelection();
      return;
    }

    const target = event.target.closest("[data-view-target]");
    if (!target) return;
    state.view = normalizeView(target.dataset.viewTarget);
    saveState();
    renderViews();
  });

  document.addEventListener("input", (event) => {
    const postingInput = event.target.closest("[data-posting-input]");
    if (!postingInput) return;
    state.postingText = postingInput.value;
    saveState();
    renderPostingComparisonPanel();
  });

  elements.clearSavedButton.addEventListener("click", () => {
    state.saved = [];
    state.completed = [];
    state.completedRoadmap = [];
    saveState();
    render();
  });

  elements.resetPlanButton.addEventListener("click", confirmAndResetState);

  elements.exportPlanButton.addEventListener("click", exportPlanAsExcel);

  window.addEventListener("resize", scheduleWordCloudLayout);
}

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey));
    const { year: _ignoredYear, ...storedProfile } = stored?.profile || {};
    const profile = { ...defaultState.profile, ...storedProfile };
    if (!["mechanical", "electrical_power", "electrical", "chemical", "computer", "industrial", "materials"].includes(profile.major)) {
      profile.major = defaultState.profile.major;
    }
    profile.goal = defaultState.profile.goal;
    return {
      ...defaultState,
      ...(stored || {}),
      profile,
      selectedTrackId: stored?.selectedTrackId || defaultState.selectedTrackId,
      hasSelectedRoleSelection: Boolean(stored?.hasSelectedRoleSelection),
      roleSearch: typeof stored?.roleSearch === "string" ? stored.roleSearch : defaultState.roleSearch,
      roleGroupFilter: stored?.roleGroupFilter || defaultState.roleGroupFilter,
      view: defaultState.view,
      selectedRoles: { ...defaultState.selectedRoles, ...(stored?.selectedRoles || {}) },
      checked: stored?.checked || defaultState.checked,
      saved: Array.isArray(stored?.saved) ? stored.saved : defaultState.saved,
      completed: Array.isArray(stored?.completed) ? stored.completed : defaultState.completed,
      completedRoadmap: Array.isArray(stored?.completedRoadmap) ? stored.completedRoadmap : defaultState.completedRoadmap,
      postingText: typeof stored?.postingText === "string" ? stored.postingText : defaultState.postingText
    };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function confirmAndResetState() {
  const confirmed = window.confirm("전공, 관심 산업, 직무 선택, 역량 체크, 선택 교육을 모두 초기화할까요?");
  if (!confirmed) return;
  resetState();
  render();
}

function resetState() {
  state = {
    ...defaultState,
    profile: { ...defaultState.profile },
    selectedRoles: {},
    checked: {},
    saved: [],
    completed: [],
    completedRoadmap: [],
    postingText: ""
  };
  localStorage.removeItem(storageKey);
  saveState();
}

function normalizeView(view, fallback = "roadmap") {
  if (view === "library" || view === "education") return "references";
  if (primaryViews.includes(view)) return view;
  return fallback;
}

function render() {
  elements.majorSelect.value = state.profile.major;
  elements.industrySelect.value = state.profile.industry;
  state.profile.goal = defaultState.profile.goal;
  elements.durationSelect.value = state.profile.durationWeeks;
  elements.roleSearchInput.value = state.roleSearch || "";
  const changedRoleGroupFilter = syncRoleGroupFilterWithProfile();
  renderRoleGroupFilterOptions();
  elements.roleGroupFilter.value = state.roleGroupFilter || "all";
  const changedTrack = syncSelectedTrackWithProfile();
  if (changedTrack || changedRoleGroupFilter) saveState();
  renderViews();
  renderProfileImpact();
  renderTracks();
  renderTrackDetail();
  renderDiagnostics();
  renderRoadmap();
  renderReferences();
  renderSaved();
  renderMetrics();
  scheduleWordCloudLayout();
}

function renderViews() {
  state.view = normalizeView(state.view);
  document.querySelectorAll(".tab").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === state.view);
  });
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("is-active", view.id === `${state.view}View`);
  });
  renderWorkflowStatus();
  renderRoleContextBar();
  scheduleWordCloudLayout();
}

function renderWorkflowStatus() {
  if (!elements.workflowStatus || !elements.nextActionPanel) return;

  if (!hasActiveRoleSelection()) {
    const steps = getWorkflowSteps({ track: null, role: null, checkedCount: 0, score: 0, gapCount: 0, savedCount: 0, taskCount: 0 });
    const nextStep = getNextWorkflowStep(steps, 0);
    elements.workflowStatus.innerHTML = steps.map((step, index) => `
      <button class="workflow-step ${index === 0 ? "is-active" : ""} ${step.optional ? "is-optional" : ""}" type="button" data-view-target="${step.view}">
        <span class="workflow-step-number">${index + 1}</span>
        <span>
          <strong>${step.title}</strong>
          <em>${step.status}</em>
        </span>
      </button>
    `).join("");
    renderHeaderStatus(steps[0], nextStep, 0, steps.length);
    elements.nextActionPanel.innerHTML = `
      <p class="eyebrow">다음 행동</p>
      <h3>${nextStep.title}</h3>
      <p>${nextStep.body}</p>
      <button class="primary-button full-width" type="button" data-view-target="${nextStep.view}">${nextStep.action}</button>
    `;
    return;
  }

  const track = getSelectedTrack();
  const role = getSelectedRole(track.id);
  const diagnosticItems = getDiagnosticItems(track);
  const checkedCount = diagnosticItems.filter((item) => state.checked[item.id]).length;
  const score = getDiagnosticScore(track.id);
  const gapCount = getGapItems(track.id).length;
  const savedCount = getSavedResources().length;
  const taskCount = getVisibleRoadmapTasks(track.id).length;
  const steps = getWorkflowSteps({ track, role, checkedCount, score, gapCount, savedCount, taskCount });
  const matchedStepIndex = steps.findIndex((step) => step.view === state.view);
  const activeIndex = state.view === "references" ? steps.length - 1 : Math.max(matchedStepIndex, 0);

  elements.workflowStatus.innerHTML = steps.map((step, index) => `
    <button class="workflow-step ${index === activeIndex ? "is-active" : ""} ${step.complete ? "is-complete" : ""} ${step.optional ? "is-optional" : ""}" type="button" data-view-target="${step.view}">
      <span class="workflow-step-number">${index + 1}</span>
      <span>
        <strong>${step.title}</strong>
        <em>${step.status}</em>
      </span>
    </button>
  `).join("");

  const nextStep = getNextWorkflowStep(steps, activeIndex);
  renderHeaderStatus(steps[activeIndex], nextStep, activeIndex, steps.length);
  elements.nextActionPanel.innerHTML = `
    <p class="eyebrow">다음 행동</p>
    <h3>${nextStep.title}</h3>
    <p>${nextStep.body}</p>
    <button class="${nextStep.primary ? "primary-button" : "ghost-button"} full-width" type="button" data-view-target="${nextStep.view}">${nextStep.action}</button>
  `;
}

function renderHeaderStatus(activeStep, nextStep, activeIndex, totalSteps) {
  if (!elements.headerStatus) return;
  const stepNumber = Math.min(activeIndex + 1, totalSteps);
  elements.headerStatus.innerHTML = `
    <span>
      <em>현재 단계</em>
      <strong>${stepNumber}/${totalSteps} · ${activeStep.title}</strong>
      <small>${activeStep.status}</small>
    </span>
    <span>
      <em>다음 행동</em>
      <strong>${nextStep.action}</strong>
      <small>${nextStep.title}</small>
    </span>
  `;
}

function getWorkflowSteps({ track, role, checkedCount, score, gapCount, savedCount, taskCount }) {
  return [
    {
      view: "tracks",
      title: "직무 판단",
      status: role ? `${role.title}` : "선택 전",
      complete: hasActiveRoleSelection() && Boolean(role)
    },
    {
      view: "diagnosis",
      title: "역량 체크",
      status: checkedCount ? `${checkedCount}개 체크 · ${score}%` : "체크 전",
      complete: checkedCount > 0
    },
    {
      view: "roadmap",
      title: "교육 선택",
      status: savedCount ? `선택 ${savedCount}개` : (gapCount ? `보완 ${gapCount}개 기준` : "추천 교육 확인"),
      complete: savedCount > 0
    },
    {
      view: "saved",
      title: "내 커리큘럼",
      status: savedCount ? `${taskCount || 0}주 구성 · 선택 ${savedCount}개` : "교육 선택 후",
      complete: savedCount > 0
    }
  ];
}

function getNextWorkflowStep(steps, activeIndex) {
  if (!hasActiveRoleSelection()) {
    return {
      view: "tracks",
      title: "직무를 선택해야 시작됩니다",
      body: "전공과 관심 산업 기준으로 좁힌 목록에서 실제 지원하려는 세부 직무를 고르세요.",
      action: "직무 선택",
      primary: true
    };
  }

  const diagnosisStep = steps.find((step) => step.view === "diagnosis");
  if (!diagnosisStep.complete) {
    return {
      view: "diagnosis",
      title: "보유한 역량을 먼저 체크하세요",
      body: "지원 직무에서 이미 갖춘 역량을 제외해야 커리큘럼이 부족 역량 중심으로 좁혀집니다.",
      action: "역량 체크",
      primary: true
    };
  }

  const savedStep = steps.find((step) => step.view === "saved");

  if (!savedStep.complete && state.view === "roadmap") {
    return {
      view: "roadmap",
      title: "필요한 교육을 고르세요",
      body: "교육 카드에서 실제로 볼 자료만 내 커리큘럼에 추가해야 마지막 결과가 완성됩니다.",
      action: "교육 선택",
      primary: true
    };
  }

  if (!savedStep.complete && state.view !== "roadmap" && state.view !== "references" && state.view !== "saved") {
    return {
      view: "roadmap",
      title: "추천 교육을 확인하고 고르세요",
      body: "부족 역량과 첫 산출물에 맞춰 추천된 교육을 먼저 훑고, 필요한 자료만 내 커리큘럼에 추가하세요.",
      action: "교육 선택",
      primary: true
    };
  }

  if (savedStep.complete && (state.view === "roadmap" || state.view === "references")) {
    return {
      view: "saved",
      title: "내 커리큘럼을 확인하세요",
      body: "고른 교육과 추천된 주차별 과제를 한 화면에서 확인하고, 엑셀 커리큘럼으로 내보낼 수 있습니다.",
      action: "내 커리큘럼 확인",
      primary: true
    };
  }

  if (!savedStep.complete && (state.view === "saved" || state.view === "references")) {
    return {
      view: "roadmap",
      title: "교육을 먼저 선택하세요",
      body: "내 커리큘럼은 선택한 교육자료를 기준으로 정리됩니다. 필요한 자료를 먼저 추가하세요.",
      action: "교육 선택",
      primary: true
    };
  }

  if (state.view === "saved") {
    return {
      view: "roadmap",
      title: "지원 회사 공고와 대조하세요",
      body: "내 커리큘럼을 만든 뒤에는 지원 회사의 직무상세, 자격요건, 우대사항과 맞는 교육만 남기세요.",
      action: "교육 다시 확인",
      primary: false
    };
  }

  return {
    view: "roadmap",
    title: "지원 회사 공고와 다시 대조하세요",
    body: "일반 직무 기반 추천이므로 회사별 직무상세의 업무, 자격요건, 우대사항과 맞는 항목을 우선하세요.",
    action: "교육 다시 확인",
    primary: false
  };
}

function renderRoleContextBar() {
  if (!elements.roleContextBar) return;
  const profileSummary = `${getMajorLabel()} · ${getIndustryLabel()} · ${getDurationLabel()}`;
  if (!hasActiveRoleSelection()) {
    const nextStep = getNextWorkflowStep([], 0);
    const visibleCount = getRoleCatalog().length;
    elements.roleContextBar.innerHTML = `
      <div class="snapshot-card is-action">
        <span>해야 할 일</span>
        <strong>${nextStep.title}</strong>
        <em>${nextStep.body}</em>
        <button class="primary-button" type="button" data-view-target="${nextStep.view}">${nextStep.action}</button>
      </div>
      <div class="snapshot-card">
        <span>선택 기준</span>
        <strong>${profileSummary}</strong>
        <em>${visibleCount}개 세부 직무가 표시됩니다.</em>
      </div>
      <div class="snapshot-card">
        <span>선택한 것</span>
        <strong>직무 미선택</strong>
        <em>왼쪽 목록에서 실제 지원할 세부 직무를 고르세요.</em>
      </div>
      <div class="snapshot-card">
        <span>최종 결과</span>
        <strong>내 커리큘럼</strong>
        <em>직무상세, 부족 역량, 교육자료, 주차별 과제로 정리됩니다.</em>
      </div>
    `;
    return;
  }

  const track = getSelectedTrack();
  const role = getSelectedRole(track.id);
  const diagnosticItems = getDiagnosticItems(track);
  const checkedCount = diagnosticItems.filter((item) => state.checked[item.id]).length;
  const gapItems = getGapItems(track.id);
  const output = role ? getRoleCurriculumOutput(track, role) : track.outputs[0];
  const majorLabel = getMajorPathwayLabel(track, role);
  const gapPreview = gapItems.length
    ? gapItems.slice(0, 2).map((item) => item.skill).join(", ")
    : "큰 공백 없음";
  const outputPreview = truncateText(output, 70);
  const steps = getWorkflowSteps({
    track,
    role,
    checkedCount,
    score: getDiagnosticScore(track.id),
    gapCount: gapItems.length,
    savedCount: getSavedResources().length,
    taskCount: getVisibleRoadmapTasks(track.id).length
  });
  const matchedStepIndex = steps.findIndex((step) => step.view === state.view);
  const activeIndex = state.view === "references" ? steps.length - 1 : Math.max(matchedStepIndex, 0);
  const nextStep = getNextWorkflowStep(steps, activeIndex);

  elements.roleContextBar.innerHTML = `
    <div class="snapshot-card is-action">
      <span>해야 할 일</span>
      <strong>${nextStep.title}</strong>
      <em>${nextStep.body}</em>
      <button class="${nextStep.primary ? "primary-button" : "ghost-button"}" type="button" data-view-target="${nextStep.view}">${nextStep.action}</button>
    </div>
    <div class="snapshot-card">
      <span>선택 기준</span>
      <strong>${profileSummary}</strong>
      <em>${majorLabel}</em>
    </div>
    <div class="snapshot-card">
      <span>선택한 것</span>
      <strong>${role?.title || track.title}</strong>
      <em>${track.title} · 확보 체크 ${checkedCount}/${diagnosticItems.length}</em>
    </div>
    <div class="snapshot-card">
      <span>최종 결과</span>
      <strong>${outputPreview}</strong>
      <em>보완: ${gapPreview}</em>
    </div>
  `;
}

function renderProfileImpact() {
  if (!elements.profileImpactPanel) return;
  const catalog = getRoleCatalog({ applyRoleFilters: false });
  const directCount = catalog.filter(({ track: itemTrack, role: itemRole }) => getMajorPathway(itemTrack, itemRole) === "direct").length;
  const bridgeCount = catalog.filter(({ track: itemTrack, role: itemRole }) => getMajorPathway(itemTrack, itemRole) === "bridge").length;
  const challengeCount = catalog.filter(({ track: itemTrack, role: itemRole }) => getMajorPathway(itemTrack, itemRole) === "challenge").length;
  const topRoles = catalog.slice(0, 3).map(({ role: itemRole }) => itemRole.title);
  const selectedText = hasActiveRoleSelection()
    ? `${getSelectedRole(getSelectedTrack().id)?.title || "선택 직무"} 기준`
    : "직무 선택 전 기준";

  elements.profileImpactPanel.innerHTML = `
    <div>
      <strong>입력한 값</strong>
      <span>${getMajorLabel()} · ${getIndustryLabel()} · ${getDurationLabel()}</span>
      <em>${selectedText}</em>
    </div>
    <div>
      <strong>선택 가능한 직무</strong>
      <span>관련 세부 직무 ${catalog.length}개 · 직결 ${directCount}개 · 확장 ${bridgeCount}개 · 도전 ${challengeCount}개</span>
      <em>${topRoles.join(" / ") || "조건에 맞는 직무 없음"}</em>
    </div>
  `;
}

function getSelectedTrack() {
  return tracks.find((track) => track.id === state.selectedTrackId) || tracks[0];
}

function hasActiveRoleSelection() {
  return Boolean(state.hasSelectedRoleSelection && state.selectedTrackId);
}

function getFilteredTracks() {
  return tracks.filter((track) => getProfileRelevantRoles(track).length > 0);
}

function getProfileRelevantRoles(track) {
  return getIndustryRelevantRoles(track)
    .filter((role) => isRoleRelevantToSelectedProfile(track, role));
}

function getIndustryRelevantRoles(track) {
  const roles = jobRoles[track?.id] || [];
  if (!roles.length) return [];
  if (state.profile.industry === "all") return roles;

  if (!track.industries.includes(state.profile.industry)) return [];

  return roles.filter((role) => (role.industries || []).includes(state.profile.industry));
}

function isRoleRelevantToSelectedProfile(track, role) {
  const profile = majorRoleFitProfiles[state.profile.major];
  if (!profile) return track.majors.includes(state.profile.major);
  if (profile.direct.includes(role.id) || profile.bridge.includes(role.id)) return true;
  if (!(profile.challenge || []).includes(role.id)) return false;
  return state.profile.industry !== "all"
    || Boolean(normalizeRoleSearch(state.roleSearch))
    || (state.roleGroupFilter || "all") !== "all";
}

function syncRoleGroupFilterWithProfile() {
  const groupFilter = state.roleGroupFilter || "all";
  if (groupFilter === "all") return false;
  const hasGroup = getFilteredTracks().some((track) => track.id === groupFilter);
  if (hasGroup) return false;
  state.roleGroupFilter = "all";
  return true;
}

function renderRoleGroupFilterOptions() {
  const availableTracks = getFilteredTracks();
  const options = [
    { id: "all", title: "전체 관련 직무군" },
    ...availableTracks.map((track) => ({ id: track.id, title: track.title }))
  ];
  elements.roleGroupFilter.innerHTML = options
    .map((option) => `<option value="${option.id}">${option.title}</option>`)
    .join("");
}

function syncSelectedTrackWithProfile() {
  const filtered = getFilteredTracks();
  if (!filtered.length) return false;
  let changed = false;

  if (!hasActiveRoleSelection()) return false;

  const roleCatalog = getRoleCatalog();
  let selectedRole = getSelectedRole(state.selectedTrackId);
  const selectedRoleId = selectedRole?.id;
  const currentSelectionVisible = roleCatalog.some(({ track, role }) => (
    track.id === state.selectedTrackId && role.id === selectedRoleId
  ));

  if (roleCatalog.length && !currentSelectionVisible) {
    const firstMatch = roleCatalog[0];
    state.selectedTrackId = firstMatch.track.id;
    state.selectedRoles = { ...state.selectedRoles, [firstMatch.track.id]: firstMatch.role.id };
    state.hasSelectedRoleSelection = true;
    return true;
  }

  if (!filtered.some((track) => track.id === state.selectedTrackId)) {
    state.selectedTrackId = filtered[0].id;
    selectedRole = getSelectedRole(state.selectedTrackId);
    changed = true;
  }

  if (selectedRole && state.selectedRoles[state.selectedTrackId] !== selectedRole.id) {
    state.selectedRoles = { ...state.selectedRoles, [state.selectedTrackId]: selectedRole.id };
    changed = true;
  }

  return changed;
}

function getAvailableRoles(track) {
  return getProfileRelevantRoles(track);
}

function getSelectedRole(trackId = state.selectedTrackId) {
  if (!trackId) return null;
  const track = tracks.find((item) => item.id === trackId);
  const roles = getAvailableRoles(track);
  if (!roles.length) return null;

  const selectedRoleId = state.selectedRoles?.[trackId];
  return roles.find((role) => role.id === selectedRoleId) || roles[0];
}

function getDurationWeeks() {
  const weeks = Number(state.profile.durationWeeks || defaultState.profile.durationWeeks);
  return Number.isFinite(weeks) ? weeks : Number(defaultState.profile.durationWeeks);
}

function getDurationLabel() {
  return durationLabels[state.profile.durationWeeks] || `${getDurationWeeks()}주`;
}

function getDurationStrategy() {
  return durationStrategies[state.profile.durationWeeks] || durationStrategies["4"];
}

function getIndustryLabel(industry = state.profile.industry) {
  return industryLabels[industry] || industry;
}

function getMajorLabel(major = state.profile.major) {
  return majorLabels[major] || major;
}

function getMajorRoleFit(track, role, major = state.profile.major) {
  if (!track || major === "both") {
    return {
      level: "direct",
      reason: "공학계열 전체 기준으로 직무 연결 가능성을 우선 보여줍니다.",
      focus: "세부 전공보다 선택 직무의 보유 역량 체크 결과를 기준으로 커리큘럼을 구성합니다."
    };
  }

  const majorLabel = getMajorLabel(major);
  const profile = majorRoleFitProfiles[major];
  if (role && profile?.direct.includes(role.id)) {
    return {
      level: "direct",
      reason: `${majorLabel} 전공지식이 ${role.title}의 반복 업무와 직접 맞닿아 있습니다.`,
      focus: "체크하지 못한 역량 항목만 보완하면 바로 커리큘럼 우선순위에 반영됩니다."
    };
  }
  if (role && profile?.bridge.includes(role.id)) {
    return {
      level: "bridge",
      reason: `${majorLabel} 전공자가 프로젝트와 보완 학습으로 확장 진입할 수 있는 세부 직무입니다.`,
      focus: profile.bridgeFocus
    };
  }
  if (role && (profile?.challenge || []).includes(role.id)) {
    return {
      level: "challenge",
      reason: `${majorLabel} 전공에서는 바로 직결로 보기 어려운 도전 직무입니다.`,
      focus: profile.challengeFocus || "직무 기초 언어, 도구, 산출물을 먼저 확인한 뒤 지원 여부를 판단하세요."
    };
  }

  if (track.majors.includes(major)) {
    return {
      level: "direct",
      reason: `${majorLabel} 전공과 직접 맞닿은 직무군입니다.`,
      focus: "세부 직무를 고른 뒤 보유 역량을 체크하면 부족 항목만 커리큘럼에 우선 반영됩니다."
    };
  }
  if ((majorBridgeTracks[major] || []).includes(track.id)) {
    return {
      level: "bridge",
      reason: `${majorLabel} 전공자가 보완 학습으로 확장할 수 있는 직무군입니다.`,
      focus: profile?.bridgeFocus || "직무 언어와 도구 역량을 보완하면 진입 가능성이 커집니다."
    };
  }
  return {
    level: "explore",
    reason: `${majorLabel} 전공자는 이 직무의 필수 언어와 산출물을 먼저 확인해야 합니다.`,
    focus: "역량 체크에서 모르는 항목이 많으면 탐색 단계 커리큘럼으로 시작하는 편이 좋습니다."
  };
}

function getMajorPathway(track, role = null, major = state.profile.major) {
  const fit = getMajorRoleFit(track, role, major);
  return typeof fit === "string" ? fit : fit.level;
}

function getMajorPathwayLabel(track, role = null, major = state.profile.major) {
  return {
    direct: "전공 직결",
    bridge: "전공 확장",
    challenge: "도전 직무",
    explore: "탐색 가능"
  }[getMajorPathway(track, role, major)];
}

function getMajorPathwayReason(track, role = null, major = state.profile.major) {
  const fit = getMajorRoleFit(track, role, major);
  return typeof fit === "string"
    ? getMajorRoleFit(track, null, major).reason
    : fit.reason;
}

function getMajorPathwayFocus(track, role = null, major = state.profile.major) {
  const fit = getMajorRoleFit(track, role, major);
  return typeof fit === "string" ? "" : fit.focus;
}

function renderTracks() {
  const roleCatalog = getRoleCatalog();
  const selectedTrack = getSelectedTrack();
  const selectedRole = getSelectedRole(selectedTrack.id);
  elements.trackCount.textContent = `${roleCatalog.length}개 세부 직무 · ${getMajorLabel()} 기준`;
  if (elements.selectedRoleOverview) {
    elements.selectedRoleOverview.innerHTML = hasActiveRoleSelection()
      ? renderSelectedRoleOverview(selectedTrack, selectedRole)
      : renderRoleSelectionPrompt();
  }

  if (!roleCatalog.length) {
    elements.trackList.innerHTML = `
      <div class="empty-state">
        검색 조건과 맞는 채용공고 직무가 없습니다. 직무군을 전체로 바꾸거나 검색어를 줄여보세요.
      </div>
    `;
    return;
  }

  elements.trackList.innerHTML = roleCatalog.map(({ track, role }) => {
    const selectedRole = getSelectedRole(track.id);
    const isSelected = track.id === state.selectedTrackId && selectedRole?.id === role.id;
    const majorPathwayLabel = getMajorPathwayLabel(track, role);
    const roleCard = `
    <button class="track-card ${isSelected ? "is-selected" : ""}" type="button" data-track-id="${track.id}" data-role-id="${role.id}" aria-expanded="${isSelected ? "true" : "false"}">
      <span class="status-pill">${track.title}</span>
      <h3>${role.title}</h3>
      <p>${role.focus}</p>
      <span class="badge-row">
        <span class="badge major-pathway-badge">${majorPathwayLabel}</span>
        ${role.postingKeywords.slice(0, 4).map((keyword) => `<span class="badge">${keyword}</span>`).join("")}
      </span>
    </button>
  `;
    return roleCard;
  }).join("");

  elements.trackList.querySelectorAll("[data-track-id][data-role-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedTrackId = button.dataset.trackId;
      state.selectedRoles = { ...state.selectedRoles, [button.dataset.trackId]: button.dataset.roleId };
      state.hasSelectedRoleSelection = true;
      state.view = "tracks";
      saveState();
      render();
      focusSelectedRoleOverview();
    });
  });
  bindResourceActions(elements.selectedRoleOverview);
}

function renderRoleSelectionPrompt() {
  return `
    <article class="selection-prompt-panel">
      <div class="selection-prompt-mark">왼쪽에서 선택</div>
      <div>
        <p class="eyebrow">아직 선택 전</p>
        <h3>지원하려는 직무를 하나 고르세요</h3>
        <p>선택하면 이 영역에 워드클라우드, 핵심 판단, 다음 단계가 바로 표시됩니다.</p>
      </div>
    </article>
  `;
}

function focusSelectedRoleOverview() {
  requestAnimationFrame(() => {
    const resultPanel = elements.selectedRoleOverview?.closest(".role-result-panel");
    if (window.matchMedia("(max-width: 720px)").matches) {
      elements.selectedRoleOverview?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    resultPanel?.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function renderSelectedRoleOverview(track = getSelectedTrack(), role = getSelectedRole(track.id)) {
  if (!role) return "";

  const evidence = getHiringEvidence(track, role);
  const context = getRecommendationContext(track, getGapSkills(track.id), getVisibleRoadmapTasks(track.id));
  const quickResources = uniqueResources([
    ...getRoleLinkedResources(role),
    ...getRecommendedResources(track, context)
  ]).slice(0, 3);
  const diagnosticItems = getDiagnosticItems(track);
  const checkedCount = diagnosticItems.filter((item) => state.checked[item.id]).length;
  const gapItems = getGapItems(track.id);
  const output = getRoleCurriculumOutput(track, role);

  return `
    <article class="selected-role-overview" aria-live="polite" aria-label="${role.title} 선택 직무 요약">
      <div class="selected-role-anchor">
        <span>선택 직무</span>
        <strong>${role.title}</strong>
      </div>
      <div class="selected-role-top is-summary-only">
        <div class="selected-role-summary">
          <p class="eyebrow">이 직무가 맞나요?</p>
          <h3>${role.title}</h3>
          <p>${role.focus}</p>
          ${renderRoleCoreWorkSummary(role)}
          <div class="role-decision-mini">
            <strong>지원 전 질문</strong>
            <ul>
              ${getRoleDecisionQuestions(track, role).slice(0, 1).map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
        </div>
      </div>
      ${renderRoleDecisionDashboard(track, role, checkedCount, diagnosticItems.length, gapItems, output, quickResources, context)}
      <div class="role-action-strip">
        <span>
          <strong>다음 단계</strong>
          <em>상세직무내용이 맞는지 확인한 뒤 보유 역량을 체크하면 직무 관련 교육만 좁혀집니다.</em>
        </span>
        <div class="flow-actions">
          <button class="primary-button" type="button" data-view-target="diagnosis">역량 체크하기</button>
        </div>
      </div>
      ${renderRoleWordCloud(track, role, "is-featured is-compact")}
      <details class="role-detail-disclosure">
        <summary>
          <span>
            <strong>선택직무 상세 보기</strong>
            <small>반복 업무, 자격조건, 우대 역량</small>
          </span>
        </summary>
        <section class="selected-role-detail-panel" aria-label="${role.title} 선택직무 상세">
          <div class="selected-role-detail-head">
            <div>
              <p class="eyebrow">선택직무 상세</p>
              <h3>${role.title}에서 실제로 확인할 내용</h3>
            </div>
            <div class="badge-row">
              ${role.postingKeywords.slice(0, 5).map((keyword) => `<span class="badge">${keyword}</span>`).join("")}
            </div>
          </div>
          <div class="role-detail-grid is-prominent">
            ${detailBlock("현업 핵심역량", getRoleCoreCompetencyItems(role))}
            ${detailBlock("채용공고 반복 업무", role.responsibilities)}
            ${detailBlock("자격조건·필수 역량", role.requirements)}
            ${detailBlock("우대·차별화 역량", role.preferred)}
          </div>
          <div class="company-detail-inline">
            <strong>지원 회사 공고와 대조</strong>
            위 반복업무·자격조건·우대역량 중 지원 회사 공고에 실제로 적힌 문장을 표시한 뒤, 없는 내용은 커리큘럼 우선순위에서 낮추세요.
          </div>
        </section>
      </details>
      <details class="role-detail-disclosure">
        <summary>
          <span>
            <strong>선택 근거와 참고자료</strong>
            <small>전공 연결, AI 역량, 채용 검색, 교육 후보</small>
          </span>
        </summary>
        <div class="role-reference-stack">
          ${renderMajorConnectionPanel(track, role)}
          ${renderRoleAiCompetencyPanel(role)}
          <div class="selected-role-search">
            <strong>채용 사이트에서는 직접 검색</strong>
            <span>검색어 예시: ${evidence.query}</span>
            <div class="evidence-links">
              ${evidence.links.map((link) => `<a class="resource-action" href="${link.url}" target="_blank" rel="noreferrer">${link.label}</a>`).join("")}
            </div>
          </div>
          ${quickResources.length ? `
            <div class="selected-role-resources">
              <strong>교육 선택 전 미리 볼 후보</strong>
              ${quickResources.map((resource) => `
                <span>
                  <em>${resource.title}</em>
                  <small>${resource.provider} · ${resource.type}</small>
                  <small>
                    <a class="resource-action" href="${resource.url}" target="_blank" rel="noreferrer">${getResourceOpenLabel(resource)}</a>
                  </small>
                </span>
              `).join("")}
            </div>
          ` : ""}
          ${renderExpertReviewPanel(track, role)}
          ${renderRoleFitPanel(track, role)}
        </div>
      </details>
    </article>
  `;
}

function renderRoleCoreWorkSummary(role) {
  if (!role.coreWork) return "";
  return `
    <div class="role-core-work">
      <strong>현업에서 하는 일</strong>
      <span>${role.coreWork}</span>
    </div>
  `;
}

function getRoleCoreCompetencyItems(role) {
  if (role.coreCompetencies?.length) return role.coreCompetencies;
  return (roleDiagnostics[role.id] || [])
    .slice(0, 4)
    .map(([skill, description]) => `${skill}: ${description}`);
}

function renderRoleDecisionDashboard(track, role, checkedCount, totalCount, gapItems, output, quickResources = [], context = null) {
  const majorLabel = getMajorPathwayLabel(track, role);
  const majorName = getMajorLabel();
  const roleWork = role.coreWork || role.focus;
  const roleResponsibilities = (role.responsibilities || []).slice(0, 2).join(" · ");
  const gapText = gapItems.length
    ? gapItems.slice(0, 2).map((item) => item.skill).join(", ")
    : "큰 공백 없음";
  return `
    <section class="role-decision-dashboard" aria-label="${role.title} 핵심 연결 요약">
      <div class="role-decision-card is-strong">
        <span>전공</span>
        <strong>${majorName} · ${majorLabel}</strong>
        <em>${getMajorPathwayReason(track, role)}</em>
      </div>
      <div class="role-decision-card">
        <span>상세직무내용</span>
        <strong>${role.title}</strong>
        <em>${truncateText(roleWork, 92)}</em>
        ${roleResponsibilities ? `<small>반복 업무: ${truncateText(roleResponsibilities, 96)}</small>` : ""}
      </div>
      <div class="role-decision-card is-education">
        <span>직무 관련 교육</span>
        <strong>${quickResources.length ? `${quickResources.length}개 우선 후보` : "역량 체크 후 추천"}</strong>
        ${renderRoleEducationPreview(quickResources, context)}
        <em>${checkedCount}/${totalCount}개 역량 체크 · 보완 우선: ${gapText}</em>
        <small>교육으로 남길 산출물: ${output}</small>
      </div>
    </section>
  `;
}

function renderRoleEducationPreview(resources, context) {
  if (!resources.length) {
    return `
      <div class="role-education-preview">
        <span>
          <strong>교육 후보 대기</strong>
          <small>보유 역량을 체크하면 이미 아는 교육은 뒤로 보내고 부족 역량 자료를 우선합니다.</small>
        </span>
      </div>
    `;
  }

  return `
    <div class="role-education-preview">
      ${resources.slice(0, 2).map((resource) => `
        <span>
          <strong>${resource.title}</strong>
          <small>${getRoleEducationPreviewReason(resource, context)}</small>
        </span>
      `).join("")}
    </div>
  `;
}

function getRoleEducationPreviewReason(resource, context) {
  const signals = context
    ? getEducationResourceSignals(resource, context).filter((signal) => signal !== "계획 선택됨")
    : [];
  const reason = signals.length
    ? signals.slice(0, 2).join(" · ")
    : getResourceSkillSummary(resource, 3);
  return truncateText(reason, 82);
}

function renderRoleAiCompetencyPanel(role) {
  const profile = getRoleAiCompetencyProfile(role);
  if (!profile) return "";
  const diagnosticItems = (profile.diagnostics || []).slice(0, 2);
  return `
    <div class="role-ai-panel" aria-label="${role.title} AI 활용 역량">
      <div>
        <p class="eyebrow">AI·데이터 활용 역량</p>
        <h4>${profile.level} · ${profile.summary}</h4>
      </div>
      <div class="role-ai-grid">
        ${detailBlock("공고에서 보이면 볼 표현", profile.keywords || [])}
        ${detailBlock("준비하면 좋은 증거", diagnosticItems.map(([skill, question]) => `${skill}: ${question}`))}
      </div>
      <p>AI가 직무의 본질을 대체한다는 뜻이 아니라, 해당 직무의 반복 데이터·로그·검사·시험 업무를 더 잘 설명하게 해주는 보조 또는 핵심 역량으로 반영합니다.</p>
    </div>
  `;
}

function getRoleAiCompetencyProfile(role) {
  if (!role) return null;
  if (role.aiCompetency) return role.aiCompetency;
  return createFallbackAiCompetencyProfile(role);
}

function createFallbackAiCompetencyProfile(role) {
  const text = getRoleSearchText({ title: "", summary: "" }, role);
  if (/(CAD|도면|공차|기구|차체|섀시|구동계|열관리|CFD|FEA|해석|시험|검증|DVP|계측|품질|공정|장비|회로|PCB|펌웨어|ECU|CAN|HIL|SIL|ADAS|센서|로그|데이터|수율|불량|MES|SPC|Python|MATLAB)/i.test(text)) {
    const isDataHeavy = /(데이터|로그|수율|불량|MES|SPC|Python|MATLAB|CAN|HIL|SIL|ADAS|센서|계측|검증|시험)/i.test(text);
    return {
      level: isDataHeavy ? "도움 큼" : "보조 역량",
      summary: isDataHeavy
        ? "공고에 로그, 시험, 계측, 데이터 정리 표현이 있으면 분석 자동화와 이상 구간 표시가 준비 차별점이 됩니다."
        : "반복 설계·검토 업무에서 표준 체크리스트, 비교표, 간단한 자동화 스크립트가 준비 근거가 됩니다.",
      keywords: isDataHeavy ? ["데이터 분석", "자동화", "이상탐지"] : ["자동화", "AI 활용", "비교표"],
      requirements: [isDataHeavy ? "직무 데이터를 입력, 기준, 결과 지표로 나누어 설명하는 역량" : "반복 검토 기준을 표와 체크리스트로 구조화하는 역량"],
      preferred: [isDataHeavy ? "Python/MATLAB/Excel 기반 로그·계측 데이터 후처리 경험" : "AI 도구를 활용해 검토표, 요구사항표, 비교표를 정리한 경험"],
      diagnostics: [[isDataHeavy ? "데이터 기반 판단" : "AI 활용 정리", isDataHeavy ? "직무 로그나 시험 데이터를 기준값과 비교해 이상 구간을 표시할 수 있다." : "직무 요구사항을 체크리스트와 산출물 기준으로 구조화할 수 있다."]]
    };
  }

  return null;
}

function getRoleAiDataExercise(role) {
  const profile = getRoleAiCompetencyProfile(role);
  if (!profile) return "";
  const keyword = profile.keywords?.[0] || "데이터 분석";
  return `${keyword} 관점에서 샘플 로그·측정값·공고 문장을 입력, 판단 기준, 결과 지표로 나누어 5줄 표로 정리합니다.`;
}

function getRoleCatalog({ applyRoleFilters = true } = {}) {
  const groupFilter = state.roleGroupFilter || "all";
  const searchTerm = normalizeRoleSearch(state.roleSearch);

  return getFilteredTracks()
    .filter((track) => !applyRoleFilters || groupFilter === "all" || track.id === groupFilter)
    .flatMap((track) => getProfileRelevantRoles(track)
      .filter((role) => !applyRoleFilters || matchesRoleFilters(track, role, searchTerm))
      .map((role) => ({ track, role, score: getRoleCatalogScore(track, role) })))
    .sort((a, b) => b.score - a.score);
}

function getRoleCatalogScore(track, role) {
  let score = 0;

  const majorPathway = getMajorPathway(track, role);
  if (majorPathway === "direct") score += 95;
  if (majorPathway === "bridge") score += 24;
  if (majorPathway === "challenge") score -= 18;
  if (majorPathway === "explore") score -= 80;
  score += getMajorPathwayOrderScore(role, majorPathway);
  if (state.profile.industry !== "all" && role.industries.includes(state.profile.industry)) score += 60;
  if (state.profile.industry !== "all" && track.industries.includes(state.profile.industry)) score += 20;
  score += Math.min(getRoleLinkedResourceIds(role).length, 8) * 3;
  score += Math.min(role.postingKeywords.length, 6) * 2;

  return score;
}

function getMajorPathwayOrderScore(role, pathway) {
  const profile = majorRoleFitProfiles[state.profile.major];
  const orderedRoles = profile?.[pathway] || [];
  const index = orderedRoles.indexOf(role.id);
  if (index < 0) return 0;
  const maxScore = { direct: 70, bridge: 24, challenge: 8 }[pathway] || 0;
  const step = { direct: 2.5, bridge: 1, challenge: 0.5 }[pathway] || 1;
  return Math.max(0, maxScore - index * step);
}

function matchesRoleFilters(track, role, searchTerm) {
  if (!searchTerm) return true;
  return getRoleSearchText(track, role).includes(searchTerm);
}

function getRoleSearchText(track, role) {
  return normalizeRoleSearch([
    track.title,
    track.summary,
    role.title,
    role.focus,
    role.coreWork,
    ...(role.postingKeywords || []),
    ...(role.coreTerms || []),
    ...(role.tools || []),
    ...(role.coreCompetencies || []),
    ...(role.responsibilities || []),
    ...(role.requirements || []),
    ...(role.preferred || [])
  ].join(" "));
}

function normalizeRoleSearch(value) {
  return String(value || "").toLowerCase().replace(/\s+/g, " ").trim();
}

function renderTrackDetail() {
  if (!hasActiveRoleSelection()) {
    elements.trackDetail.innerHTML = "";
    return;
  }

  const track = getSelectedTrack();
  const selectedRole = getSelectedRole(track.id);

  elements.trackDetail.innerHTML = `
    <details class="track-common-disclosure">
      <summary>
        <span>
          <em class="eyebrow">직무군 공통 참고 정보</em>
          <strong>${track.title}</strong>
          <small>${selectedRole ? `${selectedRole.title} 상세 정보는 위 선택 카드 바로 아래에 모았습니다.` : "같은 직무군에서 함께 쓰이는 공통 정보입니다."}</small>
        </span>
      </summary>
      <div class="track-common-body">
        <div class="detail-grid">
          ${detailBlock("주요 업무", track.tasks)}
          ${detailBlock("핵심 역량", track.skills)}
          ${detailBlock("사용 도구", track.tools)}
          ${detailBlock("준비 산출물", track.outputs)}
        </div>
        <div class="detail-grid">
          ${detailBlock("흔한 오해", track.misconceptions)}
        </div>
      </div>
    </details>
  `;
}

function getHiringEvidence(track, role) {
  const keywordText = role.postingKeywords.slice(0, 4).join(" ");
  const query = `${role.title} ${keywordText} 채용공고`;
  const encodedQuery = encodeURIComponent(query);
  return {
    query,
    links: [
      { label: "잡코리아 열기", url: "https://www.jobkorea.co.kr/" },
      { label: "사람인 열기", url: "https://www.saramin.co.kr/" },
      { label: "웹 검색", url: `https://duckduckgo.com/?q=${encodedQuery}` }
    ]
  };
}

function renderRoleWordCloud(track, role, modifier = "") {
  const terms = getRoleWordCloudTerms(track, role).slice(0, 28);
  return `
    <figure class="word-cloud-panel ${modifier}" aria-label="${role.title} 직무 키워드 워드클라우드">
      <div class="word-cloud-head">
        <span>직무상세 워드클라우드</span>
        <strong>중요할수록 크게 표시</strong>
      </div>
      <div class="word-cloud-terms">
        ${terms.map((term, index) => renderWordCloudTerm(term, index, index === 0)).join("")}
      </div>
      <figcaption>${role.title} 직무상세의 주요 업무, 자격요건, 우대역량, 도구, 시뮬레이션, 역량진단에서 반복되는 단어일수록 크게 표시합니다.</figcaption>
    </figure>
  `;
}

function renderWordCloudTerm(term, index, isPrimary = false) {
  return `<span class="word-cloud-term ${isPrimary ? "is-primary" : ""} weight-${term.level}" style="${getWordCloudTermStyle(term, index)}">${term.word}</span>`;
}

function getWordCloudTermStyle(term, index) {
  const size = (0.78 + Math.pow(term.level, 1.14) * 0.23).toFixed(2);
  const opacity = (0.68 + term.level * 0.05).toFixed(2);
  return `--size:${size}rem;--opacity:${opacity};--z:${term.level};`;
}

function scheduleWordCloudLayout() {
  if (wordCloudLayoutFrame) cancelAnimationFrame(wordCloudLayoutFrame);
  wordCloudLayoutFrame = requestAnimationFrame(() => {
    wordCloudLayoutFrame = null;
    layoutWordClouds();
  });
}

function layoutWordClouds() {
  document.querySelectorAll(".word-cloud-terms").forEach(layoutWordCloud);
}

function layoutWordCloud(container) {
  const containerRect = container.getBoundingClientRect();
  if (containerRect.width < 80 || containerRect.height < 80) return;

  const terms = Array.from(container.querySelectorAll(".word-cloud-term"));
  if (!terms.length) return;

  container.classList.add("is-layout-ready");
  terms.forEach((term) => {
    term.hidden = false;
    term.style.left = "50%";
    term.style.top = "50%";
  });

  const width = container.clientWidth;
  const height = container.clientHeight;
  const padding = width < 420 ? 14 : 18;
  const centerX = width / 2;
  const centerY = height / 2;
  const primary = terms.find((term) => term.classList.contains("is-primary")) || terms[0];
  const placed = [];

  placeWordCloudTerm(primary, centerX, centerY, placed, padding, width, height);

  const orderedTerms = terms
    .filter((term) => term !== primary)
    .sort((a, b) => Number(b.style.getPropertyValue("--z")) - Number(a.style.getPropertyValue("--z")));

  orderedTerms.forEach((term, index) => {
    const position = findCloudPosition(term, index, placed, width, height, padding);
    if (!position) {
      term.hidden = true;
      return;
    }
    placeWordCloudTerm(term, position.x, position.y, placed, padding, width, height);
  });

  pruneWordCloudOverlaps(container);
}

function placeWordCloudTerm(term, x, y, placed, padding, width, height) {
  term.style.left = `${Math.round(x)}px`;
  term.style.top = `${Math.round(y)}px`;
  const box = getWordCloudBox(term, x, y);
  box.left = Math.max(padding, Math.min(box.left, width - padding - box.width));
  box.top = Math.max(padding, Math.min(box.top, height - padding - box.height));
  box.right = box.left + box.width;
  box.bottom = box.top + box.height;
  term.style.left = `${Math.round(box.left + box.width / 2)}px`;
  term.style.top = `${Math.round(box.top + box.height / 2)}px`;
  placed.push(box);
}

function findCloudPosition(term, index, placed, width, height, padding) {
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(width, height) * 0.48;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const startAngle = index * goldenAngle;

  for (let step = 0; step < 900; step += 1) {
    const radius = 14 + Math.sqrt(step) * (maxRadius / 7);
    const angle = startAngle + step * 0.42;
    const x = centerX + Math.cos(angle) * radius * 1.05;
    const y = centerY + Math.sin(angle) * radius * 0.72;
    const box = getWordCloudBox(term, x, y);

    if (box.left < padding || box.top < padding || box.right > width - padding || box.bottom > height - padding) continue;
    if (!isBoxInsideCloud(box, width, height, padding)) continue;
    if (hasWordCloudCollision(box, placed)) continue;
    return { x, y };
  }

  return findFallbackCloudPosition(term, placed, width, height, padding);
}

function findFallbackCloudPosition(term, placed, width, height, padding) {
  const step = 6;
  for (let y = padding; y < height - padding; y += step) {
    for (let x = padding; x < width - padding; x += step) {
      const box = getWordCloudBox(term, x, y);
      if (box.left < padding || box.top < padding || box.right > width - padding || box.bottom > height - padding) continue;
      if (isBoxInsideCloud(box, width, height, padding) && !hasWordCloudCollision(box, placed)) {
        return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
      }
    }
  }

  return null;
}

function getWordCloudBox(term, x, y) {
  const width = term.offsetWidth;
  const height = term.offsetHeight;
  return {
    left: x - width / 2,
    top: y - height / 2,
    right: x + width / 2,
    bottom: y + height / 2,
    width,
    height
  };
}

function hasWordCloudCollision(box, placed) {
  const gap = 2;
  return placed.some((other) => (
    box.left < other.right + gap
    && box.right > other.left - gap
    && box.top < other.bottom + gap
    && box.bottom > other.top - gap
  ));
}

function pruneWordCloudOverlaps(container) {
  const visibleBoxes = [];
  Array.from(container.querySelectorAll(".word-cloud-term")).forEach((term) => {
    const rect = term.getBoundingClientRect();
    const box = {
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      width: rect.width,
      height: rect.height
    };

    if (hasWordCloudCollision(box, visibleBoxes)) {
      term.hidden = true;
      return;
    }
    visibleBoxes.push(box);
  });
}

function isBoxInsideCloud(box, width, height, padding) {
  const points = [
    [box.left, box.top],
    [box.right, box.top],
    [box.left, box.bottom],
    [box.right, box.bottom],
    [box.left + box.width / 2, box.top + box.height / 2]
  ];
  return points.every(([x, y]) => isPointInsideWordCloud(x, y, width, height, padding));
}

function isPointInsideWordCloud(x, y, width, height, padding) {
  const px = x / width;
  const py = y / height;
  const ellipseX = (x - width / 2) / ((width - padding * 2) * 0.48);
  const ellipseY = (y - height / 2) / ((height - padding * 2) * 0.39);
  if (ellipseX * ellipseX + ellipseY * ellipseY <= 1) return true;

  const lobes = [
    [0.28, 0.47, 0.24],
    [0.41, 0.34, 0.25],
    [0.57, 0.33, 0.27],
    [0.72, 0.49, 0.24],
    [0.38, 0.66, 0.24],
    [0.61, 0.67, 0.25]
  ];
  return lobes.some(([cx, cy, radius]) => {
    const dx = (px - cx) / radius;
    const dy = (py - cy) / (radius * 0.78);
    return dx * dx + dy * dy <= 1;
  });
}

function renderRoleFitPanel(track, role) {
  return `
    <div class="role-fit-panel" aria-label="${role.title} 직무 적합성 판단">
      ${roleFitBlock("맞는 신호", getRoleFitSignals(track, role))}
      ${roleFitBlock("주의 신호", getRoleCautionSignals(track, role))}
      ${roleFitBlock("지원 전 확인 질문", getRoleDecisionQuestions(track, role))}
      ${roleFitBlock("산출물 예시", getRoleArtifactExamples(track, role))}
    </div>
  `;
}

function renderExpertReviewPanel(track, role) {
  const reviewItems = getExpertReviewItems(track, role);
  return `
    <details class="expert-review-panel">
      <summary>
        <span>
          <em class="eyebrow">직무 추천 의견</em>
          <strong>${role.title} 내용·교육과정 연결성</strong>
        </span>
      </summary>
      <div class="expert-review-grid">
        ${reviewItems.map((item) => `
          <div class="expert-review-item">
            <strong>${item.title}</strong>
            <p>${item.body}</p>
          </div>
        `).join("")}
      </div>
    </details>
  `;
}

function getExpertReviewItems(track, role) {
  const diagnosticItems = roleDiagnostics[role.id] || diagnostics[track.id] || [];
  const linkedResources = getRoleLinkedResources(role);
  const primaryResource = linkedResources.find((resource) => getRoleKeywordMatches(resource, role).length)
    || linkedResources.find((resource) => resource.core)
    || linkedResources[0];
  const directResourceCount = linkedResources.filter((resource) => !/search|results\?|query=|courses\/free\/?$/i.test(resource.url || "")).length;
  const output = getRoleCurriculumOutput(track, role);
  const expertSkillText = diagnosticItems.slice(0, 3).map(([skill]) => skill).join(", ");
  const keywordText = role.postingKeywords.slice(0, 3).join(", ");

  return [
    {
      title: "직무 내용",
      body: `${role.responsibilities[0]} 업무를 반복 업무의 중심으로 봅니다. 공고에서 ${keywordText} 같은 키워드가 실제 업무·자격요건에 같이 나오면 이 직무와의 연결성이 높습니다.`
    },
    {
      title: "필수 역량",
      body: `직무 관점에서는 ${expertSkillText} 항목을 말로만 설명하는 것보다 ${output}처럼 제출 가능한 산출물로 남기는지가 중요합니다.`
    },
    {
      title: "교육과정",
      body: `${linkedResources.length}개 후보 중 ${directResourceCount}개는 바로 열 수 있는 자료입니다. ${primaryResource ? `${primaryResource.title}부터 보고` : "공식·검토 자료부터 보고"} 보유 역량 체크에서 빠진 항목만 커리큘럼에 남기도록 구성했습니다.`
    }
  ];
}

function getRoleLinkedResources(role) {
  const linkedIds = getRoleLinkedResourceIds(role);
  return linkedIds
    .map((id) => resources.find((resource) => resource.id === id))
    .filter(Boolean);
}

function getRoleCurriculumOutput(track, role) {
  const roleOutputById = {
    "semiconductor-process-engineer": "공정 recipe-계측 지표 조건 변경 검토표",
    "semiconductor-equipment-engineer": "장비 alarm·PM 원인분석표와 복구 검증 체크리스트",
    "semiconductor-yield-engineer": "수율 Pareto·wafer map 원인 가설 리포트",
    "etch-process-engineer": "식각 recipe DOE 표와 CD·uniformity 개선 리포트",
    "metrology-engineer": "계측 recipe·MSA/Gauge R&R trend 리포트",
    "photo-lithography-engineer": "포토 focus-exposure-CD/overlay 공정 window 검토표",
    "thin-film-deposition-engineer": "증착 두께·uniformity trend와 chamber matching 리포트",
    "cmp-process-engineer": "CMP removal rate·dishing/erosion DOE 분석표",
    "process-integration-engineer": "공정통합 split lot 변경 리스크 메모와 module interaction map",
    "semiconductor-facility-engineer": "Utility excursion 영향도 매트릭스와 비상 대응 체크리스트",
    "fdc-apc-process-control-engineer": "FDC alarm rule sheet와 APC/R2R control plan",
    "defect-failure-analysis-engineer": "defect Pareto·wafer map pattern 메모와 FA 원인 가설 리포트",
    "aerospace-systems-engineer": "임무 요구사항 추적표와 검증 매트릭스",
    "uav-flight-control-engineer": "비행제어 테스트 조건표와 로그 분석 리포트",
    "avionics-integration-engineer": "항전 인터페이스 정의서와 통합 시험 체크리스트",
    "defense-systems-engineer": "운용 요구사항-시험평가 추적표",
    "radar-rf-signal-engineer": "레이더 신호처리 성능 분석 리포트",
    "robot-mechanical-design-engineer": "로봇 기구 요구사항표와 엔드이펙터 설계 검토표",
    "robot-control-engineer": "로봇 제어 응답 로그와 경로 계획 검증 리포트",
    "robot-perception-engineer": "센서 캘리브레이션 메모와 오탐·미탐 분석표",
    "smart-factory-automation-engineer": "설비 I/O 정의표와 OEE 개선 리포트",
    "plc-instrumentation-engineer": "PLC 시퀀스와 인터록 점검표",
    "power-systems-engineer": "전력 부하 요구사항표와 보호계전 검토표",
    "ess-bms-engineer": "ESS 구성·보호 로직 테스트 케이스",
    "power-electronics-inverter-engineer": "인버터 계측 결과와 EMI·발열 검토표",
    "electric-machine-drive-engineer": "모터드라이브 제어 응답과 효율 분석 리포트",
    "renewable-energy-grid-engineer": "계통연계 조건 검토표와 운영 데이터 리포트",
    "manufacturing-ai-engineer": "제조 AI 데이터 정의서와 모델 평가 리포트",
    "predictive-maintenance-ai-engineer": "설비 이상탐지 리포트와 정비 우선순위표",
    "vision-inspection-ai-engineer": "비전검사 라벨 기준표와 오탐·미탐 분석표",
    "engineering-data-analyst": "공학 데이터 대시보드와 원인 가설 리포트",
    "simulation-ai-engineer": "시뮬레이션 상관 검증표와 최적화 결과 리포트",
    "autonomous-perception-engineer": "자율주행 인지 모델 평가표와 오탐·미탐 분석 리포트",
    "sensor-fusion-localization-engineer": "센서/CAN 로그 동기화표와 localization 오차 분석 리포트",
    "autonomous-planning-control-engineer": "주행 시나리오별 경로계획·제어 응답 검증 리포트",
    "autonomous-simulation-validation-engineer": "자율주행 시나리오 검증표와 corner case 리포트",
    "vehicle-sw-platform-engineer": "AUTOSAR SWC 인터페이스 정의서와 통합 테스트 케이스",
    "vehicle-diagnostics-ota-engineer": "UDS·OTA 테스트 케이스와 실패 로그 분석 리포트",
    "vehicle-cybersecurity-engineer": "TARA 위협분석표와 차량 보안 요구사항 검증표",
    "data-center-electrical-infra-engineer": "전력 단선도 검토표와 장애 대응 체크리스트",
    "data-center-cooling-engineer": "냉각 용량 계산표와 온도 로그 개선 리포트",
    "dcim-bms-operations-engineer": "BMS/DCIM 알람 분석 대시보드 초안",
    "advanced-packaging-engineer": "패키지 구조·공정 조건표와 불량 모드 연결표",
    "semiconductor-test-engineer": "Test bin Pareto와 수율 원인 가설 리포트",
    "packaging-reliability-fa-engineer": "패키지 신뢰성 시험·FA 원인분석 리포트",
    "mes-scada-integration-engineer": "PLC-SCADA-MES 인터페이스 정의서",
    "industrial-data-engineer": "OEE·불량·정지 손실 대시보드와 개선 우선순위표",
    "smart-factory-vision-engineer": "비전검사 라벨 기준표와 오탐·미탐 개선 리포트",
    "hydrogen-process-engineer": "수소 공정 흐름도와 안전 리스크 체크리스트",
    "ccus-process-engineer": "CCUS 공정 성능 비교표와 에너지 리스크 메모",
    "water-treatment-process-engineer": "수질 지표-처리 공정 운영 리포트",
    "polymer-film-materials-engineer": "고분자·필름 조성-물성 비교표와 scale-up 리스크표",
    "battery-recycling-process-engineer": "배터리 리사이클 회수율·순도 계산표와 환경안전 체크리스트"
  };
  if (roleOutputById[role.id]) return roleOutputById[role.id];
  if (role.title.includes("필드이슈") || role.title.includes("Warranty")) return "필드이슈 8D 원인분석표와 보증 데이터 기반 품질 개선 리포트";
  if (role.title.includes("내외장") || role.title.includes("의장")) return "내외장 설계·감성품질 체크리스트와 품질 이슈 원인 가설표";
  if (role.title.includes("기능안전") || role.title.includes("SOTIF")) return "HARA-안전요구사항 추적표와 safety case 초안";
  if (role.title.includes("캘리브레이션")) return "캘리브레이션 파라미터 변경 근거표와 로그 비교 리포트";
  if (role.title.includes("BMS")) return "BMS 요구사항-테스트 케이스표와 fault 로그 분석 리포트";
  if (role.title.includes("하네스")) return "하네스 회로·경로 검토표와 변경 영향 분석표";
  if (role.title.includes("양산")) return "신차 양산 준비 체크리스트와 초기 품질 개선 리포트";
  if (role.title.includes("검증") || role.title.includes("시험")) return "시험계획서와 Pass/Fail 검증 리포트";
  if (role.title.includes("품질") || role.title.includes("공정")) return "조건 변경 검토표와 개선 보고서";
  if (role.title.includes("설계") || role.title.includes("하드웨어")) return "요구사항표, 설계 검토표, 측정 리포트";
  if (role.title.includes("데이터") || role.title.includes("수율")) return "데이터 분석 노트와 원인 가설 리포트";
  if (role.title.includes("펌웨어") || role.title.includes("소프트웨어") || role.title.includes("제어")) return "동작 로그, 테스트 케이스, README";
  return track.outputs[0] || "직무 산출물";
}

function renderMajorConnectionPanel(track, role) {
  const label = getMajorPathwayLabel(track, role);
  const reason = getMajorPathwayReason(track, role);
  const focus = getMajorPathwayFocus(track, role);
  const badges = getMajorConnectionBadges(track, role);
  return `
    <div class="major-connection-panel" aria-label="${getMajorLabel()} 전공과 ${role.title} 연결성">
      <div>
        <p class="eyebrow">전공 연결성</p>
        <h4>${getMajorLabel()} → ${role.title}</h4>
      </div>
      <p><strong>${label}</strong> ${reason} ${focus}</p>
      <div class="badge-row">
        ${badges.map((badge) => `<span class="badge">${badge}</span>`).join("")}
      </div>
    </div>
  `;
}

function getMajorConnectionBadges(track, role) {
  const pathway = getMajorPathway(track, role);
  const base = role.postingKeywords.slice(0, 3);
  if (pathway === "direct") return [...base, "미체크 역량만 보완"];
  if (pathway === "bridge") return [...base.slice(0, 2), "전공 확장", "보완 커리큘럼 필요"];
  if (pathway === "challenge") return [...base.slice(0, 2), "도전 직무", "기초 확인 우선"];
  return [...base.slice(0, 2), "직무 탐색", "기초 확인 우선"];
}

function roleFitBlock(title, items) {
  return `
    <div class="role-fit-block">
      <h4>${title}</h4>
      <ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>
    </div>
  `;
}

function getRoleWordCloudTerms(track, role) {
  const weightedTerms = [];
  addWeightedRoleTerms(weightedTerms, role.postingKeywords, 24);
  addWeightedRoleTerms(weightedTerms, role.coreTerms, 28);
  addWeightedRoleTerms(weightedTerms, role.tools, 22);
  addWeightedRoleTerms(weightedTerms, extractRoleTerms(role.coreWork), 20);
  addWeightedRoleTerms(weightedTerms, role.coreCompetencies, 18);
  addWeightedRoleTerms(weightedTerms, getRoleExplicitToolTerms(track, role), 18);
  addWeightedRoleTerms(weightedTerms, extractRoleTerms(role.responsibilities), 19);
  addWeightedRoleTerms(weightedTerms, extractRoleTerms(role.requirements), 17);
  addWeightedRoleTerms(weightedTerms, extractRoleTerms(role.focus), 15);
  addWeightedRoleTerms(weightedTerms, extractRoleTerms(role.preferred), 12);
  addWeightedRoleTerms(weightedTerms, getRoleDiagnosticTerms(role), 16);
  addWeightedRoleTerms(weightedTerms, getRoleSimulationTerms(track, role), 14);
  addWeightedRoleTerms(weightedTerms, getTrackToolTerms(track), 8);

  const scoreMap = new Map();
  weightedTerms.forEach(({ word, weight }) => {
    const cleanWord = cleanRoleTerm(word);
    const key = getRoleTermKey(cleanWord);
    if (!key || cleanWord.length < 2 || roleTermStopWords.has(cleanWord)) return;
    const current = scoreMap.get(key) || { word: cleanWord, score: 0 };
    current.score += weight;
    scoreMap.set(key, current);
  });

  const terms = [...scoreMap.values()].sort((a, b) => b.score - a.score);
  const maxScore = terms[0]?.score || 1;
  return terms.map((term) => ({
    ...term,
    level: Math.max(1, Math.min(6, Math.ceil((term.score / maxScore) * 6)))
  }));
}

function getRoleExplicitToolTerms(track, role) {
  const roleText = [
    role.title,
    role.focus,
    role.coreWork,
    ...(role.postingKeywords || []),
    ...(role.coreTerms || []),
    ...(role.tools || []),
    ...(role.coreCompetencies || []),
    ...(role.responsibilities || []),
    ...(role.requirements || []),
    ...(role.preferred || []),
    ...getRoleDiagnosticTerms(role)
  ].join(" ");
  const toolTerms = [
    "MATLAB", "Simulink", "Simscape", "Stateflow", "Python", "SQL", "Excel",
    "Minitab", "JMP", "Power BI", "Tableau", "Spotfire", "Aspen Plus", "Aspen HYSYS",
    "Aspen", "HYSYS", "COMSOL", "gPROMS", "LIMS", "MES", "FDC", "APC", "EES", "SECS/GEM", "GEM300", "EDA/Interface A", "ERP", "SPC", "DOE",
    "MSA", "Gauge R&R", "APQP", "PPAP", "Control Plan", "8D", "A3", "IATF 16949",
    "CATIA", "NX", "Creo", "SolidWorks", "Teamcenter", "Windchill", "PLM", "GD&T",
    "DFMEA", "PFMEA", "DVP&R", "ANSYS Mechanical", "ANSYS Fluent", "Abaqus", "HyperMesh",
    "HyperView", "HyperWorks", "nCode", "Adams", "GT-SUITE", "Amesim", "AVL Cruise",
    "CFD", "FEA", "SPICE", "LTspice", "PLECS", "PSIM", "PCB CAD", "Altium Designer",
    "OrCAD", "PADS", "KiCad", "Sigrity", "오실로스코프", "멀티미터", "Logic Analyzer",
    "전류 프로브", "전력분석기", "환경챔버", "데이터로거", "STM32", "Arduino", "Git",
    "JIRA", "Polarion", "DOORS", "CANoe", "CANalyzer", "CANape", "INCA", "CAPL",
    "AUTOSAR", "AUTOSAR Classic", "AUTOSAR Adaptive", "UDS", "DTC", "DBC", "ODX",
    "XCP", "HIL", "SIL", "MIL", "dSPACE", "NI VeriStand", "Vector", "CarMaker",
    "SOME/IP", "DDS", "ara::com", "DoIP", "OTA", "FOTA", "SOTA", "ISO 21434", "UNECE R155", "UNECE R156",
    "Cybersecurity", "Secure Boot", "HSM", "TARA", "SBOM", "QNX", "Adaptive Platform",
    "PreScan", "RoadRunner", "Aerospace Blockset", "UAV Toolbox", "PX4", "ArduPilot", "QGroundControl",
    "STK", "DO-178C", "DO-254", "MIL-STD-810", "MIL-STD-461", "AESA", "Radar", "RF",
    "GNSS", "IMU", "INS", "Kalman Filter", "ROS", "ROS2", "Gazebo", "RViz", "SLAM", "Nav2", "MoveIt",
    "OpenCV", "PCL", "YOLO", "NVIDIA Jetson", "CUDA", "TensorRT", "TensorFlow", "PyTorch",
    "MLflow", "DVC", "Docker", "Kubernetes", "Yocto",
    "Buildroot", "BSP", "Kernel", "Linux", "Device tree", "PLC", "EtherCAT", "Profinet", "OPC UA",
    "PCS", "ESS", "EMS", "BMS", "PMSM", "FOC", "VFD", "UPS", "DCIM", "PUE", "CRAC", "CRAH", "chiller",
    "Advanced Packaging", "HBM", "TSV", "interposer", "ATE", "Probe Test", "Final Test", "C-SAM", "HTOL", "HAST",
    "CD-SEM", "SEM", "SEM/EDS", "FIB", "KLA", "OES", "RGA", "ellipsometry", "scatterometry", "WAT", "PCM", "SCADA", "BMS/FMS", "XRD",
    "FTIR", "DSC", "TGA", "GC/MS", "HPLC", "ICP", "TOC", "RO", "CCUS", "CO2", "수소", "Scale-up", "HAZOP", "PSM", "MSDS", "GMP", "SOP"
  ];

  return uniqueRoleTerms([
    ...(role.tools || []),
    ...toolTerms.filter((term) => roleTextMatchesTerm(roleText, term))
  ].flatMap(splitRoleToolTerm));
}

function getRoleSimulationTerms(track, role) {
  const text = getRoleCombinedText(track, role);
  const simulationTerms = [];
  if (/(시뮬레이션|Simulink|Simscape|Stateflow|HIL|SIL|CarMaker|PreScan|Gazebo|SPICE)/i.test(text)) simulationTerms.push("시뮬레이션");
  if (/(모델링|모델|Model|MIL|SIL|HIL|Simulink|Simscape|Stateflow)/i.test(text)) simulationTerms.push("모델링");
  if (/(FEA|CFD|해석|ANSYS|Abaqus|HyperWorks)/i.test(text)) simulationTerms.push("해석");
  if (/(검증|Validation|Test Case|Pass\/Fail|DVP|HIL|SIL)/i.test(text)) simulationTerms.push("검증");
  return uniqueRoleTerms(simulationTerms);
}

function getTrackToolTerms(track) {
  return uniqueRoleTerms((track.tools || []).flatMap(splitRoleToolTerm));
}

function getRoleDiagnosticTerms(role) {
  return (roleDiagnostics[role.id] || []).flatMap(([skill, description]) => [
    skill,
    ...extractRoleTerms(description).slice(0, 4)
  ]);
}

function splitRoleToolTerm(term) {
  return String(term || "")
    .split(/[\/·,]/)
    .map((part) => cleanRoleTerm(part.replace(/\s*기초$/, "")))
    .filter(Boolean);
}

function roleTextMatchesTerm(text, term) {
  const escapedTerm = escapeRegExp(String(term));
  return new RegExp(`(^|[^0-9A-Za-z가-힣+#&])${escapedTerm}([^0-9A-Za-z가-힣+#&]|$)`, "i").test(text);
}

function uniqueRoleTerms(terms) {
  const seen = new Set();
  return terms.filter((term) => {
    const cleanTerm = cleanRoleTerm(term);
    const key = getRoleTermKey(cleanTerm);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function addWeightedRoleTerms(target, words, weight) {
  (words || []).forEach((word) => {
    String(word || "")
      .replace(/\s+(및|또는)\s+/g, ",")
      .split(/[\/·,;]/)
      .map((part) => part.trim())
      .filter(Boolean)
      .forEach((part) => target.push({ word: part, weight }));
  });
}

function extractRoleTerms(values) {
  const text = (Array.isArray(values) ? values : [values]).join(" ");
  const normalized = text
    .replace(/[.,;:()[\]{}"'`]/g, " ")
    .replace(/[·\/]/g, " ")
    .replace(/\s+/g, " ");

  return normalized.split(" ")
    .map((part) => cleanRoleTerm(part).replace(/(에서|으로|부터|까지|처럼|에게|와|과|을|를|이|가|은|는|의|에|로|도|만)$/g, ""))
    .filter((part) => part.length >= 2)
    .filter((part) => !roleTermStopWords.has(part))
    .filter((part) => !part.includes("합니다"));
}

function cleanRoleTerm(word) {
  return String(word || "")
    .replace(/[^0-9A-Za-z가-힣+#&\s-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getRoleTermKey(word) {
  return word.toLowerCase().replace(/[\s\/-]+/g, "");
}

const roleTermStopWords = new Set([
  "직무", "엔지니어", "담당", "기초", "이해", "활용", "작성", "정리", "관리", "기반",
  "경험", "역량", "조건", "결과", "문서화", "리포트", "계획", "요구사항", "가능성",
  "비교", "정의", "설명", "기준", "역할", "사용", "수행", "지원", "문제", "이슈",
  "기본", "신규", "또는", "같은", "위한", "통한", "등", "수", "할", "있는", "검토",
  "개선", "확인", "연결", "제안", "수립", "운영", "대응", "필요", "업무", "현업",
  "상세", "반복", "자격", "우대", "중심", "실제", "주요", "핵심", "설계", "해석",
  "시험", "검증", "구조", "기능", "로그", "데이터", "시스템", "자료", "항목", "변경",
  "Pass", "Fail", "pass", "fail"
]);

function getRoleFitSignals(track, role) {
  const keywordText = role.postingKeywords.slice(0, 3).join(", ");
  return [
    `${keywordText} 같은 공고 키워드가 내가 찾는 업무와 맞습니다.`,
    `${role.responsibilities[0]} 업무를 실제 사례로 설명해 보고 싶습니다.`,
    `${role.requirements[0]}을 수업, 프로젝트, 실습 산출물로 증명할 수 있습니다.`
  ].filter(Boolean);
}

function getRoleCautionSignals(track, role) {
  const text = getRoleCombinedText(track, role);
  const cautions = [];
  if (/(데이터|SQL|Python|통계|SPC|Cpk|Pareto|수율|불량)/i.test(text)) {
    cautions.push("데이터 정리, 이상치 확인, 표·그래프 해석을 반복하는 비중이 있습니다.");
  }
  if (/(현장|설비|라인|장비|양산|협력사|클린룸|공정)/.test(text)) {
    cautions.push("현장 조건, 설비 상태, 타 부서 피드백을 함께 보며 판단해야 합니다.");
  }
  if (/(문서|보고|표준|SOP|batch|Validation|검토표|리포트|기록|변경관리)/i.test(text)) {
    cautions.push("변경 근거와 검증 결과를 문서로 남기는 일이 직무의 일부입니다.");
  }
  if (/(시험|검증|계측|측정|오실로스코프|로그|Test|Pass|Fail)/i.test(text)) {
    cautions.push("측정 계획, 재현성, Pass/Fail 기준을 세우는 일이 중요합니다.");
  }
  if (/(코드|C\+\+|Linux|ROS|MCU|UART|Driver|Kernel|Yocto|펌웨어|디버깅)/i.test(text)) {
    cautions.push("코드, 로그, 하드웨어 인터페이스를 끝까지 추적하는 디버깅 비중이 있습니다.");
  }

  return (cautions.length ? cautions : [
    `${role.title}은 단일 툴 사용보다 ${role.postingKeywords.slice(0, 2).join("·")} 판단을 산출물로 설명하는 일이 중요합니다.`,
    "업무가 맞는지 보려면 공고 키워드보다 반복 업무와 요구 산출물을 함께 확인해야 합니다."
  ]).slice(0, 3);
}

function getRoleDecisionQuestions(track, role) {
  return [
    `공고에서 ${role.postingKeywords.slice(0, 3).join(", ")}가 반복될 때 실제로 어떤 업무를 하는지 말할 수 있습니까?`,
    `${role.responsibilities[0]}에 필요한 입력 데이터, 도면, 장비, 기준 중 무엇을 확인해야 하는지 떠올릴 수 있습니까?`,
    `${role.requirements[0]}을 내 프로젝트나 수업 산출물로 증명할 수 있습니까?`
  ].filter(Boolean);
}

function getRoleArtifactExamples(track, role) {
  const text = getRoleCombinedText(track, role);
  const examples = [];
  if (/(CAD|도면|공차|기구|DFM|DFA|제조성)/i.test(text)) examples.push("2D 도면·공차 검토표와 설계 변경 근거");
  if (/(해석|FEA|CFD|열|유동|메시|경계조건)/i.test(text)) examples.push("해석 조건표, 메시 민감도, 시험 대비 검증 리포트");
  if (/(SPC|Cpk|FMEA|8D|품질|불량|검사)/i.test(text)) examples.push("관리도·Cpk 분석표, 불량 Pareto, 8D 개선 보고서");
  if (/(공정|Recipe|수율|조건변경|DOE|Pareto|CTQ)/i.test(text)) examples.push("공정 변수-품질 지표 연결표와 조건 변경 검토표");
  if (/(반도체|웨이퍼|Defect|CD|식각|플라즈마|계측|장비)/i.test(text)) examples.push("Recipe 변경 이력, 계측 지표, 장비 로그 기반 원인 가설");
  if (/(PCB|회로|전원|리플|EMC|오실로스코프|부품선정)/i.test(text)) examples.push("회로 블록도, 부품 선정표, 측정 포인트와 검증 결과");
  if (/(MCU|펌웨어|UART|SPI|I2C|CAN|PWM|ADC)/i.test(text)) examples.push("주변장치 매핑표, 통신 로그, 디버깅 재현 절차");
  if (/(자율주행|Perception|Sensor Fusion|Localization|Planning|RoadRunner|SDV|UDS|OTA|ISO 21434|SOME\/IP)/i.test(text)) examples.push("자율주행 시나리오 검증표, 센서/CAN 로그 동기화표, 차량 SW 인터페이스 정의서");
  if (/(데이터센터|UPS|DCIM|BMS|PUE|HVAC|냉각|CRAC|CRAH)/i.test(text)) examples.push("전력 단선도, 냉각 용량 계산표, BMS/DCIM 알람 분석표");
  if (/(Advanced Packaging|HBM|패키징|Probe|Final Test|ATE|C-SAM|HTOL|HAST|신뢰성)/i.test(text)) examples.push("패키지 구조표, test bin Pareto, 신뢰성·FA 원인분석 리포트");
  if (/(MES|SCADA|OPC UA|OEE|스마트팩토리|비전검사|OpenCV|YOLO)/i.test(text)) examples.push("설비 데이터 정의서, OEE 손실 Pareto, 비전검사 오탐·미탐 분석표");
  if (/(수소|CCUS|수처리|폐수|고분자|필름|리사이클|Scale-up|HAZOP|PSM)/i.test(text)) examples.push("공정 흐름도, 물질수지 계산표, scale-up·환경안전 리스크표");
  if (/(차량|차체|BIW|섀시|현가|조향|제동|파워트레인|구동계|배터리팩|BMS|E\/E|ECU|ADAS|HIL|SIL|DVP&R|실차|CANoe|AUTOSAR)/i.test(text)) examples.push("차량 요구사항표, 인터페이스 정의서, 시험계획서와 검증 리포트");
  if (/(Linux|Device Driver|Kernel|Yocto|BSP|부팅)/i.test(text)) examples.push("device tree·드라이버 로그 분석 메모와 이미지 빌드 흐름도");
  if (/(ROS|Navigation|SLAM|로봇|센서)/i.test(text)) examples.push("ROS 노드·토픽 구성도와 센서 데이터 흐름 로그");
  if (/(HAZOP|PSM|MSDS|안전|환경|위험)/i.test(text)) examples.push("HAZOP 체크리스트와 변경관리 위험 검토표");
  if (/(GMP|Validation|SOP|batch|바이오|제약)/i.test(text)) examples.push("SOP·batch record 항목 매핑과 validation 체크리스트");
  if (/(배터리|전극|슬러리|코팅|조립|활성화)/i.test(text)) examples.push("전극 공정 조건표와 수율·불량 데이터 분석");
  if (/(소재|합성|분석|물성|Scale-up)/i.test(text)) examples.push("조성·합성 조건과 물성 평가 결과 비교표");

  return [...new Set(examples.length ? examples : track.outputs)].slice(0, 4);
}

function getRoleCombinedText(track, role) {
  return [
    track.title,
    track.summary,
    ...(track.tools || []),
    role.title,
    role.focus,
    role.coreWork,
    ...(role.postingKeywords || []),
    ...(role.coreTerms || []),
    ...(role.tools || []),
    ...(role.coreCompetencies || []),
    ...(role.responsibilities || []),
    ...(role.requirements || []),
    ...(role.preferred || []),
    ...getRoleDiagnosticTerms(role)
  ].join(" ");
}

function detailBlock(title, items) {
  return `
    <div>
      <h4>${title}</h4>
      <ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>
    </div>
  `;
}

function renderDiagnostics() {
  if (!hasActiveRoleSelection()) {
    elements.diagnosisTitle.textContent = "직무를 먼저 선택하세요";
    elements.diagnosisGuide.innerHTML = `
      <div class="empty-state">지원하려는 세부 직무를 선택하면 그 직무의 반복 업무, 자격조건, 우대역량 기준으로 역량 체크가 열립니다.</div>
    `;
    elements.diagnosticList.innerHTML = "";
    elements.gapList.innerHTML = "";
    elements.scoreBadge.textContent = "0%";
    elements.scoreBar.style.width = "0%";
    return;
  }

  const track = getSelectedTrack();
  const role = getSelectedRole(track.id);
  const questions = getDiagnosticItems(track);
  elements.diagnosisTitle.textContent = role ? `${track.title} · ${role.title}` : track.title;
  elements.diagnosisGuide.innerHTML = renderDiagnosisGuide(track, role, questions);
  elements.diagnosticList.innerHTML = renderDiagnosticGroups(questions);

  elements.diagnosticList.querySelectorAll("[data-check-id]").forEach((input) => {
    input.addEventListener("change", () => {
      state.checked[input.dataset.checkId] = input.checked;
      saveState();
      renderDiagnostics();
      renderRoadmap();
      renderSaved();
      renderMetrics();
      renderWorkflowStatus();
      renderRoleContextBar();
    });
  });

  const score = getDiagnosticScore(track.id);
  elements.scoreBadge.textContent = `${score}%`;
  elements.scoreBar.style.width = `${score}%`;

  const gaps = getGapItems(track.id);

  elements.gapList.innerHTML = gaps.length
    ? gaps.map((item) => `
      <article class="gap-item">
        <strong>${item.skill}</strong>
        <p>${item.question}</p>
        <p class="gap-action">이 항목은 커리큘럼과 교육자료 추천에서 우선 보완 대상으로 사용됩니다.</p>
      </article>
    `).join("") + renderDiagnosisNextAction(gaps.length)
    : `<div class="empty-state">현재 체크리스트 기준으로 큰 공백이 없습니다. 산출물 정리 단계로 넘어가세요.</div>${renderDiagnosisNextAction(0)}`;
}

function renderDiagnosisNextAction(gapCount) {
  return `
    <div class="diagnosis-next-panel">
      <div>
        <strong>${gapCount ? `${gapCount}개 부족 역량 기준으로 커리큘럼을 구성합니다` : "보완 공백이 낮아 산출물 정리 중심으로 넘어갑니다"}</strong>
        <span>체크한 보유 역량은 뒤로 두고, 미체크 항목과 선택 직무 산출물을 우선 추천합니다.</span>
      </div>
      <button class="primary-button" type="button" data-view-target="roadmap">부족 역량 기준 교육 선택</button>
    </div>
  `;
}

function renderDiagnosticGroups(questions) {
  const groups = questions.reduce((acc, item) => {
    if (!acc.has(item.source)) acc.set(item.source, []);
    acc.get(item.source).push(item);
    return acc;
  }, new Map());

  return [...groups.entries()].map(([source, items], index) => {
    const checkedCount = items.filter((item) => state.checked[item.id]).length;
    const open = index < 2 || checkedCount < items.length;
    return `
      <section class="diagnostic-group">
        <details ${open ? "open" : ""}>
          <summary>
            <span>
              <strong>${source}</strong>
              <em>${checkedCount}/${items.length}개 확보</em>
            </span>
          </summary>
          <div class="diagnostic-group-items">
            ${items.map(renderDiagnosticCheckItem).join("")}
          </div>
        </details>
      </section>
    `;
  }).join("");
}

function renderDiagnosticCheckItem(item) {
  const checked = Boolean(state.checked[item.id]);
  return `
    <label class="check-item ${checked ? "is-checked" : ""}">
      <input type="checkbox" data-check-id="${item.id}" aria-label="${item.skill} 역량 보유 여부" ${checked ? "checked" : ""}>
      <span>
        <span class="diagnostic-source">${item.source}</span>
        <span class="diagnostic-state">${checked ? "확보함" : "보완 필요"}</span>
        <strong>${item.skill}</strong>
        <span class="diagnostic-question">${item.question}</span>
        <span class="diagnostic-choice-rule">체크 기준: 도움 없이 설명하거나 간단한 산출물로 증명할 수 있을 때만 체크하세요.</span>
      </span>
    </label>
  `;
}

function renderDiagnosisGuide(track, role, questions) {
  const roleItems = questions.filter((item) => item.source === role?.title).length;
  const industryItems = questions.filter((item) => item.source === getIndustryLabel()).length;
  const checkedCount = questions.filter((item) => state.checked[item.id]).length;
  const gapCount = Math.max(questions.length - checkedCount, 0);
  const gapPreview = questions
    .filter((item) => !state.checked[item.id])
    .slice(0, 4)
    .map((item) => item.skill)
    .join(", ") || "큰 공백 없음";
  const aiProfile = getRoleAiCompetencyProfile(role);
  const aiProfileKeywords = aiProfile?.keywords?.length
    ? aiProfile.keywords
    : (role?.postingKeywords || []);
  const output = role ? getRoleCurriculumOutput(track, role) : track.outputs[0];
  const diagnosisScope = [
    "트랙 공통",
    role ? `${role.title} ${roleItems}개` : "",
    industryItems ? `${getIndustryLabel()} 산업 ${industryItems}개` : ""
  ].filter(Boolean).join(" · ");
  return `
    <div>
      <p class="eyebrow">선택 기준</p>
      <h3>채용공고에서 요구하는 역량 중 내가 확보한 내용만 체크</h3>
      <p>${diagnosisScope} 기준으로 확보 여부를 확인합니다. 체크하지 않은 항목은 내 커리큘럼의 주차별 과제와 교육자료 추천에 바로 반영됩니다.</p>
    </div>
    <div class="diagnosis-context-strip" aria-label="진단 현황">
      <span><strong>선택 직무</strong>${role?.title || track.title}</span>
      <span><strong>체크 완료</strong>${checkedCount}/${questions.length}개</span>
      <span><strong>커리큘럼 반영</strong>${gapCount}개 보완 역량</span>
    </div>
    <div class="diagnosis-focus-panel">
      <div>
        <strong>커리큘럼에서 우선 볼 역량</strong>
        <span>${gapPreview}</span>
      </div>
      <div>
        <strong>최종 산출물</strong>
        <span>${output}</span>
      </div>
      ${aiProfile ? `
        <div>
          <strong>AI·데이터 역량</strong>
          <span>${aiProfile.level} · ${aiProfileKeywords.slice(0, 3).join(", ")}</span>
        </div>
      ` : ""}
    </div>
    <div class="diagnosis-guide-grid">
      <span><strong>확보함</strong>혼자 설명, 실습, 산출물 중 하나로 증명 가능</span>
      <span><strong>보완 필요</strong>개념만 들어봤거나 예제를 보고도 막히는 상태</span>
      <span><strong>헷갈림</strong>보완 필요로 두면 추천 자료에서 우선 보완</span>
    </div>
    <div class="flow-actions">
      <button class="primary-button" type="button" data-view-target="roadmap">부족 역량 기준 교육 선택</button>
    </div>
  `;
}

function getDiagnosticScore(trackId) {
  const track = tracks.find((item) => item.id === trackId);
  const questions = getDiagnosticItems(track);
  if (!questions.length) return 0;
  const checkedCount = questions.filter((item) => state.checked[item.id]).length;
  return Math.round((checkedCount / questions.length) * 100);
}

function getGapItems(trackId) {
  const track = tracks.find((item) => item.id === trackId);
  return getDiagnosticItems(track).filter((item) => !state.checked[item.id]);
}

function getGapSkills(trackId) {
  return getGapItems(trackId).map((item) => item.skill);
}

function getAcquiredSkills(trackId) {
  const track = tracks.find((item) => item.id === trackId);
  return getDiagnosticItems(track)
    .filter((item) => state.checked[item.id])
    .map((item) => item.skill);
}

function getDiagnosticItems(track) {
  if (!track) return [];

  const role = getSelectedRole(track.id);
  const baseItems = (diagnostics[track.id] || []).map(([skill, question], index) => ({
    id: `${track.id}-base-${index}`,
    skill,
    question,
    source: "트랙 공통"
  }));
  const roleItems = role ? (roleDiagnostics[role.id] || []).map(([skill, question], index) => ({
    id: `${track.id}-${role.id}-role-${index}`,
    skill,
    question,
    source: role.title
  })) : [];
  const industryItems = state.profile.industry === "all" ? [] : (industryDiagnostics[state.profile.industry] || []).map(([skill, question], index) => ({
    id: `${track.id}-${state.profile.industry}-industry-${index}`,
    skill,
    question,
    source: getIndustryLabel()
  }));

  return [...baseItems, ...roleItems, ...industryItems];
}

function renderRoadmap() {
  if (!hasActiveRoleSelection()) {
    elements.roadmapTitle.textContent = "직무 선택 후 교육 추천";
    elements.roadmapGuidance.innerHTML = `
      <div class="empty-state">세부 직무를 먼저 선택하세요. 선택 직무와 역량 체크 결과를 기준으로 주차별 과제와 교육자료를 추천합니다.</div>
    `;
    elements.roadmapList.innerHTML = "";
    return;
  }

  const track = getSelectedTrack();
  const role = getSelectedRole(track.id);
  const tasks = getVisibleRoadmapTasks(track.id);
  const context = getRecommendationContext(track, getGapSkills(track.id), tasks);
  const roadmapResourceUseCounts = new Map();
  elements.roadmapTitle.textContent = `${role?.title || track.title} 교육 선택`;
  renderRoadmapGuidance(context, tasks);
  elements.roadmapList.innerHTML = tasks.map((task, index) => {
    const linkedResources = getRoadmapResourcesForTask(track, task, context, roadmapResourceUseCounts);
    linkedResources.forEach((resource) => {
      roadmapResourceUseCounts.set(resource.id, (roadmapResourceUseCounts.get(resource.id) || 0) + 1);
    });
    return `
    <article class="week-card">
      <span class="week-number">${task.weekLabel || `${index + 1}주차`}</span>
      <h3>${task.title}</h3>
      <p>${task.objective}</p>
      <div class="task-meta">
        ${task.phase ? `<span class="badge">${task.phase}</span>` : ""}
        <span class="badge">예상 ${task.time}</span>
        <span class="badge">${task.deliverable}</span>
      </div>
      ${task.priorityReason ? `<div class="recommendation-note"><strong>추천 이유:</strong> ${task.priorityReason}</div>` : ""}
      <div>
        <h4>수행 단계</h4>
        <ol class="task-steps">${task.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
      </div>
      <div>
        <h4>통과 기준</h4>
        <ul class="rubric-list">${task.rubric.map((item) => `<li>${item}</li>`).join("")}</ul>
      </div>
      <div class="roadmap-resource-block">
        <h4>추천 교육·실습자료</h4>
        <p class="roadmap-resource-guide">${getRoadmapResourceGuideText(task)}</p>
        ${linkedResources.length
          ? `<div class="roadmap-resource-list">${linkedResources.map((resource) => renderRoadmapResourceItem(resource, task, context)).join("")}</div>`
          : renderRoadmapResourceEmptyState(task)}
      </div>
    </article>
  `;
  }).join("");

  bindResourceActions(elements.roadmapGuidance);
  bindResourceActions(elements.roadmapList);
}

function getRoadmapResourceGuideText(task) {
  if (isExtendedRoadmapTask(task)) {
    return "앞 주차에서 고른 교육과 산출물을 다시 쓰는 반복·보강 주차입니다. 새 교육은 직무 산출물에 직접 맞을 때만 추가로 보여줍니다.";
  }
  return "체크하지 않은 역량과 이번 주 산출물에 맞춘 자료입니다. 교육내용 상세보기를 열어 소개를 확인한 뒤 필요한 자료만 추가하세요.";
}

function renderRoadmapResourceEmptyState(task) {
  if (isExtendedRoadmapTask(task)) {
    return `<div class="empty-state compact">이 주차는 새 짧은 교육을 다시 추천하지 않고, 앞 주차 산출물을 다른 조건으로 반복·보강하는 구간입니다.</div>`;
  }
  if (isPostingFitTask(task)) {
    return `<div class="empty-state compact">회사 공고 맞춤 점검 주차입니다. 공통 broad 교육 대신 앞 주차 산출물과 공고 키워드를 직접 대조하세요.</div>`;
  }
  return `<div class="empty-state compact">직무와 산출물에 직접 맞는 검토 완료 교육자료가 아직 없습니다. 약한 broad 후보는 추천에서 제외했습니다.</div>`;
}

function isExtendedRoadmapTask(task) {
  return /심화 반복|산출물 보강/.test(task?.phase || "")
    || /반복본|보강본/.test(task?.deliverable || "");
}

function isPostingFitTask(task) {
  return /회사 공고|공고 맞춤|보완 체크리스트/.test([
    task?.title,
    task?.objective,
    task?.deliverable,
    ...(task?.steps || [])
  ].join(" "));
}

function renderRoadmapGuidance(context, tasks) {
  if (!elements.roadmapGuidance) return;
  const selectedResources = getSavedResources();
  const roleResourceCount = getRoleLinkedResourceIds(context.role).length;
  const gapText = context.gapSkills.length ? context.gapSkills.slice(0, 4).join(", ") : "큰 공백 없음";
  const checkedCount = context.acquiredSkills.length;
  const durationStrategy = getDurationStrategy();
  const practiceResourceCount = getRecommendedResources(context.track, context)
    .filter(isHandsOnResource)
    .length;
  const selectedText = selectedResources.length
    ? `${selectedResources.length}개 교육을 내 커리큘럼에 담았습니다.`
    : "추천 교육을 먼저 훑고 필요한 것만 내 커리큘럼에 담으세요.";

  elements.roadmapGuidance.innerHTML = `
    <section class="curriculum-overview-panel" aria-label="추천 교육 선택 흐름">
      <div class="curriculum-overview-copy">
        <p class="eyebrow">추천 교육 선택</p>
        <h3>지금은 부족 역량에 맞는 교육을 고르는 단계입니다</h3>
        <p>${durationStrategy.summary} 보유 역량은 제외하고, 보완 역량(${gapText})과 첫 산출물 중심으로 추천합니다.</p>
      </div>
      <ol class="curriculum-flow-list" aria-label="직무 준비 진행 흐름">
        <li class="is-done"><strong>직무 확인</strong><span>직무상세 확인</span></li>
        <li class="is-done"><strong>부족 역량</strong><span>보유 역량 제외</span></li>
        <li class="is-current"><strong>교육 선택</strong><span>현재 단계</span></li>
        <li><strong>내 커리큘럼</strong><span>선택 후 확인</span></li>
      </ol>
    </section>
    ${renderRoadmapDecisionPanel(context, tasks)}
    ${renderTodayStartPanel(context, tasks)}
    ${renderStarterPackPanel(context, tasks)}
    ${renderEducationSummaryPanel(context, tasks, selectedText)}
    ${checkedCount ? "" : `
      <div class="workflow-warning">
        <strong>보유 역량 체크 전입니다</strong>
        아직 확보한 역량을 체크하지 않아 모든 역량 항목을 보완 대상으로 보고 있습니다. 실제 보유 역량을 체크하면 이미 아는 내용은 뒤로 빠지고 부족 역량 중심으로 커리큘럼이 다시 좁혀집니다.
        <button class="ghost-button" type="button" data-view-target="diagnosis">역량 체크하기</button>
      </div>
    `}
    <p class="company-detail-inline is-important"><strong>지원 전 필수 확인</strong> 이 커리큘럼 제안은 일반적인 직무내용을 기반으로 추천합니다. 지원 회사의 직무상세에 나온 업무·자격요건·우대사항을 반드시 확인하고, 공고와 직접 맞닿은 역량과 산출물을 우선 준비하세요.</p>
    <details class="roadmap-detail-disclosure" open>
      <summary>내 커리큘럼에 들어갈 과제 미리 보기</summary>
      ${renderCompetencyActionPlan(context, tasks)}
    </details>
    <div class="badge-row">
      <span class="badge">기간: ${getDurationLabel()}</span>
      <span class="badge">커리큘럼 주차: ${tasks.length}개</span>
      <span class="badge">직무 연결 자료: ${roleResourceCount}개</span>
      <span class="badge">실습형 후보: ${practiceResourceCount}개</span>
      <span class="badge">추천 기준: 부족 역량 우선</span>
      <span class="badge">내가 고른 교육: ${selectedResources.length}개</span>
    </div>
    ${renderHandsOnResourcePanel(context)}
    <div class="roadmap-final-cta">
      <div>
        <strong>교육을 골랐다면 내 커리큘럼을 확인하세요</strong>
        <span>주차별 과제, 추천 교육, 회사 공고 대조표를 한 화면과 엑셀 파일에서 확인합니다.</span>
      </div>
      <button class="primary-button" type="button" data-view-target="saved">내 커리큘럼 확인</button>
    </div>
    <details class="roadmap-detail-disclosure">
      <summary>추천 기준 자세히 보기</summary>
      <div class="duration-strategy-grid">
        <span><strong>자료 기준</strong>${durationStrategy.resourceRule}</span>
        <span><strong>과제 기준</strong>${durationStrategy.taskRule}</span>
      </div>
      ${renderPersonaExpertAuditPanel(context, tasks)}
    </details>
  `;
}

function renderRoadmapDecisionPanel(context, tasks) {
  const role = context.role;
  const output = role ? getRoleCurriculumOutput(context.track, role) : context.track.outputs[0];
  const personaReview = getStudentPersonaReview(context);
  const expertReview = getExpertCurriculumReview(context, tasks);
  const acquired = context.acquiredSkills.length
    ? context.acquiredSkills.slice(0, 4).join(", ")
    : "아직 체크 전";
  const gaps = context.gapSkills.length
    ? context.gapSkills.slice(0, 4).join(", ")
    : "큰 공백 없음";
  const firstTask = tasks[0]?.title || "직무상세 분해";
  const aiProfile = getRoleAiCompetencyProfile(role);
  return `
    <div class="roadmap-decision-panel" aria-label="커리큘럼 구성 기준">
      <div>
        <strong>선택 직무</strong>
        <span>${role?.title || context.track.title}</span>
      </div>
      <div>
        <strong>제외한 보유 역량</strong>
        <span>${acquired}</span>
      </div>
      <div>
        <strong>우선 보완</strong>
        <span>${gaps}</span>
      </div>
      <div>
        <strong>첫 산출물</strong>
        <span>${firstTask} · ${output}</span>
      </div>
      <div class="is-wide">
        <strong>학생 페르소나</strong>
        <span>${personaReview.title} · ${personaReview.body}</span>
      </div>
      <div class="is-wide">
        <strong>직무 추천 의견</strong>
        <span>${expertReview.title} · ${expertReview.body}</span>
      </div>
      ${aiProfile ? `
        <div class="is-full">
          <strong>AI·데이터 반영</strong>
          <span>${aiProfile.level} · ${aiProfile.summary}</span>
        </div>
      ` : ""}
    </div>
  `;
}

function getStarterPackResources(context, tasks) {
  const rankedResources = getRecommendedResources(context.track, context);
  const taskLinkedIds = new Set(tasks.flatMap((task) => getRoadmapResourcesForTask(context.track, task, context).map((resource) => resource.id)));
  const roleLinkedIds = new Set(getRoleLinkedResourceIds(context.role));
  return rankedResources
    .filter((resource) => resource.starterPack && !resource.broad)
    .sort((a, b) => {
      const aDirect = (roleLinkedIds.has(a.id) ? 1 : 0) + (taskLinkedIds.has(a.id) ? 1 : 0);
      const bDirect = (roleLinkedIds.has(b.id) ? 1 : 0) + (taskLinkedIds.has(b.id) ? 1 : 0);
      if (aDirect !== bDirect) return bDirect - aDirect;
      return sortResourcesForLearning(a, b, context);
    })
    .slice(0, 3);
}

function renderStarterPackPanel(context, tasks) {
  const starterResources = getStarterPackResources(context, tasks);
  if (!starterResources.length) return "";

  return `
    <section class="education-summary-panel" aria-label="필수 Starter Pack">
      <div class="education-summary-headline">
        <div>
          <p class="eyebrow">필수 Starter Pack</p>
          <h3>아래 핵심 자료는 선택 과제가 아니라 먼저 완료할 기본 역량입니다</h3>
          <p>영어 자료는 번역 도구를 써도 됩니다. 아래 단원/섹션과 산출물까지만 먼저 끝내고 선택 자료로 넘어가세요.</p>
        </div>
      </div>
      <div class="education-summary-list">
        ${starterResources.map((resource, index) => renderStarterPackCard(resource, index, context, tasks)).join("")}
      </div>
    </section>
  `;
}

function renderStarterPackCard(resource, index, context, tasks) {
  const saved = state.saved.includes(resource.id);
  const linkedTask = getPrimaryTaskForResource(resource, tasks, context);
  return `
    <article class="education-summary-card ${saved ? "is-saved" : ""}">
      <div class="education-summary-card-head">
        <span class="education-rank">필수 ${index + 1}</span>
        <div>
          <h4>${resource.title}</h4>
          <p>${resource.provider} · ${resource.language} · ${formatMinutes(resource.totalMinutes)}</p>
        </div>
      </div>
      <div class="education-summary-body">
        <div class="education-info-row"><strong>수행 기준</strong><span>먼저 완료합니다. 결과는 ${resource.expectedOutput || "직무 산출물"} 형태로 남긴 뒤 선택 교육으로 넘어갑니다.</span></div>
        ${renderResourceSectionsRow(resource)}
        <div class="education-info-row"><strong>연결 과제</strong><span>${linkedTask ? `${linkedTask.weekLabel || "로드맵"} · ${linkedTask.title}` : "직무 공통 기초"}</span></div>
        <div class="education-info-row"><strong>언어/검수</strong><span>${resource.language} · ${formatQualityStatus(resource.qualityStatus)}</span></div>
      </div>
      <div class="education-summary-actions">
        <a class="resource-action" href="${resource.url}" target="_blank" rel="noreferrer">${getResourceOpenLabel(resource)}</a>
        ${renderSaveActionButton(resource, "필수 자료로 추가")}
      </div>
    </article>
  `;
}

function renderEducationSummaryPanel(context, tasks, selectedText) {
  const summaryResources = getEducationSummaryResources(context, tasks);
  if (!summaryResources.length) {
    return `
      <section class="education-summary-panel" aria-label="추천 교육 요약">
        <div class="education-summary-headline">
          <div>
            <p class="eyebrow">추천 교육 요약</p>
            <h3>${selectedText}</h3>
          </div>
          <button class="primary-button" type="button" data-view-target="saved">내 커리큘럼 확인</button>
        </div>
        <div class="empty-state compact">선택 직무에 연결된 교육 후보가 아직 없습니다. 참고자료 보관함에서 직접 추가할 수 있습니다.</div>
      </section>
    `;
  }

  return `
    <section class="education-summary-panel" aria-label="추천 교육 요약">
      <div class="education-summary-headline">
        <div>
          <p class="eyebrow">추천 교육 요약</p>
          <h3>${selectedText}</h3>
          <p>상세 목록을 모두 읽기 전에, 먼저 아래 교육이 어떤 내용인지와 왜 추천됐는지 확인하세요.</p>
        </div>
        <div class="education-summary-headline-actions">
          <button class="ghost-button" type="button" data-roadmap-select-all>모든 교육 선택하기</button>
          <button class="ghost-button" type="button" data-roadmap-clear-all>모든 교육 선택 해제</button>
          <button class="primary-button" type="button" data-view-target="saved">내 커리큘럼 확인</button>
        </div>
      </div>
      <div class="education-summary-list">
        ${summaryResources.map((resource, index) => renderEducationSummaryCard(resource, index, context, tasks)).join("")}
      </div>
    </section>
  `;
}

function getEducationSummaryResources(context, tasks) {
  const rankedResources = getRecommendedResources(context.track, context);
  const starterResourceIds = new Set(getStarterPackResources(context, tasks).map((resource) => resource.id));
  const focusedResources = rankedResources.filter((resource) => {
    if (starterResourceIds.has(resource.id)) return false;
    if (state.saved.includes(resource.id)) return true;
    if (getRoleLinkedResourceIds(context.role).includes(resource.id)) return true;
    if (getResourceGapMatches(resource, context).length) return true;
    if (getResourceLinkedTasks(resource.id, tasks).length) return true;
    return !resource.broad;
  });
  return uniqueResources([...focusedResources, ...rankedResources])
    .filter((resource) => !starterResourceIds.has(resource.id))
    .slice(0, 4);
}

function renderEducationSummaryCard(resource, index, context, tasks) {
  const saved = state.saved.includes(resource.id);
  const linkedTask = getPrimaryTaskForResource(resource, tasks, context);
  const reason = getEducationSummaryReason(resource, linkedTask, context);
  const expertReview = getExpertResourceReview(resource, context, linkedTask);
  const introText = getResourceIntroText(resource);
  const outputText = resource.expectedOutput || "직무 산출물";
  const taskText = linkedTask ? `${linkedTask.weekLabel || `${index + 1}주차`} · ${linkedTask.title}` : "연결 과제";

  return `
    <article class="education-summary-card ${saved ? "is-saved" : ""}">
      <div class="education-summary-card-head">
        <span class="education-rank">추천 ${index + 1}</span>
        <div>
          <h4>${resource.title}</h4>
          <p>${resource.provider} · ${resource.type} · ${resource.language} · ${formatMinutes(resource.totalMinutes)}</p>
        </div>
      </div>
      <div class="education-summary-body">
        <div class="education-info-row"><strong>교육 소개</strong><span>${introText}</span></div>
        <div class="education-info-row"><strong>다루는 역량</strong><span>${getResourceSkillSummary(resource)}</span></div>
        ${renderResourceSectionsRow(resource)}
        <div class="education-info-row"><strong>추천 이유</strong><span>${reason}</span></div>
        <div class="education-info-row is-opinion"><strong>추천 의견</strong><span>${expertReview}</span></div>
        <div class="education-info-row"><strong>내 커리큘럼 연결</strong><span>${taskText}</span></div>
        <div class="education-info-row"><strong>완성할 산출물</strong><span>${outputText}</span></div>
      </div>
      <div class="education-summary-actions">
        <a class="resource-action" href="${resource.url}" target="_blank" rel="noreferrer">${getResourceOpenLabel(resource)}</a>
        ${renderSaveActionButton(resource, "내 커리큘럼에 추가")}
      </div>
    </article>
  `;
}

function getPrimaryTaskForResource(resource, tasks, context) {
  return tasks.find((task) => getResourceLinkedTasks(resource.id, [task]).length)
    || tasks.find((task) => getTaskGapMatches(resource, task, context.gapSkills).length)
    || tasks.find((task) => getTaskRoleKeywordMatches(resource, task, context.role).length)
    || tasks.find((task) => getTaskMatchedSkills(resource, task).length)
    || tasks[0];
}

function getEducationSummaryReason(resource, task, context) {
  const signals = getEducationResourceSignals(resource, context)
    .filter((signal) => signal !== "계획 선택됨")
    .slice(0, 2);
  const connectionReason = task
    ? getTaskResourceConnectionReason(resource, task, context)
    : "선택 직무와 부족 역량에 연결되는 교육입니다.";
  const text = signals.length ? `${signals.join(" · ")} · ${connectionReason}` : connectionReason;
  return truncateText(text, 100);
}

function getStudentPersonaReview(context) {
  const pathway = getMajorPathway(context.track, context.role);
  const selectedCount = getSavedResources().length;
  const checkedCount = context.acquiredSkills.length;

  if (!checkedCount) {
    return {
      title: "역량 체크 전 학생",
      body: "추천 폭을 넓게 둔 상태입니다. 보유 역량을 체크하면 이미 아는 교육은 뒤로 빠집니다."
    };
  }

  if (context.durationWeeks <= 2) {
    return {
      title: "단기 준비 학생",
      body: "긴 강좌보다 직무상세 확인, 핵심 역량 1개 보완, 바로 남길 산출물 중심으로 줄였습니다."
    };
  }

  if (pathway === "bridge") {
    return {
      title: "전공 확장 학생",
      body: "전공과 바로 맞지 않는 용어·도구를 먼저 보완하고, 작은 실습 산출물로 연결하도록 봅니다."
    };
  }

  if (pathway === "challenge") {
    return {
      title: "도전 직무 학생",
      body: "전공 직결로 보지 않고 직무 용어, 필수 도구, 최소 산출물을 먼저 확인한 뒤 지원 여부를 판단하도록 봅니다."
    };
  }

  if (context.gapSkills.length >= 3) {
    return {
      title: "기초 보완 학생",
      body: "부족 역량이 많은 상태라 고난도 자료보다 기초 교육과 산출물 예시를 우선 배치합니다."
    };
  }

  if (selectedCount) {
    return {
      title: "실행 계획 학생",
      body: "이미 고른 교육을 주차별 과제에 연결해 내 커리큘럼에서 바로 실행할 수 있게 정리합니다."
    };
  }

  return {
    title: "전공 직결 학생",
    body: "기초 설명보다 지원 직무의 반복 업무, 도구, 산출물로 증명할 수 있는 교육을 우선합니다."
  };
}

function getExpertCurriculumReview(context, tasks) {
  const roleResources = getRoleLinkedResources(context.role)
    .filter((resource) => (
      resource.tracks.includes(context.track.id)
      && !isRoleExcludedResource(resource, context.role)
    ));
  const directCount = roleResources.filter(isDirectResourceUrl).length;
  const handsOnCount = roleResources.filter(isHandsOnResource).length;
  const taskCoverage = tasks.filter((task) => getRoadmapResourcesForTask(context.track, task, context).length).length;
  const title = roleResources.length ? "교육 매핑 확인" : "교육 매핑 보완 필요";
  const body = roleResources.length
    ? `선택 직무 연결 교육 ${roleResources.length}개, 직접 열리는 자료 ${directCount}개, 실습형 후보 ${handsOnCount}개를 기준으로 ${taskCoverage}/${tasks.length}개 과제에 배치했습니다.`
    : "직무 전용 교육이 부족하므로 참고자료에서 회사 공고와 직접 맞는 자료만 추가하세요.";

  return { title, body };
}

function renderPersonaExpertAuditPanel(context, tasks) {
  const role = context.role;
  const roleResources = getRoleLinkedResources(role)
    .filter((resource) => (
      resource.tracks.includes(context.track.id)
      && !isRoleExcludedResource(resource, role)
    ));
  const directCount = roleResources.filter(isDirectResourceUrl).length;
  const handsOnCount = roleResources.filter(isHandsOnResource).length;
  const shortResource = getRecommendedResources(context.track, context)
    .find((resource) => resource.totalMinutes <= 180);
  const bridgeFocus = getMajorPathwayFocus(context.track, role);

  return `
    <div class="persona-review-grid" aria-label="학생 페르소나와 추천 의견 기준">
      <span><strong>직무 미확신 학생</strong>직무상세, 워드클라우드, 반복 업무를 먼저 보고 맞는 직무인지 판단하게 했습니다.</span>
      <span><strong>전공 직결 학생</strong>기초 강좌를 많이 쌓기보다 공고 문장과 산출물로 증명할 교육을 우선합니다.</span>
      <span><strong>전공 확장 학생</strong>${bridgeFocus || "직무 용어와 도구를 보완한 뒤 작은 실습 산출물로 연결합니다."}</span>
      <span><strong>도전 직무 학생</strong>전공 직결로 과장하지 않고 기초 용어와 최소 산출물 확인을 먼저 배치합니다.</span>
      <span><strong>단기 준비 학생</strong>${shortResource ? `${shortResource.title}처럼 짧게 시작할 수 있는 자료를 먼저 검토합니다.` : "긴 강좌보다 핵심 단원과 산출물 작성 중심으로 줄입니다."}</span>
      <span class="is-full"><strong>직무 추천 기준</strong>${role?.title || context.track.title} 교육은 직무 연결 ${roleResources.length}개, 직접 링크 ${directCount}개, 실습형 ${handsOnCount}개를 확인했습니다. 회사 공고와 산출물이 맞지 않는 자료는 내 커리큘럼에서 제외하세요.</span>
      <span class="is-full"><strong>과제 적용 기준</strong>${tasks.map((task) => task.deliverable).slice(0, 3).join(", ")}처럼 제출 가능한 결과로 남길 수 있는 자료만 우선합니다.</span>
    </div>
  `;
}

function getExpertResourceReview(resource, context, task = null) {
  if (!context) {
    return "관심 있는 회사의 직무상세와 교육 내용이 직접 맞을 때만 내 커리큘럼에 추가하세요.";
  }

  const signals = [];
  const roleDirectMatch = getRoleLinkedResourceIds(context.role).includes(resource.id);
  const gapMatches = getResourceGapMatches(resource, context);
  const roleKeywordMatches = getRoleKeywordMatches(resource, context.role);
  const taskMatches = task
    ? getResourceLinkedTasks(resource.id, [task])
    : getResourceLinkedTasks(resource.id, context.visibleTasks);
  const mathWorksNeed = resource.provider === "MathWorks" && isMathWorksRequiredForRole(context);

  if (roleDirectMatch) signals.push("선택 직무 직접 연결");
  if (taskMatches.length) signals.push(`과제 연결: ${taskMatches.slice(0, 1).join(", ")}`);
  if (gapMatches.length) signals.push(`부족 역량: ${gapMatches.slice(0, 2).join(", ")}`);
  if (roleKeywordMatches.length) signals.push(`공고 키워드: ${roleKeywordMatches.slice(0, 2).join(", ")}`);
  if (isHandsOnResource(resource)) signals.push("실습·산출물형");
  if (mathWorksNeed) signals.push("모델링·시뮬레이션 직무 보강");
  if (resource.broad) signals.push("범용 보조 자료");

  const verdict = roleDirectMatch || gapMatches.length || roleKeywordMatches.length || taskMatches.length
    ? "우선 추천"
    : "보조 추천";
  const signalText = signals.length ? signals.slice(0, 4).join(" · ") : "직무 기초 보완";
  return `${verdict}: ${signalText}. 교육을 본 뒤 ${resource.expectedOutput || "직무 산출물"}로 남길 수 있을 때 계획에 넣으세요.`;
}

function getResourceIntroText(resource) {
  const prerequisiteText = (resource.prerequisites || []).slice(0, 3).join(", ");
  return [
    resource.reason,
    prerequisiteText ? `선수지식: ${prerequisiteText}` : ""
  ].filter(Boolean).join(" ");
}

function getResourceSkillSummary(resource, limit = 5) {
  return (resource.skills || []).slice(0, limit).join(", ") || "직무 핵심역량";
}

function getResourceSectionSummary(resource, limit = 3) {
  return (resource.recommendedSections || []).slice(0, limit).join(" · ") || "직무 과제와 직접 맞는 단원만 선택";
}

function renderResourceSectionsRow(resource) {
  return `<div class="education-info-row"><strong>볼 단원/섹션</strong><span>${getResourceSectionSummary(resource)}</span></div>`;
}

function truncateText(text, maxLength) {
  const normalized = String(text || "").trim();
  return normalized.length > maxLength ? `${normalized.slice(0, maxLength - 3)}...` : normalized;
}

function renderReferences() {
  if (!elements.referenceList || !elements.referenceGuidance || !elements.referenceCount) return;

  if (!hasActiveRoleSelection()) {
    elements.referenceCount.textContent = `${resources.length}개 자료`;
    elements.referenceGuidance.innerHTML = `
      <h3>직무 선택 후 분류별로 볼 수 있습니다</h3>
      <p>핵심 추천은 교육 선택 화면에서 먼저 확인하고, 참고자료는 더 찾아보고 싶을 때 분야별로 여세요.</p>
    `;
    elements.referenceList.innerHTML = `<div class="empty-state">먼저 직무 탭에서 지원하려는 세부 직무를 선택하세요.</div>`;
    return;
  }

  const track = getSelectedTrack();
  const role = getSelectedRole(track.id);
  const tasks = getVisibleRoadmapTasks(track.id);
  const context = getRecommendationContext(track, getGapSkills(track.id), tasks);
  const roleResources = uniqueResources([
    ...getRoleLinkedResources(role),
    ...getRecommendedResources(track, context)
  ]).slice(0, 8);
  const sections = getReferenceSections(context, roleResources);

  elements.referenceCount.textContent = `${resources.length}개 자료`;
  elements.referenceGuidance.innerHTML = `
    <h3>분류를 열어 필요한 자료만 확인하세요</h3>
    <p>선택 직무와 직접 연결된 자료를 먼저 보고, 부족한 유형이 있으면 공식 예제·실습·기초·채용확인 분류만 추가로 열면 됩니다.</p>
    ${renderReferenceCategoryStrip(sections, role?.title || track.title)}
  `;

  elements.referenceList.innerHTML = `
    <div class="reference-section-list">
      ${sections.map((section) => renderReferenceSection(section, context)).join("")}
    </div>
  `;

  bindResourceActions(elements.referenceList);
}

function renderReferenceCategoryStrip(sections, roleTitle) {
  return `
    <div class="reference-category-strip" aria-label="참고자료 분류">
      <span><strong>선택 직무</strong>${roleTitle}</span>
      ${sections.map((section) => `<span><strong>${section.shortTitle || section.title}</strong>${section.resources.length}개</span>`).join("")}
    </div>
  `;
}

function getReferenceSections(activeContext, priorityResources = []) {
  const categories = [
    {
      id: "official-simulation",
      shortTitle: "공식",
      title: "공식·시뮬레이션 예제",
      summary: "공식 문서와 시뮬레이션 예제처럼 실습 환경이 명확한 자료입니다.",
      match: (resource) => /MathWorks|Ansys|NI|Texas Instruments|STMicroelectronics|Arm|KiCad|Linux Kernel|Yocto|ROS/.test(resource.provider)
        || /Simulink|Simscape|Stateflow|시뮬레이션|HIL|SIL|모델링|모델/.test(getResourceBadgeText(resource))
    },
    {
      id: "hands-on",
      shortTitle: "실습",
      title: "직접 실습·부트캠프",
      summary: "과제, 멘토링, 부트캠프, 현장실습처럼 산출물을 만들기 좋은 자료입니다.",
      match: (resource) => isHandsOnResource(resource)
        || /코멘토|렛유인|STEP|HRD-Net|KDT|현장실습|부트캠프|멘토링/.test(`${resource.provider} ${resource.type}`)
    },
    {
      id: "foundation",
      shortTitle: "기초",
      title: "기초 개념·무료 강의",
      summary: "직무 용어와 전공 기초를 빠르게 보완하기 위한 입문·기초 자료입니다.",
      match: (resource) => ["입문", "기초", "기초실습"].includes(resource.difficulty)
        || /KOCW|K-MOOC|YouTube|Coursera|edX|freeCodeCamp|Khan|Boostcourse|인프런|Udemy/.test(resource.provider)
    },
    {
      id: "job-evidence",
      shortTitle: "채용확인",
      title: "직무·채용공고 확인",
      summary: "직무명, NCS, 공고 키워드, 면접 설명 근거를 확인할 때 쓰는 자료입니다.",
      match: (resource) => /직무|NCS|채용|면접|공고|커리어|Job|Career/i.test(getResourceBadgeText(resource))
    }
  ];
  const assigned = new Set(priorityResources.map((resource) => resource.id));
  const sections = priorityResources.length
    ? [{
      id: "role-priority",
      shortTitle: "직무연결",
      title: "선택 직무 연결 자료",
      summary: "교육 선택 화면에서 먼저 확인한 자료와 같은 기준으로 연결된 자료입니다.",
      context: activeContext,
      open: true,
      resources: priorityResources
    }]
    : [];
  sections.push(...categories.map((category) => {
    const sectionResources = resources
      .filter((resource) => !assigned.has(resource.id) && category.match(resource))
      .sort((a, b) => sortReferenceResources(a, b, activeContext));
    sectionResources.forEach((resource) => assigned.add(resource.id));
    return { ...category, context: activeContext, resources: sectionResources };
  }));
  const otherResources = resources
    .filter((resource) => !assigned.has(resource.id))
    .sort((a, b) => sortReferenceResources(a, b, activeContext));

  if (otherResources.length) {
    sections.push({
      id: "other",
      title: "추가 참고자료",
      summary: "선택 직무와 직접 연결되면 내 커리큘럼에 추가해도 되는 보조 자료입니다.",
      context: activeContext,
      resources: otherResources
    });
  }

  return sections.filter((section) => section.resources.length);
}

function sortReferenceResources(a, b, context) {
  const score = (resource) => {
    const roleLinked = getRoleLinkedResourceIds(context.role).includes(resource.id) ? 1 : 0;
    const saved = state.saved.includes(resource.id) ? 1 : 0;
    const qualityScore = resource.qualityStatus === "verified" ? 3 : resource.qualityStatus === "reviewed" ? 2 : 1;
    return saved * 600
      + roleLinked * 320
      + (resource.core ? 120 : 0)
      + getResourcePriorityScore(resource, context)
      + (isHandsOnResource(resource) ? 35 : 0)
      + qualityScore * 16
      - resource.sequenceLevel * 2;
  };
  const scoreDiff = score(b) - score(a);
  if (scoreDiff !== 0) return scoreDiff;
  return sortResourcesForLearning(a, b, context);
}

function renderReferenceSection(section, activeContext) {
  return `
    <details class="reference-section" ${section.open ? "open" : ""}>
      <summary>
        <span>
          <strong>${section.title}</strong>
          <em>${section.summary}</em>
        </span>
        <span class="status-pill">${section.resources.length}개</span>
      </summary>
      <div class="reference-section-body">
        ${section.resources.map((resource) => renderReferenceResourceItem(resource, section.context)).join("")}
      </div>
    </details>
  `;
}

function renderReferenceResourceItem(resource, context) {
  const saved = state.saved.includes(resource.id);
  const signals = context ? getResourceSignals(resource, context).slice(0, 3) : [];
  return `
    <details class="reference-resource-card ${saved ? "is-saved" : ""}">
      <summary>
        <span>
          <strong>${resource.title}</strong>
          <em>${resource.provider} · ${resource.type} · ${resource.language} · ${formatMinutes(resource.totalMinutes)}</em>
        </span>
        ${renderResourceTrustBadges(resource)}
      </summary>
      <div class="reference-resource-detail">
        <div class="education-info-row"><strong>교육 소개</strong><span>${getResourceIntroText(resource)}</span></div>
        <div class="education-info-row"><strong>다루는 역량</strong><span>${getResourceSkillSummary(resource)}</span></div>
        ${renderResourceSectionsRow(resource)}
        ${signals.length ? `<div class="education-info-row"><strong>추천 이유</strong><span>${signals.join(" · ")}</span></div>` : ""}
        <div class="education-info-row is-opinion"><strong>추천 의견</strong><span>${getExpertResourceReview(resource, context)}</span></div>
        <div class="education-info-row"><strong>완성할 산출물</strong><span>${resource.expectedOutput}</span></div>
        <div class="roadmap-resource-actions">
          <a class="resource-action" href="${resource.url}" target="_blank" rel="noreferrer">${getResourceOpenLabel(resource)}</a>
          ${renderSaveActionButton(resource)}
        </div>
      </div>
    </details>
  `;
}

function getCurriculumTasks(trackId) {
  const track = tracks.find((item) => item.id === trackId);
  const role = track ? getSelectedRole(track.id) : null;
  if (track && role) return getRoleSpecificCurriculumTasks(track, role);
  if (curriculumTasks[trackId]) return curriculumTasks[trackId];
  return (roadmaps[trackId] || []).map(([title, objective, deliverable]) => ({
    title,
    objective,
    time: "2시간",
    steps: [objective],
    deliverable,
    rubric: ["산출물이 제출 가능하다", "직무 역량과 연결된다", "다음 행동이 보인다"]
  }));
}

function getRoleSpecificCurriculumTasks(track, role) {
  const baseTasks = getBaseCurriculumTasks(track.id);
  const diagnosticsForRole = roleDiagnostics[role.id] || diagnostics[track.id] || [];
  const primarySkill = diagnosticsForRole[0]?.[0] || role.postingKeywords[0];
  const secondarySkill = diagnosticsForRole[1]?.[0] || role.postingKeywords[1] || primarySkill;
  const output = getRoleCurriculumOutput(track, role);
  const keywords = role.postingKeywords.slice(0, 4).join(", ");
  const aiDataExercise = getRoleAiDataExercise(role);

  if (track.id === "automotive-mobility") {
    return getAutomotiveRoleSpecificCurriculumTasks(track, role, primarySkill, secondarySkill, output, keywords, aiDataExercise);
  }

  return [
    {
      title: `${role.title} 직무상세 분해`,
      baseTitle: baseTasks[0]?.title || "직무 이해",
      objective: `${role.focus}를 실제 공고의 업무, 자격요건, 우대사항으로 나누어 지원 직무와 맞는지 판단합니다.`,
      time: "90분",
      steps: [
        `${role.responsibilities[0]} 업무가 공고에 실제로 있는지 표시합니다.`,
        `자격요건을 보유 역량, 보완 역량, 증명 산출물로 나눕니다: ${role.requirements[0]}`,
        `${keywords} 키워드가 회사 공고에서 어떤 문장으로 쓰였는지 기록합니다.`
      ],
      deliverable: `${role.title} 업무-역량 매핑표`,
      rubric: ["공고 문장과 앱 직무 설명이 연결된다", "보유 역량과 부족 역량이 분리된다", "지원 여부 판단 근거가 남는다"]
    },
    {
      title: `${primarySkill} 핵심 역량 보완`,
      baseTitle: baseTasks[1]?.title || "전공·도구 보완",
      objective: `${role.title}에서 반복되는 ${primarySkill}, ${secondarySkill} 역량을 교육자료와 작은 예제로 보완합니다.`,
      time: "2시간",
      steps: [
        `보유 역량 체크에서 ${primarySkill} 관련 미체크 항목을 확인합니다.`,
        "추천 교육자료 중 직접 링크와 검토 자료를 먼저 열어 핵심 개념을 정리합니다.",
        `다음 역량을 설명할 수 있는 예제나 계산, 표, 로그를 남깁니다: ${role.requirements[1] || role.requirements[0]}`
      ],
      deliverable: `${primarySkill} 보완 노트와 예제`,
      rubric: ["미체크 역량과 교육자료가 연결된다", "개념 설명과 작은 예제가 함께 있다", "지원 직무 용어로 다시 설명할 수 있다"]
    },
    {
      title: `${role.postingKeywords[0]} 산출물 작성`,
      baseTitle: baseTasks[2]?.title || "해석 적용",
      objective: `전문가가 보는 핵심은 학습 완료가 아니라 ${output}입니다. 교육자료를 보고 이번 직무의 산출물 초안을 만듭니다.`,
      time: "2시간",
      steps: [
        `${role.responsibilities[1] || role.responsibilities[0]}에 필요한 입력값과 판단 기준을 정합니다.`,
        "추천 자료에서 본 방법을 표, 그래프, 체크리스트, 테스트 케이스 중 하나로 적용합니다.",
        "결과가 공고의 업무 또는 자격요건 중 어떤 문장과 연결되는지 적습니다.",
        ...(aiDataExercise ? [aiDataExercise] : [])
      ],
      deliverable: output,
      rubric: ["산출물 형식이 직무와 맞다", "입력값과 판단 기준이 보인다", "공고 문장과 직접 연결된다"]
    },
    {
      title: "지원 회사 맞춤 검증",
      baseTitle: baseTasks[3]?.title || "산출물 정리",
      objective: "일반 직무 커리큘럼을 지원 회사 공고 기준으로 다시 좁혀 면접에서 설명 가능한 근거로 정리합니다.",
      time: "2시간",
      steps: [
        "지원 회사 공고의 업무·자격요건·우대사항 문장을 3개 이상 가져옵니다.",
        "이번 커리큘럼 산출물 중 공고와 직접 맞는 것과 맞지 않는 것을 표시합니다.",
        "부족한 항목 1개를 다음 주 보완 과제로 정합니다."
      ],
      deliverable: "회사 공고 맞춤 보완 체크리스트",
      rubric: ["회사 공고 원문 기준으로 판단한다", "일반 추천과 회사 요구의 차이를 적는다", "다음 보완 행동이 구체적이다"]
    }
  ];
}

function getBaseCurriculumTasks(trackId) {
  if (curriculumTasks[trackId]) return curriculumTasks[trackId];
  return (roadmaps[trackId] || []).map(([title, objective, deliverable]) => ({
    title,
    objective,
    time: "2시간",
    steps: [objective],
    deliverable,
    rubric: ["산출물이 제출 가능하다", "직무 역량과 연결된다", "다음 행동이 보인다"]
  }));
}

function getAutomotiveRoleSpecificCurriculumTasks(track, role, primarySkill, secondarySkill, output, keywords, aiDataExercise) {
  const profile = getAutomotiveRolePracticeProfile(role);
  return [
    {
      title: `${role.title} 공고·DVP&R 분해`,
      baseTitle: "자동차 직무상세 분해",
      objective: `${role.focus}를 실제 공고의 반복 업무, 자격조건, 우대사항, 검증 산출물로 나누어 지원 직무와 맞는지 판단합니다.`,
      time: "90분",
      steps: [
        `${role.responsibilities[0]} 업무가 지원 회사 공고에 실제로 있는지 표시합니다.`,
        `DVP&R 관점으로 입력 요구사항, 시험 조건, 판정 기준, 남길 산출물을 나눕니다.`,
        `${keywords} 키워드가 공고에서 업무 문장인지 우대사항인지 구분합니다.`
      ],
      deliverable: `${role.title} 공고-DVP&R 매핑표`,
      rubric: ["공고 원문과 앱 직무 설명이 연결된다", "업무·자격·우대가 분리된다", "지원 여부 판단 근거가 남는다"]
    },
    {
      title: `${profile.system} 핵심 역량 실습`,
      baseTitle: "자동차 핵심 역량 실습",
      objective: `${role.title}에서 반복되는 ${primarySkill}, ${secondarySkill} 역량을 작은 실습 산출물로 증명합니다.`,
      time: "2시간",
      steps: [
        `${profile.input}를 입력 조건으로 정리합니다.`,
        `${profile.method}를 적용해 비교표, 모델, 로그, 체크리스트 중 하나를 만듭니다.`,
        `결과를 ${role.requirements[0]} 자격조건과 연결해 설명합니다.`
      ],
      deliverable: profile.coreDeliverable,
      rubric: ["입력 조건이 명확하다", "판단 기준과 결과가 함께 있다", "공고 자격조건과 직접 연결된다"]
    },
    {
      title: `${profile.dataTheme} 데이터·시뮬레이션 산출물`,
      baseTitle: "자동차 데이터·시뮬레이션 적용",
      objective: `공식 예제, MathWorks/시뮬레이션 자료, 로그 분석 중 가능한 방법을 골라 ${output} 초안을 만듭니다.`,
      time: "2시간",
      steps: [
        `${profile.dataInput}를 시간, 조건, 기준값으로 정리합니다.`,
        `${profile.analysis}를 수행해 정상/이상 또는 변경 전/후 차이를 표시합니다.`,
        aiDataExercise || "분석 결과를 입력, 판단 기준, 결과 지표로 나누어 5줄 표로 정리합니다."
      ],
      deliverable: profile.dataDeliverable,
      rubric: ["데이터 또는 모델 입력이 보인다", "비교 기준이 있다", "시험·검증 리포트로 확장 가능하다"]
    },
    {
      title: "지원 회사 맞춤 검증 계획서",
      baseTitle: "자동차 회사 공고 맞춤 검증",
      objective: "일반 직무 커리큘럼을 지원 회사 공고 기준으로 줄이고, 면접에서 설명 가능한 검증 계획으로 정리합니다.",
      time: "2시간",
      steps: [
        "지원 회사 공고의 업무·자격요건·우대사항 문장을 3개 이상 붙여 넣습니다.",
        `이번 산출물 중 ${profile.finalCheck}와 직접 맞는 항목을 표시합니다.`,
        "공고와 맞지 않는 일반 자료는 후순위로 내리고, 부족한 항목 1개를 다음 보완 과제로 정합니다."
      ],
      deliverable: "회사 공고 맞춤 자동차 직무 준비 체크리스트",
      rubric: ["회사 공고 원문 기준으로 판단한다", "일반 추천과 회사 요구의 차이를 적는다", "다음 보완 행동이 구체적이다"]
    }
  ];
}

function getAutomotiveRolePracticeProfile(role) {
  const profiles = {
    "vehicle-body-design-engineer": {
      system: "차체·BIW",
      input: "패키지 제약, 하중 경로, 체결점, 공차 조건",
      method: "간섭 검토와 제조성 체크",
      dataTheme: "차체 시험·설계 변경",
      dataInput: "강성, 중량, 충돌/NVH 요구와 시험 결과",
      analysis: "요구사항 대비 부족 항목과 설계 변경 후보를 비교",
      coreDeliverable: "BIW 설계 검토표",
      dataDeliverable: "차체 요구사항-시험 결과 비교표",
      finalCheck: "패키지, 충돌안전, 제조성, 도면·공차 요구"
    },
    "chassis-suspension-engineer": {
      system: "섀시·현가·제동",
      input: "조향, 제동, 현가 하중 케이스와 승차감 지표",
      method: "차량동역학 지표와 시험 조건 비교",
      dataTheme: "실차 주행·내구 데이터",
      dataInput: "속도, 조향각, 제동, 진동, 변위 로그",
      analysis: "기준값 대비 응답 차이와 개선 후보를 표시",
      coreDeliverable: "섀시 성능·내구 조건표",
      dataDeliverable: "주행시험 응답 비교 리포트",
      finalCheck: "조향·제동·현가 성능과 내구 시험 조건"
    },
    "powertrain-mechanical-engineer": {
      system: "파워트레인·구동계",
      input: "토크, 회전수, 기어비, 베어링 하중, NVH 조건",
      method: "토크 전달 경로와 파손 모드 정리",
      dataTheme: "NVH·내구 시험 데이터",
      dataInput: "진동, 온도, 토크, 회전수, 파손 위치 기록",
      analysis: "파손 모드별 원인 후보와 재시험 조건을 분류",
      coreDeliverable: "구동계 요구사항·하중 경로표",
      dataDeliverable: "NVH·내구 원인 가설 리포트",
      finalCheck: "토크 전달, NVH, 내구, 양산 이슈"
    },
    "vehicle-thermal-management-engineer": {
      system: "차량 열관리",
      input: "배터리, 모터, 인버터, HVAC 열부하와 냉각수 조건",
      method: "열원-냉각경로-목표온도 연결",
      dataTheme: "열 모델·온도 로그",
      dataInput: "유량, 온도, 외기 조건, 급속충전 조건",
      analysis: "고온/저온 조건별 목표 온도 초과 구간을 표시",
      coreDeliverable: "열부하·냉각회로 조건표",
      dataDeliverable: "온도 로그 기반 열관리 검증 리포트",
      finalCheck: "냉각회로, 열모델, 환경시험, 실차 온도"
    },
    "ev-battery-pack-engineer": {
      system: "EV 배터리팩",
      input: "셀·모듈·팩 구조, BMS 신호, 절연, 열폭주 안전 조건",
      method: "팩 구조와 전기안전 검증 항목 매핑",
      dataTheme: "BMS·온도·전압 로그",
      dataInput: "CAN 전압, 전류, 온도, 인터락, 절연 상태",
      analysis: "고장 후보와 안전 검증 항목을 연결",
      coreDeliverable: "배터리팩 안전 요구사항표",
      dataDeliverable: "BMS 로그 기반 고장 가설표",
      finalCheck: "BMS, HV 안전, 열폭주, 절연, 시험조건"
    },
    "vehicle-ee-architecture-engineer": {
      system: "차량 E/E 아키텍처",
      input: "ECU, 센서, 액추에이터, 전원, CAN/LIN/Ethernet 신호",
      method: "기능 요구사항을 네트워크·전원 인터페이스로 분해",
      dataTheme: "DBC·진단 신호",
      dataInput: "CAN 메시지, DTC, 전원 분배, 인터페이스 변경 이력",
      analysis: "변경 영향과 진단 요구사항을 신호 단위로 표시",
      coreDeliverable: "E/E 인터페이스 정의서",
      dataDeliverable: "CAN·진단 신호 영향 분석표",
      finalCheck: "ECU, 네트워크, 전원분배, UDS/DTC"
    },
    "automotive-embedded-sw-engineer": {
      system: "ECU 임베디드 SW",
      input: "센서 입력, 상태머신, 제어 출력, CAN 진단 요구",
      method: "요구사항을 테스트 케이스와 로그 확인 조건으로 변환",
      dataTheme: "ECU 로그·CAN 진단",
      dataInput: "CAN 메시지, DBC, UDS 응답, fault 로그",
      analysis: "재현 조건과 원인 후보를 SW/통신/센서로 분리",
      coreDeliverable: "ECU 요구사항-테스트 케이스표",
      dataDeliverable: "CAN 로그 디버깅 리포트",
      finalCheck: "C/C++, CAN, AUTOSAR, 진단, 디버깅"
    },
    "hil-sil-validation-engineer": {
      system: "HIL·SIL 검증",
      input: "요구사항, 테스트 케이스, HIL I/O, CAN 신호, fault 조건",
      method: "정상·고장·경계 조건 테스트 설계",
      dataTheme: "HIL 테스트 로그",
      dataInput: "테스트 시퀀스, CAN 로그, fault injection 결과",
      analysis: "Pass/Fail과 실패 원인을 SW/모델/장비로 분류",
      coreDeliverable: "HIL 테스트 케이스 매트릭스",
      dataDeliverable: "HIL 실패 로그 분류 리포트",
      finalCheck: "요구사항 검증, Test Case, CANoe, HIL/SIL"
    },
    "adas-validation-engineer": {
      system: "ADAS·자율주행 검증",
      input: "AEB/LKA/ACC 기능, 센서, 시나리오, 안전 판정 기준",
      method: "주행 시나리오와 Pass/Fail 기준 작성",
      dataTheme: "센서융합·인지 결과",
      dataInput: "카메라, 레이더, 라이다, GPS/IMU, CAN 로그",
      analysis: "false positive/negative와 시나리오 조건을 연결",
      coreDeliverable: "ADAS 시나리오 검증표",
      dataDeliverable: "센서/CAN 로그 동기화 평가표",
      finalCheck: "ADAS 기능, 센서융합, 시나리오, 실차검증"
    },
    "ev-power-electronics-engineer": {
      system: "EV 전력전자",
      input: "인버터, OBC, DC-DC, 전류 센싱, 게이트 드라이브 조건",
      method: "효율, 리플, 발열, EMI 검증 항목 정리",
      dataTheme: "전력전자 계측 데이터",
      dataInput: "전압, 전류, 리플, 온도, 효율, 스위칭 파형",
      analysis: "측정 조건별 손실·발열·EMI 리스크를 비교",
      coreDeliverable: "전력전자 검증 체크리스트",
      dataDeliverable: "인버터 계측 결과 리포트",
      finalCheck: "전력전자, EMI, HV 안전, 계측, 보호회로"
    },
    "vehicle-interior-exterior-design-engineer": {
      system: "내외장·의장",
      input: "패키지 제약, gap/flush, 장착 구조, 사출·도장 조건",
      method: "간섭, 감성품질, 제조성 체크",
      dataTheme: "내외장 품질·설계 변경",
      dataInput: "gap/flush 측정값, squeak & rattle 사례, 조립 불량 이력",
      analysis: "품질 이슈를 체결, 공차, 금형, 조립 조건으로 분리",
      coreDeliverable: "내외장 설계·감성품질 체크리스트",
      dataDeliverable: "내외장 품질 이슈 원인 가설표",
      finalCheck: "내외장 패키지, 감성품질, 사출·도장, 조립성"
    },
    "wiring-harness-engineer": {
      system: "와이어링 하네스",
      input: "전원, 접지, CAN/LIN 신호, 커넥터, wire gauge 조건",
      method: "회로도와 하네스 경로를 전류·노이즈·조립성 기준으로 검토",
      dataTheme: "전장 회로·하네스 변경 영향",
      dataInput: "pin map, fuse/relay 조건, 전압강하 계산, routing 변경 이력",
      analysis: "회로 변경 영향과 제조·진단 리스크를 신호 단위로 표시",
      coreDeliverable: "하네스 회로·경로 검토표",
      dataDeliverable: "전원분배·하네스 변경 영향 분석표",
      finalCheck: "하네스, 커넥터, 전원분배, 접지, EMC"
    },
    "bms-control-engineer": {
      system: "BMS 제어·진단",
      input: "셀 전압, pack 전류, 온도, 절연, 인터락, CAN 진단 요구",
      method: "SOC/SOH, 보호 로직, DTC를 테스트 케이스로 변환",
      dataTheme: "BMS 충방전·fault 로그",
      dataInput: "전압, 전류, 온도, SOC, SOH, DTC, contactor 상태 로그",
      analysis: "고장 조건과 보호 동작을 신호·알고리즘·하드웨어로 분리",
      coreDeliverable: "BMS 요구사항-테스트 케이스표",
      dataDeliverable: "BMS 로그 기반 fault 분석 리포트",
      finalCheck: "BMS, SOC/SOH, 셀밸런싱, 보호로직, CAN 진단"
    },
    "vehicle-calibration-engineer": {
      system: "차량 제어 캘리브레이션",
      input: "제어 파라미터, lookup table, CAN 로그, 성능 지표",
      method: "변경 전후 응답과 제한 조건 비교",
      dataTheme: "실차·벤치 calibration 로그",
      dataInput: "파라미터 변경 이력, 속도·토크·온도·전류·NVH 로그",
      analysis: "성능 개선과 부작용을 지표별로 비교",
      coreDeliverable: "캘리브레이션 파라미터 변경 근거표",
      dataDeliverable: "실차 로그 기반 캘리브레이션 비교 리포트",
      finalCheck: "Calibration, CANape/INCA, 제어파라미터, 실차로그"
    },
    "functional-safety-engineer": {
      system: "기능안전·SOTIF",
      input: "item definition, hazard, safety goal, ASIL, 검증 증거",
      method: "위험원을 안전 요구사항과 테스트 증거로 추적",
      dataTheme: "안전 요구사항·검증 추적성",
      dataInput: "HARA 표, FMEA/FTA, 테스트 케이스, 검증 결과",
      analysis: "위험원, 안전 메커니즘, 검증 증거의 누락 항목을 표시",
      coreDeliverable: "HARA-안전요구사항 추적표",
      dataDeliverable: "기능안전 검증 증거 매트릭스",
      finalCheck: "ISO 26262, SOTIF, ASIL, HARA, Safety Case"
    },
    "automotive-manufacturing-engineer": {
      system: "신차 양산·생산기술",
      input: "공정 흐름, 설비, 치구, takt time, 초기 품질 지표",
      method: "APQP 관점으로 양산 준비 리스크를 분해",
      dataTheme: "라인 셋업·초기 품질 데이터",
      dataInput: "takt time, 정지시간, 불량률, OEE, 파일럿 생산 이슈",
      analysis: "병목, 설비, 작업성, 품질 리스크를 개선 우선순위로 정리",
      coreDeliverable: "신차 양산 준비 체크리스트",
      dataDeliverable: "라인 셋업·초기 품질 개선 리포트",
      finalCheck: "APQP, PPAP, PFMEA, 라인셋업, 초기품질"
    },
    "automotive-quality-field-engineer": {
      system: "자동차 품질·필드이슈",
      input: "필드 클레임, warranty, VOC, 생산 lot, 부품 변경 이력",
      method: "8D와 추적성 기준으로 원인 후보를 좁힘",
      dataTheme: "보증·필드 품질 데이터",
      dataInput: "클레임 유형, 보증 비용, lot 이력, 차량 로그, 개선 전후 지표",
      analysis: "반복 이슈와 원인 후보를 Pareto와 8D 구조로 표시",
      coreDeliverable: "필드이슈 8D 원인분석표",
      dataDeliverable: "보증 데이터 기반 품질 개선 리포트",
      finalCheck: "IATF 16949, 8D, Warranty, 필드클레임, 재발방지"
    },
    "vehicle-test-validation-engineer": {
      system: "실차 시험·차량 검증",
      input: "DVP&R, 시험 조건, 계측 채널, 판정 기준",
      method: "요구사항을 시험 항목과 Pass/Fail 기준으로 변환",
      dataTheme: "실차 계측 로그",
      dataInput: "온도, 진동, 전류, 위치, CAN, 환경 조건 로그",
      analysis: "불합격 구간과 관련 채널을 연결해 재시험 조건을 제안",
      coreDeliverable: "DVP&R 시험계획서",
      dataDeliverable: "실차 로그 기반 검증 리포트",
      finalCheck: "DVP&R, 실차시험, 계측채널, 결과정리"
    }
  };

  return profiles[role.id] || {
    system: "자동차 시스템",
    input: "차량 요구사항, 인터페이스, 시험 조건",
    method: "요구사항을 검증 가능한 산출물로 변환",
    dataTheme: "차량 로그·시험 데이터",
    dataInput: "CAN, 센서, 시험 결과 로그",
    analysis: "기준값 대비 차이와 원인 후보를 표시",
    coreDeliverable: "자동차 직무 요구사항 매핑표",
    dataDeliverable: "차량 시험 데이터 검증 리포트",
    finalCheck: "차량 요구사항과 검증 산출물"
  };
}

function getVisibleRoadmapTasks(trackId) {
  const coreTasks = getCurriculumTasks(trackId).map((task, index) => ({
    ...task,
    baseTitle: task.baseTitle || task.title,
    baseIndex: index,
    planWeek: index + 1,
    weekLabel: `${index + 1}주차`,
    phase: "핵심"
  }));
  const weeks = getDurationWeeks();
  const prioritizedCoreTasks = getPrioritizedCoreTasks(trackId, coreTasks).map((task, index) => ({
    ...task,
    planWeek: index + 1,
    weekLabel: `${index + 1}주차`,
    priorityReason: getTaskPriorityReason(task, trackId)
  }));

  if (weeks <= 2) {
    return prioritizedCoreTasks
      .slice(0, 2)
      .map((task, index) => ({
        ...task,
        planWeek: index + 1,
        weekLabel: `${index + 1}주차`,
        phase: "2주 압축",
        priorityReason: getTaskPriorityReason(task, trackId)
      }));
  }

  if (weeks <= 4) return prioritizedCoreTasks.slice(0, weeks);

  const expanded = [...prioritizedCoreTasks];
  const phases = weeks >= 12 ? ["심화 반복", "산출물 보강"] : ["심화 반복"];
  phases.forEach((phase) => {
    prioritizedCoreTasks.forEach((task) => {
      expanded.push(createExtendedRoadmapTask(task, phase, expanded.length + 1));
    });
  });

  return expanded.slice(0, weeks);
}

function getPrioritizedCoreTasks(trackId, tasks) {
  return [...tasks].sort((a, b) => getTaskPriorityScore(b, trackId) - getTaskPriorityScore(a, trackId));
}

function getTaskPriorityScore(task, trackId) {
  const text = getTaskSearchText(task);
  const gapMatches = getGapSkills(trackId).filter((skill) => text.includes(skill)).length;
  const role = getSelectedRole(trackId);
  const roleMatches = role ? role.postingKeywords.filter((keyword) => text.includes(keyword)).length : 0;
  const introSignal = /입문|개념|용어|기초|흐름|요구사항|블록도|정리/.test(text) ? 1 : 0;
  const practiceSignal = /실습|시뮬레이션|부트캠프|프로젝트|멘토링|현장실습|KDT|그래프|표|모델|데이터|분석|초안|측정/.test(text) ? 1 : 0;
  const portfolioSignal = /보고서|리포트|README|검증|제안|개선|체크리스트/.test(text) ? 1 : 0;
  const foundationSignal = task.baseIndex <= 1 ? 1 : 0;
  const goal = state.profile.goal;
  const competencyGapSignal = gapMatches ? 1 : 0;

  return 100 - task.baseIndex * 8
    + gapMatches * 18
    + roleMatches * 10
    + competencyGapSignal * 16
    + (goal === "explore" ? introSignal * 26 : 0)
    + (goal === "foundation" ? foundationSignal * 20 + gapMatches * 14 : 0)
    + (goal === "portfolio" ? portfolioSignal * 30 + practiceSignal * 10 : 0)
    + (goal === "interview" ? portfolioSignal * 24 + roleMatches * 8 : 0);
}

function getTaskPriorityReason(task, trackId) {
  const text = getTaskSearchText(task);
  const role = getSelectedRole(trackId);
  const roleGapMatch = role ? getGapItems(trackId).find((item) => item.source === role.title && text.includes(item.skill)) : null;
  const roleDiagnosticMatch = role ? (roleDiagnostics[role.id] || []).find(([skill]) => text.includes(skill))?.[0] : null;
  const roleSkill = roleGapMatch?.skill || roleDiagnosticMatch;
  const roleKeyword = role?.postingKeywords.find((keyword) => text.includes(keyword));
  const focusedGapMatch = getGapItems(trackId).find((item) => item.source !== "트랙 공통" && text.includes(item.skill));
  const gapMatch = focusedGapMatch?.skill || getGapSkills(trackId).find((skill) => text.includes(skill));

  if (roleSkill) return `${role.title}에서 반복되는 ${roleSkill} 역량을 교육자료와 산출물로 보완합니다.`;
  if (gapMatch) return `현재 역량 체크에서 비어 있는 ${gapMatch} 역량을 직접 보완합니다.`;
  if (roleKeyword) return `${role.title} 채용공고 키워드인 ${roleKeyword}${getAndParticle(roleKeyword)} 바로 연결됩니다.`;
  if (state.profile.goal === "portfolio" || state.profile.goal === "interview") return "짧은 기간 안에 설명 가능한 산출물을 남기는 과제입니다.";
  if (state.profile.goal === "explore") return "업무 흐름과 핵심 용어를 확인하는 과제입니다.";
  return "짧은 기간에서 직무 이해와 기본 산출물을 빠르게 만드는 과제입니다.";
}

function getAndParticle(value = "") {
  const lastChar = [...String(value).trim()].pop();
  if (!lastChar) return "와";
  const code = lastChar.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) return "와";
  return (code - 0xac00) % 28 === 0 ? "와" : "과";
}

function createExtendedRoadmapTask(task, phase, planWeek) {
  const isPortfolioPhase = phase === "산출물 보강";
  return {
    ...task,
    title: isPortfolioPhase ? `${task.baseTitle} 산출물 보강` : `${task.baseTitle} 심화 반복`,
    objective: isPortfolioPhase
      ? `${task.deliverable}을 면접에서 설명할 수 있도록 문제, 방법, 결과, 배운 점 순서로 다듬습니다.`
      : `${task.objective} 같은 과제를 다른 예제나 조건으로 반복해 판단 기준을 굳힙니다.`,
    steps: isPortfolioPhase
      ? [
        "이전 산출물에서 근거가 약한 부분 1개를 고릅니다.",
        "수치, 조건, 비교표, 캡처 중 부족한 증거를 보강합니다.",
        "면접에서 60초 안에 설명할 문제-방법-결과 문장을 만듭니다."
      ]
      : [
        "첫 수행 산출물에서 부족한 기준 1개를 고릅니다.",
        "데이터, 조건, 예제를 바꿔 같은 과제를 다시 수행합니다.",
        "첫 결과와 반복 결과의 차이를 한 문단으로 정리합니다."
      ],
    deliverable: isPortfolioPhase ? `${task.deliverable} 보강본` : `${task.deliverable} 반복본`,
    rubric: isPortfolioPhase
      ? ["문제와 역할이 명확하다", "근거 자료가 포함된다", "면접 답변으로 설명 가능하다"]
      : ["반복 전후 차이가 보인다", "같은 기준으로 비교했다", "다음 개선점이 적혀 있다"],
    planWeek,
    weekLabel: `${planWeek}주차`,
    phase,
    priorityReason: isPortfolioPhase
      ? "준비 기간이 길어 산출물을 채용 설명형 산출물로 다듬는 주차입니다."
      : "반복 수행으로 실제 직무 판단 기준을 굳히는 주차입니다."
  };
}

function getTaskSearchText(task) {
  return [
    task.title,
    task.baseTitle,
    task.objective,
    task.deliverable,
    ...(task.steps || []),
    ...(task.rubric || [])
  ].join(" ");
}

function getRoadmapStepId(trackId, task) {
  return `${trackId}-${getDurationWeeks()}w-${task.planWeek}-${task.baseIndex}`;
}

function getNextCurriculumTask(trackId) {
  const tasks = getVisibleRoadmapTasks(trackId);
  return tasks.find((task) => !state.completedRoadmap.includes(getRoadmapStepId(trackId, task))) || tasks[tasks.length - 1];
}

function getRecommendedResources(track, context) {
  const candidates = resources.filter((resource) => {
    const trackMatch = resource.tracks.includes(track.id);
    return trackMatch && !isRoleExcludedResource(resource, context.role);
  });
  const gapLinked = candidates.filter((resource) => getResourceGapMatches(resource, context).length);
  const roleLinked = candidates.filter((resource) => getRoleLinkedResourceIds(context.role).includes(resource.id));
  const roadmapLinked = candidates.filter((resource) => getResourceLinkedTasks(resource.id, context.visibleTasks).length);
  const pool = uniqueResources(context.gapSkills.length
    ? [...gapLinked, ...roleLinked, ...roadmapLinked, ...candidates]
    : [...roleLinked, ...roadmapLinked, ...candidates]);
  return pool
    .map((resource) => ({
      resource,
      score: getEducationResourceScore(resource, context)
    }))
    .sort((a, b) => {
      const trustDiff = getRecommendationTrustRank(b.resource) - getRecommendationTrustRank(a.resource);
      if (trustDiff !== 0) return trustDiff;
      const scoreDiff = b.score - a.score;
      if (scoreDiff !== 0) return scoreDiff;
      return sortResourcesForLearning(a.resource, b.resource, context);
    })
    .map((item) => item.resource);
}

function getRoadmapRecommendedResources(track, tasks, context) {
  const resourceUseCounts = new Map();
  return uniqueResources(tasks.flatMap((task) => {
    const linkedResources = getRoadmapResourcesForTask(track, task, context, resourceUseCounts);
    linkedResources.forEach((resource) => {
      resourceUseCounts.set(resource.id, (resourceUseCounts.get(resource.id) || 0) + 1);
    });
    return linkedResources;
  }));
}

function getCurrentRoadmapSelectionResources() {
  if (!hasActiveRoleSelection()) return [];
  const track = getSelectedTrack();
  const tasks = getVisibleRoadmapTasks(track.id);
  const context = getRecommendationContext(track, getGapSkills(track.id), tasks);
  return getRoadmapRecommendedResources(track, tasks, context);
}

function selectAllCurrentRoadmapResources() {
  const ids = getCurrentRoadmapSelectionResources().map((resource) => resource.id);
  if (!ids.length) return;
  state.saved = [...new Set([...state.saved, ...ids])];
  saveState();
  render();
}

function clearCurrentRoadmapResourceSelection() {
  const ids = new Set(getCurrentRoadmapSelectionResources().map((resource) => resource.id));
  if (!ids.size) return;
  state.saved = state.saved.filter((id) => !ids.has(id));
  state.completed = state.completed.filter((id) => !ids.has(id));
  saveState();
  render();
}

function getRoadmapResourcesForTask(track, task, context, resourceUseCounts = new Map()) {
  const trackResources = resources.filter((resource) => (
    resource.tracks.includes(track.id)
    && !isRoleExcludedResource(resource, context.role)
  ));
  const selectedResources = trackResources.filter((resource) => state.saved.includes(resource.id));
  const taskCompetencyLinked = trackResources.filter((resource) => isTaskRoleCompetencyResource(resource, task, context));
  const gapLinked = trackResources.filter((resource) => getResourceGapMatches(resource, context).length);
  const roleLinked = trackResources.filter((resource) => getRoleLinkedResourceIds(context.role).includes(resource.id));
  const directlyLinked = trackResources.filter((resource) => getResourceLinkedTasks(resource.id, [task]).length);
  const taskMatched = trackResources.filter((resource) => (
    getTaskMatchedSkills(resource, task).length
    || getTaskResourceKeywordMatches(resource, task).length
    || getTaskRoleKeywordMatches(resource, task, context.role).length
  ));
  const preferredPool = uniqueResources([...selectedResources, ...taskCompetencyLinked, ...gapLinked, ...directlyLinked, ...roleLinked, ...taskMatched]);
  const pool = preferredPool.length >= 3
    ? preferredPool
    : uniqueResources([...preferredPool, ...trackResources]);

  const ranked = pool
    .map((resource) => ({
      resource,
      score: getTaskResourceScore(resource, task, context, resourceUseCounts)
    }))
    .sort((a, b) => {
      const selectedDiff = Number(state.saved.includes(b.resource.id)) - Number(state.saved.includes(a.resource.id));
      if (selectedDiff !== 0) return selectedDiff;
      const trustDiff = getRecommendationTrustRank(b.resource) - getRecommendationTrustRank(a.resource);
      if (trustDiff !== 0) return trustDiff;
      const scoreDiff = b.score - a.score;
      if (scoreDiff !== 0) return scoreDiff;
      return sortResourcesForLearning(a.resource, b.resource, context);
    });
  const resourceLimit = getRoadmapResourceLimit(context);
  const selected = [];
  const addRankedResources = (items) => {
    items.forEach((item) => {
      if (selected.length >= resourceLimit) return;
      if (selected.some((selectedItem) => selectedItem.resource.id === item.resource.id)) return;
      if (shouldSkipRepeatedRoadmapResource(item.resource, resourceUseCounts)) return;
      if (shouldDeferRoadmapResourceForPrerequisites(item.resource, context, resourceUseCounts)) return;
      if (shouldReserveRoadmapResourceForLaterTask(item.resource, task, context)) return;
      selected.push(item);
    });
  };

  const savedRanked = ranked.filter((item) => state.saved.includes(item.resource.id));
  const directCompetencyRanked = ranked.filter((item) => isTaskRoleCompetencyResource(item.resource, task, context));
  const directTaskRanked = ranked.filter((item) => getResourceLinkedTasks(item.resource.id, [task]).length);
  const trustedDirectTaskRanked = directTaskRanked.filter((item) => (
    ["reviewed", "verified"].includes(item.resource.qualityStatus) && !item.resource.broad
  ));
  const weakDirectTaskRanked = directTaskRanked.filter((item) => !trustedDirectTaskRanked.includes(item));
  const directRoleRanked = ranked.filter((item) => getRoleLinkedResourceIds(context.role).includes(item.resource.id));
  const unusedRelevant = ranked.filter((item) => getRoadmapResourceUseCount(resourceUseCounts, item.resource.id) === 0 && item.score >= 8);
  addRankedResources(savedRanked);
  addRankedResources(trustedDirectTaskRanked);
  addRankedResources(directCompetencyRanked);
  addRankedResources(directRoleRanked);
  addRankedResources(weakDirectTaskRanked);
  addRankedResources(unusedRelevant);

  if (selected.length < resourceLimit) {
    selected.push(...ranked
      .filter((item) => !selected.some((selectedItem) => selectedItem.resource.id === item.resource.id))
      .filter((item) => !shouldSkipRepeatedRoadmapResource(item.resource, resourceUseCounts))
      .filter((item) => !shouldDeferRoadmapResourceForPrerequisites(item.resource, context, resourceUseCounts))
      .filter((item) => !shouldReserveRoadmapResourceForLaterTask(item.resource, task, context))
      .slice(0, resourceLimit - selected.length));
  }

  const hasDirectTrustedResource = selected.some((item) => isTrustedDirectRoadmapResource(item.resource, task, context));
  if (!hasDirectTrustedResource) return [];

  return selected
    .filter((item) => isRelevantRoadmapResource(item.resource, task, context))
    .slice(0, resourceLimit)
    .map((item) => item.resource);
}

function isTrustedDirectRoadmapResource(resource, task, context) {
  return ["reviewed", "verified"].includes(resource.qualityStatus)
    && !resource.broad
    && (
      getResourceLinkedTasks(resource.id, [task]).length
      || getRoleLinkedResourceIds(context.role).includes(resource.id)
      || isTaskRoleCompetencyResource(resource, task, context)
    );
}

function isRelevantRoadmapResource(resource, task, context) {
  if (state.saved.includes(resource.id)) return true;
  if (resource.broad) return false;
  return getResourceLinkedTasks(resource.id, [task]).length
    || getRoleLinkedResourceIds(context.role).includes(resource.id)
    || isTaskRoleCompetencyResource(resource, task, context)
    || getTaskMatchedSkills(resource, task).length
    || getTaskResourceKeywordMatches(resource, task).length
    || getTaskRoleKeywordMatches(resource, task, context.role).length;
}

function shouldSkipRepeatedRoadmapResource(resource, resourceUseCounts) {
  return getRoadmapResourceUseCount(resourceUseCounts, resource.id) > 0 && !isReusableRoadmapResource(resource);
}

function isReusableRoadmapResource(resource) {
  const resourceText = getResourceBadgeText(resource);
  return resource.totalMinutes >= 480
    || resource.practiceMinutes >= 300
    || /부트캠프|KDT|프로젝트|멘토링|현장실습|인턴체험|장기훈련/i.test(resourceText);
}

function shouldDeferRoadmapResourceForPrerequisites(resource, context, resourceUseCounts) {
  if (resource.id === "matlab-onramp") return false;
  return getMissingRoadmapPrerequisiteIds(resource, context, resourceUseCounts).length > 0;
}

function shouldReserveRoadmapResourceForLaterTask(resource, task, context) {
  if (isReusableRoadmapResource(resource)) return false;
  if (getResourceLinkedTasks(resource.id, [task]).length) return false;

  const currentWeek = Number(task.planWeek || 1);
  return (context.visibleTasks || [])
    .some((visibleTask) => (
      Number(visibleTask.planWeek || 1) > currentWeek
      && getResourceLinkedTasks(resource.id, [visibleTask]).length
    ));
}

function getTaskRoleCompetencySkills(task, context) {
  if (!context.role) return [];
  const text = getTaskSearchText(task);
  return (roleDiagnostics[context.role.id] || [])
    .map(([skill]) => skill)
    .filter((skill) => text.includes(skill));
}

function isTaskRoleCompetencyResource(resource, task, context) {
  return getTaskRoleCompetencySkills(task, context)
    .some((skill) => getRoleCompetencyResourceIds(context.role, skill).includes(resource.id));
}

function getRoadmapResourceLimit(context) {
  if (context.durationWeeks <= 2) return 2;
  if (context.durationWeeks <= 4) return 3;
  return 3;
}

function uniqueResources(resourceList) {
  return [...new Map(resourceList.map((resource) => [resource.id, resource])).values()];
}

function renderCompetencyActionPlan(context, tasks) {
  const actionItems = getCompetencyActionItems(context, tasks).slice(0, 4);
  return `
    <section class="competency-action-panel" aria-label="역량 확보 우선순위">
      <div class="competency-action-head">
        <strong>역량 확보 우선순위</strong>
        <span>먼저 할 일을 정한 뒤, 예시 자료 중 필요한 것만 계획에 넣으세요.</span>
      </div>
      <div class="competency-action-list">
        ${actionItems.map((item, index) => `
          <article class="competency-action-item">
            <span class="competency-action-number">${index + 1}</span>
            <div>
              <strong>${item.title}</strong>
              <p>${item.body}</p>
              <em>완성할 산출물: ${item.deliverable}</em>
              ${item.resources.length ? `
                <div class="competency-example-resources">
                  <span>예시 자료</span>
                  ${item.resources.map((resource) => `
                    <div class="competency-example-resource">
                      <div class="competency-example-main">
                        <span class="competency-example-label">추천 교육</span>
                        <strong class="competency-example-title">${resource.title}</strong>
                        <div class="education-info-row"><strong>교육 소개</strong><span>${getResourceIntroText(resource)}</span></div>
                        <div class="education-info-row"><strong>다루는 역량</strong><span>${getResourceSkillSummary(resource)}</span></div>
                        <div class="education-info-row is-opinion"><strong>추천 의견</strong><span>${getExpertResourceReview(resource, context, item.task)}</span></div>
                        <div class="education-info-row"><strong>완성할 산출물</strong><span>${resource.expectedOutput || item.deliverable}</span></div>
                      </div>
                      <div class="competency-example-actions">
                        <a class="resource-action" href="${resource.url}" target="_blank" rel="noreferrer">${getResourceOpenLabel(resource)}</a>
                        ${renderSaveActionButton(resource, "내 커리큘럼에 추가")}
                      </div>
                    </div>
                  `).join("")}
                </div>
              ` : ""}
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function getCompetencyActionItems(context, tasks) {
  const usedResourceIds = new Set();
  return tasks.map((task, index) => {
    const resourcesForTask = getCompetencyActionResources(context, task, usedResourceIds);
    resourcesForTask.forEach((resource) => usedResourceIds.add(resource.id));
    const defaultBodies = [
      "지원 회사 공고의 업무·자격요건 문장과 앱의 직무 설명을 맞춰보고, 이 직무가 실제로 내가 준비하려는 업무인지 판단합니다.",
      "체크하지 못한 역량 중 하나를 골라 개념 설명이 아니라 계산, 표, 모델, 로그 중 하나로 증명합니다.",
      "시뮬레이션, 데이터 분석, 현장실습, 부트캠프 중 현재 환경에서 가능한 방식을 골라 작은 산출물을 만듭니다.",
      "일반 커리큘럼 산출물을 지원 회사 공고 문장에 맞춰 줄이고, 면접에서 설명할 근거만 남깁니다."
    ];
    return {
      task,
      title: task.title,
      body: defaultBodies[index] || task.objective,
      deliverable: task.deliverable,
      resources: resourcesForTask
    };
  });
}

function getCompetencyActionResources(context, task, usedResourceIds = new Set()) {
  const rankedResources = resources
    .filter((resource) => (
      resource.tracks.includes(context.track.id)
      && !isRoleExcludedResource(resource, context.role)
    ))
    .map((resource) => ({
      resource,
      score: getTaskResourceScore(resource, task, context) + (isHandsOnResource(resource) ? 70 : 0)
    }))
    .sort((a, b) => {
      const trustDiff = getRecommendationTrustRank(b.resource) - getRecommendationTrustRank(a.resource);
      if (trustDiff !== 0) return trustDiff;
      return b.score - a.score;
    });
  const freshResources = rankedResources.filter((item) => !usedResourceIds.has(item.resource.id));
  const selectedResources = freshResources.slice(0, 2);
  if (selectedResources.length < 2) {
    const selectedIds = new Set(selectedResources.map((item) => item.resource.id));
    selectedResources.push(...rankedResources
      .filter((item) => !selectedIds.has(item.resource.id))
      .slice(0, 2 - selectedResources.length));
  }
  return selectedResources
    .map((item) => item.resource);
}

function renderHandsOnResourcePanel(context) {
  const resourcesForPractice = getHandsOnResourceCandidates(context).slice(0, 3);
  if (!resourcesForPractice.length) return "";

  return `
    <div class="hands-on-resource-panel">
      <div>
        <strong>직접 실습 후보</strong>
        <span>시뮬레이션, 현장실습, 직무부트캠프처럼 산출물을 남기기 좋은 자료입니다.</span>
      </div>
      <div class="hands-on-resource-list">
        ${resourcesForPractice.map((resource) => `
          <div class="hands-on-resource-link">
            <span>
              <strong>${resource.title}</strong>
              <em>${resource.provider} · ${resource.type} · ${formatMinutes(resource.totalMinutes)}</em>
            </span>
            <span>
              <a class="resource-action" href="${resource.url}" target="_blank" rel="noreferrer">${getResourceOpenLabel(resource)}</a>
              ${renderSaveActionButton(resource, "내 커리큘럼에 추가")}
            </span>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function getHandsOnResourceCandidates(context) {
  return getRecommendedResources(context.track, context)
    .filter(isHandsOnResource)
    .sort((a, b) => {
      const trustDiff = getRecommendationTrustRank(b) - getRecommendationTrustRank(a);
      if (trustDiff !== 0) return trustDiff;
      return getHandsOnResourceScore(b, context) - getHandsOnResourceScore(a, context);
    });
}

function getHandsOnResourceScore(resource, context) {
  const roleLinked = getRoleLinkedResourceIds(context.role).includes(resource.id) ? 1 : 0;
  const externalCourse = /코멘토|렛유인|STEP|HRD-Net|K-MOOC|KOCW|Coursera|edX|인프런|Udemy|Boostcourse|Ansys|NI|Google/.test(resource.provider) ? 1 : 0;
  const simulation = /Simulink|Simscape|Stateflow|시뮬레이션|HIL|SIL|모델링|모델/.test(getResourceBadgeText(resource)) ? 1 : 0;
  return getEducationResourceScore(resource, context)
    + roleLinked * 90
    + externalCourse * 180
    + simulation * 30
    + Math.min(resource.practiceMinutes, 720) * 0.04;
}

function countKeywordMatches(text, keywords) {
  return keywords.filter((keyword) => text.includes(String(keyword).toLowerCase())).length;
}

function clampScore(score, min, max) {
  return Math.max(min, Math.min(max, score));
}

function getCompetencyFitScore(resource, context) {
  const text = getResourceSearchText(resource);
  const coreResource = resource.core ? 1 : 0;
  const gapMatches = getResourceGapMatches(resource, context).length;
  const acquiredMatches = getResourceAcquiredMatches(resource, context).length;
  const roleKeywordMatches = getRoleKeywordMatches(resource, context.role).length;
  const linkedTaskMatches = getResourceLinkedTasks(resource.id, context.visibleTasks).length;
  const practiceEvidence = countKeywordMatches(text, ["실습", "시뮬레이션", "부트캠프", "프로젝트", "멘토링", "현장실습", "KDT", "보고서", "리포트", "README", "검증", "그래프", "표", "체크리스트"]);
  const shortDurationFit = context.durationWeeks <= 2 && resource.totalMinutes <= 180 ? 1 : 0;
  let score = 0;

  score += gapMatches * 34;
  score += roleKeywordMatches * 16;
  score += linkedTaskMatches * 14;
  score += Math.min(practiceEvidence, 4) * 6;
  score += shortDurationFit * 10;
  score += coreResource * 16;
  if (resource.provider === "MathWorks" && isMathWorksRequiredForRole(context)) score += 16;
  if (context.gapSkills.length && acquiredMatches && !gapMatches) score -= 18;

  return clampScore(score, 0, 92);
}

function getGoalResourceScore(resource, context) {
  const text = getResourceSearchText(resource);
  const goalKey = context.goalKey || "foundation";
  const preferredDifficulty = context.goal.preferredDifficulties.includes(resource.difficulty) ? 1 : 0;
  const gapMatches = getResourceGapMatches(resource, context).length;
  const goalSkillMatches = (resource.skills || []).filter((skill) => context.goal.prioritySkills.includes(skill)).length;
  const roleKeywordMatches = getRoleKeywordMatches(resource, context.role).length;
  const outputEvidenceMatches = countKeywordMatches(text, [
    "보고서",
    "리포트",
    "README",
    "검증",
    "그래프",
    "표",
    "모델",
    "비교",
    "체크리스트",
    "근거",
    "메모"
  ]);
  const officialSource = /공식|정부|협회|대학|ocw|무료교육|무료청강|mathworks|ncs|nist|asq|coursera|edx|khan|freecodecamp|hrd-net|gseek|인프런|udemy|youtube|ansys|ni|google|boostcourse/.test(text) ? 1 : 0;
  let score = 0;

  if (goalKey === "explore") {
    score += (resource.difficulty === "입문" ? 34 : 0)
      + goalSkillMatches * 22
      + (resource.totalMinutes <= 180 ? 12 : 0)
      + (resource.languageCode === "ko" ? 10 : 0)
      + countKeywordMatches(text, ["직무 이해", "용어", "개념", "ncs", "요약"]) * 8
      - (resource.difficulty === "적용" ? 10 : 0);
  }

  if (goalKey === "foundation") {
    score += gapMatches * 30
      + preferredDifficulty * 20
      + goalSkillMatches * 12
      + (resource.sequenceLevel <= 3 ? 10 : 0)
      + countKeywordMatches(text, ["기초", "입문", "보완", "onramp"]) * 6;
  }

  if (goalKey === "portfolio") {
    score += (resource.practiceMinutes >= 60 ? 26 : 0)
      + (resource.difficulty !== "입문" ? 16 : 0)
      + Math.min(outputEvidenceMatches, 4) * 9
      + goalSkillMatches * 14
      + (resource.totalMinutes >= 120 ? 6 : 0);
  }

  if (goalKey === "interview") {
    score += Math.min(roleKeywordMatches, 3) * 18
      + Math.min(outputEvidenceMatches, 4) * 8
      + preferredDifficulty * 14
      + (resource.totalMinutes <= 240 ? 10 : 0)
      + officialSource * 8
      + goalSkillMatches * 12;
  }

  return clampScore(score, 0, 84);
}

function getCompetencyFitSignal(resource, context) {
  const score = getCompetencyFitScore(resource, context);
  if (score < 24) return "";
  return "역량 체크 기반 추천";
}

function getGoalFitSignal(resource, context) {
  return "";
}

function getEducationResourceScore(resource, context) {
  const coreResource = resource.core ? 1 : 0;
  const roleDirectMatch = getRoleLinkedResourceIds(context.role).includes(resource.id) ? 1 : 0;
  const mathWorksRoleNeed = resource.provider === "MathWorks" && isMathWorksRequiredForRole(context) ? 1 : 0;
  const roleKeywordMatches = getRoleKeywordMatches(resource, context.role).length;
  const gapMatches = getResourceGapMatches(resource, context).length;
  const acquiredMatches = getResourceAcquiredMatches(resource, context).length;
  const taskMatches = getResourceLinkedTasks(resource.id, context.visibleTasks).length;
  const mathWorksMatches = getMathWorksSkillMatches(resource, context).length;
  const competencyScore = getCompetencyFitScore(resource, context);
  const goalScore = getGoalResourceScore(resource, context);
  const selectedMatch = state.saved.includes(resource.id) ? 1 : 0;
  const broadPenalty = resource.broad && !selectedMatch ? 180 : 0;
  const qualityPenalty = getResourceQualityPenalty(resource);
  const completedPenalty = state.completed.includes(resource.id) ? 18 : 0;
  const acquiredOnlyPenalty = context.gapSkills.length && acquiredMatches && !gapMatches ? 80 : 0;
  const noGapPenalty = context.gapSkills.length && !gapMatches ? 28 : 0;

  return roleDirectMatch * 520
    + coreResource * 90
    + gapMatches * 48
    + mathWorksRoleNeed * 80
    + mathWorksMatches * 36
    + roleKeywordMatches * 22
    + taskMatches * 18
    + competencyScore
    + goalScore
    + getResourcePriorityScore(resource, context)
    + selectedMatch * 24
    - broadPenalty
    - qualityPenalty
    - completedPenalty
    - acquiredOnlyPenalty
    - noGapPenalty;
}

function getEducationResourceSignals(resource, context) {
  const signals = [];
  const roleDirectMatch = getRoleLinkedResourceIds(context.role).includes(resource.id);
  const matchedGaps = getResourceGapMatches(resource, context);
  const mathWorksMatches = getMathWorksSkillMatches(resource, context);
  const mathWorksRoleNeed = resource.provider === "MathWorks" && isMathWorksRequiredForRole(context);
  const roleKeywordMatches = getRoleKeywordMatches(resource, context.role);
  const linkedTasks = getResourceLinkedTasks(resource.id, context.visibleTasks);
  const competencyFitSignal = getCompetencyFitSignal(resource, context);
  const goalFitSignal = getGoalFitSignal(resource, context);

  if (roleDirectMatch) signals.push("선택 직무 직접 연결");
  if (isKoreanAvailableResource(resource)) signals.push("한국어 가능");
  if (resource.starterPack) signals.push("필수 Starter Pack");
  else if (resource.core) signals.push("핵심 직무역량 교육");
  if (competencyFitSignal) signals.push(competencyFitSignal);
  if (goalFitSignal) signals.push(goalFitSignal);
  if (mathWorksRoleNeed) signals.push("MathWorks 요구 직무");
  if (matchedGaps.length) signals.push(`역량 체크 보완: ${matchedGaps.slice(0, 2).join(", ")}`);
  if (mathWorksMatches.length) signals.push(`MathWorks 역량: ${mathWorksMatches.slice(0, 2).join(", ")}`);
  if (roleKeywordMatches.length) signals.push(`채용 키워드: ${roleKeywordMatches.slice(0, 2).join(", ")}`);
  if (linkedTasks.length) signals.push(`커리큘럼 연결: ${linkedTasks.slice(0, 2).join(", ")}`);
  if (state.saved.includes(resource.id)) signals.push("계획 선택됨");

  return signals;
}

function getRoleLinkedResourceIds(role) {
  if (!role) return [];
  return roleResourceLinks[role.id] || [];
}

function getRoleCompetencyResourceIds(role, skill) {
  if (!role) return [];
  return roleCompetencyResourceLinks[role.id]?.[skill] || [];
}

function isRoleExcludedResource(resource, role) {
  if (!role) return false;
  return (roleResourceExclusions[role.id] || []).includes(resource.id);
}

function getMathWorksSkillMatches(resource, context) {
  if (resource.provider !== "MathWorks") return [];
  const roleText = context.role ? getRoleSearchText(context.track, context.role) : "";
  const diagnosticText = context.role ? (roleDiagnostics[context.role.id] || []).flat().join(" ").toLowerCase() : "";
  const combinedText = `${roleText} ${diagnosticText}`;
  return (resource.skills || []).filter((skill) => {
    const normalized = skill.toLowerCase();
    return combinedText.includes(normalized)
      || getSearchTokens(skill).some((token) => combinedText.includes(token));
  });
}

function isMathWorksRequiredForRole(context) {
  if (!context.role) return false;
  const roleText = getRoleSearchText(context.track, context.role);
  return [
    "matlab",
    "simulink",
    "model based",
    "model-based",
    "모델 기반",
    "sil",
    "hil",
    "mpc",
    "foc",
    "sensor fusion",
    "센서융합",
    "kalman"
  ].some((keyword) => roleText.includes(keyword));
}

function getTaskResourceScore(resource, task, context, resourceUseCounts = new Map()) {
  const coreResource = resource.core ? 1 : 0;
  const directTaskMatches = getResourceLinkedTasks(resource.id, [task]).length;
  const roleDirectMatch = getRoleLinkedResourceIds(context.role).includes(resource.id) ? 1 : 0;
  const mathWorksRoleNeed = resource.provider === "MathWorks" && isMathWorksRequiredForRole(context) ? 1 : 0;
  const matchedSkills = getTaskMatchedSkills(resource, task).length;
  const keywordMatches = getTaskResourceKeywordMatches(resource, task).length;
  const roleKeywordMatches = getTaskRoleKeywordMatches(resource, task, context.role).length;
  const gapMatches = getTaskGapMatches(resource, task, context.gapSkills).length;
  const resourceGapMatches = getResourceGapMatches(resource, context).length;
  const acquiredMatches = getResourceAcquiredMatches(resource, context).length;
  const outputMatches = getTaskOutputMatches(resource, task).length;
  const otherLinkedTaskMatches = getOtherLinkedTaskMatches(resource, task, context).length;
  const competencyScore = getCompetencyFitScore(resource, context);
  const goalScore = getGoalResourceScore(resource, context);
  const selectedMatch = state.saved.includes(resource.id) ? 1 : 0;
  const handsOnMatch = isHandsOnResource(resource) ? 1 : 0;
  const alreadyUsedPenalty = getRoadmapResourceUseCount(resourceUseCounts, resource.id) * (isReusableRoadmapResource(resource) ? 220 : 1400);
  const durationPenalty = getDurationResourcePenalty(resource, context);
  const broadPenalty = resource.broad && !selectedMatch ? 240 : 0;
  const qualityPenalty = getResourceQualityPenalty(resource);
  const acquiredOnlyPenalty = context.gapSkills.length && acquiredMatches && !resourceGapMatches ? 160 : 0;
  const noGapPenalty = context.gapSkills.length && !resourceGapMatches && !gapMatches ? 70 : 0;
  const sequencePenalty = getRoadmapSequencePenalty(resource, task, context, resourceUseCounts);
  const laterTaskReservationPenalty = shouldReserveRoadmapResourceForLaterTask(resource, task, context) ? 900 : 0;

  return directTaskMatches * 160
    + coreResource * 95
    + (coreResource && directTaskMatches ? 75 : 0)
    + selectedMatch * 90
    + roleDirectMatch * 240
    + mathWorksRoleNeed * 35
    + matchedSkills * 45
    + Math.min(keywordMatches, 6) * 10
    + resourceGapMatches * 90
    + gapMatches * 45
    + roleKeywordMatches * 18
    + outputMatches * 14
    + handsOnMatch * 36
    + competencyScore * 0.45
    + goalScore * 0.45
    + getResourcePriorityScore(resource, context) * 0.15
    - (directTaskMatches ? 0 : otherLinkedTaskMatches * 180)
    - alreadyUsedPenalty
    - durationPenalty
    - broadPenalty
    - qualityPenalty
    - acquiredOnlyPenalty
    - noGapPenalty
    - sequencePenalty
    - laterTaskReservationPenalty;
}

function getRoadmapSequencePenalty(resource, task, context, resourceUseCounts = new Map()) {
  const preferredLevel = getPreferredSequenceLevelForTask(task, context);
  const sequenceOverrun = Math.max(0, (resource.sequenceLevel || 1) - preferredLevel);
  const missingPrerequisiteCount = getMissingRoadmapPrerequisiteIds(resource, context, resourceUseCounts).length;
  return sequenceOverrun * 90 + missingPrerequisiteCount * 260;
}

function getPreferredSequenceLevelForTask(task, context) {
  const week = Number(task?.planWeek || 1);
  if (/산출물/.test(task?.phase || "")) return 5;
  if (/심화/.test(task?.phase || "")) return 4;
  if (context.durationWeeks <= 2) return week <= 1 ? 2 : 4;
  if (week <= 1) return 2;
  if (week <= 2) return 3;
  if (week <= Math.max(3, Math.ceil(context.durationWeeks / 2))) return 4;
  return 5;
}

function getMissingRoadmapPrerequisiteIds(resource, context, resourceUseCounts = new Map()) {
  return getResourcePrerequisiteResourceIds(resource, context)
    .filter((resourceId) => resourceId !== resource.id)
    .filter((resourceId) => !getRoadmapResourceUseCount(resourceUseCounts, resourceId));
}

function getResourcePrerequisiteResourceIds(resource, context) {
  const prerequisites = resource.prerequisites || [];
  const acquiredText = normalizeRoleSearch([
    ...(context?.acquiredSkills || []),
    ...(context?.role?.coreCompetencies || [])
  ].join(" "));
  const prerequisiteMap = [
    { pattern: /MATLAB 기초|데이터 분석 기초/, ids: ["matlab-onramp"] },
    { pattern: /Simulink 기초/, ids: ["simulink-onramp"] },
    { pattern: /Simscape 기초/, ids: ["simscape-onramp"] },
    { pattern: /상태기계 기초|Stateflow 기초/, ids: ["stateflow-onramp"] },
    { pattern: /신호처리 기초/, ids: ["signal-processing-onramp"] },
    { pattern: /통계 기초|평균과 표준편차/, ids: ["statistics-onramp"] }
  ];

  return [...new Set(prerequisites.flatMap((prerequisite) => {
    if (isPrerequisiteSatisfiedByProfile(prerequisite, acquiredText)) return [];
    return prerequisiteMap
      .filter((item) => item.pattern.test(prerequisite))
      .flatMap((item) => item.ids);
  }))];
}

function isPrerequisiteSatisfiedByProfile(prerequisite, acquiredText) {
  if (!acquiredText) return false;
  if (/MATLAB 기초/.test(prerequisite) && /matlab|python|데이터|통계|분석/.test(acquiredText)) return true;
  return getSearchTokens(prerequisite)
    .filter((token) => token.length >= 2)
    .some((token) => acquiredText.includes(token));
}

function getResourceQualityPenalty(resource) {
  if (resource.qualityStatus === "reviewNeeded") return 260;
  if (resource.qualityStatus === "candidate") return 150;
  return 0;
}

function getRecommendationTrustRank(resource) {
  const trusted = ["reviewed", "verified"].includes(resource.qualityStatus);
  if (trusted && !resource.broad) return 3;
  if (trusted) return 2;
  if (resource.qualityStatus === "candidate" && !resource.broad) return 1;
  return 0;
}

function getDurationResourcePenalty(resource, context) {
  if (context.durationWeeks <= 2) {
    return (resource.totalMinutes > 240 ? 90 : 0)
      + (resource.difficulty === "적용" && resource.practiceMinutes < 60 ? 35 : 0);
  }

  if (context.durationWeeks <= 4) {
    return resource.totalMinutes > 420 ? 45 : 0;
  }

  if (context.durationWeeks >= 8 && resource.practiceMinutes >= 60) {
    return -20;
  }

  return 0;
}

function getRoadmapResourceUseCount(resourceUseCounts, resourceId) {
  return resourceUseCounts instanceof Map
    ? resourceUseCounts.get(resourceId) || 0
    : Number(resourceUseCounts?.has?.(resourceId) || 0);
}

function getTaskResourceSignals(resource, task, context) {
  const signals = [];
  const directTaskMatches = getResourceLinkedTasks(resource.id, [task]);
  const roleDirectMatch = getRoleLinkedResourceIds(context.role).includes(resource.id);
  const matchedSkills = getTaskMatchedSkills(resource, task);
  const gapMatches = getTaskGapMatches(resource, task, context.gapSkills);
  const resourceGapMatches = getResourceGapMatches(resource, context);
  const roleKeywordMatches = getTaskRoleKeywordMatches(resource, task, context.role);
  const competencyFitSignal = getCompetencyFitSignal(resource, context);
  const goalFitSignal = getGoalFitSignal(resource, context);

  if (directTaskMatches.length) signals.push("이번 주 과제 직접 연결");
  if (resourceGapMatches.length) signals.push(`부족 역량 보완: ${resourceGapMatches.slice(0, 2).join(", ")}`);
  if (resource.starterPack) signals.push("필수 Starter Pack");
  else if (resource.core) signals.push("핵심 직무역량 교육");
  if (roleDirectMatch) signals.push("선택 직무 직접 연결");
  if (competencyFitSignal) signals.push(competencyFitSignal);
  if (goalFitSignal) signals.push(goalFitSignal);
  if (matchedSkills.length) signals.push(`과제 역량: ${matchedSkills.slice(0, 2).join(", ")}`);
  if (gapMatches.length) signals.push(`과제 결핍 연결: ${gapMatches.slice(0, 2).join(", ")}`);
  if (roleKeywordMatches.length) signals.push(`세부 직무 키워드: ${roleKeywordMatches.slice(0, 2).join(", ")}`);
  if (!signals.length) signals.push(`이번 주 산출물: ${task.deliverable}`);

  return signals;
}

function getTaskMatchedSkills(resource, task) {
  const taskText = getTaskSearchText(task).toLowerCase();
  return (resource.skills || []).filter((skill) => taskText.includes(skill.toLowerCase()));
}

function getTaskGapMatches(resource, task, gapSkills) {
  const taskText = getTaskSearchText(task).toLowerCase();
  const resourceText = getResourceSearchText(resource);
  return gapSkills.filter((skill) => {
    const normalized = skill.toLowerCase();
    return taskText.includes(normalized) && resourceText.includes(normalized);
  });
}

function getResourceSkillMatches(resource, skills) {
  const resourceText = getResourceSearchText(resource);
  return (skills || []).filter((skill) => {
    const normalized = skill.toLowerCase();
    return resourceText.includes(normalized)
      || getSearchTokens(skill).some((token) => resourceText.includes(token));
  });
}

function getMappedRoleCompetencyMatches(resource, context, skills = []) {
  if (!context.role) return [];
  const competencyMap = roleCompetencyResourceLinks[context.role.id] || {};
  return (skills || []).filter((skill) => (competencyMap[skill] || []).includes(resource.id));
}

function getResourceGapMatches(resource, context) {
  return [
    ...new Set([
      ...getResourceSkillMatches(resource, context.gapSkills),
      ...getMappedRoleCompetencyMatches(resource, context, context.gapSkills)
    ])
  ];
}

function getResourceAcquiredMatches(resource, context) {
  return [
    ...new Set([
      ...getResourceSkillMatches(resource, context.acquiredSkills),
      ...getMappedRoleCompetencyMatches(resource, context, context.acquiredSkills)
    ])
  ];
}

function getTaskRoleKeywordMatches(resource, task, role) {
  if (!role) return [];
  const taskText = getTaskSearchText(task).toLowerCase();
  const resourceText = getResourceSearchText(resource);
  return role.postingKeywords.filter((keyword) => {
    const normalized = keyword.toLowerCase();
    return taskText.includes(normalized) && resourceText.includes(normalized);
  });
}

function getTaskOutputMatches(resource, task) {
  const resourceText = getResourceSearchText(resource);
  return getSearchTokens(task.deliverable).filter((token) => resourceText.includes(token));
}

function getOtherLinkedTaskMatches(resource, task, context) {
  const currentTaskTitle = task.baseTitle || task.title;
  return getResourceLinkedTasks(resource.id, context.visibleTasks)
    .filter((taskTitle) => taskTitle !== currentTaskTitle);
}

function getTaskResourceKeywordMatches(resource, task) {
  const resourceText = getResourceSearchText(resource);
  return getSearchTokens(getTaskSearchText(task))
    .filter((token) => !roadmapResourceStopwords.has(token))
    .filter((token) => resourceText.includes(token));
}

function getResourceSearchText(resource) {
  return [
    resource.title,
    resource.provider,
    resource.type,
    resource.language,
    resource.difficulty,
    resource.reason,
    resource.expectedOutput,
    resource.output,
    ...(resource.skills || []),
    ...(resource.prerequisites || []),
    ...(resource.recommendedSections || [])
  ].join(" ").toLowerCase();
}

function getSearchTokens(text) {
  return [...new Set(String(text || "")
    .toLowerCase()
    .split(/[^0-9a-z가-힣/+.#]+/i)
    .filter((token) => token.length >= 2))];
}

const roadmapResourceStopwords = new Set([
  "과제",
  "교육",
  "자료",
  "후보",
  "기록",
  "요약",
  "정리",
  "검토",
  "선택",
  "연결",
  "기초",
  "실습",
  "산출물",
  "보고서",
  "가능",
  "이번",
  "주차",
  "관심",
  "직무"
]);

function renderRoadmapResourceItem(resource, task, context) {
  const saved = state.saved.includes(resource.id);
  const taskSignals = getTaskResourceSignals(resource, task, context);
  const signals = [...new Set([...taskSignals, ...getResourceSignals(resource, context)])]
    .filter((signal) => !signal.startsWith("커리큘럼 연결"))
    .slice(0, 3);
  const score = Math.round(getTaskResourceScore(resource, task, context));
  const coreLabel = resource.starterPack ? "필수 Starter Pack · " : resource.core ? "핵심 교육 · " : "";
  const connectionReason = getTaskResourceConnectionReason(resource, task, context);

  return `
    <details class="roadmap-resource-item">
      <summary>
        <span class="roadmap-resource-title">
          <strong>${resource.title}</strong>
          <em>${resource.provider} · ${resource.type} · ${resource.language} · ${formatMinutes(resource.totalMinutes)}</em>
          ${renderResourceTrustBadges(resource)}
        </span>
        <span class="roadmap-resource-side">
          <span class="roadmap-resource-status">${coreLabel}추천 ${score}점</span>
          <span class="roadmap-resource-toggle">
            <span class="show-open">교육내용 상세보기</span>
            <span class="show-close">상세 접기</span>
          </span>
        </span>
      </summary>
      <div class="roadmap-resource-detail">
        <div class="education-info-row is-meta"><strong>교육 정보</strong><span>${resource.provider} · ${resource.language} · ${resource.difficulty} · ${formatMinutes(resource.totalMinutes)}</span></div>
        <div class="education-info-row"><strong>교육 소개</strong><span>${getResourceIntroText(resource)}</span></div>
        <div class="education-info-row"><strong>다루는 역량</strong><span>${getResourceSkillSummary(resource)}</span></div>
        ${renderResourceSectionsRow(resource)}
        <div class="education-info-row"><strong>추천 이유</strong><span>${connectionReason}</span></div>
        <div class="education-info-row is-opinion"><strong>추천 의견</strong><span>${getExpertResourceReview(resource, context, task)}</span></div>
        <div class="education-info-row"><strong>연결 산출물</strong><span>${resource.expectedOutput}</span></div>
        <div class="education-info-row"><strong>연결 신호</strong><span>${signals.length ? signals.join(" · ") : `${task.deliverable}에 바로 연결됩니다.`}</span></div>
        <div class="roadmap-resource-actions">
          <a class="resource-action" href="${resource.url}" target="_blank" rel="noreferrer">${getResourceOpenLabel(resource)}</a>
          ${renderSaveActionButton(resource)}
        </div>
      </div>
    </details>
  `;
}

function renderResourceTrustBadges(resource) {
  const badges = [];
  const directUrl = !/search|results\?|query=|courses\/free\/?$/i.test(resource.url || "");
  const resourceText = getResourceBadgeText(resource);

  if (resource.starterPack) badges.push("필수 Starter Pack");
  if (isKoreanAvailableResource(resource)) badges.push("한국어 가능");
  if (/Simulink|Simscape|Stateflow|시뮬레이션|HIL|SIL|모델링|모델/.test(resourceText)) badges.push("시뮬레이션");
  if (isHandsOnResource(resource)) badges.push("실습형");
  if (/코멘토|렛유인|Coursera|edX|K-MOOC|KOCW|STEP|HRD-Net|인프런|Udemy|Boostcourse/.test(resource.provider)) badges.push("외부 과정");
  if (/MathWorks|Ansys|NI|Google|Texas Instruments|STMicroelectronics|Arm|KiCad|Linux Kernel|Yocto|ROS/.test(resource.provider)) badges.push("공식 자료");
  if (directUrl) badges.push("직접 링크");
  if (/youtube|영상/i.test(`${resource.provider} ${resource.type}`)) badges.push("동영상");
  if (resource.qualityStatus === "verified") badges.push("검증 자료");
  if (resource.qualityStatus === "reviewed") badges.push("검토 자료");
  if (resource.qualityStatus === "candidate") badges.push("검토 후보");
  if (resource.qualityStatus === "reviewNeeded") badges.push("재검토 필요");

  const uniqueBadges = [...new Set(badges)];
  return uniqueBadges.length
    ? `<span class="resource-trust-badges">${uniqueBadges.slice(0, 4).map((badge) => `<span>${badge}</span>`).join("")}</span>`
    : "";
}

function isKoreanAvailableResource(resource) {
  return resource.languageCode === "ko" || String(resource.language || "").includes("한국어");
}

function isHandsOnResource(resource) {
  return /실습|시뮬레이션|부트캠프|프로젝트|멘토링|현장실습|KDT|인턴체험|과제형|Maintenance|Trouble Shooting/i.test(getResourceBadgeText(resource));
}

function isDirectResourceUrl(resource) {
  return !/search|results\?|query=|courses\/free\/?$/i.test(resource.url || "");
}

function getResourceBadgeText(resource) {
  return [
    resource.title,
    resource.provider,
    resource.type,
    resource.reason,
    resource.expectedOutput,
    ...(resource.skills || [])
  ].join(" ");
}

function getResourceOpenLabel(resource) {
  return "교육페이지 열기";
}

function renderSaveActionButton(resource, label = "내 커리큘럼에 추가") {
  const saved = state.saved.includes(resource.id);
  return `
    <button class="resource-action ${saved ? "is-saved" : ""}" type="button" data-save-id="${resource.id}">
      ${saved ? "추가됨 · 제거" : label}
    </button>
  `;
}

function renderCompleteActionButton(resource) {
  const completed = state.completed.includes(resource.id);
  return `
    <button class="resource-action ${completed ? "is-saved" : ""}" type="button" data-complete-id="${resource.id}">
      ${completed ? "완료됨" : "완료 체크"}
    </button>
  `;
}

function getTaskResourceConnectionReason(resource, task, context) {
  const reasons = [];
  const directTaskMatches = getResourceLinkedTasks(resource.id, [task]);
  const gapMatches = getTaskGapMatches(resource, task, context.gapSkills);
  const roleKeywordMatches = getTaskRoleKeywordMatches(resource, task, context.role);
  const matchedSkills = getTaskMatchedSkills(resource, task);
  const outputMatches = getTaskOutputMatches(resource, task);

  if (directTaskMatches.length) reasons.push("이번 주 과제에 직접 연결");
  if (resource.starterPack) reasons.push("필수 Starter Pack");
  else if (resource.core) reasons.push("핵심 직무역량 교육");
  if (gapMatches.length) reasons.push(`부족 역량 보완: ${gapMatches.slice(0, 2).join(", ")}`);
  if (roleKeywordMatches.length) reasons.push(`채용 키워드 연결: ${roleKeywordMatches.slice(0, 2).join(", ")}`);
  if (matchedSkills.length) reasons.push(`과제 역량 연결: ${matchedSkills.slice(0, 2).join(", ")}`);
  if (outputMatches.length) reasons.push(`산출물 키워드 연결: ${outputMatches.slice(0, 2).join(", ")}`);
  if (resource.provider === "MathWorks" && isMathWorksRequiredForRole(context)) reasons.push("MathWorks 활용 직무 보강");
  if (context.durationWeeks <= 2 && resource.totalMinutes <= 240) reasons.push("짧은 기간에 소화 가능");
  if (context.durationWeeks >= 8 && resource.practiceMinutes >= 60) reasons.push("심화 실습 반복에 적합");

  return reasons.slice(0, 4).join(" · ") || `${task.deliverable} 산출물 작성에 필요한 배경 자료`;
}

function renderSaved() {
  if (!hasActiveRoleSelection()) {
    elements.savedGuidance.innerHTML = `
      <h3>직무 선택 후 내 커리큘럼이 생성됩니다</h3>
      <p>선택 직무 상세, 부족 역량, 주차별 과제, 추천 교육자료, 회사 공고 대조표가 내 커리큘럼으로 정리됩니다.</p>
    `;
    elements.savedList.innerHTML = `<div class="empty-state">직무 탭에서 세부 직무를 선택하세요.</div>`;
    return;
  }

  const track = getSelectedTrack();
  const tasks = getVisibleRoadmapTasks(track.id);
  const context = getRecommendationContext(track, getGapSkills(track.id), tasks);
  const items = getSavedResources();
  const resourceUseCounts = new Map();

  renderSavedGuidance(items, tasks, context);
  elements.savedList.innerHTML = `
    <div class="plan-roadmap">
      ${tasks.map((task) => {
        const stepId = getRoadmapStepId(track.id, task);
        const completed = state.completedRoadmap.includes(stepId);
        const linkedResources = getRoadmapResourcesForTask(track, task, context, resourceUseCounts);
        linkedResources.forEach((resource) => {
          resourceUseCounts.set(resource.id, (resourceUseCounts.get(resource.id) || 0) + 1);
        });
        return `
          <article class="plan-week-card ${completed ? "is-completed" : ""}">
            <div class="plan-week-head">
              <span class="week-number">${task.weekLabel}</span>
              <button class="resource-action ${completed ? "is-saved" : ""}" type="button" data-roadmap-step-id="${stepId}">
                ${completed ? "완료됨" : "완료 체크"}
              </button>
            </div>
            <h3>${task.title}</h3>
            <p>${task.objective}</p>
            <div class="task-meta">
              ${task.phase ? `<span class="badge">${task.phase}</span>` : ""}
              <span class="badge">${task.deliverable}</span>
            </div>
            <div class="plan-resource-list">
              ${linkedResources.length
                ? linkedResources.map((resource) => renderPlanResourceItem(resource, task, context)).join("")
                : renderRoadmapResourceEmptyState(task)}
            </div>
          </article>
        `;
      }).join("")}
    </div>
    ${items.length ? `
      <section class="plan-selected-resources">
        <div class="section-heading compact">
          <div>
            <p class="eyebrow">내가 고른 교육</p>
            <h3>내 커리큘럼에 추가한 교육</h3>
          </div>
        </div>
        ${items.map((resource) => renderResourceCard(resource, null, null, true)).join("")}
      </section>
    ` : `<div class="empty-state">추가한 교육자료가 없어도 위 추천 커리큘럼으로 바로 시작할 수 있습니다. 교육 선택 화면에서 필요한 자료만 내 커리큘럼에 추가하세요.</div>`}
  `;
  elements.savedList.querySelectorAll("[data-roadmap-step-id]").forEach((button) => {
    button.addEventListener("click", () => {
      toggleListValue("completedRoadmap", button.dataset.roadmapStepId);
      saveState();
      renderSaved();
      renderRoadmap();
    });
  });
  bindResourceActions(elements.savedList);
}

function renderPlanResourceItem(resource, task, context) {
  const saved = state.saved.includes(resource.id);
  const signals = getTaskResourceSignals(resource, task, context).slice(0, 2);
  const connectionReason = getTaskResourceConnectionReason(resource, task, context);
  const coreLabel = resource.starterPack ? "필수 Starter Pack · " : resource.core ? "핵심 교육 · " : "";
  return `
    <details class="plan-resource-item">
      <summary>
        <span>
          <strong>${resource.title}</strong>
          <em>${coreLabel}${resource.provider} · ${resource.type} · ${resource.language} · ${formatMinutes(resource.totalMinutes)}</em>
        </span>
      </summary>
      <div class="plan-resource-detail">
        <div class="education-info-row"><strong>교육 소개</strong><span>${getResourceIntroText(resource)}</span></div>
        <div class="education-info-row"><strong>다루는 역량</strong><span>${getResourceSkillSummary(resource)}</span></div>
        ${renderResourceSectionsRow(resource)}
        <div class="education-info-row"><strong>추천 이유</strong><span>${connectionReason}</span></div>
        <div class="education-info-row is-opinion"><strong>추천 의견</strong><span>${getExpertResourceReview(resource, context, task)}</span></div>
        <div class="education-info-row"><strong>연결 신호</strong><span>${signals.join(" · ") || `${task.deliverable}에 연결되는 자료입니다.`}</span></div>
        <div class="education-info-row"><strong>산출물</strong><span>${resource.expectedOutput}</span></div>
        <div class="roadmap-resource-actions">
          <a class="resource-action" href="${resource.url}" target="_blank" rel="noreferrer">${getResourceOpenLabel(resource)}</a>
          ${renderCompleteActionButton(resource)}
        </div>
      </div>
    </details>
  `;
}

function getTodayStartResourceFit(resource, task, context, comparison) {
  const taskScore = getTaskResourceScore(resource, task, context, new Map());
  const educationScore = getEducationResourceScore(resource, context);
  const postingMatches = getPostingResourceMatches(resource, comparison);
  const roleDirectMatch = getRoleLinkedResourceIds(context.role).includes(resource.id) ? 1 : 0;
  const gapMatches = getResourceGapMatches(resource, context);
  const acquiredMatches = getResourceAcquiredMatches(resource, context);
  const competencyRepairTask = isCompetencyRepairTask(task);
  const keywordPostingMatches = postingMatches.filter((item) => item.category === "직무 키워드").length;
  const corePostingMatches = postingMatches.filter((item) => item.priority === "core").length;
  const supportPostingMatches = Math.max(0, postingMatches.length - corePostingMatches);
  const postingWeight = competencyRepairTask
    ? { keyword: 35, core: 20, support: 8 }
    : { keyword: 140, core: 70, support: 24 };
  const postingScore = keywordPostingMatches * postingWeight.keyword
    + corePostingMatches * postingWeight.core
    + supportPostingMatches * postingWeight.support;
  const acquiredOnlyPenalty = context.gapSkills.length && acquiredMatches.length && !gapMatches.length && !postingMatches.length ? 180 : 0;
  const completedPenalty = state.completed.includes(resource.id) ? 900 : 0;
  const trustedStarterScore = (resource.starterPack ? 280 : 0) + (resource.core ? 220 : 0);

  const score = taskScore
    + educationScore * 0.32
    + postingScore
    + roleDirectMatch * 80
    + gapMatches.length * (competencyRepairTask ? 35 : 18)
    + trustedStarterScore
    - acquiredOnlyPenalty
    - completedPenalty;

  return {
    score,
    evidence: getTodayStartEvidenceItems(resource, task, context, {
      postingMatches,
      roleDirectMatch,
      gapMatches,
      acquiredMatches,
      competencyRepairTask
    })
  };
}

function getTodayStartEvidenceItems(resource, task, context, details) {
  const evidence = [];
  const postingTerms = uniqueRoleTerms(details.postingMatches.flatMap((item) => item.matchedTerms))
    .filter(isPostingResourceMatchTerm);

  if (postingTerms.length) {
    evidence.push({ label: "공고 신호", value: postingTerms.slice(0, 3).join(", ") });
  }
  if (details.gapMatches.length) {
    evidence.push({ label: "보완 역량", value: details.gapMatches.slice(0, 3).join(", ") });
  }
  if (details.acquiredMatches.length) {
    evidence.push({ label: "체크 반영", value: `${details.acquiredMatches.slice(0, 2).join(", ")} 완료 반영` });
  }
  if (details.roleDirectMatch) {
    evidence.push({ label: "직무 연결", value: "선택 직무 직접 자료" });
  }
  if (resource.starterPack || resource.core) {
    evidence.push({ label: "자료 신뢰", value: resource.starterPack ? "필수 Starter Pack" : "핵심 교육" });
  }
  if (details.competencyRepairTask && details.gapMatches.length) {
    evidence.push({ label: "오늘 순서", value: "미체크 역량 먼저 보완" });
  }

  return evidence.length
    ? evidence.slice(0, 5)
    : [{ label: "오늘 순서", value: task.deliverable }];
}

function isCompetencyRepairTask(task) {
  const text = getTaskSearchText(task);
  return /핵심\s*역량\s*보완|미체크|보완|기초|개념/.test(text)
    && !/산출물\s*작성/.test(task.title || "");
}

function getPostingResourceMatches(resource, comparison) {
  if (!comparison?.hasText) return [];
  const resourceText = getResourceSearchText(resource);
  const normalizedResourceText = normalizePostingText(resourceText);
  const compactResourceText = compactPostingTextValue(resourceText);

  return comparison.matched
    .map((item) => {
      const matchedTerms = uniqueRoleTerms([item.label, ...item.matchedTerms])
        .filter(isPostingResourceMatchTerm)
        .filter((term) => postingTextHasTerm(normalizedResourceText, compactResourceText, term));
      return matchedTerms.length ? { ...item, matchedTerms } : null;
    })
    .filter(Boolean);
}

function isPostingResourceMatchTerm(term) {
  const cleanTerm = cleanRoleTerm(term);
  if (cleanTerm.length < 2) return false;
  if (/^[a-z0-9+#&./-]{1,2}$/i.test(cleanTerm)) return false;
  if (postingComparisonStopwords.has(cleanTerm.toLowerCase())) return false;
  return !roleTermStopWords.has(cleanTerm);
}

function getTodayStartAction(context, tasks) {
  const task = tasks.find((item) => !state.completedRoadmap.includes(getRoadmapStepId(context.track.id, item))) || tasks[0];
  if (!task) return null;

  const resourcesForTask = getRoadmapResourcesForTask(context.track, task, context, new Map());
  const fallbackResources = getRecommendedResources(context.track, context);
  const comparison = getPostingComparison(context, tasks);
  const rankedResources = uniqueResources([...resourcesForTask, ...fallbackResources])
    .map((resource) => {
      const fit = getTodayStartResourceFit(resource, task, context, comparison);
      return { resource, score: fit.score, evidence: fit.evidence };
    })
    .sort((a, b) => {
      const completedDiff = Number(state.completed.includes(a.resource.id)) - Number(state.completed.includes(b.resource.id));
      if (completedDiff !== 0) return completedDiff;
      const scoreDiff = b.score - a.score;
      if (scoreDiff !== 0) return scoreDiff;
      const trustDiff = getRecommendationTrustRank(b.resource) - getRecommendationTrustRank(a.resource);
      if (trustDiff !== 0) return trustDiff;
      return sortResourcesForLearning(a.resource, b.resource, context);
    });
  const selected = rankedResources[0] || null;
  const resource = selected?.resource || null;

  return {
    task,
    resource,
    evidence: selected?.evidence || [],
    reason: resource
      ? getTaskResourceConnectionReason(resource, task, context)
      : task.priorityReason || "첫 산출물을 만들기 위한 최소 실행 과제입니다."
  };
}

function renderTodayStartPanel(context, tasks) {
  const action = getTodayStartAction(context, tasks);
  if (!action) return "";

  const { task, resource, reason, evidence } = action;
  const stepId = getRoadmapStepId(context.track.id, task);
  const taskCompleted = state.completedRoadmap.includes(stepId);
  const actionLabel = taskCompleted ? "다시 확인할 1개" : "오늘 시작할 1개";

  return `
    <section class="today-action-panel" aria-label="${actionLabel}">
      <div class="today-action-main">
        <p class="eyebrow">${actionLabel}</p>
        <h3>${task.title}</h3>
        <p>${task.objective}</p>
        <div class="today-action-meta">
          <span class="badge">${task.weekLabel || "첫 단계"}</span>
          <span class="badge">산출물: ${task.deliverable}</span>
        </div>
      </div>
      <div class="today-action-resource">
        <strong>${resource ? resource.title : "공고 문장과 첫 과제 비교"}</strong>
        <span>${resource ? `${resource.provider} · ${resource.language} · ${formatMinutes(resource.totalMinutes)}` : "지원 회사 공고에서 업무·자격요건·우대사항 문장을 먼저 표시하세요."}</span>
        <em>${reason}</em>
        ${renderTodayStartEvidence(evidence)}
        <div class="today-action-actions">
          ${resource ? `<a class="resource-action" href="${resource.url}" target="_blank" rel="noreferrer">${getResourceOpenLabel(resource)}</a>` : ""}
          ${resource ? renderSaveActionButton(resource, state.saved.includes(resource.id) ? "추가됨 · 제거" : "내 커리큘럼에 추가") : `<button class="ghost-button" type="button" data-view-target="saved">공고 대조로 이동</button>`}
        </div>
      </div>
    </section>
  `;
}

function renderTodayStartEvidence(evidence) {
  if (!evidence?.length) return "";
  return `
    <div class="today-action-evidence" aria-label="추천 근거">
      ${evidence.map((item) => `
        <span>
          <strong>${escapeHtml(item.label)}</strong>
          ${escapeHtml(item.value)}
        </span>
      `).join("")}
    </div>
  `;
}

function renderPostingComparePanel(context, tasks) {
  return `
    <section class="posting-compare-panel" aria-label="회사 공고 붙여넣기 대조">
      <div class="posting-compare-head">
        <div>
          <p class="eyebrow">회사 공고 붙여넣기 대조</p>
          <h3>실제 공고 문장과 직무·교육 추천 기준을 비교합니다</h3>
          <p>지원할 공고의 업무, 자격요건, 우대사항 본문을 붙여넣으면 앱의 일반 직무 기준과 겹치는 신호와 추가 확인할 표현을 나눠 보여줍니다.</p>
        </div>
        <span class="badge">${context.role?.title || context.track.title}</span>
      </div>
      <label class="posting-input-label">
        <span>공고 원문</span>
        <textarea data-posting-input maxlength="8000" rows="7" placeholder="예: 담당업무, 자격요건, 우대사항 문장을 그대로 붙여넣으세요.">${escapeHtml(getPostingText())}</textarea>
      </label>
      <div class="posting-comparison-result" data-posting-result>
        ${renderPostingComparisonResult(context, tasks)}
      </div>
    </section>
  `;
}

function renderPostingComparisonPanel() {
  const target = document.querySelector("[data-posting-result]");
  if (!target || !hasActiveRoleSelection()) return;
  const track = getSelectedTrack();
  const tasks = getVisibleRoadmapTasks(track.id);
  const context = getRecommendationContext(track, getGapSkills(track.id), tasks);
  target.innerHTML = renderPostingComparisonResult(context, tasks);
}

function renderPostingComparisonResult(context, tasks) {
  const comparison = getPostingComparison(context, tasks);
  if (!comparison.hasText) {
    return `<div class="empty-state compact">공고 원문을 붙여넣으면 선택 직무 기준, 추천 교육 역량, 첫 산출물과 겹치는 표현이 표시됩니다.</div>`;
  }

  const fitLabel = comparison.score >= 70 ? "겹침 높음" : comparison.score >= 40 ? "부분 겹침" : "추가 확인 필요";
  return `
    <div class="posting-score-strip" aria-label="공고 대조 요약">
      <div><strong>${comparison.score}%</strong><span>${fitLabel}</span></div>
      <div><strong>${comparison.matched.length}</strong><span>공고에서 확인</span></div>
      <div><strong>${comparison.missing.length}</strong><span>공고에서 미확인</span></div>
      <div><strong>${comparison.postingOnlyTerms.length}</strong><span>추가 표현</span></div>
    </div>
    <div class="posting-result-grid">
      <div class="posting-result-block">
        <h4>공고에서 바로 보이는 신호</h4>
        ${renderPostingComparisonRows(comparison.matched.slice(0, 7), "아직 앱 기준과 직접 겹치는 표현을 찾지 못했습니다. 공고 문장을 더 붙여넣거나 세부 직무가 맞는지 확인하세요.")}
      </div>
      <div class="posting-result-block">
        <h4>지원 전 확인·보완할 기준</h4>
        ${renderPostingComparisonRows(comparison.missing.slice(0, 7), "주요 앱 기준이 대부분 공고에 보입니다. 이제 산출물과 면접 설명을 준비하세요.")}
      </div>
    </div>
    ${comparison.postingOnlyTerms.length ? `
      <div class="posting-extra-terms">
        <strong>공고에 추가로 반복되는 표현</strong>
        <span>${comparison.postingOnlyTerms.map((term) => `<em>${escapeHtml(term.term)}</em>`).join("")}</span>
        <p>앱의 일반 직무 기준에는 약하게 잡힌 회사별 표현일 수 있습니다. 반복되는 표현은 오늘 산출물과 자기소개서 근거에 우선 반영하세요.</p>
      </div>
    ` : ""}
  `;
}

function renderPostingComparisonRows(items, emptyText) {
  if (!items.length) return `<div class="empty-state compact">${emptyText}</div>`;
  return `
    <div class="posting-match-list">
      ${items.map((item) => `
        <div class="posting-match-row">
          <span>${escapeHtml(item.category)}</span>
          <strong>${escapeHtml(item.label)}</strong>
          <em>${item.matchedTerms.length ? `확인 표현: ${item.matchedTerms.map(escapeHtml).join(", ")}` : "공고에서 직접 표현 미확인"}</em>
        </div>
      `).join("")}
    </div>
  `;
}

function getPostingComparison(context, tasks) {
  const postingText = getPostingText();
  const normalizedPostingText = normalizePostingText(postingText);
  const compactPostingText = compactPostingTextValue(postingText);
  const criteria = buildPostingComparisonCriteria(context, tasks);
  const checkedCriteria = criteria.map((item) => {
    const matchedTerms = item.terms.filter((term) => postingTextHasTerm(normalizedPostingText, compactPostingText, term));
    return { ...item, matchedTerms };
  });
  const matched = checkedCriteria.filter((item) => item.matchedTerms.length >= item.minMatches);
  const missing = checkedCriteria.filter((item) => item.matchedTerms.length < item.minMatches);
  const scoreBase = checkedCriteria.filter((item) => item.priority === "core");
  const scoreItems = scoreBase.length ? scoreBase : checkedCriteria;
  const score = scoreItems.length
    ? Math.round((scoreItems.filter((item) => item.matchedTerms.length >= item.minMatches).length / scoreItems.length) * 100)
    : 0;

  return {
    hasText: Boolean(normalizedPostingText),
    postingText,
    criteria: checkedCriteria,
    matched,
    missing,
    postingOnlyTerms: normalizedPostingText ? getPostingOnlyTerms(postingText, checkedCriteria) : [],
    score
  };
}

function buildPostingComparisonCriteria(context, tasks) {
  const role = context.role;
  if (!role) return [];
  const criteria = [];
  const seen = new Set();
  const addCriterion = (category, label, terms, priority = "support") => {
    const cleanLabel = String(label || "").trim();
    const cleanTerms = getPostingCriterionTerms(cleanLabel, terms);
    const key = `${category}:${cleanLabel}`;
    if (!cleanLabel || !cleanTerms.length || seen.has(key)) return;
    seen.add(key);
    criteria.push({
      category,
      label: cleanLabel,
      terms: cleanTerms,
      priority,
      minMatches: category === "직무 키워드" || cleanTerms.length <= 2 ? 1 : 2
    });
  };

  (role.postingKeywords || []).slice(0, 10).forEach((keyword) => addCriterion("직무 키워드", keyword, [keyword], "core"));
  (role.responsibilities || []).slice(0, 5).forEach((item) => addCriterion("반복 업무", item, [item], "core"));
  (role.requirements || []).slice(0, 5).forEach((item) => addCriterion("자격요건", item, [item], "core"));
  (role.preferred || []).slice(0, 4).forEach((item) => addCriterion("우대·차별화", item, [item], "support"));
  getRoleArtifactExamples(context.track, role).slice(0, 4).forEach((item) => addCriterion("준비 산출물", item, [item], "support"));
  tasks.slice(0, 3).forEach((task) => addCriterion("커리큘럼 과제", task.deliverable, [task.title, task.deliverable, ...(task.steps || [])], "support"));
  getRecommendedResources(context.track, context).slice(0, 5).forEach((resource) => {
    (resource.skills || []).slice(0, 2).forEach((skill) => addCriterion("교육 연결 역량", skill, [skill, resource.title, resource.expectedOutput], "support"));
  });

  return criteria;
}

function getPostingCriterionTerms(label, terms) {
  const baseTerms = uniqueRoleTerms([
    label,
    ...(terms || []),
    ...extractRoleTerms([label, ...(terms || [])]),
    ...(terms || []).flatMap(splitRoleToolTerm)
  ]);
  return uniqueRoleTerms([
    ...baseTerms,
    ...baseTerms.flatMap(getPostingTermVariants)
  ])
    .map((term) => cleanRoleTerm(term))
    .filter((term) => term.length >= 2)
    .slice(0, 10);
}

function getPostingOnlyTerms(postingText, criteria) {
  const appTermKeys = new Set(criteria.flatMap((item) => item.terms).map(getRoleTermKey));
  const counts = new Map();
  String(postingText || "")
    .normalize("NFKC")
    .split(/[^0-9A-Za-z가-힣+#&./-]+/g)
    .map((term) => cleanRoleTerm(term))
    .filter((term) => term.length >= 2)
    .filter((term) => !roleTermStopWords.has(term))
    .filter((term) => !postingComparisonStopwords.has(term.toLowerCase()))
    .forEach((term) => {
      const key = getRoleTermKey(term);
      if (!key || appTermKeys.has(key)) return;
      counts.set(key, { term, count: (counts.get(key)?.count || 0) + 1 });
    });

  return [...counts.values()]
    .filter((item) => item.count >= 2 || /[A-Za-z+#&./-]/.test(item.term))
    .sort((a, b) => b.count - a.count || b.term.length - a.term.length)
    .slice(0, 8);
}

function getPostingText() {
  return typeof state.postingText === "string" ? state.postingText : "";
}

function normalizePostingText(value) {
  return String(value || "")
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[|()[\]{}"'`,;:]/g, " ")
    .replace(/[·ㆍ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function compactPostingTextValue(value) {
  return normalizePostingText(value).replace(/[\s/_-]+/g, "");
}

function postingTextHasTerm(normalizedText, compactText, term) {
  return getPostingTermVariants(term).some((variant) => {
    const normalizedTerm = normalizePostingText(variant);
    if (normalizedTerm.length < 2) return false;
    if (normalizedText.includes(normalizedTerm)) return true;
    const compactTerm = compactPostingTextValue(variant);
    return compactTerm.length >= 2 && compactText.includes(compactTerm);
  });
}

function getPostingTermVariants(term) {
  const cleanTerm = cleanRoleTerm(term);
  const key = getRoleTermKey(cleanTerm);
  const matchedGroup = postingTermSynonymGroups.find((group) => (
    group.some((candidate) => getRoleTermKey(candidate) === key)
  ));
  return uniqueRoleTerms([cleanTerm, ...(matchedGroup || [])]);
}

const postingTermSynonymGroups = [
  ["예지보전", "predictive maintenance", "condition monitoring", "상태기반정비"],
  ["이상탐지", "anomaly detection", "fault detection", "이상 감지"],
  ["센서데이터", "sensor data", "센서 데이터"],
  ["시계열", "time series", "timeseries"],
  ["정비이력", "maintenance history", "maintenance log", "보전 이력"],
  ["공정데이터", "process data", "공정 데이터"],
  ["대시보드", "dashboard", "BI", "Power BI", "Tableau", "Spotfire"],
  ["파레토", "Pareto"],
  ["PCB Layout", "PCB 레이아웃", "PCB 배치"],
  ["Stack-up", "stackup", "적층", "PCB 적층"],
  ["리턴패스", "return path"],
  ["디커플링", "decoupling", "decoupling capacitor"],
  ["신호 무결성", "signal integrity", "SI"],
  ["전원 무결성", "power integrity", "PI"],
  ["HIL", "hardware in the loop", "hardware-in-the-loop"],
  ["SIL", "software in the loop", "software-in-the-loop"],
  ["MIL", "model in the loop", "model-in-the-loop"],
  ["Test Case", "test cases", "테스트케이스", "시험 케이스"],
  ["요구사항검증", "requirements validation", "requirement verification", "requirements verification"],
  ["Etch", "etching", "식각"],
  ["Plasma", "플라즈마"],
  ["RF power", "RF 파워"],
  ["Selectivity", "선택비"],
  ["Recipe", "레시피"],
  ["Wafer map", "wafermap", "웨이퍼맵"],
  ["PSM", "process safety management"],
  ["HAZOP", "hazard and operability", "hazard operability"],
  ["MSDS", "SDS", "material safety data sheet"],
  ["Risk Assessment", "hazard assessment", "위험성 평가", "위험평가"],
  ["공정안전", "process safety"],
  ["환경안전", "EHS", "HSE"],
  ["SPC", "statistical process control"],
  ["Cpk", "공정능력", "process capability"],
  ["FMEA", "failure mode and effects analysis"],
  ["8D", "eight disciplines", "8 disciplines"],
  ["ISO/IATF", "IATF 16949", "ISO 9001"],
  ["전극공정", "electrode process", "electrode manufacturing"],
  ["슬러리", "slurry"],
  ["믹싱", "mixing", "혼합", "slurry mixing", "슬러리 혼합"],
  ["코팅", "coating"],
  ["건조", "drying", "dryer"],
  ["캘린더링", "calendering", "calender"],
  ["조립", "assembly"],
  ["수율", "yield"],
  ["Scale-up", "scale up", "스케일업"],
  ["열관리", "thermal management"],
  ["냉각회로", "coolant loop", "cooling loop", "cooling circuit"],
  ["HVAC", "공조", "냉난방"],
  ["배터리온도", "battery thermal", "battery temperature", "battery temp", "배터리 열관리"],
  ["CFD", "computational fluid dynamics", "유동해석"],
  ["전력전자", "power electronics"],
  ["인버터", "inverter"],
  ["OBC", "on-board charger", "on board charger", "온보드차저"],
  ["DC-DC", "DCDC", "DC DC", "DC-DC converter", "컨버터", "converter"],
  ["게이트드라이브", "gate driver", "gate drive", "gate-drive", "gate driving"],
  ["EMI", "electromagnetic interference"],
  ["EMC", "electromagnetic compatibility"],
  ["Thermal", "열", "열해석"]
];

const postingComparisonStopwords = new Set([
  "담당업무", "주요업무", "자격요건", "우대사항", "필수", "우대", "관련", "경험", "보유",
  "이상", "이하", "가능", "역량", "직무", "업무", "프로젝트", "사용", "활용", "기반",
  "작성", "운영", "관리", "지원", "개발", "개선", "수행", "검토", "분석", "설계"
]);

function renderSavedGuidance(items, tasks, context = null) {
  if (!elements.savedGuidance) return;
  const currentContext = context || getRecommendationContext(getSelectedTrack(), getGapSkills(getSelectedTrack().id), tasks);
  const track = currentContext.track;
  const completedCount = items.filter((resource) => state.completed.includes(resource.id)).length;
  const totalMinutes = items.reduce((sum, resource) => sum + resource.totalMinutes, 0);
  const pendingCount = Math.max(items.length - completedCount, 0);
  const completedWeeks = tasks
    .map((task) => getRoadmapStepId(track.id, task))
    .filter((stepId) => state.completedRoadmap.includes(stepId)).length;
  const durationStrategy = getDurationStrategy();

  elements.savedGuidance.innerHTML = `
    <h3>내 커리큘럼에서 실제 실행 순서를 확인합니다</h3>
    <p>교육 선택에서 고른 자료와 추천된 주차별 과제를 한 화면에 모았습니다. 자료를 직접 고르지 않아도 ${durationStrategy.label} 기준으로 시작할 수 있고, 추가한 교육은 각 주차 추천에 우선 반영됩니다.</p>
    ${renderTodayStartPanel(currentContext, tasks)}
    <div class="badge-row">
      <span class="badge">커리큘럼 주차: ${tasks.length}개</span>
      <span class="badge">완료 주차: ${completedWeeks}/${tasks.length}</span>
      <span class="badge">내가 고른 교육: ${items.length}개</span>
      <span class="badge">${durationStrategy.resourceRule}</span>
      <span class="badge">완료: ${completedCount}개</span>
      <span class="badge">진행: ${pendingCount}개</span>
      <span class="badge">총 학습량: ${formatMinutes(totalMinutes)}</span>
    </div>
    ${renderPostingComparePanel(currentContext, tasks)}
  `;
  bindResourceActions(elements.savedGuidance);
}

function renderResourceCard(resource, context = null, priorityIndex = null, showCompletionAction = !context) {
  const saved = state.saved.includes(resource.id);
  const completed = state.completed.includes(resource.id);
  const prerequisites = resource.prerequisites.length ? resource.prerequisites.join(", ") : "없음";
  const signals = context ? getEducationResourceSignals(resource, context) : [];
  const linkedTasks = context ? getResourceLinkedTasks(resource.id, context.visibleTasks) : [];
  const priority = signals.length > 0 || priorityIndex !== null;
  const recommendationScore = context ? Math.round(getEducationResourceScore(resource, context)) : null;
  return `
    <article class="resource-card ${completed ? "is-completed" : ""} ${priority ? "is-priority" : ""}">
      ${priorityIndex !== null ? `
        <div class="resource-rank-band">
          <span>추천 ${priorityIndex + 1}순위</span>
          <strong>${recommendationScore}점</strong>
        </div>
      ` : ""}
      <div class="resource-meta">
        ${resource.provider === "MathWorks" ? `<span class="badge">MathWorks 역량</span>` : ""}
        ${priority && priorityIndex === null ? `<span class="badge">커리큘럼 추천</span>` : ""}
        ${resource.starterPack ? `<span class="badge">필수 Starter Pack</span>` : ""}
        <span class="badge">추천 ${resource.sequenceLevel}단계</span>
        <span class="badge">${resource.provider}</span>
        <span class="badge">자료 형식: ${resource.type}</span>
        <span class="badge">언어: ${resource.language}</span>
        <span class="badge">${resource.difficulty}</span>
        <span class="badge">총 ${formatMinutes(resource.totalMinutes)}</span>
        <span class="badge">${formatQualityStatus(resource.qualityStatus)}</span>
      </div>
      <h3>${resource.title}</h3>
      <p>${resource.reason}</p>
      ${linkedTasks.length ? `<p><strong>연결 과제:</strong> ${linkedTasks.join(", ")}</p>` : ""}
      ${signals.length ? `<div class="recommendation-note">${signals.join(" · ")}</div>` : ""}
      ${context ? `<div class="recommendation-note is-review"><strong>추천 의견</strong><span>${getExpertResourceReview(resource, context)}</span></div>` : ""}
      <div class="resource-learning-meta" aria-label="학습 정보">
        <span><strong>자료 형식</strong>${resource.type}</span>
        <span><strong>학습</strong>${formatMinutes(resource.estimatedMinutes)}</span>
        <span><strong>실습</strong>${formatMinutes(resource.practiceMinutes)}</span>
        <span><strong>선행</strong>${prerequisites}</span>
      </div>
      <p><strong>볼 단원/섹션:</strong> ${getResourceSectionSummary(resource)}</p>
      <p><strong>산출물:</strong> ${resource.expectedOutput}</p>
      <div class="resource-actions">
        <a class="resource-action" href="${resource.url}" target="_blank" rel="noreferrer">${getResourceOpenLabel(resource)}</a>
        ${showCompletionAction ? renderCompleteActionButton(resource) : renderSaveActionButton(resource)}
      </div>
    </article>
  `;
}

function getRecommendationContext(track, gapSkills, visibleTasks = null) {
  const goalKey = state.profile.goal || "foundation";
  return {
    track,
    role: getSelectedRole(track.id),
    gapSkills,
    acquiredSkills: getAcquiredSkills(track.id),
    goalKey,
    goal: learningGoals[goalKey] || learningGoals.foundation,
    durationWeeks: getDurationWeeks(),
    visibleTasks: visibleTasks || getVisibleRoadmapTasks(track.id)
  };
}

function getResourceSignals(resource, context) {
  const signals = [];
  const linkedTasks = getResourceLinkedTasks(resource.id, context.visibleTasks);
  const matchedGaps = getResourceGapMatches(resource, context);
  const matchedGoal = (resource.skills || []).filter((skill) => context.goal.prioritySkills.includes(skill));
  const matchedRoleKeywords = getRoleKeywordMatches(resource, context.role);
  const competencyFitSignal = getCompetencyFitSignal(resource, context);
  const goalFitSignal = getGoalFitSignal(resource, context);
  if (linkedTasks.length) signals.push(`커리큘럼 연결: ${linkedTasks.slice(0, 2).join(", ")}`);
  if (resource.starterPack) signals.push("필수 Starter Pack");
  else if (resource.core) signals.push("핵심 직무역량 교육");
  if (competencyFitSignal) signals.push(competencyFitSignal);
  if (goalFitSignal) signals.push(goalFitSignal);
  if (matchedGaps.length) signals.push(`역량 체크 보완: ${matchedGaps.slice(0, 3).join(", ")}`);
  if (matchedGoal.length) signals.push(`핵심역량 연결: ${matchedGoal.slice(0, 2).join(", ")}`);
  if (matchedRoleKeywords.length) signals.push(`세부 직무 키워드: ${matchedRoleKeywords.slice(0, 2).join(", ")}`);
  if (context.goalKey === "portfolio" && resource.practiceMinutes >= 60) signals.push("실습 산출물 우선");
  return signals;
}

function getResourcePriorityScore(resource, context) {
  const coreResource = resource.core ? 1 : 0;
  const roleOrderScore = getRoleResourceOrderScore(resource, context);
  const linkedTaskMatches = getResourceLinkedTasks(resource.id, context.visibleTasks).length;
  const gapMatches = getResourceGapMatches(resource, context).length;
  const goalMatches = (resource.skills || []).filter((skill) => context.goal.prioritySkills.includes(skill)).length;
  const roleKeywordMatches = getRoleKeywordMatches(resource, context.role).length;
  const difficultyMatch = context.goal.preferredDifficulties.includes(resource.difficulty) ? 1 : 0;
  const languageMatch = resource.languageCode === "ko" ? 1 : 0;
  const portfolioPractice = context.goalKey === "portfolio" && resource.practiceMinutes >= 60 ? 1 : 0;
  const shortDurationFit = context.durationWeeks <= 2 && resource.totalMinutes <= 180 ? 1 : 0;
  const competencyScore = getCompetencyFitScore(resource, context);
  const goalScore = getGoalResourceScore(resource, context);
  return coreResource * 80
    + roleOrderScore
    + linkedTaskMatches * 60
    + gapMatches * 40
    + goalMatches * 20
    + roleKeywordMatches * 14
    + difficultyMatch * 12
    + languageMatch * 6
    + portfolioPractice * 8
    + shortDurationFit * 10
    + competencyScore * 0.35
    + goalScore * 0.35;
}

function getRoleResourceOrderScore(resource, context) {
  const index = getRoleLinkedResourceIds(context.role).indexOf(resource.id);
  if (index < 0) return 0;
  return Math.max(20, 120 - index * 10);
}

function getResourceLinkedTasks(resourceId, visibleTasks = []) {
  const linkedTaskTitles = resourceTaskLinks[resourceId] || [];
  if (!visibleTasks.length) return linkedTaskTitles;

  const visibleTaskTitles = new Set(visibleTasks.flatMap((task) => [
    task.baseTitle,
    task.title
  ].filter(Boolean)));
  return linkedTaskTitles.filter((taskTitle) => visibleTaskTitles.has(taskTitle));
}

function getRoleKeywordMatches(resource, role) {
  if (!role) return [];
  const text = [
    resource.title,
    resource.reason,
    resource.expectedOutput,
    ...(resource.skills || [])
  ].join(" ").toLowerCase();
  return role.postingKeywords.filter((keyword) => text.includes(keyword.toLowerCase()));
}

function sortResourcesForLearning(a, b, context = null) {
  if (context) {
    const priorityDiff = getResourcePriorityScore(b, context) - getResourcePriorityScore(a, context);
    if (priorityDiff !== 0) return priorityDiff;
  }
  if (!!a.core !== !!b.core) return a.core ? -1 : 1;
  if (a.languageCode !== b.languageCode) return a.languageCode === "ko" ? -1 : 1;
  const sequenceDiff = a.sequenceLevel - b.sequenceLevel;
  if (sequenceDiff !== 0) return sequenceDiff;
  return a.totalMinutes - b.totalMinutes;
}

function formatMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (!hours) return `${rest}분`;
  if (!rest) return `${hours}시간`;
  return `${hours}시간 ${rest}분`;
}

function formatQualityStatus(status) {
  return {
    candidate: "후보",
    reviewed: "검토됨",
    verified: "검증됨",
    reviewNeeded: "재검토"
  }[status] || status;
}

function bindResourceActions(container) {
  container.querySelectorAll("[data-save-id]").forEach((button) => {
    button.addEventListener("click", () => {
      toggleListValue("saved", button.dataset.saveId);
      saveState();
      renderTracks();
      renderRoadmap();
      renderReferences();
      renderSaved();
      renderMetrics();
      renderWorkflowStatus();
      renderRoleContextBar();
    });
  });

  container.querySelectorAll("[data-complete-id]").forEach((button) => {
    button.addEventListener("click", () => {
      toggleListValue("completed", button.dataset.completeId);
      if (!state.saved.includes(button.dataset.completeId)) state.saved.push(button.dataset.completeId);
      saveState();
      renderTracks();
      renderRoadmap();
      renderReferences();
      renderSaved();
      renderMetrics();
      renderWorkflowStatus();
      renderRoleContextBar();
    });
  });
}

function toggleListValue(key, value) {
  state[key] = state[key].includes(value)
    ? state[key].filter((item) => item !== value)
    : [...state[key], value];
}

function renderMetrics() {
  if (!hasActiveRoleSelection()) {
    elements.selectedTrackMetric.textContent = "0";
    elements.diagnosticMetric.textContent = "0%";
    elements.savedMetric.textContent = "0";
    return;
  }

  const track = getSelectedTrack();
  elements.selectedTrackMetric.textContent = track ? "1" : "0";
  elements.diagnosticMetric.textContent = `${getDiagnosticScore(track.id)}%`;
  elements.savedMetric.textContent = `${getVisibleRoadmapTasks(track.id).length}주`;
}

function exportPlanAsExcel() {
  if (!hasActiveRoleSelection()) {
    elements.exportPlanButton.textContent = "직무 선택 필요";
    setTimeout(() => {
      elements.exportPlanButton.textContent = "엑셀 커리큘럼 다운로드";
    }, 1800);
    return;
  }

  try {
    const track = getSelectedTrack();
    const workbook = buildPlanExportWorkbook();
    const xml = buildExcelXml(workbook);
    const fileName = sanitizeFileName(`직무역량_내계획_${track.title}_${formatExportDate()}.xls`);
    downloadTextFile(fileName, xml, "application/vnd.ms-excel;charset=utf-8");
    elements.exportPlanButton.textContent = "내보내기 완료";
  } catch {
    elements.exportPlanButton.textContent = "내보내기 실패";
  }

  setTimeout(() => {
    elements.exportPlanButton.textContent = "엑셀 커리큘럼 다운로드";
  }, 1800);
}

function buildPlanExportWorkbook() {
  return [
    { name: "요약", rows: buildSummaryExportRows() },
    { name: "실행계획", rows: buildRoadmapExportRows() },
    { name: "선택직무상세", rows: buildRoleDetailExportRows() },
    { name: "회사공고대조", rows: buildCompanyPostingExportRows() },
    { name: "교육자료", rows: buildSavedResourceExportRows() },
    { name: "역량체크", rows: buildDiagnosisExportRows() }
  ];
}

function buildSummaryExportRows() {
  const track = getSelectedTrack();
  const role = getSelectedRole(track.id);
  const gapSkills = getGapSkills(track.id);
  const visibleTasks = getVisibleRoadmapTasks(track.id);
  const nextTask = getNextCurriculumTask(track.id);
  const context = getRecommendationContext(track, gapSkills, visibleTasks);
  const nextResource = getRecommendedResources(track, context)[0]?.title || "없음";
  const personaReview = getStudentPersonaReview(context);
  const expertReview = getExpertCurriculumReview(context, visibleTasks);
  const completedWeeks = visibleTasks
    .map((task) => getRoadmapStepId(track.id, task))
    .filter((stepId) => state.completedRoadmap.includes(stepId)).length;

  return [
    ["항목", "내용"],
    ["문서명", `${role?.title || track.title} 직무역량 내 커리큘럼`],
    ["내보낸 날짜", formatExportDate()],
    ["전공", getSelectLabel(elements.majorSelect)],
    ["관심 산업", getSelectLabel(elements.industrySelect)],
    ["준비 기간", getDurationLabel()],
    ["직무군", track.title],
    ["선택 직무", role?.title || "미선택"],
    ["직무 설명", role?.focus || track.summary],
    ["역량 확보율", `${getDiagnosticScore(track.id)}%`],
    ["보완 역량", gapSkills.slice(0, 8).join(", ") || "큰 공백 없음"],
    ["학생 페르소나", `${personaReview.title} - ${personaReview.body}`],
    ["직무 추천 의견", `${expertReview.title} - ${expertReview.body}`],
    ["다음 과제", `${nextTask.title} - ${nextTask.deliverable}`],
    ["다음 추천 교육자료", nextResource],
    ["완료 주차", `${completedWeeks}/${visibleTasks.length}`],
    ["추가 교육자료", `${state.saved.length}개`],
    ["완료 교육자료", `${state.completed.length}개`]
  ];
}

function buildCompanyPostingExportRows() {
  const track = getSelectedTrack();
  const role = getSelectedRole(track.id);
  if (!role) return [["구분", "앱 기준", "지원 회사 공고 문장", "준비 상태"], ["선택 직무", "미선택", "", ""]];
  const visibleTasks = getVisibleRoadmapTasks(track.id);
  const context = getRecommendationContext(track, getGapSkills(track.id), visibleTasks);
  const comparison = getPostingComparison(context, visibleTasks);

  const rows = [
    ["구분", "앱 기준", "지원 회사 공고 문장", "준비 상태"],
    ["안내", "이 커리큘럼은 일반적인 직무내용 기반 추천입니다. 지원 회사의 직무상세 내용과 다를 수 있으므로 반드시 실제 공고 문장을 붙여 넣고 비교하세요.", "", "필수 확인"],
    ["선택 직무", role.title, "", ""],
    ["직무 설명", role.focus, "", ""],
    ["전공 연결성", `${getMajorPathwayLabel(track, role)} - ${getMajorPathwayReason(track, role)}`, "", ""],
    ["붙여넣은 공고 원문", "내 커리큘럼 화면 입력값", comparison.postingText || "미입력", comparison.hasText ? `${comparison.score}% 겹침` : "공고 입력 필요"]
  ];

  if (comparison.hasText) {
    comparison.matched.slice(0, 12).forEach((item) => {
      rows.push([`공고 확인: ${item.category}`, item.label, item.matchedTerms.join(", "), "우선 준비"]);
    });
    comparison.missing.slice(0, 12).forEach((item) => {
      rows.push([`공고 미확인: ${item.category}`, item.label, "", "지원 전 확인"]);
    });
    comparison.postingOnlyTerms.forEach((item) => {
      rows.push(["공고 추가 표현", "회사별 특화 표현 후보", item.term, "산출물 반영 검토"]);
    });
  }

  role.responsibilities.forEach((item, index) => rows.push([`반복 업무 ${index + 1}`, item, "", "공고에 있으면 우선 준비"]));
  role.requirements.forEach((item, index) => rows.push([`자격조건 ${index + 1}`, item, "", "보유/보완 표시"]));
  role.preferred.forEach((item, index) => rows.push([`우대·차별화 ${index + 1}`, item, "", "해당 시 차별화 근거"]));
  getRoleArtifactExamples(track, role).forEach((item, index) => rows.push([`준비 산출물 ${index + 1}`, item, "", "제출 가능하게 정리"]));

  return rows;
}

function buildRoleDetailExportRows() {
  const track = getSelectedTrack();
  const role = getSelectedRole(track.id);
  if (!role) return [["구분", "내용"], ["선택 직무", "미선택"]];

  const rows = [
    ["구분", "내용"],
    ["직무군", track.title],
    ["선택 직무", role.title],
    ["직무 설명", role.focus],
    ["전공 연결성", `${getMajorPathwayLabel(track, role)} - ${getMajorPathwayReason(track, role)} ${getMajorPathwayFocus(track, role)}`],
    ["반복 키워드", role.postingKeywords.join(", ")]
  ];

  role.responsibilities.forEach((item, index) => rows.push([`채용공고 반복 업무 ${index + 1}`, item]));
  role.requirements.forEach((item, index) => rows.push([`자격조건·필수 역량 ${index + 1}`, item]));
  role.preferred.forEach((item, index) => rows.push([`우대·차별화 역량 ${index + 1}`, item]));
  const aiProfile = getRoleAiCompetencyProfile(role);
  if (aiProfile) {
    rows.push(["AI·데이터 활용 역량", `${aiProfile.level} - ${aiProfile.summary}`]);
    (aiProfile.keywords || []).forEach((item, index) => rows.push([`AI 관련 공고 표현 ${index + 1}`, item]));
    (aiProfile.diagnostics || []).forEach(([skill, question], index) => rows.push([`AI 준비 증거 ${index + 1}`, `${skill}: ${question}`]));
  }
  getRoleDecisionQuestions(track, role).forEach((item, index) => rows.push([`지원 전 확인 질문 ${index + 1}`, item]));
  return rows;
}

function buildSavedResourceExportRows() {
  const track = getSelectedTrack();
  const visibleTasks = getVisibleRoadmapTasks(track.id);
  const context = getRecommendationContext(track, getGapSkills(track.id), visibleTasks);
  const resourceUseCounts = new Map();
  const autoResources = visibleTasks.flatMap((task) => {
    const linkedResources = getRoadmapResourcesForTask(track, task, context, resourceUseCounts);
    linkedResources.forEach((resource) => {
      resourceUseCounts.set(resource.id, (resourceUseCounts.get(resource.id) || 0) + 1);
    });
    return linkedResources.map((resource) => ({ resource, task }));
  });
  const plannedResources = uniqueResources([
    ...autoResources.map((item) => item.resource),
    ...getSavedResources()
  ]);
  const rows = [[
    "상태",
    "계획 반영",
    "교육자료",
    "제공처",
    "유형",
    "난이도",
    "언어",
    "총 시간",
    "학습",
    "실습",
    "선행",
    "볼 단원/섹션",
    "연결 과제",
    "산출물",
    "추천 의견",
    "URL"
  ]];

  if (!plannedResources.length) {
    rows.push(["교육자료가 없습니다.", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
    return rows;
  }

  plannedResources.forEach((resource) => {
    const linkedAutoTasks = autoResources
      .filter((item) => item.resource.id === resource.id)
      .map((item) => item.task.title);
    const saved = state.saved.includes(resource.id);
    rows.push([
      state.completed.includes(resource.id) ? "완료" : "진행",
      saved ? "사용자 추가" : "커리큘럼 추천",
      resource.title,
      resource.provider,
      resource.type,
      resource.difficulty,
      resource.language,
      formatMinutes(resource.totalMinutes),
      formatMinutes(resource.estimatedMinutes),
      formatMinutes(resource.practiceMinutes),
      resource.prerequisites.length ? resource.prerequisites.join(", ") : "없음",
      getResourceSectionSummary(resource),
      linkedAutoTasks.join(", ") || getResourceLinkedTasks(resource.id, visibleTasks).join(", ") || "직무 공통",
      resource.expectedOutput,
      getExpertResourceReview(resource, context),
      resource.url
    ]);
  });

  return rows;
}

function buildRoadmapExportRows() {
  const track = getSelectedTrack();
  const tasks = getVisibleRoadmapTasks(track.id);
  const context = getRecommendationContext(track, getGapSkills(track.id), tasks);
  const resourceUseCounts = new Map();
  const rows = [["주차", "단계", "과제", "해야 할 일", "완료 기준", "예상 시간", "남길 산출물", "추천 교육자료", "교육자료 URL", "상태"]];

  tasks.forEach((task) => {
    const linkedResources = getRoadmapResourcesForTask(track, task, context, resourceUseCounts);
    linkedResources.forEach((resource) => {
      resourceUseCounts.set(resource.id, (resourceUseCounts.get(resource.id) || 0) + 1);
    });
    rows.push([
      task.weekLabel,
      task.phase || "",
      task.title,
      task.objective,
      (task.rubric || []).join("\n"),
      task.time,
      task.deliverable,
      linkedResources.map((resource) => resource.title).join("\n"),
      linkedResources.map((resource) => resource.url).join("\n"),
      state.completedRoadmap.includes(getRoadmapStepId(track.id, task)) ? "완료" : "진행"
    ]);
  });

  return rows;
}

function buildDiagnosisExportRows() {
  const track = getSelectedTrack();
  const rows = [["출처", "역량", "역량 체크 문항", "체크 여부"]];
  getDiagnosticItems(track).forEach((item) => {
    rows.push([
      item.source,
      item.skill,
      item.question,
      state.checked[item.id] ? "체크됨" : "보완 필요"
    ]);
  });
  return rows;
}

function getSavedResources() {
  return resources
    .filter((resource) => state.saved.includes(resource.id))
    .sort((a, b) => sortResourcesForLearning(a, b));
}

function buildExcelXml(sheets) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:x="urn:schemas-microsoft-com:office:excel"
  xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
  xmlns:html="http://www.w3.org/TR/REC-html40">
  <Styles>
    <Style ss:ID="Default" ss:Name="Normal">
      <Alignment ss:Vertical="Top" ss:WrapText="1"/>
      <Font ss:FontName="맑은 고딕" ss:Size="12"/>
    </Style>
    <Style ss:ID="Header">
      <Alignment ss:Vertical="Center" ss:WrapText="1"/>
      <Font ss:FontName="맑은 고딕" ss:Size="12" ss:Bold="1" ss:Color="#FFFFFF"/>
      <Interior ss:Color="#061328" ss:Pattern="Solid"/>
    </Style>
  </Styles>
  ${sheets.map((sheet) => buildExcelWorksheet(sheet.name, sheet.rows)).join("\n")}
</Workbook>`;
}

function buildExcelWorksheet(name, rows) {
  const columnCount = Math.max(...rows.map((row) => row.length));
  const columns = Array.from({ length: columnCount }, () => `<Column ss:Width="160"/>`).join("");
  return `<Worksheet ss:Name="${escapeXml(name.slice(0, 31))}">
    <Table>
      ${columns}
      ${rows.map((row, rowIndex) => buildExcelRow(row, rowIndex === 0)).join("\n")}
    </Table>
  </Worksheet>`;
}

function buildExcelRow(row, isHeader) {
  return `<Row>${row.map((value) => buildExcelCell(value, isHeader)).join("")}</Row>`;
}

function buildExcelCell(value, isHeader) {
  const type = typeof value === "number" && Number.isFinite(value) ? "Number" : "String";
  return `<Cell ss:StyleID="${isHeader ? "Header" : "Default"}"><Data ss:Type="${type}">${escapeXml(value)}</Data></Cell>`;
}

function escapeXml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function downloadTextFile(fileName, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function sanitizeFileName(fileName) {
  return fileName.replace(/[\\/:*?"<>|]/g, "-").replace(/\s+/g, "_");
}

function formatExportDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getSelectLabel(select) {
  return select.options[select.selectedIndex]?.textContent || select.value;
}

function disableServiceWorkerCache() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations()
      .then((registrations) => Promise.all(registrations.map((registration) => registration.unregister())))
      .catch(() => {});
  }

  if ("caches" in window) {
    caches.keys()
      .then((keys) => Promise.all(keys
        .filter((key) => key.startsWith("career-competency"))
        .map((key) => caches.delete(key))))
      .catch(() => {});
  }
}
