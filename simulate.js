'use strict';
// Simulation autonome — 100 parties complètes avec les 5 joueurs
// Node.js, aucune dépendance DOM

// ── STOPS & EDGES ─────────────────────────────────────────────────────────────
const STOPS = [
  { id:'start',    type:'start'  },
  { id:'p_sd',     type:'card',   deck:'money' },
  { id:'p_join',   type:'card',   deck:'love' },
  { id:'p_col52',  type:'story',  storyId:'college' },
  { id:'p_wassy',  type:'story',  storyId:'sponge_pseudo' },
  { id:'p_tractor',type:'story',  storyId:'pc_hs' },
  { id:'p_der',    type:'card',   deck:'love' },
  { id:'p_sd2',    type:'card',   deck:'gaming' },
  { id:'p_math',   type:'story',  storyId:'maths_avances' },
  { id:'p_chm1',   type:'story',  storyId:'gta_sa_rencontre' },
  { id:'p_colo',   type:'story',  storyId:'vide_grenier_52' },
  { id:'p_join2',  type:'card',   deck:'money' },
  { id:'p_enf3',   type:'card',   deck:'love' },
  { id:'p_wass2',  type:'story',  storyId:'soiree_village' },
  { id:'fork1',    type:'fork',   choices:[{next:'f1a'},{next:'f1b'}] },
  { id:'f1a',      type:'card',   deck:'gaming' },
  { id:'f1a2',     type:'card',   deck:'surprise' },
  { id:'f1b',      type:'card',   deck:'money' },
  { id:'f1b2',     type:'card',   deck:'gaming' },
  { id:'p_lycee',  type:'story',  storyId:'lycee_manaa' },
  { id:'p_bac1',   type:'story',  storyId:'jeanmaire' },
  { id:'p_lyc2',   type:'card',   deck:'gaming' },
  { id:'p_lyc3',   type:'story',  storyId:'volley_eps' },
  { id:'p_lyc4',   type:'story',  storyId:'ptitcuicui_2gt7' },
  { id:'p_lyc5',   type:'story',  storyId:'martinot' },
  { id:'p_lyc6',   type:'card',   deck:'love' },
  { id:'p_lyc7',   type:'story',  storyId:'bac' },
  { id:'p_lyc8',   type:'story',  storyId:'bac_reussi' },
  { id:'p_lyc9',   type:'card',   deck:'gaming' },
  { id:'fork_et',  type:'fork',   choices:[{next:'fe_a'},{next:'fe_b'}] },
  { id:'fe_a',     type:'card',   deck:'money' },
  { id:'fe_a2',    type:'story',  storyId:'colombey' },
  { id:'fe_a3',    type:'card',   deck:'surprise' },
  { id:'fe_a4',    type:'card',   deck:'love' },
  { id:'fe_b',     type:'card',   deck:'gaming' },
  { id:'fe_b2',    type:'story',  storyId:'supinfo' },
  { id:'fe_b3',    type:'card',   deck:'love' },
  { id:'fe_b4',    type:'card',   deck:'gaming' },
  { id:'p_arc',    type:'card',   deck:'surprise' },
  { id:'p_etu1',   type:'story',  storyId:'concours_robot' },
  { id:'p_etu2',   type:'card',   deck:'love' },
  { id:'p_etu3',   type:'story',  storyId:'cambriolage_supinfo' },
  { id:'p_etu4',   type:'story',  storyId:'commissariat_escalier' },
  { id:'p_mid',    type:'card',   deck:'money' },
  { id:'p_etu5',   type:'story',  storyId:'diplome_mention' },
  { id:'fork2',    type:'fork',   choices:[{next:'f2a'},{next:'f2b'}] },
  { id:'f2a',      type:'card',   deck:'surprise' },
  { id:'f2a2',     type:'story',  storyId:'knife' },
  { id:'f2a3',     type:'story',  storyId:'stage' },
  { id:'f2b',      type:'card',   deck:'love' },
  { id:'f2b2',     type:'story',  storyId:'bourbonne' },
  { id:'f2b3',     type:'card',   deck:'gaming' },
  { id:'p8',       type:'card',   deck:'love' },
  { id:'p8b',      type:'card',   deck:'gaming' },
  { id:'p_job1',   type:'story',  storyId:'casse_noisettes' },
  { id:'p_job2',   type:'card',   deck:'surprise' },
  { id:'p_act1',   type:'story',  storyId:'d619_bouchon' },
  { id:'p_act2',   type:'story',  storyId:'frein_casse' },
  { id:'p_act3',   type:'card',   deck:'love' },
  { id:'p_act4',   type:'story',  storyId:'impots_52' },
  { id:'p_act5',   type:'story',  storyId:'imprimeries_champagne' },
  { id:'p_act6',   type:'story',  storyId:'warzone_covid' },
  { id:'p_act7',   type:'card',   deck:'love' },
  { id:'p_act8',   type:'story',  storyId:'lafitte_textile' },
  { id:'p_act9',   type:'card',   deck:'money' },
  { id:'fork3',    type:'fork',   choices:[{next:'f3a'},{next:'f3b'},{next:'f3c'},{next:'f3d'}] },
  { id:'f3a',      type:'card',   deck:'career' },
  { id:'f3a2',     type:'card',   deck:'money' },
  { id:'f3b',      type:'card',   deck:'career' },
  { id:'f3b2',     type:'card',   deck:'money' },
  { id:'f3c',      type:'card',   deck:'career' },
  { id:'f3c2',     type:'card',   deck:'money' },
  { id:'f3d',      type:'card',   deck:'career' },
  { id:'f3d2',     type:'card',   deck:'money' },
  { id:'p_lang',   type:'story',  storyId:'mediegame' },
  { id:'p_car1',   type:'card',   deck:'surprise' },
  { id:'p_car2',   type:'story',  storyId:'ecommerce_cn' },
  { id:'p_mont',   type:'card',   deck:'gaming' },
  { id:'p_fayl',   type:'card',   deck:'love' },
  { id:'p_bourm',  type:'story',  storyId:'prime_refusee' },
  { id:'p_adu1',   type:'card',   deck:'love' },
  { id:'p_adu2',   type:'card',   deck:'surprise' },
  { id:'p_adu3',   type:'card',   deck:'gaming' },
  { id:'p_adu4',   type:'story',  storyId:'soiree_quentin' },
  { id:'p_adu5',   type:'story',  storyId:'lait_deborde' },
  { id:'p_adu6',   type:'story',  storyId:'veto_chat' },
  { id:'p_adu7',   type:'card',   deck:'love' },
  { id:'p_adu8',   type:'story',  storyId:'prime_innovation' },
  { id:'p_viad',   type:'story',  storyId:'clement_marie_ange' },
  { id:'fork4',    type:'fork',   choices:[{next:'f4a'},{next:'f4b'}] },
  { id:'f4a',      type:'card',   deck:'love' },
  { id:'f4a2',     type:'card',   deck:'surprise' },
  { id:'f4b',      type:'story',  storyId:'achat_maison' },
  { id:'f4b2',     type:'card',   deck:'gaming' },
  { id:'p_adu9',   type:'card',   deck:'love' },
  { id:'p_gex',    type:'card',   deck:'love' },
  { id:'p_fin1',   type:'story',  storyId:'demande' },
  { id:'p_fin2',   type:'card',   deck:'love' },
  { id:'p_fin3',   type:'card',   deck:'surprise' },
  { id:'p_fin4',   type:'card',   deck:'gaming' },
  { id:'p_fin5',   type:'card',   deck:'money' },
  { id:'p_fin6',   type:'story',  storyId:'whitewarrior_espion' },
  { id:'p_fin7',   type:'card',   deck:'surprise' },
  { id:'p_fin8',   type:'card',   deck:'gaming' },
  { id:'finale',   type:'finale' },
];

