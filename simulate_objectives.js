'use strict';
// simulate_objectives.js — Mesure le taux de réalisation des 30 objectifs secrets
// sur 10 000 parties pour calibrer les récompenses

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
  { id:'p_bac1',   type:'story',  storyId:'bac_panique' },
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
  { id:'fe_b',     type:'card',   deck:'gaming' },
  { id:'fe_b2',    type:'story',  storyId:'supinfo' },
  { id:'fe_b3',    type:'card',   deck:'love' },
  { id:'fe_b4',    type:'card',   deck:'gaming' },
  { id:'p_arc',    type:'card',   deck:'surprise' },
  { id:'p_etu1',   type:'card',   deck:'money' },
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
  { id:'p_job1',   type:'story',  storyId:'premier_salaire' },
  { id:'p_job2',   type:'card',   deck:'surprise' },
  { id:'p_act1',   type:'story',  storyId:'d619_bouchon' },
  { id:'p_act2',   type:'story',  storyId:'controle_technique' },
  { id:'p_act3',   type:'card',   deck:'love' },
  { id:'p_act4',   type:'story',  storyId:'impots_52' },
  { id:'p_act5',   type:'story',  storyId:'promotion_salaire' },
  { id:'p_act6',   type:'story',  storyId:'reunion_infinie' },
  { id:'p_act7',   type:'card',   deck:'love' },
  { id:'p_act8',   type:'story',  storyId:'internet_coupe' },
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
  { id:'p_lang',   type:'story',  storyId:'langres' },
  { id:'p_car1',   type:'card',   deck:'surprise' },
  { id:'p_car2',   type:'story',  storyId:'projet_reussi' },
  { id:'p_mont',   type:'card',   deck:'gaming' },
  { id:'p_fayl',   type:'card',   deck:'love' },
  { id:'p_bourm',  type:'story',  storyId:'prime_refusee' },
  { id:'p_adu1',   type:'card',   deck:'love' },
  { id:'p_adu2',   type:'card',   deck:'surprise' },
  { id:'p_adu3',   type:'card',   deck:'gaming' },
  { id:'p_adu4',   type:'story',  storyId:'heritage_52' },
  { id:'p_adu5',   type:'story',  storyId:'lait_deborde' },
  { id:'p_adu6',   type:'story',  storyId:'veto_chat' },
  { id:'p_adu7',   type:'card',   deck:'love' },
  { id:'p_adu8',   type:'story',  storyId:'prime_innovation' },
  { id:'p_viad',   type:'story',  storyId:'viaduc' },
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
  { id:'p_fin6',   type:'card',   deck:'love' },
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
  ['fork_et','fe_a'],['fe_a','fe_a2'],['fe_a2','fe_a3'],['fe_a3','p_arc'],
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

