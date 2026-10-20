'use strict';
/* Party Night — static site, host-authoritative multiplayer over PeerJS (WebRTC).
   The host's phone runs the game and sends each player their own screen. */

const app = document.getElementById('app');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const rid = () => Math.random().toString(36).slice(2, 10);
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.random() * a.length | 0];


/* Draw without repeats: remembers what was used (also across sessions on this device) */
const seen = {};
function draw(key, arr, n) {
  let s = seen[key];
  if (!s) { try { s = new Set(JSON.parse(localStorage.getItem('pn-' + key) || '[]')); } catch (e) { s = new Set(); } seen[key] = s; }
  const out = [];
  while (out.length < n) {
    let left = arr.map((_, i) => i).filter(i => !s.has(i) && !out.includes(i));
    if (!left.length) { s.clear(); left = arr.map((_, i) => i).filter(i => !out.includes(i)); }
    const i = pick(left); out.push(i); s.add(i);
  }
  try { localStorage.setItem('pn-' + key, JSON.stringify([...s])); } catch (e) {}
  return out.map(i => arr[i]);
}

let me = { id: '', name: '' }, isHost = false, code = '', peer = null, hostConn = null, H = null, conns = {}, cur = { key: '' };
/* name is remembered across visits; the player id is per tab (sessionStorage) so two tabs on one device are two different players */
try { me.name = localStorage.getItem('pn-name') || ''; } catch (e) {}
try { me.id = sessionStorage.getItem('pn-id') || ''; } catch (e) {}
if (!me.id) { me.id = rid(); try { sessionStorage.setItem('pn-id', me.id); } catch (e) {} }

/* ---------- client rendering ---------- */
const openD = {};   /* remembers which collapsible sections the player opened, across re-renders */
function show(v) {
  const keep = {}, fid = document.activeElement && document.activeElement.id;
  if (v.key === cur.key) app.querySelectorAll('input[id]').forEach(i => keep[i.id] = i.value);
  cur = v; app.innerHTML = v.html;
  app.className = v.wide ? 'wide' : '';
  const root = document.documentElement.style;
  if (v.ac) root.setProperty('--ac', v.ac); else root.removeProperty('--ac');
  app.querySelectorAll('details[id]').forEach(d => { if (openD[d.id]) d.open = true; });
  for (const id in keep) { const el = document.getElementById(id); if (el) el.value = keep[id]; }
  if (fid && keep[fid] !== undefined) { const el = document.getElementById(fid); if (el) { el.focus(); try { el.setSelectionRange(el.value.length, el.value.length); } catch (e) {} } }
  app.querySelectorAll('[data-left]').forEach(e => { e.dataset.end = Date.now() + (+e.dataset.left); delete e.dataset.done; });
}
setInterval(() => app.querySelectorAll('[data-end]').forEach(e => {
  const l = Math.max(0, +e.dataset.end - Date.now());
  e.textContent = Math.floor(l / 60000) + ':' + String(Math.floor(l / 1000) % 60).padStart(2, '0');
  if (!l && !e.dataset.done) { e.dataset.done = 1; flush(); }
}), 250);

function sendAct(a, v, text) {
  if (isHost) hostAct(me.id, a, v, text);
  else if (hostConn && hostConn.open) hostConn.send({ t: 'act', a, v, text });
}
function flush() { app.querySelectorAll('[data-live]').forEach(i => sendAct('ans', i.dataset.live, i.value)); }
app.addEventListener('click', e => {
  const b = e.target.closest('[data-a]'); if (!b || b.disabled) return;
  const a = b.dataset.a;
  if (a === 'pick-game') return gameScreen(b.dataset.v);
  if (a === 'home') return home();
  if (a === 'go-host') return goHost(b.dataset.v);
  if (a === 'go-join') return goJoin();
  if (a === 'reload') return location.reload();
  let text = '';
  if (b.dataset.from) text = b.dataset.from.split(',').map(id => document.getElementById(id).value).join('\n');
  sendAct(a, b.dataset.v, text);
});
app.addEventListener('change', e => { if (e.target.dataset && e.target.dataset.live) sendAct('ans', e.target.dataset.live, e.target.value); });
app.addEventListener('toggle', e => { const d = e.target; if (d.tagName === 'DETAILS' && d.id) openD[d.id] = d.open; }, true);
app.addEventListener('input', e => {
  if (e.target.id !== 'nm') return;
  me.name = e.target.value.trim(); try { localStorage.setItem('pn-name', me.name); } catch (x) {}
});
app.addEventListener('keydown', e => {
  if (e.key !== 'Enter' || !e.target.id) return;
  if (e.target.id === 'cd') { const j = app.querySelector('[data-a="go-join"]'); if (j) j.click(); return; }
  const b = app.querySelector('[data-from*="' + e.target.id + '"]'); if (b) b.click();
});

function err(msg) { show({ key: 'err', html: `<h1>Oops<span>.</span></h1><p>${esc(msg)}</p><button data-a="reload">Back to start</button>` }); }

/* ---------- home: pick a game -> game screen -> create room ---------- */
const gameCard = (k, g, attrs, on = false) => `<button class="gcard ${on ? 'on' : ''}" style="--gc:${g.ac}" ${attrs}><span class="tile">${g.icon}</span><span class="gtxt"><b>${g.name}</b><span>${g.tag}</span><span class="meta">${g.min}–${g.max} players · ${g.time}</span></span></button>`;
const steps = g => `<ol class="steps">${g.how.map(x => `<li><span>${x}</span></li>`).join('')}</ol><p class="mute" style="margin:6px 0 0"><b>Scoring.</b> ${g.score}</p>`;
const gameHead = g => `<div class="hero"><span class="tile lg" style="--gc:${g.ac}">${g.icon}</span><div><h1 class="sm">${g.name}</h1><p class="mute">${g.tag}</p></div></div>`;

function home(msg) {
  show({ key: 'home', wide: true, html: `<div class="top"><div><h1>Party Night<span>.</span></h1>
  <p class="mute">Pick a game, make a room, play on everyone’s own phone.</p></div>
  <div class="card"><label class="lbl" for="nm" style="margin-top:0">Your name</label>
  <input id="nm" maxlength="16" placeholder="Your name" value="${esc(me.name)}" autocomplete="off">
  <label class="lbl" for="cd">Joining a friend? Enter their room code</label>
  <div class="joinrow"><input id="cd" maxlength="4" placeholder="CODE" autocomplete="off" autocapitalize="characters"><button class="alt" data-a="go-join">Join</button></div>
  ${msg ? `<p class="err">${esc(msg)}</p>` : ''}</div></div>
  <h2 class="sec">Or host a game. Pick one</h2>
  <div class="games">${Object.entries(GAMES).map(([k, g]) => gameCard(k, g, `data-a="pick-game" data-v="${k}"`)).join('')}</div>` });
}
function gameScreen(k, msg) {
  const g = GAMES[k]; if (!g) return home();
  show({ key: 'game-' + k, ac: g.ac, wide: true, html: `<button class="back" data-a="home">← All games</button>
  <div class="split"><div class="main">${gameHead(g)}
  <div class="chips"><span class="chip">${g.min}–${g.max} players</span><span class="chip">${g.time}</span><span class="chip">Same room, own phones</span></div>
  <div class="card"><h2>How it works</h2>${steps(g)}</div></div>
  <div class="side"><div class="card"><label class="lbl" for="nm" style="margin-top:0">Your name</label>
  <input id="nm" maxlength="16" placeholder="Your name" value="${esc(me.name)}" autocomplete="off">
  <button data-a="go-host" data-v="${k}">Create room</button>
  ${msg ? `<p class="err">${esc(msg)}</p>` : ''}
  <p class="mute c" style="margin:6px 0 0">You’ll get a 4-letter code to share. You can switch games later without making a new room.</p></div></div></div>` });
}
function readName(back = home) {
  const v = document.getElementById('nm').value.trim();
  if (!v) { back('Enter your name first.'); return null; }
  me.name = v; try { localStorage.setItem('pn-name', v); } catch (e) {} return v;
}

