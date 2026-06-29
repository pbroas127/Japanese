// ──────────────────────────────────────────────────────────────────────────
//  Central asset registry.
//
//  These are the real assets generated with Higgsfield (nano_banana_pro) from
//  the user's reference images, with transparent cutouts via background
//  removal. Characters & node are transparent PNGs; the forest is a full
//  background. Each entry has a committed local SVG fallback that the <img>
//  swaps to on error, so the app still renders if the CDN is unreachable.
//
//  To self-host instead of using the CDN: download each URL into
//  /public/assets/... and point these entries at the local paths.
// ──────────────────────────────────────────────────────────────────────────

const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_3DIHRL4hfIamgJ8ncr9DUxS5zcC'

export const KIKO_ASSETS = {
  idle: `${CDN}/hf_20260629_174406_a0f62737-61dd-49e4-a705-eacddb9a825d.png`,
  happy: `${CDN}/hf_20260629_174409_d133e49c-0bb2-4731-9668-793d7ec055c2.png`,
  sad: `${CDN}/hf_20260629_174446_b221c45f-1409-4c1c-a11a-612252e6e22d.png`,
  excited: `${CDN}/hf_20260629_174449_bd9f479f-5dcc-4318-b0bc-ed6eca71fc8b.png`,
  attack: `${CDN}/hf_20260629_174452_92f284d9-8d93-437e-961d-061321703a22.png`,
  hurt: `${CDN}/hf_20260629_174501_d06f4f0b-3fe7-4e7b-b466-41a88b262637.png`,
}
export const KIKO_FALLBACK = '/assets/kiko/idle.svg'

export const BOSS_ASSETS = {
  idle: `${CDN}/hf_20260629_174543_115323f1-f55a-4d5a-b93a-88a6aded0e42.png`,
  attack: `${CDN}/hf_20260629_174503_68882ca1-a775-4131-8de6-d2e42a7cb05c.png`,
  hurt: `${CDN}/hf_20260629_174506_9d979c9a-bc11-4bd4-945b-67142007e8d1.png`,
}
export const BOSS_FALLBACK = '/assets/boss/idle.svg'

export const WORLD_ASSETS = {
  background: `${CDN}/hf_20260629_174130_28cfc407-16d5-4e1b-8442-4997b959c5b9.png`,
  node: `${CDN}/hf_20260629_174509_965961b2-b9fe-4ec4-8006-f3c906fd966b.png`,
}
export const WORLD_FALLBACK = {
  background: '/assets/world/forest-bg.svg',
  node: '/assets/world/node.svg',
}
