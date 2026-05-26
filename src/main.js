import { PLAYER_DEFS } from './players.js';
import {
  createGame, getCurrentPlayer, tryPlace, endSetupTurn, endPlaceTurn,
  runStep, afterSimulation, afterMinigame, activatePower, getScoreBoard,
  addLog, victoryLabel, placeCellsLeft, PHASE,
} from './game.js';
import { render, renderPreviewOverlay, computeOffset, flashCanvas } from './renderer.js';
import { pixelToHex, hexKey, hexNeighbors } from './hex.js';
import { stepGeneration, countCells } from './gameoflife.js';
import { getRandomQuestion } from './minigames.js';
import { SIM_GENERATIONS, SIM_STEP_MS, TRIVIA_TIMER_S, MAX_ROUNDS, CULTURE_LANDMARKS as CULTURE_NEEDED } from './config.js';
import { CULTURE_LANDMARKS, LANDMARKS } from './map.js';

// ── DOM refs ──────────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const screens = {
  lobby: $('screen-lobby'),
  game: $('screen-game'),
  minigame: $('screen-minigame'),
  victory: $('screen-victory'),
};

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ── STATE ─────────────────────────────────────────────────────────────────────
let state = null;
let playerMap = null;  // Map<id, player>
let hoveredKey = null;
let simInterval = null;
let simStep = 0;
let triviaTimer = null;

// ── LOBBY ─────────────────────────────────────────────────────────────────────
function buildLobby() {
  const grid = $('player-grid');
  grid.innerHTML = '';
  let selected = new Set();

  PLAYER_DEFS.forEach(def => {
    const card = document.createElement('div');
    card.className = 'pcard';
    card.innerHTML = `
      <div class="pcard-avatar" style="border-color:${def.color};background:${def.color}22">
        <span>${def.emoji}</span>
      </div>
      <div class="pcard-name" style="color:${def.color}">${def.name}</div>
      <div class="pcard-role">${def.role}</div>
      <div class="pcard-passive">${def.passiveName}</div>
    `;
    card.addEventListener('click', () => {
      if (selected.has(def.id)) {
        selected.delete(def.id);
        card.classList.remove('selected');
      } else {
        selected.add(def.id);
        card.classList.add('selected');
      }
      const btn = $('btn-start');
      btn.disabled = selected.size < 2;
      $('select-hint').textContent = selected.size < 2
        ? 'Sélectionne au moins 2 joueurs'
        : `${selected.size} joueur(s) prêts — Go !`;
    });
    grid.appendChild(card);
  });

  $('btn-start').addEventListener('click', () => {
    startGame([...selected]);
  });
}

// ── GAME START ────────────────────────────────────────────────────────────────
function startGame(playerIds) {
  state = createGame(playerIds);
  playerMap = new Map(state.players.map(p => [p.id, p]));
  showScreen('game');
  resizeCanvas();
  updateUI();
  renderFrame();
}

// ── CANVAS ─────────────────────────────────────────────────────────────────────
const canvas = $('game-canvas');

function resizeCanvas() {
  canvas.width = Math.max(200, window.innerWidth - 256);
  canvas.height = Math.max(200, window.innerHeight - 48);
}
window.addEventListener('resize', () => { resizeCanvas(); renderFrame(); });

function renderFrame(previewGrid = null) {
  if (!state) return;
  render(canvas, state, playerMap, hoveredKey, previewGrid);
}

// Mouse interaction
canvas.addEventListener('mousemove', e => {
  if (!state || state.phase === PHASE.SIM) return;
  const rect = canvas.getBoundingClientRect();
  const { ox, oy, scale } = computeOffset(canvas);
  const mx = (e.clientX - rect.left - ox) / scale;
  const my = (e.clientY - rect.top - oy) / scale;
  const { q, r } = pixelToHex(mx, my);
  const k = hexKey(q, r);

  if (k !== hoveredKey) {
    hoveredKey = k;
    renderFrame();
    showTooltip(e, q, r, k);
  }
});

canvas.addEventListener('mouseleave', () => {
  hoveredKey = null;
  $('tooltip').classList.add('hidden');
  renderFrame();
});