const EDGES = [
  ['start','p_sd'],['p_sd','p_join'],['p_join','p_col52'],['p_col52','p_wassy'],
  ['p_wassy','p_tractor'],
  ['p_tractor','p_der'],['p_der','p_sd2'],['p_sd2','p_math'],['p_math','p_chm1'],
  ['p_chm1','p_colo'],
  ['p_colo','p_join2'],['p_join2','p_enf3'],['p_enf3','p_wass2'],['p_wass2','fork1'],
  ['fork1','f1a'],['f1a','f1a2'],['f1a2','p_lycee'],
  ['fork1','f1b'],['f1b','f1b2'],['f1b2','p_lycee'],
  ['p_lycee','p_bac1'],
  ['p_bac1','p_lyc2'],['p_lyc2','p_lyc3'],['p_lyc3','p_lyc4'],['p_lyc4','p_lyc5'],
  ['p_lyc5','p_lyc6'],
  ['p_lyc6','p_lyc7'],['p_lyc7','p_lyc8'],['p_lyc8','p_lyc9'],['p_lyc9','fork_et'],
  ['fork_et','fe_a'],['fe_a','fe_a2'],['fe_a2','fe_a3'],['fe_a3','fe_a4'],['fe_a4','p_arc'],
  ['fork_et','fe_b'],['fe_b','fe_b2'],['fe_b2','fe_b3'],['fe_b3','fe_b4'],['fe_b4','p_arc'],
  ['p_arc','p_etu1'],['p_etu1','p_etu2'],
  ['p_etu2','p_etu3'],
  ['p_etu3','p_etu4'],['p_etu4','p_mid'],['p_mid','p_etu5'],['p_etu5','fork2'],
  ['fork2','f2a'],['f2a','f2a2'],['f2a2','f2a3'],['f2a3','f2b3'],
  ['fork2','f2b'],['f2b','f2b2'],['f2b2','f2b3'],
  ['f2b3','p8'],['p8','p8b'],['p8b','p_job1'],['p_job1','p_job2'],
  ['p_job2','p_act1'],
  ['p_act1','p_act2'],['p_act2','p_act3'],['p_act3','p_act4'],['p_act4','p_act5'],
  ['p_act5','p_act6'],
  ['p_act6','p_act7'],['p_act7','p_act8'],['p_act8','p_act9'],['p_act9','fork3'],
  ['fork3','f3a'],['f3a','f3a2'],['f3a2','p_lang'],
  ['fork3','f3b'],['f3b','f3b2'],['f3b2','p_lang'],
  ['fork3','f3c'],['f3c','f3c2'],['f3c2','p_lang'],
  ['fork3','f3d'],['f3d','f3d2'],['f3d2','p_lang'],
  ['p_lang','p_car1'],
  ['p_car1','p_car2'],['p_car2','p_mont'],['p_mont','p_fayl'],['p_fayl','p_bourm'],
  ['p_bourm','p_adu1'],
  ['p_adu1','p_adu2'],['p_adu2','p_adu3'],['p_adu3','p_adu4'],['p_adu4','p_adu5'],
  ['p_adu5','p_adu6'],
  ['p_adu6','p_adu7'],['p_adu7','p_adu8'],['p_adu8','p_viad'],['p_viad','fork4'],
  ['fork4','f4a'],['f4a','f4a2'],['f4a2','p_adu9'],
  ['fork4','f4b'],['f4b','f4b2'],['f4b2','p_adu9'],
  ['p_adu9','p_gex'],
  ['p_gex','p_fin1'],['p_fin1','p_fin2'],['p_fin2','p_fin3'],['p_fin3','p_fin4'],
  ['p_fin4','p_fin5'],
  ['p_fin5','p_fin6'],['p_fin6','p_fin7'],['p_fin7','p_fin8'],['p_fin8','finale'],
];

const STOP_MAP = new Map(STOPS.map(s => [s.id, s]));
STOPS.forEach(s => {
  if (!s.next) s.next = EDGES.filter(([a]) => a === s.id).map(([, b]) => b);
});

