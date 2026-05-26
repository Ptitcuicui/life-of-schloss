// SCHLOSS — Le Jeu de la Vie · Haute-Marne · Cadeau mariage Toutoon & Incoherence 💍
'use strict';

// ── STOP POSITIONS (% of canvas width/height) ────────────────────────────────
// Path winds through Haute-Marne from north (Lac du Der) to finale (Chaumont)
const STOPS = [
  // ── ENFANCE (rows 0-2) ──
  { id:'start',    label:'Lac du Der',                          icon:'🌊', type:'start',  ch:'🧒 Enfance' },
  { id:'p_sd',     label:'Saint-Dizier',                        icon:'🃏', type:'card',   ch:'🧒 Enfance', deck:'money' },
  { id:'p_join',   label:'Joinville',                           icon:'🃏', type:'card',   ch:'🧒 Enfance', deck:'love' },
  { id:'p_col52',  label:'Chaumont\nCollège L. Michel',         icon:'⭐', type:'story',  ch:'🧒 Enfance', storyId:'college' },
  { id:'p_wassy',  label:'Wassy',                               icon:'🃏', type:'card',   ch:'🧒 Enfance', deck:'gaming' },
  { id:'p_tractor',label:'Bloqué derrière\nun Tracteur',        icon:'🚜', type:'card',   ch:'🧒 Enfance', deck:'surprise' },
  { id:'p_der',    label:'Lac du Der\nBaignade Estivale',       icon:'🃏', type:'card',   ch:'🧒 Enfance', deck:'love' },
  { id:'p_sd2',    label:'Saint-Dizier\nVélo le Week-end',      icon:'🃏', type:'card',   ch:'🧒 Enfance', deck:'gaming' },
  { id:'p_math',   label:'Cours de Maths\nAvancés',             icon:'⭐', type:'story',  ch:'🧒 Enfance', storyId:'maths_avances' },
  { id:'p_chm1',   label:'Chaumont\nLa Bande se Forme',         icon:'🃏', type:'card',   ch:'🧒 Enfance', deck:'money' },
  { id:'p_colo',   label:'Colonie de Vacances\nHaute-Marne',    icon:'🃏', type:'card',   ch:'🧒 Enfance', deck:'surprise' },
  { id:'p_join2',  label:'Joinville\nLe Vieux Quartier',        icon:'🃏', type:'card',   ch:'🧒 Enfance', deck:'money' },
  { id:'p_enf3',   label:'Piscine\nde Chaumont',                icon:'🃏', type:'card',   ch:'🧒 Enfance', deck:'love' },
  { id:'p_wass2',  label:'Wassy\nLa Fête du Village',           icon:'🃏', type:'card',   ch:'🧒 Enfance', deck:'gaming' },
  { id:'fork1',    label:'Orientation\nLycée',                  icon:'🔀', type:'fork',   ch:'🎒 Lycée',
    choices:[{label:'📚 Filière Scientifique',next:'f1a'},{label:'🔧 Filière Technique (BTS)',next:'f1b'}] },

  // ── LYCÉE (rows 3-5) ──
  { id:'f1a',      label:'Cours de Sciences\nChaumont',          icon:'🔬', type:'card',   ch:'🎒 Lycée', deck:'gaming' },
  { id:'f1a2',     label:'Atelier Arts\nChaumont',              icon:'🎨', type:'card',   ch:'🎒 Lycée', deck:'surprise' },
  { id:'f1b',      label:'BTS Électro\nSaint-Dizier',           icon:'🔧', type:'card',   ch:'🎒 Lycée', deck:'money' },
  { id:'f1b2',     label:'Atelier Technique\nSaint-Dizier',     icon:'🔧', type:'card',   ch:'🎒 Lycée', deck:'gaming' },
  { id:'p_lycee',  label:'Lycée Ch. de Gaulle\nSection Scientifique', icon:'⭐', type:'story',  ch:'🎒 Lycée', storyId:'lycee_manaa' },
  { id:'p_bac1',   label:'Révisions BAC\nSalle de Permanence',  icon:'🃏', type:'card',   ch:'🎒 Lycée', deck:'surprise' },
  { id:'p_lyc2',   label:'Cantine du Lycée\nLe Plateau Mythique', icon:'🃏', type:'card', ch:'🎒 Lycée', deck:'gaming' },
  { id:'p_lyc3',   label:'Foire de Chaumont\nLe Grand Soir',    icon:'🃏', type:'card',   ch:'🎒 Lycée', deck:'love' },
  { id:'p_lyc4',   label:'Soirée Boom\ndu Lycée',               icon:'🃏', type:'card',   ch:'🎒 Lycée', deck:'surprise' },
  { id:'p_lyc5',   label:'Cours de Philo\nau Fil des Heures',   icon:'🃏', type:'card',   ch:'🎒 Lycée', deck:'money' },
  { id:'p_lyc6',   label:'Bal de Promo\nde Terminale',          icon:'🃏', type:'card',   ch:'🎒 Lycée', deck:'love' },
  { id:'p_lyc7',   label:'Le Grand BAC\nJour J',                icon:'⭐', type:'story',  ch:'🎒 Lycée', storyId:'bac' },
  { id:'p_lyc8',   label:'Résultats du BAC\nDevant le Lycée',   icon:'🃏', type:'card',   ch:'🎒 Lycée', deck:'surprise' },
  { id:'p_lyc9',   label:'Fête du BAC\nChez Sponge',            icon:'🃏', type:'card',   ch:'🎒 Lycée', deck:'gaming' },
  { id:'fork_et',  label:'Après le BAC\nQuelle Suite ?',         icon:'🔀', type:'fork',   ch:'🎓 Études',
    choices:[{label:'🏘️ Rester dans le 52',next:'fe_a'},{label:'🎓 Supinfo à Troyes',next:'fe_b'}] },

  // ── ÉTUDES (rows 6-8) ──
  { id:'fe_a',     label:'Vignory\nFac Locale 52',              icon:'🃏', type:'card',   ch:'🎓 Études', deck:'money' },
  { id:'fe_a2',    label:'Colombey-les-Deux-Églises',           icon:'⭐', type:'story',  ch:'🎓 Études', storyId:'colombey' },
  { id:'fe_a3',    label:'Chaumont\nCours du Soir',             icon:'🃏', type:'card',   ch:'🎓 Études', deck:'surprise' },
  { id:'fe_b',     label:'Bar-sur-Aube\nVers Troyes',           icon:'🃏', type:'card',   ch:'🎓 Études', deck:'gaming' },
  { id:'fe_b2',    label:'Troyes — Supinfo\nLa Rencontre',      icon:'⭐', type:'story',  ch:'🎓 Études', storyId:'supinfo' },
  { id:'fe_b3',    label:'Colocation\nà Troyes',                icon:'🃏', type:'card',   ch:'🎓 Études', deck:'love' },
  { id:'fe_b4',    label:'Soirée Étudiante\nFin de Semestre',   icon:'🃏', type:'card',   ch:'🎓 Études', deck:'gaming' },
  { id:'p_arc',    label:'Arc-en-Barrois\nLe Week-end',         icon:'🃏', type:'card',   ch:'🎓 Études', deck:'surprise' },
  { id:'p_etu1',   label:'Bibliothèque\nUniversitaire',         icon:'🃏', type:'card',   ch:'🎓 Études', deck:'money' },
  { id:'p_etu2',   label:'Châteauvillain\nRetour en 52',        icon:'🃏', type:'card',   ch:'🎓 Études', deck:'love' },
  { id:'p_etu3',   label:'Première Coloc\nChaumont',            icon:'🃏', type:'card',   ch:'🎓 Études', deck:'surprise' },
  { id:'p_etu4',   label:'Retour aux Sources\nSaint-Dizier',    icon:'🃏', type:'card',   ch:'🎓 Études', deck:'gaming' },
  { id:'p_mid',    label:'Forêt de Châteauvillain\nPromenade du 52', icon:'🃏', type:'card', ch:'🎓 Études', deck:'money' },
  { id:'p_etu5',   label:'Diplôme !\nRemise en Haute-Marne',    icon:'🃏', type:'card',   ch:'🎓 Études', deck:'love' },
  { id:'fork2',    label:'Été de\nla Décision',                 icon:'🔀', type:'fork',   ch:'💼 Vie Active',
    choices:[{label:'💼 Faire un Stage',next:'f2a'},{label:'🌊 Prendre des Vacances',next:'f2b'}] },

  // ── VIE ACTIVE (rows 9-12) ──
  { id:'f2a',      label:'Zone Industrielle\nSaint-Dizier',     icon:'💼', type:'card',   ch:'💼 Vie Active', deck:'surprise' },
  { id:'f2a2',     label:"Nogent-en-Bassigny\nL'Accident",      icon:'⭐', type:'story',  ch:'💼 Vie Active', storyId:'knife' },
  { id:'f2a3',     label:'Nogent\nLa Nuit du Stage',            icon:'⭐', type:'story',  ch:'💼 Vie Active', storyId:'stage' },
  { id:'f2b',      label:'Plage du Lac du Der\nÉté Schloss',    icon:'🌊', type:'card',   ch:'💼 Vie Active', deck:'love' },
  { id:'f2b2',     label:'Bourbonne-les-Bains\nLes Thermes',    icon:'⭐', type:'story',  ch:'💼 Vie Active', storyId:'bourbonne' },
  { id:'f2b3',     label:'Retour de Vacances\nLe 52 en Septembre', icon:'🃏', type:'card', ch:'💼 Vie Active', deck:'gaming' },
  { id:'p8',       label:'Appartement\ndu Schloss',             icon:'🃏', type:'card',   ch:'💼 Vie Active', deck:'love' },
  { id:'p8b',      label:'La Grange\nSoirée LAN',               icon:'🃏', type:'card',   ch:'💼 Vie Active', deck:'gaming' },
  { id:'p_job1',   label:'Premier Salaire !\nLa Fiche de Paie', icon:'🃏', type:'card',   ch:'💼 Vie Active', deck:'money' },
  { id:'p_job2',   label:'Open Space\nSaint-Dizier',            icon:'🃏', type:'card',   ch:'💼 Vie Active', deck:'surprise' },
  { id:'p_act1',   label:'Embouteillage D619\nDerrière un Engin', icon:'🚜', type:'card', ch:'💼 Vie Active', deck:'surprise' },
  { id:'p_act2',   label:'Bloqué derrière\nun Tracteur #2',     icon:'🃏', type:'card',   ch:'💼 Vie Active', deck:'gaming' },
  { id:'p_act3',   label:'Raclette du Schloss\nFin de Semaine', icon:'🃏', type:'card',   ch:'💼 Vie Active', deck:'love' },
  { id:'p_act4',   label:'Nostalgie du 52\nAu Bureau',          icon:'🃏', type:'card',   ch:'💼 Vie Active', deck:'surprise' },
  { id:'p_act5',   label:'Promotion !\nNouveau Palier',         icon:'🃏', type:'card',   ch:'💼 Vie Active', deck:'money' },
  { id:'p_act6',   label:'Réunion sans Fin\n9h → 18h',         icon:'🃏', type:'card',   ch:'💼 Vie Active', deck:'gaming' },
  { id:'p_act7',   label:'Apéro entre Collègues\nAprès le Boulot', icon:'🃏', type:'card', ch:'💼 Vie Active', deck:'love' },
  { id:'p_act8',   label:'Télétravail\nen Haute-Marne',         icon:'🃏', type:'card',   ch:'💼 Vie Active', deck:'surprise' },
  { id:'p_act9',   label:'Reconversion ?\nÀ la Croisée',       icon:'🃏', type:'card',   ch:'💼 Vie Active', deck:'money' },
  { id:'fork3',    label:'Carrefour\nCarrière',                 icon:'🔀', type:'fork',   ch:'💼 Carrière',
    choices:[{label:'💻 Dev & Data',next:'f3a'},{label:'🏭 Tech & Industrie',next:'f3b'}] },

  // ── CARRIÈRE (rows 13-14) ──
  { id:'f3a',      label:'Télétravail Dev\nHaute-Marne',        icon:'💻', type:'card',   ch:'💼 Carrière', deck:'career' },
  { id:'f3a2',     label:'Startup\nChampenoise',                icon:'💰', type:'card',   ch:'💼 Carrière', deck:'money' },
  { id:'f3b',      label:'Forge\nde Nogent',                    icon:'🏭', type:'card',   ch:'💼 Carrière', deck:'career' },
  { id:'f3b2',     label:'Industrie\nSaint-Dizier',             icon:'🏭', type:'card',   ch:'💼 Carrière', deck:'money' },
  { id:'p_lang',   label:'Langres\nCité Fortifiée',             icon:'⭐', type:'story',  ch:'💼 Carrière', storyId:'langres' },
  { id:'p_car1',   label:'Conférence\nà Paris',                 icon:'🃏', type:'card',   ch:'💼 Carrière', deck:'surprise' },
  { id:'p_car2',   label:'Nouveau Contrat\nSigné',              icon:'🃏', type:'card',   ch:'💼 Carrière', deck:'money' },
  { id:'p_mont',   label:'Montigny-le-Roi\nLe Panorama',        icon:'🃏', type:'card',   ch:'💼 Carrière', deck:'gaming' },
  { id:'p_fayl',   label:'Fayl-Billot\nLe Marché',             icon:'🃏', type:'card',   ch:'💼 Carrière', deck:'love' },
  { id:'p_bourm',  label:'Bourmont\nSur la Colline',            icon:'🃏', type:'card',   ch:'💼 Carrière', deck:'surprise' },

  // ── VIE ADULTE (rows 15-17) ──
  { id:'p_adu1',   label:'Marché de Noël\nde Chaumont',         icon:'🃏', type:'card',   ch:'🏡 Vie Adulte', deck:'love' },
  { id:'p_adu2',   label:"Festival Européen\nde l'Affiche",     icon:'🃏', type:'card',   ch:'🏡 Vie Adulte', deck:'surprise' },
  { id:'p_adu3',   label:'Remparts\nde Langres',                icon:'🃏', type:'card',   ch:'🏡 Vie Adulte', deck:'gaming' },
  { id:'p_adu4',   label:'Cousinade\ndu 52',                    icon:'🃏', type:'card',   ch:'🏡 Vie Adulte', deck:'love' },
  { id:'p_adu5',   label:'Soirée Nostalgie\nSchloss',           icon:'🃏', type:'card',   ch:'🏡 Vie Adulte', deck:'gaming' },
  { id:'p_adu6',   label:'Voisins\nAgriculteurs',               icon:'🚜', type:'card',   ch:'🏡 Vie Adulte', deck:'surprise' },
  { id:'p_adu7',   label:'Lac du Der\nWeek-end Adulte',         icon:'🃏', type:'card',   ch:'🏡 Vie Adulte', deck:'love' },
  { id:'p_adu8',   label:'Jardin\nen Haute-Marne',              icon:'🃏', type:'card',   ch:'🏡 Vie Adulte', deck:'money' },
  { id:'p_viad',   label:'Viaduc de Chaumont\nCoucher de Soleil', icon:'⭐', type:'story', ch:'🏡 Vie Adulte', storyId:'viaduc' },
  { id:'fork4',    label:'Un Nouveau\nChapitre',                icon:'🔀', type:'fork',   ch:'🏡 Vie Adulte',
    choices:[{label:'🚗 Road Trip Haute-Marne',next:'f4a'},{label:'🏡 Acheter une Maison',next:'f4b'}] },
  { id:'f4a',      label:'Road Trip\nHaute-Marne',              icon:'🚗', type:'card',   ch:'🏡 Vie Adulte', deck:'love' },
  { id:'f4a2',     label:'Retour\naux Sources',                 icon:'🃏', type:'card',   ch:'🏡 Vie Adulte', deck:'surprise' },
  { id:'f4b',      label:'Achat de la Maison\ndu 52',           icon:'🏡', type:'card',   ch:'🏡 Vie Adulte', deck:'money' },
  { id:'f4b2',     label:'Rénovation\nOldschool',               icon:'🔨', type:'card',   ch:'🏡 Vie Adulte', deck:'gaming' },
  { id:'p_adu9',   label:'Vie Rurale\nHaute-Marne',             icon:'🃏', type:'card',   ch:'🏡 Vie Adulte', deck:'love' },

  // ── VERS LE MARIAGE (rows 18-19) ──
  { id:'p_gex',    label:'Viaduc de Chaumont\nRendez-vous Romantique', icon:'🃏', type:'card', ch:'💍 Vers le Mariage', deck:'love' },
  { id:'p_fin1',   label:'La Grande Demande !\nSous le Ciel du 52',   icon:'⭐', type:'story', ch:'💍 Vers le Mariage', storyId:'demande' },
  { id:'p_fin2',   label:'Tour Hautefeuille\nChaumont',               icon:'🃏', type:'card',  ch:'💍 Vers le Mariage', deck:'love' },
  { id:'p_fin3',   label:'Bague de Langres\nLa Tradition',            icon:'🃏', type:'card',  ch:'💍 Vers le Mariage', deck:'surprise' },
  { id:'p_fin4',   label:'Annonce\nà la Famille',                     icon:'🃏', type:'card',  ch:'💍 Vers le Mariage', deck:'gaming' },
  { id:'p_fin5',   label:'Liste de Mariage\nChez Sponge',             icon:'🃏', type:'card',  ch:'💍 Vers le Mariage', deck:'money' },
  { id:'p_fin6',   label:'Soirée des Amis\nde la Bande',              icon:'🃏', type:'card',  ch:'💍 Vers le Mariage', deck:'love' },
  { id:'p_fin7',   label:"Mairie de Chaumont\nL'Officiel",            icon:'🃏', type:'card',  ch:'💍 Vers le Mariage', deck:'surprise' },
  { id:'p_fin8',   label:'Dernière Soirée\nSchloss',                  icon:'🃏', type:'card',  ch:'💍 Vers le Mariage', deck:'gaming' },
  { id:'finale',   label:'🏰 Chaumont\nLe Mariage!',                  icon:'💍', type:'finale', ch:'💍 La Vie Commence' },
];

// Path connections (main path & fork branches)
const EDGES = [
  // Row 0 L→R (Enfance début)
  ['start','p_sd'],['p_sd','p_join'],['p_join','p_col52'],['p_col52','p_wassy'],
  // U-turn row0→row1
  ['p_wassy','p_tractor'],
  // Row 1 R←L (Enfance grandir)
  ['p_tractor','p_der'],['p_der','p_sd2'],['p_sd2','p_math'],['p_math','p_chm1'],
  // U-turn row1→row2
  ['p_chm1','p_colo'],
  // Row 2 L→R (Enfance → Lycée)
  ['p_colo','p_join2'],['p_join2','p_enf3'],['p_enf3','p_wass2'],['p_wass2','fork1'],
  // Fork1 branches (row 3 R←L) — branch A: Générale, branch B: Technique
  ['fork1','f1a'],['f1a','f1a2'],['f1a2','p_lycee'],
  ['fork1','f1b'],['f1b','f1b2'],['f1b2','p_lycee'],
  // U-turn row3→row4
  ['p_lycee','p_bac1'],
  // Row 4 L→R (Lycée)
  ['p_bac1','p_lyc2'],['p_lyc2','p_lyc3'],['p_lyc3','p_lyc4'],['p_lyc4','p_lyc5'],
  // U-turn row4→row5
  ['p_lyc5','p_lyc6'],
  // Row 5 R←L (Lycée → BAC)
  ['p_lyc6','p_lyc7'],['p_lyc7','p_lyc8'],['p_lyc8','p_lyc9'],['p_lyc9','fork_et'],
  // Fork_et branches (row 6 L→R) — branch A: local, branch B: Troyes
  ['fork_et','fe_a'],['fe_a','fe_a2'],['fe_a2','fe_a3'],['fe_a3','p_arc'],
  ['fork_et','fe_b'],['fe_b','fe_b2'],['fe_b2','fe_b3'],['fe_b3','fe_b4'],['fe_b4','p_arc'],
  // Row 7 R←L (Études convergence)
  ['p_arc','p_etu1'],['p_etu1','p_etu2'],
  // U-turn row7→row8
  ['p_etu2','p_etu3'],
  // Row 8 L→R (Études → Vie Active)
  ['p_etu3','p_etu4'],['p_etu4','p_mid'],['p_mid','p_etu5'],['p_etu5','fork2'],
  // Fork2 branches (row 9 R←L) — branch A: Stage, branch B: Vacances
  ['fork2','f2a'],['f2a','f2a2'],['f2a2','f2a3'],['f2a3','f2b3'],
  ['fork2','f2b'],['f2b','f2b2'],['f2b2','f2b3'],
  // Row 10 L→R (Vie Active début)
  ['f2b3','p8'],['p8','p8b'],['p8b','p_job1'],['p_job1','p_job2'],
  // U-turn row10→row11
  ['p_job2','p_act1'],
  // Row 11 R←L (Vie Active)
  ['p_act1','p_act2'],['p_act2','p_act3'],['p_act3','p_act4'],['p_act4','p_act5'],
  // U-turn row11→row12
  ['p_act5','p_act6'],
  // Row 12 L→R (Vie Active → Carrière)
  ['p_act6','p_act7'],['p_act7','p_act8'],['p_act8','p_act9'],['p_act9','fork3'],
  // Fork3 branches (row 13 R←L) — branch A: Dev, branch B: Industrie
  ['fork3','f3a'],['f3a','f3a2'],['f3a2','p_lang'],
  ['fork3','f3b'],['f3b','f3b2'],['f3b2','p_lang'],
  // U-turn row13→row14
  ['p_lang','p_car1'],
  // Row 14 L→R (Carrière → Vie Adulte)
  ['p_car1','p_car2'],['p_car2','p_mont'],['p_mont','p_fayl'],['p_fayl','p_bourm'],
  // U-turn row14→row15
  ['p_bourm','p_adu1'],
  // Row 15 R←L (Vie Adulte)
  ['p_adu1','p_adu2'],['p_adu2','p_adu3'],['p_adu3','p_adu4'],['p_adu4','p_adu5'],
  // U-turn row15→row16
  ['p_adu5','p_adu6'],
  // Row 16 L→R (Vie Adulte → Maison)
  ['p_adu6','p_adu7'],['p_adu7','p_adu8'],['p_adu8','p_viad'],['p_viad','fork4'],
  // Fork4 branches (row 17 R←L) — branch A: Road Trip, branch B: Maison
  ['fork4','f4a'],['f4a','f4a2'],['f4a2','p_adu9'],
  ['fork4','f4b'],['f4b','f4b2'],['f4b2','p_adu9'],
  // U-turn row17→row18
  ['p_adu9','p_gex'],
  // Row 18 L→R (Vers le Mariage)
  ['p_gex','p_fin1'],['p_fin1','p_fin2'],['p_fin2','p_fin3'],['p_fin3','p_fin4'],
  // U-turn row18→row19
  ['p_fin4','p_fin5'],
  // Row 19 R←L (Vers le Mariage → Finale)
  ['p_fin5','p_fin6'],['p_fin6','p_fin7'],['p_fin7','p_fin8'],['p_fin8','finale'],
];

