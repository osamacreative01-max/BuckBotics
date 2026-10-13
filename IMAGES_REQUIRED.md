# IMAGES_REQUIRED.md — BUCKBOTICS media delivery list

Yeh file batati hai kaunsi images website ko chahiye aur unka exact path.
Jaise hi aap file `public/images/...` mein rakhenge, website automatic
placeholder ki jagah asli image dikhane lagegi — **koi code change nahi
chahiye**.

> Art direction (Master Spec, Chapter 04): sab images white/pale studio
> background, soft shadow, sirf robot (koi building/factory scene nahi),
> koi asli insaan nahi. Har concept image ke neeche website khud
> "Concept visualization" caption lagati hai.

---

## 1. LOGO (sab se pehle — sab se zaroori)

Approved wordmark (LOGO.pdf) se **vector outlines export** karein — typed
font se recreate NA karein.

| # | Path | Details |
|---|------|---------|
| 1 | `public/images/logo/logo-light.svg` | White "BUCK" + blue "BOTICS" — dark/midnight backgrounds ke liye (header, footer) |
| 2 | `public/images/logo/logo-dark.svg` | Navy "BUCK" + blue "BOTICS" — light backgrounds ke liye |
| 3 | `public/images/logo/logo-bucki-light.svg` *(optional)* | BUCKi mark (lowercase cyan "i") body copy ke liye |
| 4 | `src/app/favicon.ico` | Replace karein — default Next.js icon hataana hai |
| 5 | `src/app/icon.svg` | 32×32+ favicon (B letterform, single colour me bhi readable) |

**Jab tak SVG nahi aate**, header/footer ek consistent text fallback
dikhata hai — launch se pehle zaroor replace karein (acceptance item 01).

---

## 2. HERO

| # | Path | Export | Notes |
|---|------|--------|-------|
| 6 | `public/images/hero/hero-2400x1350.webp` | 2400×1350 WebP/AVIF | Desktop hero composite, 30% text-safe negative space |
| 7 | `public/images/hero/hero-mobile-1080x1350.webp` | 1080×1350 WebP | Independent mobile crop — head/arms/wheels/brand KABHI cut na ho |

---

## 3. OG / SOCIAL SHARE

| # | Path | Export | Notes |
|---|------|--------|-------|
| 8 | `public/images/og/cover-1200x630.jpg` | 1200×630 JPEG | Logo clear, koi insaan nahi |

---

## 4. FAMILY IMAGES (9 files) — 1600×1200 (4:3), WebP

| # | Path | Family |
|---|------|--------|
| 9 | `public/images/families/forge.webp` | FORGE (homepage par sab se pehle) |
| 10 | `public/images/families/bucki.webp` | BUCKi |
| 11 | `public/images/families/bucki-home.webp` | BUCKi HOME |
| 12 | `public/images/families/bucki-persona.webp` | BUCKi PERSONA |
| 13 | `public/images/families/care.webp` | CARE |
| 14 | `public/images/families/titan.webp` | TITAN |
| 15 | `public/images/families/terra.webp` | TERRA |
| 16 | `public/images/families/tide.webp` | TIDE |
| 17 | `public/images/families/lab.webp` | LAB |

---

## 5. PERSONA COLLECTIONS (6 files) — 1600×1200 (4:3), WebP

**Rules:** sirf fictional **adult** synthetic android, real insaan ka photo
nahi, white backdrop, discreet mechanical indicators (ear panel, joint
seam, status light), elegant wardrobe.

| # | Path | Collection |
|---|------|-----------|
| 18 | `public/images/persona/executive.webp` | PERSONA EXECUTIVE E200 |
| 19 | `public/images/persona/home.webp` | PERSONA HOME H200 |
| 20 | `public/images/persona/care.webp` | PERSONA CARE C200 |
| 21 | `public/images/persona/memoria.webp` | PERSONA MEMORIA M200 |
| 22 | `public/images/persona/signature.webp` | PERSONA SIGNATURE S300 |
| 23 | `public/images/persona/atelier.webp` | ATELIER (service page) |

---

## 6. MODEL GALLERIES (27 models × 9 views = 243 files)

Har model ka folder: `public/images/robots/{internal-id-lowercase}/`
Views (naam bilkul aise hi hone chahiye):

| View file | Angle |
|-----------|-------|
| `front.webp` | Samne se |
| `rear.webp` | Peeche se |
| `left-profile.webp` | Baayen profile |
| `right-profile.webp` | Daayen profile |
| `three-quarter-front.webp` | 3/4 samne se |
| `three-quarter-rear.webp` | 3/4 peeche se |
| `closeup-sensors.webp` | Sensor close-up |
| `closeup-hands.webp` | Hands/manipulators close-up |
| `closeup-chassis.webp` | Chassis + branding close-up |

Export: minimum 1800px longest edge, WebP. **Morphology, wheel placement,
limb geometry aur colour har view me identical** (ek hi model = ek hi
design).

### 27 folders (internal IDs)

```
bki-h100  bki-h200  bki-h300
hom-h200  hom-h300
per-e200  per-h200  per-c200  per-m200  per-s300
for-w100  for-w200  for-w300
car-c100  car-c200  car-c300
tit-t100  tit-m100  tit-x200
ter-a100  ter-a200  ter-a300
tid-s100  tid-m200  tid-u300
lab-d100  lab-d200
```

> NOTE: `per-*` folders BUCKi PERSONA family page ke gallery tabs ke liye
> hain; collection pages (`/robots/bucki-persona/executive` waghera)
> `persona/*.webp` use karti hain. Dono jagah same artwork dena behtar hai.

### Delivery phasing (recommendation)

- **Phase A (launch minimum):** sirf `front.webp` — 27 files. Site poori
  tarah chalegi, gallery tabs placeholder dikhayenge.
- **Phase B:** 6 viewpoints × 27 = 162 files.
- **Phase C:** 3 close-ups × 27 = 81 files.

---

## 7. OPTIONAL (baad ke phases)

| Path | Kab |
|------|-----|
| `public/images/industries/*.webp` | Jab industry pages par imagery chahiye (abhi text + concept cards) |
| `public/images/technology/buckcore-architecture.webp` | Agar SVG diagram ki jagah rendered image chahiye (abhi live diagram hai) |
| `public/images/og/*-collection.jpg` | Per-page OG images for PERSONA collections |

---

## Checklist (owner ke liye)

- [ ] Logo SVGs (approved vector outlines — typed font nahi)
- [ ] Favicon replace
- [ ] Hero desktop + mobile crops
- [ ] OG cover 1200×630
- [ ] 9 family images
- [ ] 6 PERSONA images (adult synthetic only — koi asli insaan nahi)
- [ ] 27 model front views
- [ ] 27 × 6 viewpoints
- [ ] 27 × 3 close-ups

Har image ke saath CMS/media record me rakhein: file, type
(render/prototype/photograph), owner, approval status, adult-only/person-free
check, usage rights aur prompt/provenance — Master Spec, Chapter 18.
