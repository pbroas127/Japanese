// ──────────────────────────────────────────────────────────────────────────
//  Forest of Hiragana — hardcoded game data & content
//  Single world MVP. All hiragana content lives here.
// ──────────────────────────────────────────────────────────────────────────

import { VOCAB } from './vocab'

// Full romaji pool used to build quiz distractors.
export const ROMAJI_POOL = [
  'a', 'i', 'u', 'e', 'o',
  'ka', 'ki', 'ku', 'ke', 'ko',
  'sa', 'shi', 'su', 'se', 'so',
  'ta', 'chi', 'tsu', 'te', 'to',
  'na', 'ni', 'nu', 'ne', 'no',
  'ha', 'hi', 'fu', 'he', 'ho',
  'ma', 'mi', 'mu', 'me', 'mo',
  'ya', 'yu', 'yo',
  'ra', 'ri', 'ru', 're', 'ro',
  'wa', 'wo', 'n',
  'ga', 'gi', 'gu', 'ge', 'go',
  'za', 'ji', 'zu', 'ze', 'zo',
  'da', 'de', 'do',
  'ba', 'bi', 'bu', 'be', 'bo',
  'pa', 'pi', 'pu', 'pe', 'po',
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
      { kana: 'いいえ', romaji: 'iie', meaning: 'no' },
      { kana: 'あい', romaji: 'ai', meaning: 'love' },
      { kana: 'いえ', romaji: 'ie', meaning: 'house' },
      { kana: 'うえ', romaji: 'ue', meaning: 'up / above' },
      { kana: 'あお', romaji: 'ao', meaning: 'blue' },
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
      { kana: 'いく', romaji: 'iku', meaning: 'to go' },
      { kana: 'かく', romaji: 'kaku', meaning: 'to write' },
      { kana: 'きく', romaji: 'kiku', meaning: 'to hear / ask' },
      { kana: 'かう', romaji: 'kau', meaning: 'to buy' },
      { kana: 'ここ', romaji: 'koko', meaning: 'here' },
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
      { kana: 'すき', romaji: 'suki', meaning: 'to like' },
      { kana: 'そこ', romaji: 'soko', meaning: 'there' },
      { kana: 'あそこ', romaji: 'asoko', meaning: 'over there' },
      { kana: 'せかい', romaji: 'sekai', meaning: 'world' },
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
      { kana: 'いつ', romaji: 'itsu', meaning: 'when' },
      { kana: 'たかい', romaji: 'takai', meaning: 'tall / expensive' },
      { kana: 'あつい', romaji: 'atsui', meaning: 'hot' },
      { kana: 'とおい', romaji: 'tooi', meaning: 'far' },
      { kana: 'ちかい', romaji: 'chikai', meaning: 'near' },
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
      { kana: 'おかね', romaji: 'okane', meaning: 'money' },
      { kana: 'たのしい', romaji: 'tanoshii', meaning: 'fun' },
      { kana: 'さかな', romaji: 'sakana', meaning: 'fish' },
      { kana: 'ねこ', romaji: 'neko', meaning: 'cat' },
    ],
  },
  {
    id: 'l6',
    title: 'The H Hill',
    subtitle: 'は ひ ふ へ ほ',
    accent: '#E8557A',
    kana: [
      { char: 'は', romaji: 'ha' },
      { char: 'ひ', romaji: 'hi' },
      { char: 'ふ', romaji: 'fu' },
      { char: 'へ', romaji: 'he' },
      { char: 'ほ', romaji: 'ho' },
    ],
    examples: [
      { kana: 'はい', romaji: 'hai', meaning: 'yes' },
      { kana: 'はな', romaji: 'hana', meaning: 'flower / nose' },
      { kana: 'ふく', romaji: 'fuku', meaning: 'clothes' },
      { kana: 'ほし', romaji: 'hoshi', meaning: 'star' },
      { kana: 'はこ', romaji: 'hako', meaning: 'box' },
    ],
  },
  {
    id: 'l7',
    title: 'The M Marsh',
    subtitle: 'ま み む め も',
    accent: '#4F9BD0',
    kana: [
      { char: 'ま', romaji: 'ma' },
      { char: 'み', romaji: 'mi' },
      { char: 'む', romaji: 'mu' },
      { char: 'め', romaji: 'me' },
      { char: 'も', romaji: 'mo' },
    ],
    examples: [
      { kana: 'なまえ', romaji: 'namae', meaning: 'name' },
      { kana: 'みせ', romaji: 'mise', meaning: 'store' },
      { kana: 'まち', romaji: 'machi', meaning: 'town' },
      { kana: 'め', romaji: 'me', meaning: 'eye' },
      { kana: 'みみ', romaji: 'mimi', meaning: 'ear' },
    ],
  },
  {
    id: 'l8',
    title: 'The Y Valley',
    subtitle: 'や ゆ よ',
    accent: '#5FBF7A',
    kana: [
      { char: 'や', romaji: 'ya' },
      { char: 'ゆ', romaji: 'yu' },
      { char: 'よ', romaji: 'yo' },
    ],
    examples: [
      { kana: 'よむ', romaji: 'yomu', meaning: 'to read' },
      { kana: 'やま', romaji: 'yama', meaning: 'mountain' },
      { kana: 'ゆき', romaji: 'yuki', meaning: 'snow' },
      { kana: 'やすい', romaji: 'yasui', meaning: 'cheap' },
      { kana: 'ゆめ', romaji: 'yume', meaning: 'dream' },
    ],
  },
  {
    id: 'l9',
    title: 'The R River',
    subtitle: 'ら り る れ ろ',
    accent: '#9B7BD4',
    kana: [
      { char: 'ら', romaji: 'ra' },
      { char: 'り', romaji: 'ri' },
      { char: 'る', romaji: 'ru' },
      { char: 'れ', romaji: 're' },
      { char: 'ろ', romaji: 'ro' },
    ],
    examples: [
      { kana: 'する', romaji: 'suru', meaning: 'to do' },
      { kana: 'みる', romaji: 'miru', meaning: 'to see' },
      { kana: 'これ', romaji: 'kore', meaning: 'this' },
      { kana: 'それ', romaji: 'sore', meaning: 'that' },
      { kana: 'くる', romaji: 'kuru', meaning: 'to come' },
    ],
  },
  {
    id: 'l10',
    title: 'The W Woods',
    subtitle: 'わ を ん',
    accent: '#E8923D',
    kana: [
      { char: 'わ', romaji: 'wa' },
      { char: 'を', romaji: 'wo' },
      { char: 'ん', romaji: 'n' },
    ],
    examples: [
      { kana: 'わたし', romaji: 'watashi', meaning: 'I / me' },
      { kana: 'わかる', romaji: 'wakaru', meaning: 'to understand' },
      { kana: 'ほん', romaji: 'hon', meaning: 'book' },
      { kana: 'にほん', romaji: 'nihon', meaning: 'Japan' },
      { kana: 'えん', romaji: 'en', meaning: 'yen' },
    ],
  },
  {
    id: 'l11',
    title: 'The G Glade',
    subtitle: 'が ぎ ぐ げ ご',
    accent: '#5F9DE8',
    kana: [
      { char: 'が', romaji: 'ga' },
      { char: 'ぎ', romaji: 'gi' },
      { char: 'ぐ', romaji: 'gu' },
      { char: 'げ', romaji: 'ge' },
      { char: 'ご', romaji: 'go' },
    ],
    examples: [
      { kana: 'かがみ', romaji: 'kagami', meaning: 'mirror' },
      { kana: 'かぎ', romaji: 'kagi', meaning: 'key' },
      { kana: 'げんき', romaji: 'genki', meaning: 'healthy / fine' },
      { kana: 'えいご', romaji: 'eigo', meaning: 'English (language)' },
      { kana: 'ごご', romaji: 'gogo', meaning: 'afternoon / PM' },
    ],
  },
  {
    id: 'l12',
    title: 'The Z Swamp',
    subtitle: 'ざ じ ず ぜ ぞ',
    accent: '#5FBFA8',
    kana: [
      { char: 'ざ', romaji: 'za' },
      { char: 'じ', romaji: 'ji' },
      { char: 'ず', romaji: 'zu' },
      { char: 'ぜ', romaji: 'ze' },
      { char: 'ぞ', romaji: 'zo' },
    ],
    examples: [
      { kana: 'みず', romaji: 'mizu', meaning: 'water' },
      { kana: 'かぜ', romaji: 'kaze', meaning: 'wind / a cold' },
      { kana: 'ちず', romaji: 'chizu', meaning: 'map' },
      { kana: 'かず', romaji: 'kazu', meaning: 'number' },
      { kana: 'かぞく', romaji: 'kazoku', meaning: 'family' },
    ],
  },
  {
    id: 'l13',
    title: 'The D Delta',
    subtitle: 'だ で ど',
    accent: '#E88F5F',
    // ぢ and づ are historically merged with じ and ず in modern pronunciation
    // and rarely appear outside compound words — skipped to keep every
    // reverse (romaji → kana) question unambiguous.
    kana: [
      { char: 'だ', romaji: 'da' },
      { char: 'で', romaji: 'de' },
      { char: 'ど', romaji: 'do' },
    ],
    examples: [
      { kana: 'だれ', romaji: 'dare', meaning: 'who' },
      { kana: 'どこ', romaji: 'doko', meaning: 'where' },
      { kana: 'でも', romaji: 'demo', meaning: 'but / however' },
      { kana: 'まど', romaji: 'mado', meaning: 'window' },
      { kana: 'どうぞ', romaji: 'douzo', meaning: 'here you go / please' },
    ],
  },
  {
    id: 'l14',
    title: 'The B Bluff',
    subtitle: 'ば び ぶ べ ぼ',
    accent: '#C9689B',
    kana: [
      { char: 'ば', romaji: 'ba' },
      { char: 'び', romaji: 'bi' },
      { char: 'ぶ', romaji: 'bu' },
      { char: 'べ', romaji: 'be' },
      { char: 'ぼ', romaji: 'bo' },
    ],
    examples: [
      { kana: 'たべる', romaji: 'taberu', meaning: 'to eat' },
      { kana: 'あそぶ', romaji: 'asobu', meaning: 'to play' },
      { kana: 'よぶ', romaji: 'yobu', meaning: 'to call' },
      { kana: 'ぼく', romaji: 'boku', meaning: 'I (used by males)' },
      { kana: 'かばん', romaji: 'kaban', meaning: 'bag' },
    ],
  },
  {
    id: 'l15',
    title: 'The P Peak',
    subtitle: 'ぱ ぴ ぷ ぺ ぽ',
    accent: '#D4A03D',
    kana: [
      { char: 'ぱ', romaji: 'pa' },
      { char: 'ぴ', romaji: 'pi' },
      { char: 'ぷ', romaji: 'pu' },
      { char: 'ぺ', romaji: 'pe' },
      { char: 'ぽ', romaji: 'po' },
    ],
    examples: [
      { kana: 'えんぴつ', romaji: 'enpitsu', meaning: 'pencil' },
      { kana: 'さんぽ', romaji: 'sanpo', meaning: 'a walk / stroll' },
      { kana: 'かんぱい', romaji: 'kanpai', meaning: 'cheers!' },
      { kana: 'ぽかぽか', romaji: 'pokapoka', meaning: 'warm & cozy' },
      { kana: 'てんぷら', romaji: 'tenpura', meaning: 'tempura' },
    ],
  },
]