// ── CHAPTER COLORS for path segments ─────────────────────────────────────────
const CHAPTER_COLORS = {
  '🧒 Enfance':          '#d4a030',
  '🎒 Lycée':            '#4a90e2',
  '🎓 Études':           '#4ab8a0',
  '💼 Vie Active':       '#e07040',
  '💼 Carrière':         '#e07040',
  '🏡 Vie Adulte':       '#9a60c0',
  '💍 Vers le Mariage':  '#ffd700',
  '💍 La Vie Commence':  '#ffd700',
};

// Build maps
const STOP_MAP = new Map(STOPS.map(s=>[s.id,s]));
STOPS.forEach(s => {
  if (!s.next) {
    const found = EDGES.filter(([a])=>a===s.id).map(([,b])=>b);
    s.next = found;
  }
});

// Haute-Marne rough outline polygon (% of canvas)
const HM_POLY = [
  .50,.02, .58,.03, .68,.05, .78,.08, .86,.14, .90,.22,
  .91,.32, .89,.44, .86,.56, .84,.66, .80,.74, .75,.82,
  .68,.90, .60,.96, .52,.99, .42,.99, .33,.97, .24,.92,
  .17,.84, .12,.74, .10,.62, .11,.50, .13,.38, .16,.28,
  .21,.18, .27,.10, .35,.05, .42,.02,
];

// Terrain patches [cx%, cy%, rx%, ry%, color]
const TERRAIN = [
  [.20,.20,.12,.08,'#3a6e28'],[.65,.12,.10,.06,'#3a6e28'],[.78,.38,.08,.10,'#3a6e28'],
  [.15,.68,.08,.08,'#3a6e28'],[.60,.78,.07,.07,'#3a6e28'],[.35,.82,.06,.06,'#3a6e28'],
  [.30,.30,.06,.05,'#6b5030'],[.72,.52,.05,.06,'#6b5030'],[.45,.75,.06,.04,'#6b5030'],
  [.40,.17,.14,.06,'#1e4a7a'],[.55,.48,.03,.04,'#1e4a7a'], // river marne
];

// ── STORY EVENTS ──────────────────────────────────────────────────────────────
// src:'real' = basé sur une vraie anecdote | src:'invented' = inventé par l'IA (à remplacer)
const STORIES = {
  college: {
    src:'real',
    title:'🏫 Collège Louise Michel — La Bande Se Forme',
    text:"Premier jour de collège, quelque part à Chaumont.\nLes couloirs sentent la craie neuve.\n\nDes gamins du 52 se croisent pour la première fois.\nIls ne le savent pas encore,\nmais cette bande durera 20 ans.\n\nBienvenue au Schloss.",
    fx:[{t:'b',v:3,l:'❤️ +3 bonheur (les vraies amitiés commencent ici)'}],
    extra:{ toutoon:[{t:'b',v:2,l:'😤 Toutoon : +2 bonheur (chef de guerre en herbe)'}], ptitcuicui:[{t:'b',v:2,l:'🔵 Ptitcuicui : +2 bonheur (le futur stratège observe tout)'}] }
  },
  maths_avances: {
    src:'real',
    title:'📐 Cours de Maths Avancés',
    text:"Un cours pour les élèves rapides.\nDeux gamins finissent les exercices avant tout le monde.\nRegards croisés.\n\n« T\'as fait comment le 3 ? »\n« Pareil que toi. »\n\nPas de rivalité, juste deux cerveaux qui se reconnaissent.\nCette complicité-là, on ne l\'explique pas.",
    fx:[{t:'b',v:2,l:'🧮 +2 bonheur (trouver quelqu\'un qui pense comme toi)'}],
    extra:{ toutoon:[{t:'b',v:3,l:'😤 Toutoon : +3 bonheur (enfin quelqu\'un qui suit)'}], ptitcuicui:[{t:'b',v:3,l:'🐦 Ptitcuicui : +3 bonheur (future amitié de cerveau)'}] }
  },
  lycee_manaa: {
    src:'real',
    title:'🎨 Lycée Ch. de Gaulle — Section Scientifique',
    text:"Lycée Charles de Gaulle à Chaumont.\nSection scientifique — maths, physique, le classique.\n\nMais dans les couloirs, il y a l\'autre section.\nLa MANAA — arts appliqués — un monde à part.\n\nLes travaux exposés dans le couloir...\ntellement abstraits et incompréhensibles\nque s\'en approcher trop longtemps est dangereux.\n\n🎵 Mana mana — tu du du du du — Mana mana...\n\nOn évitait ce couloir.",
    fx:[{t:'b',v:2,l:'📐 +2 bonheur (fiers de la filière scientifique)'},{t:'m',v:200,l:'💶 +200€ (vendus une œuvre MANAA comme art contemporain)'}],
    extra:{ ptitcuicui:[{t:'b',v:1,l:'🐦 Ptitcuicui : +1 bonheur (il a quand même essayé de comprendre)'}] }
  },
  colombey: {
    src:'real', // Tournoi Rocket League — Ptitcuicui+Toutoon vs Whitewarrior+Sponge en finale, Ptitcuicui+Toutoon gagnent
    title:'🚀 La Finale Rocket League',
    text:"Un tournoi Rocket League au Schloss.\nQuatre équipes. Deux binômes se détachent.\n\nPtitcuicui & Toutoon d\'un côté.\nWhitewarrior & Sponge de l\'autre.\n\nIls écrasent tout le monde.\nLa finale oppose les deux binômes du Schloss.\n\nPtitcuicui place le tir. Toutoon assure.\nLa rage de Whitewarrior est contenue — à peine.\n\nSchloss vs Schloss.\nLe Schloss gagne quand même.",
    fx:[{t:'b',v:4,l:'🚀 +4 bonheur (finale de légende)'}],
    extra:{
      ptitcuicui:[{t:'b',v:3,l:'🔵 +3 bonheur (champion incontesté)'}],
      toutoon:[{t:'b',v:3,l:'😤 +3 bonheur (il était bon ce soir-là, il le dit encore)'}],
      whitewarrior:[{t:'b',v:1,l:'⚔️ +1 bonheur (finaliste, c\'est déjà ça)'}],
      sponge:[{t:'b',v:1,l:'🧽 +1 bonheur (finaliste, c\'est déjà ça)'}]
    }
  },
  supinfo: {
    src:'real', // Ptitcuicui dit "Tu peux mourir en silence" quand Incoherence éternue en cours
    title:'🎓 Supinfo Troyes — La Rencontre Légendaire',
    text:"Un cours d'informatique à Troyes.\nPtitcuicui est au tableau.\nUne étudiante éternue discrètement au fond de la salle.\n\nLa réponse fuse, sans hésiter :\n« Tu peux mourir en silence s'il te plaît ? »\n\nLa classe s'arrête. Puis éclate de rire.\nUne amitié bizarre mais sincère vient de naître.",
    fx:[{t:'b',v:3,l:'😂 +3 bonheur (un running gag qui dure encore)'}],
    extra:{ ptitcuicui:[{t:'b',v:2,l:'🔵 +2 bonheur (prof le plus mémorable de Supinfo)'}], invoherence:[{t:'b',v:2,l:'🐰 +2 bonheur (et tu peux éternuer maintenant)'}] }
  },
  stage: {
    src:'real', // Stage : Ptitcuicui arrive exprès en retard pour que Toutoon soit seul avec Incoherence
    title:'💼 Le Stage — Le Grand Moment',
    text:"Un stage. Trois compères : Ptitcuicui, Toutoon, Incoherence.\n\nCe jour-là, Ptitcuicui arrive en retard.\nExprès.\n\nToutoon se retrouve seul avec Incoherence.\nIl prend son courage à deux mains.\nIncoherence dit oui.\n\nLe reste... c'est l'histoire du Schloss. ❤️",
    fx:[{t:'b',v:5,l:'💍 +5 bonheur (le début de quelque chose de grand)'},{t:'m',v:1000,l:'💶 +1000€ (prime de fin de stage)'}],
    extra:{
      ptitcuicui:[{t:'b',v:3,l:'🔵 +3 bonheur en plus (le plan a fonctionné !)'}],
      toutoon:[{t:'b',v:4,l:'😤→❤️ +4 bonheur (pour une fois, pas de rage)'}],
      invoherence:[{t:'b',v:4,l:'🐰 +4 bonheur (oui, pour la vie)'}]
    }
  },
  bourbonne: {
    src:'real', // LAN Farming Simulator au Schloss pour le Nouvel An — ils ratent le passage à minuit tellement ils sont concentrés
    title:'🚜 La LAN du Réveillon',
    text:"Nouvel An au Schloss.\nTout le monde est là. Il y a des chips, des écrans, des câbles partout.\n\nFarming Simulator. Une carte co-op.\nLes champs ne se sèment pas tout seuls.\n\nMinuit passe.\nPersonne ne s\'en rend compte.\nQuelqu\'un regarde l\'heure : 00h23.\n\n« Bonne année au fait. »\n« Ouais ouais. Quelqu\'un peut remplir les silos ? »",
    fx:[{t:'b',v:5,l:'🎆 +5 bonheur (le meilleur Réveillon de leur vie)'},{t:'m',v:-150,l:'💸 -150€ (chips + boissons du Réveillon)'}],
    extra:{ toutoon:[{t:'b',v:2,l:'😤 Toutoon : +2 bonheur (il gère la moissonneuse)'}], sponge:[{t:'b',v:2,l:'🧽 Sponge : +2 bonheur (les silos sont pleins)'}] }
  },
  langres: {
    src:'invented',
    title:'🛡️ Langres — La Cité Fortifiée',
    text:"Les remparts gallo-romains de Langres dominent la plaine.\nDiderot est né ici. La ville résiste depuis 2 000 ans.\n\nVous aussi, vous résistez.\nC'est ça, le Schloss.",
    fx:[{t:'b',v:2,l:'🛡️ +2 bonheur (indestructible comme les remparts)'},{t:'m',v:500,l:'💶 +500€ (vente d\'artisanat local)'}]
  },
  knife: {
    src:'real', // Ptitcuicui blesse Sponge avec un couteau sans le vouloir, il avait déjà le pansement prêt (pas à Nogent)
    title:'🔪 L\'Accident Légendaire au Couteau',
    text:"Un couteau. Un geste maladroit de Ptitcuicui.\nSponge regarde son doigt avec incrédulité.\n\nPtitcuicui réalise ce qu\'il vient de faire.\nSponge réalise ce qu\'il vient de recevoir.\n\nCe moment est entré dans la légende du Schloss.\nSponge a encore la cicatrice.",
    fx:[{t:'b',v:4,l:'😂 +4 bonheur (l\'histoire fait encore rire 10 ans après)'}],
    extra:{ sponge:[{t:'b',v:3,l:'🧽 Sponge : +3 bonheur (la cicatrice est un badge d\'honneur)'}], ptitcuicui:[{t:'b',v:2,l:'🔵 Ptitcuicui : +2 bonheur (maladroit mais inoubliable)'}] }
  },
  viaduc: {
    src:'invented', // à remplacer par une vraie anecdote autour du viaduc
    title:'🌉 Le Viaduc de Chaumont',
    text:"52 mètres de hauteur. 1856.\nLe viaduc de Chaumont domine la ville.\n\nVous le traversez à pied au coucher du soleil.\nLa Haute-Marne s\'étend à perte de vue.\n\nToutoon dit que c\'est « pas mal ».\nIncoherence pleure un peu.\nC\'est le 52 qui fait ça.",
    fx:[{t:'b',v:3,l:'🌉 +3 bonheur (le 52 grandiose)'},{t:'m',v:200,l:'💶 +200€ (photo vendue)'}],
    extra:{ toutoon:[{t:'b',v:2,l:'😤 Toutoon : +2 bonheur (il admet que c\'est beau)'}], invoherence:[{t:'b',v:2,l:'🐰 Incoherence : +2 bonheur (larmes de bonheur)'}] }
  },
  monopoly: {
    src:'real', // Ptitcuicui gagne contre Incoherence au Monopoly, et elle rage pas
    title:'🎲 Le Monopoly Légendaire',
    text:"Une session Monopoly.\nPtitcuicui contre Incoherence.\n\nPtitcuicui établit sa stratégie dès le début.\nIncoherence joue à l\'instinct, sourit, ne stresse pas.\n\nPtitcuicui gagne.\n\nIncoherence hausse les épaules.\n« Bah ouais, c\'était prévisible. »\n\nC\'est pour ça qu\'on l\'aime.",
    fx:[{t:'b',v:3,l:'🎲 +3 bonheur (même perdre avec le sourire, c\'est un talent)'}],
    extra:{ ptitcuicui:[{t:'b',v:2,l:'🐦 Ptitcuicui : +2 bonheur (victoire sans saveur face à quelqu\'un qui s\'en fout)'}], invoherence:[{t:'b',v:3,l:'🐰 Incoherence : +3 bonheur (la sérénité du sage)'}] }
  },
  bac: {
    src:'real', // Toutoon pensait avoir super réussi l'histoire-géo et il a eu 2/20
    title:'📝 Le BAC — Le Mensonge de l\'Histoire-Géo',
    text:"Jour des résultats du BAC.\nToutoon sort de l\'épreuve d\'histoire-géographie.\n\n« C\'était trop bien. J\'ai tout su. »\n\nRésultats.\n\n2 / 20.\n\nUn silence.\nPuis tout le monde éclate de rire.\nToutoon aussi — mais après.",
    fx:[{t:'b',v:3,l:'😂 +3 bonheur (l\'anecdote du BAC est éternelle)'},{t:'m',v:500,l:'💶 +500€ (enveloppe de la famille malgré tout)'}],
    extra:{ toutoon:[{t:'b',v:-1,l:'😤 Toutoon : -1 bonheur (le 2/20 reste dans les annales)'}] }
  },
  demande: {
    src:'invented', // à remplacer : racontez comment ça s'est vraiment passé !
    title:'💍 La Grande Demande',
    text:"Quelque part en Haute-Marne. Un coucher de soleil.\nLe viaduc de Chaumont en fond.\n\nToutoon a la bague depuis 3 semaines.\nIl n'a pas dormi depuis 3 semaines.\n\nIncoherence dit oui avant même la fin de la phrase.\n\nTout le Schloss pleure.\nMême Ptitcuicui.",
    fx:[{t:'b',v:6,l:'💍 +6 bonheur (le plus beau jour)'},{t:'m',v:-2000,l:'💸 -2000€ (la bague + le dîner)'}],
    extra:{
      toutoon:[{t:'b',v:5,l:'😤→💍 +5 bonheur (il méritait ce moment)'}],
      invoherence:[{t:'b',v:5,l:'🐰 +5 bonheur (oui, mille fois oui)'}],
      ptitcuicui:[{t:'b',v:3,l:'🐦 Ptitcuicui : +3 bonheur (il savait depuis le début)'}]
    }
  },
};

