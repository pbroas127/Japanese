// ──────────────────────────────────────────────────────────────────────────
//  Forest of Hiragana — hardcoded game data & content
//  Single world MVP. All hiragana content lives here.
// ──────────────────────────────────────────────────────────────────────────

// Full romaji pool used to build quiz distractors.
export const ROMAJI_POOL = [
  'a', 'i', 'u', 'e', 'o',
  'ka', 'ki', 'ku', 'ke', 'ko',
  'sa', 'shi', 'su', 'se', 'so',
  'ta', 'chi', 'tsu', 'te', 'to',
  'na', 'ni', 'nu', 'ne', 'no',
]

// The five lessons of the Forest. Content is cumulative.
export const LESSONS = [
  {
    id: 'l1',
    title: 'The Five Voices',
    subtitle: 'Vowels',
    accent: '#F2913D',
    kana: [
      { char: 'あ', romaji: 'a' },
      { char: 'い', romaji: 'i' },
      { char: 'う', romaji: 'u' },
      { char: 'え', romaji: 'e' },
      { char: 'お', romaji: 'o' },
    ],
    examples: [
      { kana: 'あい', romaji: 'ai', meaning: 'love' },
      { kana: 'いえ', romaji: 'ie', meaning: 'house' },
      { kana: 'うえ', romaji: 'ue', meaning: 'above' },
    ],
  },
  {
    id: 'l2',
    title: 'The K Grove',
    subtitle: 'か き く け こ',
    accent: '#E8A33D',
    kana: [
      { char: 'か', romaji: 'ka' },
      { char: 'き', romaji: 'ki' },
      { char: 'く', romaji: 'ku' },
      { char: 'け', romaji: 'ke' },
      { char: 'こ', romaji: 'ko' },
    ],
    examples: [
      { kana: 'かお', romaji: 'kao', meaning: 'face' },
      { kana: 'こえ', romaji: 'koe', meaning: 'voice' },
      { kana: 'いけ', romaji: 'ike', meaning: 'pond' },
    ],
  },
  {
    id: 'l3',
    title: 'The S Thicket',
    subtitle: 'さ し す せ そ',
    accent: '#5FBF8C',
    kana: [
      { char: 'さ', romaji: 'sa' },
      { char: 'し', romaji: 'shi' },
      { char: 'す', romaji: 'su' },
      { char: 'せ', romaji: 'se' },
      { char: 'そ', romaji: 'so' },
    ],
    examples: [
      { kana: 'すし', romaji: 'sushi', meaning: 'sushi' },
      { kana: 'さけ', romaji: 'sake', meaning: 'salmon / sake' },
      { kana: 'あさ', romaji: 'asa', meaning: 'morning' },
    ],
  },
  {
    id: 'l4',
    title: 'The T Hollow',
    subtitle: 'た ち つ て と',
    accent: '#4FA6C9',
    kana: [
      { char: 'た', romaji: 'ta' },
      { char: 'ち', romaji: 'chi' },
      { char: 'つ', romaji: 'tsu' },
      { char: 'て', romaji: 'te' },
      { char: 'と', romaji: 'to' },
    ],
    examples: [
      { kana: 'たこ', romaji: 'tako', meaning: 'octopus' },
      { kana: 'つき', romaji: 'tsuki', meaning: 'moon' },
      { kana: 'いと', romaji: 'ito', meaning: 'thread' },
    ],
  },
  {
    id: 'l5',
    title: 'The N Clearing',
    subtitle: 'な に ぬ ね の',
    accent: '#9B7BD4',
    kana: [
      { char: 'な', romaji: 'na' },
      { char: 'に', romaji: 'ni' },
      { char: 'ぬ', romaji: 'nu' },
      { char: 'ね', romaji: 'ne' },
      { char: 'の', romaji: 'no' },
    ],
    examples: [
      { kana: 'なに', romaji: 'nani', meaning: 'what' },
      { kana: 'ねこ', romaji: 'neko', meaning: 'cat' },
      { kana: 'いぬ', romaji: 'inu', meaning: 'dog' },
    ],
  },
]

// World structure: ordered nodes laid out on the map. Positions are % of the
// world scene, which is locked to the background art's aspect ratio so the
// markers land on the painted dirt-path clearings on every device. Each node
// has a `marker` describing the kind of place it is, so the player understands
// its function before tapping.
//
// NOTE: these coordinates are tuned to the painted path in the current forest
// background. If the background art changes, re-tune them here.
export const WORLD = {
  id: 'forest',
  name: 'Forest of Hiragana',
  // Aspect ratio of the background art (width / height) — the scene is locked
  // to this so node % positions map straight onto the painted path.
  art: { w: 1536, h: 2752 },
  // Kiko's permanent home: a dirt clearing off the path. She never moves from
  // here; only her pose/expression changes with the player's progress.
  // (Placed via the in-app layout editor.)
  kikoHome: { x: 14.6, y: 85.6 },
  // Hand-tuned dotted trail (waypoints in % of the scene) tracing the painted
  // dirt path. Authored in the in-app layout editor.
  path: [
    { x: 50, y: 86.1 },
    { x: 72.6, y: 84.7 },
    { x: 79.3, y: 79.3 },
    { x: 73.8, y: 72.7 },
    { x: 76.7, y: 65.6 },
    { x: 67.7, y: 71.4 },
    { x: 48.8, y: 68.8 },
    { x: 23.5, y: 67.1 },
    { x: 17.2, y: 54.2 },
    { x: 40, y: 50.9 },
    { x: 50.7, y: 51.6 },
    { x: 71.5, y: 51.5 },
    { x: 78, y: 45.8 },
    { x: 74, y: 35.7 },
    { x: 75.4, y: 23.8 },
    { x: 48.6, y: 23.8 },
    { x: 29.5, y: 26.6 },
    { x: 22.9, y: 35 },
  ],
  nodes: [
    { id: 'n1', type: 'lesson', lessonId: 'l1', label: '1', marker: 'book', place: 'Reading Clearing', pos: { x: 51.2, y: 87.2 } },
    { id: 'n2', type: 'lesson', lessonId: 'l2', label: '2', marker: 'study', place: 'Study Stump', pos: { x: 77.1, y: 66.6 } },
    { id: 'n3', type: 'lesson', lessonId: 'l3', label: '3', marker: 'scroll', place: 'Scroll Rock', pos: { x: 24.3, y: 67.6 } },
    { id: 'n4', type: 'lesson', lessonId: 'l4', label: '4', marker: 'lantern', place: 'Lantern Shrine', pos: { x: 50.2, y: 52 } },
    { id: 'n5', type: 'lesson', lessonId: 'l5', label: '5', marker: 'altar', place: 'Flame Altar', pos: { x: 75.5, y: 24.7 } },
    { id: 'boss', type: 'boss', lessonId: null, label: 'B', marker: 'torii', place: "Guardian's Gate", pos: { x: 23.2, y: 30.5 } },
  ],
}

