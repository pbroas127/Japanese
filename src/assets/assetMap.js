// ──────────────────────────────────────────────────────────────────────────
//  Central asset registry.
//
//  Real assets generated with Higgsfield (nano_banana_pro) from the user's
//  reference images, with transparent cutouts via background removal.
//  Characters, node markers → transparent PNG. Forest → full background.
//  Every entry has a committed local SVG fallback (swapped in on <img> error).
// ──────────────────────────────────────────────────────────────────────────

const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_3DIHRL4hfIamgJ8ncr9DUxS5zcC'

// ── Kiko (6 core + 4 contextual poses) ──
export const KIKO_ASSETS = {
  idle: `${CDN}/hf_20260629_174406_a0f62737-61dd-49e4-a705-eacddb9a825d.png`,
  happy: `${CDN}/hf_20260629_174409_d133e49c-0bb2-4731-9668-793d7ec055c2.png`,
  sad: `${CDN}/hf_20260629_174446_b221c45f-1409-4c1c-a11a-612252e6e22d.png`,
  excited: `${CDN}/hf_20260629_174449_bd9f479f-5dcc-4318-b0bc-ed6eca71fc8b.png`,
  attack: `${CDN}/hf_20260629_174452_92f284d9-8d93-437e-961d-061321703a22.png`,
  hurt: `${CDN}/hf_20260629_174501_d06f4f0b-3fe7-4e7b-b466-41a88b262637.png`,
  studying: `${CDN}/hf_20260629_182145_19e8eaab-08a2-42ef-959f-bd30b1f22b43.png`,
  jumping: `${CDN}/hf_20260629_182148_392ca98c-b48e-4dfd-98ab-2ad32900fe6e.png`,
  victory: `${CDN}/hf_20260629_182151_610f270d-21b9-45f8-ad27-4aad72f40968.png`,
  bossPrep: `${CDN}/hf_20260629_182154_5fa17a32-16f3-4a3f-bb48-f673004254cf.png`,
}
export const KIKO_FALLBACK = '/assets/kiko/idle.svg'

// ── Boss (Hiragana Guardian) ──
export const BOSS_ASSETS = {
  idle: `${CDN}/hf_20260629_174543_115323f1-f55a-4d5a-b93a-88a6aded0e42.png`,
  attack: `${CDN}/hf_20260629_174503_68882ca1-a775-4131-8de6-d2e42a7cb05c.png`,
  hurt: `${CDN}/hf_20260629_174506_9d979c9a-bc11-4bd4-945b-67142007e8d1.png`,
}
export const BOSS_FALLBACK = '/assets/boss/idle.svg'

// ── World background ──
export const WORLD_ASSETS = {
  background: `${CDN}/hf_20260629_174130_28cfc407-16d5-4e1b-8442-4997b959c5b9.png`,
}
export const WORLD_FALLBACK = {
  background: '/assets/world/forest-bg.svg',
}

// ── Typed node markers (unlocked + distinct locked asset per type) ──
export const NODE_ASSETS = {
  book: {
    unlocked: `${CDN}/hf_20260629_182156_c6506b1c-fec5-4b45-8d13-147fceaf4a62.png`,
    locked: `${CDN}/hf_20260629_182213_c6fd71a9-e99e-4ed9-9b63-772c05db91ea.png`,
  },
  study: {
    unlocked: `${CDN}/hf_20260629_182159_472c528e-30ab-425b-bde4-5ddbbebc0ed4.png`,
    locked: `${CDN}/hf_20260629_182216_d8d26612-6b26-4f33-bb9b-1530d8edf0ed.png`,
  },
  scroll: {
    unlocked: `${CDN}/hf_20260629_182202_bc4fa8bb-4f0f-4d11-a185-a43f8ba8a39e.png`,
    locked: `${CDN}/hf_20260629_182219_f5b026fd-5a8a-4fab-8188-c2eec9bb07cb.png`,
  },
  lantern: {
    unlocked: `${CDN}/hf_20260629_182205_03686951-3296-4566-9540-dd2bea97d0b1.png`,
    locked: `${CDN}/hf_20260629_182223_f6201d73-ae12-48f2-82ca-60436c249f91.png`,
  },
  altar: {
    unlocked: `${CDN}/hf_20260629_182208_0e157e1e-e886-4a0f-816d-498568c44d4d.png`,
    locked: `${CDN}/hf_20260629_182226_e715d35d-dd86-4132-bced-498aa7ba0aff.png`,
  },
  torii: {
    unlocked: `${CDN}/hf_20260629_182210_cc723e59-2743-4646-8daa-3beb5be986f1.png`,
    locked: `${CDN}/hf_20260629_182229_589cc29a-fbf3-4a89-a93d-da5ea7bfc5ea.png`,
  },
}
export const NODE_FALLBACK = {
  book: '/assets/world/markers/book.svg',
  study: '/assets/world/markers/study.svg',
  scroll: '/assets/world/markers/scroll.svg',
  lantern: '/assets/world/markers/lantern.svg',
  altar: '/assets/world/markers/altar.svg',
  torii: '/assets/world/markers/torii.svg',
}