/* ---------- networking ---------- */
function goHost(k) {
  if (!GAMES[k]) return home();
  if (!readName(m => gameScreen(k, m))) return;
  code = Array.from({ length: 4 }, () => pick([...'ABCDEFGHJKLMNPQRSTUVWXYZ'])).join('');
  peer = new Peer('partyhub-' + code.toLowerCase());
  peer.on('error', e => { if (e.type === 'unavailable-id') { peer.destroy(); goHost(k); } else err('Connection problem (' + e.type + ').'); });
  peer.on('open', () => {
    isHost = true;
    H = { game: null, sel: k, picking: false, players: {}, late: {}, custom: [], g: null, tm: null };
    H.players[me.id] = { name: me.name, score: 0, on: true };
    push();
  });
  peer.on('connection', c => {
    c.on('data', d => hostMsg(c, d));
    c.on('close', () => { for (const p in conns) if (conns[p] === c) { delete conns[p]; if (H.players[p]) H.players[p].on = false; push(); } });
  });
}
function goJoin() {
  if (!readName(home)) return;
  const c = document.getElementById('cd').value.trim().toLowerCase();
  if (c.length !== 4) return home('Enter the 4-letter code.');
  code = c.toUpperCase();
  show({ key: 'joining', html: `<h1>Joining<span>.</span></h1><p class="mute">Connecting to room ${esc(code)}…</p><button class="alt" data-a="reload">Cancel</button>` });
  const jt = setTimeout(() => err('Couldn’t reach that room. Check the code, and make sure the host still has the game open.'), 12000);
  peer = new Peer();
  peer.on('error', e => { clearTimeout(jt); err(e.type === 'peer-unavailable' ? 'No game found with that code.' : 'Connection problem (' + e.type + ').'); });
  peer.on('open', () => {
    hostConn = peer.connect('partyhub-' + c, { reliable: true });
    hostConn.on('open', () => hostConn.send({ t: 'join', id: me.id, name: me.name }));
    hostConn.on('data', d => { if (d.t === 'view') { clearTimeout(jt); show(d.v); } });
    hostConn.on('error', () => { clearTimeout(jt); err('Couldn’t connect to the host.'); });
    hostConn.on('close', () => { clearTimeout(jt); err('Lost connection to the host.'); });
  });
}
function hostMsg(c, d) {
  if (d.t === 'join') {
    const id = String(d.id).slice(0, 20), name = String(d.name || 'Player').slice(0, 16);
    conns[id] = c;
    if (H.players[id]) { H.players[id].on = true; H.players[id].name = name; }
    else if (!H.game) H.players[id] = { name, score: 0, on: true };
    else H.late[id] = { name };
    push();
  } else if (d.t === 'act') {
    const id = Object.keys(conns).find(p => conns[p] === c);
    if (id) hostAct(id, d.a, d.v, String(d.text ?? '').slice(0, 300));
  }
}
function push() {
  if (!isHost || !H) return;
  for (const id in H.players) {
    const v = H.game ? GAMES[H.game].view(id) : hubView(id);
    if (id === me.id) show(v); else if (conns[id] && conns[id].open) conns[id].send({ t: 'view', v });
  }
  for (const id in H.late) if (conns[id] && conns[id].open) conns[id].send({ t: 'view', v: { key: 'late', html: '<h2>Game in progress</h2><p>You’ll join when the host returns to the lobby.</p>' } });
}

/* ---------- helpers for host-side views ---------- */
const ids = () => Object.keys(H.players), live = () => ids().filter(i => H.players[i].on), nm = i => esc(H.players[i].name), isH = p => p === me.id;
const hb = (pid, a, label, cls = '') => isH(pid) ? `<button class="${cls}" data-a="${a}">${label}</button>` : '<p class="mute c">Waiting for the host…</p>';
const wide = v => (v.wide = true, v);
const gameAc = () => { const k = H && (H.game || H.sel); return k && GAMES[k] ? GAMES[k].ac : ''; };
const scr = (key, html) => ({ key, html, ac: gameAc() });
const tmr = ms => `<b class="timer" data-left="${Math.max(0, ms)}">…</b>`;
const board = () => ids().sort((x, y) => H.players[y].score - H.players[x].score).map(i => `<div class="row"><span>${nm(i)}</span><b>${H.players[i].score}</b></div>`).join('');
const add = (i, n) => { if (H.players[i]) H.players[i].score += n; };
const done = (pid, extra = '') => scr('end', `<h2>Final scores</h2><div class="card">${board()}</div>${extra}${hb(pid, 'hub', 'Back to lobby')}`);

function toHub() {
  clearTimeout(H.tm); H.game = null; H.g = null;
  for (const id in H.late) H.players[id] = { name: H.late[id].name, score: 0, on: true };
  H.late = {}; push();
}
function hostAct(pid, a, v, text) {
  if (!H.players[pid]) return;
  if (a === 'cq') { const t = (text || '').trim(); if (t && H.custom.length < 30) { H.custom.push(t.slice(0, 120)); push(); } return; }
  if (a === 'hub') { if (isH(pid)) toHub(); return; }
  if (a === 'tok' && isH(pid)) { const t = (text || '').trim(); try { if (t) localStorage.setItem('pn-token', t); } catch (e) {} ghStatus = 'token saved'; syncBank(); push(); return; }
  if (a === 'tokx' && isH(pid)) { try { localStorage.removeItem('pn-token'); } catch (e) {} ghStatus = 'token removed'; push(); return; }
  if (!H.game) {
    if (!isH(pid)) return;
    if (a === 'sel' && GAMES[v]) { H.sel = v; H.picking = false; push(); }
    if (a === 'chg') { H.picking = true; push(); }
    if (a === 'chgx') { H.picking = false; push(); }
    if (a === 'start') {
      const g = GAMES[H.sel], n = ids().length;
      if (n < g.min || n > g.max) return;
      ids().forEach(i => H.players[i].score = 0);
      H.game = H.sel; g.start();
    }
    return;
  }
  GAMES[H.game].act(pid, a, v, text);
}
function bankCard() {
  const inner = !GH
    ? `<p class="mute">${bank.length} saved on this device. Host the site on GitHub Pages to share the bank through the repo.</p>`
    : `<p class="mute">${bank.length} group-written prompts · ${esc(ghStatus)}</p>` + (hasToken()
      ? '<button class="alt" data-a="tokx">Remove GitHub token from this device</button>'
      : '<p class="mute">To save new prompts to the repo, paste a fine-grained GitHub token for this repo only (Contents: read and write). It stays on this device.</p><input id="tk" type="password" autocomplete="off" placeholder="GitHub token"><button class="alt" data-a="tok" data-from="tk">Save token</button>');
  return `<details class="card" id="bnk"><summary>Prompt bank</summary>${inner}</details>`;
}
/* Extras that only appear in the lobby of the game that uses them */
function lobbyExtras(pid) {
  if (H.sel === 'sil') return `<details class="card" id="cqd"><summary>Add your own quotes (${H.custom.length})</summary><p class="mute">Lines your group would actually say. They get mixed into the quote pool.</p><input id="cq" maxlength="120" placeholder="Something your group would say"><button class="alt" data-a="cq" data-from="cq">Add quote</button></details>`;
  if (H.sel === 'real' && isH(pid)) return bankCard();
  return '';
}
function hubView(pid) {
  const n = ids().length, k = H.sel, g = GAMES[k], ok = n >= g.min && n <= g.max, host = isH(pid), pick = host && H.picking;
  const need = n < g.min ? `Need ${g.min - n} more player${g.min - n === 1 ? '' : 's'}` : `Too many players (max ${g.max})`;
  if (pick) return wide(scr('hub-pick', `<button class="back" data-a="chgx">← Back to room</button><h2 class="sec">Switch game</h2><div class="games">${Object.entries(GAMES).map(([x, y]) => gameCard(x, y, `data-a="sel" data-v="${x}"`, x === k)).join('')}</div>`));
  return wide(scr('hub-' + k + '-' + H.custom.length, `<div class="split"><div class="main">${gameHead(g)}
  <div class="card codecard"><p class="lbl">Room code</p><div class="code">${code}</div><p class="mute">Friends open this site, enter the code and tap Join.</p></div>
  <div class="card"><h2>Players (${n})</h2>${ids().map(i => `<span class="pill ${H.players[i].on ? '' : 'off'}">${nm(i)}</span>`).join('')}<p class="mute" style="margin:8px 0 0">${g.name} needs ${g.min}–${g.max} players.</p></div>
  ${host ? `<button data-a="start" ${ok ? '' : 'disabled'}>${ok ? 'Start ' + g.name : need}</button><button class="alt" data-a="chg">Change game</button>` : '<p class="mute c">Waiting for the host to start…</p>'}</div>
  <div class="side"><div class="card"><h2>How to play</h2>${steps(g)}</div>
  ${lobbyExtras(pid)}</div></div>`));
}

