# IMAGES_REQUIRED.md — BUCKBOTICS media delivery list

**Status update:** Logo + 9 family artwork sets + EXECUTIVE/SIGNATURE
persona renders **deliver ho chuke hain aur website par live hain**
(`scripts/import-artwork.mjs` se WebP mein convert kar diye gaye).
Neeche "ABHI BAKI" wali files ka intezaar hai.

> Art direction (Master Spec, Chapter 04): white/pale studio background,
> soft shadow, sirf robot (koi building/factory scene nahi), koi asli
> insaan nahi. Har concept image ke neeche website khud concept
> caption/disclaimer lagati hai.

---

## ✅ DELIVERED (website par live)

| Item | Files used | Website par kahan |
|---|---|---|
| Logo (vector) | `public/Logo.svg` | Header + footer (auto: `images/logo/logo-dark.svg` light bg, `logo-light.svg` dark bg), favicon `src/app/icon.svg` (B-mark) |
| FORGE W200 | 5 views | family card slider (5), model gallery `for-w200` |
| TITAN M100 | 6 views | family slider (6), gallery `tit-m100` |
| TIDE U300 | 5 views | family slider (5), gallery `tid-u300` |
| TERRA A200 | 5 views | family slider (5), gallery `ter-a200` |
| LAB D200 | 5 views | family slider (5), gallery `lab-d200` |
| CARE C100 | 5 views | family slider (5), gallery `car-c100` |
| BUCKi H200 | 5 views | family slider (5), gallery `bki-h200` |
| BUCKi HOME H100 | 4 views | family slider (4), gallery `hom-h100` |
| PERSONA male (suit) | 3 + 2 closeups | EXECUTIVE E200 collection + gallery `per-e200` |
| PERSONA female (navy suit) | 2 + 3 closeups | SIGNATURE S300 collection + gallery `per-s300` |
| Homepage hero group shots | 2 delivered (6:5, `public/images/HERO/`) | hero card slider — 16:10 crop `hero/hero-slide-{1,2}-*.webp` |
| OG cover | composited | social share image |

**Naye artwork ke saath re-import:** `node scripts/import-artwork.mjs`
(source folders `public/images/<FAMILY>/` mein rehne dein; script
idempotent hai).

---

## ⏳ ABHI BAKI (jab deliver hon, waise hi `public/images/...` mein rakh dein)

### 1. Baaki 19 models ke front views (Phase A)
Sirf diye gaye renders ke models (`w200, m100, u300, a200, d200, c100,
h200, hom-h100, e200, s300`) live hain. Har model ka front view chahiye:

```
for-w100  for-w300          bki-h100  bki-h300
hom-h300                    per-h200  per-c200  per-m200
car-c200  car-c300          tit-t100  tit-x200
ter-a100  ter-a300          tid-s100  tid-m200
lab-d100
```
Path: `public/images/robots/{id}/front.webp` (ya PNG daal dein —
import script se convert kar denge).

### 2. PERSONA collections HOME / CARE / MEMORIA / ATELIER
Abhi in cards par designed placeholder hai. Renders milte hi
`persona/{home,care,memoria,atelier}.webp` + slider images.

### 3. Baaki gallery views (Phase B/C) — optional, slider chalte rahenge
Jin models ke paas abhi 4-5 views hain unhe badhaya ja sakta hai
(left/right profile, three-quarter-rear, remaining close-ups).

### 4. High-resolution exports (recommended)
Delivered renders low-resolution hain (zyadatar <600px). Large
screens/hero ke liye 1600px+ exports mil jayen to sharp dikhenge —
same naam se replace karna hai, baaki sab automatic.

---

## Naming conventions (jab naye exports aayein)

- Model folders: `public/images/robots/{id-lowercase}/` — jaise
  `for-w200`, `tit-m100`, `per-e200` (IDs model registry se match karti hain).
- View names: `front`, `rear`, `left-profile`, `right-profile`,
  `three-quarter-front`, `three-quarter-rear`, `closeup-sensors`,
  `closeup-hands`, `closeup-chassis`.
- Family sliders: `public/images/families/{slug}/slide-1.webp…`
  (data `src/data/families.ts` → `images[]` array).
- Hero slides: nayi group-shot render `public/images/HERO/` mein rakhein,
  `scripts/import-artwork.mjs` mein hero block ke andar crop job add karein
  (6:5 source → 16:10 crop) aur slide `src/data/site.ts` → `homeHeroSlides`
  array mein add karein.
- PERSONA rules: sirf fictional **adult** synthetic android, real insaan
  ka photo nahi, white backdrop, discreet mechanical indicators.

Har image ke saath CMS/media record me rakhein: file, type
(render/prototype/photograph), owner, approval status, adult-only/person-free
check, usage rights aur prompt/provenance — Master Spec, Chapter 18.
