import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { summarizeStudentInterviews } from "./summarize-student-interviews.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const templatePath = path.join(rootDir, "docs", "STUDENT_INTERVIEW_RESULTS_TEMPLATE_2026-07-01.csv");
const fixtureDir = path.join(rootDir, "tmp", "interview-summary-fixtures");
const fixturePath = path.join(fixtureDir, "repeated-issue-sample.csv");

function csvEscape(value) {
  const text = String(value ?? "");
  if (/[",\r\n;]/.test(text)) {
    return `"${text.replace(/"/g, "\"\"")}"`;
  }
  return text;
}

function buildRow(header, values) {
  return header.map((field) => csvEscape(values[field] ?? "")).join(",");
}

function fail(message) {
  console.error(`Interview summary validation failed: ${message}`);
  process.exit(1);
}

if (!fs.existsSync(templatePath)) {
  fail(`template not found: ${templatePath}`);
}

const header = fs.readFileSync(templatePath, "utf8").trim().split(",");
const rows = [
  {
    interview_id: "INT-001",
    major: "computer",
    selected_role: "임베디드 펌웨어 엔지니어",
    duration_weeks: "2",
    auto_persona: "단기 준비 학생",
    major_fit_result: "pass",
    role_detail_result: "pass",
    education_result: "fix",
    week_sequence_result: "pass",
    persona_copy_result: "pass",
    export_result: "hold",
    overall_result: "fix",
    issue_category: "first_recommendation_reason;concept_confusion",
    severity: "P0"
  },
  {
    interview_id: "INT-002",
    major: "electrical",
    selected_role: "데이터센터 전력설비 엔지니어",
    duration_weeks: "4",
    auto_persona: "전공 확장 학생",
    major_fit_result: "pass",
    role_detail_result: "hold",
    education_result: "fix",
    week_sequence_result: "pass",
    persona_copy_result: "hold",
    export_result: "pass",
    overall_result: "fix",
    issue_category: "first_recommendation_reason",
    severity: "P0"
  },
  {
    interview_id: "INT-003",
    major: "mechanical",
    selected_role: "자율주행 인지 알고리즘 엔지니어",
    duration_weeks: "4",
    auto_persona: "도전 직무 학생",
    major_fit_result: "hold",
    role_detail_result: "pass",
    education_result: "pass",
    week_sequence_result: "fix",
    persona_copy_result: "pass",
    export_result: "pass",
    overall_result: "hold",
    issue_category: "week_sequence",
    severity: "P1"
  }
];

fs.mkdirSync(fixtureDir, { recursive: true });
fs.writeFileSync(
  fixturePath,
  `${header.join(",")}\n${rows.map((row) => buildRow(header, row)).join("\n")}\n`,
  "utf8"
);

const summary = summarizeStudentInterviews(fixturePath);

if (summary.interviews !== 3) {
  fail(`expected 3 interviews, got ${summary.interviews}`);
}

if (summary.overall.fix !== 2 || summary.overall.hold !== 1) {
  fail(`unexpected overall counts: ${JSON.stringify(summary.overall)}`);
}

if (summary.areaResults.education_result.fix !== 2) {
  fail(`expected 2 education fixes, got ${JSON.stringify(summary.areaResults.education_result)}`);
}

if (summary.repeatedIssues.length !== 1) {
  fail(`expected exactly one repeated issue, got ${summary.repeatedIssues.length}`);
}

const [issue] = summary.repeatedIssues;
if (issue.category !== "first_recommendation_reason" || issue.count !== 2) {
  fail(`unexpected repeated issue: ${JSON.stringify(issue)}`);
}

if (summary.nextPriorities[0]?.issue !== "첫 추천 교육 이유") {
  fail(`unexpected next priority: ${JSON.stringify(summary.nextPriorities[0])}`);
}

console.log("Interview summary validation passed:");
console.log(JSON.stringify({
  interviews: summary.interviews,
  repeatedIssue: issue,
  nextPriority: summary.nextPriorities[0]
}, null, 2));