/* ================= GAMES ================= */
const GAMES = {};

/* ---------- 1. Say It Like ---------- */
GAMES.sil = {
  name: 'Say It Like…', blurb: 'Two perform a line in five styles, the room votes.', min: 4, max: 8,
  start() {
    const n = ids().length, order = shuffle(ids()), total = Math.min(n, 6), pairs = [];
    for (let r = 0; r < total; r++) pairs.push([order[(2 * r) % n], order[(2 * r + 1) % n]]);
    H.g = { pairs, total, round: 0 }; this.round();
  },
  round() {
    const g = H.g;
    Object.assign(g, { quote: H.custom.length && Math.random() < .5 ? pick(H.custom) : draw('silq', SIL_Q, 1)[0], styles: draw('sils', SIL_S, 5), si: 0, votes: {}, tally: null, phase: 'perform' }); push();
  },
  reveal() {
    const g = H.g, p = g.pairs[g.round]; let a = 0, b = 0;
    Object.values(g.votes).forEach(v => v === 'A' ? a++ : b++);
    add(p[0], a); add(p[1], b); g.tally = { a, b }; g.phase = 'reveal'; push();
  },
  act(pid, a, v) {
    const g = H.g, p = g.pairs[g.round];
    if (a === 'vote' && g.phase === 'vote' && !p.includes(pid) && (v === 'A' || v === 'B')) {
      g.votes[pid] = v;
      if (Object.keys(g.votes).length >= live().filter(i => !p.includes(i)).length) this.reveal(); else push();
      return;
    }
    if (!isH(pid)) return;
    if (a === 'open') { g.phase = 'vote'; g.votes = {}; push(); }
    else if (a === 'reveal' && g.phase === 'vote') this.reveal();
    else if (a === 'next') { if (g.si < 4) { g.si++; g.phase = 'perform'; } else g.phase = 'roundEnd'; push(); }
    else if (a === 'nround') { if (g.round + 1 >= g.total) { g.phase = 'final'; push(); } else { g.round++; this.round(); } }
  },
  view(pid) {
    const g = H.g;
    if (g.phase === 'final') return done(pid);
    const p = g.pairs[g.round], A = nm(p[0]), B = nm(p[1]), perf = p.includes(pid), sty = esc(g.styles[g.si]);
    let h = `<p class="mute c">Round ${g.round + 1} of ${g.total}${g.phase === 'roundEnd' ? '' : ', style ' + (g.si + 1) + ' of 5'}</p>
    <div class="card"><p class="c mute"><span class="a">A: ${A}</span> vs <span class="b">B: ${B}</span></p><div class="quote">“${esc(g.quote)}”</div></div>`;
    if (g.phase === 'perform') h += `<div class="card"><p class="c mute">${perf ? 'Your style' : 'Style'}</p><div class="big">${sty}</div><p class="c mute">${perf ? 'Say the line out loud in this style.' : 'Watch both performances, then vote.'}</p></div>` + hb(pid, 'open', 'Open voting');
    else if (g.phase === 'vote') {
      const mine = g.votes[pid];
      h += `<div class="card"><div class="big">${sty}</div></div>`;
      if (perf) h += '<p class="c mute">The room is voting on you.</p>';
      else if (mine) h += `<p class="c"><b>Vote locked: ${mine}.</b> Waiting for the others.</p>`;
      else h += `<p class="c mute">Who did it better?</p><button data-a="vote" data-v="A">A: ${A}</button><button class="t" data-a="vote" data-v="B">B: ${B}</button>`;
      h += `<p class="c mute">${Object.keys(g.votes).length} vote(s) in</p>` + (isH(pid) ? '<button class="alt" data-a="reveal">Reveal now</button>' : '');
    } else if (g.phase === 'reveal') {
      const t = g.tally, w = t.a > t.b ? A : t.b > t.a ? B : null;
      h += `<div class="card"><div class="big">${sty}</div><div class="quote"><span class="a">${A} ${t.a}</span> : <span class="b">${t.b} ${B}</span></div><p class="c"><b>${w ? w + ' takes it.' : 'Tie.'}</b></p></div>` + hb(pid, 'next', g.si < 4 ? 'Next style' : 'Round results');
    } else h += `<div class="card"><h2>Scores</h2>${board()}</div>` + hb(pid, 'nround', g.round + 1 >= g.total ? 'Final results' : 'Next round');
    return scr('sil-' + g.round + g.phase + g.si, h);
  }
};

