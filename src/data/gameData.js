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

// World structure: ordered nodes laid out on the map (positions are % of the map).
export const WORLD = {
  id: 'forest',
  name: 'Forest of Hiragana',
  nodes: [
    { id: 'n1', type: 'lesson', lessonId: 'l1', label: '1', pos: { x: 22, y: 82 } },
    { id: 'n2', type: 'lesson', lessonId: 'l2', label: '2', pos: { x: 50, y: 70 } },
    { id: 'n3', type: 'lesson', lessonId: 'l3', label: '3', pos: { x: 28, y: 55 } },
    { id: 'n4', type: 'lesson', lessonId: 'l4', label: '4', pos: { x: 56, y: 41 } },
    { id: 'n5', type: 'lesson', lessonId: 'l5', label: '5', pos: { x: 34, y: 27 } },
    { id: 'boss', type: 'boss', lessonId: null, label: '★', pos: { x: 64, y: 13 } },
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

// Build the quiz for a lesson — one question per kana introduced.
export function buildQuiz(lesson) {
  return lesson.kana.map(makeQuestion)
}

// Build a mixed boss gauntlet drawing from every kana in the forest.
export function buildBossQuestions(count = 8) {
  const all = LESSONS.flatMap((l) => l.kana)
  const picked = shuffle(all).slice(0, count)
  return picked.map(makeQuestion)
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
