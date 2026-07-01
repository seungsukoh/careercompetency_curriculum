import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultCsvPath = path.join(rootDir, "docs", "STUDENT_INTERVIEW_RESULTS_TEMPLATE_2026-07-01.csv");
const inputPath = path.resolve(rootDir, process.argv[2] || defaultCsvPath);

const requiredFields = [
  "interview_id",
  "major_fit_result",
  "role_detail_result",
  "education_result",
  "week_sequence_result",
  "persona_copy_result",
  "export_result",
  "overall_result",
  "issue_category",
  "severity"
];

const areaFields = [
  "major_fit_result",
  "role_detail_result",
  "education_result",
  "week_sequence_result",
  "persona_copy_result",
  "export_result"
];

const priorityOrder = [
  "first_recommendation_reason",
  "concept_confusion",
  "week_sequence",
  "persona_copy",
  "export_usefulness",
  "language_access",
  "resource_quality"
];

const issueLabels = {
  first_recommendation_reason: "첫 추천 교육 이유",
  concept_confusion: "전공-상세직무-교육 구분",
  week_sequence: "1-2주차 추천 순서/중복",
  persona_copy: "페르소나 문구",
  export_usefulness: "최종 커리큘럼/내보내기 유용성",
  language_access: "한국어 가능 자료 접근성",
  resource_quality: "교육 자료 품질/직무 도움"
};

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (quoted) {
      if (char === "\"" && next === "\"") {
        value += "\"";
        i += 1;
      } else if (char === "\"") {
        quoted = false;
      } else {
        value += char;
      }
      continue;
    }

    if (char === "\"") {
      quoted = true;
    } else if (char === ",") {
      row.push(value);
      value = "";
    } else if (char === "\n") {
      row.push(value);
      rows.push(row);
      row = [];
      value = "";
    } else if (char !== "\r") {
      value += char;
    }
  }

  if (value.length || row.length) {
    row.push(value);
    rows.push(row);
  }

  return rows.filter((csvRow) => csvRow.some((cell) => cell.trim()));
}

function normalizeResult(value) {
  const normalized = String(value || "").trim().toLowerCase();
  if (["pass", "passed", "ok", "합격", "통과"].includes(normalized)) return "pass";
  if (["hold", "pending", "보류"].includes(normalized)) return "hold";
  if (["fix", "fail", "failed", "수정", "수정 필요", "실패"].includes(normalized)) return "fix";
  return normalized || "blank";
}

function splitCategories(value) {
  return String(value || "")
    .split(/[;,]/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function countBy(items, getKey) {
  return items.reduce((counts, item) => {
    const key = getKey(item);
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function sortIssues(entries) {
  return entries.sort((a, b) => {
    const priorityA = priorityOrder.indexOf(a.category);
    const priorityB = priorityOrder.indexOf(b.category);
    const normalizedA = priorityA === -1 ? Number.MAX_SAFE_INTEGER : priorityA;
    const normalizedB = priorityB === -1 ? Number.MAX_SAFE_INTEGER : priorityB;
    if (normalizedA !== normalizedB) return normalizedA - normalizedB;
    return b.count - a.count;
  });
}

if (!fs.existsSync(inputPath)) {
  console.error(`CSV file not found: ${inputPath}`);
  process.exit(1);
}

const csvRows = parseCsv(fs.readFileSync(inputPath, "utf8"));
const [header, ...rawRows] = csvRows;
const missing = requiredFields.filter((field) => !header.includes(field));

if (missing.length) {
  console.error(`Missing required columns: ${missing.join(", ")}`);
  process.exit(1);
}

const rows = rawRows
  .map((rawRow) => Object.fromEntries(header.map((field, index) => [field, rawRow[index] || ""])))
  .filter((row) => row.interview_id.trim());

const overall = countBy(rows, (row) => normalizeResult(row.overall_result));
const areaResults = Object.fromEntries(areaFields.map((field) => [
  field,
  countBy(rows, (row) => normalizeResult(row[field]))
]));

const issues = new Map();
rows.forEach((row) => {
  splitCategories(row.issue_category).forEach((category) => {
    const current = issues.get(category) || {
      category,
      label: issueLabels[category] || category,
      count: 0,
      interviewIds: [],
      severities: {}
    };
    current.count += 1;
    current.interviewIds.push(row.interview_id);
    const severity = String(row.severity || "blank").trim().toUpperCase() || "BLANK";
    current.severities[severity] = (current.severities[severity] || 0) + 1;
    issues.set(category, current);
  });
});

const repeatedIssues = sortIssues([...issues.values()].filter((issue) => issue.count >= 2));
const nextPriorities = repeatedIssues.map((issue) => ({
  issue: issue.label,
  count: issue.count,
  interviewIds: issue.interviewIds,
  action: `${issue.label} 항목을 코드/문구 수정 후보로 올린다.`
}));

const summary = {
  input: path.relative(rootDir, inputPath),
  interviews: rows.length,
  overall,
  areaResults,
  repeatedIssueThreshold: 2,
  repeatedIssues,
  nextPriorities
};

console.log("Student interview summary:");
console.log(JSON.stringify(summary, null, 2));

if (!rows.length) {
  console.log("\nNo interview rows found. Add rows to the CSV template or pass a filled CSV path.");
}