/* ---------- 2. Spyfall ---------- */
GAMES.spy = {
  name: 'Spyfall', blurb: 'One of you doesn’t know the location. Find them.', min: 3, max: 8,
  start() { this.deal(); },
  deal() {
    clearTimeout(H.tm);
    const ms = 8 * 60000, loc = draw('loc', LOCS, 1)[0], pool = [loc, ...shuffle(LOCS.filter(l => l !== loc)).slice(0, 23)].sort(), g = H.g = { loc, pool, spy: pick(live()), phase: 'play', endsAt: Date.now() + ms, votes: {}, target: null, acc: null, res: null };
    H.tm = setTimeout(() => { if (H.g === g && g.phase !== 'result') { g.phase = 'final'; g.votes = {}; push(); } }, ms);
    push();
  },
  end(winner, why) {
    const g = H.g; g.phase = 'result'; g.res = { winner, why }; clearTimeout(H.tm);
    if (winner === 'spy') add(g.spy, 2); else live().filter(i => i !== g.spy).forEach(i => add(i, 1));
    push();
  },
  act(pid, a, v) {
    const g = H.g, name = i => H.players[i] ? H.players[i].name : '?';
    if (a === 'accuse' && g.phase === 'play' && H.players[v] && v !== pid) { g.phase = 'acc'; g.target = v; g.acc = pid; g.votes = { [pid]: 'y' }; push(); }
    else if (a === 'vote' && g.phase === 'acc' && pid !== g.target && (v === 'y' || v === 'n')) {
      g.votes[pid] = v;
      if (v === 'n') { g.phase = 'play'; g.votes = {}; push(); }
      else if (live().filter(i => i !== g.target).every(i => g.votes[i] === 'y')) {
        g.target === g.spy ? this.end('group', `${name(g.target)} was caught by a unanimous vote.`) : this.end('spy', `The group wrongly accused ${name(g.target)}.`);
      } else push();
    } else if (a === 'guess' && pid === g.spy && g.phase !== 'result' && g.pool[v]) {
      g.pool[v] === g.loc ? this.end('spy', `${name(g.spy)} guessed the location correctly.`) : this.end('group', `${name(g.spy)} guessed ${g.pool[v]} and was wrong.`);
    } else if (a === 'fv' && g.phase === 'final' && H.players[v] && v !== pid) {
      g.votes[pid] = v;
      if (live().every(i => g.votes[i])) {
        const c = {}; Object.values(g.votes).forEach(x => c[x] = (c[x] || 0) + 1);
        const top = Math.max(...Object.values(c)), lead = Object.keys(c).filter(x => c[x] === top);
        lead.length === 1 && lead[0] === g.spy ? this.end('group', `The group voted out ${name(g.spy)}.`) : this.end('spy', lead.length > 1 ? 'The final vote was tied.' : `The group voted out ${name(lead[0])} instead.`);
      } else push();
    } else if (a === 'next' && isH(pid) && g.phase === 'result') this.deal();
  },
  view(pid) {
    const g = H.g, h0 = isH(pid), spy = pid === g.spy;
    if (g.phase === 'result') return scr('spy-r', `<h2>${g.res.winner === 'spy' ? 'The spy wins' : 'The group wins'}</h2><div class="card"><p>The spy was <b>${nm(g.spy)}</b>.</p><p>The location was <b>${g.loc}</b>.</p><p class="mute">${esc(g.res.why)}</p></div><div class="card">${board()}</div>${hb(pid, 'next', 'Next round')}${h0 ? '<button class="alt" data-a="hub">Back to lobby</button>' : ''}`);
    let h = `<p class="c mute">Time left</p><p class="c">${tmr(g.endsAt - Date.now())}</p>`;
    h += spy ? '<div class="card spy"><h2>You are the spy</h2><p>Figure out the location without giving yourself away.</p></div>' : `<div class="card"><p class="mute">Location</p><div class="quote">${g.loc}</div></div>`;
    if (g.phase === 'play') {
      h += '<p class="c mute">Take turns asking each other questions out loud.</p>';
      h += `<details class="card"><summary>Accuse someone</summary>${ids().filter(i => i !== pid).map(i => `<button class="alt" data-a="accuse" data-v="${i}">${nm(i)}</button>`).join('')}</details>`;
      if (spy) h += `<details class="card"><summary>Guess the location</summary><div class="grid">${g.pool.map((l, i) => `<button class="alt" data-a="guess" data-v="${i}">${l}</button>`).join('')}</div></details>`;
    } else if (g.phase === 'acc') {
      h += `<div class="card"><h2>Accusing ${nm(g.target)}</h2><p>${nm(g.acc)} thinks they’re the spy. Everyone else has to agree.</p>`;
      if (pid === g.target) h += '<p class="mute">The others are voting on you.</p>';
      else if (g.votes[pid]) h += '<p><b>Vote locked.</b></p>';
      else h += '<button data-a="vote" data-v="y">Yes, it’s them</button><button class="alt" data-a="vote" data-v="n">No</button>';
      h += '</div>';
      if (spy) h += `<details class="card"><summary>Guess the location</summary><div class="grid">${g.pool.map((l, i) => `<button class="alt" data-a="guess" data-v="${i}">${l}</button>`).join('')}</div></details>`;
    } else {
      h += `<div class="card"><h2>Time’s up. Who’s the spy?</h2>${g.votes[pid] ? '<p><b>Vote locked.</b> Waiting for the others.</p>' : ids().filter(i => i !== pid).map(i => `<button class="alt" data-a="fv" data-v="${i}">${nm(i)}</button>`).join('')}</div>`;
    }
    if (!spy) h += `<p class="mute c">${g.pool.join(', ')}</p>`;
    return scr('spy-' + g.phase + g.target + g.spy, h);
  }
};

