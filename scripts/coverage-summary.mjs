import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const coverageRoot = path.join(rootDir, "tmp", "coverage-summary");
const appPath = path.join(rootDir, "app.js");
const expansionPath = path.join(rootDir, "data", "roleExpansions.js");

const runs = [
  { id: "validate-data", script: "scripts/validate-data.mjs" },
  { id: "validate-posting", script: "scripts/validate-posting-qa.mjs" },
  { id: "audit-education", script: "scripts/audit-education-alignment.mjs" },
  { id: "smoke-render", script: "scripts/smoke-render.mjs" }
];

fs.rmSync(coverageRoot, { recursive: true, force: true });
fs.mkdirSync(coverageRoot, { recursive: true });

runs.forEach((run) => {
  const outDir = path.join(coverageRoot, run.id);
  fs.mkdirSync(outDir, { recursive: true });
  const result = spawnSync(process.execPath, [run.script], {
    cwd: rootDir,
    env: { ...process.env, NODE_V8_COVERAGE: outDir },
    stdio: "inherit"
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
});

const appSource = fs.readFileSync(appPath, "utf8")
  .replace(/^import\s+\{\s*applyRoleExpansions\s*\}\s+from\s+["']\.\/data\/roleExpansions\.js["'];\s*/m, "");
const expansionSource = fs.readFileSync(expansionPath, "utf8")
  .replace("export function applyRoleExpansions", "function applyRoleExpansions");
const appStartOffset = expansionSource.length + 2;

const appFunctions = [...appSource.matchAll(/^function\s+([A-Za-z_$][\w$]*)\s*\(/gm)]
  .map((match) => ({
    name: match[1],
    line: appSource.slice(0, match.index).split(/\r?\n/).length
  }));

const coveredByRun = new Map();

runs.forEach((run) => {
  const runDir = path.join(coverageRoot, run.id);
  const coverageFiles = fs.readdirSync(runDir).filter((file) => file.endsWith(".json"));
  const covered = new Set();

  coverageFiles.forEach((file) => {
    const data = JSON.parse(fs.readFileSync(path.join(runDir, file), "utf8"));
    data.result
      .filter((entry) => /\.vm\.js$/.test(entry.url || ""))
      .forEach((entry) => {
        entry.functions.forEach((fn) => {
          if (!fn.functionName) return;
          const startOffset = fn.ranges[0]?.startOffset ?? 0;
          if (startOffset < appStartOffset) return;
          if (fn.ranges.some((range) => range.count > 0)) covered.add(fn.functionName);
        });
      });
  });

  coveredByRun.set(run.id, covered);
});

const coveredByAny = new Set([...coveredByRun.values()].flatMap((set) => [...set]));
const rows = appFunctions.map((fn) => ({
  ...fn,
  covered: coveredByAny.has(fn.name),
  runs: runs
    .filter((run) => coveredByRun.get(run.id)?.has(fn.name))
    .map((run) => run.id)
}));

const renderPredicate = (fn) => /^(render|bind|layout|focus|schedule|setActive|confirm|reset|export|download|toggle)/.test(fn.name);
const recommendationPredicate = (fn) => /(?:Recommendation|Recommend|Resource|Roadmap|Task|Role|Major|Industry|Posting|Fit|Score|Match|Gap|Competency|Prerequisite|Sequence|Starter|Goal|Duration|Context)/.test(fn.name);

function summarize(predicate = () => true) {
  const subset = rows.filter(predicate);
  const covered = subset.filter((fn) => fn.covered);
  return {
    total: subset.length,
    covered: covered.length,
    uncovered: subset.length - covered.length,
    percent: subset.length ? Number(((covered.length / subset.length) * 100).toFixed(1)) : 0
  };
}

const summary = {
  appFunctions: summarize(),
  renderUiFunctions: summarize(renderPredicate),
  recommendationFunctions: summarize(recommendationPredicate),
  coveredFunctionNamesByRun: Object.fromEntries([...coveredByRun.entries()].map(([id, set]) => [id, set.size])),
  uncoveredSamples: rows
    .filter((fn) => !fn.covered)
    .slice(0, 40)
    .map(({ name, line }) => ({ name, line }))
};

console.log("Coverage summary:");
console.log(JSON.stringify(summary, null, 2));