const STORIES = {
  college:             { fx:[{t:'b',v:3}], extra:{ toutoon:[{t:'b',v:5}], ptitcuicui:[{t:'b',v:5}] } },
  maths_avances:       { fx:[{t:'b',v:2}], extra:{ toutoon:[{t:'b',v:5}], ptitcuicui:[{t:'b',v:5}] } },
  lycee_manaa:         { fx:[{t:'b',v:2},{t:'m',v:200}], extra:{ ptitcuicui:[{t:'b',v:3},{t:'m',v:200}] } },
  colombey:            { fx:[{t:'b',v:4}], extra:{ ptitcuicui:[{t:'b',v:7}], toutoon:[{t:'b',v:7}], whitewarrior:[{t:'b',v:7}], sponge:[{t:'b',v:5}] } },
  supinfo:             { fx:[{t:'b',v:3}], extra:{ ptitcuicui:[{t:'b',v:5}], invoherence:[{t:'b',v:5}] } },
  stage:               { fx:[{t:'b',v:5},{t:'m',v:1000}], extra:{ ptitcuicui:[{t:'b',v:8},{t:'m',v:1000}], toutoon:[{t:'b',v:9},{t:'m',v:1000}], invoherence:[{t:'b',v:9},{t:'m',v:1000}] } },
  bourbonne:           { fx:[{t:'b',v:5},{t:'m',v:-150}], extra:{ toutoon:[{t:'b',v:7},{t:'m',v:-150}], sponge:[{t:'b',v:7},{t:'m',v:-150}], whitewarrior:[{t:'b',v:7},{t:'m',v:-150}] } },
  langres:             { fx:[{t:'b',v:2},{t:'m',v:500}] },
  knife:               { fx:[{t:'b',v:4}], extra:{ sponge:[{t:'b',v:7}], ptitcuicui:[{t:'b',v:6}] } },
  viaduc:              { fx:[{t:'b',v:3},{t:'m',v:200}], extra:{ toutoon:[{t:'b',v:5},{t:'m',v:200}], invoherence:[{t:'b',v:5},{t:'m',v:200}] } },
  bac:                 { fx:[{t:'b',v:3},{t:'m',v:500}], extra:{ toutoon:[{t:'b',v:2},{t:'m',v:500}] } },
  pc_hs:               { fx:[{t:'m',v:-2000}], assetLose:'pc', assetGain:'pc', alwaysGain:true },
  controle_technique:  { fx:[{t:'m',v:-600}], assetDamage:'car' },
  impots_52:           { fx:[{t:'m',v:-500}], globalFx:[{t:'m',v:-500}] },
  veto_chat:           { fx:[{t:'m',v:-450},{t:'b',v:1}], assetDamage:'cat' },
  achat_maison:        { fx:[{t:'m',v:-18000}], assetGain:'maison' },
  martinot:            { fx:[{t:'b',v:4},{t:'m',v:300}] },
  sponge_pseudo:       { fx:[{t:'b',v:3},{t:'m',v:200}], extra:{ sponge:[{t:'b',v:6},{t:'m',v:200}] } },
  gta_sa_rencontre:    { fx:[{t:'b',v:4}], extra:{ toutoon:[{t:'b',v:6}], sponge:[{t:'b',v:6}], whitewarrior:[{t:'b',v:6}] } },
  volley_eps:          { fx:[{t:'b',v:3}], extra:{ toutoon:[{t:'b',v:5}], sponge:[{t:'b',v:5}] } },
  ptitcuicui_2gt7:     { fx:[{t:'b',v:3}], extra:{ ptitcuicui:[{t:'b',v:6}], sponge:[{t:'b',v:4}], whitewarrior:[{t:'b',v:5}] } },
  demande:             { fx:[{t:'b',v:6},{t:'m',v:-2000}], extra:{ toutoon:[{t:'b',v:11},{t:'m',v:-2000}], invoherence:[{t:'b',v:11},{t:'m',v:-2000}], ptitcuicui:[{t:'b',v:9},{t:'m',v:-2000}] } },
  soiree_village:      { fx:[{t:'m',v:-150},{t:'b',v:-2}] },
  bac_panique:         { fx:[{t:'m',v:-80},{t:'b',v:-2}] },
  commissariat_escalier:{ fx:[{t:'m',v:400},{t:'b',v:2}], extra:{ ptitcuicui:[{t:'b',v:5},{t:'m',v:400}], toutoon:[{t:'b',v:0},{t:'m',v:400}] } },
  cambriolage_supinfo: { fx:[{t:'m',v:-1800},{t:'b',v:-4}], assetLose:'pc', extra:{ ptitcuicui:[{t:'m',v:-3300},{t:'b',v:-7}], toutoon:[{t:'m',v:-1800},{t:'b',v:-6}] } },
  d619_bouchon:        { fx:[{t:'m',v:-50},{t:'b',v:-2}], assetDamage:'car' },
  reunion_infinie:     { fx:[{t:'b',v:-3},{t:'m',v:-100}] },
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

const CARDS = {
  money:[
    { fx:[{t:'m',v:3000},{t:'b',v:-1}], spe:'monopoly' },
    { fx:[{t:'m',v:800}], spe:'coin' },
    { fx:[{t:'m',v:2000}] },
    { fx:[{t:'m',v:-800},{t:'b',v:-1}], assetLose:'pc', assetGain:'pc' },
    { fx:[{t:'m',v:-5000}], assetGain:'maison' },
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
    { fx:[{t:'b',v:5}] },{ fx:[{t:'b',v:3}] },{ fx:[{t:'b',v:4}] },{ fx:[{t:'b',v:2}] },
    { fx:[{t:'b',v:3}] },{ fx:[{t:'b',v:4}] },{ fx:[{t:'b',v:3},{t:'m',v:-400}] },
    { fx:[{t:'b',v:2}] },{ fx:[{t:'b',v:4}] },{ fx:[{t:'b',v:3}] },
    { fx:[{t:'b',v:3},{t:'m',v:-80}] },{ fx:[{t:'b',v:2},{t:'m',v:-120}] },
    { fx:[{t:'b',v:4}] },{ fx:[{t:'b',v:4},{t:'m',v:-180}] },
    { fx:[{t:'b',v:5},{t:'m',v:200}] },{ fx:[{t:'b',v:2}] },{ fx:[{t:'b',v:4}] },
    { fx:[{t:'b',v:3}] },{ fx:[{t:'b',v:4}] },{ fx:[{t:'b',v:3}] },
    { fx:[{t:'b',v:2}] },{ fx:[{t:'b',v:3}] },
  ],
  gaming:[
    { fx:[{t:'b',v:3}], spe:'pa' },{ fx:[{t:'b',v:2}] },{ fx:[{t:'b',v:2}] },
    { fx:[{t:'b',v:3}] },{ fx:[{t:'b',v:4},{t:'m',v:-200}] },{ fx:[{t:'b',v:4}] },
    { fx:[{t:'b',v:2},{t:'m',v:-50}] },{ fx:[{t:'b',v:3}] },{ fx:[{t:'b',v:2}] },
    { fx:[{t:'b',v:3}] },{ fx:[{t:'b',v:4},{t:'m',v:-150}] },{ fx:[{t:'b',v:3}] },
    { fx:[{t:'b',v:3}] },{ fx:[{t:'b',v:3}] },{ fx:[{t:'b',v:3}] },
    { fx:[{t:'b',v:3}] },{ fx:[{t:'b',v:4}] },{ fx:[{t:'b',v:4}] },
    { fx:[{t:'b',v:3}] },{ fx:[{t:'b',v:2},{t:'m',v:-500}] },
    { fx:[{t:'b',v:4}] },{ fx:[{t:'b',v:2}] },
  ],
  surprise:[
    { fx:[{t:'b',v:3},{t:'m',v:1000}] },{ fx:[{t:'m',v:-1500},{t:'b',v:5}] },
    { fx:[{t:'b',v:5}] },{ fx:[{t:'b',v:4}] },{ fx:[{t:'b',v:2},{t:'m',v:500}] },
    { fx:[{t:'b',v:5},{t:'m',v:700}] },{ fx:[{t:'b',v:-2},{t:'m',v:-800}] },
    { fx:[{t:'b',v:3},{t:'m',v:400}] },{ fx:[{t:'b',v:4}] },
    { fx:[{t:'b',v:4},{t:'m',v:600}] },{ fx:[{t:'b',v:5}] },
    { fx:[{t:'b',v:3},{t:'m',v:777}] },{ fx:[{t:'b',v:3},{t:'m',v:300}] },
    { fx:[{t:'b',v:4}] },{ fx:[{t:'b',v:3}] },{ fx:[{t:'b',v:3}] },
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
    { fx:[{t:'m',v:2500},{t:'b',v:3}] },{ fx:[{t:'m',v:-800},{t:'b',v:-2}] },
    { fx:[{t:'b',v:4},{t:'m',v:3000}], spe:'inv_graphic' },
    { fx:[{t:'m',v:2000},{t:'b',v:1}] },{ fx:[{t:'m',v:1800},{t:'b',v:2}] },
    { fx:[{t:'m',v:-600},{t:'b',v:1}] },{ fx:[{t:'m',v:1500},{t:'b',v:-1}] },
    { fx:[{t:'m',v:2200},{t:'b',v:3}] },{ fx:[{t:'b',v:3}], spe:'pa' },
    { fx:[{t:'m',v:3000},{t:'b',v:4}] },{ fx:[{t:'m',v:2800},{t:'b',v:3}] },
    { fx:[{t:'m',v:-400},{t:'b',v:-1}] },{ fx:[{t:'m',v:2200},{t:'b',v:2}] },
    { fx:[{t:'m',v:1800},{t:'b',v:2}] },{ fx:[{t:'m',v:2000},{t:'b',v:3}] },
    { fx:[{t:'m',v:1500},{t:'b',v:2}] },{ fx:[{t:'m',v:2500},{t:'b',v:4}] },
    { fx:[{t:'m',v:-200},{t:'b',v:-2}] },{ fx:[{t:'m',v:3500},{t:'b',v:4}] },
    { fx:[{t:'m',v:2800},{t:'b',v:2}] },{ fx:[{t:'m',v:2200}] },
    { fx:[{t:'m',v:1900},{t:'b',v:2}] },
  ],
};

function drawCard(deck) { const p = CARDS[deck] || CARDS.money; return p[Math.floor(Math.random() * p.length)]; }

const RANDOM_EVENTS = [
  { fx:[{t:'b',v:-1}] },{ fx:[{t:'b',v:1}] },{ fx:[{t:'b',v:2}] },
  { fx:[{t:'m',v:-250}] },{ fx:[{t:'m',v:400}] },{ fx:[{t:'b',v:2}] },
  { fx:[{t:'b',v:3},{t:'m',v:-100}] },{ fx:[{t:'b',v:1},{t:'m',v:-150}] },
  { fx:[{t:'b',v:3},{t:'m',v:-120}] },{ fx:[{t:'b',v:2}] },
  { fx:[{t:'b',v:2},{t:'m',v:-80}] },{ fx:[{t:'b',v:1},{t:'m',v:-50}] },
  { fx:[{t:'b',v:2}] },{ fx:[{t:'b',v:2}] },{ fx:[{t:'b',v:-1},{t:'m',v:-100}] },
  { fx:[{t:'b',v:3}] },{ fx:[{t:'b',v:-1}] },{ fx:[{t:'b',v:2}] },
  { fx:[{t:'b',v:3},{t:'m',v:200}] },{ fx:[{t:'b',v:-1}] },
  { fx:[{t:'b',v:1},{t:'m',v:-200}] },{ fx:[{t:'b',v:3},{t:'m',v:-80}] },
  { fx:[{t:'b',v:2}] },{ fx:[{t:'b',v:-1},{t:'m',v:-100}] },
  { fx:[{t:'b',v:1}] },{ fx:[{t:'b',v:-3}] },
];

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

const DUELS = [
  { stakes:2, stat:'chance' },{ stakes:3, stat:'chance' },
  { stakes:2, stat:'social' },{ stakes:4, stat:'chance' },
  { stakes:3, stat:'gaming' },{ stakes:0, money:1000, stat:'finance' },
  { stakes:3, stat:'chance' },{ stakes:2, stat:'social' },
];

const ASSET_TYPES = {
  pc:{ baseValue:1200 }, console:{ baseValue:450 }, car:{ baseValue:8000 },
  moto:{ baseValue:3500 }, cat:{ baseValue:300 }, phone:{ baseValue:700 },
  maison:{ baseValue:18000 }, velo:{ baseValue:400 },
};

function totalAssets(p) { return (p.assets || []).reduce((s, a) => s + a.value, 0); }

function addAsset(player, type) {
  const def = ASSET_TYPES[type]; if (!def) return null;
  if (type === 'maison') player.everHadMaison = true;
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
      player.money -= Math.round(asset.wear * initVal / 100);
      asset.wear = 0;
    }
  });
}