/* ---------- 3. The Real Me ---------- */
const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
let bank = []; try { bank = JSON.parse(localStorage.getItem('pn-bank') || '[]'); } catch (e) {}
const rmAll = () => RM_P.concat(bank);
function saveToBank(t) {
  const k = norm(t);
  if (!k || bank.length >= 1000 || rmAll().some(x => norm(x) === k)) return;
  bank.push(t); try { localStorage.setItem('pn-bank', JSON.stringify(bank)); } catch (e) {}
}
/* Shared prompt bank: bank.json in the GitHub repo, read via the GitHub API and written with the host's token */
const GH = (() => { const h = location.hostname; if (!h.endsWith('.github.io')) return null; return { o: h.split('.')[0], r: location.pathname.split('/')[1] || h }; })();
const ghUrl = () => `https://api.github.com/repos/${GH.o}/${GH.r}/contents/bank.json`;
const ghHead = () => { let t = ''; try { t = localStorage.getItem('pn-token') || ''; } catch (e) {} return Object.assign({ Accept: 'application/vnd.github+json' }, t ? { Authorization: 'Bearer ' + t } : {}); };
const hasToken = () => { try { return !!localStorage.getItem('pn-token'); } catch (e) { return false; } };
const b64d = x => decodeURIComponent(escape(atob(x.replace(/\n/g, ''))));
const b64e = x => btoa(unescape(encodeURIComponent(x)));
let ghStatus = GH ? 'loading…' : 'local only (open the site on GitHub Pages to share the bank)';
function mergeBank(arr) {
  const have = new Set(rmAll().map(norm));
  (Array.isArray(arr) ? arr : []).forEach(t => { const k = typeof t === 'string' ? norm(t) : ''; if (k && !have.has(k) && bank.length < 1000) { have.add(k); bank.push(t.slice(0, 120)); } });
  try { localStorage.setItem('pn-bank', JSON.stringify(bank)); } catch (e) {}
}
async function loadBank() {
  if (!GH) return;
  try { const r = await fetch(ghUrl(), { headers: ghHead() }); if (!r.ok) throw new Error(r.status); mergeBank(JSON.parse(b64d((await r.json()).content))); ghStatus = hasToken() ? 'synced with GitHub' : 'loaded from GitHub (add a token to save new prompts)'; }
  catch (e) { try { mergeBank(await (await fetch('bank.json', { cache: 'no-store' })).json()); ghStatus = 'loaded from bank.json'; } catch (e2) { ghStatus = 'couldn’t load bank.json'; } }
  if (H && !H.game) push();
}
async function syncBank(tries = 2) {
  if (!GH || !hasToken()) { if (GH) ghStatus = 'saved on this device only (add a GitHub token in the lobby)'; return; }
  try {
    const g = await fetch(ghUrl(), { headers: ghHead() }); let sha, cur = [];
    if (g.ok) { const j = await g.json(); sha = j.sha; cur = JSON.parse(b64d(j.content)); } else if (g.status !== 404) throw new Error(g.status);
    const have = new Set(cur.map(norm)); bank.forEach(t => { const k = norm(t); if (!have.has(k)) { have.add(k); cur.push(t); } });
    const put = await fetch(ghUrl(), { method: 'PUT', headers: Object.assign({ 'Content-Type': 'application/json' }, ghHead()), body: JSON.stringify({ message: 'Add Real Me prompts', content: b64e(JSON.stringify(cur, null, 1)), sha }) });
    if (put.status === 409 && tries > 1) return syncBank(tries - 1);
    if (!put.ok) throw new Error(put.status);
    ghStatus = 'saved to GitHub';
  } catch (e) { ghStatus = 'GitHub save failed (' + e.message + ')'; }
  if (H && !H.game) push();
}
GAMES.real = {
  name: 'The Real Me', blurb: 'Spot a friend’s true story among fakes. Built-in or player-written prompts.', min: 4, max: 8,
  start() { H.g = { phase: 'mode', prompts: {}, answers: {}, written: {}, round: 0 }; push(); },
  dealBuiltIn() { const g = H.g; ids().forEach(i => g.prompts[i] = draw('rmp', rmAll(), 3)); g.phase = 'answer'; push(); },
  dealCustom() {
    const g = H.g, pool = [];
    for (const [by, arr] of Object.entries(g.written)) arr.forEach(t => { pool.push({ t, by }); saveToBank(t); });
    ids().forEach(i => {
      const mine = [...new Set(shuffle(pool.filter(x => x.by !== i)).map(x => x.t))].slice(0, 3);
      g.prompts[i] = mine.length < 3 ? mine.concat(draw('rmp', rmAll(), 3 - mine.length)) : mine;
    });
    g.phase = 'answer'; push(); syncBank();
  },
  begin() { const g = H.g; g.order = shuffle(live()); g.total = g.order.length; g.round = 0; this.ask(); },
  ask() {
    const g = H.g, subj = g.order[g.round], qi = Math.random() * 3 | 0;
    Object.assign(g, { phase: 'fake', subj, q: g.prompts[subj][qi], real: g.answers[subj][qi], fakes: {}, votes: {}, opts: null }); push();
  },
  guess() {
    const g = H.g, opts = [{ t: g.real, by: g.subj, real: 1 }];
    for (const [by, t] of Object.entries(g.fakes)) if (norm(t) !== norm(g.real)) opts.push({ t, by });
    g.opts = shuffle(opts); g.phase = 'guess'; push();
  },
  reveal() {
    const g = H.g;
    for (const [voter, i] of Object.entries(g.votes)) { const o = g.opts[i]; if (o.real) { add(voter, 2); add(g.subj, 1); } else add(o.by, 1); }
    g.phase = 'reveal'; push();
  },
  voters() { return live().filter(i => i !== H.g.subj); },
  act(pid, a, v, text) {
    const g = H.g, t = (text || '').trim();
    if (a === 'mode' && g.phase === 'mode' && isH(pid)) { if (v === 'built') this.dealBuiltIn(); else if (v === 'custom') { g.phase = 'write'; push(); } }
    else if (a === 'write' && g.phase === 'write') {
      const arr = (text || '').split('\n').map(x => x.trim());
      if (arr.length === 2 && arr.every(Boolean) && norm(arr[0]) !== norm(arr[1])) { g.written[pid] = arr; live().every(i => g.written[i]) ? this.dealCustom() : push(); }
    } else if (a === 'sub' && g.phase === 'answer') {
      const arr = text.split('\n').map(s => s.trim());
      if (arr.length === 3 && arr.every(Boolean)) { g.answers[pid] = arr; live().every(i => g.answers[i]) ? this.begin() : push(); }
    } else if (a === 'fake' && g.phase === 'fake' && pid !== g.subj && t) {
      g.fakes[pid] = t; this.voters().every(i => g.fakes[i]) ? this.guess() : push();
    } else if (a === 'pick' && g.phase === 'guess' && pid !== g.subj && g.opts[v] && g.opts[v].by !== pid) {
      g.votes[pid] = +v; this.voters().every(i => g.votes[i] !== undefined) ? this.reveal() : push();
    } else if (isH(pid)) {
      if (a === 'skip' && g.phase === 'write') this.dealCustom();
      else if (a === 'skip' && g.phase === 'fake') this.guess();
      else if (a === 'skip' && g.phase === 'guess') this.reveal();
      else if (a === 'next' && g.phase === 'reveal') { if (g.round + 1 >= g.total) { g.phase = 'final'; push(); } else { g.round++; this.ask(); } }
    }
  },
  view(pid) {
    const g = H.g, skip = isH(pid) ? '<button class="alt" data-a="skip">Skip waiting</button>' : '';
    if (g.phase === 'final') return done(pid);
    if (g.phase === 'mode') return scr('rm-m', `<h2>The Real Me</h2><p class="mute">${rmAll().length} prompts available, ${bank.length} of them written by your group.</p>` + (isH(pid) ? '<button data-a="mode" data-v="built">Use built-in prompts</button><button class="t" data-a="mode" data-v="custom">Players write the prompts</button>' : '<p class="mute c">The host is choosing a mode…</p>'));
    if (g.phase === 'write') {
      if (g.written[pid]) return scr('rm-wrw', `<h2>Questions locked</h2><p class="mute">${Object.keys(g.written).length} of ${live().length} players are done.</p>` + skip);
      return scr('rm-wr', `<h2>Write 2 questions</h2><p class="mute">Questions the others will answer about themselves, like “What’s the worst haircut you’ve ever had?” They’re saved to the host’s prompt bank for future games.</p><div class="card"><input id="w0" maxlength="120" autocomplete="off" placeholder="Question 1"><input id="w1" maxlength="120" autocomplete="off" placeholder="Question 2"></div><button data-a="write" data-from="w0,w1">Lock in</button>`);
    }
    if (g.phase === 'answer') {
      if (g.answers[pid]) return scr('rm-w', `<h2>Answers locked</h2><p class="mute">${Object.keys(g.answers).length} of ${live().length} players are done.</p>`);
      return scr('rm-a', `<h2>Answer honestly</h2><p class="mute">These will be mixed with fakes later. Short answers work best.</p><div class="card">${g.prompts[pid].map((q, i) => `<p>${esc(q)}</p><input id="a${i}" maxlength="80" autocomplete="off">`).join('')}</div><button data-a="sub" data-from="a0,a1,a2">Lock in</button>`);
    }
    const s = nm(g.subj), head = `<p class="mute c">Round ${g.round + 1} of ${g.total}</p><div class="card"><p class="mute">${s} was asked</p><div class="quote">${esc(g.q)}</div></div>`;
    if (g.phase === 'fake') {
      if (pid === g.subj) return scr('rm-f' + g.round, head + `<p>Everyone’s writing a fake version of your answer:</p><div class="card"><b>${esc(g.real)}</b></div>` + skip);
      if (g.fakes[pid]) return scr('rm-fw' + g.round, head + `<p><b>Fake locked:</b> ${esc(g.fakes[pid])}</p><p class="mute">${Object.keys(g.fakes).length} of ${this.voters().length} in.</p>` + skip);
      return scr('rm-f' + g.round, head + `<p>Write a believable fake answer for ${s}.</p><input id="f" maxlength="80" autocomplete="off"><button data-a="fake" data-from="f">Submit fake</button>` + skip);
    }
    if (g.phase === 'guess') {
      const mine = g.votes[pid];
      return scr('rm-g' + g.round, head + `<p class="c">${pid === g.subj ? 'The room is guessing which answer is yours.' : 'Which one is real?'}</p>` + g.opts.map((o, i) => pid === g.subj ? `<div class="card">${esc(o.t)}</div>` : `<button class="${mine === i ? 't' : 'alt'}" data-a="pick" data-v="${i}" ${o.by === pid ? 'disabled' : ''}>${esc(o.t)}${o.by === pid ? ' (yours)' : ''}</button>`).join('') + `<p class="mute c">${Object.keys(g.votes).length} of ${this.voters().length} voted</p>` + skip);
    }
    const rows = g.opts.map((o, i) => { const vs = Object.entries(g.votes).filter(x => x[1] === i).map(x => nm(x[0])).join(', '); return `<div class="card" style="${o.real ? 'border-color:var(--t)' : ''}"><b>${esc(o.t)}</b><p class="mute">${o.real ? 'The real one, from ' + s : 'Fake by ' + nm(o.by)}${vs ? '. Picked by ' + vs : ''}</p></div>`; }).join('');
    return scr('rm-r' + g.round, head + rows + `<div class="card">${board()}</div>` + hb(pid, 'next', g.round + 1 >= g.total ? 'Final results' : 'Next round'));
  }
};