// ── STORIES ───────────────────────────────────────────────────────────────────
const STORIES = {
  college:             { fx:[{t:'b',v:3}], extra:{ toutoon:[{t:'b',v:5}], ptitcuicui:[{t:'b',v:5}] } },
  maths_avances:       { fx:[{t:'b',v:2}], extra:{ toutoon:[{t:'b',v:5}], ptitcuicui:[{t:'b',v:5}] } },
  lycee_manaa:         { fx:[{t:'b',v:2},{t:'m',v:200}], extra:{ ptitcuicui:[{t:'b',v:3},{t:'m',v:200}] } },
  colombey:            { fx:[{t:'b',v:4}], extra:{ ptitcuicui:[{t:'b',v:7}], toutoon:[{t:'b',v:7}], whitewarrior:[{t:'b',v:7}], sponge:[{t:'b',v:5}] } },
  supinfo:             { fx:[{t:'b',v:3}], extra:{ ptitcuicui:[{t:'b',v:5}], invoherence:[{t:'b',v:5}], avarod:[{t:'b',v:5}] } },
  stage:               { fx:[{t:'b',v:5},{t:'m',v:1000}], extra:{ ptitcuicui:[{t:'b',v:6},{t:'m',v:1000}], toutoon:[{t:'b',v:9},{t:'m',v:1000}], invoherence:[{t:'b',v:9},{t:'m',v:1000}] } },
  bourbonne:           { fx:[{t:'b',v:5},{t:'m',v:-150}], extra:{ toutoon:[{t:'b',v:7},{t:'m',v:-150}], sponge:[{t:'b',v:7},{t:'m',v:-150}], whitewarrior:[{t:'b',v:7},{t:'m',v:-150}] } },
  langres:             { fx:[{t:'b',v:2},{t:'m',v:500}] },
  knife:               { fx:[{t:'b',v:4}], extra:{ sponge:[{t:'b',v:7}], ptitcuicui:[{t:'b',v:6}] } },
  viaduc:              { fx:[{t:'b',v:3},{t:'m',v:200}], extra:{ toutoon:[{t:'b',v:5},{t:'m',v:200}], invoherence:[{t:'b',v:5},{t:'m',v:200}] } },
  bac:                 { fx:[{t:'b',v:3},{t:'m',v:500}], extra:{ toutoon:[{t:'b',v:2},{t:'m',v:500}] } },
  pc_hs:               { fx:[{t:'m',v:-2000}], assetLose:'pc', assetGain:'pc', alwaysGain:true },
  controle_technique:  { fx:[{t:'m',v:-600}], assetDamage:'car' },
  impots_52:           { fx:[{t:'m',v:-500}], globalFx:[{t:'m',v:-500}] },
  veto_chat:           { fx:[{t:'m',v:-450},{t:'b',v:1}], assetDamage:'cat' },
  achat_maison:        { fx:[{t:'m',v:-18000},{t:'b',v:5}], assetGain:'maison' },
  martinot:            { fx:[{t:'b',v:4},{t:'m',v:300}] },
  sponge_pseudo:       { fx:[{t:'b',v:3},{t:'m',v:200}], extra:{ sponge:[{t:'b',v:6},{t:'m',v:200}] } },
  gta_sa_rencontre:    { fx:[{t:'b',v:4}], extra:{ toutoon:[{t:'b',v:6}], sponge:[{t:'b',v:6}], whitewarrior:[{t:'b',v:6}] } },
  volley_eps:          { fx:[{t:'b',v:3}], extra:{ toutoon:[{t:'b',v:5}], sponge:[{t:'b',v:5}] } },
  ptitcuicui_2gt7:     { fx:[{t:'b',v:3}], extra:{ ptitcuicui:[{t:'b',v:6}], sponge:[{t:'b',v:5}], whitewarrior:[{t:'b',v:5}] } },
  demande:             { fx:[{t:'b',v:6},{t:'m',v:-500}], extra:{ toutoon:[{t:'b',v:11},{t:'m',v:-500}], invoherence:[{t:'b',v:11},{t:'m',v:-2000}], ptitcuicui:[{t:'b',v:7},{t:'m',v:-500}] } },
  soiree_village:      { fx:[{t:'m',v:-150},{t:'b',v:-2}] },
  bac_panique:         { fx:[{t:'m',v:-80},{t:'b',v:-2}] },
  jeanmaire:           { fx:[{t:'b',v:-3},{t:'m',v:-80}] },
  concours_robot:      { fx:[{t:'b',v:5},{t:'m',v:500}], extra:{ toutoon:[{t:'b',v:8},{t:'m',v:500}], ptitcuicui:[{t:'b',v:6},{t:'m',v:500}] } },
  casse_noisettes:     { fx:[{t:'b',v:3},{t:'m',v:400}], extra:{ whitewarrior:[{t:'b',v:7},{t:'m',v:700}] } },
  imprimeries_champagne:{ fx:[{t:'b',v:3},{t:'m',v:500}], extra:{ toutoon:[{t:'b',v:8},{t:'m',v:500}] } },
  ecommerce_cn:        { fx:[{t:'b',v:3},{t:'m',v:300}], extra:{ toutoon:[{t:'b',v:6},{t:'m',v:500}], whitewarrior:[{t:'b',v:6},{t:'m',v:400}] } },
  frein_casse:         { fx:[{t:'b',v:-2},{t:'m',v:-200}], extra:{ don:[{t:'b',v:3},{t:'m',v:-200}] } },
  mediegame:           { fx:[{t:'b',v:4},{t:'m',v:-80}], extra:{ invoherence:[{t:'b',v:7}], avarod:[{t:'b',v:7}], guigeek:[{t:'b',v:7}], don:[{t:'b',v:6}], existless:[{t:'b',v:6}], clement:[{t:'b',v:6}], sir_songbird:[{t:'b',v:6}] } },
  soiree_quentin:      { fx:[{t:'b',v:3},{t:'m',v:-30}], extra:{ sir_songbird:[{t:'b',v:10}], invoherence:[{t:'b',v:6}], don:[{t:'b',v:5}] } },
  whitewarrior_espion: { fx:[{t:'b',v:4}], extra:{ whitewarrior:[{t:'b',v:9}] } },
  clement_marie_ange:  { fx:[{t:'b',v:5},{t:'m',v:-200}], extra:{ invoherence:[{t:'b',v:8}], clement:[{t:'b',v:12}] } },
  commissariat_escalier:{ fx:[{t:'m',v:400},{t:'b',v:2}], extra:{ ptitcuicui:[{t:'b',v:5},{t:'m',v:400}], toutoon:[{t:'b',v:0},{t:'m',v:400}] } },
  cambriolage_supinfo: { fx:[{t:'m',v:-1800},{t:'b',v:-4}], assetLose:'pc', extra:{ ptitcuicui:[{t:'m',v:-3300},{t:'b',v:-7}], toutoon:[{t:'m',v:-1800},{t:'b',v:-6}] } },
  d619_bouchon:        { fx:[{t:'m',v:-50},{t:'b',v:-2}], assetDamage:'car' },
  warzone_covid:       { fx:[{t:'b',v:5},{t:'m',v:-40}], extra:{ avarod:[{t:'b',v:8}], guigeek:[{t:'b',v:8}], existless:[{t:'b',v:7}] } },
  reunion_infinie:     { fx:[{t:'b',v:-3},{t:'m',v:-100}] },
  lafitte_textile:     { fx:[{t:'b',v:3},{t:'m',v:-100}], extra:{ ptitcuicui:[{t:'b',v:3}], toutoon:[{t:'b',v:5}], invoherence:[{t:'b',v:5}] } },
  internet_coupe:      { fx:[{t:'b',v:-3},{t:'m',v:-120}] },
  prime_refusee:       { fx:[{t:'b',v:-4},{t:'m',v:-500}] },
  vide_grenier_52:     { fx:[{t:'m',v:400},{t:'b',v:2}], assetGain:'console' },
  bac_reussi:          { fx:[{t:'b',v:4},{t:'m',v:600}] },
  diplome_mention:     { fx:[{t:'b',v:4},{t:'m',v:1200}] },
  premier_salaire:     { fx:[{t:'m',v:800},{t:'b',v:3}] },
  promotion_salaire:   { fx:[{t:'m',v:1500},{t:'b',v:3}] },
  projet_reussi:       { fx:[{t:'m',v:1000},{t:'b',v:3}] },
  heritage_52:         { fx:[{t:'m',v:2000},{t:'b',v:2}] },
  prime_innovation:    { fx:[{t:'m',v:800},{t:'b',v:3}] },
  lait_deborde:        { fx:[{t:'m',v:-80},{t:'b',v:-1}] },
  coloc_degat:         { fx:[{t:'m',v:-600},{t:'b',v:-3}], assetDamage:'maison' },
};