canvas.addEventListener('click', e => {
  if (!state) return;
  if (state.phase !== PHASE.PLACE && state.phase !== PHASE.SETUP) return;

  const rect = canvas.getBoundingClientRect();
  const { ox, oy, scale } = computeOffset(canvas);
  const mx = (e.clientX - rect.left - ox) / scale;
  const my = (e.clientY - rect.top - oy) / scale;
  const { q, r } = pixelToHex(mx, my);

  if (tryPlace(state, q, r)) {
    renderFrame();
    updateUI();

    // Auto-advance if no cells left
    const left = placeCellsLeft(state);
    if (left <= 0) {
      setTimeout(() => {
        if (state.phase === PHASE.SETUP) advanceSetup();
        else advancePlacement();
      }, 300);
    }
  }
});

function showTooltip(e, q, r, k) {
  const tip = $('tooltip');
  const owner = state.grid.get(k);
  const lm = LANDMARKS.find(l => hexKey(l.q, l.r) === k);
  if (!lm && !owner && hoveredKey) { tip.classList.add('hidden'); return; }

  let html = '';
  if (lm) {
    html += `<div class="tt-name">${lm.emoji} ${lm.name}</div>`;
    html += `<div class="tt-info">${lm.label}</div>`;
    html += `<div class="tt-info">${lm.bonusDesc}</div>`;
    if (owner) {
      const p = playerMap.get(owner);
      html += `<div style="color:${p?.color || '#fff'};margin-top:4px">Contrôlé par ${p?.name}</div>`;
    }
  } else if (owner) {
    const p = playerMap.get(owner);
    html += `<div class="tt-name" style="color:${p?.color}">${p?.name}</div>`;
    html += `<div class="tt-info">${p?.role}</div>`;
  }

  tip.innerHTML = html;
  tip.style.left = (e.clientX + 14) + 'px';
  tip.style.top = (e.clientY - 10) + 'px';
  tip.classList.remove('hidden');
}

// ── SETUP PHASE ───────────────────────────────────────────────────────────────
function advanceSetup() {
  endSetupTurn(state);
  updateUI();
  if (state.phase === PHASE.PLACE) {
    addLog(state, `Tour ${state.round} — ${getCurrentPlayer(state).name} joue`, 'hi');
  }
  renderFrame();
}

// ── PLACEMENT PHASE ───────────────────────────────────────────────────────────
function advancePlacement() {
  endPlaceTurn(state);
  updateUI();
  if (state.phase === PHASE.SIM) {
    startSimulation();
  } else {
    addLog(state, `${getCurrentPlayer(state).name} joue…`);
    renderFrame();
  }
}

// ── SIMULATION ────────────────────────────────────────────────────────────────
function startSimulation() {
  simStep = 0;
  $('btn-end-turn').classList.add('hidden');
  $('btn-run-sim').classList.add('hidden');
  addLog(state, '▶ Simulation en cours…', 'hi');
  updateUI();

  simInterval = setInterval(() => {
    runStep(state);
    flashCanvas(canvas);
    renderFrame();
    simStep++;

    if (simStep >= SIM_GENERATIONS) {
      clearInterval(simInterval);
      afterSimulation(state);
      updateUI();
      renderFrame();

      if (state.phase === PHASE.VICTORY) {
        setTimeout(showVictory, 800);
      } else if (state.phase === PHASE.MINIGAME) {
        setTimeout(startMinigame, 500);
      } else {
        $('btn-end-turn').classList.remove('hidden');
      }
    }
  }, SIM_STEP_MS);
}

// ── POWERS ────────────────────────────────────────────────────────────────────
$('btn-power').addEventListener('click', () => {
  const cp = getCurrentPlayer(state);
  if (!cp || cp.cooldown > 0) return;

  if (cp.passiveId === 'lone_survivor') {
    // Vision Tactique: show preview
    const preview = stepGeneration(state.grid, state.players, state.fortifiedCells);
    renderPreviewOverlay(canvas, preview, state, playerMap);
    cp.cooldown = cp.powerCooldown;
    addLog(state, `👁 ${cp.name} utilise Vision Tactique !`, 'hi');
    updateUI();
    setTimeout(() => renderFrame(), 3000);
    return;
  }

  // Other powers activate immediately
  activatePower(state, state.currentPlayerIdx);
  updateUI();
  renderFrame();
});

// ── BUTTONS ───────────────────────────────────────────────────────────────────
$('btn-end-turn').addEventListener('click', () => {
  if (!state) return;
  if (state.phase === PHASE.SETUP) {
    advanceSetup();
  } else if (state.phase === PHASE.PLACE) {
    advancePlacement();
  }
});