// ── DESTINY CARDS ──────────────────────────────────────────────────────────────
// src:'real' = vraie anecdote | src:'invented' = inventé par l'IA (à remplacer)
const CARDS = {
  money:[
    {src:'real',     ti:'🎲 Monopoly — Encore',  tx:"Ptitcuicui gagne le Monopoly. Encore.\nSes amis regardent le plafond.",fx:[{t:'m',v:3000,l:'💶 +3000€ (Ptitcuicui, roi du Monopoly)'},{t:'b',v:-1,l:'😑 -1 bonheur (les autres)'}], spe:'monopoly'},
    {src:'real',     ti:'🪙 Le Coin Truqué',      tx:"Ptitcuicui propose un pari à Sponge : « devine dans quelle main est la pièce ».\n\nSponge hésite. Réfléchit. Choisit.\n\nLa pièce n'était dans aucune des deux.\n\nClassique.", fx:[{t:'m',v:800,l:'💶 +800€ (escroquerie réussie !)'}], spe:'coin'},
    {src:'invented',     ti:'💰 Prime Surprise',      tx:"Ton employeur distribue une prime inattendue.\nLe viaduc de Chaumont t'inspire l'épargne.", fx:[{t:'m',v:2000,l:'💶 +2000€ (bienvenue dans le monde adulte)'}]},
    {src:'invented',     ti:'💸 Réparation PC',       tx:"Ton ordinateur lâche la veille d'un rendu.\nLes larmes sèchent. La CB saigne.", fx:[{t:'m',v:-900,l:'💸 -900€ (nouveau PC)'},{t:'b',v:-1,l:'😞 -1 bonheur'}]},
    {src:'real',         ti:'🏠 Investissement 52',   tx:"Tu achètes un bien en Haute-Marne.\nMoins cher qu'à Paris et tellement plus beau.", fx:[{t:'m',v:2500,l:'💶 +2500€ (investissement malin)'}]},
    {src:'invented',     ti:'🧾 13ème Mois',          tx:"Enfin ! Le 13ème mois tombe.\nRaclette collective ce soir.", fx:[{t:'m',v:1500,l:'💶 +1500€'},{t:'b',v:1,l:'🧀 +1 bonheur (raclette !)'}]},
    {src:'real',     ti:'🔪 L\'Accident de Couteau',tx:"Un couteau. Un geste maladroit de Ptitcuicui.\nSponge regarde son doigt avec stupéfaction.\nUn silence. Puis le fou rire.",fx:[{t:'b',v:3,l:'😂 +3 bonheur (l\'histoire fait encore rire 10 ans après)'}], spe:'knife'},
    {src:'invented',     ti:'🎰 Pari Perdu',          tx:"Une soirée cartes avec le Schloss.\nToutoon entre en rage et gagne quand même.", fx:[{t:'m',v:-700,l:'💸 -700€'}]},
    {src:'invented',     ti:'🏦 Remboursement Inattendu', tx:"Une dette oubliée depuis 3 ans vient d'être remboursée.\nTu ne te souviens même plus qui te devait ça.", fx:[{t:'m',v:1200,l:'💶 +1200€ (mémoire sélective du 52)'}]},
    {src:'invented',     ti:'🛒 Crise de Shopping',     tx:"Un samedi d'ennui à Chaumont.\nTu passes devant une boutique.\nTu ressors avec trois choses dont tu n'avais pas besoin.", fx:[{t:'m',v:-650,l:'💸 -650€'},{t:'b',v:1,l:'🛍️ +1 bonheur (ça fait du bien)'}]},
    {src:'real',         ti:'🔩 La Roue Perdue',       tx:"Sur la rocade de Troyes.\nPtitcuicui perd une roue — littéralement.\n\nToutoon et lui partent la chercher.\nIls ne l'ont jamais retrouvée.", fx:[{t:'m',v:-500,l:'💸 -500€ (nouvelle roue)'},{t:'b',v:2,l:'😂 +2 bonheur (l\'histoire fait encore rire)'}]},
    {src:'invented',     ti:'🏡 Location Coup de Cœur', tx:"Tu tombes sur un gîte en Haute-Marne à prix cassé.\nPiscine, jardin, vue sur les collines.\nLe 52 sait se vendre.", fx:[{t:'m',v:-350,l:'💸 -350€ (weekend)'},{t:'b',v:3,l:'🌿 +3 bonheur'}]},
    {src:'invented',     ti:'💊 Forfait Médecin',       tx:"Un arrêt maladie de 3 jours.\nTu dors, Netflix, bouillon de poule.\nLe 52 te recharge.", fx:[{t:'m',v:-200,l:'💸 -200€ (médecin + pharma)'},{t:'b',v:1,l:'🛌 +1 bonheur (repos forcé)'}]},
    {src:'invented',     ti:'🎫 Concert Raté',          tx:"Tu achètes des billets.\nLe concert est annulé.\nRemboursé... dans 30 jours.", fx:[{t:'m',v:-80,l:'💸 -80€ (frais de service non remboursés)'},{t:'b',v:-1,l:'😔 -1 bonheur'}]},
    {src:'invented',     ti:'🍾 Bonne Affaire',         tx:"Un ami te revend quelque chose pour presque rien.\nTu réalises après que tu n'en avais pas besoin.\nMais quelle affaire.", fx:[{t:'m',v:-100,l:'💸 -100€'},{t:'b',v:2,l:'🤝 +2 bonheur (on aide les amis)'}]},
    {src:'invented',     ti:'📦 Vide-Grenier',          tx:"Vide-grenier dans le jardin.\nTu te débarrasses de tout.\nL\'argent rentre. Le soulagement aussi.", fx:[{t:'m',v:800,l:'💶 +800€ (vide-grenier)'},{t:'b',v:2,l:'🧹 +2 bonheur'}]},
    {src:'real',         ti:'🍝 La Nuit Supinfo',      tx:"Coloc début Supinfo. Toutoon et Ptitcuicui.\nProjet dû le lendemain. Il est 2h du mat.\n\nL'eau des pâtes ? Oubliée.\nLe steak dans l'assiette ? Froid.\nTrop occupés à coder pour manger.", fx:[{t:'b',v:4,l:'😂 +4 bonheur (les vraies années galère)'}]},
    {src:'real',         ti:'🏧 Distributeur en Panne',  tx:"Le seul distributeur de billets du village est en panne.\nVous errez dans les rues de Fayl-Billot.\nHeureusement, Sponge a toujours du cash.", fx:[{t:'m',v:-50,l:'💸 -50€ (remboursement Sponge + intérêts)'},{t:'b',v:1,l:'😅 +1 bonheur (solidarité)'}]},
    {src:'invented',     ti:'🚜 Retard à Cause du Tracteur', tx:"La D67. Un John Deere. 12 kilomètres à 25km/h.\nImpossible de doubler — ligne continue.\nLe conducteur salue chaque voiture qui passe.\n\nTu arrives en retard. Le client est de Haute-Marne. Il comprend.", fx:[{t:'m',v:-300,l:'💸 -300€ (pénalité retard)'},{t:'b',v:1,l:'😅 +1 bonheur (c\'est une anecdote maintenant)'}]},
    {src:'invented',     ti:'🏚️ Maison à 18 000€',        tx:"À vendre — village de Haute-Marne.\n5 pièces. Jardin. Vue dégagée sur les collines.\n18 000 euros.\n\nParis te rirait au nez.\nIci c\'est normal.", fx:[{t:'m',v:-18000,l:'💸 -18000€ (propriétaire !)'},{t:'b',v:4,l:'🏡 +4 bonheur (le rêve accompli)'}]},
    {src:'invented',     ti:'🍄 Cèpes du 52',              tx:"Un kilo de cèpes ramassés dans la forêt de Châteauvillain.\nLe marché de Chaumont. Les touristes se battent.\nTu vends tout en 20 minutes.", fx:[{t:'m',v:400,l:'💶 +400€ (cèpes bio du 52)'}]},
    {src:'invented',     ti:'⛽ Prochaine Station à 42km', tx:"Voyant rouge. GPS consulté.\nProchaine station : 42km.\n\nVous y arrivez.\nElle est fermée le dimanche.", fx:[{t:'m',v:-80,l:'💸 -80€ (dépannage honteux)'},{t:'b',v:-2,l:'😱 -2 bonheur (angoisse du 52)'}]},
  ],
  love:[
    {src:'real',         ti:'💍 Le Mariage du Siècle', tx:"Toutoon et Incoherence vont se marier.\nSeptembre. À Villiers-le-Sec.\nTout le Schloss sera là.", fx:[{t:'b',v:5,l:'💍 +5 bonheur (félicitations !)'}]},
    {src:'invented',     ti:'📸 La Photo de Groupe',   tx:"Une vieille photo du lycée refait surface.\nLes coiffures de l'époque...\nQuelqu'un ferait mieux de la détruire.", fx:[{t:'b',v:3,l:'😂 +3 bonheur (nostalgie dorée)'}]},
    {src:'real',         ti:'🍕 Soirée Schloss',       tx:"Soirée pizza-jeux.\nToute la bande est là.\nCes moments ne s'achètent pas.", fx:[{t:'b',v:4,l:'✨ +4 bonheur'}]},
    {src:'invented',     ti:'📱 Mauvais Groupe',       tx:"Tu envoies un message dans le mauvais\ngroupe WhatsApp du Schloss.\nLa honte. Puis les fous rires.", fx:[{t:'b',v:2,l:'😳 +2 bonheur (ça soude)'}]},
    {src:'real',         ti:'🤝 Ami en Difficulté',    tx:"Un ami du Schloss traverse une période compliquée.\nTu es là, sans question.\nC'est ça, le vrai Schloss.", fx:[{t:'b',v:3,l:'❤️ +3 bonheur'}]},
    {src:'invented',     ti:'🎂 Surprise d\'Anniv',   tx:"Le groupe organise une fête surprise.\nTu pleures un peu.\nOn ne le répète à personne.", fx:[{t:'b',v:4,l:'🎉 +4 bonheur'}]},
    {src:'invented',     ti:'🚗 Road Trip 52',         tx:"Road trip improvisé en Haute-Marne.\nVignory, Langres, Bourbonne...\nLe 52, un département à vivre.", fx:[{t:'b',v:3,l:'🚗 +3 bonheur'},{t:'m',v:-400,l:'💸 -400€ (essence + resto)'}]},
    {src:'invented',     ti:'💌 Message 3h du Mat',    tx:"Toutoon envoie un meme de lui en rage mode\nà 3h du matin dans le groupe.\nImpossible de dormir.", fx:[{t:'b',v:2,l:'😂 +2 bonheur'}]},
    {src:'invented',     ti:'🌙 Soirée Étoiles 52',    tx:"Sur une colline entre Langres et Fayl-Billot.\nPas de lumières. Ciel parfait.\nVous regardez les étoiles en silence.\n\nCes moments-là, le 52 les garde pour lui.", fx:[{t:'b',v:4,l:'🌟 +4 bonheur'}]},
    {src:'invented',     ti:'📞 Coup de Fil Surprise',  tx:"Un ami que tu n'as pas vu depuis 2 ans appelle.\nVous parlez 1h30 comme si c'était hier.\nLe temps n'a pas prise sur le Schloss.", fx:[{t:'b',v:3,l:'📞 +3 bonheur'}]},
    {src:'invented',     ti:'🎂 Gâteau Raté',           tx:"Incoherence prépare un gâteau.\nLe gâteau ne ressemble à rien.\nÇa a quand même le goût du bonheur.", fx:[{t:'b',v:3,l:'🎂 +3 bonheur (l\'intention, c\'est tout)'},{t:'m',v:-80,l:'💸 -80€ (ingrédients perdus)'}]},
    {src:'invented',     ti:'🤧 Rhume du Schloss',      tx:"Une grippe circule dans le groupe.\nUn après l'autre vous tombez.\nMais vous vous apportez des soupes.\n\nPtitcuicui, lui, est rodé — ses allergies l'entraînent toute l'année.", fx:[{t:'b',v:2,l:'🤧 +2 bonheur (être malade ensemble)'},{t:'m',v:-120,l:'💸 -120€ (pharmacie)'}]},
    {src:'invented',     ti:'💌 Vieux Message Retrouvé', tx:"Un vieux message de groupe du lycée réapparaît.\nOn avait 15 ans. On se prenait tellement au sérieux.\nOn rit encore.", fx:[{t:'b',v:4,l:'😂 +4 bonheur (l\'innocence de 15 ans)'}]},
    {src:'invented',     ti:'🏕️ Weekend Camping',       tx:"Un weekend camping imprévu dans la forêt près de Vignory.\nPas de réseau. Juste le feu, les étoiles, et Toutoon\nqui refuse de dormir dans la tente.", fx:[{t:'b',v:4,l:'⛺ +4 bonheur'},{t:'m',v:-180,l:'💸 -180€ (matos)'}]},
    {src:'invented',     ti:'🎙️ Discours de Mariage',    tx:"Quelqu'un du Schloss doit prononcer un discours.\nIl prépare des notes. Il les perd.\nIl improvise. C'est parfait.", fx:[{t:'b',v:5,l:'💍 +5 bonheur'},{t:'m',v:200,l:'💶 +200€ (enveloppe cadeau retour)'}]},
    {src:'invented',     ti:'📷 Photo Volée',            tx:"Une photo de toi en pleine sieste dans le canapé\ncircule dans le groupe.\nTu dors la bouche ouverte. Magnifique.", fx:[{t:'b',v:2,l:'😳 +2 bonheur (dans 10 ans tu riras)'},{t:'b',v:-1,l:'😤 -1 bonheur (maintenant)'}]},
    {src:'invented',     ti:'🌺 Déclaration Inattendue', tx:"Quelqu'un avoue quelque chose de sincère.\nC'est bête, c'est tendre, c'est le 52.\nTout le monde tombe un peu plus amoureux du groupe.", fx:[{t:'b',v:4,l:'❤️ +4 bonheur'}]},
    {src:'invented',     ti:'🎿 Sortie Ratée',           tx:"Prévu depuis 3 semaines.\nIl neige, Sponge est enrhumé, Toutoon a oublié.\nVous finissez à quatre autour d\'une pizza.\nC\'était mieux comme ça.", fx:[{t:'b',v:3,l:'🍕 +3 bonheur (l\'imprévu est le plan)'}]},
    {src:'invented',     ti:'🎪 Bal du Village',          tx:"Guirlandes. Sono qui crache. Suze à 2€.\nTu danses avec des gens que tu connais depuis l\'enfance.\n\nCes soirées n\'existent plus qu\'en Haute-Marne.\nGarde-les précieusement.", fx:[{t:'b',v:4,l:'🎉 +4 bonheur'}]},
    {src:'invented',     ti:'☕ Le Seul Bar du Village',  tx:"Il est le seul à 15km à la ronde.\nLe patron connaît tout le monde par leur prénom.\nOn parle de la météo. On refait le monde.\nLe café coûte 1€80.\n\nParis ne comprendra jamais ça.", fx:[{t:'b',v:3,l:'☕ +3 bonheur (la vraie vie sociale du 52)'}]},
    {src:'invented',     ti:'🏹 La Chasse est Ouverte',  tx:"5h du matin. Détonations en forêt.\nLa chasse est ouverte.\n\nToutoon se réveille en sursaut et entre en rage.\nPtitcuicui enregistre la réaction.", fx:[{t:'b',v:2,l:'😂 +2 bonheur (Toutoon au réveil c\'est légendaire)'}]},
    {src:'invented',     ti:'🌾 Les Champs à Perte de Vue', tx:"Route départementale en été.\nBlé. Colza. Tournesol.\nLe ciel est immense.\nLa Haute-Marne s\'étire à l\'infini.\n\nTu réalises que Paris te manque moins que tu ne le pensais.", fx:[{t:'b',v:3,l:'🌾 +3 bonheur (la campagne en vrai)'}]},
  ],
  gaming:[
    {src:'real',     ti:'🏗️ Nuit Blanche PA',     tx:"Sponge passe la nuit entière sur Prison Architect.\nIl explique tout le lendemain en détail.\nTout le monde fait semblant d'écouter.", fx:[{t:'b',v:3,l:'🧽 +3 bonheur (Sponge rayonne)'}], spe:'pa'},
    {src:'real',         ti:'😤 RAGE MODE',            tx:"Une partie qui dégénère.\nToutoon renverse la manette.\nUn silence. Puis tout le monde éclate.", fx:[{t:'b',v:2,l:'😤→😂 +2 bonheur (la rage, du bonheur en kit)'}]},
    {src:'real',         ti:'🔵 Vision Tactique',      tx:"Ptitcuicui prédit exactement comment\nla partie se terminera, 10 tours à l'avance.\nIl a raison. Comme d'habitude.", fx:[{t:'b',v:2,l:'🔵 +2 bonheur (impressionnant, agaçant)'}]},
    {src:'invented',     ti:'🎲 Mario Party Nuit',     tx:"Nuit entière de Mario Party.\nToutoon perd au dernier jet de dé.\nRAGE MODE imminent.", fx:[{t:'b',v:3,l:'🎮 +3 bonheur (le voyage vaut le trajet)'}]},
    {src:'real',         ti:'😴 Nuit Blanche Gaming',  tx:"Session jusqu'à 6h du matin.\nLa fatigue, ça se récupère.\nLes souvenirs, non.", fx:[{t:'b',v:4,l:'⭐ +4 bonheur'},{t:'m',v:-200,l:'💸 -200€ (pizza + café)'}]},
    {src:'real',         ti:'🚜 Bonne Année... au fait', tx:"Farming Simulator. Réveillon du Nouvel An.\nLes champs ne se sèment pas tout seuls.\n\nMinuit passe.\nPersonne ne s\'en rend compte.\n\n« Bonne année au fait. »\n« Ouais. T\'as rempli les silos ? »", fx:[{t:'b',v:4,l:'🎆 +4 bonheur (le meilleur Réveillon du groupe)'}]},
    {src:'real',         ti:'🥛 Le Lait qui Déborde',   tx:"Quelqu\'un met du lait pour la purée.\nTout le monde oublie.\n\nL\'odeur arrive en premier.\nLe lait est partout sur la plaque.\n\nÇa arrive à chaque fois.\nSans exception.", fx:[{t:'b',v:2,l:'😂 +2 bonheur (classique Schloss)'},{t:'m',v:-50,l:'💸 -50€ (lait + nettoyage)'}]},
    {src:'real',         ti:'🤖 Incoherence Code',     tx:"Incoherence crée un shader graphique\nqui transforme le jeu en œuvre d'art.\nTout le monde est bouche bée.", fx:[{t:'b',v:3,l:'✨ +3 bonheur (le talent, ça impressionne)'}]},
    {src:'invented',     ti:'⚔️ Alliance Secrète',    tx:"Whitewarrior propose une alliance secrète.\nIl tient parole jusqu'au bout.\nComme toujours.", fx:[{t:'b',v:2,l:'⚔️ +2 bonheur (la loyauté, valeur Schloss)'}]},
    {src:'invented',     ti:'🏆 Tournoi Improvisé',    tx:"Tournoi de jeux vidéo improvisé.\nPtitcuicui établit le tableau,\nSponge gère les ressources, Whitewarrior fait la police.", fx:[{t:'b',v:3,l:'🏆 +3 bonheur'}]},
    {src:'invented',     ti:'🌙 Nuit Sans Sommeil',     tx:"Session gaming jusqu'à 6h du matin.\nVous regardez le lever du soleil sur le 52.\nLa fatigue, ça se récupère.\nLes souvenirs, non.", fx:[{t:'b',v:4,l:'⭐ +4 bonheur'},{t:'m',v:-150,l:'💸 -150€ (pizza + café 4h du mat)'}]},
    {src:'real',         ti:'💥 Rage Quit Légendaire',  tx:"Toutoon rage quit.\nMais cette fois-là, il envoie la manette.\nElle atterrit dans le canapé.\nTout le monde applaudit.", fx:[{t:'b',v:3,l:'😂 +3 bonheur (le moment est entré dans la légende)'}]},
    {src:'real',         ti:'🚀 Ptitcuicui & Toutoon',  tx:"Tournoi Rocket League.\nTout le monde se fait écraser.\n\nEn finale : Ptitcuicui & Toutoon contre Whitewarrior & Sponge.\nLe seul match difficile de la soirée.\n\nPtitcuicui place le tir décisif.\nToutoon ne dira jamais qu\'il avait peur.", fx:[{t:'b',v:3,l:'🏆 +3 bonheur (duo imbattable)'}]},
    {src:'invented',     ti:'🤝 GG de Whitewarrior',    tx:"Tu étais en train de perdre.\nWhitewarrior aurait pu enfoncer le clou.\nIl a préféré tendre la main.\n\n« GG » — deux lettres qui valent tout.", fx:[{t:'b',v:3,l:'⚔️ +3 bonheur (loyauté > victoire)'}]},
    {src:'invented',     ti:'🎮 Jeu Oublié dans un Carton', tx:"Tu retrouves un vieux jeu de plateau oublié.\nVous jouez jusqu'à minuit.\nPersonne ne se souvient des règles.\nTout le monde s'en fout.", fx:[{t:'b',v:3,l:'🎲 +3 bonheur (les classiques restent classiques)'}]},
    {src:'invented',     ti:'🎯 Darts Championship 52',     tx:"Fléchettes improvisées au fond du bar.\nPtitcuicui calcule les angles.\nToutoon tire à l\'instinct.\n\nToutoon gagne.\nPtitcuicui recalcule.", fx:[{t:'b',v:3,l:'🎯 +3 bonheur'}]},
    {src:'invented',     ti:'👾 Speedrun 52',               tx:"Quelqu\'un propose un speedrun.\nLes règles sont inventées sur le moment.\nLe record est battu, contesté, rebattu.\nLa nuit est longue.", fx:[{t:'b',v:4,l:'⚡ +4 bonheur'},{t:'m',v:-100,l:'💸 -100€ (mise au vainqueur contesté)'}]},
    {src:'invented',     ti:'🎸 Soirée Karaoké',            tx:"Nuit karaoké Schloss.\nWhitewarrior refuse de chanter.\nPuis chante le mieux.\nTout le monde est surpris.", fx:[{t:'b',v:4,l:'🎤 +4 bonheur'}]},
    {src:'invented',     ti:'🕹️ Retrogaming Session',       tx:"Vieille console retrouvée chez les parents.\nVous jouez 4 heures à des jeux de 2002.\nLes graphismes ont vieilli.\nLes souvenirs, non.", fx:[{t:'b',v:3,l:'👾 +3 bonheur (la nostalgie, c\'est le meilleur DLC)'}]},
    {src:'invented',     ti:'🃏 Bluff Raté',                tx:"Tu bluffes tout le monde.\nSauf Ptitcuicui.\nIl sourit. Il attendait ça depuis le début.", fx:[{t:'b',v:2,l:'🔵 +2 bonheur (même perdre contre lui, c\'est instructif)'},{t:'m',v:-500,l:'💸 -500€ (la mise)'}]},
    {src:'invented',     ti:'🃏 Belote au Café du Village', tx:"Tournoi de belote au seul bar ouvert.\nLes anciens jouent depuis 1987.\nVous êtes invités par courtoisie.\nVous perdez en souriant.\n\nIls vous offrent une tournée. Vous restez jusqu\'à minuit.", fx:[{t:'b',v:4,l:'🃏 +4 bonheur (la vraie culture de comptoir du 52)'}]},
    {src:'invented',     ti:'📺 Film en Boucle sur TF1',    tx:"Vendredi soir à Chaumont.\nToutoon a allumé la télé.\nLe même film pour la 8ème fois.\n\nTout le monde sait les dialogues par cœur.\nPersonne ne change la chaîne.", fx:[{t:'b',v:2,l:'📺 +2 bonheur (confort de l\'habitude)'}]},
  ],
  surprise:[
    {src:'invented',     ti:'🎴 Croix de Lorraine',    tx:"Colombey veille sur toi.\nUne bonne surprise t'attend.\nLe 52 protège les siens.", fx:[{t:'b',v:3,l:'✟ +3 bonheur'},{t:'m',v:1000,l:'💶 +1000€ (bénédiction du 52)'}]},
    {src:'invented',     ti:'🌀 Terrier d\'Alice',     tx:"Tu tombes dans un terrier.\nTout s'inverse.\nMoins d'argent... plus de bonheur ?", fx:[{t:'m',v:-1500,l:'💸 -1500€'},{t:'b',v:5,l:'🐰 +5 bonheur (la vie est bizarre)'}]},
    {src:'real',         ti:'🏰 L\'Esprit du Schloss', tx:"Un moment de grâce.\nLe groupe est réuni.\nVous êtes exactement là où vous devez être.", fx:[{t:'b',v:5,l:'🏰 +5 bonheur (le Schloss dans le cœur)'}]},
    {src:'invented',     ti:'🎭 Quiproquo Géant',      tx:"Suite de malentendus qui aurait pu\nêtre catastrophique...\nFin en fou rire général. Classique Schloss.", fx:[{t:'b',v:4,l:'😂 +4 bonheur'}]},
    {src:'invented',     ti:'📬 Lettre du Destin',     tx:"Une lettre mystérieuse arrive.\nElle dit juste :\n« Avance. Le meilleur reste à venir. »", fx:[{t:'b',v:2,l:'📬 +2 bonheur'},{t:'m',v:500,l:'💶 +500€'}]},
    {src:'real',         ti:'⚡ Coup de Foudre du 52',  tx:"Un moment de grâce absolue.\nTout s'aligne parfaitement.\nLe ciel du 52 est d'un bleu impossible.\n\nTu ne sais pas pourquoi tu es heureux.\nMais tu l'es.", fx:[{t:'b',v:5,l:'⚡ +5 bonheur'},{t:'m',v:700,l:'💶 +700€ (bonne journée globale)'}]},
    {src:'invented',     ti:'🌀 Malédiction du 52',     tx:"Une chaîne de petites catastrophes.\nClés perdues. Pain oublié. Bus raté.\nMystérieusement lié à la géographie de la HM.", fx:[{t:'b',v:-2,l:'😱 -2 bonheur'},{t:'m',v:-800,l:'💸 -800€ (journée de merde)'}]},
    {src:'invented',     ti:'🎁 Colis Non Commandé',    tx:"Un colis arrive à ton nom.\nTu n'as rien commandé.\nÇa vient du Schloss.\n\nPersonne ne dit rien.\nTout le monde sourit.", fx:[{t:'b',v:3,l:'🎁 +3 bonheur'},{t:'m',v:400,l:'💶 +400€ (valeur estimée du colis)'}]},
    {src:'invented',     ti:'🔮 Vision du Futur',       tx:"Tu fermes les yeux.\nTu vois le mariage de Toutoon & Incoherence.\nLe château de Chaumont.\nTout le Schloss debout.\n\nPuis tu réalises : c'est dans quelques mois.", fx:[{t:'b',v:4,l:'💍 +4 bonheur (l\'avenir est lumineux)'}]},
    {src:'invented',     ti:'🪄 Magie Incoherence',      tx:"Incoherence fait un truc tellement bizarre et beau\nque tout le monde reste bouche bée 30 secondes.\n\nPersonne ne peut l\'expliquer.\nTout le monde sourit.", fx:[{t:'b',v:4,l:'🐰 +4 bonheur'},{t:'m',v:600,l:'💶 +600€ (quelqu\'un l\'achète)'}]},
    {src:'invented',     ti:'🗝️ Boîte à Secrets',        tx:"Une vieille boîte est retrouvée au fond d\'un placard.\nDedans : des lettres, des photos, des promesses de gamin.\n\nVous les lisez ensemble.\nLe silence qui suit, ça n\'a pas de prix.", fx:[{t:'b',v:5,l:'🗝️ +5 bonheur'}]},
    {src:'invented',     ti:'🌀 Glitch de Réalité',       tx:"Un moment si bizarre que vous ne savez pas\nsi c\'est réel ou si Incoherence a rêvé.\n\nDans le doute : +bonheur.", fx:[{t:'b',v:3,l:'🌀 +3 bonheur (le 52 est magique comme ça)'},{t:'m',v:777,l:'💶 +777€ (argent magique)'}]},
    {src:'invented',     ti:'📿 Amulette du 52',          tx:"Une vieille dame du village te tend quelque chose.\nElle dit juste : « Pour le chemin ».\n\nTu ne sais pas ce que c\'est.\nMais tu te sens mieux.", fx:[{t:'b',v:3,l:'✨ +3 bonheur'},{t:'m',v:300,l:'💶 +300€ (valeur sentimentale estimée)'}]},
    {src:'invented',     ti:'🎭 Erreur de Casting',       tx:"Tu joues un rôle que tu n\'aurais jamais pensé jouer.\nToutoon joue le calme. Ptitcuicui improvise.\nWhitewarrior est hilare.\n\nL\'imprévu, c\'est le meilleur scénario.", fx:[{t:'b',v:4,l:'🎭 +4 bonheur'}]},
    {src:'invented',     ti:'🏘️ Village Fantôme du 52',    tx:"Un village abandonné au bout d\'une route forestière.\nMaisons vides. Église condamnée.\nRoute qui finit dans les ronces.\n\nVous écoutez le silence.\nIl a une qualité qu\'on ne trouve nulle part ailleurs.", fx:[{t:'b',v:3,l:'👻 +3 bonheur (beauté mélancolique du 52)'}]},
    {src:'invented',     ti:'🌲 Forêt de Nuit',            tx:"Vous entrez dans la forêt à la tombée de la nuit.\nPas de réseau. Pas de lampe.\nJuste les arbres, la lune et les bruits du 52.\n\nToutoon fait semblant de ne pas avoir peur.\nÇa dure 10 minutes.", fx:[{t:'b',v:3,l:'🌲 +3 bonheur (aventure involontaire)'}]},
    {src:'real',         ti:'❄️ Route Verglacée',           tx:"Novembre. D619 entre Langres et Fayl-Billot.\n-4°C. Verglas. Le sel n\'a pas encore été épandu.\n\nVous avancez à 30km/h.\nLe paysage givre. C\'est magnifique malgré tout.", fx:[{t:'b',v:1,l:'❄️ +1 bonheur (beauté hivernale)'},{t:'m',v:-200,l:'💸 -200€ (accrochage léger)'}]},
  ],
  career:[
    {src:'invented',     ti:'💻 Merge Request Acceptée',  tx:"Ton PR est validé à 23h58.\nL'app part en prod. Pas de bug.\nCes moments valent de l'or.",             fx:[{t:'m',v:2500,l:'💶 +2500€ (prime de nuit)'},{t:'b',v:3,l:'✅ +3 bonheur (le green build, c\'est la paix)'}]},
    {src:'invented',     ti:'📊 Pipeline de Data Cassé',   tx:"La pipeline data plante en prod.\nLes données remontent à 2019.\nTu passes le week-end à chercher la ligne 847.", fx:[{t:'m',v:-800,l:'💸 -800€'},{t:'b',v:-2,l:'💀 -2 bonheur'}]},
    {src:'invented',     ti:'🎨 Portfolio Viral',           tx:"Incoherence poste un shader graphique.\nTwitter s'emballe. Les offres pleuvent.\nLa beauté technique, ça paie.",     fx:[{t:'b',v:4,l:'✨ +4 bonheur'},{t:'m',v:3000,l:'💶 +3000€ (contrat freelance)'}], spe:'inv_graphic'},
    {src:'invented',     ti:'🔧 Contrat de Maintenance',    tx:"Un contrat industriel de maintenance.\nPas glamour mais solide.\nLe 52 a besoin de gens compétents.",             fx:[{t:'m',v:2000,l:'💶 +2000€'},{t:'b',v:1,l:'🔧 +1 bonheur (le travail bien fait)'}]},
    {src:'invented',     ti:'🌾 Tech Agricole 52',          tx:"Un projet d'automatisation pour une ferme.\nDrones, capteurs, data — le futur du 52.\nVous êtes en avance sur Paris.",fx:[{t:'m',v:1800,l:'💶 +1800€'},{t:'b',v:2,l:'🌾 +2 bonheur (l\'innovation locale)'}]},
    {src:'invented',     ti:'🤖 IA Qui Déraille',           tx:"Vous déployez une IA d'optimisation.\nElle optimise... les pauses café.\nLe client n'est pas content.",            fx:[{t:'m',v:-600,l:'💸 -600€'},{t:'b',v:1,l:'😂 +1 bonheur (l\'histoire est trop drôle)'}]},
    {src:'invented',     ti:'🗄️ Migration DB de l\'Enfer',  tx:"Migration base de données.\n3 jours. 0 sommeil. 47 backups.\n1 rollback inattendu. Ça fonctionne. À peine.",   fx:[{t:'m',v:1500,l:'💶 +1500€ (prime survie)'},{t:'b',v:-1,l:'😰 -1 bonheur'}]},
    {src:'invented',     ti:'📡 Infra Cloud Maîtrisée',     tx:"Ton architecture cloud passe à l'échelle.\n1000 utilisateurs simultanés.\nTes collègues te regardent différemment.",fx:[{t:'m',v:2200,l:'💶 +2200€'},{t:'b',v:3,l:'☁️ +3 bonheur'}]},
    {src:'invented',     ti:'🏗️ Prison Architect IRL',      tx:"Sponge conçoit un système de gestion.\nBudgets. Rotations. Flux. Tout carré.\nIl a passé 400h sur ce jeu, ça se voit.",fx:[{t:'b',v:3,l:'🧽 +3 bonheur (Sponge dans son élément)'}], spe:'pa'},
    {src:'invented',     ti:'📱 App du 52 Lance',           tx:"Votre app locale est adoptée par Chaumont.\nLe préfet de la Haute-Marne vous félicite.\nLe 52 entre dans la modernité.",fx:[{t:'m',v:3000,l:'💶 +3000€'},{t:'b',v:4,l:'🏰 +4 bonheur (fierté du 52)'}]},
    {src:'invented',     ti:'📈 Augmentation Surprise',     tx:"Ton manager te convoque.\nTu t'attends au pire.\n...\nC'est une augmentation.", fx:[{t:'m',v:2800,l:'💶 +2800€ (enfin reconnu !)'},{t:'b',v:3,l:'📈 +3 bonheur'}]},
    {src:'invented',     ti:'🔥 Burnout Court',             tx:"Trop de projets en parallèle.\nTu prends une semaine de repos forcé en Haute-Marne.\nLes collines te ressourcent.", fx:[{t:'m',v:-400,l:'💸 -400€'},{t:'b',v:-1,l:'😮‍💨 -1 bonheur (temporaire)'}]},
    {src:'invented',     ti:'🧑‍💻 Tech Lead Improviste',    tx:"Tu te retrouves Tech Lead par accident.\nPersonne ne t'a demandé.\nMais tu gères.", fx:[{t:'m',v:2200,l:'💶 +2200€'},{t:'b',v:2,l:'💼 +2 bonheur (le pouvoir par défaut)'}]},
    {src:'invented',     ti:'🤝 Client du 52',             tx:"Un client local de Haute-Marne.\nPas de bullshit. Pas de slide deck.\n« T'as fait quoi ? T'as livré. C'est bon. »\nLe 52, terreau de l'honnêteté professionnelle.", fx:[{t:'m',v:1800,l:'💶 +1800€'},{t:'b',v:2,l:'🤝 +2 bonheur (le vrai entrepreneuriat)'}]},
    {src:'invented',     ti:'🧠 Conférence Improvisée',    tx:"Tu passes en conf' pour remplacer quelqu\'un au pied levé.\nAucune préparation. Sujet inconnu.\nTu t\'en sors. Mieux que l\'original.", fx:[{t:'m',v:2000,l:'💶 +2000€'},{t:'b',v:3,l:'💪 +3 bonheur'}]},
    {src:'invented',     ti:'🔐 Faille de Sécu Trouvée',   tx:"Tu trouves une faille critique en prod.\nTu la corriges avant qu\'elle ne soit exploitée.\nTon manager fait semblant de comprendre ce que tu expliques.", fx:[{t:'m',v:1500,l:'💶 +1500€ (prime sécurité)'},{t:'b',v:2,l:'🛡️ +2 bonheur'}]},
    {src:'invented',     ti:'🏆 Innovation Locale',         tx:"Ton projet remporte un prix de l\'innovation en Haute-Marne.\nLe trophée est en forme de viaduc de Chaumont.\nC\'est objectivement le plus beau trophée jamais conçu.", fx:[{t:'m',v:2500,l:'💶 +2500€'},{t:'b',v:4,l:'🏆 +4 bonheur'}]},
    {src:'invented',     ti:'😭 Réunion de 3h',             tx:"Une réunion prévue pour 45 minutes.\n3 heures plus tard, vous en êtes encore au point 2.\nSponge a quand même pris des notes couleur-codées.", fx:[{t:'m',v:-200,l:'💸 -200€ (heures supplémentaires non payées)'},{t:'b',v:-2,l:'😩 -2 bonheur'}]},
    {src:'invented',     ti:'🌐 Side Project Viral',         tx:"Ce projet de weekend que tu as posté sur GitHub.\nDu jour au lendemain, 2000 étoiles.\nTu ne comprends pas pourquoi.\nTu assumes.", fx:[{t:'m',v:3500,l:'💶 +3500€ (sponsors)'},{t:'b',v:4,l:'⭐ +4 bonheur'}]},
    {src:'invented',     ti:'✂️ Nogent-en-Bassigny',         tx:"La coutellerie de Nogent.\n70% des ciseaux chirurgicaux français sortent d\'ici.\nUn hôpital te contacte pour un projet sur mesure.\n\nLe 52 exporte son excellence au monde.", fx:[{t:'m',v:2800,l:'💶 +2800€ (contrat de prestige)'},{t:'b',v:2,l:'✂️ +2 bonheur (fierté du 52)'}]},
    {src:'invented',     ti:'🏭 L\'Usine de Saint-Dizier',   tx:"L\'industrie sidérurgique du bassin de Saint-Dizier.\nAmplitudes Zola. Cadence soutenue. Paye cash.\n\nLe 52 fait tourner la France depuis 200 ans.", fx:[{t:'m',v:2200,l:'💶 +2200€ (contrat industriel)'}]},
    {src:'invented',     ti:'🌲 Filière Bois du 52',         tx:"La forêt de Haute-Marne est une ressource.\nTu décroches un contrat de gestion forestière.\nBois d\'œuvre. Biomasse. Circuit court.\n\nLe 52 pense déjà à demain.", fx:[{t:'m',v:1900,l:'💶 +1900€'},{t:'b',v:2,l:'🌳 +2 bonheur (l\'économie verte du 52)'}]},
  ],
};