const PLAYER_DEFS = [
  { id:'ptitcuicui',   name:'Ptitcuicui',   stats:{gaming:10, finance:10, chance:5,  social:5 } },
  { id:'whitewarrior', name:'Whitewarrior',  stats:{gaming:9,  finance:6,  chance:8,  social:7 } },
  { id:'sponge',       name:'Sponge',        stats:{gaming:9,  finance:8,  chance:6,  social:7 } },
  { id:'invoherence',  name:'Incoherence',   stats:{gaming:6,  finance:6,  chance:9,  social:9 } },
  { id:'toutoon',      name:'Toutoon',       stats:{gaming:8,  finance:5,  chance:8,  social:9 } },
];

function mkPlayer(def) {
  return {
    ...def, nodeId:'start', money:5000, bonheur:0, wins:0, assets:[],
    finished:false, order:null, negativeTurns:0,
    // Tracking objectifs
    visitedNodes: new Set(),
    minBonheur: 0,
    minMoney: 5000,
    duelWins: 0,
    duelLosses: 0,
    betWins: 0,
    betParticipations: 0,
    sixes: 0,
    assetDamageCount: 0,
    everHadMaison: false,
  };
}

function updateMinTracking(players) {
  players.forEach(p => {
    p.minBonheur = Math.min(p.minBonheur, p.bonheur);
    p.minMoney = Math.min(p.minMoney, p.money);
  });
}

