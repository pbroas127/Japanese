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

// ── World backgrounds (one per world, keyed by world id) ──
export const WORLD_ASSETS = {
  // Exact image uploaded by the user for World 1.
  forest: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3DIHRL4hfIamgJ8ncr9DUxS5zcC/c903d3bc-b1e3-4d0b-b903-837fe56885d0.png',
  // Generated from the World 1 background as a style reference (Higgsfield).
  meadow: `${CDN}/hf_20260701_045929_c48c93a8-929c-422e-9c13-90cad7989233.png`,
  // Regenerated with an explicit "fill edge to edge" instruction after the
  // first pass left a blank margin at the bottom of the frame.
  canyon: `${CDN}/hf_20260701_051543_4fb33a68-05e4-4c3f-9fce-6c9f082528f3.png`,
}
export const WORLD_FALLBACK = {
  forest: '/assets/world/forest-bg.svg',
  meadow: '/assets/world/forest-bg.svg',
  canyon: '/assets/world/forest-bg.svg',
}

// ── Typed node markers, nested per world (each world re-skins the same 6
// marker TYPES — book/study/scroll/lantern/altar/torii — in its own materials,
// so every node in a world still looks distinct while staying thematic). ──
export const NODE_ASSETS = {
  forest: {
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
  },
  meadow: {
    book: {
      unlocked: `${CDN}/hf_20260701_052020_a5f0bc46-89c7-4819-8275-1977200fcf69.png`,
      locked: `${CDN}/hf_20260701_052025_ab40b54a-930c-4a13-8172-e2bf9ac427b9.png`,
    },
    study: {
      unlocked: `${CDN}/hf_20260701_052029_9b2c5748-364b-4a93-bb1d-0437dbaf4e0f.png`,
      locked: `${CDN}/hf_20260701_052033_1298d604-132b-4bb9-b950-3d694f712aae.png`,
    },
    scroll: {
      unlocked: `${CDN}/hf_20260701_052037_d1d37c4a-db85-4369-8c22-d81f3eace686.png`,
      locked: `${CDN}/hf_20260701_052040_44a7fe88-9577-4303-a1bc-c001a9afd32c.png`,
    },
    lantern: {
      unlocked: `${CDN}/hf_20260701_052044_f9f93248-41b4-49fb-85fa-32fc934ea2a5.png`,
      locked: `${CDN}/hf_20260701_052048_7068f025-0d6a-42dc-9f5d-c12f79676696.png`,
    },
    altar: {
      unlocked: `${CDN}/hf_20260701_052054_cbe5fdeb-8f18-4f11-896e-2ce9c194a9a6.png`,
      locked: `${CDN}/hf_20260701_052058_0c6b6eb9-b4e3-4624-8442-c1775c30a6b6.png`,
    },
    torii: {
      unlocked: `${CDN}/hf_20260701_052101_b32e7657-5173-48c0-804c-c0b741ecdde8.png`,
      locked: `${CDN}/hf_20260701_052105_f1ad9b7a-81f1-4687-91ee-710b58ba9552.png`,
    },
  },
  canyon: {
    book: {
      unlocked: `${CDN}/hf_20260701_052115_3b94f909-fc05-48ef-a731-685476c373d7.png`,
      locked: `${CDN}/hf_20260701_052118_1b5171cd-33e8-4032-adbc-0b026780daae.png`,
    },
    study: {
      unlocked: `${CDN}/hf_20260701_052121_413176de-8a0c-458f-8dba-04361b19aa39.png`,
      locked: `${CDN}/hf_20260701_052211_6b9f7bd0-975b-4ede-8762-a277183fe16b.png`,
    },
    scroll: {
      unlocked: `${CDN}/hf_20260701_052126_3ef99c96-c59d-4b94-9acc-c943f5568289.png`,
      locked: `${CDN}/hf_20260701_052129_e5dc7695-042b-42ac-b959-4663e2998def.png`,
    },
    lantern: {
      unlocked: `${CDN}/hf_20260701_052134_e5f7b777-8659-4765-8751-f31a5630eaf9.png`,
      locked: `${CDN}/hf_20260701_052138_21c7ad16-d934-46bb-9b6d-41fd23fab78c.png`,
    },
    altar: {
      unlocked: `${CDN}/hf_20260701_052142_837d9a8e-8147-452e-b3e1-08cabdb31bef.png`,
      locked: `${CDN}/hf_20260701_052146_f305a31b-9eb2-4273-bdf8-92273dcdac25.png`,
    },
    torii: {
      unlocked: `${CDN}/hf_20260701_052149_835dc4ed-3377-49d7-bae2-67f8e31d0d33.png`,
      locked: `${CDN}/hf_20260701_052153_deac32a9-d248-45e8-8295-3a8a1910b1a6.png`,
    },
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
