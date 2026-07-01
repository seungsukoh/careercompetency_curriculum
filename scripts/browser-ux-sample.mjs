import fs from "node:fs";
import http from "node:http";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
let appUrl = normalizeAppUrl(process.env.UX_SAMPLE_URL || "");
const outputRoot = path.join(rootDir, "tmp", "browser-ux-samples");
const runId = `run-${process.pid}-${Date.now()}`;
const outputDir = path.join(outputRoot, runId);

const samples = [
  {
    id: "computer-embedded",
    label: "컴퓨터공학 -> 임베디드 펌웨어",
    major: "computer",
    industry: "mobility",
    expectedIndustryLabel: "자동차·모빌리티",
    trackId: "embedded-control",
    roleId: "embedded-firmware-engineer",
    roleTitle: "임베디드 펌웨어 엔지니어"
  },
  {
    id: "industrial-quality",
    label: "산업공학 -> 품질보증/품질관리",
    major: "industrial",
    industry: "manufacturing",
    expectedIndustryLabel: "제조·품질",
    trackId: "production-quality",
    roleId: "quality-engineer",
    roleTitle: "품질보증·품질관리 엔지니어"
  },
  {
    id: "materials-battery",
    label: "신소재/재료공학 -> 배터리 공정",
    major: "materials",
    industry: "battery",
    expectedIndustryLabel: "배터리·소재",
    trackId: "chemical-process",
    roleId: "battery-process-engineer",
    roleTitle: "배터리 공정 엔지니어"
  },
  {
    id: "chemical-materials-rnd",
    label: "화학공학 -> 소재 R&D",
    major: "chemical",
    industry: "chemical",
    expectedIndustryLabel: "화학·정유",
    trackId: "chemical-process",
    roleId: "materials-rnd-engineer",
    roleTitle: "소재 R&D 엔지니어"
  },
  {
    id: "mechanical-uav",
    label: "기계공학 -> UAV 비행제어",
    major: "mechanical",
    industry: "aerospace",
    expectedIndustryLabel: "항공·우주",
    trackId: "aerospace-defense",
    roleId: "uav-flight-control-engineer",
    roleTitle: "드론·UAM 비행제어 엔지니어"
  },
  {
    id: "computer-autonomous-perception",
    label: "컴퓨터공학 -> 자율주행 인지",
    major: "computer",
    industry: "ai",
    expectedIndustryLabel: "AI·데이터",
    trackId: "autonomous-sdv",
    roleId: "autonomous-perception-engineer",
    roleTitle: "자율주행 인지 알고리즘 엔지니어"
  },
  {
    id: "electrical-power-data-center",
    label: "전기공학 -> 데이터센터 전력설비",
    major: "electrical_power",
    industry: "infrastructure",
    expectedIndustryLabel: "데이터센터·인프라",
    trackId: "data-center-infra",
    roleId: "data-center-electrical-infra-engineer",
    roleTitle: "데이터센터 전력설비 엔지니어"
  },
  {
    id: "industrial-manufacturing-dx",
    label: "산업공학 -> 제조 데이터",
    major: "industrial",
    industry: "manufacturing",
    expectedIndustryLabel: "제조·품질",
    trackId: "manufacturing-dx",
    roleId: "industrial-data-engineer",
    roleTitle: "제조 데이터 엔지니어"
  },
  {
    id: "materials-semiconductor-packaging",
    label: "신소재/재료공학 -> 반도체 패키징",
    major: "materials",
    industry: "semiconductor",
    expectedIndustryLabel: "반도체",
    trackId: "semiconductor-packaging-test",
    roleId: "advanced-packaging-engineer",
    roleTitle: "반도체 패키징 공정 엔지니어"
  },
  {
    id: "electrical-power-inverter",
    label: "전기공학 -> 전력전자/인버터",
    major: "electrical_power",
    industry: "energy",
    expectedIndustryLabel: "전력·ESS",
    trackId: "energy-ess",
    roleId: "power-electronics-inverter-engineer",
    roleTitle: "전력전자·인버터 엔지니어"
  }
];