function applyCard(card, pid, players) {
  let assetDamaged = false;
  const p = players.find(x => x.id === pid);
  if (!p) return assetDamaged;
  const effects = (card.extra && card.extra[pid]) ? card.extra[pid] : (card.fx || []);
  effects.forEach(e => {
    if (e.t === 'b') p.bonheur += e.v;
    else if (e.t === 'm') p.money += e.v;
  });
  let lostAsset = false;
  if (card.assetLose) { const a = removeAsset(p, card.assetLose); if (a) lostAsset = true; }
  if (card.assetGain && (!card.assetLose || lostAsset || card.alwaysGain)) addAsset(p, card.assetGain);
  if (card.assetDamage) {
    const a = (p.assets || []).find(x => x.type === card.assetDamage);
    if (a) {
      const loss = Math.round(a.value * 0.3);
      a.value = Math.max(50, a.value - loss);
      assetDamaged = true;
    }
  }
  if (card.globalFx) {
    players.filter(pl => !pl.finished).forEach(pl => {
      card.globalFx.forEach(e => {
        if (e.t === 'b') pl.bonheur += e.v;
        else if (e.t === 'm') pl.money += e.v;
      });
    });
  }
  if (card.spe === 'coin') { const s = players.find(x => x.id === 'sponge'); if (s && s.id !== pid) s.money -= 800; }
  if (card.spe === 'knife') {
    const s = players.find(x => x.id === 'sponge'); const pt = players.find(x => x.id === 'ptitcuicui');
    if (s) s.bonheur += 3; if (pt) pt.bonheur += 2;
  }
  if (card.spe === 'monopoly') {
    const pt = players.find(x => x.id === 'ptitcuicui');
    if (pt) { pt.money += 3000; pt.bonheur += 2; }
    players.filter(x => x.id !== 'ptitcuicui').forEach(x => x.bonheur--);
  }
  if (card.spe === 'pa') { const s = players.find(x => x.id === 'sponge'); if (s) s.bonheur += 2; }
  if (card.spe === 'inv_graphic') {
    const inv = players.find(x => x.id === 'invoherence');
    if (inv) { inv.bonheur += 3; inv.money += 2000; }
  }
  return assetDamaged;
}

