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

class FakeStyle {
  constructor() {
    this.props = new Map();
  }

  setProperty(name, value) {
    this.props.set(name, String(value));
  }

  getPropertyValue(name) {
    return this.props.get(name) ?? this[name] ?? "";
  }

  removeProperty(name) {
    this.props.delete(name);
  }
}

function dataAttributeToDatasetKey(attribute) {
  return attribute.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

function selectorDatasetKey(selector) {
  const match = selector.match(/^\[data-([a-z0-9-]+)\]$/i);
  return match ? dataAttributeToDatasetKey(match[1]) : null;
}

function matchesSelector(element, selector) {
  if (selector.startsWith(".")) return element.classList.contains(selector.slice(1));
  const datasetKey = selectorDatasetKey(selector);
  if (datasetKey) return Object.prototype.hasOwnProperty.call(element.dataset, datasetKey);
  return false;
}

function getDescendants(element) {
  return element.children.flatMap((child) => [child, ...getDescendants(child)]);
}

function parsePixel(value, fallback = 0) {
  const numeric = Number.parseFloat(String(value || ""));
  return Number.isFinite(numeric) ? numeric : fallback;
}

class FakeElement {
  constructor(id = "") {
    this.id = id;
    this.tagName = String(id || "div").toUpperCase();
    this.value = "";
    this.textContent = "";
    this.innerHTML = "";
    this.dataset = {};
    this.style = new FakeStyle();
    this.checked = false;
    this.hidden = false;
    this.selectedIndex = 0;
    this.options = [{ textContent: "", value: "" }];
    this.children = [];
    this.parentElement = null;
    this.listeners = new Map();
    this.clientWidth = 0;
    this.clientHeight = 0;
    this.offsetWidth = 0;
    this.offsetHeight = 0;
    const classNames = new Set();
    this.classList = {
      add: (...names) => names.forEach((name) => classNames.add(name)),
      remove: (...names) => names.forEach((name) => classNames.delete(name)),
      toggle: (name, force) => {
        const shouldAdd = force ?? !classNames.has(name);
        if (shouldAdd) classNames.add(name);
        else classNames.delete(name);
        return shouldAdd;
      },
      contains: (name) => classNames.has(name),
      toString: () => [...classNames].join(" ")
    };
  }

  addEventListener(type, listener) {
    if (!this.listeners.has(type)) this.listeners.set(type, []);
    this.listeners.get(type).push(listener);
  }

  dispatchEvent(event) {
    const payload = typeof event === "string" ? { type: event, target: this } : { target: this, ...event };
    (this.listeners.get(payload.type) || []).forEach((listener) => listener(payload));
    return true;
  }

  appendChild(child) {
    child.parentElement = this;
    this.children.push(child);
    return child;
  }

  remove() {
    if (!this.parentElement) return;
    this.parentElement.children = this.parentElement.children.filter((child) => child !== this);
    this.parentElement = null;
  }

  click() {
    this.dispatchEvent({ type: "click", target: this });
  }

  focus() {}
  scrollIntoView(options) {
    this.scrolledIntoView = options || true;
  }

  scrollTo(options) {
    this.scrolledTo = options || true;
  }

  closest(selector) {
    let current = this;
    while (current) {
      if (matchesSelector(current, selector)) return current;
      current = current.parentElement;
    }
    return null;
  }

  querySelector(selector) {
    return this.querySelectorAll(selector)[0] || null;
  }

  querySelectorAll(selector) {
    return getDescendants(this).filter((element) => matchesSelector(element, selector));
  }

  setAttribute(name, value) {
    if (name.startsWith("data-")) {
      this.dataset[dataAttributeToDatasetKey(name.slice(5))] = String(value);
      return;
    }
    if (name === "class") {
      String(value).split(/\s+/).filter(Boolean).forEach((className) => this.classList.add(className));
      return;
    }
    this[name] = value;
  }

  getAttribute(name) {
    if (name.startsWith("data-")) return this.dataset[dataAttributeToDatasetKey(name.slice(5))] ?? null;
    return this[name] ?? null;
  }

  getBoundingClientRect() {
    const width = this.offsetWidth || this.clientWidth || parsePixel(this.style.width);
    const height = this.offsetHeight || this.clientHeight || parsePixel(this.style.height);
    const centerLeft = parsePixel(this.style.left, width / 2);
    const centerTop = parsePixel(this.style.top, height / 2);
    const isTerm = this.classList.contains("word-cloud-term");
    const left = isTerm ? centerLeft - width / 2 : parsePixel(this.style.left);
    const top = isTerm ? centerTop - height / 2 : parsePixel(this.style.top);
    return { left, top, right: left + width, bottom: top + height, width, height };
  }
}

const elementsById = new Map();
const getElement = (id) => {
  if (!elementsById.has(id)) elementsById.set(id, new FakeElement(id));
  return elementsById.get(id);
};
const documentListeners = new Map();
const windowListeners = new Map();
const queryResults = new Map();
const downloads = [];
const createdBlobs = [];

function addListener(registry, type, listener) {
  if (!registry.has(type)) registry.set(type, []);
  registry.get(type).push(listener);
}

function dispatchListeners(registry, type, event) {
  (registry.get(type) || []).forEach((listener) => listener({ type, ...event }));
}

const sandbox = {
  console,
  localStorage: {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
  },
  document: {
    addEventListener: (type, listener) => addListener(documentListeners, type, listener),
    getElementById: getElement,
    querySelector: (selector) => queryResults.get(selector) || null,
    querySelectorAll: () => [],
    createElement: (tagName) => {
      const element = new FakeElement(tagName);
      element.tagName = String(tagName).toUpperCase();
      if (String(tagName).toLowerCase() === "a") {
        element.click = () => {
          downloads.push({ href: element.href, download: element.download });
        };
      }
      return element;
    },
    body: new FakeElement("body"),
    __dispatch: (type, event) => dispatchListeners(documentListeners, type, event),
    __setQueryResult: (selector, element) => queryResults.set(selector, element)
  },
  window: {
    addEventListener: (type, listener) => addListener(windowListeners, type, listener),
    matchMedia: () => ({ matches: false }),
    confirm: () => true,
    __dispatch: (type, event) => dispatchListeners(windowListeners, type, event)
  },
  navigator: {},
  Blob: class {
    constructor(parts, options) {
      this.parts = parts;
      this.options = options;
    }
  },
  URL: {
    createObjectURL: (blob) => {
      createdBlobs.push(blob);
      return `blob:smoke-${createdBlobs.length}`;
    },
    revokeObjectURL: () => {}
  },
  __downloads: downloads,
  __createdBlobs: createdBlobs,
  setTimeout: (listener) => {
    if (typeof listener === "function") listener();
    return 0;
  },
  clearTimeout: () => {},
  requestAnimationFrame: (listener) => {
    if (typeof listener === "function") listener();
    return 1;
  },
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
  },
  runActionScenario() {
    const failures = [];
    const setActivePlan = () => {
      bindElements();
      state = {
        ...defaultState,
        selectedTrackId: "embedded-control",
        hasSelectedRoleSelection: true,
        profile: {
          ...defaultState.profile,
          major: "electrical",
          industry: "mobility",
          durationWeeks: "4"
        },
        selectedRoles: { "embedded-control": "embedded-firmware-engineer" },
        checked: {},
        saved: [],
        completed: [],
        completedRoadmap: [],
        postingText: "MCU CAN UART firmware validation Simulink"
      };
      elements.majorSelect.value = state.profile.major;
      elements.majorSelect.options = [{ textContent: "Electrical Engineering", value: state.profile.major }];
      elements.industrySelect.value = state.profile.industry;
      elements.industrySelect.options = [{ textContent: "Mobility", value: state.profile.industry }];
      elements.durationSelect.value = state.profile.durationWeeks;
      elements.durationSelect.options = [{ textContent: "4 weeks", value: state.profile.durationWeeks }];
      elements.exportPlanButton.textContent = "Export";
    };

    setActivePlan();
    bindEvents();
    render();

    const roleResultPanel = document.createElement("div");
    roleResultPanel.classList.add("role-result-panel");
    roleResultPanel.appendChild(elements.selectedRoleOverview);
    focusSelectedRoleOverview();
    if (!roleResultPanel.scrolledTo && !elements.selectedRoleOverview.scrolledIntoView) {
      failures.push("selected role focus helper did not scroll the result panel");
    }

    const recommended = getCurrentRoadmapSelectionResources();
    if (!recommended.length) failures.push("expected roadmap resources for active role");

    const selectAllButton = document.createElement("button");
    selectAllButton.dataset.roadmapSelectAll = "";
    document.__dispatch("click", { target: selectAllButton });
    if (state.saved.length !== recommended.length) failures.push("select-all did not save every roadmap resource");

    const clearAllButton = document.createElement("button");
    clearAllButton.dataset.roadmapClearAll = "";
    document.__dispatch("click", { target: clearAllButton });
    if (state.saved.some((id) => recommended.some((resource) => resource.id === id))) {
      failures.push("clear-all did not remove roadmap resources");
    }

    const viewButton = document.createElement("button");
    viewButton.dataset.viewTarget = "saved";
    document.__dispatch("click", { target: viewButton });
    if (state.view !== "saved") failures.push("view-target click did not switch view");

    const postingResult = document.createElement("div");
    document.__setQueryResult("[data-posting-result]", postingResult);
    const postingInput = document.createElement("textarea");
    postingInput.dataset.postingInput = "";
    postingInput.value = "MCU firmware CAN UART timer interrupt validation";
    document.__dispatch("input", { target: postingInput });
    if (!postingResult.innerHTML.includes("posting-score-strip")) {
      failures.push("posting input did not render comparison result");
    }

    const track = getSelectedTrack();
    const tasks = getVisibleRoadmapTasks(track.id);
    const context = getRecommendationContext(track, getGapSkills(track.id), tasks);
    const resource = recommended[0];
    const resourceCard = renderResourceCard(resource, context, 0);
    if (!resourceCard.includes(resource.title) || !resourceCard.includes("data-save-id")) {
      failures.push("resource card did not include save action");
    }

    const actionContainer = document.createElement("div");
    const saveButton = document.createElement("button");
    saveButton.dataset.saveId = resource.id;
    const completeButton = document.createElement("button");
    completeButton.dataset.completeId = resource.id;
    actionContainer.appendChild(saveButton);
    actionContainer.appendChild(completeButton);
    bindResourceActions(actionContainer);
    saveButton.click();
    if (!state.saved.includes(resource.id)) failures.push("resource save action did not update state");
    completeButton.click();
    if (!state.completed.includes(resource.id)) failures.push("resource completion action did not update state");

    elements.clearSavedButton.click();
    if (state.saved.length || state.completed.length || state.completedRoadmap.length) {
      failures.push("clear saved action did not reset saved resource state");
    }

    const workbook = buildPlanExportWorkbook();
    if (workbook.length !== 6 || workbook.some((sheet) => !sheet.rows.length)) {
      failures.push("export workbook did not include every expected sheet");
    }
    const xml = buildExcelXml(workbook);
    if (!xml.includes("<Workbook") || !buildExcelCell("<tag & value>", false).includes("&lt;tag &amp; value&gt;")) {
      failures.push("excel XML generation or escaping failed");
    }
    exportPlanAsExcel();
    const downloadedBlob = globalThis.__createdBlobs[globalThis.__createdBlobs.length - 1];
    const downloadedText = downloadedBlob?.parts?.join("") || "";
    if (!globalThis.__downloads.length || !downloadedText.includes("<Workbook")) {
      failures.push("excel export did not trigger a workbook download");
    }

    elements.resetPlanButton.click();
    if (hasActiveRoleSelection()) failures.push("reset action did not clear active role selection");

    globalThis.__cacheDeletes = [];
    navigator.serviceWorker = {
      getRegistrations: () => Promise.resolve([
        { unregister: () => Promise.resolve(true) }
      ])
    };
    globalThis.caches = {
      keys: () => Promise.resolve(["career-competency-test", "unrelated-cache"]),
      delete: (key) => {
        globalThis.__cacheDeletes.push(key);
        return Promise.resolve(true);
      }
    };
    window.caches = globalThis.caches;
    disableServiceWorkerCache();

    return {
      failures,
      recommendedCount: recommended.length,
      workbookSheets: workbook.length,
      downloads: globalThis.__downloads.length
    };
  },
  runWordCloudScenario() {
    const failures = [];
    const container = document.createElement("div");
    container.classList.add("word-cloud-terms");
    container.clientWidth = 360;
    container.clientHeight = 220;
    container.offsetWidth = 360;
    container.offsetHeight = 220;

    const labels = ["Primary", "Control", "Signal", "Sensor", "CAN", "PID", "MCU", "Validation"];
    const terms = labels.map((label, index) => {
      const term = document.createElement("span");
      term.textContent = label;
      term.classList.add("word-cloud-term");
      if (index === 0) term.classList.add("is-primary");
      term.offsetWidth = index === 0 ? 92 : 48 + index * 4;
      term.offsetHeight = index === 0 ? 28 : 22;
      term.style.setProperty("--z", String(labels.length - index));
      container.appendChild(term);
      return term;
    });

    layoutWordCloud(container);
    const visibleTerms = terms.filter((term) => !term.hidden);
    if (!container.classList.contains("is-layout-ready")) failures.push("word cloud was not marked layout-ready");
    if (!visibleTerms.length || terms[0].hidden) failures.push("word cloud hid the primary term");
    if (terms[0].style.left === "50%" || terms[0].style.top === "50%") failures.push("primary term was not positioned");

    const outsideTerm = visibleTerms.find((term) => {
      const rect = term.getBoundingClientRect();
      return rect.left < 0 || rect.top < 0 || rect.right > container.clientWidth || rect.bottom > container.clientHeight;
    });
    if (outsideTerm) failures.push("word cloud placed a visible term outside the container");

    const fallbackTerm = document.createElement("span");
    fallbackTerm.offsetWidth = 24;
    fallbackTerm.offsetHeight = 16;
    const fallbackPosition = findFallbackCloudPosition(fallbackTerm, [], 160, 120, 12);
    if (!fallbackPosition) failures.push("word cloud fallback did not find an open position");

    return { failures, visibleTerms: visibleTerms.length };
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

const actionResult = sandbox.__renderSmoke.runActionScenario();
actionResult.failures.forEach((failure) => failures.push(`ui actions: ${failure}`));

const wordCloudResult = sandbox.__renderSmoke.runWordCloudScenario();
wordCloudResult.failures.forEach((failure) => failures.push(`word cloud: ${failure}`));

if (failures.length) {
  console.error("Render smoke failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  `Render smoke passed: ${scenarios.length} render scenarios, `
  + `${actionResult.recommendedCount} action resources, `
  + `${wordCloudResult.visibleTerms} word-cloud terms`
);
