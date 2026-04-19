import fs from 'node:fs/promises';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import pngToIco from 'png-to-ico';
import { PNG } from 'pngjs';

const repoRoot = process.cwd();
const publicDir = path.join(repoRoot, 'public');
/** Next serves `app/favicon.ico` before `public/favicon.ico`; keep both in sync. */
const appDir = path.join(repoRoot, 'src', 'app');

const inputSvgPath = path.join(publicDir, 'gw_benchmark_logo.svg');

/** Non-square SVG renders break `png-to-ico`; center content on a transparent square. */
function letterboxToSquare(pngBuffer, size) {
  const src = PNG.sync.read(pngBuffer);
  const out = new PNG({ width: size, height: size });
  out.data.fill(0);
  const destX = Math.floor((size - src.width) / 2);
  const destY = Math.floor((size - src.height) / 2);
  for (let y = 0; y < src.height; y++) {
    for (let x = 0; x < src.width; x++) {
      const si = (src.width * y + x) << 2;
      const di = (out.width * (destY + y) + (destX + x)) << 2;
      out.data[di] = src.data[si];
      out.data[di + 1] = src.data[si + 1];
      out.data[di + 2] = src.data[si + 2];
      out.data[di + 3] = src.data[si + 3];
    }
  }
  return PNG.sync.write(out);
}

/** Fit the SVG inside `size`×`size` (aspect preserved), then letterbox to a square PNG. */
function renderSquarePng(svg, size) {
  const probe = new Resvg(svg);
  const z = Math.min(size / probe.width, size / probe.height);
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'zoom', value: z },
    background: 'rgba(0,0,0,0)',
  });
  const img = resvg.render();
  const buf = img.asPng();
  if (img.width === size && img.height === size) return buf;
  return letterboxToSquare(buf, size);
}

async function main() {
  const svg = await fs.readFile(inputSvgPath, 'utf8');

  const favicon16 = renderSquarePng(svg, 16);
  const favicon32 = renderSquarePng(svg, 32);
  const apple180 = renderSquarePng(svg, 180);
  const icon192 = renderSquarePng(svg, 192);
  const icon512 = renderSquarePng(svg, 512);

  await fs.writeFile(path.join(publicDir, 'favicon-32x32.png'), favicon32);
  await fs.writeFile(path.join(publicDir, 'apple-touch-icon.png'), apple180);
  await fs.writeFile(
    path.join(publicDir, 'android-chrome-192x192.png'),
    icon192
  );
  await fs.writeFile(
    path.join(publicDir, 'android-chrome-512x512.png'),
    icon512
  );

  const ico = await pngToIco([favicon16, favicon32]);
  await fs.writeFile(path.join(publicDir, 'favicon.ico'), ico);
  await fs.writeFile(path.join(appDir, 'favicon.ico'), ico);

  // eslint-disable-next-line no-console
  console.log('Generated favicon + touch icons from SVG.');
}

await main();