function score(p) {
  return p.bonheur + Math.floor(p.money / 500) + Math.floor(totalAssets(p) / 500) + p.wins;
}

// ── 30 OBJECTIFS ─────────────────────────────────────────────────────────────
const OBJECTIVES = [
  // Financiers
  { id:'millionnaire',    label:'Millionnaire',             cond: p => p.money >= 15000 },
  { id:'grand_rentier',   label:'Grand Rentier (10k€)',      cond: p => p.money >= 10000 },
  { id:'rentier',         label:'Rentier',                  cond: p => p.assets.some(a => a.type === 'maison') },
  { id:'automobiliste',   label:'Automobiliste',            cond: p => p.assets.some(a => a.type === 'car') },
  { id:'collectionneur',  label:'Collectionneur (4+ assets)',cond: p => p.assets.length >= 4 },
  { id:'etabli',          label:'Établi (maison+voiture)',  cond: p => p.assets.some(a=>a.type==='maison') && p.assets.some(a=>a.type==='car') },
  { id:'boheme',          label:'Bohème (<500€, 30+ bonheur)',cond: p => p.money < 500 && p.bonheur >= 30 },
  { id:'econome',         label:"L'Économe (8k€ sans maison)",cond: p => p.money >= 8000 && !p.everHadMaison },
  // Bonheur
  { id:'comble',          label:'Comblé (100+ bonheur)',    cond: p => p.bonheur >= 100 },
  { id:'zen',             label:'Zen (bonheur jamais <0)',  cond: p => p.minBonheur >= 0 },
  { id:'la_totale',       label:'La Totale (sc≥120,bh≥35,€≥10k)', cond: p => score(p)>=120 && p.bonheur>=35 && p.money>=10000 },
  { id:'legende',         label:'Légende (score ≥ 130)',    cond: p => score(p) >= 130 },
  // Performance
  { id:'finaliste',       label:'Finaliste (top 2)',        cond: p => (p.order || 99) <= 2 },
  { id:'grand_vainqueur', label:'Grand Vainqueur (1er & sc≥120)', cond: p => p.order === 1 && score(p) >= 120 },
  // Duels
  { id:'duelliste',       label:'Duelliste (2 victoires)',  cond: p => p.duelWins >= 2 },
  { id:'gladiateur',      label:'Gladiateur (3 victoires)', cond: p => p.duelWins >= 3 },
  { id:'invaincu',        label:'Invaincu (2+ duels, 0 défaite)', cond: p => p.duelWins >= 2 && p.duelLosses === 0 },
  // Paris
  { id:'parieur',         label:'Parieur (5 paris gagnés)',  cond: p => p.betWins >= 5 },
  { id:'joueur_compulsif',label:'Joueur Compulsif (5 paris participés)', cond: p => p.betParticipations >= 5 },
  // Chance / dé
  { id:'chanceux',        label:'Chanceux (6 fois un 6)',   cond: p => p.sixes >= 6 },
  // Parcours
  { id:'supinfoien',      label:'Supinfoien (branche Supinfo)', cond: p => p.visitedNodes.has('fe_b2') },
  { id:'campagnard',      label:'Campagnard (branche Colombey)', cond: p => p.visitedNodes.has('fe_a2') },
  { id:'proprietaire',    label:'Propriétaire (case Achat Maison)', cond: p => p.visitedNodes.has('f4b') },
  { id:'stagiaire',       label:'Stagiaire Étoile (branche Stage)', cond: p => p.visitedNodes.has('f2a3') },
  // Protection assets
  { id:'sans_egratig',    label:'Sans une Égratignure (0 dégâts assets)', cond: p => p.assetDamageCount === 0 },
  { id:'pas_rouge',       label:'Jamais dans le Rouge (argent ≥0 toujours)', cond: p => p.minMoney >= 0 },
  // Combos assets
  { id:'gamer_cosy',      label:'Gamer Cosy (console + chat)', cond: p => p.assets.some(a=>a.type==='console') && p.assets.some(a=>a.type==='cat') },
  { id:'routier',         label:'Le Routier (voiture+moto)',  cond: p => p.assets.some(a=>a.type==='car') && p.assets.some(a=>a.type==='moto') },
  // Nouveaux à tester
  { id:'survivant',       label:'Survivant (pas éliminé)',    cond: p => !p.eliminated },
  { id:'pc_master',       label:'PC Master (possède un PC)',  cond: p => p.assets.some(a=>a.type==='pc') },
  { id:'minimaliste',     label:'Minimaliste (≤1 asset)',    cond: p => p.assets.length <= 1 },
];