// ── CARDS (effets seulement — échantillon représentatif) ─────────────────────
const CARDS = {
  money:[
    { fx:[{t:'m',v:3000},{t:'b',v:-1}], spe:'monopoly' },
    { fx:[{t:'m',v:800}], spe:'coin' },
    { fx:[{t:'m',v:2000}] },
    { fx:[{t:'m',v:-800},{t:'b',v:-1}], assetLose:'pc', assetGain:'pc' },
    { fx:[{t:'m',v:-13000}], assetGain:'maison', spe:'invest_52' },
    { fx:[{t:'m',v:-1200}], assetGain:'pc' },
    { fx:[{t:'m',v:-8000}], assetGain:'car' },
    { fx:[{t:'m',v:-450},{t:'b',v:2}], assetGain:'console' },
    { fx:[{t:'m',v:1500},{t:'b',v:1}] },
    { fx:[{t:'b',v:3}], spe:'knife' },
    { fx:[{t:'m',v:-700}] },
    { fx:[{t:'m',v:1200}] },
    { fx:[{t:'m',v:-650},{t:'b',v:1}] },
    { fx:[{t:'m',v:-500},{t:'b',v:2}] },
    { fx:[{t:'m',v:-350},{t:'b',v:3}] },
    { fx:[{t:'m',v:-200},{t:'b',v:1}] },
    { fx:[{t:'m',v:-80},{t:'b',v:-1}] },
    { fx:[{t:'m',v:-100},{t:'b',v:2}] },
    { fx:[{t:'m',v:800},{t:'b',v:2}] },
    { fx:[{t:'b',v:4}] },
    { fx:[{t:'m',v:-50},{t:'b',v:1}] },
    { fx:[{t:'m',v:-300},{t:'b',v:1}] },
    { fx:[{t:'m',v:-18000},{t:'b',v:4}], assetGain:'maison' },
    { fx:[{t:'m',v:400}] },
    { fx:[{t:'m',v:-80},{t:'b',v:-2}] },
  ],
  love:[
    { fx:[{t:'b',v:5}] },
    { fx:[{t:'b',v:3}] },
    { fx:[{t:'b',v:4}] },
    { fx:[{t:'b',v:2}] },
    { fx:[{t:'b',v:3}] },
    { fx:[{t:'b',v:4}] },
    { fx:[{t:'b',v:3},{t:'m',v:-400}] },
    { fx:[{t:'b',v:2}] },
    { fx:[{t:'b',v:4}] },
    { fx:[{t:'b',v:3}] },
    { fx:[{t:'b',v:3},{t:'m',v:-80}] },
    { fx:[{t:'b',v:2},{t:'m',v:-120}] },
    { fx:[{t:'b',v:4}] },
    { fx:[{t:'b',v:4},{t:'m',v:-180}] },
    { fx:[{t:'b',v:5},{t:'m',v:200}] },
    { fx:[{t:'b',v:2}] },
    { fx:[{t:'b',v:4}] },
    { fx:[{t:'b',v:3}] },
    { fx:[{t:'b',v:4}] },
    { fx:[{t:'b',v:3}] },
    { fx:[{t:'b',v:2}] },
    { fx:[{t:'b',v:3}] },
  ],
  gaming:[
    { fx:[{t:'b',v:3}], spe:'pa' },
    { fx:[{t:'b',v:2}] },
    { fx:[{t:'b',v:2}] },
    { fx:[{t:'b',v:3}] },
    { fx:[{t:'b',v:4},{t:'m',v:-200}] },
    { fx:[{t:'b',v:4}] },
    { fx:[{t:'b',v:2},{t:'m',v:-50}] },
    { fx:[{t:'b',v:3}] },
    { fx:[{t:'b',v:2}] },
    { fx:[{t:'b',v:3}] },
    { fx:[{t:'b',v:4},{t:'m',v:-150}] },
    { fx:[{t:'b',v:3}] },
    { fx:[{t:'b',v:3}] },
    { fx:[{t:'b',v:3}] },
    { fx:[{t:'b',v:3}] },
    { fx:[{t:'b',v:3}] },
    { fx:[{t:'b',v:4}] },
    { fx:[{t:'b',v:4}] },
    { fx:[{t:'b',v:3}] },
    { fx:[{t:'b',v:2},{t:'m',v:-500}] },
    { fx:[{t:'b',v:4}] },
    { fx:[{t:'b',v:2}] },
    { fx:[{t:'b',v:4},{t:'m',v:200}] }, // pétanque Villiers-le-Sec
    { fx:[{t:'b',v:3}], extra:{ guigeek:[{t:'b',v:8}], whitewarrior:[{t:'b',v:7}], sponge:[{t:'b',v:7}], toutoon:[{t:'b',v:7}], clement:[{t:'b',v:7}], don:[{t:'b',v:6}], existless:[{t:'b',v:6}], ptitcuicui:[{t:'b',v:5}], avarod:[{t:'b',v:4}], invoherence:[{t:'b',v:4}] } }, // serveur Minecraft
  ],
  surprise:[
    { fx:[{t:'b',v:3},{t:'m',v:1000}] },
    { fx:[{t:'m',v:-1500},{t:'b',v:5}] },
    { fx:[{t:'b',v:5}] },
    { fx:[{t:'b',v:4}] },
    { fx:[{t:'b',v:2},{t:'m',v:500}] },
    { fx:[{t:'b',v:5},{t:'m',v:700}] },
    { fx:[{t:'b',v:-2},{t:'m',v:-800}] },
    { fx:[{t:'b',v:3},{t:'m',v:400}] },
    { fx:[{t:'b',v:4}] },
    { fx:[{t:'b',v:4},{t:'m',v:600}] },
    { fx:[{t:'b',v:5}] },
    { fx:[{t:'b',v:3},{t:'m',v:777}] },
    { fx:[{t:'b',v:3},{t:'m',v:300}] },
    { fx:[{t:'b',v:4}] },
    { fx:[{t:'b',v:3}] },
    { fx:[{t:'b',v:3}] },
    { fx:[{t:'b',v:1},{t:'m',v:-200}], assetDamage:'car' },
    { fx:[{t:'b',v:-2},{t:'m',v:-200}], assetDamage:'pc' },
    { fx:[{t:'m',v:-300},{t:'b',v:1}] },
    { fx:[{t:'m',v:-500},{t:'b',v:-1}], assetDamage:'car' },
    { fx:[{t:'m',v:-700},{t:'b',v:-1}], assetLose:'phone', assetGain:'phone', alwaysGain:true },
    { fx:[{t:'b',v:-3},{t:'m',v:-200}], assetDamage:'console' },
    { fx:[{t:'b',v:3},{t:'m',v:-300}], assetGain:'cat' },
    { fx:[{t:'m',v:-3500},{t:'b',v:2}], assetGain:'moto' },
  ],
  career:[
    { fx:[{t:'m',v:2500},{t:'b',v:3}] },
    { fx:[{t:'m',v:-800},{t:'b',v:-2}] },
    { fx:[{t:'b',v:4},{t:'m',v:3000}], spe:'inv_graphic' },
    { fx:[{t:'m',v:2000},{t:'b',v:1}] },
    { fx:[{t:'m',v:1800},{t:'b',v:2}] },
    { fx:[{t:'m',v:-600},{t:'b',v:1}] },
    { fx:[{t:'m',v:1500},{t:'b',v:-1}] },
    { fx:[{t:'m',v:2200},{t:'b',v:3}] },
    { fx:[{t:'b',v:3}], spe:'pa' },
    { fx:[{t:'m',v:3000},{t:'b',v:4}] },
    { fx:[{t:'m',v:2800},{t:'b',v:3}] },
    { fx:[{t:'m',v:-400},{t:'b',v:-1}] },
    { fx:[{t:'m',v:2200},{t:'b',v:2}] },
    { fx:[{t:'m',v:1800},{t:'b',v:2}] },
    { fx:[{t:'m',v:2000},{t:'b',v:3}] },
    { fx:[{t:'m',v:1500},{t:'b',v:2}] },
    { fx:[{t:'m',v:2500},{t:'b',v:4}] },
    { fx:[{t:'m',v:-200},{t:'b',v:-2}] },
    { fx:[{t:'m',v:3500},{t:'b',v:4}] },
    { fx:[{t:'m',v:2800},{t:'b',v:2}] },
    { fx:[{t:'m',v:2200}] },
    { fx:[{t:'m',v:1900},{t:'b',v:2}] },
  ],
};

