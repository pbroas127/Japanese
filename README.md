# 🦊 Forest of Hiragana

A polished, playable MVP of a **gamified Japanese learning app**. You progress
through a world by clearing lessons, not by flipping flashcards. Guide **Kiko**
the fox through the *Forest of Hiragana*, clear five kana lessons, then face the
**Hiragana Guardian** boss.

Built with **React + framer-motion** (Vite). No backend — progress is saved in
`localStorage`.

## ✨ Features

- **World map** with a forest background, a winding trail, 5 lesson nodes + 1 boss node.
- **Node progression** — nodes are `locked` → `current` → `completed ✅`. Clearing a node unlocks the next.
- **Lessons** — kana preview, example words, and a multiple-choice quiz with live feedback.
- **Boss fight** — Kiko HP vs. Boss HP; correct answers damage the boss, wrong answers hurt Kiko.
- **XP, levels & streaks** shown in a persistent HUD.
- **Animated characters** — Kiko and the boss both follow a strict
  `idle → action → idle` animation loop (happy / sad / excited / attack / hurt)
  and never get stuck in a non-idle pose.

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
4. Clear all five lessons to unlock the **Hiragana Guardian** boss. Beat it to complete the world.
5. *Reset progress* (bottom-right) wipes your save.

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
  App.jsx                  # screen routing (map / lesson / boss)
  data/gameData.js         # hiragana content, world layout, quiz builders, economy
  state/
    useGameState.js        # progress, XP, streak, node status (persisted)
    useTransientState.js    # the idle → action → idle animation driver
  assets/assetMap.js       # central image registry (+ fallbacks)
  components/
    WorldMap.jsx  LessonNode.jsx  LessonScreen.jsx  QuizCard.jsx
    BossFight.jsx  KikoCharacter.jsx  BossCharacter.jsx
    ProgressHUD.jsx  ResultPanel.jsx
public/assets/             # local SVG fallbacks (kiko / boss / world)
```
