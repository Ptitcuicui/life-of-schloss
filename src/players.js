// Player definitions for Schloss — Le Jeu du 52

export const PLAYER_DEFS = [
  {
    id: 'ptitcuicui',
    name: 'Ptitcuicui',
    emoji: '🔵',
    color: '#4a90d9',
    role: "L'Architecte",
    title: 'Stratège du 52',
    passiveName: 'Survivant Solitaire',
    passiveDesc: 'Ses cellules survivent avec seulement 1 voisin (au lieu de 2 minimum)',
    powerName: 'Vision Tactique',
    powerDesc: 'Prévisualise les 3 prochaines générations avant de placer ses cellules',
    powerCooldown: 3,
    // GoL rule: survive with 1-3 neighbors (instead of 2-3)
    surviveMin: 1, surviveMax: 3,
    birthMin: 3, birthMax: 3,
    // Special passive flag
    passiveId: 'lone_survivor',
  },
  {
    id: 'whitewarrior',
    name: 'Whitewarrior',
    emoji: '⚔️',
    color: '#b8cce8',
    role: 'Le Gardien',
    title: 'Défenseur Loyal',
    passiveName: 'Mur du Château',
    passiveDesc: 'Ses cellules adjacentes à 2+ alliées survivent avec jusqu\'à 4 voisins',
    powerName: 'Forteresse',
    powerDesc: 'Choisit 5 cellules qui deviennent indestructibles pendant cette simulation',
    powerCooldown: 4,
    surviveMin: 2, surviveMax: 3,
    birthMin: 3, birthMax: 3,
    passiveId: 'fortress_wall',
  },
  {
    id: 'sponge',
    name: 'Sponge',
    emoji: '🧽',
    color: '#ff8c42',
    role: 'Le Gestionnaire',
    title: 'Prison Architect du 52',
    passiveName: 'Ressources Infinies',
    passiveDesc: '+1 cellule à placer par landmark contrôlé (max +4)',
    powerName: 'Coin Truqué',
    powerDesc: "L'adversaire avec le plus de cellules perd 3 cellules aléatoires",
    powerCooldown: 3,
    surviveMin: 2, surviveMax: 4,
    birthMin: 3, birthMax: 3,
    passiveId: 'resource_manager',
  },
  {
    id: 'invoherence',
    name: 'Invoherence',
    emoji: '🐰',
    color: '#c084f5',
    role: 'La Rêveuse',
    title: 'Alice du Pays de la HM',
    passiveName: 'Magie d\'Alice',
    passiveDesc: '20% de chance qu\'une cellule morte revive si elle a des voisines',
    powerName: 'Au Pays des Merveilles',
    powerDesc: 'Toutes ses cellules se téléportent vers des cases vides aléatoires',
    powerCooldown: 5,
    surviveMin: 2, surviveMax: 3,
    birthMin: 3, birthMax: 3,
    passiveId: 'alice_magic',
  },
  {
    id: 'toutoon',
    name: 'Toutoon',
    emoji: '😤',
    color: '#e05050',
    role: 'Le Dormant',
    title: 'Calme... Jusqu\'au Bout',
    passiveName: 'Naissance Groupée',
    passiveDesc: 'Ses cellules naissent avec 2 ou 3 voisins (croissance plus rapide)',
    powerName: 'RAGE MODE',
    powerDesc: 'Pendant cette simulation, toutes les naissances de ses cellules sont doublées',
    powerCooldown: 4,
    surviveMin: 2, surviveMax: 3,
    birthMin: 2, birthMax: 3,
    passiveId: 'cluster_birth',
  },
];

export function createPlayer(def) {
  return {
    ...def,
    cooldown: 0,
    extraCells: 0,
    powerActive: false,
    score: 0,
    cells: 0,
    landmarks: 0,
    fortifiedCells: new Set(),  // Whitewarrior power
    rageActive: false,          // Toutoon power
  };
}

export function getPlayerDef(id) {
  return PLAYER_DEFS.find(p => p.id === id);
}
