const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

app.use(express.static(path.join(__dirname)));

// rooms: code → { host, sockets, state, betChoices, duelState }
const rooms = new Map();

function genCode() {
  return Math.random().toString(36).slice(2, 6).toUpperCase();
}

function roomInfo(room) {
  return {
    host: room.host,
    players: [...room.sockets.entries()].map(([sid, pid]) => ({ sid, pid })),
  };
}

io.on('connection', socket => {
  let myRoom = null;

  socket.on('create_room', cb => {
    let code;
    do { code = genCode(); } while (rooms.has(code));
    rooms.set(code, {
      host: socket.id,
      sockets: new Map(),
      state: null,
      betChoices: new Map(),
      duelState: null,
    });
    myRoom = code;
    socket.join(code);
    console.log(`[${code}] created by ${socket.id}`);
    cb({ code });
  });

  socket.on('join_room', ({ code }, cb) => {
    const room = rooms.get(code);
    if (!room) return cb({ error: 'Room introuvable' });
    myRoom = code;
    socket.join(code);
    console.log(`[${code}] joined by ${socket.id}`);
    cb({ ok: true, info: roomInfo(room) });
    io.to(code).emit('room_info', roomInfo(room));
  });

  socket.on('select_player', ({ playerId }) => {
    const room = rooms.get(myRoom);
    if (!room) return;
    room.sockets.delete(socket.id);
    const taken = playerId && [...room.sockets.values()].includes(playerId);
    if (!taken && playerId) room.sockets.set(socket.id, playerId);
    io.to(myRoom).emit('room_info', roomInfo(room));
  });

  socket.on('start_game', ({ state }) => {
    const room = rooms.get(myRoom);
    if (!room || room.host !== socket.id) return;
    room.state = state;
    io.to(myRoom).emit('game_started', { state });
    console.log(`[${myRoom}] game started`);
  });

  socket.on('sync_state', ({ state }) => {
    const room = rooms.get(myRoom);
    if (!room) return;
    const myPid  = room.sockets.get(socket.id);
    const curPid = room.state?.players?.[room.state?.idx]?.id;
    if (room.host !== socket.id && myPid !== curPid) return;
    room.state = state;
    socket.to(myRoom).emit('state_updated', { state });
  });

  // ── BETS ──
  socket.on('bet_choice', ({ choice }) => {
    const room = rooms.get(myRoom);
    if (!room) return;
    room.betChoices.set(socket.id, choice);
    io.to(myRoom).emit('bet_choices_updated', {
      choices: [...room.betChoices.entries()].map(([sid, ch]) => ({ sid, ch })),
    });
  });

  socket.on('clear_bet', () => {
    const room = rooms.get(myRoom);
    if (room) room.betChoices.clear();
  });

  socket.on('open_bet', data => socket.to(myRoom).emit('open_bet', data));

  // ── REACTIONS ──
  socket.on('reaction', data => {
    if (myRoom) io.to(myRoom).emit('reaction', data);
  });

  // ── REJOIN (déconnexion imprévue) ──
  socket.on('rejoin_room', ({ code, playerId }, cb) => {
    const room = rooms.get(code);
    if (!room) return cb({ error: 'Partie introuvable ou expirée' });
    if (!room.state) return cb({ error: 'La partie n\'a pas encore commencé' });
    myRoom = code;
    socket.join(code);
    // Retire l'ancienne entrée pour ce playerId
    for (const [sid, pid] of room.sockets) {
      if (pid === playerId) { room.sockets.delete(sid); break; }
    }
    room.sockets.set(socket.id, playerId);
    console.log(`[${code}] ${playerId} a rejoint la partie (reconnexion)`);
    cb({ ok: true, state: room.state });
    io.to(code).emit('room_info', roomInfo(room));
  });

  // ── Animation relay (dice + movement for waiting players) ──
  socket.on('dice_rolled', data => socket.to(myRoom).emit('dice_rolled', data));
  socket.on('move_step',   data => socket.to(myRoom).emit('move_step',   data));

  // ── DUELS ──
  // Challenger picks target → broadcast to ALL (io.to, not socket.to)
  socket.on('start_duel', ({ duel, challengerPid, targetPid }) => {
    const room = rooms.get(myRoom);
    if (!room) return;
    room.duelState = { duel, challengerPid, targetPid, rolls: {} };
    io.to(myRoom).emit('duel_started', { duel, challengerPid, targetPid });
    console.log(`[${myRoom}] duel: ${challengerPid} vs ${targetPid}`);
  });

  // A player (challenger or target) sends their die roll
  socket.on('duel_roll', ({ rawRoll }) => {
    const room = rooms.get(myRoom);
    if (!room || !room.duelState) return;
    const ds = room.duelState;
    const myPid = room.sockets.get(socket.id);
    if (myPid === ds.challengerPid) ds.rolls.challenger = rawRoll;
    else if (myPid === ds.targetPid) ds.rolls.target = rawRoll;
    // Broadcast partial update so everyone sees who has rolled
    io.to(myRoom).emit('duel_roll_update', {
      rolls: ds.rolls,
      challengerPid: ds.challengerPid,
      targetPid: ds.targetPid,
    });
    // Both rolled → broadcast final result
    if (ds.rolls.challenger !== undefined && ds.rolls.target !== undefined) {
      io.to(myRoom).emit('duel_complete', {
        duel: ds.duel,
        challengerPid: ds.challengerPid,
        targetPid: ds.targetPid,
        rolls: ds.rolls,
      });
      room.duelState = null;
    }
  });

  socket.on('disconnect', () => {
    const room = rooms.get(myRoom);
    if (!room) return;
    room.sockets.delete(socket.id);
    room.betChoices.delete(socket.id);
    if (room.host === socket.id) {
      const next = [...room.sockets.keys()][0];
      if (next) room.host = next;
      else { rooms.delete(myRoom); return; }
    }
    io.to(myRoom).emit('room_info', roomInfo(room));
    console.log(`[${myRoom}] ${socket.id} disconnected`);
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log(`Schloss server on http://localhost:${PORT}`));