$('btn-run-sim').addEventListener('click', () => {
  if (state && state.phase === PHASE.PLACE) {
    advancePlacement();
  }
});

// ── MINIGAME ──────────────────────────────────────────────────────────────────
let currentQuestion = null;
let minigameScores = {};

function startMinigame() {
  triviaAnswered = false;
  showScreen('minigame');
  currentQuestion = getRandomQuestion(state.usedMinigameQuestions);
  minigameScores = {};
  state.players.forEach(p => { minigameScores[p.id] = false; });

  $('mg-question').textContent = currentQuestion.q;
  const answersEl = $('mg-answers');
  answersEl.innerHTML = '';
  $('mg-result').classList.add('hidden');

  currentQuestion.answers.forEach((ans, i) => {
    const btn = document.createElement('button');
    btn.className = 'mg-btn';
    btn.textContent = `${['A','B','C','D'][i]}. ${ans.text}`;
    btn.dataset.correct = ans.correct;
    btn.addEventListener('click', () => onAnswerClick(btn, ans.correct, i));
    answersEl.appendChild(btn);
  });

  // All players answer (for local multiplayer we just pick the first correct click)
  startTriviaTimer();
}

let triviaSecondsLeft = TRIVIA_TIMER_S;
function startTriviaTimer() {
  triviaSecondsLeft = TRIVIA_TIMER_S;
  $('mg-timer').textContent = triviaSecondsLeft;
  $('mg-timer').classList.remove('urgent');

  triviaTimer = setInterval(() => {
    triviaSecondsLeft--;
    $('mg-timer').textContent = triviaSecondsLeft;
    if (triviaSecondsLeft <= 5) $('mg-timer').classList.add('urgent');
    if (triviaSecondsLeft <= 0) {
      clearInterval(triviaTimer);
      revealMinigameResult(null);
    }
  }, 1000);
}

let triviaAnswered = false;
function onAnswerClick(btn, correct, idx) {
  if (triviaAnswered) return;
  triviaAnswered = true;
  clearInterval(triviaTimer);

  // Mark all buttons
  $('mg-answers').querySelectorAll('.mg-btn').forEach((b, i) => {
    b.disabled = true;
    if (b.dataset.correct === 'true') b.classList.add('correct');
    else b.classList.add('wrong');
  });

  revealMinigameResult(correct ? 'first_correct' : null);
}

function revealMinigameResult(winnerId) {
  triviaAnswered = false;
  const result = $('mg-result');
  result.classList.remove('hidden');

  // For local multiplayer, first person to click correct wins
  // Minigame winner gets 3 bonus cells
  let winnerPlayer = null;
  if (winnerId === 'first_correct') {
    // We'll give the bonus to the current player who answered
    winnerPlayer = getCurrentPlayer(state);
  }

  $('mg-result-text').textContent = winnerPlayer
    ? `✅ Bonne réponse ! ${winnerPlayer.name} gagne 3 cellules bonus !`
    : `❌ Temps écoulé ! ${currentQuestion.explanation}`;

  $('mg-scores').textContent = currentQuestion.explanation;
  $('btn-mg-continue').onclick = () => {
    showScreen('game');
    resizeCanvas();
    afterMinigame(state, winnerPlayer?.id || null, 3);
    updateUI();
    renderFrame();
    $('btn-end-turn').classList.remove('hidden');
  };
}

// ── VICTORY ───────────────────────────────────────────────────────────────────
function showVictory() {
  const winner = playerMap.get(state.winnerId);
  $('victory-name').textContent = winner.name;
  $('victory-name').style.color = winner.color;
  $('victory-type').textContent = victoryLabel(state.victoryCondition);

  const sb = getScoreBoard(state);
  const stats = $('victory-stats');
  stats.innerHTML = sb.map(({ player: p, score }) => `
    <div class="vstat">
      <span class="vstat-val" style="color:${p.color}">${score.total}</span>
      <span class="vstat-lbl">${p.name}</span>
    </div>
  `).join('');

  showScreen('victory');
}

$('btn-replay').addEventListener('click', () => {
  state = null;
  showScreen('lobby');
  buildLobby();
});

