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

const sandbox = {
  console,
  localStorage: {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
  },
  document: {
    addEventListener: () => {},
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

globalThis.__careerAudit = {
  data: {
    tracks,
    resources,
    jobRoles,
    roleResourceLinks,
    roleDiagnostics,
    majorRoleFitProfiles,
    industryLabels
  },
  auditRole({ trackId, roleId, major, industry, goal = "foundation", durationWeeks = "4" }) {
    state = {
      ...defaultState,
      selectedTrackId: trackId,
      hasSelectedRoleSelection: true,
      profile: {
        ...defaultState.profile,
        major,
        industry,
        goal,
        durationWeeks
      },
      selectedRoles: { [trackId]: roleId },
      checked: {},
      saved: [],
      completed: [],
      completedRoadmap: []
    };

    const track = tracks.find((item) => item.id === trackId);
    const selectedRole = getSelectedRole(trackId);
    const visibleTasks = getVisibleRoadmapTasks(trackId);
    const context = getRecommendationContext(track, getGapSkills(trackId), visibleTasks);
    const roleLinkedIds = new Set(getRoleLinkedResourceIds(context.role));
    const topResources = getRecommendedResources(track, context).slice(0, 8);
    const trustedFocusedRoleResources = resources.filter((resource) => (
      resource.tracks.includes(track.id)
      && roleLinkedIds.has(resource.id)
      && ["reviewed", "verified"].includes(resource.qualityStatus)
      && !resource.broad
      && !isRoleExcludedResource(resource, context.role)
    ));
    const starterPack = getStarterPackResources(context, visibleTasks);
    const roadmapResourceUseCounts = new Map();
    const roadmapByTask = visibleTasks.map((task) => {
      const linkedResources = getRoadmapResourcesForTask(track, task, context, roadmapResourceUseCounts);
      linkedResources.forEach((resource) => {
        roadmapResourceUseCounts.set(resource.id, (roadmapResourceUseCounts.get(resource.id) || 0) + 1);
      });
      return {
      title: task.baseTitle || task.title,
      week: task.planWeek,
      resources: linkedResources.map((resource) => ({
        id: resource.id,
        title: resource.title,
        sequenceLevel: resource.sequenceLevel,
        totalMinutes: resource.totalMinutes,
        trusted: ["reviewed", "verified"].includes(resource.qualityStatus),
        broad: Boolean(resource.broad),
        reusable: isReusableRoadmapResource(resource),
        roleLinked: roleLinkedIds.has(resource.id),
        taskLinked: getResourceLinkedTasks(resource.id, [task]).length > 0,
        prerequisiteResourceIds: getResourcePrerequisiteResourceIds(resource, context)
      }))
    };
    });
    const roleSearchText = getRoleSearchText(track, context.role);
    const roleCompetencies = (roleDiagnostics[roleId] || []).map(([skill, question]) => {
      const mappedResourceIds = new Set(getRoleCompetencyResourceIds(context.role, skill));
      const linkedResourceMatches = trustedFocusedRoleResources
        .filter((resource) => mappedResourceIds.has(resource.id) || auditResourceMatchesCompetency(resource, skill, question))
        .map((resource) => resource.id);
      const topResourceMatches = topResources
        .filter((resource) => ["reviewed", "verified"].includes(resource.qualityStatus) && !resource.broad)
        .filter((resource) => mappedResourceIds.has(resource.id) || auditResourceMatchesCompetency(resource, skill, question))
        .map((resource) => resource.id);
      return {
        skill,
        question,
        roleTextMatch: auditTextMatchesCompetency(roleSearchText, skill, question),
        linkedResourceMatches,
        topResourceMatches
      };
    });

    return {
      selectable: selectedRole?.id === roleId,
      selectedRoleId: selectedRole?.id || null,
      roleCompetencies,
      topResources: topResources.map((resource) => ({
        id: resource.id,
        title: resource.title,
        provider: resource.provider,
        qualityStatus: resource.qualityStatus,
        trusted: ["reviewed", "verified"].includes(resource.qualityStatus),
        broad: Boolean(resource.broad),
        starterPack: Boolean(resource.starterPack),
        roleLinked: roleLinkedIds.has(resource.id),
        taskLinked: getResourceLinkedTasks(resource.id, visibleTasks).length > 0
      })),
      starterPack: starterPack.map((resource) => ({
        id: resource.id,
        title: resource.title,
        qualityStatus: resource.qualityStatus,
        trusted: ["reviewed", "verified"].includes(resource.qualityStatus),
        broad: Boolean(resource.broad),
        roleLinked: roleLinkedIds.has(resource.id),
        taskLinked: getResourceLinkedTasks(resource.id, visibleTasks).length > 0
      })),
      roadmapByTask
    };
  }
};

const auditCompetencyStopwords = new Set([
  "기준",
  "결과",
  "관리",
  "구분",
  "기초",
  "문서",
  "문제",
  "분석",
  "비교",
  "설명",
  "수행",
  "역량",
  "영향",
  "원인",
  "이해",
  "작성",
  "조건",
  "정리",
  "제안",
  "지표",
  "판단",
  "확인",
  "후보",
  "리포트",
  "보고서"
]);

function auditCompetencyTokens(text) {
  return getSearchTokens(text)
    .filter((token) => !auditCompetencyStopwords.has(token))
    .filter((token) => token.length >= 2);
}

function auditTextMatchesCompetency(text, skill, question) {
  const normalizedText = String(text || "").toLowerCase();
  const normalizedSkill = String(skill || "").toLowerCase();
  if (normalizedSkill && normalizedText.includes(normalizedSkill)) return true;

  const skillTokens = auditCompetencyTokens(skill);
  if (skillTokens.some((token) => normalizedText.includes(token))) return true;

  const questionTokens = auditCompetencyTokens(question);
  return questionTokens.filter((token) => normalizedText.includes(token)).length >= 2;
}

function auditResourceMatchesCompetency(resource, skill, question) {
  const resourceText = getResourceSearchText(resource);
  const normalizedSkill = String(skill || "").toLowerCase();
  if (normalizedSkill && resourceText.includes(normalizedSkill)) return true;

  const skillTokens = auditCompetencyTokens(skill);
  if (skillTokens.some((token) => resourceText.includes(token))) return true;

  const questionTokens = auditCompetencyTokens(question);
  return questionTokens.filter((token) => resourceText.includes(token)).length >= 2;
}
`, sandbox, { filename: "education-alignment-audit.vm.js" });

const auditApi = sandbox.__careerAudit;
const { tracks, resources, jobRoles, roleResourceLinks, majorRoleFitProfiles } = auditApi.data;
const resourceById = new Map(resources.map((resource) => [resource.id, resource]));

const trusted = (resource) => ["reviewed", "verified"].includes(resource?.qualityStatus);
const trustedFocused = (resource) => trusted(resource) && !resource.broad;
const unique = (values) => [...new Set(values.filter(Boolean))];

function getRoles() {
  return tracks.flatMap((track) => (jobRoles[track.id] || []).map((role) => ({ track, role })));
}

function pickMajor(role, track) {
  const entries = Object.entries(majorRoleFitProfiles);
  const direct = entries.find(([, profile]) => (profile.direct || []).includes(role.id));
  if (direct) return direct[0];
  const bridge = entries.find(([, profile]) => (profile.bridge || []).includes(role.id));
  if (bridge) return bridge[0];
  const challenge = entries.find(([, profile]) => (profile.challenge || []).includes(role.id));
  if (challenge) return challenge[0];
  return track.majors.find((major) => major !== "both") || "mechanical";
}

function pickIndustry(role, track) {
  const roleIndustries = (role.industries || []).filter((industry) => industry !== "all");
  return roleIndustries.find((industry) => track.industries.includes(industry))
    || track.industries[0]
    || "all";
}

function formatRoleLabel(track, role) {
  return `${track.id}/${role.id}`;
}

function auditEducationAlignment() {
  const issues = [];
  const audited = [];

  for (const { track, role } of getRoles()) {
    const roleLabel = formatRoleLabel(track, role);
    const roleIndustries = (role.industries || []).filter((industry) => industry !== "all");
    const missingTrackIndustries = roleIndustries.filter((industry) => !track.industries.includes(industry));
    if (missingTrackIndustries.length) {
      issues.push({
        severity: "P1",
        type: "role_industry_not_on_track",
        role: role.id,
        track: track.id,
        message: `${roleLabel} uses industries not exposed by the track: ${missingTrackIndustries.join(", ")}`
      });
    }

    const major = pickMajor(role, track);
    const industry = pickIndustry(role, track);
    const result = auditApi.auditRole({ trackId: track.id, roleId: role.id, major, industry });
    if (!result.selectable) {
      issues.push({
        severity: "P1",
        type: "role_not_selectable_for_audit",
        role: role.id,
        track: track.id,
        message: `${roleLabel} was not selectable with major=${major}, industry=${industry}; selected=${result.selectedRoleId || "none"}`
      });
      continue;
    }

    const topTrustedFocused = result.topResources.filter((resource) => resource.trusted && !resource.broad);
    const topRoleLinked = result.topResources.filter((resource) => resource.roleLinked);
    const topRoleLinkedTrusted = result.topResources.filter((resource) => resource.roleLinked && resource.trusted && !resource.broad);
    const topCandidateOrBroad = result.topResources.filter((resource) => !resource.trusted || resource.broad);
    const linkedIds = roleResourceLinks[role.id] || [];
    const trustedFocusedLinkedCount = linkedIds
      .map((resourceId) => resourceById.get(resourceId))
      .filter((resource) => resource?.tracks?.includes(track.id))
      .filter(trustedFocused)
      .length;

    if (!result.starterPack.length) {
      issues.push({
        severity: "P0",
        type: "starter_pack_missing",
        role: role.id,
        track: track.id,
        message: `${roleLabel} has no trusted starter pack resources.`
      });
    }

    const weakStarterPack = result.starterPack.filter((resource) => !resource.trusted || resource.broad);
    if (weakStarterPack.length) {
      issues.push({
        severity: "P0",
        type: "weak_starter_pack_resource",
        role: role.id,
        track: track.id,
        message: `${roleLabel} starter pack includes untrusted or broad resources: ${weakStarterPack.map((resource) => resource.id).join(", ")}`
      });
    }

    if (topTrustedFocused.length < 6) {
      issues.push({
        severity: "P1",
        type: "low_trusted_top_resources",
        role: role.id,
        track: track.id,
        message: `${roleLabel} has ${topTrustedFocused.length}/8 trusted focused top resources.`
      });
    }

    if (trustedFocusedLinkedCount >= 3 && topRoleLinkedTrusted.length < 3) {
      issues.push({
        severity: "P1",
        type: "low_role_linked_top_resources",
        role: role.id,
        track: track.id,
        message: `${roleLabel} has ${topRoleLinkedTrusted.length}/8 trusted role-linked top resources despite ${trustedFocusedLinkedCount} trusted focused role links.`
      });
    }

    if (topCandidateOrBroad.length > 2) {
      issues.push({
        severity: "P2",
        type: "candidate_or_broad_leakage",
        role: role.id,
        track: track.id,
        message: `${roleLabel} has ${topCandidateOrBroad.length}/8 candidate or broad top resources.`
      });
    }

    const weakRoadmapTasks = result.roadmapByTask.filter((task) => (
      task.resources.length
      && !task.resources.some((resource) => resource.trusted && !resource.broad && (resource.roleLinked || resource.taskLinked))
    ));
    if (weakRoadmapTasks.length) {
      issues.push({
        severity: "P2",
        type: "weak_roadmap_task_resources",
        role: role.id,
        track: track.id,
        message: `${roleLabel} has weak roadmap resources for tasks: ${weakRoadmapTasks.map((task) => task.title).join(", ")}`,
        details: weakRoadmapTasks.map((task) => ({
          task: task.title,
          resources: task.resources.map((resource) => ({
            id: resource.id,
            trusted: resource.trusted,
            broad: resource.broad,
            roleLinked: resource.roleLinked,
            taskLinked: resource.taskLinked
          }))
        }))
      });
    }

    const structuralResults = [
      { durationWeeks: "4", result },
      { durationWeeks: "8", result: auditApi.auditRole({ trackId: track.id, roleId: role.id, major, industry, durationWeeks: "8" }) }
    ];
    structuralResults.forEach(({ durationWeeks, result: structuralResult }) => {
      const roadmapResourceWeeks = new Map();
      structuralResult.roadmapByTask.forEach((task) => {
        task.resources.forEach((resource) => {
          const usages = roadmapResourceWeeks.get(resource.id) || [];
          usages.push({
            week: task.week,
            task: task.title,
            totalMinutes: resource.totalMinutes,
            reusable: resource.reusable
          });
          roadmapResourceWeeks.set(resource.id, usages);
        });
      });
      const duplicateShortResources = [...roadmapResourceWeeks.entries()]
        .filter(([, usages]) => usages.length > 1 && usages.some((usage) => !usage.reusable));
      if (duplicateShortResources.length) {
        issues.push({
          severity: "P2",
          type: "duplicate_short_roadmap_resource",
          role: role.id,
          track: track.id,
          message: `${roleLabel} repeats short one-shot resources across ${durationWeeks}w roadmap weeks: ${duplicateShortResources.map(([resourceId]) => resourceId).join(", ")}`,
          details: duplicateShortResources.map(([resourceId, usages]) => ({
            durationWeeks,
            resourceId,
            usages
          }))
        });
      }

      const firstWeekByResource = new Map();
      structuralResult.roadmapByTask.forEach((task) => {
        task.resources.forEach((resource) => {
          if (!firstWeekByResource.has(resource.id)) firstWeekByResource.set(resource.id, task.week);
        });
      });
      const sequenceBacktracks = structuralResult.roadmapByTask.flatMap((task) => task.resources
        .flatMap((resource) => (resource.prerequisiteResourceIds || [])
          .filter((prerequisiteId) => firstWeekByResource.has(prerequisiteId) && firstWeekByResource.get(prerequisiteId) > task.week)
          .map((prerequisiteId) => ({
            durationWeeks,
            resourceId: resource.id,
            resourceWeek: task.week,
            prerequisiteId,
            prerequisiteWeek: firstWeekByResource.get(prerequisiteId)
          }))));
      if (sequenceBacktracks.length) {
        issues.push({
          severity: "P2",
          type: "roadmap_resource_sequence_backtrack",
          role: role.id,
          track: track.id,
          message: `${roleLabel} schedules prerequisite resources after dependent resources in ${durationWeeks}w roadmap.`,
          details: sequenceBacktracks
        });
      }
    });

    const competencies = result.roleCompetencies || [];
    const textMatchedCompetencies = competencies.filter((competency) => competency.roleTextMatch);
    const linkedCoveredCompetencies = competencies.filter((competency) => competency.linkedResourceMatches.length);
    const topCoveredCompetencies = competencies.filter((competency) => competency.topResourceMatches.length);
    const educationCoveredCompetencies = competencies.filter((competency) => (
      competency.linkedResourceMatches.length || competency.topResourceMatches.length
    ));

    if (competencies.length < 5) {
      issues.push({
        severity: "P1",
        type: "low_role_competency_count",
        role: role.id,
        track: track.id,
        message: `${roleLabel} has only ${competencies.length} role competency diagnostics.`
      });
    }

    if (competencies.length && textMatchedCompetencies.length < Math.min(4, competencies.length)) {
      const weak = competencies.filter((competency) => !competency.roleTextMatch);
      issues.push({
        severity: "P2",
        type: "weak_role_competency_text_alignment",
        role: role.id,
        track: track.id,
        message: `${roleLabel} has ${textMatchedCompetencies.length}/${competencies.length} competencies reflected in role text.`,
        details: weak.map((competency) => competency.skill)
      });
    }

    if (competencies.length && educationCoveredCompetencies.length < Math.min(3, competencies.length)) {
      const weak = competencies.filter((competency) => (
        !competency.linkedResourceMatches.length && !competency.topResourceMatches.length
      ));
      issues.push({
        severity: "P2",
        type: "weak_role_competency_education_coverage",
        role: role.id,
        track: track.id,
        message: `${roleLabel} has ${educationCoveredCompetencies.length}/${competencies.length} competencies covered by trusted direct/top education.`,
        details: weak.map((competency) => competency.skill)
      });
    }

    audited.push({
      track: track.id,
      role: role.id,
      major,
      industry,
      starterPackCount: result.starterPack.length,
      trustedFocusedTopCount: topTrustedFocused.length,
      roleLinkedTopCount: topRoleLinked.length,
      trustedRoleLinkedTopCount: topRoleLinkedTrusted.length,
      trustedFocusedLinkedCount,
      roleCompetencyCount: competencies.length,
      roleCompetencyTextMatchCount: textMatchedCompetencies.length,
      roleCompetencyLinkedCoverageCount: linkedCoveredCompetencies.length,
      roleCompetencyTopCoverageCount: topCoveredCompetencies.length,
      roleCompetencyEducationCoverageCount: educationCoveredCompetencies.length,
      topResourceIds: result.topResources.map((resource) => resource.id)
    });
  }

  const summary = {
    tracks: tracks.length,
    roles: getRoles().length,
    auditedRoles: audited.length,
    issues: issues.length,
    p0: issues.filter((issue) => issue.severity === "P0").length,
    p1: issues.filter((issue) => issue.severity === "P1").length,
    p2: issues.filter((issue) => issue.severity === "P2").length,
    starterPackMissing: issues.filter((issue) => issue.type === "starter_pack_missing").length,
    lowTrustedTopResources: issues.filter((issue) => issue.type === "low_trusted_top_resources").length,
    lowRoleLinkedTopResources: issues.filter((issue) => issue.type === "low_role_linked_top_resources").length,
    roleIndustryNotOnTrack: issues.filter((issue) => issue.type === "role_industry_not_on_track").length,
    roleNotSelectable: issues.filter((issue) => issue.type === "role_not_selectable_for_audit").length,
    lowRoleCompetencyCount: issues.filter((issue) => issue.type === "low_role_competency_count").length,
    weakRoleCompetencyTextAlignment: issues.filter((issue) => issue.type === "weak_role_competency_text_alignment").length,
    weakRoleCompetencyEducationCoverage: issues.filter((issue) => issue.type === "weak_role_competency_education_coverage").length,
    duplicateShortRoadmapResources: issues.filter((issue) => issue.type === "duplicate_short_roadmap_resource").length,
    roadmapResourceSequenceBacktracks: issues.filter((issue) => issue.type === "roadmap_resource_sequence_backtrack").length
  };

  return { summary, issues, audited };
}

const result = auditEducationAlignment();
const json = process.argv.includes("--json");

if (json) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log("Education alignment audit:");
  console.log(JSON.stringify(result.summary, null, 2));
  if (result.issues.length) {
    console.log("Issues:");
    result.issues.forEach((issue) => {
      console.log(`- [${issue.severity}] ${issue.type}: ${issue.message}`);
    });
  }
}

if (result.summary.p0 > 0) process.exit(1);
