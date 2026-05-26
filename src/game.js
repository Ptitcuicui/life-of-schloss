import { hexKey, hexNeighbors } from './hex.js';
import { MAP_CELLS, MAP_ARRAY, MAP_SIZE, LANDMARKS, CULTURE_LANDMARKS, getLandmark, isValidCell } from './map.js';
import { PLAYER_DEFS, createPlayer } from './players.js';
import { stepGeneration, countCells, countLandmarks } from './gameoflife.js';
import { PLACE_PER_TURN, SETUP_CELLS, MAX_ROUNDS, SIM_GENERATIONS, SIM_STEP_MS, MINIGAME_EVERY, DOMINATION_PCT } from './config.js';

export const PHASE = {
  LOBBY: 'lobby',
  SETUP: 'setup',
  PLACE: 'place',
  SIM: 'sim',
  MINIGAME: 'minigame',
  VICTORY: 'victory',
};

export function createGame(playerIds) {
  const players = playerIds.map(id => {
    const def = PLAYER_DEFS.find(p => p.id === id);
    return createPlayer(def);
  });

  const grid = new Map();
  for (const { q, r } of MAP_ARRAY) {
    grid.set(hexKey(q, r), null);
  }

  return {
    phase: PHASE.SETUP,
    players,
    grid,
    currentPlayerIdx: 0,
    round: 1,
    setupCellsLeft: SETUP_CELLS,
    placeCellsLeft: PLACE_PER_TURN,
    scores: Object.fromEntries(players.map(p => [p.id, { cells: 0, landmarks: 0, bonus: 0, total: 0 }])),
    fortifiedCells: new Set(),
    usedMinigameQuestions: new Set(),
    log: [],
    domRounds: {},      // consecutive domination rounds per player
    victoryCondition: null,
    winnerId: null,
    wildCardRevealed: false,
    wildCardId: null,
  };
}

export function getCurrentPlayer(state) {
  return state.players[state.currentPlayerIdx];
}

export function placeCellsLeft(state) {
  const cp = getCurrentPlayer(state);
  if (state.phase === PHASE.SETUP) return state.setupCellsLeft;
  return state.placeCellsLeft + (cp.extraCells || 0);
}

// Try to place a cell at (q, r) for current player. Returns true if placed.
export function tryPlace(state, q, r) {
  if (!isValidCell(q, r)) return false;
  const key = hexKey(q, r);
  if (state.grid.get(key) !== null) return false;

  const cp = getCurrentPlayer(state);
  const maxCells = state.phase === PHASE.SETUP ? state.setupCellsLeft : state.placeCellsLeft + (cp.extraCells || 0);
  if (maxCells <= 0) return false;

  state.grid.set(key, cp.id);

  if (state.phase === PHASE.SETUP) {
    state.setupCellsLeft--;
  } else {
    // deduct from extraCells first, then regular placements
    if (cp.extraCells > 0) cp.extraCells--;
    else state.placeCellsLeft--;
  }

  addLog(state, `${cp.name} place une cellule sur ${labelForHex(q, r)}`, 'hi');
  return true;
}

export function endSetupTurn(state) {
  state.setupCellsLeft = SETUP_CELLS;
  state.currentPlayerIdx = (state.currentPlayerIdx + 1) % state.players.length;

  if (state.currentPlayerIdx === 0) {
    // All players done setup — start round 1
    state.phase = PHASE.PLACE;
    state.placeCellsLeft = PLACE_PER_TURN;
    addLog(state, 'Installation terminée ! La bataille commence.', 'hi');
  }
}