/* ---------- 4. Rapid Fire Categories ---------- */
const RF_L = [...'ABCDEFGHIJKLMNOPRSTW'], RF_MS = 75000;
GAMES.rapid = {
  name: 'Rapid Fire', blurb: 'Type answers fast. Matching answers cancel out.', min: 2, max: 8,
  start() { H.g = { round: 0, total: 4 }; this.round(); },
  round() {
    const g = H.g;
    Object.assign(g, { letter: pick(RF_L), cats: draw('rfc', RF_C, 6), ans: {}, phase: 'play', endsAt: Date.now() + RF_MS, res: null });
    clearTimeout(H.tm); H.tm = setTimeout(() => { if (H.g === g && g.phase === 'play') this.score(); }, RF_MS + 1800);
    push();
  },
  score() {
    const g = H.g, L = g.letter.toLowerCase();
    g.res = g.cats.map((c, ci) => {
      const rows = ids().map(p => ({ p, t: ((g.ans[p] || {})[ci] || '').trim() }));
      rows.forEach(r => { const n = norm(r.t); r.n = n; r.st = !n ? 'none' : (n[0] === L && n.length > 1) ? 'ok' : 'bad'; });
      const cnt = {}; rows.filter(r => r.st === 'ok').forEach(r => cnt[r.n] = (cnt[r.n] || 0) + 1);
      rows.forEach(r => { if (r.st === 'ok') { if (cnt[r.n] > 1) r.st = 'dupe'; else add(r.p, 1); } });
      return { c, rows };
    });
    g.phase = 'review'; push();
  },
  act(pid, a, v, text) {
    const g = H.g;
    if (a === 'ans' && g.phase === 'play') (g.ans[pid] = g.ans[pid] || {})[v] = String(text || '').slice(0, 40);
    else if (a === 'next' && isH(pid) && g.phase === 'review') { if (g.round + 1 >= g.total) { g.phase = 'final'; push(); } else { g.round++; this.round(); } }
  },
  view(pid) {
    const g = H.g;
    if (g.phase === 'final') return done(pid);
    if (g.phase === 'play') return scr('rf-' + g.round, `<p class="mute c">Round ${g.round + 1} of ${g.total}</p><div class="letter">${g.letter}</div><p class="c">${tmr(g.endsAt - Date.now())}</p><p class="mute c">Every answer must start with ${g.letter}. Unique answers score. Answers shared with anyone else score nothing.</p>${g.cats.map((c, i) => `<p style="margin:12px 0 0">${esc(c)}</p><input id="r${i}" data-live="${i}" autocomplete="off" autocapitalize="words" spellcheck="false">`).join('')}`);
    const label = { ok: '+1', dupe: 'duplicate', bad: 'invalid', none: '' };
    const rows = g.res.map(r => `<div class="card"><b>${esc(r.c)}</b>${r.rows.filter(x => x.st !== 'none').map(x => `<div class="row"><span class="${x.st === 'ok' ? 'ok' : 'bad'}">${esc(x.t)}</span><span class="mute">${nm(x.p)} ${label[x.st]}</span></div>`).join('') || '<p class="mute">No answers.</p>'}</div>`).join('');
    return scr('rf-r' + g.round, `<h2>Round ${g.round + 1}: ${g.letter}</h2>${rows}<div class="card"><h2>Scores</h2>${board()}</div>` + hb(pid, 'next', g.round + 1 >= g.total ? 'Final results' : 'Next round'));
  }
};

/* ---------- 5. Fakeout (bluff the room with fake answers) ---------- */
const FB_ROUNDS = 6;
const blankQ = (q, fill) => esc(q).replace('___', fill === undefined ? '<span class="blank"></span>' : `<span class="blank">${esc(fill)}</span>`);
GAMES.fake = {
  name: 'Fakeout', blurb: 'Bluff the room with fake answers to weird true facts.', min: 3, max: 8,
  start() { H.g = { qs: draw('fbq', FB_Q, FB_ROUNDS), round: 0, total: FB_ROUNDS }; this.ask(); },
  ask() {
    const g = H.g, f = g.qs[g.round];
    Object.assign(g, { q: f.q, real: f.a, fakes: {}, close: {}, votes: {}, opts: null, phase: 'write' }); push();
  },
  vote() {
    const g = H.g, opts = [{ t: g.real, by: [], real: 1 }];
    for (const [p, t] of Object.entries(g.fakes)) {
      const o = opts.find(x => !x.real && norm(x.t) === norm(t));
      if (o) o.by.push(p); else opts.push({ t, by: [p] });
    }
    g.opts = shuffle(opts); g.phase = 'vote'; push();
  },
  reveal() {
    const g = H.g;
    for (const [voter, i] of Object.entries(g.votes)) { const o = g.opts[i]; if (o.real) add(voter, 2); else o.by.forEach(p => add(p, 1)); }
    g.phase = 'reveal'; push();
  },
  act(pid, a, v, text) {
    const g = H.g, t = (text || '').trim().slice(0, 40);
    if (a === 'fake' && g.phase === 'write' && t && !g.fakes[pid]) {
      if (norm(t) === norm(g.real)) { g.close[pid] = 1; push(); return; }
      g.fakes[pid] = t; delete g.close[pid];
      live().every(i => g.fakes[i]) ? this.vote() : push();
    } else if (a === 'pick' && g.phase === 'vote' && g.opts[v] && !g.opts[v].by.includes(pid)) {
      g.votes[pid] = +v;
      live().every(i => g.votes[i] !== undefined) ? this.reveal() : push();
    } else if (isH(pid)) {
      if (a === 'skip' && g.phase === 'write') this.vote();
      else if (a === 'skip' && g.phase === 'vote') this.reveal();
      else if (a === 'next' && g.phase === 'reveal') { if (g.round + 1 >= g.total) { g.phase = 'final'; push(); } else { g.round++; this.ask(); } }
    }
  },
  view(pid) {
    const g = H.g, skip = isH(pid) ? '<button class="alt" data-a="skip">Skip waiting</button>' : '';
    if (g.phase === 'final') return done(pid);
    const head = fill => `<p class="mute c">Fact ${g.round + 1} of ${g.total}</p><div class="card"><div class="quote">${blankQ(g.q, fill)}</div></div>`;
    if (g.phase === 'write') {
      if (g.fakes[pid]) return scr('fk-w' + g.round, head() + `<p><b>Fake locked:</b> ${esc(g.fakes[pid])}</p><p class="mute">${Object.keys(g.fakes).length} of ${live().length} in.</p>` + skip);
      return scr('fk-f' + g.round, head() + '<p>Write a fake answer that sounds true. Every player you fool earns you a point.</p>' + (g.close[pid] ? '<p class="bad" style="text-decoration:none">That’s too close to the truth. Try a different one.</p>' : '') + '<input id="f" maxlength="40" autocomplete="off"><button data-a="fake" data-from="f">Submit fake</button>' + skip);
    }
    if (g.phase === 'vote') {
      const mine = g.votes[pid];
      return scr('fk-v' + g.round, head() + '<p class="c">Which one is the truth?</p>' + g.opts.map((o, i) => o.by.includes(pid) ? `<button class="alt" disabled>${esc(o.t)} (yours)</button>` : `<button class="${mine === i ? 't' : 'alt'}" data-a="pick" data-v="${i}">${esc(o.t)}</button>`).join('') + `<p class="mute c">${Object.keys(g.votes).length} of ${live().length} voted.</p>` + skip);
    }
    const rows = g.opts.map((o, i) => {
      const vs = Object.entries(g.votes).filter(x => x[1] === i).map(x => nm(x[0])).join(', ');
      return `<div class="card" style="${o.real ? 'border-color:var(--t)' : ''}"><b>${esc(o.t)}</b><p class="mute">${o.real ? 'The truth, +2 for each player who found it' : 'Fake by ' + o.by.map(p => nm(p)).join(' and ') + ', +1 per player fooled'}${vs ? '. Picked by ' + vs : '. Nobody picked it'}</p></div>`;
    }).join('');
    return scr('fk-r' + g.round, head(g.real) + rows + `<div class="card"><h2>Scores</h2>${board()}</div>` + hb(pid, 'next', g.round + 1 >= g.total ? 'Final results' : 'Next fact'));
  }
};