// Short memory hooks shown on the Learn-stage flashcards. Keep them punchy —
// a mnemonic only needs to make the shape + sound stick for a beat.
export const KANA_TIPS = {
  あ: 'An "A" with an apple stuck on it — a!',
  い: 'Two leaning reeds — "ii" side by side',
  う: 'A drooping vine hook — u',
  え: 'An energetic bird with a tail — e',
  お: 'An "o" doing a little cartwheel',
  か: 'A flag on a pole — "ka" for kite',
  き: 'It literally looks like a key — ki',
  く: 'A bird\'s beak going "ku-ku"',
  け: 'A keg tipped on its side — ke',
  こ: 'Two pebbles stacked — "co-co"',
  さ: 'A hook reaching down — sa',
  し: 'A long fishing hook — "she" caught one',
  す: 'A swirl of soup steam — su',
  せ: 'A pitchfork — "say" aah',
  そ: 'A zigzag of thread — so',
  た: 'A table with legs — ta',
  ち: 'A cheery backwards 5 — chi',
  つ: 'A curling tsunami wave — tsu',
  て: 'A bent telephone pole — te',
  と: 'A toe with a splinter — to',
  な: 'A knotted rope — na',
  に: 'Two knitting needles — ni',
  ぬ: 'Tangled noodles — nu',
  ね: 'A cat with a curly tail — ne',
  の: 'A "no entry" swirl — no',
  は: 'A person beside a box — ha',
  ひ: 'A wide smile — "hee" hee',
  ふ: 'Mt. Fuji puffing steam — fu',
  へ: 'A gentle hill slope — he',
  ほ: 'は with an extra mast — ho',
  ま: 'A swirl over two lines — ma',
  み: 'A curvy number 21 — mi',
  む: 'A cow mooing "muu" — mu',
  め: 'A looped noodle knot — me',
  も: 'A fish hook with a crossbar — mo',
  や: 'A yacht sail — ya',
  ゆ: 'A fish swimming — yu',
  よ: 'A hook with a crossbar — yo',
  ら: 'A person sitting up — ra',
  り: 'Two tall reeds — ri',
  る: 'A curl with a loop — ru',
  れ: 'Like る but flicked open — re',
  ろ: 'る without the loop — ro',
  わ: 'A swan gliding — wa',
  を: 'A fancy お — "wo" (the object particle)',
  ん: 'A single squiggle — n',
  が: 'か buzzing with two little marks (゛) — ga',
  ぎ: 'き with a buzz added — gi',
  ぐ: 'く humming louder — gu',
  げ: 'け getting a voiced buzz — ge',
  ご: 'こ with two dashes, deeper — go',
  ざ: 'さ with a buzz — za',
  じ: 'し with a buzz — ji',
  ず: 'す with a buzz — zu',
  ぜ: 'せ with a buzz — ze',
  ぞ: 'そ with a buzz — zo',
  だ: 'た with a buzz — da',
  で: 'て with a buzz — de',
  ど: 'と with a buzz — do',
  ば: 'は with a buzz — ba',
  び: 'ひ with a buzz — bi',
  ぶ: 'ふ with a buzz — bu',
  べ: 'へ with a buzz — be',
  ぼ: 'ほ with a buzz — bo',
  ぱ: 'は with a little pop (゜) on top — pa',
  ぴ: 'ひ with a pop — pi',
  ぷ: 'ふ with a pop — pu',
  ぺ: 'へ with a pop — pe',
  ぽ: 'ほ with a pop — po',
}

