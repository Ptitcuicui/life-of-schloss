import { HEX_SIZE } from './config.js';

// Pointy-top hexagons, axial coordinates (q, r)

export function hexToPixel(q, r, offsetX = 0, offsetY = 0) {
  const x = HEX_SIZE * (Math.sqrt(3) * q + (Math.sqrt(3) / 2) * r) + offsetX;
  const y = HEX_SIZE * (1.5 * r) + offsetY;
  return { x, y };
}

export function pixelToHex(px, py, offsetX = 0, offsetY = 0) {
  const x = (px - offsetX) / HEX_SIZE;
  const y = (py - offsetY) / HEX_SIZE;
  const fq = (Math.sqrt(3) / 3) * x - (1 / 3) * y;
  const fr = (2 / 3) * y;
  return hexRound(fq, fr);
}

export function hexRound(fq, fr) {
  const fs = -fq - fr;
  let q = Math.round(fq), r = Math.round(fr), s = Math.round(fs);
  const dq = Math.abs(q - fq), dr = Math.abs(r - fr), ds = Math.abs(s - fs);
  if (dq > dr && dq > ds) q = -r - s;
  else if (dr > ds) r = -q - s;
  return { q, r };
}

export function hexKey(q, r) { return `${q},${r}`; }
export function keyToHex(k) { const [q, r] = k.split(',').map(Number); return { q, r }; }

const DIRS = [[1,0],[1,-1],[0,-1],[-1,0],[-1,1],[0,1]];
export function hexNeighbors(q, r) {
  return DIRS.map(([dq, dr]) => ({ q: q + dq, r: r + dr }));
}

export function hexVertices(cx, cy) {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const a = Math.PI / 180 * (60 * i - 30);
    pts.push({ x: cx + HEX_SIZE * Math.cos(a), y: cy + HEX_SIZE * Math.sin(a) });
  }
  return pts;
}

export function hexDistance(q1, r1, q2, r2) {
  return (Math.abs(q1 - q2) + Math.abs(q1 + r1 - q2 - r2) + Math.abs(r1 - r2)) / 2;
}
