import { hexKey } from './hex.js';

// Hand-crafted Haute-Marne hex map (pointy-top axial coords)
// Shape approximates the department: wider in middle, tapered N/S
// q = roughly W→E  (higher q = more east)
// r = roughly N→S  (higher r = more south)

const ROWS = [
  [3, 7,  0],   // r=0  — northern tip, Lac du Der area
  [2, 9,  1],   // r=1  — Saint-Dizier
  [2, 10, 2],   // r=2  — Wassy, Joinville
  [1, 11, 3],   // r=3
  [1, 11, 4],   // r=4  — Vignory, Doulevant
  [0, 12, 5],   // r=5
  [0, 12, 6],   // r=6  — Chaumont viaduct
  [0, 11, 7],   // r=7  — Chaumont + Colombey
  [0, 11, 8],
  [1, 11, 9],   // r=9  — Arc-en-Barrois, Nogent
  [1, 10, 10],
  [2, 10, 11],  // r=11 — Bourbonne
  [2, 9,  12],  // r=12 — Langres, Montigny
  [3, 8,  13],  // r=13 — Fayl-Billot
  [4, 7,  14],  // r=14 — southern tip
];

// terrain types for visual variety (purely cosmetic)
const TERRAIN_SEED = 42;
function pseudoRand(q, r) {
  let h = (q * 73856093) ^ (r * 19349663);
  h = ((h >> 16) ^ h) * 0x45d9f3b;
  h = ((h >> 16) ^ h) * 0x45d9f3b;
  return ((h >> 16) ^ h) & 0xffff;
}
export function terrainType(q, r) {
  const v = pseudoRand(q, r) % 10;
  if (v < 2) return 'forest';
  if (v < 4) return 'hills';
  if (v < 5) return 'water';
  return 'plain';
}

// Build valid hex set
export const MAP_CELLS = new Set();
const MAP_ARRAY = [];
for (const [qMin, qMax, r] of ROWS) {
  for (let q = qMin; q <= qMax; q++) {
    const k = hexKey(q, r);
    MAP_CELLS.add(k);
    MAP_ARRAY.push({ q, r });
  }
}
export { MAP_ARRAY };
export const MAP_SIZE = MAP_ARRAY.length;

// Landmarks — key strategic locations on the map
export const LANDMARKS = [
  {
    id: 'lac-der', q: 5, r: 0,
    name: 'Lac du Der', label: 'Grand Lac', emoji: '🌊',
    type: 'expand',
    bonusDesc: '+2 cellules à placer ce tour',
    bonus: (player) => { player.extraCells += 2; },
    cultureReq: false,
  },
  {
    id: 'saint-dizier', q: 4, r: 1,
    name: 'Saint-Dizier', label: 'La Bragarde', emoji: '⚙️',
    type: 'score',
    bonusDesc: '+2 points de score',
    bonus: (player, scores) => { scores[player.id].bonus += 2; },
    cultureReq: true,
  },
  {
    id: 'wassy', q: 7, r: 2,
    name: 'Wassy', label: 'Mémoire 1562', emoji: '📜',
    type: 'power',
    bonusDesc: 'Réduit cooldown de pouvoir de 1',
    bonus: (player) => { if (player.cooldown > 0) player.cooldown--; },
    cultureReq: false,
  },
  {
    id: 'joinville', q: 5, r: 3,
    name: 'Joinville', label: 'Ville Princière', emoji: '⚜️',
    type: 'expand',
    bonusDesc: '+3 cellules à placer',
    bonus: (player) => { player.extraCells += 3; },
    cultureReq: true,
  },
  {
    id: 'vignory', q: 3, r: 5,
    name: 'Vignory', label: 'Romane & Fière', emoji: '⛪',
    type: 'defense',
    bonusDesc: 'Immunise 2 cellules aléatoires',
    bonus: null,
    cultureReq: false,
  },
  {
    id: 'colombey', q: 2, r: 7,
    name: 'Colombey-les-2-Églises', label: '✟ De Gaulle', emoji: '✟',
    type: 'defense',
    bonusDesc: 'Tes cellules survivent 1 tour supplémentaire',
    bonus: null,
    cultureReq: true,
  },
  {
    id: 'chaumont', q: 6, r: 7,
    name: 'Chaumont', label: '🏰 Capitale du 52', emoji: '🏰',
    type: 'culture',
    bonusDesc: 'Requis pour victoire Culture · +1 point/tour',
    bonus: (player, scores) => { scores[player.id].bonus += 1; },
    cultureReq: true,
    isCapital: true,
  },
  {
    id: 'arc-barrois', q: 3, r: 9,
    name: 'Arc-en-Barrois', label: 'Châtaigneraie', emoji: '🌳',
    type: 'heal',
    bonusDesc: 'Ressuscite 3 cellules mortes',
    bonus: null,
    cultureReq: false,
  },
  {
    id: 'nogent', q: 9, r: 9,
    name: 'Nogent', label: 'Couteliers du 52', emoji: '🔪',
    type: 'expand',
    bonusDesc: '+1 rayon de placement',
    bonus: null,
    cultureReq: true,
  },
  {
    id: 'bourbonne', q: 9, r: 11,
    name: 'Bourbonne-les-Bains', label: 'Ville Thermale', emoji: '♨️',
    type: 'heal',
    bonusDesc: 'Régénère 2 cellules perdues',
    bonus: null,
    cultureReq: false,
  },
  {
    id: 'langres', q: 6, r: 12,
    name: 'Langres', label: 'Cité Fortifiée', emoji: '🛡️',
    type: 'defense',
    bonusDesc: 'Immunise cette case pendant 2 tours',
    bonus: null,
    cultureReq: true,
  },
  {
    id: 'montigny', q: 4, r: 12,
    name: 'Montigny-le-Roi', label: 'Panorama 52', emoji: '🔭',
    type: 'vision',
    bonusDesc: 'Révèle la prochaine génération',
    bonus: null,
    cultureReq: false,
  },
  {
    id: 'fayl-billot', q: 7, r: 13,
    name: 'Fayl-Billot', label: 'Capitale de la Vannerie', emoji: '🧺',
    type: 'expand',
    bonusDesc: '+1 naissance par génération',
    bonus: null,
    cultureReq: false,
  },
];

export const LANDMARK_MAP = new Map(LANDMARKS.map(l => [hexKey(l.q, l.r), l]));
export const CULTURE_LANDMARKS = LANDMARKS.filter(l => l.cultureReq);

export function isValidCell(q, r) { return MAP_CELLS.has(hexKey(q, r)); }
export function getLandmark(q, r) { return LANDMARK_MAP.get(hexKey(q, r)) || null; }
