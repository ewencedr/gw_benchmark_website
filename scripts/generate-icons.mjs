import fs from 'node:fs/promises';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import pngToIco from 'png-to-ico';

const repoRoot = process.cwd();
const publicDir = path.join(repoRoot, 'public');

const inputSvgPath = path.join(publicDir, 'gw_benchmark_logo.svg');

function renderPng(svg, size) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: size },
    background: 'rgba(0,0,0,0)',
  });
  return resvg.render().asPng();
}

async function main() {
  const svg = await fs.readFile(inputSvgPath, 'utf8');

  const favicon32 = renderPng(svg, 32);
  const apple180 = renderPng(svg, 180);
  const icon192 = renderPng(svg, 192);
  const icon512 = renderPng(svg, 512);

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

  const ico = await pngToIco([favicon32]);
  await fs.writeFile(path.join(publicDir, 'favicon.ico'), ico);

  // eslint-disable-next-line no-console
  console.log('Generated favicon + touch icons from SVG.');
}

await main();