function drawCard(deck) { const p = CARDS[deck] || CARDS.money; return p[Math.floor(Math.random() * p.length)]; }

// ── RANDOM EVENTS ─────────────────────────────────────────────────────────────
const RANDOM_EVENTS = [
  { fx:[{t:'b',v:-1}] },  // grain HM
  { fx:[{t:'b',v:1}] },   // belle journée
  { fx:[{t:'b',v:2}] },   // apéro schloss
  { fx:[{t:'m',v:-250}] }, // carburant
  { fx:[{t:'m',v:400}] },  // tombola
  { fx:[{t:'b',v:2}] },   // arc-en-ciel
  { fx:[{t:'b',v:3},{t:'m',v:-100}] }, // BBQ
  { fx:[{t:'b',v:1},{t:'m',v:-150}] }, // panne courant
  { fx:[{t:'b',v:3},{t:'m',v:-120}] }, // raclette
  { fx:[{t:'b',v:2}] },   // médias
  { fx:[{t:'b',v:2},{t:'m',v:-80}] },  // covoiturage
  { fx:[{t:'b',v:1},{t:'m',v:-50}] },  // vache route
  { fx:[{t:'b',v:2}] },   // victoire sport
  { fx:[{t:'b',v:2}] },   // première neige
  { fx:[{t:'b',v:-1},{t:'m',v:-100}] }, // tracteur
  { fx:[{t:'b',v:3}] },   // zone blanche
  { fx:[{t:'b',v:-1}] },  // tout fermé
  { fx:[{t:'b',v:2}] },   // chevreuil
  { fx:[{t:'b',v:3},{t:'m',v:200}] },  // champignons
  { fx:[{t:'b',v:-1}] },  // lisier
  { fx:[{t:'b',v:1},{t:'m',v:-200}] }, // TER retard
  { fx:[{t:'b',v:3},{t:'m',v:-80}] },  // fromage
  { fx:[{t:'b',v:2}] },   // ADSL
  { fx:[{t:'b',v:-1},{t:'m',v:-100}] }, // verglas
  { fx:[{t:'b',v:1}] },   // cloches
  { fx:[{t:'b',v:-3}] },  // expo MANAA
];

// ── BETS ──────────────────────────────────────────────────────────────────────
const BETS = [
  { outcome:'A', winFx:[{t:'b',v:3}], loseFx:[{t:'b',v:-1}] },
  { outcome:'A', winFx:[{t:'b',v:3}], loseFx:[{t:'m',v:-300}] },
  { outcome:'A', winFx:[{t:'b',v:2}], loseFx:[{t:'b',v:-1}] },
  { outcome:'A', winFx:[{t:'b',v:2},{t:'m',v:500}], loseFx:[{t:'b',v:-2}] },
  { outcome:'A', winFx:[{t:'b',v:2}], loseFx:[{t:'b',v:-1}] },
  { outcome:'B', winFx:[{t:'b',v:3}], loseFx:[{t:'b',v:-1}] },
  { outcome:'B', winFx:[{t:'b',v:2},{t:'m',v:200}], loseFx:[{t:'b',v:-1}] },
  { outcome:'A', winFx:[{t:'b',v:3},{t:'m',v:100}], loseFx:[{t:'b',v:-1}] },
  { outcome:'A', winFx:[{t:'b',v:2}], loseFx:[{t:'b',v:-1}] },
  { outcome:'random', winFx:[{t:'b',v:3}], loseFx:[{t:'b',v:-1}] },
  { outcome:'A', winFx:[{t:'b',v:3}], loseFx:[{t:'b',v:-1}] },
  { outcome:'A', winFx:[{t:'b',v:2},{t:'m',v:100}], loseFx:[{t:'b',v:-1}] },
  { outcome:'A', winFx:[{t:'b',v:2}], loseFx:[{t:'m',v:-150}] },
  { outcome:'B', winFx:[{t:'b',v:3}], loseFx:[{t:'b',v:-1}] },
  { outcome:'B', winFx:[{t:'b',v:2},{t:'m',v:100}], loseFx:[{t:'b',v:-2}] },
  { outcome:'random', winFx:[{t:'b',v:3}], loseFx:[{t:'b',v:-1}] },
  { outcome:'A', winFx:[{t:'b',v:2}], loseFx:[{t:'b',v:-1}] },
  { outcome:'B', winFx:[{t:'m',v:300}], loseFx:[{t:'m',v:-200},{t:'b',v:-1}] },
  { outcome:'B', winFx:[{t:'b',v:2}], loseFx:[{t:'b',v:-1}] },
];