function drawCard(deck){ const p=CARDS[deck]||CARDS.money; return p[Math.floor(Math.random()*p.length)]; }

// ── RANDOM GLOBAL EVENTS (25% chance before each dice roll) ──────────────────
const RANDOM_EVENTS = [
  { src:'real',  title:'⛈️ Grain de Haute-Marne',   text:'Une tempête éclate sur le 52.\nTout le monde est trempé en même temps.\nUnion dans la galère.',  fx:[{t:'b',v:-1}], label:'-1 bonheur pour tous (la météo du 52)' },
  { src:'real',  title:'☀️ Belle Journée sur le 52', text:'Le soleil se lève sur les collines de Haute-Marne.\nVous avez tous le moral au beau fixe.\nJournée parfaite.',     fx:[{t:'b',v:1}], label:'+1 bonheur pour tous' },
  { src:'invented', title:'🍺 Apéro Schloss Improvisé', text:'Sponge sort une bouteille de nulle part.\nToutoon apparaît avec des chips.\nIncoherence apporte le fromage.\n\nApéro officiel.',  fx:[{t:'b',v:2}], label:'+2 bonheur pour tous' },
  { src:'invented', title:'⛽ Prix du Carburant',        text:'Le plein coûte les yeux de la tête.\nLa Haute-Marne, faut s\'y rendre en voiture.\nC\'est le prix du bonheur.',  fx:[{t:'m',v:-250}], label:'-250€ pour tous (plein de carburant)' },
  { src:'invented', title:'🎰 Tombola du Village',      text:'La tombola annuelle du village.\nPersonne ne gagne le premier prix.\nMais tous ont participé.',  fx:[{t:'m',v:400}], label:'+400€ pour tous (lot de consolation)' },
  { src:'invented', title:'🌈 Arc-en-Ciel sur Langres', text:'Un arc-en-ciel complet au-dessus des remparts gallo-romains.\nVous sortez vos téléphones.\nLa photo ne rend pas justice.',  fx:[{t:'b',v:2}], label:'+2 bonheur pour tous' },
  { src:'invented', title:'🔥 BBQ Schloss',             text:'Barbecue géant improvisé.\nToutoon gère le feu (toujours trop fort).\nSponge gère les ressources alimentaires.\nRésultat : excellent.',  fx:[{t:'b',v:3},{t:'m',v:-100}], label:'+3 bonheur, -100€ pour tous' },
  { src:'invented', title:'📺 Panne de Courant',         text:'Coupure d\'électricité dans le 52.\nVous allumez des bougies.\nVous jouez aux cartes à la lueur de la flamme.\nC\'est finalement mieux.',  fx:[{t:'b',v:1},{t:'m',v:-150}], label:'+1 bonheur, -150€ pour tous' },
  { src:'invented', title:'🧀 Soirée Raclette',          text:'Soirée raclette improvisée.\nLa machine à raclette est sortie.\nLe fromage coule.\nLe 52 est en paix.',  fx:[{t:'b',v:3},{t:'m',v:-120}], label:'+3 bonheur, -120€ pour tous' },
  { src:'invented', title:'📰 Le 52 dans les Médias',    text:'Un reportage national parle de la Haute-Marne.\nIls ont l\'air surpris que c\'est beau.\nVous, vous le savez depuis toujours.',  fx:[{t:'b',v:2}], label:'+2 bonheur pour tous (fierté régionale)' },
  { src:'invented', title:'🚐 Covoiturage du Schloss',   text:'Tout le groupe dans la même voiture.\nToutoon conduit trop vite.\nIncoherence dort.\nPtitcuicui commente la route.\nArrivée miraculeux.',  fx:[{t:'b',v:2},{t:'m',v:-80}], label:'+2 bonheur, -80€ pour tous (essence)' },
  { src:'real',  title:'🐄 Vache sur la Route',       text:'Une vache bloque la D67.\nLe troupeau prend son temps.\nVous attendez. Le 52 n\'est pas pressé.',  fx:[{t:'b',v:1},{t:'m',v:-50}], label:'+1 bonheur, -50€ pour tous (retard)' },
  { src:'invented', title:'🏆 Victoire de Chaumont FC',  text:'Le club local gagne un match improbable.\nLe bar du village explose de joie.\nVous ne connaissiez même pas ce club avant ce soir.',  fx:[{t:'b',v:2}], label:'+2 bonheur pour tous' },
  { src:'invented', title:'❄️ Première Neige du 52',    text:'La première neige de l\'hiver recouvre la Haute-Marne.\nChaumont est blanc.\nToutoon lance la première boule de neige.\nSur Ptitcuicui.',  fx:[{t:'b',v:2}], label:'+2 bonheur pour tous' },
  { src:'real',  title:'🚜 Bloqué Derrière un Tracteur', text:'La D67. Un John Deere 100 chevaux.\nLigne continue. Impossible de doubler.\n12 kilomètres à 25km/h.\n\nLe conducteur vous salue à chaque virage.\nVous finissez par apprécier la vue.', fx:[{t:'b',v:-1},{t:'m',v:-100}], label:'-1 bonheur, -100€ pour tous (retard généralisé)' },
  { src:'invented', title:'📶 Zone Blanche Totale',    text:'Plus un seul bar de réseau.\nPlus de GPS. Plus de musique en streaming.\nPlus de notifications.\n\nVous vous regardez.\nVous parliez vraiment à des humains.\nC\'était oublié.', fx:[{t:'b',v:3}], label:'+3 bonheur pour tous (détox numérique forcée)' },
  { src:'real',  title:'🏪 Tout Ferme le Dimanche', text:'11h du matin. Vous avez faim.\nBoulanger : fermé.\nSupermarché : fermé.\nLe bar d\'à côté semble ouvert.\nIl est fermé.\n\nBienvenue en Haute-Marne le dimanche.', fx:[{t:'b',v:-1}], label:'-1 bonheur pour tous (faim dominicale)' },
  { src:'real',  title:'🦌 Chevreuil sur la Route', text:'Feux de route. Virage. Chevreuil au milieu de la D60.\nVous freinez. Il vous fixe 10 secondes.\nVous le fixez aussi.\n\nIl repart dans la forêt comme si de rien n\'était.', fx:[{t:'b',v:2}], label:'+2 bonheur pour tous (la faune du 52)' },
  { src:'invented', title:'🍄 Cueillette aux Champignons', text:'Forêt de Châteauvillain. Matin brumeux.\nCèpes. Chanterelles. Trompettes de la mort.\n\nSponge a établi un protocole de tri.\nPtitcuicui cartographie les spots.\nVous rentrez avec des paniers pleins.', fx:[{t:'b',v:3},{t:'m',v:200}], label:'+3 bonheur, +200€ pour tous (vente au marché)' },
  { src:'invented', title:'🌾 L\'Odeur de Lisier',     text:'Août. Épandage sur les champs.\nLes fenêtres de la voiture restent fermées.\n\nToutoon proteste.\nLes locaux haussent les épaules.\n« C\'est l\'odeur du 52, ça. »', fx:[{t:'b',v:-1}], label:'-1 bonheur pour tous (la ruralité dans toute sa splendeur)' },
  { src:'real',  title:'🚌 Le TER a 40 min de Retard', text:'Quai de Chaumont. Direction Troyes.\nPanneau : RETARD 40 MINUTES.\n\nVous finissez par discuter avec d\'autres voyageurs.\nQuelqu\'un sort un jeu de cartes.\nC\'est la meilleure chose de la journée.', fx:[{t:'b',v:1},{t:'m',v:-200}], label:'+1 bonheur (rencontres), -200€ pour tous (billet manqué)' },
  { src:'invented', title:'🧀 Tournée de Fromage de Langres', text:'Croûte orangée. Cœur coulant. Marc de Bourgogne dans le creux.\n\nVous êtes en Haute-Marne.\nVous mangez comme des rois.\nParis ne saura jamais ce qu\'il rate.', fx:[{t:'b',v:3},{t:'m',v:-80}], label:'+3 bonheur, -80€ pour tous (fromagerie)' },
  { src:'invented', title:'🔌 L\'ADSL qui Rame',       text:'La fibre n\'est pas encore là.\nMise à jour de 3Go. ETA : 4 heures.\n\nVous allez dehors.\nIl y a des collines, des forêts, un ciel immense.\nC\'était mieux que Netflix, finalement.', fx:[{t:'b',v:2}], label:'+2 bonheur pour tous (retour au monde réel)' },
  { src:'invented', title:'🌨️ Routes Verglacées', text:'Novembre en Haute-Marne.\nTemps de trajet estimé :\n1h30 au lieu de 45 minutes.\nToutoon perd patience après le premier virage.\n\nVous arrivez quand même tous.', fx:[{t:'b',v:-1},{t:'m',v:-100}], label:'-1 bonheur, -100€ pour tous (carburant + anxiété)' },
  { src:'invented', title:'🔔 Cloches du Village à 7h', text:'Les cloches sonnent.\nToutoon jure contre l\'église.\nPtitcuicui les enregistre pour sa sonnerie.\nSponge vérifie l\'heure dans son planning.\n\nVous êtes en Haute-Marne. C\'est comme ça.', fx:[{t:'b',v:1}], label:'+1 bonheur pour tous' },
  { src:'real',  title:'🎨 Expo MANAA', text:'Une expo des élèves de la filière MANAA.\nUne œuvre vous interpelle.\nVous la regardez 30 secondes.\nVous pensez avoir compris.\n\nUn élève vous explique.\nVous n\'aviez rien compris.\nAbsolument rien.', fx:[{t:'b',v:-3}], label:'-3 bonheur pour tous (humiliation culturelle)' },
];
function drawRandomEvent(){ return RANDOM_EVENTS[Math.floor(Math.random()*RANDOM_EVENTS.length)]; }