// World structure: an ordered list of worlds, each a vertically-scrollable map.
// Positions are % of the world scene (locked to the art's aspect ratio). Worlds
// unlock in order — a world opens once the previous world's boss is cleared.
//
// PLACEHOLDER NOTE: every world currently reuses the same background art, dotted
// path, and node coordinates. Real per-world backgrounds + hand-placed nodes
// come later (via the layout editor). The order/gating/content is final.
const PLACEHOLDER_PATH = [
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
]
// Shared placeholder node coordinates (5 lessons + a boss) reused per world.
const PLACEHOLDER_SLOTS = [
  { marker: 'book', pos: { x: 51.2, y: 87.2 } },
  { marker: 'study', pos: { x: 77.1, y: 66.6 } },
  { marker: 'scroll', pos: { x: 24.3, y: 67.6 } },
  { marker: 'lantern', pos: { x: 50.2, y: 52 } },
  { marker: 'altar', pos: { x: 75.5, y: 24.7 } },
  { marker: 'torii', pos: { x: 23.2, y: 30.5 } },
]
// Build a world's nodes from a prefix + five lesson ids + place names.
// Every world cycles through the same 6 marker TYPES (book/study/scroll/
// lantern/altar/torii) in the same slot order — each world just has its own
// re-skinned art per type (see NODE_ASSETS, nested by world id).
function buildNodes(prefix, lessonIds, places) {
  const nodes = lessonIds.map((lessonId, i) => ({
    id: `${prefix}n${i + 1}`,
    type: 'lesson',
    lessonId,
    label: `${i + 1}`,
    marker: PLACEHOLDER_SLOTS[i].marker,
    place: places[i],
    pos: PLACEHOLDER_SLOTS[i].pos,
  }))
  nodes.push({
    id: `${prefix}boss`,
    type: 'boss',
    lessonId: null,
    label: 'B',
    marker: PLACEHOLDER_SLOTS[5].marker,
    place: places[5],
    pos: PLACEHOLDER_SLOTS[5].pos,
  })
  return nodes
}

