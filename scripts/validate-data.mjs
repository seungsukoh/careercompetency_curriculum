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
globalThis.__careerData = {
  tracks,
  resources,
  diagnostics,
  jobRoles,
  roleDiagnostics,
  roleResourceLinks,
  resourceTaskLinks,
  roadmaps,
  curriculumTasks,
  starterKeywords,
  majorRoleFitProfiles,
  majorBridgeTracks,
  industryLabels,
  industryDiagnostics
};
`, sandbox, { filename: "career-data-validation.vm.js" });

const data = sandbox.__careerData;
const errors = [];
const warnings = [];

const fail = (message) => errors.push(message);
const warn = (message) => warnings.push(message);

function requireFields(entity, fields, label) {
  fields.forEach((field) => {
    const value = entity[field];
    const missingArray = Array.isArray(value) && value.length === 0;
    if (value === undefined || value === null || value === "" || missingArray) {
      fail(`${label} is missing required field "${field}"`);
    }
  });
}

function checkUnique(items, getId, label) {
  const seen = new Set();
  items.forEach((item) => {
    const id = getId(item);
    if (!id) {
      fail(`${label} has an empty id`);
      return;
    }
    if (seen.has(id)) fail(`${label} has duplicate id "${id}"`);
    seen.add(id);
  });
  return seen;
}

const trackIds = checkUnique(data.tracks, (track) => track.id, "track");
const resourceIds = checkUnique(data.resources, (resource) => resource.id, "resource");
const roles = Object.values(data.jobRoles).flat();
const roleIds = checkUnique(roles, (role) => role.id, "role");

data.tracks.forEach((track) => {
  requireFields(track, ["id", "title", "majors", "industries", "summary", "tasks", "skills", "tools", "outputs"], `track ${track.id}`);
  if (!data.jobRoles[track.id]?.length) fail(`track ${track.id} has no job roles`);
  if (!data.diagnostics[track.id]?.length) warn(`track ${track.id} has no track-level diagnostics`);
  if (!data.curriculumTasks[track.id]?.length && !data.roadmaps[track.id]?.length) {
    warn(`track ${track.id} has no curriculum tasks or roadmap fallback`);
  }
});

roles.forEach((role) => {
  requireFields(role, ["id", "title", "postingKeywords", "industries", "focus", "responsibilities", "requirements", "preferred"], `role ${role.id}`);
  if (!data.roleDiagnostics[role.id]?.length) warn(`role ${role.id} has no role diagnostics`);
  if (!data.roleResourceLinks[role.id]?.length) warn(`role ${role.id} has no directly linked resources`);
});

data.resources.forEach((resource) => {
  requireFields(resource, ["id", "title", "provider", "type", "language", "difficulty", "tracks", "skills", "reason", "expectedOutput", "url"], `resource ${resource.id}`);
  (resource.tracks || []).forEach((trackId) => {
    if (!trackIds.has(trackId)) fail(`resource ${resource.id} references missing track "${trackId}"`);
  });
});

Object.entries(data.jobRoles).forEach(([trackId, trackRoles]) => {
  if (!trackIds.has(trackId)) fail(`jobRoles references missing track "${trackId}"`);
  trackRoles.forEach((role) => {
    if (!roleIds.has(role.id)) fail(`jobRoles.${trackId} contains unknown role "${role.id}"`);
  });
});

Object.entries(data.roleResourceLinks).forEach(([roleId, linkedResourceIds]) => {
  if (!roleIds.has(roleId)) fail(`roleResourceLinks references missing role "${roleId}"`);
  linkedResourceIds.forEach((resourceId) => {
    if (!resourceIds.has(resourceId)) fail(`roleResourceLinks.${roleId} references missing resource "${resourceId}"`);
  });
});

Object.entries(data.resourceTaskLinks).forEach(([resourceId]) => {
  if (!resourceIds.has(resourceId)) fail(`resourceTaskLinks references missing resource "${resourceId}"`);
});

Object.entries(data.majorRoleFitProfiles).forEach(([major, profile]) => {
  [...(profile.direct || []), ...(profile.bridge || [])].forEach((roleId) => {
    if (!roleIds.has(roleId)) fail(`majorRoleFitProfiles.${major} references missing role "${roleId}"`);
  });
});

Object.entries(data.majorBridgeTracks).forEach(([major, bridgeTrackIds]) => {
  bridgeTrackIds.forEach((trackId) => {
    if (!trackIds.has(trackId)) fail(`majorBridgeTracks.${major} references missing track "${trackId}"`);
  });
});

Object.keys(data.starterKeywords).forEach((trackId) => {
  if (!trackIds.has(trackId)) fail(`starterKeywords references missing track "${trackId}"`);
});

const summary = {
  tracks: data.tracks.length,
  roles: roles.length,
  resources: data.resources.length,
  roleResourceLinks: Object.keys(data.roleResourceLinks).length,
  warnings: warnings.length,
  errors: errors.length
};

if (warnings.length) {
  console.warn("Data validation warnings:");
  warnings.slice(0, 30).forEach((message) => console.warn(`- ${message}`));
  if (warnings.length > 30) console.warn(`- ... ${warnings.length - 30} more warnings`);
}

if (errors.length) {
  console.error("Data validation failed:");
  errors.forEach((message) => console.error(`- ${message}`));
  console.error(JSON.stringify(summary, null, 2));
  process.exit(1);
}

console.log("Data validation passed:");
console.log(JSON.stringify(summary, null, 2));