// ── DUELS ─────────────────────────────────────────────────────────────────────
const DUELS = [
  { stakes:2, stat:'chance' },
  { stakes:3, stat:'chance' },
  { stakes:2, stat:'social' },
  { stakes:4, stat:'chance' },
  { stakes:3, stat:'gaming' },
  { stakes:0, money:1000, stat:'finance' },
  { stakes:3, stat:'chance' },
  { stakes:2, stat:'social' },
];

// ── ASSETS ────────────────────────────────────────────────────────────────────
const ASSET_TYPES = {
  pc:      { baseValue:1200 },
  console: { baseValue:450  },
  car:     { baseValue:8000 },
  moto:    { baseValue:3500 },
  cat:     { baseValue:300  },
  phone:   { baseValue:700  },
  maison:  { baseValue:18000},
  velo:    { baseValue:400  },
};

function totalAssets(p) { return (p.assets || []).reduce((s, a) => s + a.value, 0); }

function addAsset(player, type) {
  const def = ASSET_TYPES[type]; if (!def) return null;
  const existing = (player.assets || []).find(a => a.type === type);
  if (existing) { existing.value = Math.round(existing.value * 1.15); return existing; }
  const asset = { type, value: def.baseValue, initialValue: def.baseValue, wear: 0 };
  (player.assets = player.assets || []).push(asset);
  return asset;
}

function removeAsset(player, type) {
  const idx = (player.assets || []).findIndex(a => a.type === type);
  if (idx >= 0) return player.assets.splice(idx, 1)[0];
  return null;
}

function fluctuateAssets(player) {
  (player.assets || []).forEach(asset => {
    const pct = Math.random() * 9 - 3;
    const delta = Math.round(asset.value * pct / 100);
    asset.value = Math.max(50, asset.value + delta);
    const initVal = asset.initialValue || ASSET_TYPES[asset.type]?.baseValue || asset.value;
    asset.initialValue = initVal;
    asset.wear = (asset.wear || 0) + 1;
    if (Math.random() * 100 < asset.wear) {
      const repairCost = Math.round(asset.wear * initVal / 100);
      player.money -= repairCost;
      asset.wear = 0;
    }
  });
}

// ── PLAYERS ───────────────────────────────────────────────────────────────────
const PLAYER_DEFS = [
  { id:'ptitcuicui',   name:'Ptitcuicui',   stats:{gaming:10, finance:10, chance:5,  social:5 } },
  { id:'whitewarrior', name:'Whitewarrior',  stats:{gaming:9,  finance:6,  chance:8,  social:7 } },
  { id:'sponge',       name:'Sponge',        stats:{gaming:9,  finance:8,  chance:6,  social:7 } },
  { id:'invoherence',  name:'Incoherence',   stats:{gaming:6,  finance:6,  chance:9,  social:9 } },
  { id:'toutoon',      name:'Toutoon',       stats:{gaming:8,  finance:5,  chance:8,  social:9 } },
  { id:'don',          name:'Don',           stats:{gaming:7,  finance:6,  chance:4,  social:9 } },
  { id:'avarod',       name:'Avarod',        stats:{gaming:9,  finance:7,  chance:6,  social:7 } },
  { id:'guigeek',      name:'Guigeek',       stats:{gaming:9,  finance:5,  chance:7,  social:5 } },
  { id:'existless',    name:'Existless',     stats:{gaming:7,  finance:6,  chance:9,  social:5 } },
  { id:'clement',      name:'Clément',       stats:{gaming:5,  finance:7,  chance:7,  social:9 } },
  { id:'sir_songbird', name:'Sir-Songbird',  stats:{gaming:7,  finance:8,  chance:5,  social:8 } },
];

function mkPlayer(def) {
  return { ...def, nodeId:'start', money:5000, bonheur:0, wins:0, assets:[], finished:false, order:null, negativeTurns:0 };
}

// ── APPLY FX ──────────────────────────────────────────────────────────────────
function applyCard(card, pid, players) {
  const p = players.find(x => x.id === pid);
  if (!p) return;

  const effects = (card.extra && card.extra[pid]) ? card.extra[pid] : (card.fx || []);
  effects.forEach(e => {
    if (e.t === 'b') p.bonheur += e.v;
    else if (e.t === 'm') p.money += e.v;
  });

  let lostAsset = false;
  if (card.assetLose) {
    const a = removeAsset(p, card.assetLose);
    if (a) lostAsset = true;
  }
  if (card.assetGain && (!card.assetLose || lostAsset || card.alwaysGain)) {
    addAsset(p, card.assetGain);
  }
  if (card.assetDamage) {
    const a = (p.assets || []).find(x => x.type === card.assetDamage);
    if (a) { const loss = Math.round(a.value * 0.3); a.value = Math.max(50, a.value - loss); }
  }

  if (card.globalFx) {
    players.filter(pl => !pl.finished).forEach(pl => {
      card.globalFx.forEach(e => {
        if (e.t === 'b') pl.bonheur += e.v;
        else if (e.t === 'm') pl.money += e.v;
      });
    });
  }

  // Special triggers
  if (card.spe === 'coin') {
    const s = players.find(x => x.id === 'sponge');
    if (s && s.id !== pid) s.money -= 800;
  }
  if (card.spe === 'knife') {
    const s = players.find(x => x.id === 'sponge');
    const pt = players.find(x => x.id === 'ptitcuicui');
    if (s) s.bonheur += 3;
    if (pt) pt.bonheur += 2;
  }
  if (card.spe === 'monopoly') {
    const pt = players.find(x => x.id === 'ptitcuicui');
    if (pt) { pt.money += 3000; pt.bonheur += 2; }
    players.filter(x => x.id !== 'ptitcuicui').forEach(x => x.bonheur--);
  }
  if (card.spe === 'pa') {
    const s = players.find(x => x.id === 'sponge');
    if (s) s.bonheur += 2;
  }
  if (card.spe === 'inv_graphic') {
    const inv = players.find(x => x.id === 'invoherence');
    if (inv) { inv.bonheur += 3; inv.money += 2000; }
  }
  if (card.spe === 'invest_52') {
    const p = players.find(x => x.id === pid);
    const maison = p && (p.assets || []).find(a => a.type === 'maison');
    if (maison) maison.wear = Math.floor(Math.random() * 26) + 10;
  }
}

// ── SCORE ─────────────────────────────────────────────────────────────────────
function score(p) {
  return p.bonheur + Math.floor(p.money / 500) + Math.floor(totalAssets(p) / 500) + p.wins;
}