export const WORLDS = [
  {
    id: 'forest',
    name: 'Forest of First Sounds',
    art: { w: 1536, h: 2752 },
    kikoHome: { x: 24.7, y: 17.5 },
    path: PLACEHOLDER_PATH,
    bossName: 'Hiragana Guardian',
    nodes: [
      { id: 'n1', type: 'lesson', lessonId: 'l1', label: '1', marker: 'book', place: 'Reading Clearing', pos: { x: 51.2, y: 87.2 } },
      { id: 'n2', type: 'lesson', lessonId: 'l2', label: '2', marker: 'study', place: 'Study Stump', pos: { x: 77.1, y: 66.6 } },
      { id: 'n3', type: 'lesson', lessonId: 'l3', label: '3', marker: 'scroll', place: 'Scroll Rock', pos: { x: 24.3, y: 67.6 } },
      { id: 'n4', type: 'lesson', lessonId: 'l4', label: '4', marker: 'lantern', place: 'Lantern Shrine', pos: { x: 50.2, y: 52 } },
      { id: 'n5', type: 'lesson', lessonId: 'l5', label: '5', marker: 'altar', place: 'Flame Altar', pos: { x: 75.5, y: 24.7 } },
      { id: 'boss', type: 'boss', lessonId: null, label: 'B', marker: 'torii', place: "Guardian's Gate", pos: { x: 23.2, y: 30.5 } },
    ],
  },
  {
    id: 'meadow',
    name: 'Meadow of New Voices',
    art: { w: 1536, h: 2752 },
    kikoHome: { x: 24.7, y: 17.5 },
    path: PLACEHOLDER_PATH,
    bossName: 'Echo Spirit',
    nodes: buildNodes(
      'w2',
      ['l6', 'l7', 'l8', 'l9', 'l10'],
      ['Hill Path', 'Marsh Hollow', 'Valley Rise', 'River Bend', 'Wood Gate', "Spirit's Arch"],
    ),
  },
  {
    id: 'canyon',
    name: 'Canyon of Bold Voices',
    art: { w: 1536, h: 2752 },
    kikoHome: { x: 24.7, y: 17.5 },
    path: PLACEHOLDER_PATH,
    bossName: 'Thunder Oni',
    nodes: buildNodes(
      'w3',
      ['l11', 'l12', 'l13', 'l14', 'l15'],
      ['Glade Overlook', 'Swamp Crossing', 'Delta Flats', 'Bluff Edge', 'Peak Trail', "Oni's Drum"],
    ),
  },
]