// Boss definition: the Hiragana Guardian (a friendly wolf spirit).
export const BOSS = {
  name: 'Hiragana Guardian',
  maxHp: 100,
  kikoMaxHp: 100,
  damageToBoss: 20, // 5 correct answers to win
  damageToKiko: 25, // 4 wrong answers to lose
}

// ── Game economy ──
export const PASS_THRESHOLD = 0.7 // 70% to clear a lesson
export const XP_PER_CORRECT = 10
export const XP_LESSON_CLEAR = 50
export const XP_BOSS_CLEAR = 250
export const XP_PER_LEVEL = 200

// Currency — Sakura Petals
export const CURRENCY = { name: 'Sakura Petals' }
export const PETALS_PER_CORRECT = 2
export const PETALS_LESSON_CLEAR = 15
export const PETALS_BOSS_CLEAR = 100
export const FREEZE_COST = 50 // petals to buy one streak freeze
export const STARTING_FREEZES = 2

// Streak milestones drive Kiko's reaction + bonus petals.
export const STREAK_MILESTONES = [
  { at: 3, tier: 'excited', label: 'On a roll!', bonus: 10 },
  { at: 7, tier: 'glow', label: 'Glowing streak!', bonus: 25 },
  { at: 30, tier: 'legend', label: 'Forest Legend!', bonus: 100 },
]

// The highest milestone reached at a given streak value (for HUD/Kiko glow).
export function streakTier(streak) {
  let tier = 'normal'
  for (const m of STREAK_MILESTONES) if (streak >= m.at) tier = m.tier
  return tier
}

// The milestone crossed when going from `prev` to `next` streak, if any.
export function crossedMilestone(prev, next) {
  return STREAK_MILESTONES.find((m) => prev < m.at && next >= m.at) || null
}

// ── Quiz builders ─────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Build a single multiple-choice question for a kana (kana → romaji).
function makeQuestion(kana) {
  const distractors = shuffle(ROMAJI_POOL.filter((r) => r !== kana.romaji)).slice(0, 3)
  const options = shuffle([kana.romaji, ...distractors])
  return {
    id: `${kana.char}-${Math.random().toString(36).slice(2, 7)}`,
    prompt: kana.char,
    answer: kana.romaji,
    options,
  }
}

// Build the quiz for a lesson — one question per kana, in random order so the
// sequence of symbols isn't predictable from one attempt to the next.
export function buildQuiz(lesson) {
  return shuffle(lesson.kana).map(makeQuestion)
}

// Build a mixed boss gauntlet drawing from every kana in the forest.
export function buildBossQuestions(count = 8) {
  const all = LESSONS.flatMap((l) => l.kana)
  const picked = shuffle(all).slice(0, count)
  return picked.map(makeQuestion)
}

// Build a free-practice set. Draws from the player's mastered kana (by char);
// falls back to the first lesson when nothing is mastered yet.
export function buildPracticeQuestions(masteredChars = [], count = 10) {
  const all = LESSONS.flatMap((l) => l.kana)
  let pool = all.filter((k) => masteredChars.includes(k.char))
  if (pool.length === 0) pool = LESSONS[0].kana
  const out = []
  for (let i = 0; i < count; i++) out.push(makeQuestion(pool[i % pool.length]))
  return shuffle(out)
}

// Lookup helpers.
export function getLesson(lessonId) {
  return LESSONS.find((l) => l.id === lessonId) || null
}

export function levelFromXp(xp) {
  return Math.floor(xp / XP_PER_LEVEL) + 1
}

export function xpIntoLevel(xp) {
  return xp % XP_PER_LEVEL
}

// Total kana taught across the forest (for "kana mastered" stats).
export const TOTAL_KANA = LESSONS.reduce((n, l) => n + l.kana.length, 0)

// Contextual guide line for Kiko based on the current node + progress.
export function getKikoLine({ currentNode, completedCount, justCleared, milestone }) {
  if (milestone) return `${milestone.label} +${milestone.bonus} petals!`
  if (justCleared) return 'Nice work! Ready for the next one?'
  if (!currentNode) return 'The whole forest is cleared. You did it!'
  if (currentNode.type === 'boss') return "The Guardian's gate is just ahead — ready?"
  if (completedCount === 0) return "Welcome! Let's learn our first kana together."
  if (completedCount === WORLD.nodes.length - 2) return 'Only one lesson until the boss!'
  return `Let's study at the ${currentNode.place}!`
}
