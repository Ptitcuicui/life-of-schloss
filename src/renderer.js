import { hexToPixel, hexVertices, hexKey } from './hex.js';
import { MAP_ARRAY, LANDMARK_MAP, terrainType } from './map.js';
import { HEX_SIZE } from './config.js';

const TERRAIN_COLORS = {
  plain:  '#1e2a14',
  forest: '#12281a',
  hills:  '#2a2010',
  water:  '#0e1e30',
};

const TERRAIN_BORDER = {
  plain:  '#263318',
  forest: '#163322',
  hills:  '#33280e',
  water:  '#122038',
};

// Cached map bounds
let mapBounds = null;

export function getMapBounds() {
  if (mapBounds) return mapBounds;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const { q, r } of MAP_ARRAY) {
    const { x, y } = hexToPixel(q, r);
    minX = Math.min(minX, x - HEX_SIZE);
    minY = Math.min(minY, y - HEX_SIZE);
    maxX = Math.max(maxX, x + HEX_SIZE);
    maxY = Math.max(maxY, y + HEX_SIZE);
  }
  mapBounds = { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY };
  return mapBounds;
}

export function computeOffset(canvas) {
  const bounds = getMapBounds();
  const scaleX = canvas.width / (bounds.w + 60);
  const scaleY = canvas.height / (bounds.h + 60);
  const scale = Math.min(scaleX, scaleY, 1);
  const ox = (canvas.width - bounds.w * scale) / 2 - bounds.minX * scale;
  const oy = (canvas.height - bounds.h * scale) / 2 - bounds.minY * scale;
  return { ox, oy, scale };
}

function drawHexPath(ctx, cx, cy) {
  const verts = hexVertices(cx, cy);
  ctx.beginPath();
  ctx.moveTo(verts[0].x, verts[0].y);
  for (let i = 1; i < 6; i++) ctx.lineTo(verts[i].x, verts[i].y);
  ctx.closePath();
}

export function render(canvas, state, playerMap, highlightKey = null, previewGrid = null) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dark background
  ctx.fillStyle = '#080810';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const { ox, oy, scale } = computeOffset(canvas);
  const grid = previewGrid || state.grid;

  ctx.save();
  ctx.translate(ox, oy);
  ctx.scale(scale, scale);

  // ── Draw each hex ────────────────────────────────────────────────────────
  for (const { q, r } of MAP_ARRAY) {
    const { x, y } = hexToPixel(q, r);
    const key = hexKey(q, r);
    const owner = grid.get(key) || null;
    const lm = LANDMARK_MAP.get(key);
    const terrain = terrainType(q, r);
    const isHighlight = key === highlightKey;

    // Fill color
    let fillColor;
    if (owner) {
      const p = playerMap.get(owner);
      fillColor = p ? p.color : '#888';
    } else {
      fillColor = lm ? '#2a2210' : TERRAIN_COLORS[terrain];
    }

    drawHexPath(ctx, x, y);
    ctx.fillStyle = fillColor;
    ctx.fill();

    // Border
    let strokeColor = owner ? adjustBrightness(fillColor, -40) : TERRAIN_BORDER[terrain];
    if (lm) strokeColor = '#c9a84c';
    if (isHighlight) strokeColor = '#ffffff';

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = isHighlight ? 2.5 : 1.2;
    ctx.stroke();

    // Landmark icon
    if (lm) {
      ctx.font = `${HEX_SIZE * 0.65}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      // shadow for readability
      ctx.shadowColor = '#000';
      ctx.shadowBlur = 4;
      ctx.fillStyle = '#fff';
      ctx.fillText(lm.emoji, x, y);
      ctx.shadowBlur = 0;
    }

    // Player cell: show player initial letter
    if (owner && !lm) {
      const p = playerMap.get(owner);
      if (p) {
        ctx.font = `bold ${HEX_SIZE * 0.45}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillText(p.name[0].toUpperCase(), x + 1, y + 1);
        ctx.fillStyle = '#fff';
        ctx.fillText(p.name[0].toUpperCase(), x, y);
      }
    }

    // Fortified overlay (Whitewarrior power)
    if (state.fortifiedCells && state.fortifiedCells.has(key)) {
      drawHexPath(ctx, x, y);
      ctx.strokeStyle = '#b8cce8';
      ctx.lineWidth = 3;
      ctx.stroke();
      // shield pip
      ctx.font = `${HEX_SIZE * 0.45}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(184,204,232,0.9)';
      ctx.fillText('🛡', x, y - HEX_SIZE * 0.4);
    }
  }

  // ── City name labels for landmarks ──────────────────────────────────────
  for (const { q, r } of MAP_ARRAY) {
    const key = hexKey(q, r);
    const lm = LANDMARK_MAP.get(key);
    if (!lm) continue;
    const { x, y } = hexToPixel(q, r);

    ctx.font = `bold ${HEX_SIZE * 0.36}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 6;
    ctx.fillStyle = '#ffd700';
    ctx.fillText(lm.name, x, y + HEX_SIZE * 0.55);
    ctx.shadowBlur = 0;
  }

  ctx.restore();
}

export function renderPreviewOverlay(canvas, previewGrid, state, playerMap) {
  render(canvas, state, playerMap, null, previewGrid);

  const ctx = canvas.getContext('2d');
  ctx.save();
  ctx.fillStyle = 'rgba(80,0,120,0.18)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = 'bold 18px sans-serif';
  ctx.fillStyle = '#c084f5';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('👁 VISION TACTIQUE — Aperçu de la prochaine génération', canvas.width / 2, 10);
  ctx.restore();
}

function adjustBrightness(hex, amount) {
  const r = Math.max(0, Math.min(255, parseInt(hex.slice(1, 3), 16) + amount));
  const g = Math.max(0, Math.min(255, parseInt(hex.slice(3, 5), 16) + amount));
  const b = Math.max(0, Math.min(255, parseInt(hex.slice(5, 7), 16) + amount));
  return `rgb(${r},${g},${b})`;
}

// Flash effect for simulation step
export function flashCanvas(canvas) {
  canvas.classList.add('sim-flash');
  setTimeout(() => canvas.classList.remove('sim-flash'), 220);
}