// ── SIMULATE ONE GAME ─────────────────────────────────────────────────────────
function simulateGame() {
  const players = PLAYER_DEFS.map(def => ({ ...mkPlayer(def), forkChoices: {} }));
  let finishCount = 0;
  let turnCount = 0;
  let idx = 0;

  const MAX_TURNS = 500;

  while (turnCount < MAX_TURNS) {
    const activePlayers = players.filter(p => !p.finished);
    if (activePlayers.length === 0) break;

    // Advance to next non-finished player
    while (players[idx].finished) idx = (idx + 1) % players.length;
    const p = players[idx];

    turnCount++;

    // Fluctuate assets at turn start
    fluctuateAssets(p);

    // 25% chance of global random event
    if (Math.random() < 0.25) {
      const ev = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
      players.filter(pl => !pl.finished).forEach(pl => {
        (ev.fx || []).forEach(e => {
          if (e.t === 'b') pl.bonheur += e.v;
          else if (e.t === 'm') pl.money += e.v;
        });
      });
    }

    // Roll dice
    const roll = Math.floor(Math.random() * 6) + 1;
    if (roll === 1) p.bonheur -= 1;
    if (roll === 6) p.bonheur += 2;

    // Move
    let steps = roll;
    let nodeId = p.nodeId;

    while (steps > 0) {
      const node = STOP_MAP.get(nodeId);
      if (!node) break;

      if (node.type === 'fork') {
        // Choose random branch, remaining steps lost
        const chIdx = Math.floor(Math.random() * node.choices.length);
        p.forkChoices[node.id] = chIdx;
        nodeId = node.choices[chIdx].next;
        steps = 0; // Remaining steps lost
        break;
      }

      const nexts = node.next || [];
      if (nexts.length === 0) break; // No next stop (finale reached)

      nodeId = nexts[0];
      steps--;

      // If we hit a fork during movement, apply fork immediately
      const nextNode = STOP_MAP.get(nodeId);
      if (nextNode && nextNode.type === 'fork' && steps > 0) {
        const chIdx = Math.floor(Math.random() * nextNode.choices.length);
        p.forkChoices[nodeId] = chIdx;
        nodeId = nextNode.choices[chIdx].next;
        steps = 0;
        break;
      }

      if (nextNode && nextNode.type === 'finale') {
        steps = 0;
        break;
      }
    }

    p.nodeId = nodeId;

    const landNode = STOP_MAP.get(nodeId);
    if (!landNode) { idx = (idx + 1) % players.length; continue; }

    // Handle landing
    if (landNode.type === 'finale') {
      finishCount++;
      const bonus = Math.max(0, 10 - (finishCount - 1) * 3);
      p.bonheur += bonus;
      p.wins++;
      p.order = finishCount;
      p.finished = true;
    } else if (landNode.type === 'story') {
      const story = STORIES[landNode.storyId];
      if (story) applyCard(story, p.id, players);
    } else if (landNode.type === 'card') {
      const active = players.filter(pl => !pl.finished);
      const rnd = Math.random();
      if (rnd < 0.15) {
        // Bet
        const bet = BETS[Math.floor(Math.random() * BETS.length)];
        const actualOutcome = bet.outcome === 'random' ? (Math.random() < 0.5 ? 'A' : 'B') : bet.outcome;
        active.forEach(pl => {
          const plChoice = Math.random() < 0.5 ? 'A' : 'B';
          const fx = plChoice === actualOutcome ? bet.winFx : bet.loseFx;
          (fx || []).forEach(e => {
            if (e.t === 'b') pl.bonheur += e.v;
            else if (e.t === 'm') pl.money += e.v;
          });
        });
      } else if (rnd < 0.25 && active.length >= 2) {
        // Duel
        const duel = DUELS[Math.floor(Math.random() * DUELS.length)];
        const others = active.filter(pl => pl.id !== p.id);
        const target = others[Math.floor(Math.random() * others.length)];
        const bonusA = Math.floor((p.stats[duel.stat] || 5) / 3);
        const bonusB = Math.floor((target.stats[duel.stat] || 5) / 3);
        const rollA = Math.floor(Math.random() * 6) + 1 + bonusA;
        const rollB = Math.floor(Math.random() * 6) + 1 + bonusB;
        const challenger = p, defenderP = target;
        if (duel.money) {
          if (rollA >= rollB) { challenger.money += duel.money; defenderP.money -= duel.money; }
          else { challenger.money -= duel.money; defenderP.money += duel.money; }
        } else {
          if (rollA >= rollB) { challenger.bonheur += duel.stakes; defenderP.bonheur -= duel.stakes; }
          else { challenger.bonheur -= duel.stakes; defenderP.bonheur += duel.stakes; }
        }
      } else {
        // Card
        const card = drawCard(landNode.deck);
        applyCard(card, p.id, players);
      }
    }

    // Elimination check
    if (!p.finished) {
      if (p.bonheur < 0) {
        p.negativeTurns = (p.negativeTurns || 0) + 1;
        if (p.negativeTurns > 3) {
          p.finished = true;
          p.eliminated = true;
        }
      } else {
        p.negativeTurns = 0;
      }
    }

    // All finished?
    if (players.every(p => p.finished)) break;

    idx = (idx + 1) % players.length;
  }

  // Force finish remaining players (hit turn limit)
  players.filter(p => !p.finished).forEach(p => {
    finishCount++;
    p.order = finishCount;
    p.finished = true;
  });

  // Determine winner by score
  const ranked = [...players].sort((a, b) => score(b) - score(a));
  return { players, ranked, winner: ranked[0], turns: turnCount };
}

// ── FORK METADATA ─────────────────────────────────────────────────────────────
const FORK_INFO = {
  fork1:   { label: 'Enfance → Lycée',  branches: ['A — Gaming + Surprise', 'B — Money + Gaming'] },
  fork_et: { label: 'Études',           branches: ['A — Colombey (4 cases)', 'B — Supinfo (4 cases)'] },
  fork2:   { label: 'Post-diplôme',     branches: ['A — Stage (+bonheur +argent)', 'B — Bourbonne (+bonheur -argent)'] },
  fork3:   { label: 'Carrière (4 voies)',branches: ['A', 'B', 'C', 'D'] },
  fork4:   { label: 'Vie adulte',       branches: ['A — Sans maison', 'B — Achat maison'] },
};

// ── RUN N GAMES ───────────────────────────────────────────────────────────────
const N = 100000;
const wins = {};
const podiums = {}; // 1st/2nd/3rd counts
const scores = {};
const eliminations = {};
PLAYER_DEFS.forEach(p => {
  wins[p.id] = 0;
  scores[p.id] = [];
  eliminations[p.id] = 0;
  podiums[p.id] = [0, 0, 0]; // [1st, 2nd, 3rd]
});