// ── PARIS (BETS) — tous les joueurs présents parient ─────────────────────────
// outcome: 'A' | 'B' | 'random' (tiré au hasard à la révélation)
const BETS = [
  { src:'invented', title:'😤 Pari RAGE MODE',      question:'Toutoon va-t-il entrer en RAGE MODE avant la fin de cette partie ?', optA:'💯 Inévitable', optB:'🙅 Non, il est zen ce soir', outcome:'A', outcomeText:'Toutoon rage quit 3 minutes plus tard. Comme prévu.', winFx:[{t:'b',v:3}], loseFx:[{t:'b',v:-1}] },
  { src:'invented', title:'📋 Pari Sponge',         question:'Sponge a-t-il un planning couleur-codé pour le week-end ?', optA:'📊 Oui — Excel avec onglets', optB:'🤷 Non, il improvise', outcome:'A', outcomeText:'Sponge sort un planning à 15 colonnes. Couleur-codé. Bien sûr.', winFx:[{t:'b',v:3}], loseFx:[{t:'m',v:-300}] },
  { src:'invented', title:'😴 Pari Incoherence',     question:'Incoherence dort-elle pendant le trajet en voiture ?', optA:'😴 Endormie avant le carrefour', optB:'👀 Non, elle regardait par la fenêtre', outcome:'A', outcomeText:"Incoherence s'endort avant d'arriver à la sortie d'autoroute.", winFx:[{t:'b',v:2}], loseFx:[{t:'b',v:-1}] },
  { src:'invented', title:'🎲 Pari Monopoly',        question:'Ptitcuicui remporte-t-il le Monopoly ce soir ?', optA:'💰 Évidemment — il connaît les règles par cœur', optB:'🎰 Non — cette fois ça va changer', outcome:'A', outcomeText:'Ptitcuicui gagne. Encore. Il sourit poliment.', winFx:[{t:'b',v:2},{t:'m',v:500}], loseFx:[{t:'b',v:-2}] },
  { src:'invented', title:'🌧️ Pari Météo 52',        question:'Va-t-il pleuvoir ce week-end en Haute-Marne ?', optA:'☔ Oui — bien sûr', optB:'☀️ Non — miracle météo', outcome:'A', outcomeText:"Il pleut. Bien sûr. C'est la Haute-Marne.", winFx:[{t:'b',v:2}], loseFx:[{t:'b',v:-1}] },
  { src:'invented', title:'🗺️ Pari Itinéraire',       question:"Ptitcuicui prend-il le chemin le plus court ou un 'détour optimisé' ?", optA:"🛣️ Le chemin direct, enfin", optB:"🔄 Un détour de 40km 'optimisé'", outcome:'B', outcomeText:"\"C'est plus rapide comme ça.\" — Ptitcuicui (après 45 min de détour)", winFx:[{t:'b',v:3}], loseFx:[{t:'b',v:-1}] },
  { src:'invented', title:'🍕 Pari Pizza',            question:'La pizza sera-t-elle trop cuite ou pas assez ?', optA:'🔥 Trop cuite — Toutoon surveille le four', optB:"❄️ Pas assez — Incoherence avait oublié", outcome:'B', outcomeText:"Incoherence avait oublié de préchauffer. Pizza froide.", winFx:[{t:'b',v:2},{t:'m',v:200}], loseFx:[{t:'b',v:-1}] },
  { src:'invented', title:'🌙 Pari Fin de Soirée',    question:'La soirée finit-elle avant ou après minuit ?', optA:"🌙 Après minuit — personne ne part", optB:"🛏️ Avant — Incoherence est fatiguée", outcome:'A', outcomeText:"Il est 3h du mat. Personne n'a bougé.", winFx:[{t:'b',v:3},{t:'m',v:100}], loseFx:[{t:'b',v:-1}] },
  { src:'invented', title:'📱 Pari Notifications',    question:'Whitewarrior checkera-t-il son téléphone plus de 10 fois ce soir ?', optA:"📱 Oui — ses alertes serveur l'appellent", optB:"🧘 Non — il est présent", outcome:'A', outcomeText:"Whitewarrior a vérifié ses alertes serveur 14 fois. Il ne s'en souvient pas.", winFx:[{t:'b',v:2}], loseFx:[{t:'b',v:-1}] },
  { src:'invented', title:'🏆 Pari Compétition',      question:'Qui gagne le prochain défi entre Ptitcuicui et Toutoon ?', optA:"🔵 Ptitcuicui — la stratégie", optB:"😤 Toutoon — la rage", outcome:'random', outcomeText:"La rivalité continue. Aucun des deux n'admet qui a gagné.", winFx:[{t:'b',v:3}], loseFx:[{t:'b',v:-1}] },
  { src:'invented', title:'🎸 Pari Karaoké',          question:'Whitewarrior accepte-t-il de chanter ce soir ?', optA:"🎤 Oui — et il est excellent", optB:"🙅 Non — il garde la dignité", outcome:'A', outcomeText:"Whitewarrior chante. C'est la surprise de la soirée.", winFx:[{t:'b',v:3}], loseFx:[{t:'b',v:-1}] },
  { src:'invented', title:'🍺 Pari Apéro',            question:"L'apéro dure-t-il plus d'1 heure avant de passer à table ?", optA:"⏳ Oui — discussions infinies", optB:"🍽️ Non — on mange rapidement", outcome:'A', outcomeText:"2h30 d'apéro. Toutoon a refait 3 fois son verre.", winFx:[{t:'b',v:2},{t:'m',v:100}], loseFx:[{t:'b',v:-1}] },
  { src:'invented', title:'🚜 Pari Tracteur',          question:'Le tracteur devant vous va-t-il tourner avant le prochain village ?', optA:"🔄 Oui — il prend la prochaine ferme", optB:"😩 Non — il continue jusqu\'au village suivant", outcome:'A', outcomeText:"Il tourne à la deuxième ferme. 8km à 25km/h quand même.", winFx:[{t:'b',v:2}], loseFx:[{t:'m',v:-150}] },
  { src:'invented', title:'📶 Pari Réseau',            question:'Y a-t-il du réseau au prochain arrêt ?', optA:"📶 Oui — on a de la chance", optB:"🚫 Non — zone blanche garantie", outcome:'B', outcomeText:"Pas un seul bar de réseau. Bienvenue en Haute-Marne profonde.", winFx:[{t:'b',v:3}], loseFx:[{t:'b',v:-1}] },
  { src:'invented', title:'🏪 Pari Boulangerie',       question:'La boulangerie du village est-elle ouverte ce lundi matin ?', optA:"🥖 Oui — elle fait exception", optB:"🔒 Non — lundi = fermeture universelle en 52", outcome:'B', outcomeText:"Fermé. Comme tous les lundis. Comme partout en Haute-Marne.", winFx:[{t:'b',v:2},{t:'m',v:100}], loseFx:[{t:'b',v:-2}] },
  { src:'invented', title:'🦌 Pari Chevreuil',         question:'Croiserez-vous un chevreuil ou un sanglier ce soir sur la route ?', optA:"🦌 Oui — la faune du 52 est partout", optB:"🚗 Non — route tranquille", outcome:'random', outcomeText:"La forêt garde ses secrets... ou pas.", winFx:[{t:'b',v:3}], loseFx:[{t:'b',v:-1}] },
  { src:'invented', title:'🌨️ Pari Verglas',           question:'Les routes seront-elles verglacées demain matin ?', optA:"🧊 Oui — novembre en Haute-Marne c\'est automatique", optB:"🌤️ Non — cette fois ça va", outcome:'A', outcomeText:"Verglas à -3°C. Le camion de sel est sorti à 4h.", winFx:[{t:'b',v:2}], loseFx:[{t:'b',v:-1}] },
  { src:'invented', title:'⛽ Pari Station-Service',    question:'La prochaine station-service est-elle ouverte ?', optA:"✅ Oui — enfin", optB:"🔒 Non — fermée le dimanche ou en travaux", outcome:'B', outcomeText:"Fermée. Depuis 3 mois. Pour travaux indéterminés.", winFx:[{t:'m',v:300}], loseFx:[{t:'m',v:-200},{t:'b',v:-1}] },
  { src:'invented', title:'📻 Pari Radio FM',          question:'France Bleu Champagne capte-t-elle dans ce coin reculé du 52 ?', optA:"📻 Oui — on capte encore", optB:"📺 Non — que du grésil", outcome:'B', outcomeText:"Que du grésil. Vous chantez a capella.", winFx:[{t:'b',v:2}], loseFx:[{t:'b',v:-1}] },
];
function drawBet(){ return BETS[Math.floor(Math.random()*BETS.length)]; }

// ── DUELS — dé contre dé, bonheur en jeu ─────────────────────────────────────
const STAT_LABELS = { gaming:'🎮 Gaming', finance:'💰 Finance', chance:'🍀 Chance', social:'❤️ Social' };
const DUELS = [
  { src:'invented', title:'⚔️ Duel du Destin',    desc:'{A} défie {B} ! Le dé tranche — le plus haut remporte {stakes} bonheur !', stakes:2, stat:'chance' },
  { src:'invented', title:'🎲 Défi du 52',        desc:'Les collines de Haute-Marne ont entendu {A} lancer un défi à {B} !', stakes:3, stat:'chance' },
  { src:'invented', title:'🏰 Duel Schloss',      desc:'{A} entre dans l\'arène et désigne {B}. Courage ou folie ?', stakes:2, stat:'social' },
  { src:'invented', title:'🍀 Pari de Courage',   desc:'{A} parie {stakes} bonheur face à {B}. Qui osera ?', stakes:4, stat:'chance' },
  { src:'invented', title:'😤 RAGE DUEL',         desc:"L'énergie du Schloss explose ! {A} affronte {B} en duel de dés !", stakes:3, stat:'gaming' },
  { src:'invented', title:'💸 Duel Financier',    desc:'{A} challenge {B} : 1000€ en jeu ! Le dé du destin tranche.', stakes:0, money:1000, stat:'finance' },
  { src:'invented', title:'🚜 Duel du Tracteur',  desc:'Qui atteint Chaumont en premier ? {A} vs {B} — la D67 n\'attend personne.', stakes:3, stat:'chance' },
  { src:'invented', title:'🧀 Duel Fromager',     desc:'{A} défie {B} dans un concours de dégustation de fromage de Langres. Le dé tranche !', stakes:2, stat:'social' },
];
function drawDuel(){ return DUELS[Math.floor(Math.random()*DUELS.length)]; }

// ── PLAYERS ──────────────────────────────────────────────────────────────────
// stats: gaming🎮 finance💰 chance🍀 social❤️  (1–10)
const PLAYER_DEFS = [
  {id:'ptitcuicui',  name:'Ptitcuicui',  emoji:'🐦', color:'#4a90e2', bg:'#0d2a4a', role:"L'Architecte & Matchmaker", stats:{gaming:10,finance:10,chance:5,social:5}},
  {id:'whitewarrior',name:'Whitewarrior', emoji:'⚔️', color:'#555555', bg:'#0a0a0a', role:'Le Gardien Loyal',           stats:{gaming:9,finance:6,chance:8,social:7}},
  {id:'sponge',      name:'Sponge',       emoji:'🧽', color:'#ff8c42', bg:'#3a1a00', role:'Le Gestionnaire',             stats:{gaming:9,finance:8,chance:6,social:7}},
  {id:'invoherence', name:'Incoherence',  emoji:'🐰', color:'#c084f5', bg:'#2a0a3a', role:'La Rêveuse 💍 future mariée',stats:{gaming:6,finance:6,chance:9,social:9}},
  {id:'toutoon',     name:'Toutoon',      emoji:'😤', color:'#f5c400', bg:'#2a1f00', role:'Le Dormant 💍 futur marié',  stats:{gaming:8,finance:5,chance:8,social:9}},
];
function mkPlayer(def){ return {...def, nodeId:'start', money:5000, bonheur:0, wins:0, finished:false, order:null}; }

// ── GAME STATE ────────────────────────────────────────────────────────────────
const PH = {LOBBY:'lobby',ROLL:'roll',MOVE:'move',FORK:'fork',EVENT:'event',DONE:'done'};

let G = null; // game state
let PM = null; // player map

function newGame(ids){
  const players = ids.map(id=>mkPlayer(PLAYER_DEFS.find(p=>p.id===id)));
  return { phase:PH.ROLL, players, idx:0, log:[], finishCount:0 };
}
function cp(){ return G.players[G.idx]; }
function node(id){ return STOP_MAP.get(id||cp().nodeId); }

function applyFx(card, playerId){
  const msgs=[];
  const pid = playerId || cp().id;
  const p = G.players.find(x=>x.id===pid);
  if(!p) return msgs;
  (card.fx||[]).forEach(e=>{
    if(e.t==='b'){ p.bonheur+=e.v; } else if(e.t==='m'){ p.money+=e.v; }
    msgs.push(p.name+' : '+e.l);
  });
  if(card.extra && card.extra[pid]){
    card.extra[pid].forEach(e=>{
      if(e.t==='b') p.bonheur+=e.v; else if(e.t==='m') p.money+=e.v;
      msgs.push(p.name+' : '+e.l);
    });
  }
  // Special triggers
  if(card.spe==='coin'){
    const s=G.players.find(x=>x.id==='sponge');
    if(s&&s.id!==pid){ s.money-=800; msgs.push('🧽 Sponge se fait avoir : -800€ !'); }
  }
  if(card.spe==='knife'){
    const s=G.players.find(x=>x.id==='sponge');
    const pt=G.players.find(x=>x.id==='ptitcuicui');
    if(s){ s.bonheur+=3; msgs.push('🧽 Sponge : +3 bonheur (la cicatrice est légendaire)'); }
    if(pt){ pt.bonheur+=2; msgs.push('🔵 Ptitcuicui : +2 bonheur (souvenir impérissable)'); }
  }
  if(card.spe==='monopoly'){
    const pt=G.players.find(x=>x.id==='ptitcuicui');
    if(pt){ pt.money+=3000; pt.bonheur+=2; msgs.push('🔵 Ptitcuicui gagne 3000€ de plus !'); }
    G.players.filter(x=>x.id!=='ptitcuicui').forEach(x=>{ x.bonheur--; });
  }
  if(card.spe==='pa'){
    const s=G.players.find(x=>x.id==='sponge');
    if(s){ s.bonheur+=2; msgs.push('🧽 Sponge : +2 bonheur supplémentaire !'); }
  }
  if(card.spe==='inv_graphic'){
    const inv=G.players.find(x=>x.id==='invoherence');
    if(inv){ inv.bonheur+=3; inv.money+=2000; msgs.push('🐰 Incoherence : +3 bonheur et +2000€ en plus !'); }
  }
  return msgs;
}

function log(msg){ G.log.unshift(msg); if(G.log.length>25) G.log.pop(); }

let _toastTimer = null;
function showTurnToast(p) {
  const el = document.getElementById('turn-toast');
  if (!el) return;
  el.innerHTML = `${p.emoji} <span style="color:${p.color}">${p.name}</span> — à toi de jouer !`;
  el.classList.remove('hidden');
  if (_toastTimer) clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.add('hidden'), 3000);
}

function nextTurn(){
  do { G.idx=(G.idx+1)%G.players.length; }
  while(G.players[G.idx].finished && G.players.some(p=>!p.finished));
  G.phase=PH.ROLL;
  updateUI();
  showTurnToast(cp());
}

// ── RENDERER ──────────────────────────────────────────────────────────────────
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

function resize(){
  const wrap = canvas.parentElement;
  canvas.width = Math.max(320, (wrap ? wrap.clientWidth : window.innerWidth - 280));
  computeStopLayout(); // calcule aussi canvas.height
}