/* ---------- 6. Quip Off (head-to-head funny answers) ---------- */
GAMES.quip = {
  name: 'Quip Off', blurb: 'Write funny answers head to head. The room votes.', min: 3, max: 8,
  start() {
    const order = shuffle(ids()), n = order.length, qs = draw('qpp', QP_P, n), mine = {}, pairs = [];
    order.forEach((p, k) => mine[p] = [k, (k + 1) % n]);
    for (let k = 0; k < n; k++) pairs.push([order[(k + n - 1) % n], order[k]]);
    H.g = { n, qs, mine, pairs, res: qs.map(() => ({})), sub: {}, order: shuffle(qs.map((_, k) => k)), m: 0, phase: 'write' };
    push();
  },
  begin() {
    const g = H.g;
    g.pairs.forEach((p, k) => p.forEach(x => { if (!g.res[k][x]) g.res[k][x] = '(no answer)'; }));
    g.m = 0; this.match();
  },
  match() {
    const g = H.g, k = g.order[g.m];
    g.cur = { k, pair: g.pairs[k], ord: shuffle([0, 1]) }; g.votes = {}; g.phase = 'vote';
    this.voters().length ? push() : this.reveal();
  },
  voters() { return live().filter(i => !H.g.cur.pair.includes(i)); },
  reveal() {
    const g = H.g, c = g.cur, cnt = [0, 0];
    Object.values(g.votes).forEach(i => cnt[i]++);
    const tot = cnt[0] + cnt[1];
    c.cnt = cnt; c.sweep = tot >= 2 && (cnt[0] === tot || cnt[1] === tot);
    c.pair.forEach((p, i) => add(p, cnt[i] + (c.sweep && cnt[i] === tot ? 2 : 0)));
    g.phase = 'reveal'; push();
  },
  act(pid, a, v, text) {
    const g = H.g;
    if (a === 'sub' && g.phase === 'write' && g.mine[pid] && !g.sub[pid]) {
      const arr = (text || '').split('\n').map(s => s.trim().slice(0, 80));
      if (arr.length === 2 && arr.every(Boolean)) {
        g.mine[pid].forEach((k, j) => g.res[k][pid] = arr[j]); g.sub[pid] = 1;
        live().every(i => g.sub[i]) ? this.begin() : push();
      }
    } else if (a === 'vote' && g.phase === 'vote' && g.cur.ord[v] !== undefined && this.voters().includes(pid)) {
      g.votes[pid] = g.cur.ord[v];
      this.voters().every(i => g.votes[i] !== undefined) ? this.reveal() : push();
    } else if (isH(pid)) {
      if (a === 'skip' && g.phase === 'write') this.begin();
      else if (a === 'skip' && g.phase === 'vote') this.reveal();
      else if (a === 'next' && g.phase === 'reveal') { if (g.m + 1 >= g.n) { g.phase = 'final'; push(); } else { g.m++; this.match(); } }
    }
  },
  view(pid) {
    const g = H.g, skip = isH(pid) ? '<button class="alt" data-a="skip">Skip waiting</button>' : '';
    if (g.phase === 'final') return done(pid);
    if (g.phase === 'write') {
      if (g.sub[pid]) return scr('qp-w', `<h2>Answers locked</h2><p class="mute">${Object.keys(g.sub).length} of ${live().length} players are done.</p>` + skip);
      return scr('qp-a', `<h2>Be funny</h2><p class="mute">Two prompts. Short and sharp wins. Other players vote on yours.</p><div class="card">${g.mine[pid].map((k, j) => `<p><b>${esc(g.qs[k])}</b></p><input id="a${j}" maxlength="80" autocomplete="off">`).join('')}</div><button data-a="sub" data-from="a0,a1">Lock in</button>` + skip);
    }
    const c = g.cur, head = `<p class="mute c">Matchup ${g.m + 1} of ${g.n}</p><div class="card"><div class="quote">${esc(g.qs[c.k])}</div></div>`;
    if (g.phase === 'vote') {
      if (c.pair.includes(pid)) return scr('qp-v' + g.m, head + `<p class="c">Your answer is up. Keep a straight face.</p><div class="card"><b>${esc(g.res[c.k][pid])}</b></div><p class="mute c">${Object.keys(g.votes).length} of ${this.voters().length} voted.</p>` + skip);
      const mine = g.votes[pid];
      return scr('qp-v' + g.m, head + '<p class="c">Which answer is funnier?</p>' + c.ord.map((pi, i) => `<button class="${mine === pi ? 't' : 'alt'}" data-a="vote" data-v="${i}">${esc(g.res[c.k][c.pair[pi]])}</button>`).join('') + `<p class="mute c">${Object.keys(g.votes).length} of ${this.voters().length} voted.</p>` + skip);
    }
    const tot = c.cnt[0] + c.cnt[1];
    const rows = c.pair.map((p, i) => `<div class="card" style="${c.cnt[i] > c.cnt[1 - i] ? 'border-color:var(--t)' : ''}"><b>${esc(g.res[c.k][p])}</b><p class="mute">${nm(p)}, ${c.cnt[i]} vote${c.cnt[i] === 1 ? '' : 's'}${c.sweep && c.cnt[i] === tot ? ', clean sweep +2' : ''}</p></div>`).join('');
    return scr('qp-r' + g.m, head + rows + `<div class="card"><h2>Scores</h2>${board()}</div>` + hb(pid, 'next', g.m + 1 >= g.n ? 'Final results' : 'Next matchup'));
  }
};

