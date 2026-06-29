# 🦊 Forest of Hiragana

A polished, playable MVP of a **gamified Japanese learning app**. You progress
through a world by clearing lessons, not by flipping flashcards. Guide **Kiko**
the fox through the *Forest of Hiragana*, clear five kana lessons, then face the
**Hiragana Guardian** boss.

Built with **React + framer-motion** (Vite). No backend — progress is saved in
`localStorage`.

## ✨ Features

- **Living world map** — a forest with a winding dirt path. Each stop is a
  *themed place* (📖 book, 🧠 study, 📜 scroll, 🏮 lantern, 🔥 altar, ⛩️ torii
  boss gate) whose marker tells you its function before you tap it. Kiko stands
  in a clearing **beside** the active node (never on it) with a contextual
  speech bubble, and the torii boss destination is always in view.
- **Node progression** — `locked` (a distinct sealed asset) → `current`
  (glowing, with an info panel) → `completed ✅`. Clearing a node unlocks the next.
- **Lessons** — kana preview, example words, and a multiple-choice quiz with live feedback.
- **Boss fight** — Kiko HP vs. Boss HP; correct answers damage the boss, wrong answers hurt Kiko.
- **Progression systems** — XP & levels, a streak with **milestone reactions**
  (3 / 7 / 30), and a **Sakura Petals 🌸** currency earned from lessons, boss
  wins and streaks — all in a fantasy top HUD.
- **Five screens** via a persistent bottom nav: 🗺️ Map · 📚 Learn · 🎯 Practice
  (free drill) · 📈 Progress (full stats) · ⚙️ Settings (audio / notifications /
  accessibility / account scaffold / reset).
- **Animated characters** — Kiko (idle, happy, sad, excited, attack, hurt,
  studying, jumping, victory, boss-prep) and the boss both follow a strict
  `idle → action → idle` loop and never get stuck in a non-idle pose. Honors the
  *Reduce motion* accessibility setting.

## 🚀 Getting started

```bash
npm install
npm run dev      # start the dev server (Vite prints a local URL)
npm run build    # production build into /dist
npm run preview  # preview the production build
```

Open the printed URL (usually http://localhost:5173) in your browser.

## 🎮 How to play

1. On the map, tap the **glowing current node**.
2. Review the kana + example words, then take the quiz.
3. Score **70%+** to clear the lesson → the node turns ✅, the next unlocks, XP and your streak go up. Miss it and your streak resets.
4. Clear all five lessons to unlock the **Hiragana Guardian** boss (the torii gate). Beat it to complete the world.
5. Use the bottom nav to browse **Learn**, free-drill in **Practice**, track stats in **Progress**, or wipe your save under **Settings → Reset progress**.

## 🎨 Art assets

All art was generated with **Higgsfield (`nano_banana_pro`)** from the project's
reference images (Kiko, the forest, and the node style), with transparent
cutouts produced via background removal. The boss — the Hiragana Guardian, a
friendly wolf spirit — was designed to match Kiko's exact style.

Asset URLs live in a single registry, [`src/assets/assetMap.js`](src/assets/assetMap.js):

- **Characters & node** — transparent PNGs.
- **Forest** — a full background image.
- Every entry has a **committed local SVG fallback** under `public/assets/…`
  that the `<img>` swaps to automatically if the CDN is ever unreachable, so the
  game always renders.

To self-host the art instead of using the CDN, download each URL into
`public/assets/…` and point the entries in `assetMap.js` at those local paths.

## 🗂 Project structure

```
src/
  App.jsx                  # tab shell (map/learn/practice/progress/settings) + lesson/boss overlays
  data/gameData.js         # kana content, world layout, quiz builders, economy, dialogue
  state/
    useGameState.js        # progress, XP, petals, streak, stats, settings, account (persisted)
    useTransientState.js   # the idle → action → idle animation driver
  assets/assetMap.js       # central image registry (Higgsfield URLs + local fallbacks)
  components/
    TopHUD.jsx  BottomNav.jsx
    WorldMap.jsx  LessonNode.jsx  DialogueBubble.jsx
    LearnScreen.jsx  PracticeScreen.jsx  ProgressPage.jsx  SettingsPage.jsx
    LessonScreen.jsx  QuizCard.jsx  ResultPanel.jsx
    BossFight.jsx  KikoCharacter.jsx  BossCharacter.jsx
public/assets/             # local SVG fallbacks (kiko / boss / world / world/markers)
```