// ── BOARD GRID LAYOUT ─────────────────────────────────────────────────────────
// 9-column snake road × 9 rows — carré comme le Jeu de la Vie
const GRID_POS = {
  // Row 0 L→R — Enfance
  'start':[0,0],'p_sd':[1,0],'p_join':[2,0],'p_col52':[3,0],'p_wassy':[4,0],'p_tractor':[5,0],'p_der':[6,0],'p_sd2':[7,0],'p_math':[8,0],
  // Row 1 R←L — Enfance → Lycée  (fork1 col3, merge p_lycee col2)
  'p_chm1':[8,1],'p_colo':[7,1],'p_join2':[6,1],'p_enf3':[5,1],'p_wass2':[4,1],'fork1':[3,1],'p_lycee':[2,1],'p_bac1':[1,1],'p_lyc2':[0,1],
  // Row 2 L→R — Lycée  (fork_et col7, merge p_arc col8)
  'p_lyc3':[0,2],'p_lyc4':[1,2],'p_lyc5':[2,2],'p_lyc6':[3,2],'p_lyc7':[4,2],'p_lyc8':[5,2],'p_lyc9':[6,2],'fork_et':[7,2],'p_arc':[8,2],
  // Row 3 R←L — Études  (fork2 col2, merge f2b3 col1)
  'p_etu1':[8,3],'p_etu2':[7,3],'p_etu3':[6,3],'p_etu4':[5,3],'p_mid':[4,3],'p_etu5':[3,3],'fork2':[2,3],'f2b3':[1,3],'p8':[0,3],
  // Row 4 L→R — Vie Active
  'p8b':[0,4],'p_job1':[1,4],'p_job2':[2,4],'p_act1':[3,4],'p_act2':[4,4],'p_act3':[5,4],'p_act4':[6,4],'p_act5':[7,4],'p_act6':[8,4],
  // Row 5 R←L — Carrière  (fork3 col5, merge p_lang col4)
  'p_act7':[8,5],'p_act8':[7,5],'p_act9':[6,5],'fork3':[5,5],'p_lang':[4,5],'p_car1':[3,5],'p_car2':[2,5],'p_mont':[1,5],'p_fayl':[0,5],
  // Row 6 L→R — Vie Adulte
  'p_bourm':[0,6],'p_adu1':[1,6],'p_adu2':[2,6],'p_adu3':[3,6],'p_adu4':[4,6],'p_adu5':[5,6],'p_adu6':[6,6],'p_adu7':[7,6],'p_adu8':[8,6],
  // Row 7 R←L — Vers le Mariage  (fork4 col7, merge p_adu9 col6)
  'p_viad':[8,7],'fork4':[7,7],'p_adu9':[6,7],'p_gex':[5,7],'p_fin1':[4,7],'p_fin2':[3,7],'p_fin3':[2,7],'p_fin4':[1,7],'p_fin5':[0,7],
  // Row 8 L→R — Finale
  'p_fin6':[0,8],'p_fin7':[1,8],'p_fin8':[2,8],'finale':[3,8],
  // Branch stops — cols hors-grille pour garder la couleur de la bonne rangée
  'f1a':[9,1],'f1a2':[10,1],'f1b':[11,1],'f1b2':[12,1],
  'fe_a':[9,2],'fe_a2':[10,2],'fe_a3':[11,2],'fe_b':[12,2],'fe_b2':[13,2],'fe_b3':[14,2],'fe_b4':[15,2],
  'f2a':[9,3],'f2a2':[10,3],'f2a3':[11,3],'f2b':[12,3],'f2b2':[13,3],
  'f3a':[9,5],'f3a2':[10,5],'f3b':[11,5],'f3b2':[12,5],
  'f4a':[9,7],'f4a2':[10,7],'f4b':[11,7],'f4b2':[12,7],
};
const BD_COLS = 9, BD_ROWS = 9;
const BRANCH_STOPS = new Set([
  'f1a','f1a2','f1b','f1b2',
  'fe_a','fe_a2','fe_a3','fe_b','fe_b2','fe_b3','fe_b4',
  'f2a','f2a2','f2a3','f2b','f2b2',
  'f3a','f3a2','f3b','f3b2',
  'f4a','f4a2','f4b','f4b2',
]);
// Fork layout: two parallel tracks that split and rejoin
const FORK_LAYOUT = {
  fork1:   { pathA:['f1a','f1a2'],           pathB:['f1b','f1b2'],                   mergeId:'p_lycee' },
  fork_et: { pathA:['fe_a','fe_a2','fe_a3'], pathB:['fe_b','fe_b2','fe_b3','fe_b4'], mergeId:'p_arc' },
  fork2:   { pathA:['f2a','f2a2','f2a3'],    pathB:['f2b','f2b2'],                   mergeId:'f2b3' },
  fork3:   { pathA:['f3a','f3a2'],           pathB:['f3b','f3b2'],                   mergeId:'p_lang' },
  fork4:   { pathA:['f4a','f4a2'],           pathB:['f4b','f4b2'],                   mergeId:'p_adu9' },
};
const BRANCH_A_STOPS = new Set();
const BRANCH_B_STOPS = new Set();
for (const fl of Object.values(FORK_LAYOUT)) {
  fl.pathA.forEach(id => BRANCH_A_STOPS.add(id));
  fl.pathB.forEach(id => BRANCH_B_STOPS.add(id));
}

// Séquence ordonnée du chemin principal (stops + forks dans l'ordre)
const MAIN_SEQ = [
  'start','p_sd','p_join','p_col52','p_wassy','p_tractor','p_der','p_sd2','p_math',
  'p_chm1','p_colo','p_join2','p_enf3','p_wass2','fork1','p_lycee',
  'p_bac1','p_lyc2','p_lyc3','p_lyc4','p_lyc5','p_lyc6','p_lyc7','p_lyc8','p_lyc9','fork_et','p_arc',
  'p_etu1','p_etu2','p_etu3','p_etu4','p_mid','p_etu5','fork2','f2b3','p8',
  'p8b','p_job1','p_job2','p_act1','p_act2','p_act3','p_act4','p_act5','p_act6',
  'p_act7','p_act8','p_act9','fork3','p_lang',
  'p_car1','p_car2','p_mont','p_fayl','p_bourm',
  'p_adu1','p_adu2','p_adu3','p_adu4','p_adu5','p_adu6','p_adu7','p_adu8','p_viad','fork4','p_adu9',
  'p_gex','p_fin1','p_fin2','p_fin3','p_fin4','p_fin5','p_fin6','p_fin7','p_fin8','finale',
];

// Layout absolu: {cx, cy, tw, th} par stop — calculé par computeStopLayout()
let STOP_LAYOUT = {};

function computeStopLayout() {
  STOP_LAYOUT = {};
  const W = canvas.width;
  const PAD = 20;
  const tw = Math.min(Math.floor((W - PAD * 2) * 0.30), 130);
  const gap = Math.floor(tw * 0.85);
  const step = tw + gap;
  const cx = W / 2;
  const brGap = Math.floor(tw * 0.14);
  const lx = cx - brGap / 2 - tw / 2;
  const rx = cx + brGap / 2 + tw / 2;
  let y = PAD;

  function place(id, cxx) {
    STOP_LAYOUT[id] = { cx: cxx, cy: y + tw / 2, tw, th: tw };
  }

  for (const id of MAIN_SEQ) {
    const fl = FORK_LAYOUT[id];
    if (fl) {
      place(id, cx); y += step;
      const maxLen = Math.max(fl.pathA.length, fl.pathB.length);
      for (let j = 0; j < maxLen; j++) {
        if (fl.pathA[j]) place(fl.pathA[j], lx);
        if (fl.pathB[j]) place(fl.pathB[j], rx);
        y += step;
      }
    } else {
      place(id, cx); y += step;
    }
  }
  canvas.height = y + PAD;
}
const ROW_META = [
  {ch:'🧒 Enfance',         col:'#c8900a'}, // row 0
  {ch:'🎒 Lycée',           col:'#2a70c8'}, // row 1  (Enfance→Lycée, fork1)
  {ch:'🎒 Lycée',           col:'#2a70c8'}, // row 2  (fork_et)
  {ch:'🎓 Études',          col:'#1a9088'}, // row 3  (fork2)
  {ch:'💼 Vie Active',      col:'#b85020'}, // row 4
  {ch:'💼 Carrière',        col:'#c04890'}, // row 5  (fork3)
  {ch:'🏡 Vie Adulte',      col:'#7040a0'}, // row 6
  {ch:'🏡 Vie Adulte',      col:'#7040a0'}, // row 7  (fork4)
  {ch:'💍 Vers le Mariage', col:'#c8a800'}, // row 8
];

function rrect(ctx, x, y, w, h, r) {
  const ra = Math.min(r || 4, w/2, h/2);
  ctx.beginPath();
  ctx.moveTo(x+ra, y); ctx.lineTo(x+w-ra, y); ctx.arcTo(x+w, y, x+w, y+ra, ra);
  ctx.lineTo(x+w, y+h-ra); ctx.arcTo(x+w, y+h, x+w-ra, y+h, ra);
  ctx.lineTo(x+ra, y+h); ctx.arcTo(x, y+h, x, y+h-ra, ra);
  ctx.lineTo(x, y+ra); ctx.arcTo(x, y, x+ra, y, ra);
  ctx.closePath();
}

function getLayout() {
  const PAD = 16, GAP = 6;
  const cW = (canvas.width  - PAD*2 - GAP*(BD_COLS-1)) / BD_COLS;
  const cH = (canvas.height - PAD*2 - GAP*(BD_ROWS-1)) / BD_ROWS;
  return { PAD, GAP, cW, cH };
}

function cellRect(col, row) {
  const { PAD, GAP, cW, cH } = getLayout();
  return { x: PAD + col*(cW+GAP), y: PAD + row*(cH+GAP), w: cW, h: cH };
}

function getBaseXY(stopId) {
  const sl = STOP_LAYOUT[stopId];
  return sl ? { x: sl.cx, y: sl.cy } : null;
}

function evalBez(p0, c1, c2, p3, t) {
  const u = 1 - t;
  return {
    x: u*u*u*p0.x + 3*u*u*t*c1.x + 3*u*t*t*c2.x + t*t*t*p3.x,
    y: u*u*u*p0.y + 3*u*u*t*c1.y + 3*u*t*t*c2.y + t*t*t*p3.y,
  };
}

function getForkArc(forkId, side) {
  const fl = FORK_LAYOUT[forkId];
  if (!fl) return null;
  const fp = getBaseXY(forkId), mp = getBaseXY(fl.mergeId);
  if (!fp || !mp) return null;
  const { cH } = getLayout();
  // Vertical oval: A arcs above, B arcs below — size scales with branch stop count
  const vSign = (side === 'A') ? -1 : 1;
  const midY = (fp.y + mp.y) / 2;
  const maxStops = Math.max(fl.pathA.length, fl.pathB.length);
  const SEP = cH * Math.max(1.0, maxStops * 0.8); // bigger oval for more stops
  const cp1 = { x: fp.x, y: midY + vSign * SEP };
  const cp2 = { x: mp.x, y: midY + vSign * SEP };
  return { fp, cp1, cp2, mp };
}

function stopXY(s) {
  if (!Object.keys(STOP_LAYOUT).length) computeStopLayout();
  const sl = STOP_LAYOUT[s.id];
  return sl ? { x: sl.cx, y: sl.cy } : { x: canvas.width / 2, y: canvas.height / 2 };
}

function drawFrame() {
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  if (!Object.keys(STOP_LAYOUT).length) computeStopLayout();
  const TW = (STOP_LAYOUT['start'] || { tw: 80 }).tw; // taille de cellule de référence
  const RW = TW * 0.46;

  // ── Background ──
  const gbg = ctx.createLinearGradient(0, 0, 0, H);
  gbg.addColorStop(0, '#0c0c1e'); gbg.addColorStop(1, '#1a0e2e');
  ctx.fillStyle = gbg; ctx.fillRect(0, 0, W, H);

  // ── Connexions de chemin (remplace routes + virages + arcs de fork) ──
  for (const [fromId, toId] of EDGES) {
    const from = STOP_LAYOUT[fromId], to = STOP_LAYOUT[toId];
    if (!from || !to) continue;
    const fromStop = STOP_MAP.get(fromId);
    const col = CHAPTER_COLORS[fromStop?.ch] || '#888888';
    const x1 = from.cx, y1 = from.cy + from.th / 2;
    const x2 = to.cx,   y2 = to.cy   - to.th   / 2;
    const mY = (y1 + y2) / 2;
    ctx.save();
    ctx.strokeStyle = col + '22'; ctx.lineWidth = RW + 12; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x1, y1);
    ctx.bezierCurveTo(x1, mY, x2, mY, x2, y2); ctx.stroke();
    ctx.strokeStyle = col + '55'; ctx.lineWidth = RW;
    ctx.beginPath(); ctx.moveTo(x1, y1);
    ctx.bezierCurveTo(x1, mY, x2, mY, x2, y2); ctx.stroke();
    ctx.restore();
  }

  // ── Stop tiles ──
  for (const s of STOPS) {
    const sl = STOP_LAYOUT[s.id];
    if (!sl) continue;
    const { cx, cy, tw: stw, th: sth } = sl;
    const chCol   = CHAPTER_COLORS[s.ch] || '#888888';
    const isFinale = s.type === 'finale';
    const isFork   = s.type === 'fork';
    const isStory  = s.type === 'story';
    const isStart  = s.type === 'start';
    const isBranch = BRANCH_STOPS.has(s.id);

    const tw   = isFinale ? stw * 0.96 : isFork ? stw * 0.88 : isBranch ? stw * 0.88 : stw * 0.92;
    const th   = isFinale ? sth * 0.96 : isFork ? sth * 0.88 : isBranch ? sth * 0.88 : sth * 0.92;
    const trad = isFinale ? 14 : 10;

    const tileBg  = isFinale ? '#1e1000' : isFork ? '#160024' : isStory ? '#071830' : isStart ? '#021e1e' : '#0e0e28';
    const tileCol = isFinale ? '#ffd700' : isFork ? '#b060f8' : isStory ? '#4a90e2' : chCol;
    const glowCol = isFinale ? '#ffd700' : isFork ? '#c080ff' : isStory ? '#60a8ff' : chCol;

    ctx.save();
    ctx.shadowColor = glowCol;
    ctx.shadowBlur  = isFinale ? 28 : 14;
    ctx.fillStyle   = tileBg;
    ctx.strokeStyle = tileCol;
    ctx.lineWidth   = isFinale ? 3 : 2;
    ctx.beginPath(); ctx.roundRect(cx - tw/2, cy - th/2, tw, th, trad);
    ctx.fill(); ctx.stroke();
    ctx.restore();

    // Bande colorée en haut de la tuile
    ctx.save();
    ctx.fillStyle = tileCol + '40';
    ctx.beginPath(); ctx.roundRect(cx - tw/2, cy - th/2, tw, th * 0.30, [trad, trad, 0, 0]);
    ctx.fill(); ctx.restore();

    // Shimmer
    ctx.save(); ctx.globalAlpha = 0.07;
    const hl = ctx.createLinearGradient(cx, cy - th/2, cx, cy + th/2);
    hl.addColorStop(0, '#fff'); hl.addColorStop(0.5, 'transparent');
    ctx.fillStyle = hl;
    ctx.beginPath(); ctx.roundRect(cx - tw/2, cy - th/2, tw, th, trad);
    ctx.fill(); ctx.restore();

    // Icône
    const iconSz = Math.min(tw, th) * (isFinale ? 0.60 : 0.52);
    ctx.font = `${iconSz}px serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(s.icon, cx, cy + th * 0.08);

    // Badge au-dessus
    const badge = isFinale ? 'FINALE' : isStart ? 'DÉPART' : isStory ? '⭐ Histoire' : isFork ? '🔀' : null;
    if (badge && !isFork) {
      const fz = Math.max(7, th * 0.17);
      ctx.font = `bold ${fz}px sans-serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
      ctx.fillStyle = isFinale ? '#ffd700' : isStory ? '#60a8ff' : '#ccc';
      ctx.shadowColor = '#000'; ctx.shadowBlur = 4;
      ctx.fillText(badge, cx, cy - th/2 - 2); ctx.shadowBlur = 0;
    }

    // Label en-dessous
    if (s.label) {
      const fz = Math.max(8, th * 0.19);
      ctx.font = `bold ${fz}px sans-serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      ctx.fillStyle = isFinale ? '#ffd700' : isBranch ? '#aaa' : '#ddd';
      ctx.shadowColor = '#000'; ctx.shadowBlur = 4;
      s.label.split('\n').forEach((ln, i) => {
        let t = ln;
        const maxW = isBranch ? stw * 1.35 : stw * 2.8;
        while (t.length > 1 && ctx.measureText(t).width > maxW) t = t.slice(0, -1);
        ctx.fillText(t, cx, cy + th/2 + 3 + i * fz * 1.2);
      });
      ctx.shadowBlur = 0;
    }
  }

  // ── Pions joueurs ──
  if (G) {
    const PR = TW * 0.18;
    const byNode = {};
    G.players.forEach(p => { if (!byNode[p.nodeId]) byNode[p.nodeId] = []; byNode[p.nodeId].push(p); });
    for (const [nid, players] of Object.entries(byNode)) {
      const s = STOP_MAP.get(nid);
      if (!s || !STOP_LAYOUT[s.id]) continue;
      const { x: cx, y: cy } = stopXY(s);
      const sl = STOP_LAYOUT[s.id];
      const stopR = sl ? sl.tw * 0.30 : TW * 0.30;
      const total = players.length;
      players.forEach((p, i) => {
        const angle  = (Math.PI * 2 / total) * i - Math.PI / 2;
        const spread = total > 1 ? stopR * 0.7 : 0;
        const bx = cx + Math.cos(angle) * spread;
        const by = cy + Math.sin(angle) * spread;
        const isCur = p === cp();
        ctx.save();
        ctx.shadowColor = p.color; ctx.shadowBlur = isCur ? 20 : 8;
        ctx.beginPath(); ctx.arc(bx, by, PR, 0, Math.PI * 2);
        ctx.fillStyle = p.bg || '#222'; ctx.fill();
        ctx.strokeStyle = p.color;
        ctx.lineWidth = isCur ? 3 : 1.5; ctx.stroke();
        ctx.restore();
        ctx.font = `${PR * 1.2}px serif`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(p.emoji, bx, by);
        if (isCur && G.phase === PH.ROLL) {
          ctx.save();
          ctx.globalAlpha = 0.4 + 0.3 * Math.sin(Date.now() / 300);
          ctx.beginPath(); ctx.arc(bx, by, PR * 1.9, 0, Math.PI * 2);
          ctx.strokeStyle = p.color; ctx.lineWidth = 2.5; ctx.stroke();
          ctx.restore();
        }
      });
    }
  }
}

function animLoop(){
  if(G && G.phase===PH.ROLL) drawFrame(); // pulse animation
  requestAnimationFrame(animLoop);
}

function fullRender(){ drawFrame(); }

// ── DICE ──────────────────────────────────────────────────────────────────────
const DICE_FACES=['⚀','⚁','⚂','⚃','⚄','⚅'];
let diceInterval=null;

function rollDice(cb){
  const el=document.getElementById('dice-display');
  el.classList.add('rolling');
  let steps=0;
  diceInterval=setInterval(()=>{
    el.textContent=DICE_FACES[Math.floor(Math.random()*6)];
    if(++steps>=16){
      clearInterval(diceInterval);
      const result=Math.ceil(Math.random()*6);
      el.textContent=DICE_FACES[result-1];
      el.classList.remove('rolling');
      el.dataset.val=result;
      setTimeout(()=>cb(result),420);
    }
  },75);
}

function doRoll(){
  G.phase=PH.MOVE;
  document.getElementById('btn-roll').disabled=true;
  rollDice(v=>{
    let extra='';
    if(v===1){ cp().bonheur=Math.max(0,cp().bonheur-1); extra=' 😬 Malchance ! -1 bonheur'; }
    if(v===6){ cp().bonheur+=2; extra=' 🍀 Coup de chance ! +2 bonheur'; }
    log(cp().name+' lance le dé : '+v+' 🎲'+extra);
    if(extra) updateUI();
    movePlayer(v);
  });
}

document.getElementById('btn-roll').addEventListener('click',()=>{
  if(!G||G.phase!==PH.ROLL) return;
  // 25% de chance d'un événement global aléatoire avant le lancer
  if(Math.random()<0.25){
    const ev=drawRandomEvent();
    const msgs=[];
    G.players.forEach(p=>{
      (ev.fx||[]).forEach(e=>{
        if(e.t==='b') p.bonheur=Math.max(0,p.bonheur+e.v);
        else if(e.t==='m') p.money+=e.v;
      });
    });
    msgs.push('🌍 Événement global : '+ev.label);
    msgs.forEach(log);
    openEvent('🌍',ev.title,ev.text,msgs,doRoll);
    return;
  }
  doRoll();
});

// ── MOVEMENT ─────────────────────────────────────────────────────────────────
function movePlayer(steps){
  const player=cp();
  let cur=player.nodeId;
  let moved=0;

  function step(){
    const n=STOP_MAP.get(cur);
    if(!n||moved>=steps){ player.nodeId=cur; fullRender(); arrive(STOP_MAP.get(cur)); return; }
    if(n.type==='fork'){ player.nodeId=cur; fullRender(); showFork(n); return; }
    if(n.next&&n.next.length===1){
      cur=n.next[0]; moved++;
      player.nodeId=cur; fullRender();
      setTimeout(step,320);
    } else if(n.next&&n.next.length>1){
      player.nodeId=cur; fullRender(); showFork(n);
    } else {
      player.nodeId=cur; fullRender(); arrive(n);
    }
  }
  step();
}

function showFork(n){
  G.phase=PH.FORK;
  document.getElementById('fork-title').textContent='🔀 '+n.label;
  document.getElementById('fork-subtitle').textContent=cp().name+', quelle route prends-tu ?';
  const btns=document.getElementById('fork-choices');
  btns.innerHTML='';
  n.choices.forEach(ch=>{
    const b=document.createElement('button');
    b.className='btn-choice';
    b.textContent=ch.label;
    b.onclick=()=>{
      hideModal('fork-modal');
      cp().nodeId=ch.next;
      log(cp().name+' choisit : '+ch.label);
      fullRender();
      arrive(STOP_MAP.get(ch.next));
    };
    btns.appendChild(b);
  });
  showModal('fork-modal');
}

function arrive(n){
  if(!n){ endTurn(); return; }
  log(cp().name+' → '+(n.label||n.ch||''));
  updateUI(); fullRender();
  if(n.type==='finale'){ handleFinale(); return; }
  if(n.type==='story'){ showStory(n.storyId); return; }
  if(n.type==='card'){ showCard(n.deck||'money'); return; }
  endTurn();
}

// ── STORY / CARD EVENTS ───────────────────────────────────────────────────────
function showStory(id){
  const st=STORIES[id]; if(!st){ endTurn(); return; }
  G.phase=PH.EVENT;
  const msgs=applyFx(st, cp().id);
  msgs.forEach(log);
  openEvent('⭐',st.title,st.text,msgs);
}

function showCard(deck){
  const r = Math.random();
  // 15% paris collectif, 10% duel (seulement si 2+ joueurs non-finis)
  if(r < 0.15){
    showBet(drawBet()); return;
  }
  if(r < 0.25 && G.players.filter(p=>!p.finished).length >= 2){
    showDuel(drawDuel()); return;
  }
  const card=drawCard(deck);
  G.phase=PH.EVENT;
  const msgs=applyFx(card,cp().id);
  msgs.forEach(log);
  const icons={money:'💶',love:'❤️',gaming:'🎮',surprise:'🎴',career:'💼'};
  openEvent(icons[deck]||'🃏',card.ti,card.tx,msgs);
}

function handleFinale(){
  const p=cp();
  if(!p.finished){
    p.finished=true; G.finishCount++;
    p.order=G.finishCount;
    const bonus=Math.max(0,10-(G.finishCount-1)*3);
    p.bonheur+=bonus;
    log('🎊 '+p.name+' arrive au Mariage ! +'+bonus+' bonheur de finissant !');
  }
  openEvent('💍','🏰 Chaumont — Le Mariage !',
    "Le château de Chaumont brille sous le soleil de septembre.\nToutoon & Incoherence — les cloches sonnent pour vous.\n\nTout le Schloss est réuni.\n\n« À ceux qui sont là depuis la 6ème — merci. »\n— Schloss, Département 52 ❤️",
    ['🎊 '+p.name+' arrive !'+(p.order===1?' En premier !':' Ordre '+p.order)]);
}

function openEvent(icon, title, text, msgs, afterCb=null){
  document.getElementById('ev-icon').textContent=icon;
  document.getElementById('ev-title').textContent=title;
  document.getElementById('ev-body').textContent=text;
  document.getElementById('ev-effects').innerHTML=msgs.map(m=>'<div class="eff-line">'+m+'</div>').join('');
  document.getElementById('ev-btn').onclick=()=>{
    hideModal('event-modal');
    if(afterCb){ afterCb(); return; }
    if(G.phase===PH.EVENT || G.phase===PH.DONE){
      if(G.players.every(p=>p.finished)) { setTimeout(showEnd,400); return; }
    }
    endTurn();
  };
  showModal('event-modal');
  updateUI(); fullRender();
}

function endTurn(){
  if(G.players.every(p=>p.finished)){ showEnd(); return; }
  nextTurn();
  document.getElementById('btn-roll').disabled=false;
  fullRender();
}

function calcScore(p){
  return p.bonheur + Math.floor(p.money/500) + p.wins;
}
function showEnd(){
  const scored = [...G.players].map(p=>({...p, score:calcScore(p)})).sort((a,b)=>b.score-a.score);
  const w = scored[0];
  const podium = scored.slice(0,3);
  const rest = scored.slice(3);
  const MEDALS = ['🥇','🥈','🥉'];
  const HEIGHTS = ['180px','140px','110px'];

  function scoreBreakdown(p){
    const bPts = p.bonheur;
    const mPts = Math.floor(p.money/500);
    const wPts = p.wins;
    return `<span class="score-detail">${bPts}❤️ + ${mPts}💰 + ${wPts}🏆 = <b>${p.score} pts</b></span>`;
  }

  // podium HTML — order: 2nd left, 1st center, 3rd right
  const podiumOrder = podium.length >= 2 ? [podium[1], podium[0], podium[2]].filter(Boolean) : podium;
  const podiumHTML = `<div class="podium-row">${podiumOrder.map((p,i)=>{
    const rank = scored.indexOf(p);
    const isFirst = rank === 0;
    return `<div class="podium-col ${isFirst?'podium-first':''}">
      <div class="podium-name" style="color:${p.color}">${p.emoji} ${p.name}</div>
      <div class="podium-score" style="color:${p.color}">${p.score} pts</div>
      <div class="podium-breakdown">${scoreBreakdown(p)}</div>
      <div class="podium-block" style="height:${HEIGHTS[rank]||'80px'};background:${p.bg};border-color:${p.color}">
        <span class="podium-medal">${MEDALS[rank]||''}</span>
      </div>
    </div>`;
  }).join('')}</div>`;

  const restHTML = rest.length ? `<div class="podium-rest">${rest.map((p,i)=>`
    <div class="rest-row">
      <span class="rest-rank">${i+4}</span>
      <span style="font-size:20px">${p.emoji}</span>
      <span class="rest-name" style="color:${p.color}">${p.name}</span>
      <span class="rest-breakdown">${scoreBreakdown(p)}</span>
    </div>`).join('')}</div>` : '';

  document.getElementById('victory-name').textContent = w.emoji+' '+w.name;
  document.getElementById('victory-name').style.color = w.color;
  document.getElementById('victory-type').textContent = 'Vainqueur du Schloss — '+w.score+' points !';
  document.getElementById('victory-stats').innerHTML = podiumHTML + restHTML;
  showScreen('screen-victory');
}
document.getElementById('btn-replay').onclick=()=>{ G=null; PM=null; buildLobby(); showScreen('screen-lobby'); };

// ── PARI ──────────────────────────────────────────────────────────────────────
let activeBet = null;

// betChoicesLocal: pid → 'A'|'B'  (secret until reveal)
let betChoicesLocal = {};

function showBet(bet){
  G.phase = PH.EVENT;
  activeBet = bet;
  betChoicesLocal = {};
  document.getElementById('bet-title').textContent = bet.title;
  document.getElementById('bet-question').textContent = bet.question;
  document.getElementById('bet-opt-a-label').textContent = '🅰 ' + bet.optA;
  document.getElementById('bet-opt-b-label').textContent = '🅱 ' + bet.optB;
  document.getElementById('bet-result').classList.add('hidden');
  document.getElementById('bet-continue').classList.add('hidden');
  document.getElementById('bet-reveal').classList.add('hidden');
  showModal('bet-modal');
  showBetStepLocal(0);
  updateUI();
}

function showBetStepLocal(idx){
  const players = G.players.filter(p => !p.finished);
  const area = document.getElementById('bet-player-area');

  if(idx >= players.length){
    // Tous ont voté → afficher le résumé et le bouton révéler
    area.innerHTML = players.map(p =>
      `<div class="bet-player-row" data-pid="${p.id}" data-choice="${betChoicesLocal[p.id]||''}">
        <span class="bet-pname" style="color:${p.color}">${p.emoji} ${p.name}</span>
        <span style="font-size:18px">${betChoicesLocal[p.id] ? '✅ Prêt' : '⏭️ Passé'}</span>
      </div>`
    ).join('');
    document.getElementById('bet-reveal').classList.remove('hidden');
    document.getElementById('bet-reveal').onclick = revealBet;
    return;
  }

  const p = players[idx];
  area.innerHTML = `
    <div style="text-align:center;margin-bottom:12px;font-size:13px;color:#aaa">
      Passe le téléphone / l'écran à
    </div>
    <div style="text-align:center;font-size:28px;margin-bottom:4px">${p.emoji}</div>
    <div style="text-align:center;font-size:18px;font-weight:bold;color:${p.color};margin-bottom:16px">${p.name}</div>
    <div style="text-align:center;font-size:12px;color:#777;margin-bottom:12px">Ton choix est secret — les autres ne voient pas.</div>
    <div class="bet-choices-row" style="justify-content:center;gap:20px">
      <button class="bet-btn bet-big" id="local-btn-a">🅰 ${activeBet.optA}</button>
      <button class="bet-btn bet-big" id="local-btn-b">🅱 ${activeBet.optB}</button>
    </div>
    <div style="text-align:center;margin-top:14px">
      <button class="btn-choice" id="local-skip" style="font-size:11px;opacity:.5">⏭ Passer mon tour</button>
    </div>`;

  document.getElementById('local-btn-a').onclick = () => {
    betChoicesLocal[p.id] = 'A';
    showBetStepLocal(idx + 1);
  };
  document.getElementById('local-btn-b').onclick = () => {
    betChoicesLocal[p.id] = 'B';
    showBetStepLocal(idx + 1);
  };
  document.getElementById('local-skip').onclick = () => {
    showBetStepLocal(idx + 1);
  };
}

function revealBet(){
  const bet = activeBet;
  const outcome = Math.random() < .5 ? 'A' : 'B';
  const msgs = [];
  msgs.push('<div class="bet-outcome-text">'+bet.outcomeText+'</div>');
  msgs.push('<div style="font-size:11px;color:#888;margin:4px 0">Réponse : <b style="color:#ffd700">'+(outcome==='A'?bet.optA:bet.optB)+'</b></div>');

  G.players.filter(p => !p.finished).forEach(p => {
    const choice = betChoicesLocal[p.id] || p._onlineBetChoice;
    if(choice === outcome){
      (bet.winFx||[]).forEach(e=>{ if(e.t==='b') p.bonheur+=e.v; else if(e.t==='m') p.money+=e.v; });
      p.wins++;
      msgs.push(`<div class="eff-line">✅ ${p.name} avait raison ! +${bet.winFx?.[0]?.v||0} bonheur</div>`);
      log(`✅ ${p.name} a bien parié !`);
    } else if(choice){
      (bet.loseFx||[]).forEach(e=>{ if(e.t==='b') p.bonheur=Math.max(0,p.bonheur+e.v); else if(e.t==='m') p.money+=e.v; });
      msgs.push(`<div class="eff-line">❌ ${p.name} s'est trompé(e)</div>`);
      log(`❌ ${p.name} a mal parié.`);
    } else {
      msgs.push(`<div class="eff-line">🤷 ${p.name} n'a pas parié</div>`);
    }
  });

  const res = document.getElementById('bet-result');
  res.innerHTML = msgs.join('');
  res.classList.remove('hidden');
  document.getElementById('bet-reveal').classList.add('hidden');
  document.getElementById('bet-continue').classList.remove('hidden');
  document.getElementById('bet-continue').onclick = ()=>{
    hideModal('bet-modal'); updateUI(); fullRender(); endTurn();
  };
  updateUI();
}

