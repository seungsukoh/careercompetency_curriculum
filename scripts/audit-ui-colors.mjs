import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cssPath = path.join(rootDir, "styles.css");
const css = fs.readFileSync(cssPath, "utf8");
const errors = [];

const requiredTokens = [
  "--paper-cream",
  "--cream-surface",
  "--heritage-navy",
  "--signal-gold",
  "--success-green",
  "--warning-amber",
  "--danger-red",
  "--analysis-teal",
  "--focus-violet",
  "--deep-bg",
  "--primary",
  "--accent",
  "--accent-ink",
  "--green",
  "--yellow",
  "--danger",
  "--teal",
  "--violet",
  "--on-dark",
  "--surface-raised"
];

const contrastPairs = [
  ["--on-dark", "--primary", 4.5],
  ["--on-dark", "--deep-bg", 4.5],
  ["--on-dark", "--green", 4.5],
  ["--on-dark", "--danger", 4.5],
  ["--primary", "--surface-raised", 4.5],
  ["--accent-ink", "--surface-raised", 4.5],
  ["--green", "--surface-raised", 4.5],
  ["--yellow", "--surface-raised", 4.5],
  ["--danger", "--surface-raised", 4.5],
  ["--teal", "--surface-raised", 4.5],
  ["--violet", "--surface-raised", 4.5]
];

const rootBlock = css.match(/:root\s*\{([\s\S]*?)\n\}/)?.[1] || "";
const tokens = new Map();

[...rootBlock.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].forEach(([, name, value]) => {
  tokens.set(name, value.trim());
});

function fail(message) {
  errors.push(message);
}

function hexToRgb(hex) {
  const normalized = hex.replace("#", "").trim();
  const expanded = normalized.length === 3
    ? normalized.split("").map((char) => char + char).join("")
    : normalized;
  if (!/^[0-9a-fA-F]{6}$/.test(expanded)) return null;
  return {
    r: parseInt(expanded.slice(0, 2), 16),
    g: parseInt(expanded.slice(2, 4), 16),
    b: parseInt(expanded.slice(4, 6), 16)
  };
}

function rgbToHex({ r, g, b }) {
  return `#${[r, g, b].map((value) => Math.round(value).toString(16).padStart(2, "0")).join("")}`;
}

function mixRgb(a, aPercent, b, bPercent) {
  const total = aPercent + bPercent;
  const aWeight = aPercent / total;
  const bWeight = bPercent / total;
  return {
    r: a.r * aWeight + b.r * bWeight,
    g: a.g * aWeight + b.g * bWeight,
    b: a.b * aWeight + b.b * bWeight
  };
}

function resolveColor(value, trail = []) {
  const trimmed = String(value || "").trim();
  const hexMatch = trimmed.match(/^#[0-9a-fA-F]{3,6}$/);
  if (hexMatch) return rgbToHex(hexToRgb(trimmed));

  const varMatch = trimmed.match(/^var\((--[\w-]+)\)$/);
  if (varMatch) {
    const tokenName = varMatch[1];
    if (trail.includes(tokenName)) throw new Error(`cyclic color token: ${trail.join(" -> ")} -> ${tokenName}`);
    if (!tokens.has(tokenName)) throw new Error(`missing color token: ${tokenName}`);
    return resolveColor(tokens.get(tokenName), [...trail, tokenName]);
  }

  const mixMatch = trimmed.match(/^color-mix\(in srgb,\s*(.+?)\s+([0-9.]+)%\s*,\s*(.+?)\s+([0-9.]+)%\)$/);
  if (mixMatch) {
    const [, firstValue, firstPercent, secondValue, secondPercent] = mixMatch;
    const first = hexToRgb(resolveColor(firstValue.trim(), trail));
    const second = hexToRgb(resolveColor(secondValue.trim(), trail));
    return rgbToHex(mixRgb(first, Number(firstPercent), second, Number(secondPercent)));
  }

  throw new Error(`unsupported color value: ${trimmed}`);
}

function luminance({ r, g, b }) {
  const channel = (value) => {
    const normalized = value / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  };
  return channel(r) * 0.2126 + channel(g) * 0.7152 + channel(b) * 0.0722;
}

function contrastRatio(foregroundHex, backgroundHex) {
  const foreground = luminance(hexToRgb(foregroundHex));
  const background = luminance(hexToRgb(backgroundHex));
  const light = Math.max(foreground, background);
  const dark = Math.min(foreground, background);
  return (light + 0.05) / (dark + 0.05);
}

requiredTokens.forEach((token) => {
  if (!tokens.has(token)) fail(`missing token ${token}`);
});

const resolved = {};
requiredTokens.forEach((token) => {
  if (!tokens.has(token)) return;
  try {
    resolved[token] = resolveColor(tokens.get(token), [token]);
  } catch (error) {
    fail(`${token}: ${error.message}`);
  }
});

[
  ["--primary", "--green"],
  ["--primary", "--danger"],
  ["--primary", "--teal"],
  ["--primary", "--violet"],
  ["--accent", "--yellow"]
].forEach(([left, right]) => {
  if (resolved[left] && resolved[right] && resolved[left] === resolved[right]) {
    fail(`${left} and ${right} resolve to the same color ${resolved[left]}`);
  }
});

contrastPairs.forEach(([foreground, background, minimum]) => {
  if (!resolved[foreground] || !resolved[background]) return;
  const ratio = contrastRatio(resolved[foreground], resolved[background]);
  if (ratio < minimum) {
    fail(`${foreground} on ${background} contrast ${ratio.toFixed(2)} is below ${minimum}`);
  }
});

const negativeLetterSpacing = [...css.matchAll(/letter-spacing\s*:\s*-[^;]+;/g)]
  .map((match) => match[0]);
if (negativeLetterSpacing.length) {
  fail(`negative letter-spacing found: ${negativeLetterSpacing.join(", ")}`);
}

if (errors.length) {
  console.error("UI color audit failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("UI color audit passed:");
console.log(JSON.stringify({
  checkedTokens: requiredTokens.length,
  contrastPairs: contrastPairs.length,
  semanticColors: {
    primary: resolved["--primary"],
    success: resolved["--green"],
    warning: resolved["--yellow"],
    danger: resolved["--danger"],
    teal: resolved["--teal"],
    violet: resolved["--violet"]
  }
}, null, 2));