const viewports = [
  { id: "desktop", width: 1366, height: 900, deviceScaleFactor: 1, mobile: false },
  { id: "mobile", width: 390, height: 844, deviceScaleFactor: 2, mobile: true }
];

fs.mkdirSync(outputDir, { recursive: true });

function normalizeAppUrl(url) {
  const trimmed = url.trim();
  if (!trimmed) return "";
  return trimmed.endsWith("/") ? trimmed : `${trimmed}/`;
}

function findBrowserExecutable() {
  const candidates = [
    process.env.EDGE_PATH,
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
  ].filter(Boolean);
  return candidates.find((candidate) => fs.existsSync(candidate));
}

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
    server.on("error", reject);
  });
}

function getText(url) {
  return new Promise((resolve, reject) => {
    const request = http.get(url, (response) => {
      let body = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => {
        body += chunk;
      });
      response.on("end", () => {
        resolve({
          statusCode: response.statusCode || 0,
          body
        });
      });
    });
    request.on("error", reject);
  });
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    const request = http.get(url, (response) => {
      let body = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => {
        body += chunk;
      });
      response.on("end", () => {
        if (response.statusCode < 200 || response.statusCode >= 300) {
          reject(new Error(`HTTP ${response.statusCode}: ${body}`));
          return;
        }
        resolve(JSON.parse(body));
      });
    });
    request.on("error", reject);
  });
}

async function waitForHttpOk(url, timeoutMs = 20000, getDiagnostic = () => "") {
  const start = Date.now();
  let lastError;
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await getText(url);
      if (response.statusCode >= 200 && response.statusCode < 400) return;
      lastError = new Error(`HTTP ${response.statusCode}: ${response.body.slice(0, 300)}`);
    } catch (error) {
      lastError = error;
    }
    await delay(150);
  }

  const diagnostic = getDiagnostic();
  const detail = diagnostic ? `\n${diagnostic}` : "";
  throw new Error(`Timed out waiting for app server ${url}: ${lastError?.message || "no response"}${detail}`);
}

async function waitForJson(url, timeoutMs = 10000) {
  const start = Date.now();
  let lastError;
  while (Date.now() - start < timeoutMs) {
    try {
      return await getJson(url);
    } catch (error) {
      lastError = error;
      await delay(150);
    }
  }
  throw lastError || new Error(`Timed out waiting for ${url}`);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function startLocalDevServer() {
  const port = await getFreePort();
  const url = `http://127.0.0.1:${port}/`;
  const viteBin = path.join(rootDir, "node_modules", "vite", "bin", "vite.js");
  if (!fs.existsSync(viteBin)) {
    throw new Error("Vite executable was not found. Run npm install before npm run qa:ux.");
  }

  let serverOutput = "";
  const rememberOutput = (chunk) => {
    serverOutput = `${serverOutput}${chunk.toString()}`.slice(-4000);
  };
  const serverProcess = spawn(process.execPath, [
    viteBin,
    "--host",
    "127.0.0.1",
    "--port",
    String(port),
    "--strictPort"
  ], {
    cwd: rootDir,
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true
  });
  serverProcess.stdout.on("data", rememberOutput);
  serverProcess.stderr.on("data", rememberOutput);

  try {
    await waitForHttpOk(url, 20000, () => serverOutput.trim());
  } catch (error) {
    serverProcess.kill();
    throw error;
  }
  return { url, process: serverProcess };
}

class CdpClient {
  static connect(url) {
    return new Promise((resolve, reject) => {
      const socket = new WebSocket(url);
      const client = new CdpClient(socket);
      socket.addEventListener("open", () => resolve(client), { once: true });
      socket.addEventListener("error", reject, { once: true });
    });
  }

  constructor(socket) {
    this.socket = socket;
    this.nextId = 1;
    this.pending = new Map();
    this.eventWaiters = new Map();
    socket.addEventListener("message", (event) => this.handleMessage(event.data));
  }

  handleMessage(data) {
    const message = JSON.parse(data);
    if (message.id && this.pending.has(message.id)) {
      const { resolve, reject } = this.pending.get(message.id);
      this.pending.delete(message.id);
      if (message.error) reject(new Error(`${message.error.message}: ${message.error.data || ""}`));
      else resolve(message.result || {});
      return;
    }

    const waiters = this.eventWaiters.get(message.method) || [];
    waiters.forEach((waiter) => waiter(message.params || {}));
    this.eventWaiters.delete(message.method);
  }

  send(method, params = {}) {
    const id = this.nextId++;
    this.socket.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
    });
  }

  waitForEvent(method, timeoutMs = 10000) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(`Timed out waiting for ${method}`)), timeoutMs);
      const waiters = this.eventWaiters.get(method) || [];
      waiters.push((params) => {
        clearTimeout(timer);
        resolve(params);
      });
      this.eventWaiters.set(method, waiters);
    });
  }

  close() {
    this.socket.close();
  }
}