// ── DUEL ──────────────────────────────────────────────────────────────────────
function showDuel(duel){
  G.phase = PH.EVENT;
  const challenger = cp();
  const desc = duel.desc.replace('{A}', challenger.name).replace('{B}', '...').replace('{stakes}', duel.stakes||2);
  document.getElementById('duel-title').textContent = duel.title;
  document.getElementById('duel-desc').textContent = desc;
  document.getElementById('duel-stake-info').textContent =
    duel.money ? `💸 ${duel.money}€ en jeu !` : `❤️ ${duel.stakes||2} bonheur en jeu !`;

  const list = document.getElementById('duel-target-list');
  list.innerHTML = '';
  const targets = G.players.filter(p => p.id !== challenger.id && !p.finished);
  if(!targets.length){
    document.getElementById('duel-result').classList.remove('hidden');
    document.getElementById('duel-result').innerHTML = '<div class="eff-line">Aucun adversaire disponible !</div>';
    document.getElementById('duel-continue').classList.remove('hidden');
    document.getElementById('duel-continue').onclick = ()=>{ hideModal('duel-modal'); endTurn(); };
    showModal('duel-modal'); return;
  }
  targets.forEach(target => {
    const btn = document.createElement('button');
    btn.className = 'btn-choice';
    btn.textContent = `${target.emoji} Défier ${target.name}`;
    btn.onclick = () => {
      if (NET.isOnline()) NET.startDuel(duel, challenger.id, target.id);
      else resolveDuel(duel, challenger, target);
    };
    list.appendChild(btn);
  });
  document.getElementById('duel-dice-area').classList.add('hidden');
  document.getElementById('duel-result').classList.add('hidden');
  document.getElementById('duel-continue').classList.add('hidden');
  showModal('duel-modal');
}

function resolveDuel(duel, challenger, target){
  const FACES = ['⚀','⚁','⚂','⚃','⚄','⚅'];
  document.getElementById('duel-target-list').innerHTML = '';

  const statKey = duel.stat || 'chance';
  const bonusA = Math.floor((challenger.stats?.[statKey] || 5) / 3);
  const bonusB = Math.floor((target.stats?.[statKey] || 5) / 3);
  const statLabel = STAT_LABELS[statKey] || statKey;

  const diceArea = document.getElementById('duel-dice-area');
  diceArea.innerHTML = `
    <div style="text-align:center;font-size:11px;color:#aaa;margin-bottom:6px">Stat utilisée : <b style="color:#ffd700">${statLabel}</b></div>
    <div class="duel-die-block">
      <div class="duel-die" id="die-a" style="border-color:${challenger.color};color:${challenger.color}">⚀</div>
      <div class="duel-die-name" style="color:${challenger.color}">${challenger.emoji} ${challenger.name}</div>
      <div class="duel-stat-bonus" style="color:${challenger.color}">stat ${challenger.stats?.[statKey]||'?'}/10 → +${bonusA}</div>
    </div>
    <div class="duel-vs">VS</div>
    <div class="duel-die-block">
      <div class="duel-die" id="die-b" style="border-color:${target.color};color:${target.color}">⚀</div>
      <div class="duel-die-name" style="color:${target.color}">${target.emoji} ${target.name}</div>
      <div class="duel-stat-bonus" style="color:${target.color}">stat ${target.stats?.[statKey]||'?'}/10 → +${bonusB}</div>
    </div>`;
  diceArea.classList.remove('hidden');

  let steps = 0;
  const rawA = Math.ceil(Math.random()*6);
  const rawB = Math.ceil(Math.random()*6);
  const rollA = rawA + bonusA;
  const rollB = rawB + bonusB;
  const iv = setInterval(()=>{
    document.getElementById('die-a').textContent = FACES[Math.floor(Math.random()*6)];
    document.getElementById('die-b').textContent = FACES[Math.floor(Math.random()*6)];
    if(++steps >= 14){
      clearInterval(iv);
      document.getElementById('die-a').textContent = FACES[rawA-1];
      document.getElementById('die-b').textContent = FACES[rawB-1];

      const stakes = duel.stakes||2;
      const money = duel.money||0;
      let resultLines = [];
      const totalA = bonusA ? `${rawA}+${bonusA}=${rollA}` : `${rollA}`;
      const totalB = bonusB ? `${rawB}+${bonusB}=${rollB}` : `${rollB}`;
      if(rollA > rollB){
        if(money){ challenger.money+=money; target.money=Math.max(0,target.money-money); }
        else { challenger.bonheur+=stakes; target.bonheur=Math.max(0,target.bonheur-stakes); }
        challenger.wins++;
        document.getElementById('die-a').classList.add('winner');
        resultLines = [`✅ ${challenger.name} (${totalA}) bat ${target.name} (${totalB}) !`,
          money?`💶 +${money}€ pour ${challenger.name}`:`❤️ +${stakes} bonheur pour ${challenger.name}`];
        log(`⚔️ ${challenger.name} bat ${target.name} au duel !`);
      } else if(rollB > rollA){
        if(money){ target.money+=money; challenger.money=Math.max(0,challenger.money-money); }
        else { target.bonheur+=stakes; challenger.bonheur=Math.max(0,challenger.bonheur-stakes); }
        target.wins++;
        document.getElementById('die-b').classList.add('winner');
        resultLines = [`✅ ${target.name} (${totalB}) bat ${challenger.name} (${totalA}) !`,
          money?`💶 +${money}€ pour ${target.name}`:`❤️ +${stakes} bonheur pour ${target.name}`];
        log(`⚔️ ${target.name} bat ${challenger.name} au duel !`);
      } else {
        resultLines = [`🤝 Égalité ! ${challenger.name} et ${target.name} font tous deux ${rollA}.`];
        log(`🤝 Duel nul : ${challenger.name} = ${target.name} (${rollA})`);
      }

      const res = document.getElementById('duel-result');
      res.innerHTML = resultLines.map(l=>`<div class="eff-line">${l}</div>`).join('');
      res.classList.remove('hidden');
      document.getElementById('duel-continue').classList.remove('hidden');
      document.getElementById('duel-continue').onclick = ()=>{
        hideModal('duel-modal'); updateUI(); fullRender(); endTurn();
      };
      updateUI();
    }
  }, 80);
}

// ── MODALS ────────────────────────────────────────────────────────────────────
function showModal(id){ document.getElementById(id).classList.remove('hidden'); }
function hideModal(id){ document.getElementById(id).classList.add('hidden'); }

// ── LOBBY ─────────────────────────────────────────────────────────────────────
function buildLobby(){
  const grid=document.getElementById('player-grid');
  grid.innerHTML='';
  const sel=new Set();
  PLAYER_DEFS.forEach(def=>{
    const c=document.createElement('div'); c.className='pcard';
    const s = def.stats || {};
    c.innerHTML=`
      <div class="pcard-avatar" style="border-color:${def.color};background:${def.bg}">
        <span style="font-size:28px">${def.emoji}</span>
      </div>
      <div class="pcard-name" style="color:${def.color}">${def.name}</div>
      <div class="pcard-role">${def.role}</div>
      <div class="pcard-stats">
        <div class="pstat"><span class="pstat-lbl">🎮</span><div class="pstat-bar"><div class="pstat-fill" style="width:${(s.gaming||0)*10}%;background:${def.color}"></div></div><span class="pstat-val">${s.gaming||0}</span></div>
        <div class="pstat"><span class="pstat-lbl">💰</span><div class="pstat-bar"><div class="pstat-fill" style="width:${(s.finance||0)*10}%;background:${def.color}"></div></div><span class="pstat-val">${s.finance||0}</span></div>
        <div class="pstat"><span class="pstat-lbl">🍀</span><div class="pstat-bar"><div class="pstat-fill" style="width:${(s.chance||0)*10}%;background:${def.color}"></div></div><span class="pstat-val">${s.chance||0}</span></div>
        <div class="pstat"><span class="pstat-lbl">❤️</span><div class="pstat-bar"><div class="pstat-fill" style="width:${(s.social||0)*10}%;background:${def.color}"></div></div><span class="pstat-val">${s.social||0}</span></div>
      </div>`;
    c.onclick=()=>{
      sel.has(def.id)?sel.delete(def.id):sel.add(def.id);
      c.classList.toggle('selected');
      document.getElementById('btn-start').disabled=sel.size<2;
      document.getElementById('select-hint').textContent=sel.size<2?'Sélectionne au moins 2 joueurs':'🎲 '+sel.size+' joueur(s) prêts !';
    };
    grid.appendChild(c);
  });
  document.getElementById('btn-start').onclick=()=>startGame([...sel]);
}

// ── SCREENS ───────────────────────────────────────────────────────────────────
const ALL_SCREENS=['screen-lobby','screen-game','screen-victory'];
function showScreen(id){ ALL_SCREENS.forEach(s=>{ const el=document.getElementById(s); if(el) el.classList.toggle('active',s===id); }); }

function startGame(ids){
  G=newGame(ids);
  PM=new Map(G.players.map(p=>[p.id,p]));
  showScreen('screen-game');
  resize();
  updateUI();
  fullRender();
  document.getElementById('btn-roll').disabled=false;
}

window.addEventListener('resize',()=>{ resize(); fullRender(); });