// ── UI UPDATE ─────────────────────────────────────────────────────────────────
function updateUI() {
  if (!state) return;
  const cp = getCurrentPlayer(state);

  // Header
  $('lbl-round').textContent = `Tour ${state.round} / ${MAX_ROUNDS}`;
  $('lbl-phase').textContent = `Phase : ${phaseLabel(state.phase)}`;
  if (cp) {
    $('turn-banner').textContent = `${cp.emoji} ${cp.name}`;
    $('turn-banner').style.color = cp.color;
  }

  // Victory bars
  updateVictoryBars();

  // Current player panel
  if (cp) {
    $('cp-name').textContent = cp.name;
    $('cp-name').style.color = cp.color;
    $('cp-role').textContent = cp.role;

    const left = placeCellsLeft(state);
    $('cp-cells-left').textContent = state.phase === PHASE.SIM
      ? 'Simulation en cours…'
      : `Cellules à placer : ${left}`;

    $('cp-passive').textContent = `✦ ${cp.passiveName} : ${cp.passiveDesc}`;
    $('cp-power-desc').textContent = `⚡ ${cp.powerName} : ${cp.powerDesc}`;

    const powerBtn = $('btn-power');
    const canUsePower = cp.cooldown === 0 && state.phase === PHASE.PLACE;
    powerBtn.disabled = !canUsePower;
    powerBtn.textContent = cp.cooldown > 0
      ? `⏳ Cooldown : ${cp.cooldown} tour(s)`
      : '✨ Activer Pouvoir';
  }

  // Scores
  updateScores();

  // Buttons
  const inPlacement = state.phase === PHASE.PLACE || state.phase === PHASE.SETUP;
  $('btn-end-turn').classList.toggle('hidden', !inPlacement);
  $('btn-run-sim').classList.toggle('hidden', !inPlacement);

  // Log
  const logEl = $('event-log');
  logEl.innerHTML = state.log.slice(0, 20).map(e =>
    `<div class="log-entry ${e.cls || ''}">${e.msg}</div>`
  ).join('');
}

function updateScores() {
  const sb = getScoreBoard(state);
  $('scores-list').innerHTML = sb.map(({ player: p, score }) => `
    <div class="score-row">
      <span class="score-dot" style="background:${p.color}"></span>
      <span class="score-name">${p.name}</span>
      <span class="score-val">${score.total}pt</span>
    </div>
    <div class="score-row" style="padding-left:16px;font-size:11px;color:#7a7a9a">
      ${score.cells} cellules · ${score.landmarks} landmarks
    </div>
  `).join('');
}

function updateVictoryBars() {
  const bars = $('victory-bars');
  // Domination progress
  const totalCells = [...state.grid.values()].filter(Boolean).length || 1;
  const cellCounts = countCells(state.grid);
  const domPct = Math.max(...state.players.map(p => (cellCounts[p.id] || 0) / totalCells));
  const domLeader = state.players.find(p => (cellCounts[p.id] || 0) / totalCells === domPct);

  // Culture progress
  const culturePcts = state.players.map(p => {
    const owned = CULTURE_LANDMARKS.filter(lm => state.grid.get(hexKey(lm.q, lm.r)) === p.id).length;
    return { p, owned };
  });
  const cultureLeader = culturePcts.reduce((a, b) => a.owned >= b.owned ? a : b);

  bars.innerHTML = `
    <div class="victory-bar-item">
      <span class="vb-label">⚔ Domination</span>
      <div class="vb-track"><div class="vb-fill" style="width:${Math.round(domPct*100)}%;background:${domLeader?.color||'#888'}"></div></div>
      <span style="font-size:10px;color:${domLeader?.color||'#888'}">${Math.round(domPct*100)}%</span>
    </div>
    <div class="victory-bar-item">
      <span class="vb-label">🏛 Culture</span>
      <div class="vb-track"><div class="vb-fill" style="width:${Math.round(cultureLeader.owned/CULTURE_LANDMARKS.length*100)}%;background:${cultureLeader.p.color}"></div></div>
      <span style="font-size:10px;color:${cultureLeader.p.color}">${cultureLeader.owned}/${CULTURE_LANDMARKS.length}</span>
    </div>
  `;
}

function phaseLabel(phase) {
  return {
    setup: 'Installation',
    place: 'Placement',
    sim: 'Simulation GoL',
    minigame: 'Mini-jeu',
    victory: 'Victoire !',
  }[phase] || phase;
}

// hexKey helper used in main (re-exported from hex.js already)
function hexKeyLocal(q, r) { return `${q},${r}`; }

// ── INIT ──────────────────────────────────────────────────────────────────────
buildLobby();
showScreen('lobby');