async function evaluate(client, expression) {
  const result = await client.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
    userGesture: true
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text || "Runtime evaluation failed");
  }
  return result.result?.value;
}

async function waitForPageReady(client) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    const ready = await evaluate(client, `Boolean(document.querySelector("#trackList") && document.querySelector("#majorSelect"))`);
    if (ready) return;
    await delay(100);
  }
  const diagnostics = await evaluate(client, `JSON.stringify({
    href: location.href,
    readyState: document.readyState,
    title: document.title,
    trackListExists: Boolean(document.querySelector("#trackList")),
    roleCardCount: document.querySelectorAll("[data-track-id][data-role-id]").length,
    moduleScripts: [...document.querySelectorAll("script[type='module']")].map((script) => script.src || script.textContent.slice(0, 80)),
    bodyText: document.body.innerText.slice(0, 500)
  })`);
  throw new Error(`Timed out waiting for app shell: ${diagnostics}`);
}

async function runSample(client, sample, viewport) {
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: viewport.deviceScaleFactor,
    mobile: viewport.mobile
  });
  await client.send("Page.navigate", { url: `${appUrl}?uxSample=${sample.id}-${viewport.id}` });
  await client.waitForEvent("Page.loadEventFired");
  await waitForPageReady(client);

  const result = await evaluate(client, `(${browserScenario.toString()})(${JSON.stringify(sample)})`);
  const screenshotName = `${sample.id}-${viewport.id}.png`;
  const screenshot = await client.send("Page.captureScreenshot", { format: "png", fromSurface: true });
  fs.writeFileSync(path.join(outputDir, screenshotName), Buffer.from(screenshot.data, "base64"));
  return { ...result, screenshot: path.join(outputDir, screenshotName) };
}