// ── SIMULATE ONE GAME ─────────────────────────────────────────────────────────
function simulateGame() {
  const players = PLAYER_DEFS.map(mkPlayer);
  let finishCount = 0;
  let turnCount = 0;
  let idx = 0;
  const MAX_TURNS = 500;

  while (turnCount < MAX_TURNS) {
    const activePlayers = players.filter(p => !p.finished);
    if (activePlayers.length === 0) break;
    while (players[idx].finished) idx = (idx + 1) % players.length;
    const p = players[idx];
    turnCount++;

    fluctuateAssets(p);
    updateMinTracking(players);

    if (Math.random() < 0.25) {
      const ev = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
      players.filter(pl => !pl.finished).forEach(pl => {
        (ev.fx || []).forEach(e => {
          if (e.t === 'b') pl.bonheur += e.v;
          else if (e.t === 'm') pl.money += e.v;
        });
      });
      updateMinTracking(players);
    }

    const roll = Math.floor(Math.random() * 6) + 1;
    if (roll === 1) p.bonheur -= 1;
    if (roll === 6) { p.bonheur += 2; p.sixes++; }
    p.minBonheur = Math.min(p.minBonheur, p.bonheur);

    let steps = roll;
    let nodeId = p.nodeId;

    while (steps > 0) {
      const node = STOP_MAP.get(nodeId);
      if (!node) break;
      if (node.type === 'fork') {
        const ch = node.choices[Math.floor(Math.random() * node.choices.length)];
        nodeId = ch.next;
        steps = 0;
        break;
      }
      const nexts = node.next || [];
      if (nexts.length === 0) break;
      nodeId = nexts[0];
      steps--;
      p.visitedNodes.add(nodeId);
      const nextNode = STOP_MAP.get(nodeId);
      if (nextNode && nextNode.type === 'fork' && steps > 0) {
        const ch = nextNode.choices[Math.floor(Math.random() * nextNode.choices.length)];
        nodeId = ch.next;
        steps = 0;
        p.visitedNodes.add(nodeId);
        break;
      }
      if (nextNode && nextNode.type === 'finale') { steps = 0; break; }
    }

    p.nodeId = nodeId;
    p.visitedNodes.add(nodeId);

    const landNode = STOP_MAP.get(nodeId);
    if (!landNode) { idx = (idx + 1) % players.length; continue; }

    if (landNode.type === 'finale') {
      finishCount++;
      const bonus = Math.max(0, 10 - (finishCount - 1) * 3);
      p.bonheur += bonus;
      p.wins++;
      p.order = finishCount;
      p.finished = true;
    } else if (landNode.type === 'story') {
      const story = STORIES[landNode.storyId];
      if (story) {
        const damaged = applyCard(story, p.id, players);
        if (damaged) p.assetDamageCount++;
      }
    } else if (landNode.type === 'card') {
      const active = players.filter(pl => !pl.finished);
      const rnd = Math.random();
      if (rnd < 0.15) {
        const bet = BETS[Math.floor(Math.random() * BETS.length)];
        const actualOutcome = bet.outcome === 'random' ? (Math.random() < 0.5 ? 'A' : 'B') : bet.outcome;
        active.forEach(pl => {
          pl.betParticipations++;
          const plChoice = Math.random() < 0.5 ? 'A' : 'B';
          const fx = plChoice === actualOutcome ? bet.winFx : bet.loseFx;
          if (plChoice === actualOutcome) pl.betWins++;
          (fx || []).forEach(e => {
            if (e.t === 'b') pl.bonheur += e.v;
            else if (e.t === 'm') pl.money += e.v;
          });
        });
      } else if (rnd < 0.25 && active.length >= 2) {
        const duel = DUELS[Math.floor(Math.random() * DUELS.length)];
        const others = active.filter(pl => pl.id !== p.id);
        const target = others[Math.floor(Math.random() * others.length)];
        const bonusA = Math.floor((p.stats[duel.stat] || 5) / 3);
        const bonusB = Math.floor((target.stats[duel.stat] || 5) / 3);
        const rollA = Math.floor(Math.random() * 6) + 1 + bonusA;
        const rollB = Math.floor(Math.random() * 6) + 1 + bonusB;
        if (duel.money) {
          if (rollA >= rollB) { p.money += duel.money; target.money -= duel.money; p.duelWins++; target.duelLosses++; }
          else { p.money -= duel.money; target.money += duel.money; p.duelLosses++; target.duelWins++; }
        } else {
          if (rollA >= rollB) { p.bonheur += duel.stakes; target.bonheur -= duel.stakes; p.duelWins++; target.duelLosses++; }
          else { p.bonheur -= duel.stakes; target.bonheur += duel.stakes; p.duelLosses++; target.duelWins++; }
        }
      } else {
        const card = drawCard(landNode.deck);
        const damaged = applyCard(card, p.id, players);
        if (damaged) p.assetDamageCount++;
      }
    }

    updateMinTracking(players);

    if (!p.finished) {
      if (p.bonheur < 0) {
        p.negativeTurns = (p.negativeTurns || 0) + 1;
        if (p.negativeTurns > 3) { p.finished = true; p.eliminated = true; }
      } else {
        p.negativeTurns = 0;
      }
    }

    if (players.every(p => p.finished)) break;
    idx = (idx + 1) % players.length;
  }

  players.filter(p => !p.finished).forEach(p => {
    finishCount++;
    p.order = finishCount;
    p.finished = true;
  });

  return players;
}

