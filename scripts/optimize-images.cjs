#!/usr/bin/env node
/*
  Optimize PNG/JPG images and generate WebP copies.
  - Scans: ./public and ./src/assets
  - Writes .webp next to originals
*/
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = process.cwd();
const TARGET_DIRS = [
  path.join(ROOT, 'public'),
  path.join(ROOT, 'src', 'assets'),
];

const VALID_EXT = new Set(['.png', '.jpg', '.jpeg']);

function* walk(dir) {
  if (!fs.existsSync(dir)) return;
  const stack = [dir];
  while (stack.length) {
    const cur = stack.pop();
    const entries = fs.readdirSync(cur, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(cur, e.name);
      if (e.isDirectory()) stack.push(full);
      else yield full;
    }
  }
}

async function optimizeToWebp(input) {
  const ext = path.extname(input).toLowerCase();
  if (!VALID_EXT.has(ext)) return null;
  const dir = path.dirname(input);
  const base = path.basename(input, ext);
  const out = path.join(dir, base + '.webp');
  try {
    const buf = await sharp(input)
      .rotate()
      .webp({ quality: 82, effort: 6 })
      .toBuffer();
    fs.writeFileSync(out, buf);
    return { input, out, ok: true };
  } catch (err) {
    return { input, out, ok: false, err };
  }
}

(async () => {
  const files = [];
  for (const dir of TARGET_DIRS) {
    for (const fp of walk(dir)) files.push(fp);
  }
  const imgs = files.filter((f) => VALID_EXT.has(path.extname(f).toLowerCase()));
  console.log(`Found ${imgs.length} images to optimize.`);
  let ok = 0, fail = 0;
  for (const f of imgs) {
    const res = await optimizeToWebp(f);
    if (res && res.ok) {
      ok++;
      console.log(`→ webp: ${path.relative(ROOT, res.out)}`);
    } else if (res) {
      fail++;
      console.warn(`× failed: ${path.relative(ROOT, res.input)} - ${res.err}`);
    }
  }
  console.log(`Done. Success: ${ok}, Failed: ${fail}`);
})();