// Fork stats: forkId → branchIdx → { count, totalScore, totalMoney, totalBonheur, wins }
const forkStats = {};
Object.keys(FORK_INFO).forEach(fid => {
  const nBranches = FORK_INFO[fid].branches.length;
  forkStats[fid] = Array.from({ length: nBranches }, () => ({ count: 0, totalScore: 0, totalMoney: 0, totalBonheur: 0, wins: 0 }));
});

process.stdout.write(`Simulation de ${N} parties`);
for (let g = 0; g < N; g++) {
  const result = simulateGame();
  wins[result.winner.id]++;
  result.ranked.forEach((p, i) => {
    scores[p.id].push(score(p));
    if (i < 3) podiums[p.id][i]++;
  });
  result.players.filter(p => p.eliminated).forEach(p => eliminations[p.id]++);

  // Accumulate fork stats
  result.players.forEach(p => {
    const sc = score(p);
    const isWinner = result.winner.id === p.id;
    Object.entries(p.forkChoices || {}).forEach(([forkId, chIdx]) => {
      if (!forkStats[forkId] || !forkStats[forkId][chIdx]) return;
      const bucket = forkStats[forkId][chIdx];
      bucket.count++;
      bucket.totalScore += sc;
      bucket.totalMoney += p.money;
      bucket.totalBonheur += p.bonheur;
      if (isWinner) bucket.wins++;
    });
  });

  if ((g + 1) % 1000 === 0) process.stdout.write('.');
}
console.log(' OK\n');

// ── AFFICHAGE ─────────────────────────────────────────────────────────────────
const PAD = (s, n) => String(s).padStart(n);
const PADR = (s, n) => String(s).padEnd(n);
const F1 = v => v.toFixed(1);

console.log('╔══════════════════════════════════════════════════════════════════════════════════╗');
console.log(`║         SCHLOSS — SIMULATION ${N.toLocaleString('fr-FR')} PARTIES · Département 52               ║`);
console.log('╚══════════════════════════════════════════════════════════════════════════════════╝\n');

console.log('┌──────────────────┬────────┬───────┬───────┬───────┬───────┬────────┬───────┬───────┐');
console.log('│ Joueur           │Victoires│  %Win │  🥇%  │  🥈%  │  🥉%  │ScoreMoy│ScoreMin│ScoreMax│');
console.log('├──────────────────┼────────┼───────┼───────┼───────┼───────┼────────┼───────┼───────┤');

const sorted = [...PLAYER_DEFS].sort((a, b) => wins[b.id] - wins[a.id]);
sorted.forEach(def => {
  const w = wins[def.id];
  const pct = F1(w / N * 100);
  const p1 = F1(podiums[def.id][0] / N * 100);
  const p2 = F1(podiums[def.id][1] / N * 100);
  const p3 = F1(podiums[def.id][2] / N * 100);
  const sc = scores[def.id];
  const avg = F1(sc.reduce((a, b) => a + b, 0) / sc.length);
  const min = Math.min(...sc);
  const max = Math.max(...sc);
  console.log(`│ ${PADR(def.name, 16)}│${PAD(w, 7)} │${PAD(pct, 6)}%│${PAD(p1, 6)}%│${PAD(p2, 6)}%│${PAD(p3, 6)}%│${PAD(avg, 7)} │${PAD(min, 6)} │${PAD(max, 6)} │`);
});

console.log('└──────────────────┴────────┴───────┴───────┴───────┴───────┴────────┴───────┴───────┘\n');

// Éliminations
console.log('┌──────────────────┬────────┬──────────┐');
console.log('│ Joueur           │ Élim.  │  % élim. │');
console.log('├──────────────────┼────────┼──────────┤');
sorted.forEach(def => {
  const e = eliminations[def.id];
  console.log(`│ ${PADR(def.name, 16)}│${PAD(e, 7)} │${PAD(F1(e / N * 100), 8)}% │`);
});
console.log('└──────────────────┴────────┴──────────┘\n');

const champ = sorted[0];
console.log(`🏆 Champion sur ${N.toLocaleString('fr-FR')} parties : ${champ.name} avec ${wins[champ.id].toLocaleString('fr-FR')} victoires (${F1(wins[champ.id] / N * 100)}%)\n`);

// ── ANALYSE DES FORKS ─────────────────────────────────────────────────────────
console.log('╔══════════════════════════════════════════════════════════════════════════════════╗');
console.log('║                    ANALYSE DES CARREFOURS — MEILLEURS CHOIX                    ║');
console.log('╚══════════════════════════════════════════════════════════════════════════════════╝\n');

Object.entries(FORK_INFO).forEach(([forkId, info]) => {
  const branches = forkStats[forkId];
  if (!branches) return;
  console.log(`┌─ ${info.label} ${'─'.repeat(Math.max(0, 74 - info.label.length))}┐`);
  console.log(`│ ${'Branche'.padEnd(30)} ${'ScoreMoy'.padStart(8)} ${'Argent'.padStart(9)} ${'Bonheur'.padStart(8)} ${'%Victoire'.padStart(10)} │`);
  console.log(`│ ${'─'.repeat(70)} │`);

  const bestScoreIdx = branches.reduce((best, b, i) =>
    (b.count > 0 && b.totalScore / b.count > (branches[best].count > 0 ? branches[best].totalScore / branches[best].count : -Infinity)) ? i : best, 0);

  branches.forEach((b, i) => {
    if (b.count === 0) return;
    const avgScore = b.totalScore / b.count;
    const avgMoney = b.totalMoney / b.count;
    const avgBon = b.totalBonheur / b.count;
    const winPct = b.wins / b.count * 100;
    const label = (info.branches[i] || `Branche ${i}`).padEnd(30);
    const star = i === bestScoreIdx ? ' ★' : '  ';
    console.log(`│${star}${label} ${F1(avgScore).padStart(8)} ${Math.round(avgMoney).toLocaleString('fr-FR').padStart(9)} ${F1(avgBon).padStart(8)} ${F1(winPct).padStart(9)}% │`);
  });

  const best = branches[bestScoreIdx];
  const worst = branches.reduce((w, b, i) =>
    (b.count > 0 && b.totalScore / b.count < (branches[w].count > 0 ? branches[w].totalScore / branches[w].count : Infinity)) ? i : w, 0);
  if (bestScoreIdx !== worst && branches[worst].count > 0) {
    const diff = F1(best.totalScore / best.count - branches[worst].totalScore / branches[worst].count);
    console.log(`│ → Recommandation : ${info.branches[bestScoreIdx]}`.padEnd(73) + ' │');
    console.log(`│   Avantage score : +${diff} pts vs pire choix`.padEnd(73) + ' │');
  }
  console.log(`└${'─'.repeat(72)}┘\n`);
});