// ── RUN 10 000 PARTIES ───────────────────────────────────────────────────────
const N = 10000;
// objHits[objId] = nombre de joueurs qui ont atteint l'objectif sur toutes les parties
const objHits = Object.fromEntries(OBJECTIVES.map(o => [o.id, 0]));

process.stdout.write(`Simulation de ${N} parties`);
for (let g = 0; g < N; g++) {
  const players = simulateGame();
  players.forEach(p => {
    OBJECTIVES.forEach(obj => {
      if (obj.cond(p)) objHits[obj.id]++;
    });
  });
  if ((g + 1) % 1000 === 0) process.stdout.write('.');
}
console.log(' OK\n');

// ── CALCUL DIFFICULTÉ & RÉCOMPENSE ────────────────────────────────────────────
// Taux = hits / (N * 5 joueurs) — proportion de joueurs ayant réussi l'objectif
const TOTAL = N * PLAYER_DEFS.length;

function getDifficulty(rate) {
  if (rate > 0.70) return { label:'⬜ Trivial',         reward:'+2 ❤️' };
  if (rate > 0.50) return { label:'🟩 Facile',          reward:'+4 ❤️' };
  if (rate > 0.30) return { label:'🟦 Moyen',           reward:'+6 ❤️' };
  if (rate > 0.15) return { label:'🟧 Difficile',       reward:'+8 ❤️' };
  if (rate > 0.06) return { label:'🟥 Très difficile',  reward:'+10 ❤️' };
  if (rate > 0.02) return { label:'🟣 Épique',          reward:'+13 ❤️' };
  return               { label:'⚫ Légendaire',         reward:'+16 ❤️' };
}