export function endPlaceTurn(state) {
  const cp = getCurrentPlayer(state);
  cp.extraCells = 0;
  state.currentPlayerIdx = (state.currentPlayerIdx + 1) % state.players.length;
  state.placeCellsLeft = PLACE_PER_TURN;

  // Apply landmark bonus for new current player
  const newCp = getCurrentPlayer(state);
  const lmCounts = countLandmarks(state.grid, LANDMARKS);
  const owned = lmCounts[newCp.id] || 0;
  if (newCp.passiveId === 'resource_manager') {
    newCp.extraCells = Math.min(owned, 4);
    if (owned > 0) addLog(state, `${newCp.name} contrôle ${owned} landmark(s) → +${newCp.extraCells} cellules bonus`, 'hi');
  }

  if (state.currentPlayerIdx === 0) {
    // All players placed — run simulation
    state.phase = PHASE.SIM;
  }
}

// Run one GoL step and return new grid
export function runStep(state) {
  const newGrid = stepGeneration(state.grid, state.players, state.fortifiedCells);
  state.grid = newGrid;
  return newGrid;
}

export function afterSimulation(state) {
  // Clear temporary power effects
  state.fortifiedCells = new Set();
  state.players.forEach(p => {
    p.rageActive = false;
    if (p.cooldown > 0) p.cooldown--;
  });

  // Update scores
  const cellCounts = countCells(state.grid);
  const lmCounts = countLandmarks(state.grid, LANDMARKS);

  for (const p of state.players) {
    const cells = cellCounts[p.id] || 0;
    const lms = lmCounts[p.id] || 0;
    const score = state.scores[p.id];
    score.cells = cells;
    score.landmarks = lms;
    score.total += Math.floor(cells / 5) + lms * 2 + (score.bonus || 0);
    score.bonus = 0;
    p.cells = cells;
    p.landmarks = lms;
  }

  // Apply landmark bonuses (score-type only — others handled on capture)
  for (const lm of LANDMARKS) {
    if (lm.type === 'score') {
      const key = hexKey(lm.q, lm.r);
      const owner = state.grid.get(key);
      if (owner) {
        const p = state.players.find(p => p.id === owner);
        if (p && lm.bonus) lm.bonus(p, state.scores);
      }
    }
  }

  // Check victory
  const victory = checkVictory(state);
  if (victory) {
    state.phase = PHASE.VICTORY;
    state.victoryCondition = victory.type;
    state.winnerId = victory.winnerId;
    return;
  }

  // Check if minigame should trigger
  if (state.round % MINIGAME_EVERY === 0) {
    state.phase = PHASE.MINIGAME;
    return;
  }

  // Next round
  nextRound(state);
}

function nextRound(state) {
  if (state.round >= MAX_ROUNDS) {
    // Score victory — highest total wins
    const winner = state.players.reduce((a, b) =>
      state.scores[a.id].total >= state.scores[b.id].total ? a : b
    );
    state.phase = PHASE.VICTORY;
    state.victoryCondition = 'score';
    state.winnerId = winner.id;
    return;
  }
  state.round++;
  state.currentPlayerIdx = 0;
  state.phase = PHASE.PLACE;
  state.placeCellsLeft = PLACE_PER_TURN;
  addLog(state, `── Tour ${state.round} ──`, 'hi');
}

export function afterMinigame(state, minigameWinnerId, bonusCells) {
  if (minigameWinnerId) {
    const p = state.players.find(p => p.id === minigameWinnerId);
    if (p) {
      p.extraCells = (p.extraCells || 0) + bonusCells;
      addLog(state, `🎲 ${p.name} remporte le quiz ! +${bonusCells} cellules bonus`, 'hi');
    }
  }
  nextRound(state);
}