async function browserScenario(sample) {
  const waitFrame = () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  const textOf = (selector) => document.querySelector(selector)?.innerText || "";
  const setSelect = (id, value) => {
    const select = document.getElementById(id);
    if (!select) throw new Error(`${id} not found`);
    select.value = value;
    select.dispatchEvent(new Event("change", { bubbles: true }));
    return select.options[select.selectedIndex]?.textContent || select.value;
  };
  const isVisible = (element) => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
  };

  localStorage.clear();
  await waitFrame();
  const majorLabel = setSelect("majorSelect", sample.major);
  const industryLabel = setSelect("industrySelect", sample.industry);
  setSelect("durationSelect", "4");
  await waitFrame();

  const availableCards = [...document.querySelectorAll("[data-track-id][data-role-id]")];
  const roleCard = availableCards.find((card) => (
    card.dataset.trackId === sample.trackId && card.dataset.roleId === sample.roleId
  ));
  if (!roleCard) {
    return {
      label: sample.label,
      failures: [`role card not found: ${sample.trackId}/${sample.roleId}`],
      trackCountText: document.querySelector("#trackCount")?.innerText || "",
      trackListText: document.querySelector("#trackList")?.innerText.slice(0, 500) || "",
      runtimeErrors: window.__uxErrors || [],
      availableRoles: availableCards.slice(0, 8).map((card) => ({
        trackId: card.dataset.trackId,
        roleId: card.dataset.roleId,
        text: card.innerText.slice(0, 120)
      }))
    };
  }

  roleCard.click();
  await waitFrame();
  document.querySelector("[data-view-target='roadmap']")?.click();
  await waitFrame();

  const overviewText = textOf("#selectedRoleOverview");
  const roadmapText = textOf("#roadmapList");
  const headerText = textOf("#headerStatus");
  const roleContextText = textOf("#roleContextBar");
  const todayText = textOf(".today-action-panel");
  const todayEvidenceCount = document.querySelectorAll(".today-action-evidence span").length;
  const educationSummaryTitles = [...document.querySelectorAll(".education-summary-card h4")]
    .map((item) => item.innerText.trim())
    .filter(Boolean);
  const firstTwoWeeks = [...document.querySelectorAll(".week-card")].slice(0, 2).map((card) => ({
    title: card.querySelector("h3")?.innerText.trim() || "",
    resources: [...card.querySelectorAll(".roadmap-resource-title strong")]
      .map((item) => item.innerText.trim())
      .filter(Boolean),
    text: card.innerText
  }));
  const roleDecisionCards = [...document.querySelectorAll(".role-decision-card")].map((card) => card.innerText);
  const visibleOverflow = [...document.querySelectorAll("body *")]
    .filter(isVisible)
    .filter((element) => {
      const rect = element.getBoundingClientRect();
      return rect.left < -2 || rect.right > window.innerWidth + 2;
    })
    .slice(0, 8)
    .map((element) => ({
      tag: element.tagName,
      className: element.className,
      text: element.innerText?.slice(0, 80) || "",
      left: Math.round(element.getBoundingClientRect().left),
      right: Math.round(element.getBoundingClientRect().right)
    }));

  const duplicateSummaryTitles = educationSummaryTitles.filter((title, index) => (
    educationSummaryTitles.indexOf(title) !== index
  ));
  const weekDuplicateResources = firstTwoWeeks.flatMap((week) => (
    week.resources.filter((title, index) => week.resources.indexOf(title) !== index)
  ));
  const firstTwoWeekResourceTitles = firstTwoWeeks.flatMap((week) => week.resources);
  const duplicateAcrossFirstTwoWeeks = firstTwoWeekResourceTitles.filter((title, index) => (
    firstTwoWeekResourceTitles.indexOf(title) !== index
  ));
  const requiredOverviewLabels = ["전공", "상세직무내용", "직무 관련 교육"];
  const failures = [];

  if (!overviewText.includes(sample.roleTitle)) failures.push(`selected role title missing: ${sample.roleTitle}`);
  if (!roleContextText.includes(sample.expectedIndustryLabel)) {
    failures.push(`industry label missing from role context: ${sample.expectedIndustryLabel}`);
  }
  if (roleContextText.includes(sample.industry)) failures.push(`raw industry code visible in role context: ${sample.industry}`);
  requiredOverviewLabels.forEach((label) => {
    if (!overviewText.includes(label)) failures.push(`overview label missing: ${label}`);
  });
  if (!roleDecisionCards.some((text) => text.includes("상세직무내용"))) failures.push("role detail card not visible");
  if (!roleDecisionCards.some((text) => text.includes("직무 관련 교육"))) failures.push("role education card not visible");
  if (!roadmapText.includes("추천 교육")) failures.push("roadmap recommendation label missing");
  if (!todayText.includes("오늘 시작할 1개") && !todayText.includes("다시 확인할 1개")) failures.push("today action panel missing");
  if (!todayEvidenceCount) failures.push("today action evidence missing");
  if (educationSummaryTitles.length < 2) failures.push("less than two education summary recommendations");
  if (firstTwoWeeks.some((week) => week.resources.length === 0)) failures.push("first two roadmap weeks include an empty resource list");
  if (duplicateSummaryTitles.length) failures.push(`duplicate education summary titles: ${duplicateSummaryTitles.join(", ")}`);
  if (weekDuplicateResources.length) failures.push(`duplicate resources within a week: ${weekDuplicateResources.join(", ")}`);
  if (duplicateAcrossFirstTwoWeeks.length) failures.push(`duplicate resources across first two weeks: ${duplicateAcrossFirstTwoWeeks.join(", ")}`);
  if (visibleOverflow.length) failures.push(`visible horizontal overflow: ${visibleOverflow.length}`);

  return {
    label: sample.label,
    majorLabel,
    industryLabel,
    headerText,
    roleContextText,
    roleTitle: sample.roleTitle,
    educationSummaryTitles: educationSummaryTitles.slice(0, 5),
    firstTwoWeeks: firstTwoWeeks.map((week) => ({
      title: week.title,
      resourceCount: week.resources.length,
      resources: week.resources.slice(0, 4)
    })),
    visibleOverflow,
    failures
  };
}

