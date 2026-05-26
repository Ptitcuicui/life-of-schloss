// Trivia questions: real Haute-Marne history + Schloss group lore
// Each question: { q, answers: [{text, correct}], explanation }

export const QUESTIONS = [
  // ── Haute-Marne ──────────────────────────────────────────────────────────
  {
    q: "Quel est le numéro de département de la Haute-Marne ?",
    answers: [
      { text: "51", correct: false },
      { text: "52", correct: true },
      { text: "53", correct: false },
      { text: "54", correct: false },
    ],
    explanation: "La Haute-Marne c'est le 52 — gravé dans nos cœurs.",
  },
  {
    q: "Quelle ville est la préfecture (capitale) de la Haute-Marne ?",
    answers: [
      { text: "Langres", correct: false },
      { text: "Saint-Dizier", correct: false },
      { text: "Chaumont", correct: true },
      { text: "Joinville", correct: false },
    ],
    explanation: "Chaumont, avec son célèbre viaduc, est bien la capitale du 52.",
  },
  {
    q: "De quelle ville de Haute-Marne est originaire le philosophe Denis Diderot ?",
    answers: [
      { text: "Chaumont", correct: false },
      { text: "Langres", correct: true },
      { text: "Saint-Dizier", correct: false },
      { text: "Bourbonne-les-Bains", correct: false },
    ],
    explanation: "Denis Diderot est né à Langres en 1713. La ville l'honore encore.",
  },
  {
    q: "Quelle infrastructure emblématique traverse Chaumont en hauteur ?",
    answers: [
      { text: "Un tunnel ferroviaire", correct: false },
      { text: "Un pont suspendu", correct: false },
      { text: "Le Viaduc de Chaumont", correct: true },
      { text: "Un aqueduc romain", correct: false },
    ],
    explanation: "Le Viaduc de Chaumont (1856) mesure 52m de hauteur — bien du 52 !",
  },
  {
    q: "Colombey-les-Deux-Églises est célèbre pour être le village de retraite de…",
    answers: [
      { text: "Napoléon Bonaparte", correct: false },
      { text: "Charles de Gaulle", correct: true },
      { text: "Georges Pompidou", correct: false },
      { text: "François Mitterrand", correct: false },
    ],
    explanation: "La Boisserie à Colombey-les-Deux-Églises, demeure du Général de Gaulle.",
  },
  {
    q: "Quelle est la spécialité artisanale de la ville de Nogent en Haute-Marne ?",
    answers: [
      { text: "La vannerie", correct: false },
      { text: "La coutellerie", correct: true },
      { text: "La poterie", correct: false },
      { text: "La dentelle", correct: false },
    ],
    explanation: "Nogent = capitale française de la coutellerie depuis le 17ème siècle.",
  },
  {
    q: "Fayl-Billot est surnommée la capitale de…",
    answers: [
      { text: "La coutellerie", correct: false },
      { text: "La vannerie (osier)", correct: true },
      { text: "La fromagerie", correct: false },
      { text: "La forge", correct: false },
    ],
    explanation: "Fayl-Billot, capitale de la vannerie — on y tresse l'osier depuis des siècles.",
  },
  {
    q: "Quel massacre religieux (1562) a eu lieu dans la ville de Wassy en Haute-Marne ?",
    answers: [
      { text: "Le massacre des Templiers", correct: false },
      { text: "Le massacre de la Saint-Barthélemy", correct: false },
      { text: "Le massacre de Wassy, début des guerres de Religion", correct: true },
      { text: "La Terreur de Wassy", correct: false },
    ],
    explanation: "Le 1er mars 1562, le massacre de Wassy déclencha les guerres de Religion en France.",
  },
  {
    q: "Le Lac du Der-Chantecoq est l'un des plus grands lacs artificiels de France. Il est situé…",
    answers: [
      { text: "Entièrement en Haute-Marne", correct: false },
      { text: "À cheval entre la Haute-Marne et la Marne", correct: true },
      { text: "En Champagne uniquement", correct: false },
      { text: "En Haute-Marne et Meuse", correct: false },
    ],
    explanation: "Le Der est partagé entre la Haute-Marne et la Marne — 4 800 hectares d'eau.",
  },
  {
    q: "Bourbonne-les-Bains est connue pour…",
    answers: [
      { text: "Ses mines de sel", correct: false },
      { text: "Ses eaux thermales", correct: true },
      { text: "Son festival de jazz", correct: false },
      { text: "Son vignoble", correct: false },
    ],
    explanation: "Bourbonne-les-Bains — station thermale depuis l'Antiquité romaine.",
  },
  {
    q: "Combien de communes compte approximativement la Haute-Marne ?",
    answers: [
      { text: "Environ 200", correct: false },
      { text: "Environ 430", correct: true },
      { text: "Environ 600", correct: false },
      { text: "Environ 100", correct: false },
    ],
    explanation: "La Haute-Marne compte environ 433 communes — département peu dense.",
  },
  {
    q: "Quel célèbre général napoléonien est né à Joinville ?",
    answers: [
      { text: "Maréchal Davout", correct: false },
      { text: "Général Drouot", correct: false },
      { text: "Général Oudinot (Duc de Reggio)", correct: true },
      { text: "Général Kellermann", correct: false },
    ],
    explanation: "Nicolas Oudinot, né à Bar-le-Duc mais très lié à Joinville — Maréchal d'Empire.",
  },
  // ── Schloss Group Lore (generic / funny) ─────────────────────────────────
  {
    q: "Sponge tend la main — dans quelle main cache-t-il la pièce ?",
    answers: [
      { text: "La main gauche", correct: false },
      { text: "La main droite", correct: false },
      { text: "Les deux... et aucune", correct: true },
      { text: "La manche", correct: false },
    ],
    explanation: "Le coin truqué de Sponge : la pièce est toujours dans la main qu'on ne choisit pas 🧽",
  },
  {
    q: "Dans Prison Architect, que fait Sponge dès le début d'une partie ?",
    answers: [
      { text: "Il libère tous les prisonniers", correct: false },
      { text: "Il construit une salle de sport", correct: false },
      { text: "Il optimise la cuisine et la cellule de sécurité en premier", correct: true },
      { text: "Il met des fleurs partout", correct: false },
    ],
    explanation: "Sponge le gestionnaire — ressources et organisation avant tout ! 📋",
  },
  {
    q: "Quelle œuvre Disney/conte Invoherence adore par-dessus tout ?",
    answers: [
      { text: "Le Roi Lion", correct: false },
      { text: "Alice au Pays des Merveilles", correct: true },
      { text: "La Belle au Bois Dormant", correct: false },
      { text: "Cendrillon", correct: false },
    ],
    explanation: "Alice au Pays des Merveilles — et Invoherence tombe dans le terrier comme Alice 🐰",
  },
  {
    q: "Comment Toutoon réagit-il à 10 minutes d'un jeu très compétitif ?",
    answers: [
      { text: "Il abandonne calmement", correct: false },
      { text: "Il reste zen, il gagne toujours", correct: false },
      { text: "Il entre en RAGE MODE 😤", correct: true },
      { text: "Il propose une trêve", correct: false },
    ],
    explanation: "Le Dormant s'éveille — Toutoon calme → Toutoon en rage en 0,3 secondes ⚡",
  },
  {
    q: "Quel est le surnom du groupe basé sur le mot 'château' en allemand ?",
    answers: [
      { text: "Burgers", correct: false },
      { text: "Schloss", correct: true },
      { text: "Festung", correct: false },
      { text: "Burg", correct: false },
    ],
    explanation: "Schloss = château en allemand. Chaumont, le château, la Haute-Marne — tout est lié.",
  },
  {
    q: "Ptitcuicui est reconnu dans le groupe comme…",
    answers: [
      { text: "Le joueur le plus bruyant", correct: false },
      { text: "Le stratège / cerveau", correct: true },
      { text: "Celui qui perd toujours aux jeux", correct: false },
      { text: "Le plus grand fan de Disney", correct: false },
    ],
    explanation: "L'Architecte du 52 — Ptitcuicui pense toujours 5 coups d'avance.",
  },
  {
    q: "Whitewarrior est surtout connu pour être…",
    answers: [
      { text: "Très agressif en jeu", correct: false },
      { text: "Loyal et défensif", correct: true },
      { text: "Le plus rapide", correct: false },
      { text: "Toujours le premier éliminé", correct: false },
    ],
    explanation: "Le Gardien — Whitewarrior protège ses alliés avant tout. Loyal jusqu'au bout.",
  },
];

export function getRandomQuestion(usedIndices) {
  const available = QUESTIONS
    .map((_, i) => i)
    .filter(i => !usedIndices.has(i));
  if (available.length === 0) {
    usedIndices.clear();
    return getRandomQuestion(usedIndices);
  }
  const idx = available[Math.floor(Math.random() * available.length)];
  usedIndices.add(idx);
  return { ...QUESTIONS[idx], idx };
}