function checkVictory(state) {
  const totalCells = Array.from(state.grid.values()).filter(Boolean).length;

  // Domination: 60% of live cells for 2+ rounds
  const cellCounts = countCells(state.grid);
  for (const p of state.players) {
    const pCells = cellCounts[p.id] || 0;
    if (totalCells > 0 && pCells / totalCells >= DOMINATION_PCT) {
      state.domRounds[p.id] = (state.domRounds[p.id] || 0) + 1;
      if (state.domRounds[p.id] >= 2) {
        return { type: 'domination', winnerId: p.id };
      }
    } else {
      state.domRounds[p.id] = 0;
    }
  }

  // Culture: control all 5 required landmarks simultaneously
  const lmCounts = countLandmarks(state.grid, LANDMARKS);
  for (const p of state.players) {
    const ownedCulture = CULTURE_LANDMARKS.filter(lm => {
      const k = hexKey(lm.q, lm.r);
      return state.grid.get(k) === p.id;
    });
    if (ownedCulture.length >= CULTURE_LANDMARKS.length) {
      return { type: 'culture', winnerId: p.id };
    }
  }

  return null;
}

// ── POWERS ───────────────────────────────────────────────────────────────────

export function activatePower(state, playerIdx, targetData = null) {
  const p = state.players[playerIdx];
  if (p.cooldown > 0) return false;

  switch (p.passiveId) {
    case 'lone_survivor':
      // Vision Tactique — handled in main.js by showing preview
      p.powerActive = true;
      break;

    case 'fortress_wall': {
      // Fortify up to 5 of own cells
      const ownCells = [...state.grid.entries()]
        .filter(([, v]) => v === p.id)
        .map(([k]) => k);
      const toFortify = ownCells.sort(() => Math.random() - .5).slice(0, 5);
      toFortify.forEach(k => state.fortifiedCells.add(k));
      addLog(state, `⚔️ ${p.name} fortifie ${toFortify.length} cellules !`, 'hi');
      break;
    }

    case 'resource_manager': {
      // Coin Truqué — target player with most cells loses 3 random cells
      const cellCounts = countCells(state.grid);
      const target = state.players
        .filter(pl => pl.id !== p.id)
        .sort((a, b) => (cellCounts[b.id] || 0) - (cellCounts[a.id] || 0))[0];
      if (!target) break;
      const targetCells = [...state.grid.entries()]
        .filter(([, v]) => v === target.id)
        .map(([k]) => k);
      const toRemove = targetCells.sort(() => Math.random() - .5).slice(0, 3);
      toRemove.forEach(k => state.grid.set(k, null));
      addLog(state, `🧽 Coin Truqué ! ${target.name} perd 3 cellules.`, 'hi');
      break;
    }

    case 'alice_magic': {
      // Rabbit Hole: teleport all Invoherence cells to random empty cells
      const ownCells = [...state.grid.entries()]
        .filter(([, v]) => v === p.id)
        .map(([k]) => k);
      const emptyCells = [...state.grid.entries()]
        .filter(([, v]) => !v)
        .map(([k]) => k)
        .sort(() => Math.random() - .5);

      ownCells.forEach(k => state.grid.set(k, null));
      ownCells.forEach((_, i) => {
        if (emptyCells[i]) state.grid.set(emptyCells[i], p.id);
      });
      addLog(state, `🐰 Au Pays des Merveilles ! ${p.name} se téléporte partout !`, 'hi');
      break;
    }

    case 'cluster_birth': {
      // RAGE MODE
      p.rageActive = true;
      addLog(state, `😤 RAGE MODE activé ! ${p.name} double ses naissances ce tour !`, 'hi');
      break;
    }
  }

  p.cooldown = p.powerCooldown;
  return true;
}

// ── UTILITIES ─────────────────────────────────────────────────────────────────

function labelForHex(q, r) {
  const lm = getLandmark(q, r);
  return lm ? lm.name : `(${q},${r})`;
}

export function addLog(state, msg, cls = '') {
  state.log.unshift({ msg, cls });
  if (state.log.length > 40) state.log.pop();
}

export function getScoreBoard(state) {
  return state.players
    .map(p => ({ player: p, score: state.scores[p.id] }))
    .sort((a, b) => b.score.total - a.score.total);
}

export function victoryLabel(type) {
  return {
    domination: 'Victoire par Domination',
    culture: 'Victoire Culturelle',
    score: 'Victoire aux Points',
  }[type] || 'Victoire !';
}