async function main() {
  const browserPath = findBrowserExecutable();
  if (!browserPath) throw new Error("Microsoft Edge or Chrome executable was not found.");
  let appServerProcess;
  if (!appUrl) {
    const appServer = await startLocalDevServer();
    appUrl = appServer.url;
    appServerProcess = appServer.process;
  }
  const port = await getFreePort();
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "career-ux-edge-"));

  const browserProcess = spawn(browserPath, [
    "--headless=new",
    "--disable-gpu",
    "--disable-extensions",
    "--no-first-run",
    "--no-default-browser-check",
    "--hide-scrollbars",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    "about:blank"
  ], {
    stdio: "ignore",
    windowsHide: true
  });

  try {
    const pagesUrl = `http://127.0.0.1:${port}/json/list`;
    const pages = await waitForJson(pagesUrl);
    const page = pages.find((item) => item.type === "page") || pages[0];
    if (!page?.webSocketDebuggerUrl) throw new Error("Could not find a debuggable browser page.");
    const client = await CdpClient.connect(page.webSocketDebuggerUrl);
    await client.send("Page.enable");
    await client.send("Runtime.enable");
    await client.send("Page.addScriptToEvaluateOnNewDocument", {
      source: `
        window.__uxErrors = [];
        window.addEventListener("error", (event) => {
          window.__uxErrors.push(event.message || String(event.error || "error"));
        });
        window.addEventListener("unhandledrejection", (event) => {
          window.__uxErrors.push(String(event.reason?.message || event.reason || "unhandled rejection"));
        });
      `
    });

    const results = [];
    for (const sample of samples) {
      for (const viewport of viewports) {
        results.push({
          sample: sample.id,
          viewport: viewport.id,
          ...(await runSample(client, sample, viewport))
        });
      }
    }

    const failures = results.flatMap((result) => (
      result.failures.map((failure) => `${result.sample}/${result.viewport}: ${failure}`)
    ));
    const report = {
      appUrl,
      outputDir,
      samples: results,
      failures
    };
    fs.writeFileSync(path.join(outputDir, "report.json"), `${JSON.stringify(report, null, 2)}\n`);

    client.close();
    console.log("Browser UX sample report:");
    console.log(JSON.stringify({
      appUrl,
      outputDir,
      sampleRuns: results.length,
      failures: failures.length,
      screenshots: results.map((result) => result.screenshot)
    }, null, 2));

    if (failures.length) {
      failures.forEach((failure) => console.error(`- ${failure}`));
      process.exitCode = 1;
    }
  } finally {
    browserProcess.kill();
    if (appServerProcess) appServerProcess.kill();
  }
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