// ── UI UPDATE ─────────────────────────────────────────────────────────────────
function updateUI(){
  if(!G) return;
  const p=cp();
  const n=STOP_MAP.get(p.nodeId);

  // Side panel background — reflects current player
  const panel = document.querySelector('.side-panel');
  if(panel){
    panel.style.background = `linear-gradient(180deg, ${p.color}22 0%, ${p.bg} 12%, #0b0b17 55%)`;
    panel.style.borderLeftColor = p.color+'99';
    panel.style.boxShadow = `inset -4px 0 32px ${p.color}18`;
  }

  // Current player card
  document.getElementById('cur-emoji').textContent=p.emoji;
  document.getElementById('cur-emoji').style.textShadow='0 0 20px '+p.color;
  document.getElementById('cur-name').textContent=p.name;
  document.getElementById('cur-name').style.color=p.color;
  document.getElementById('cur-role').textContent=p.role;
  document.getElementById('cur-chapter').textContent=n?(n.ch||n.label||''):'';

  // Resources
  document.getElementById('cur-bonheur').textContent=p.bonheur;
  document.getElementById('cur-money').textContent=p.money.toLocaleString('fr-FR')+'€';

  // Phase hint
  document.getElementById('phase-hint').textContent= G.phase===PH.ROLL?'Lance le dé !':G.phase===PH.MOVE?'Déplacement…':G.phase===PH.FORK?'Choisis ta voie…':G.phase===PH.EVENT?'Événement…':'';

  // Dice button
  document.getElementById('btn-roll').disabled=G.phase!==PH.ROLL;

  // Scoreboard
  const scores=document.getElementById('scores-list');
  const sorted=[...G.players].sort((a,b)=>b.bonheur-a.bonheur);
  scores.innerHTML=sorted.map(pl=>`
    <div class="score-row ${pl===p?'score-cur':''}">
      <span style="font-size:18px">${pl.emoji}</span>
      <span class="score-n" style="color:${pl.color}">${pl.name}</span>
      <span class="score-v">${pl.bonheur}❤️</span>
      <span class="score-m">${(pl.money/1000).toFixed(1)}k€</span>
    </div>`).join('');

  // Log
  document.getElementById('event-log').innerHTML=G.log.slice(0,12).map(m=>'<div class="log-entry">'+m+'</div>').join('');
}

// ── INIT ─────────────────────────────────────────────────────────────────────
buildLobby();
showScreen('screen-lobby');
animLoop();

// ── NETWORK MODULE ────────────────────────────────────────────────────────────
const NET = (() => {
  const FACES = ['⚀','⚁','⚂','⚃','⚄','⚅'];
  let socket = null;
  let mode = 'local';
  let roomCode = null;
  let mySocketId = null;
  let myPlayerId = null;
  let isHost = false;

  function isOnline() { return mode === 'online' && !!socket; }
  function isMyTurn() { return !G || cp().id === myPlayerId; }

  function syncState() {
    if (isOnline()) socket.emit('sync_state', { state: JSON.parse(JSON.stringify(G)) });
  }

  function applyRemoteState(state) {
    const prevIdx = G ? G.idx : -1;
    G = state;
    PM = new Map(G.players.map(p => [p.id, p]));
    updateUI();
    fullRender();
    lockRollIfNotMyTurn();
    // Show toast when the active player changes
    if (G.idx !== prevIdx) showTurnToast(cp());
  }

  // ── mode switch in lobby ──
  function setMode(m) {
    mode = m;
    document.getElementById('tab-local').classList.toggle('active', m === 'local');
    document.getElementById('tab-online').classList.toggle('active', m === 'online');
    document.getElementById('mode-local').classList.toggle('hidden', m !== 'local');
    document.getElementById('mode-online').classList.toggle('hidden', m !== 'online');
    if (m === 'online' && !socket) connectSocket();
  }

  // ── socket connection ──
  function connectSocket() {
    if (window._noSocketIO) { alert('Serveur non disponible. Lance node server.js.'); return; }
    socket = io();
    mySocketId = null;

    socket.on('connect', () => { mySocketId = socket.id; });

    socket.on('room_info', info => updateOnlineLobby(info));

    socket.on('game_started', ({ state }) => {
      applyRemoteState(state);
      showScreen('screen-game');
      resize();
      lockRollIfNotMyTurn();
    });

    socket.on('state_updated', ({ state }) => applyRemoteState(state));

    socket.on('open_bet', betData => showBetOnline(betData));

    socket.on('bet_choices_updated', ({ choices }) => {
      updateBetChoicesDisplay(choices);
      const activePids = G ? G.players.filter(p => !p.finished).map(p => p.id) : [];
      const allVoted = activePids.every(pid => {
        const entry = (onlineRoomInfo.players || []).find(x => x.pid === pid);
        return entry && choices.find(c => c.sid === entry.sid);
      });
      if (allVoted && isMyTurn()) document.getElementById('bet-reveal').classList.remove('hidden');
    });

    // ── Duel events ──
    socket.on('duel_started', ({ duel, challengerPid, targetPid }) => {
      const challenger = G.players.find(p => p.id === challengerPid);
      const target = G.players.find(p => p.id === targetPid);
      showDuelOnline(duel, challenger, target);
    });

    socket.on('duel_roll_update', ({ rolls }) => {
      if (rolls.challenger !== undefined && document.getElementById('roll-btn-a')) {
        document.getElementById('roll-btn-a')?.remove();
      }
      if (rolls.target !== undefined && document.getElementById('roll-btn-b')) {
        document.getElementById('roll-btn-b')?.remove();
      }
      // Update waiting indicators
      const waitA = document.getElementById('die-wait-a');
      const waitB = document.getElementById('die-wait-b');
      if (waitA) waitA.textContent = rolls.challenger !== undefined ? '✅' : '⏳';
      if (waitB) waitB.textContent = rolls.target !== undefined ? '✅' : '⏳';
    });

    socket.on('duel_complete', ({ duel, challengerPid, targetPid, rolls }) => {
      finalizeDuelOnline(duel, challengerPid, targetPid, rolls);
    });
  }

  let onlineRoomInfo = { host: null, players: [] };

  function updateOnlineLobby(info) {
    onlineRoomInfo = info;
    isHost = info.host === mySocketId;
    const myEntry = info.players.find(x => x.sid === mySocketId);
    myPlayerId = myEntry ? myEntry.pid : null;

    // Rebuild online player grid
    const grid = document.getElementById('player-grid-online');
    grid.innerHTML = '';
    PLAYER_DEFS.forEach(def => {
      const takenBy = info.players.find(x => x.pid === def.id);
      const isMine = takenBy && takenBy.sid === mySocketId;
      const isTaken = takenBy && !isMine;
      const s = def.stats || {};
      const c = document.createElement('div');
      c.className = 'pcard' + (isMine ? ' selected' : '') + (isTaken ? ' taken' : '');
      c.innerHTML = `
        <div class="pcard-avatar" style="border-color:${def.color};background:${def.bg}">
          <span style="font-size:28px">${def.emoji}</span>
          ${isTaken ? '<div class="taken-badge">Pris</div>' : ''}
        </div>
        <div class="pcard-name" style="color:${def.color}">${def.name}</div>
        <div class="pcard-role">${def.role}</div>
        <div class="pcard-stats">
          <div class="pstat"><span class="pstat-lbl">🎮</span><div class="pstat-bar"><div class="pstat-fill" style="width:${s.gaming*10}%;background:${def.color}"></div></div><span class="pstat-val">${s.gaming}</span></div>
          <div class="pstat"><span class="pstat-lbl">💰</span><div class="pstat-bar"><div class="pstat-fill" style="width:${s.finance*10}%;background:${def.color}"></div></div><span class="pstat-val">${s.finance}</span></div>
          <div class="pstat"><span class="pstat-lbl">🍀</span><div class="pstat-bar"><div class="pstat-fill" style="width:${s.chance*10}%;background:${def.color}"></div></div><span class="pstat-val">${s.chance}</span></div>
          <div class="pstat"><span class="pstat-lbl">❤️</span><div class="pstat-bar"><div class="pstat-fill" style="width:${s.social*10}%;background:${def.color}"></div></div><span class="pstat-val">${s.social}</span></div>
        </div>`;
      if (!isTaken) {
        c.onclick = () => {
          socket.emit('select_player', { playerId: isMine ? null : def.id });
        };
      }
      grid.appendChild(c);
    });

    // Players list
    const list = document.getElementById('online-players-list');
    list.innerHTML = info.players.map(x => {
      const def = PLAYER_DEFS.find(d => d.id === x.pid);
      const isMe = x.sid === mySocketId;
      return def ? `<div class="online-player-entry" style="color:${def.color}">${def.emoji} ${def.name}${isMe ? ' (moi)' : ''}${x.sid === info.host ? ' 👑' : ''}</div>` : '';
    }).join('');

    // Hint & start button
    const mySelected = !!myPlayerId;
    const allSelected = info.players.length >= 2 && info.players.every(x => x.pid);
    document.getElementById('select-hint-online').textContent =
      !mySelected ? 'Choisis ton personnage' :
      !allSelected ? `${info.players.filter(x=>x.pid).length} joueur(s) prêts` :
      '✅ Tout le monde est prêt !';
    const startBtn = document.getElementById('btn-start-online');
    startBtn.classList.toggle('hidden', !isHost);
    startBtn.disabled = !allSelected;
  }

  // ── room creation / join ──
  function createRoom() {
    if (!socket) return;
    socket.emit('create_room', ({ code }) => {
      roomCode = code;
      document.getElementById('online-setup').classList.add('hidden');
      document.getElementById('online-room').classList.remove('hidden');
      document.getElementById('room-code-display').innerHTML =
        `Code de la partie : <b class="room-code">${code}</b><br><span style="font-size:11px;color:#aaa">Partage ce code avec tes amis</span>`;
      isHost = true;
    });
  }

  function showJoin() {
    document.getElementById('join-form').classList.remove('hidden');
  }

  function joinRoom() {
    const code = document.getElementById('room-code-input').value.trim().toUpperCase();
    if (!code || !socket) return;
    socket.emit('join_room', { code }, ({ ok, error, info }) => {
      if (error) { alert(error); return; }
      roomCode = code;
      document.getElementById('online-setup').classList.add('hidden');
      document.getElementById('online-room').classList.remove('hidden');
      document.getElementById('room-code-display').innerHTML =
        `Salle <b class="room-code">${code}</b>`;
      updateOnlineLobby(info);
    });
  }

  function startOnline() {
    if (!isHost || !socket) return;
    const ids = onlineRoomInfo.players.map(x => x.pid).filter(Boolean);
    if (ids.length < 2) return;
    const state = newGame(ids);
    socket.emit('start_game', { state: JSON.parse(JSON.stringify(state)) });
  }

  // ── in-game: lock roll when not my turn ──
  function lockRollIfNotMyTurn() {
    if (!isOnline()) return;
    document.getElementById('btn-roll').disabled = G.phase !== PH.ROLL || !isMyTurn();
  }

  // ── bet in online mode ──
  function showBetOnline(bet) {
    G.phase = PH.EVENT;
    activeBet = bet;
    document.getElementById('bet-title').textContent = bet.title;
    document.getElementById('bet-question').textContent = bet.question;
    document.getElementById('bet-opt-a-label').textContent = '🅰 ' + bet.optA;
    document.getElementById('bet-opt-b-label').textContent = '🅱 ' + bet.optB;

    const area = document.getElementById('bet-player-area');
    area.innerHTML = '';

    if (myPlayerId) {
      const p = G.players.find(x => x.id === myPlayerId);
      if (p) {
        const row = document.createElement('div');
        row.className = 'bet-player-row';
        row.dataset.pid = p.id;
        row.innerHTML = `
          <span class="bet-pname" style="color:${p.color}">${p.emoji} Ton pari</span>
          <button class="bet-btn" data-opt="A">🅰</button>
          <button class="bet-btn" data-opt="B">🅱</button>
          <span class="bet-chosen" style="font-size:11px;color:#666;min-width:20px"></span>`;
        row.querySelectorAll('.bet-btn').forEach(btn => {
          btn.onclick = () => {
            row.querySelectorAll('.bet-btn').forEach(b => b.classList.remove('sel-a','sel-b'));
            btn.classList.add(btn.dataset.opt==='A'?'sel-a':'sel-b');
            row.querySelector('.bet-chosen').textContent = btn.dataset.opt;
            row.dataset.choice = btn.dataset.opt;
            socket.emit('bet_choice', { choice: btn.dataset.opt });
          };
        });
        area.appendChild(row);
      }
    }

    // Waiting rows for other players
    const othersDiv = document.createElement('div');
    othersDiv.id = 'bet-others-waiting';
    othersDiv.style.cssText = 'margin-top:8px;font-size:11px;color:#aaa';
    area.appendChild(othersDiv);

    document.getElementById('bet-result').classList.add('hidden');
    document.getElementById('bet-continue').classList.add('hidden');
    // Only current player can reveal (enabled once all voted)
    const revBtn = document.getElementById('bet-reveal');
    revBtn.classList.toggle('hidden', !isMyTurn());
    revBtn.onclick = () => { revealBet(); syncState(); socket.emit('clear_bet'); };
    showModal('bet-modal');
    updateUI();
  }

  function updateBetChoicesDisplay(choices) {
    const div = document.getElementById('bet-others-waiting');
    if (!div || !onlineRoomInfo.players) return;
    div.innerHTML = onlineRoomInfo.players.map(x => {
      const def = PLAYER_DEFS.find(d => d.id === x.pid);
      const voted = choices.find(c => c.sid === x.sid);
      return def ? `<span style="color:${def.color}">${def.emoji} ${voted ? '✅' : '⏳'}</span>` : '';
    }).join(' ');
  }

  function showDuelOnline(duel, challenger, target) {
    G.phase = PH.EVENT;
    const statKey = duel.stat || 'chance';
    const bonusA = Math.floor((challenger.stats?.[statKey] || 5) / 3);
    const bonusB = Math.floor((target.stats?.[statKey] || 5) / 3);
    const statLabel = STAT_LABELS[statKey] || statKey;
    const desc = duel.desc.replace('{A}', challenger.name).replace('{B}', target.name).replace('{stakes}', duel.stakes||2);

    document.getElementById('duel-title').textContent = duel.title;
    document.getElementById('duel-desc').textContent = desc;
    document.getElementById('duel-stake-info').textContent =
      duel.money ? `💸 ${duel.money}€ en jeu !` : `❤️ ${duel.stakes||2} bonheur en jeu !`;
    document.getElementById('duel-target-list').innerHTML = '';

    const amChallenger = myPlayerId === challenger.id;
    const amTarget = myPlayerId === target.id;

    const diceArea = document.getElementById('duel-dice-area');
    diceArea.innerHTML = `
      <div style="text-align:center;font-size:11px;color:#aaa;margin-bottom:6px">Stat : <b style="color:#ffd700">${statLabel}</b></div>
      <div class="duel-die-block">
        <div class="duel-die" id="die-a" style="border-color:${challenger.color};color:${challenger.color}">⏳</div>
        <span id="die-wait-a" style="font-size:12px">⏳</span>
        <div class="duel-die-name" style="color:${challenger.color}">${challenger.emoji} ${challenger.name}</div>
        <div class="duel-stat-bonus" style="color:${challenger.color}">stat ${challenger.stats?.[statKey]||'?'}/10 → +${bonusA}</div>
        ${amChallenger ? `<button class="btn-choice" id="roll-btn-a" style="margin-top:6px">🎲 Lancer mon dé</button>` : ''}
      </div>
      <div class="duel-vs">VS</div>
      <div class="duel-die-block">
        <div class="duel-die" id="die-b" style="border-color:${target.color};color:${target.color}">⏳</div>
        <span id="die-wait-b" style="font-size:12px">⏳</span>
        <div class="duel-die-name" style="color:${target.color}">${target.emoji} ${target.name}</div>
        <div class="duel-stat-bonus" style="color:${target.color}">stat ${target.stats?.[statKey]||'?'}/10 → +${bonusB}</div>
        ${amTarget ? `<button class="btn-choice" id="roll-btn-b" style="margin-top:6px">🎲 Lancer mon dé</button>` : ''}
      </div>`;
    diceArea.classList.remove('hidden');
    document.getElementById('duel-result').classList.add('hidden');
    document.getElementById('duel-continue').classList.add('hidden');

    function makeRollHandler(btnId, dieId) {
      const btn = document.getElementById(btnId);
      if (!btn) return;
      btn.onclick = () => {
        btn.disabled = true;
        const raw = Math.ceil(Math.random() * 6);
        let steps = 0;
        const iv = setInterval(() => {
          document.getElementById(dieId).textContent = FACES[Math.floor(Math.random()*6)];
          if (++steps >= 10) { clearInterval(iv); document.getElementById(dieId).textContent = FACES[raw-1]; }
        }, 80);
        socket.emit('duel_roll', { rawRoll: raw });
      };
    }
    makeRollHandler('roll-btn-a', 'die-a');
    makeRollHandler('roll-btn-b', 'die-b');

    showModal('duel-modal');
    updateUI();
  }

  function finalizeDuelOnline(duel, challengerPid, targetPid, rolls) {
    const challenger = G.players.find(p => p.id === challengerPid);
    const target = G.players.find(p => p.id === targetPid);
    const statKey = duel.stat || 'chance';
    const bonusA = Math.floor((challenger.stats?.[statKey] || 5) / 3);
    const bonusB = Math.floor((target.stats?.[statKey] || 5) / 3);
    const rawA = rolls.challenger;
    const rawB = rolls.target;
    const rollA = rawA + bonusA;
    const rollB = rawB + bonusB;

    // Animate both dice to final values
    let steps = 0;
    const iv = setInterval(() => {
      const da = document.getElementById('die-a');
      const db = document.getElementById('die-b');
      if (da) da.textContent = FACES[Math.floor(Math.random()*6)];
      if (db) db.textContent = FACES[Math.floor(Math.random()*6)];
      if (++steps >= 14) {
        clearInterval(iv);
        if (da) da.textContent = FACES[rawA-1];
        if (db) db.textContent = FACES[rawB-1];
        // Remove waiting indicators
        document.getElementById('die-wait-a')?.remove();
        document.getElementById('die-wait-b')?.remove();

        const stakes = duel.stakes||2;
        const money = duel.money||0;
        const totalA = bonusA ? `${rawA}+${bonusA}=${rollA}` : `${rollA}`;
        const totalB = bonusB ? `${rawB}+${bonusB}=${rollB}` : `${rollB}`;
        let resultLines = [];

        // Only challenger applies effects and triggers endTurn
        if (rollA > rollB) {
          if (myPlayerId === challengerPid) {
            if (money) { challenger.money+=money; target.money=Math.max(0,target.money-money); }
            else { challenger.bonheur+=stakes; target.bonheur=Math.max(0,target.bonheur-stakes); }
            challenger.wins++;
          }
          document.getElementById('die-a')?.classList.add('winner');
          resultLines = [`✅ ${challenger.name} (${totalA}) bat ${target.name} (${totalB}) !`,
            money ? `💶 +${money}€ pour ${challenger.name}` : `❤️ +${stakes} bonheur pour ${challenger.name}`];
          log(`⚔️ ${challenger.name} bat ${target.name} au duel !`);
        } else if (rollB > rollA) {
          if (myPlayerId === challengerPid) {
            if (money) { target.money+=money; challenger.money=Math.max(0,challenger.money-money); }
            else { target.bonheur+=stakes; challenger.bonheur=Math.max(0,challenger.bonheur-stakes); }
            target.wins++;
          }
          document.getElementById('die-b')?.classList.add('winner');
          resultLines = [`✅ ${target.name} (${totalB}) bat ${challenger.name} (${totalA}) !`,
            money ? `💶 +${money}€ pour ${target.name}` : `❤️ +${stakes} bonheur pour ${target.name}`];
          log(`⚔️ ${target.name} bat ${challenger.name} au duel !`);
        } else {
          resultLines = [`🤝 Égalité ! ${challenger.name} et ${target.name} font tous deux ${rollA}.`];
          log(`🤝 Duel nul : ${challenger.name} = ${target.name} (${rollA})`);
        }

        const res = document.getElementById('duel-result');
        res.innerHTML = resultLines.map(l => `<div class="eff-line">${l}</div>`).join('');
        res.classList.remove('hidden');
        document.getElementById('duel-continue').classList.remove('hidden');
        document.getElementById('duel-continue').onclick = () => {
          hideModal('duel-modal');
          updateUI(); fullRender();
          if (myPlayerId === challengerPid) endTurn(); // endTurn syncs state for everyone
        };
        updateUI();
      }
    }, 80);
  }

  function startDuel(duel, challengerPid, targetPid) {
    if (!socket) return;
    // Hide target list immediately (duel_started will rebuild the modal for everyone)
    document.getElementById('duel-target-list').innerHTML = '<div style="color:#aaa;font-size:12px">Connexion…</div>';
    socket.emit('start_duel', { duel, challengerPid, targetPid });
  }

  // ── patch roll button for online ──
  const origRollHandler = document.getElementById('btn-roll').onclick;
  document.getElementById('btn-roll').addEventListener('click', () => {
    if (isOnline() && !isMyTurn()) return;
  }, true);

  // ── sync after key actions ──
  const _endTurn = endTurn;
  window.endTurn = function() {
    _endTurn();
    if (isOnline()) {
      syncState();
      lockRollIfNotMyTurn();
    }
  };

  const _startGame = startGame;
  window.startGame = function(ids) {
    _startGame(ids);
  };

  return { setMode, createRoom, showJoin, joinRoom, startOnline, startDuel, sync: syncState, isOnline, isMyTurn };
})();