/* ---------- 7. Poser (one player is faking it) ---------- */
const PS_MS = 20000;
GAMES.poser = {
  name: 'Poser', blurb: 'Everyone acts out a secret card in the room. One of you is faking it.', min: 4, max: 8,
  start() {
    const order = shuffle(ids()).slice(0, Math.min(ids().length, 6));
    H.g = { order, total: order.length, round: 0 }; this.round();
  },
  round() {
    const g = H.g, c = draw('psc', PS_C, 1)[0];
    Object.assign(g, { faker: g.order[g.round], cat: c.cat, task: c.task, phase: 'brief', votes: {}, res: null });
    clearTimeout(H.tm); push();
  },
  go() {
    const g = H.g; g.phase = 'act'; g.endsAt = Date.now() + PS_MS;
    clearTimeout(H.tm); H.tm = setTimeout(() => { if (H.g === g && g.phase === 'act') this.toVote(); }, PS_MS + 1500);
    push();
  },
  toVote() { clearTimeout(H.tm); H.g.phase = 'vote'; H.g.votes = {}; push(); },
  reveal() {
    const g = H.g, cnt = {};
    ids().forEach(i => cnt[i] = 0);
    Object.values(g.votes).forEach(t => { if (cnt[t] !== undefined) cnt[t]++; });
    const top = Math.max(0, ...ids().filter(i => i !== g.faker).map(i => cnt[i]));
    const caught = cnt[g.faker] > top;
    Object.entries(g.votes).forEach(([v, t]) => { if (t === g.faker && v !== g.faker) add(v, 2); });
    if (!caught) add(g.faker, 3);
    g.res = { cnt, caught }; g.phase = 'reveal'; push();
  },
  act(pid, a, v) {
    const g = H.g;
    if (a === 'vote' && g.phase === 'vote' && v !== pid && H.players[v]) {
      g.votes[pid] = v;
      live().every(i => g.votes[i] !== undefined) ? this.reveal() : push();
    } else if (isH(pid)) {
      if (a === 'go' && g.phase === 'brief') this.go();
      else if (a === 'tovote' && g.phase === 'act') this.toVote();
      else if (a === 'skip' && g.phase === 'vote') this.reveal();
      else if (a === 'next' && g.phase === 'reveal') { if (g.round + 1 >= g.total) { g.phase = 'final'; push(); } else { g.round++; this.round(); } }
    }
  },
  view(pid) {
    const g = H.g;
    if (g.phase === 'final') return done(pid);
    const isF = pid === g.faker, head = `<p class="mute c">Round ${g.round + 1} of ${g.total}</p>`;
    const card = isF
      ? `<div class="card spy"><p class="mute c">${esc(g.cat)}</p><div class="quote">You’re the poser</div><p class="c mute">You don’t know the card. Watch everyone else and blend in.</p></div>`
      : `<div class="card"><p class="mute c">${esc(g.cat)}</p><div class="quote">${esc(g.task)}</div></div>`;
    if (g.phase === 'brief') return scr('ps-b' + g.round, head + card + '<p class="mute c">Keep your screen to yourself. One player doesn’t know the card.</p>' + hb(pid, 'go', 'Everyone’s ready. Start!'));
    if (g.phase === 'act') return scr('ps-a' + g.round, head + card + `<p class="c">${tmr(g.endsAt - Date.now())}</p><p class="c">${isF ? 'Do something that looks right.' : 'Act it out now, and watch who looks unsure.'}</p>` + hb(pid, 'tovote', 'Go to voting', 'alt'));
    if (g.phase === 'vote') {
      const mine = g.votes[pid];
      return scr('ps-v' + g.round, head + '<p class="c">Who’s the poser?</p>' + ids().filter(i => i !== pid).map(i => `<button class="${mine === i ? 't' : 'alt'}" data-a="vote" data-v="${i}">${nm(i)}</button>`).join('') + `<p class="mute c">${Object.keys(g.votes).length} of ${live().length} voted.</p>` + (isH(pid) ? '<button class="alt" data-a="skip">Skip waiting</button>' : ''));
    }
    const r = g.res, rows = ids().sort((x, y) => r.cnt[y] - r.cnt[x]).map(i => `<div class="row"><span>${nm(i)}${i === g.faker ? ' (poser)' : ''}</span><b>${r.cnt[i]}</b></div>`).join('');
    return scr('ps-r' + g.round, head + `<div class="card"><p class="mute c">${esc(g.cat)}</p><div class="quote">${esc(g.task)}</div></div><h2>${nm(g.faker)} was the poser. ${r.caught ? 'Caught! +2 for each player who named them.' : 'They got away with it, +3.'}</h2><div class="card"><p class="mute">Votes received</p>${rows}</div><div class="card"><h2>Scores</h2>${board()}</div>` + hb(pid, 'next', g.round + 1 >= g.total ? 'Final results' : 'Next round'));
  }
};

/* ---------- game info shown on the picker, game screen and lobby ---------- */
const META = {
  sil: { icon: '🎭', ac: '#f97316', time: '~20 min', tag: 'Perform the same line in five styles. The room picks the winner.',
    how: ['Each round, two players get the same line, like “Sir, this is a Wendy’s.”', 'The line comes with five delivery styles, one at a time. Both players say it out loud in that style.', 'Everyone else votes on who did it better.', 'Votes are points. Most points after all rounds wins.'],
    score: 'One point per vote you get. One round per player, up to 6.' },
  spy: { icon: '🕵️', ac: '#5b8cff', time: '~8 min a round', tag: 'One of you has no idea where you are. Find the spy.',
    how: ['Everyone sees the same secret location, except one player: the spy.', 'Take turns asking each other questions out loud. Be specific enough to prove you know, vague enough that the spy can’t tell.', 'Think someone’s the spy? Accuse them. Everyone else has to agree.', 'The spy can try to name the location at any time. An 8-minute timer ends the round with a final vote.'],
    score: 'Group wins: +1 each. Spy wins: +2.' },
  real: { icon: '🪞', ac: '#4ade80', time: '~25 min', tag: 'Spot your friend’s true answer hidden among the fakes.',
    how: ['The host picks the prompts: built-in ones, or ones your group writes.', 'Everyone answers three prompts about themselves, honestly.', 'Each round one player’s answer is the target. Everyone else writes a believable fake.', 'All answers are shuffled together. Vote for the one you think is real.'],
    score: 'Find the real answer: +2 (and +1 to its owner). Fool someone with your fake: +1 each.' },
  rapid: { icon: '⚡', ac: '#fb7185', time: '~8 min', tag: 'Type answers fast. Matching answers cancel out.',
    how: ['Each round shows a letter and six categories.', 'You have 75 seconds to type an answer for each one, all starting with that letter.', 'When time’s up, answers are compared. Anything two players share is wiped.', 'Four rounds. Highest total wins.'],
    score: '+1 for each unique, valid answer.' },
  fake: { icon: '🤥', ac: '#2dd4bf', time: '~15 min', tag: 'Bluff the room with fake answers to weird true facts.',
    how: ['A strange but true fact appears with a blank in it.', 'Everyone writes a fake answer that sounds true.', 'All answers, plus the real one, are shuffled. Vote for the truth.', 'Six facts. Best bluffer wins.'],
    score: 'Find the truth: +2. Each player your fake fools: +1.' },
  quip: { icon: '😂', ac: '#38bdf8', time: '~15 min', tag: 'Write funny answers head to head. The room votes.',
    how: ['Everyone gets two prompts and writes a funny answer to each.', 'Every prompt becomes a matchup between two players’ answers.', 'Everyone not in the matchup votes for the funnier one.', 'Short and sharp usually wins.'],
    score: '+1 per vote. Win every vote (with at least 2 voters) for a +2 bonus.' },
  poser: { icon: '🥸', ac: '#ef4444', time: '~15 min', tag: 'Everyone acts out a secret card. One of you is faking it.',
    how: ['Each round, everyone but one player sees the same secret card with something to act out.', 'The poser doesn’t see it and has to blend in.', 'Act it out for 20 seconds in the room, and watch who looks unsure.', 'Vote on who the poser is.'],
    score: 'Name the poser: +2. Poser escapes: +3. One round per player, up to 6.' }
};
for (const k in META) Object.assign(GAMES[k], META[k]);

loadBank();
if (typeof Peer === 'undefined') err('Couldn’t load the networking library. Check your internet connection.'); else home();
