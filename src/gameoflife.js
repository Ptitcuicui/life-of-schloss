import { hexKey, hexNeighbors } from './hex.js';
import { MAP_CELLS, isValidCell } from './map.js';

// grid: Map<hexKey, playerId | null>
// players: Player[] (with GoL rule params)

export function stepGeneration(grid, players, fortifiedKeys = new Set()) {
  const playerMap = new Map(players.map(p => [p.id, p]));
  const next = new Map(grid);

  // Collect all cells to evaluate: occupied + empty neighbors of occupied
  const toEval = new Set(grid.keys());
  for (const [key, owner] of grid) {
    if (!owner) continue;
    const { q, r } = keyToHex(key);
    for (const nb of hexNeighbors(q, r)) {
      const nk = hexKey(nb.q, nb.r);
      if (isValidCell(nb.q, nb.r)) toEval.add(nk);
    }
  }

  for (const key of toEval) {
    if (fortifiedKeys.has(key)) continue;  // indestructible this turn

    const owner = grid.get(key) || null;
    const { q, r } = keyToHex(key);
    const nbs = hexNeighbors(q, r);

    // Count live neighbors per player
    const neighborCounts = {};
    let totalLive = 0;
    for (const nb of nbs) {
      const nk = hexKey(nb.q, nb.r);
      const nbOwner = grid.get(nk);
      if (nbOwner) {
        totalLive++;
        neighborCounts[nbOwner] = (neighborCounts[nbOwner] || 0) + 1;
      }
    }

    if (owner) {
      // SURVIVAL check
      const p = playerMap.get(owner);
      if (!p) { next.set(key, null); continue; }

      let sMin = p.surviveMin, sMax = p.surviveMax;

      // Whitewarrior passive: if cell has 2+ allied neighbors, can survive with 4
      if (p.passiveId === 'fortress_wall') {
        const alliedNbs = neighborCounts[owner] || 0;
        if (alliedNbs >= 2) sMax = 4;
      }

      // Invoherence passive: 20% revival chance handled below on death
      const survives = totalLive >= sMin && totalLive <= sMax;
      if (!survives) {
        // Invoherence passive: ghost revival
        if (p.passiveId === 'alice_magic' && totalLive > 0 && Math.random() < 0.20) {
          next.set(key, owner);  // survives by magic
        } else {
          next.set(key, null);
        }
      }
      // else stays alive (no change needed)

    } else {
      // BIRTH check: empty cell
      if (totalLive === 0) continue;

      // Find the majority owner among neighbors
      let bestOwner = null, bestCount = 0;
      for (const [pid, cnt] of Object.entries(neighborCounts)) {
        if (cnt > bestCount) { bestCount = cnt; bestOwner = pid; }
      }
      if (!bestOwner) continue;

      const p = playerMap.get(bestOwner);
      if (!p) continue;

      const bMin = p.birthMin, bMax = p.birthMax;
      if (bestCount >= bMin && bestCount <= bMax && totalLive >= bMin && totalLive <= bMax) {
        next.set(key, bestOwner);

        // Toutoon RAGE: if rage active, try to also birth an adjacent empty cell
        if (p.rageActive || p.passiveId === 'cluster_birth') {
          // handled in rage pass below
        }
      }
    }
  }

  // Toutoon RAGE MODE: double births — for each newly born Toutoon cell, try to spawn one more
  const tootoon = players.find(p => p.id === 'toutoon' && p.rageActive);
  if (tootoon) {
    const newBirths = [];
    for (const [key, owner] of next) {
      if (owner === 'toutoon' && !grid.get(key)) {
        newBirths.push(key);
      }
    }
    for (const key of newBirths) {
      const { q, r } = keyToHex(key);
      for (const nb of hexNeighbors(q, r)) {
        const nk = hexKey(nb.q, nb.r);
        if (isValidCell(nb.q, nb.r) && !next.get(nk)) {
          next.set(nk, 'toutoon');
          break;
        }
      }
    }
  }

  return next;
}

// Count cells per player in a grid snapshot
export function countCells(grid) {
  const counts = {};
  for (const owner of grid.values()) {
    if (owner) counts[owner] = (counts[owner] || 0) + 1;
  }
  return counts;
}

// Count how many landmarks each player controls
export function countLandmarks(grid, landmarks) {
  const counts = {};
  for (const lm of landmarks) {
    const k = hexKey(lm.q, lm.r);
    const owner = grid.get(k);
    if (owner) counts[owner] = (counts[owner] || 0) + 1;
  }
  return counts;
}

function keyToHex(k) {
  const [q, r] = k.split(',').map(Number);
  return { q, r };
}