// Flat lookups across every world.
export const ALL_NODES = WORLDS.flatMap((w) => w.nodes.map((n) => ({ ...n, worldId: w.id })))
export const TOTAL_NODES = ALL_NODES.length
export function getNode(nodeId) {
  return ALL_NODES.find((n) => n.id === nodeId) || null
}
export function getWorldOf(nodeId) {
  return WORLDS.find((w) => w.nodes.some((n) => n.id === nodeId)) || null
}
export function worldBossId(world) {
  return world.nodes.find((n) => n.type === 'boss').id
}
// A world is unlocked when the previous world's boss is in `completed`.
export function worldUnlocked(worldId, completed) {
  const idx = WORLDS.findIndex((w) => w.id === worldId)
  if (idx <= 0) return true
  return completed.includes(worldBossId(WORLDS[idx - 1]))
}

// ── Dev tool: jump to any node ──────────────────────────────────────────────
// Every node up to (not including) the target is marked complete, so the
// target becomes the new "current" node. Used by the Settings dev shortcut to
// preview any level without grinding the ones before it.
export function jumpToNode(nodeId) {
  const idx = ALL_NODES.findIndex((n) => n.id === nodeId)
  if (idx < 0) return { completed: [], progress: {}, kana: [] }
  const before = ALL_NODES.slice(0, idx)
  const completed = before.map((n) => n.id)
  const progress = {}
  before.forEach((n) => {
    progress[n.id] = { stagesDone: 3, quizPassed: true }
  })
  const kana = [
    ...new Set(
      before
        .filter((n) => n.lessonId)
        .flatMap((n) => getLesson(n.lessonId).kana.map((k) => k.char)),
    ),
  ]
  return { completed, progress, kana }
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
export const PETALS_PER_STAGE = 3 // small reward for finishing Learn / Use
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

// ── Stage step builders ───────────────────────────────────────────────────
// Each lesson stage is a list of "steps". Two step shapes:
//   { type:'flash',  char, romaji, tip, word }     — a card to study
//   { type:'choice', prompt, answer, options, hint } — a multiple-choice item
// Stages 1 & 2 mix study cards with light recall; stage 3 is all recall.

const ALL_KANA = LESSONS.flatMap((l) => l.kana)
const ALL_WORDS = LESSONS.flatMap((l) => l.examples)
let _stepId = 0
const stepId = (p) => `${p}-${(_stepId++).toString(36)}`

function flashStep(char, romaji, tip, word = false) {
  return { type: 'flash', id: stepId('f'), char, romaji, tip, word }
}
function choiceStep(prompt, answer, options, hint, item) {
  return { type: 'choice', id: stepId('c'), prompt, answer, options: shuffle(options), hint, item }
}

// `item` is the SRS key the question tests: `k:<kana>` or `w:<word>`.
// kana → romaji (pick the sound)
function qKanaToRomaji(k) {
  const distractors = shuffle(ROMAJI_POOL.filter((r) => r !== k.romaji)).slice(0, 3)
  return choiceStep(k.char, k.romaji, [k.romaji, ...distractors], 'Which sound is this?', `k:${k.char}`)
}
// romaji → kana (pick the symbol)
function qRomajiToKana(k) {
  const distractors = shuffle(ALL_KANA.filter((x) => x.char !== k.char)).slice(0, 3).map((x) => x.char)
  return choiceStep(k.romaji, k.char, [k.char, ...distractors], 'Tap the matching kana', `k:${k.char}`)
}
// meaning → word
function qMeaningToWord(w) {
  const distractors = shuffle(ALL_WORDS.filter((x) => x.meaning !== w.meaning)).slice(0, 3).map((x) => x.kana)
  return choiceStep(w.meaning, w.kana, [w.kana, ...distractors], 'Which word means this?', `w:${w.kana}`)
}
// word → meaning
function qWordToMeaning(w) {
  const distractors = shuffle(ALL_WORDS.filter((x) => x.kana !== w.kana)).slice(0, 3).map((x) => x.meaning)
  return choiceStep(w.kana, w.meaning, [w.meaning, ...distractors], 'What does this word mean?', `w:${w.kana}`)
}

// Stage 1 · Learn — meet each kana on a card, then recognise the sound.
export function buildLearnSteps(lesson) {
  const cards = lesson.kana.map((k) => flashStep(k.char, k.romaji, KANA_TIPS[k.char]))
  const recall = shuffle(lesson.kana.map(qKanaToRomaji))
  return [...cards, ...recall]
}

// Stage 2 · Use — study real words, then match words ↔ meanings both ways.
export function buildUseSteps(lesson) {
  const cards = lesson.examples.map((w) => flashStep(w.kana, w.romaji, w.meaning, true))
  const recall = shuffle([...lesson.examples.map(qMeaningToWord), ...lesson.examples.map(qWordToMeaning)])
  return [...cards, ...recall]
}

// Stage 3 · Quiz — graded mix of everything: both kana directions + word meaning.
export function buildQuizSteps(lesson) {
  const kana = lesson.kana.map(qKanaToRomaji)
  const reverse = shuffle(lesson.kana).slice(0, 3).map(qRomajiToKana)
  const words = lesson.examples.map(qWordToMeaning)
  return shuffle([...kana, ...reverse, ...words])
}

// ── Vocabulary (frequency pack) ──────────────────────────────────────────────
// Words unlock ~20 per level (survival set first), so practice/review grows
// with the player instead of dumping all 200 at once.
export function vocabUnlockedFor(level) {
  return Math.min(VOCAB.length, Math.max(1, level) * 20)
}
function unlockedVocab(vocabUnlocked) {
  return VOCAB.slice(0, vocabUnlocked > 0 ? vocabUnlocked : VOCAB.length)
}

// Vocab question builders (item key `v:<id>`). Distractors stay readable —
// we never ask the learner to pick an unreadable kanji, only meanings/readings.
function qVocabRecognise(v) {
  // word → meaning (reading shown as a hint)
  const distractors = shuffle(VOCAB.filter((x) => x.en !== v.en)).slice(0, 3).map((x) => x.en)
  return choiceStep(v.jp, v.en, [v.en, ...distractors], `${v.romaji} — what does it mean?`, `v:${v.id}`)
}
function qVocabReading(v) {
  // meaning → reading
  const distractors = shuffle(VOCAB.filter((x) => x.romaji !== v.romaji)).slice(0, 3).map((x) => x.romaji)
  return choiceStep(v.en, v.romaji, [v.romaji, ...distractors], 'Pick the reading', `v:${v.id}`)
}

// ── Practice decks ─────────────────────────────────────────────────────────
// Kana practice draws from what the player has mastered (falls back to the
// starter set so a brand-new player always has something to drill). Word
// practice draws from the unlocked vocabulary pack.
function masteredKana(masteredChars) {
  const pool = ALL_KANA.filter((k) => masteredChars.includes(k.char))
  return pool.length ? pool : LESSONS[0].kana
}
function masteredWords(masteredChars) {
  const pool = ALL_WORDS.filter((w) => [...w.kana].every((ch) => masteredChars.includes(ch)))
  return pool.length ? pool : LESSONS[0].examples
}

// Steps for the Flashcards and Multiple-choice drills (runs through StageRunner).
export function buildPracticeSteps(masteredChars, deck = 'kana', drill = 'choice', count = 10, vocabUnlocked = 0) {
  if (deck === 'words') {
    const pool = shuffle(unlockedVocab(vocabUnlocked)).slice(0, count)
    if (drill === 'flash') return pool.map((v) => flashStep(v.jp, v.romaji, v.en, true))
    return pool.map((v, i) => (i % 2 ? qVocabReading(v) : qVocabRecognise(v)))
  }
  const pool = shuffle(masteredKana(masteredChars)).slice(0, count)
  if (drill === 'flash') return pool.map((k) => flashStep(k.char, k.romaji, KANA_TIPS[k.char]))
  return pool.map((k, i) => (i % 2 ? qRomajiToKana(k) : qKanaToRomaji(k)))
}

// Pairs for the Match-up drill: { id, left, right }.
export function buildMatchPairs(masteredChars, deck = 'kana', count = 5, vocabUnlocked = 0) {
  if (deck === 'words') {
    return shuffle(unlockedVocab(vocabUnlocked)).slice(0, count).map((v) => ({ id: `v:${v.id}`, left: v.jp, right: v.en }))
  }
  return shuffle(masteredKana(masteredChars)).slice(0, count).map((k) => ({ id: k.char, left: k.char, right: k.romaji }))
}

// Items for the Typing drill: { id, prompt, answer } (answer is romaji).
export function buildTypeDeck(masteredChars, deck = 'kana', count = 8, vocabUnlocked = 0) {
  if (deck === 'words') {
    return shuffle(unlockedVocab(vocabUnlocked)).slice(0, count).map((v) => ({ id: `v:${v.id}`, prompt: v.jp, answer: v.romaji, hint: v.en }))
  }
  return shuffle(masteredKana(masteredChars)).slice(0, count).map((k) => ({ id: k.char, prompt: k.char, answer: k.romaji }))
}

// ── Spaced-repetition review ────────────────────────────────────────────────
// Review covers mastered kana, the hiragana words from cleared lessons, and the
// unlocked vocabulary — so a brand-new player has little/nothing "due" yet.
function reviewItems(masteredChars, vocabUnlocked = 0) {
  const kana = ALL_KANA.filter((k) => masteredChars.includes(k.char)).map((k) => ({ key: `k:${k.char}`, kind: 'kana', data: k }))
  const words = ALL_WORDS.filter((w) => [...w.kana].every((ch) => masteredChars.includes(ch))).map((w) => ({ key: `w:${w.kana}`, kind: 'word', data: w }))
  const vocab = unlockedVocab(vocabUnlocked).map((v) => ({ key: `v:${v.id}`, kind: 'vocab', data: v }))
  return [...kana, ...words, ...vocab]
}

function reviewQuestion(it) {
  if (it.kind === 'kana') return Math.random() < 0.5 ? qKanaToRomaji(it.data) : qRomajiToKana(it.data)
  if (it.kind === 'word') return Math.random() < 0.5 ? qWordToMeaning(it.data) : qMeaningToWord(it.data)
  return Math.random() < 0.5 ? qVocabRecognise(it.data) : qVocabReading(it.data)
}

// "Due" means seen before and now past its review date — i.e. genuine review
// load. Never-seen items are "new", not due, so they don't flood the badge.
export function countDueItems(srs = {}, masteredChars = [], vocabUnlocked = 0) {
  const now = Date.now()
  return reviewItems(masteredChars, vocabUnlocked).filter((it) => {
    const card = srs[it.key]
    return card && card.due <= now
  }).length
}

// Build a review session, ordered: most-overdue (seen) first, then new items,
// then upcoming ones to top up to `count`. Each becomes a multiple-choice step.
export function buildReviewSteps(srs = {}, masteredChars = [], count = 12, vocabUnlocked = 0) {
  const now = Date.now()
  const all = reviewItems(masteredChars, vocabUnlocked)
  const overdue = all
    .filter((it) => srs[it.key] && srs[it.key].due <= now)
    .sort((a, b) => srs[a.key].due - srs[b.key].due) // longest overdue first
  const fresh = shuffle(all.filter((it) => !srs[it.key]))
  const upcoming = all
    .filter((it) => srs[it.key] && srs[it.key].due > now)
    .sort((a, b) => srs[a.key].due - srs[b.key].due)
  return [...overdue, ...fresh, ...upcoming].slice(0, count).map(reviewQuestion)
}

// Build a mixed boss gauntlet drawing from the kana of one world's lessons.
export function buildBossQuestions(worldId, count = 12) {
  const world = WORLDS.find((w) => w.id === worldId) || WORLDS[0]
  const lessons = world.nodes.filter((n) => n.lessonId).map((n) => getLesson(n.lessonId)).filter(Boolean)
  const all = lessons.flatMap((l) => l.kana)
  return shuffle(all).slice(0, count).map(makeQuestion)
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
  if (!currentNode) return 'Every world is cleared. You did it!'
  if (currentNode.type === 'boss') return 'The guardian is just ahead — ready?'
  if (completedCount === 0) return "Welcome! Let's learn our first kana together."
  const world = getWorldOf(currentNode.id)
  if (world && completedCount === world.nodes.length - 2) return 'Only one lesson until the boss!'
  return `Let's study at the ${currentNode.place}!`
}