// ── AFFICHAGE ─────────────────────────────────────────────────────────────────
const PAD = (s, n) => String(s).padStart(n);
const PADR = (s, n) => String(s).padEnd(n);

console.log('╔══════════════════════════════════════════════════════════════════════════════════════════════╗');
console.log(`║          SCHLOSS — 30 OBJECTIFS SECRETS · ${N.toLocaleString('fr-FR')} parties × 5 joueurs                     ║`);
console.log('╚══════════════════════════════════════════════════════════════════════════════════════════════╝\n');

console.log('┌────┬──────────────────────────────────────────┬──────────┬──────────────────────┬─────────────┐');
console.log('│ N° │ Objectif                                 │  Taux    │ Difficulté           │ Récompense  │');
console.log('├────┼──────────────────────────────────────────┼──────────┼──────────────────────┼─────────────┤');

const sorted = [...OBJECTIVES].sort((a, b) => objHits[b.id] - objHits[a.id]);

sorted.forEach((obj, i) => {
  const hits = objHits[obj.id];
  const rate = hits / TOTAL;
  const pct = (rate * 100).toFixed(1) + '%';
  const { label, reward } = getDifficulty(rate);
  console.log(`│${PAD(i+1, 3)} │ ${PADR(obj.label, 40)} │${PAD(pct, 8)} │ ${PADR(label, 20)} │ ${PADR(reward, 11)} │`);
});

console.log('└────┴──────────────────────────────────────────┴──────────┴──────────────────────┴─────────────┘\n');

// Aussi afficher dans l'ordre original (numéroté 1-30 pour la liste finale)
console.log('── Liste ordonnée (numérotation stable pour implémentation) ──\n');
OBJECTIVES.forEach((obj, i) => {
  const hits = objHits[obj.id];
  const rate = hits / TOTAL;
  const pct = (rate * 100).toFixed(1) + '%';
  const { label, reward } = getDifficulty(rate);
  console.log(`${String(i+1).padStart(2)}. [${pct.padStart(5)}] ${reward.padEnd(9)} ${label.padEnd(22)} ${obj.label}`);
});
