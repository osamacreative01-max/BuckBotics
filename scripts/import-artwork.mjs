/**
 * One-time artwork import — converts the client-delivered PSD layer exports
 * (public/images/<FAMILY>/…) to WebP at the canonical site paths.
 *
 * Run:  node scripts/import-artwork.mjs
 * Idempotent — safe to re-run after new artwork drops.
 */
import sharp from "sharp";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = "F:/web/buckbotics/public/images";
const src = (p) => path.join(ROOT, p);
const out = (p) => path.join(ROOT, p);

/** [source, destination] — sources are the delivered Layer/Asset exports. */
const jobs = [
  // ---------- FORGE (W200) ----------
  ["FORGE/FORGE/Layer 2.png", "families/forge.webp"],
  ["FORGE/FORGE/Layer 2.png", "families/forge/slide-1.webp"],
  ["FORGE/FORGE/Layer 3.png", "families/forge/slide-2.webp"],
  ["FORGE/FORGE/Layer 4.png", "families/forge/slide-3.webp"],
  ["FORGE/FORGE/Layer 5.png", "families/forge/slide-4.webp"],
  ["FORGE/FORGE/Layer 6.png", "families/forge/slide-5.webp"],
  ["FORGE/FORGE/Layer 3.png", "robots/for-w200/front.webp"],
  ["FORGE/FORGE/Layer 5.png", "robots/for-w200/rear.webp"],
  ["FORGE/FORGE/Layer 4.png", "robots/for-w200/right-profile.webp"],
  ["FORGE/FORGE/Layer 2.png", "robots/for-w200/three-quarter-front.webp"],
  ["FORGE/FORGE/Layer 6.png", "robots/for-w200/closeup-hands.webp"],

  // ---------- TITAN (M100) ----------
  ["TITAN/TITAN/Layer 2.png", "families/titan.webp"],
  ["TITAN/TITAN/Layer 2.png", "families/titan/slide-1.webp"],
  ["TITAN/TITAN/Layer 3.png", "families/titan/slide-2.webp"],
  ["TITAN/TITAN/Layer 4.png", "families/titan/slide-3.webp"],
  ["TITAN/TITAN/Layer 5.png", "families/titan/slide-4.webp"],
  ["TITAN/TITAN/Layer 6.png", "families/titan/slide-5.webp"],
  ["TITAN/TITAN/Asset 21@4x-100.jpg", "families/titan/slide-6.webp"],
  ["TITAN/TITAN/Layer 3.png", "robots/tit-m100/front.webp"],
  ["TITAN/TITAN/Layer 4.png", "robots/tit-m100/left-profile.webp"],
  ["TITAN/TITAN/Layer 5.png", "robots/tit-m100/rear.webp"],
  ["TITAN/TITAN/Layer 2.png", "robots/tit-m100/three-quarter-front.webp"],
  ["TITAN/TITAN/Asset 21@4x-100.jpg", "robots/tit-m100/closeup-sensors.webp"],

  // ---------- TIDE (U300) ----------
  ["TIDE/TIDE/Layer 3.png", "families/tide.webp"],
  ["TIDE/TIDE/Layer 3.png", "families/tide/slide-1.webp"],
  ["TIDE/TIDE/Layer 2.png", "families/tide/slide-2.webp"],
  ["TIDE/TIDE/Layer 4.png", "families/tide/slide-3.webp"],
  ["TIDE/TIDE/Layer 5.png", "families/tide/slide-4.webp"],
  ["TIDE/TIDE/Asset 23@4x-100.jpg", "families/tide/slide-5.webp"],
  ["TIDE/TIDE/Layer 2.png", "robots/tid-u300/front.webp"],
  ["TIDE/TIDE/Layer 3.png", "robots/tid-u300/three-quarter-front.webp"],
  ["TIDE/TIDE/Layer 4.png", "robots/tid-u300/left-profile.webp"],
  ["TIDE/TIDE/Layer 5.png", "robots/tid-u300/rear.webp"],
  ["TIDE/TIDE/Asset 23@4x-100.jpg", "robots/tid-u300/closeup-hands.webp"],

  // ---------- TERRA (A200) ----------
  ["TERRA/TERRA/Layer 5.png", "families/terra.webp"],
  ["TERRA/TERRA/Layer 5.png", "families/terra/slide-1.webp"],
  ["TERRA/TERRA/Layer 2.png", "families/terra/slide-2.webp"],
  ["TERRA/TERRA/Layer 3.png", "families/terra/slide-3.webp"],
  ["TERRA/TERRA/Layer 4.png", "families/terra/slide-4.webp"],
  ["TERRA/TERRA/Layer 6.png", "families/terra/slide-5.webp"],
  ["TERRA/TERRA/Layer 2.png", "robots/ter-a200/front.webp"],
  ["TERRA/TERRA/Layer 3.png", "robots/ter-a200/left-profile.webp"],
  ["TERRA/TERRA/Layer 4.png", "robots/ter-a200/rear.webp"],
  ["TERRA/TERRA/Layer 5.png", "robots/ter-a200/three-quarter-front.webp"],
  ["TERRA/TERRA/Layer 6.png", "robots/ter-a200/closeup-sensors.webp"],

  // ---------- LAB (D200) ----------
  ["LAB/LAB/Layer 5.png", "families/lab.webp"],
  ["LAB/LAB/Layer 5.png", "families/lab/slide-1.webp"],
  ["LAB/LAB/Layer 2.png", "families/lab/slide-2.webp"],
  ["LAB/LAB/Layer 3.png", "families/lab/slide-3.webp"],
  ["LAB/LAB/Layer 4.png", "families/lab/slide-4.webp"],
  ["LAB/LAB/Asset 22@4x-100.jpg", "families/lab/slide-5.webp"],
  ["LAB/LAB/Layer 2.png", "robots/lab-d200/front.webp"],
  ["LAB/LAB/Layer 3.png", "robots/lab-d200/left-profile.webp"],
  ["LAB/LAB/Layer 4.png", "robots/lab-d200/rear.webp"],
  ["LAB/LAB/Layer 5.png", "robots/lab-d200/three-quarter-front.webp"],
  ["LAB/LAB/Asset 22@4x-100.jpg", "robots/lab-d200/closeup-sensors.webp"],

  // ---------- CARE (C100) ----------
  ["CARE/CARE/Layer 5.png", "families/care.webp"],
  ["CARE/CARE/Layer 5.png", "families/care/slide-1.webp"],
  ["CARE/CARE/Layer 2.png", "families/care/slide-2.webp"],
  ["CARE/CARE/Layer 3.png", "families/care/slide-3.webp"],
  ["CARE/CARE/Layer 4.png", "families/care/slide-4.webp"],
  ["CARE/CARE/Layer 6.png", "families/care/slide-5.webp"],
  ["CARE/CARE/Layer 2.png", "robots/car-c100/front.webp"],
  ["CARE/CARE/Layer 3.png", "robots/car-c100/left-profile.webp"],
  ["CARE/CARE/Layer 4.png", "robots/car-c100/rear.webp"],
  ["CARE/CARE/Layer 5.png", "robots/car-c100/three-quarter-front.webp"],
  ["CARE/CARE/Layer 6.png", "robots/car-c100/closeup-chassis.webp"],

  // ---------- BUCKi HOME (H100) ----------
  ["BUCKi HOME/BUCKi HOME/Layer 5.png", "families/bucki-home.webp"],
  ["BUCKi HOME/BUCKi HOME/Layer 5.png", "families/bucki-home/slide-1.webp"],
  ["BUCKi HOME/BUCKi HOME/Layer 2.png", "families/bucki-home/slide-2.webp"],
  ["BUCKi HOME/BUCKi HOME/Layer 3.png", "families/bucki-home/slide-3.webp"],
  ["BUCKi HOME/BUCKi HOME/Layer 4.png", "families/bucki-home/slide-4.webp"],
  ["BUCKi HOME/BUCKi HOME/Layer 2.png", "robots/hom-h100/front.webp"],
  ["BUCKi HOME/BUCKi HOME/Layer 3.png", "robots/hom-h100/left-profile.webp"],
  ["BUCKi HOME/BUCKi HOME/Layer 4.png", "robots/hom-h100/rear.webp"],
  ["BUCKi HOME/BUCKi HOME/Layer 5.png", "robots/hom-h100/three-quarter-front.webp"],

  // ---------- BUCKi (H200) ----------
  ["BUCKi/BUCKi/Layer 6.png", "families/bucki.webp"],
  ["BUCKi/BUCKi/Layer 6.png", "families/bucki/slide-1.webp"],
  ["BUCKi/BUCKi/Layer 3.png", "families/bucki/slide-2.webp"],
  ["BUCKi/BUCKi/Layer 4.png", "families/bucki/slide-3.webp"],
  ["BUCKi/BUCKi/Layer 5.png", "families/bucki/slide-4.webp"],
  ["BUCKi/BUCKi/Layer 7.png", "families/bucki/slide-5.webp"],
  ["BUCKi/BUCKi/Layer 3.png", "robots/bki-h200/front.webp"],
  ["BUCKi/BUCKi/Layer 4.png", "robots/bki-h200/left-profile.webp"],
  ["BUCKi/BUCKi/Layer 5.png", "robots/bki-h200/rear.webp"],
  ["BUCKi/BUCKi/Layer 6.png", "robots/bki-h200/three-quarter-front.webp"],
  ["BUCKi/BUCKi/Layer 7.png", "robots/bki-h200/closeup-sensors.webp"],

  // ---------- BUCKi PERSONA — male persona → EXECUTIVE (E200) ----------
  ["BUCKi PERSONA/BUCKi PERSONA/Layer 4.png", "persona/executive.webp"],
  ["BUCKi PERSONA/BUCKi PERSONA/Layer 4.png", "persona/executive/slide-1.webp"],
  ["BUCKi PERSONA/BUCKi PERSONA/Layer 2.png", "persona/executive/slide-2.webp"],
  ["BUCKi PERSONA/BUCKi PERSONA/Layer 3.png", "persona/executive/slide-3.webp"],
  ["BUCKi PERSONA/BUCKi PERSONA/Asset 15@4x-100.jpg", "persona/executive/slide-4.webp"],
  ["BUCKi PERSONA/BUCKi PERSONA/Asset 16@4x-100.jpg", "persona/executive/slide-5.webp"],
  ["BUCKi PERSONA/BUCKi PERSONA/Layer 2.png", "robots/per-e200/front.webp"],
  ["BUCKi PERSONA/BUCKi PERSONA/Layer 4.png", "robots/per-e200/three-quarter-front.webp"],
  ["BUCKi PERSONA/BUCKi PERSONA/Layer 3.png", "robots/per-e200/right-profile.webp"],
  ["BUCKi PERSONA/BUCKi PERSONA/Asset 15@4x-100.jpg", "robots/per-e200/closeup-hands.webp"],
  ["BUCKi PERSONA/BUCKi PERSONA/Asset 16@4x-100.jpg", "robots/per-e200/closeup-chassis.webp"],

  // ---------- BUCKi PERSONA 2 — female persona (navy suit) → SIGNATURE (S300) ----------
  ["BUCKi PERSONA 2/BUCKi PERSONA 2/Layer 3.png", "persona/signature.webp"],
  ["BUCKi PERSONA 2/BUCKi PERSONA 2/Layer 3.png", "persona/signature/slide-1.webp"],
  ["BUCKi PERSONA 2/BUCKi PERSONA 2/Layer 4.png", "persona/signature/slide-2.webp"],
  ["BUCKi PERSONA 2/BUCKi PERSONA 2/Asset 18@4x-8.png", "persona/signature/slide-3.webp"],
  ["BUCKi PERSONA 2/BUCKi PERSONA 2/Asset 19@4x-8.png", "persona/signature/slide-4.webp"],
  ["BUCKi PERSONA 2/BUCKi PERSONA 2/Asset 20@4x-8.png", "persona/signature/slide-5.webp"],
  ["BUCKi PERSONA 2/BUCKi PERSONA 2/Layer 3.png", "robots/per-s300/three-quarter-front.webp"],
  ["BUCKi PERSONA 2/BUCKi PERSONA 2/Layer 4.png", "robots/per-s300/right-profile.webp"],
  ["BUCKi PERSONA 2/BUCKi PERSONA 2/Asset 18@4x-8.png", "robots/per-s300/closeup-hands.webp"],
  ["BUCKi PERSONA 2/BUCKi PERSONA 2/Asset 19@4x-8.png", "robots/per-s300/closeup-chassis.webp"],
  ["BUCKi PERSONA 2/BUCKi PERSONA 2/Asset 20@4x-8.png", "robots/per-s300/closeup-sensors.webp"],

  // ---------- BUCKi PERSONA family card slider ----------
  ["BUCKi PERSONA/BUCKi PERSONA/Layer 4.png", "families/bucki-persona/slide-1.webp"],
  ["BUCKi PERSONA/BUCKi PERSONA/Layer 2.png", "families/bucki-persona/slide-2.webp"],
  ["BUCKi PERSONA/BUCKi PERSONA/Layer 3.png", "families/bucki-persona/slide-3.webp"],
  ["BUCKi PERSONA 2/BUCKi PERSONA 2/Layer 3.png", "families/bucki-persona/slide-4.webp"],
  ["BUCKi PERSONA/BUCKi PERSONA/Layer 5.png", "families/bucki-persona/slide-5.webp"],
  ["BUCKi PERSONA/BUCKi PERSONA/Asset 15@4x-100.jpg", "families/bucki-persona/slide-6.webp"],
  ["BUCKi PERSONA/BUCKi PERSONA/Asset 16@4x-100.jpg", "families/bucki-persona/slide-7.webp"],
  ["BUCKi PERSONA 2/BUCKi PERSONA 2/Asset 20@4x-8.png", "families/bucki-persona/slide-8.webp"],
  ["BUCKi PERSONA/BUCKi PERSONA/Layer 4.png", "families/bucki-persona.webp"],

  // ---------- OG ----------
  // (Hero artwork is generated from the delivered group shots below.)
];

for (const [from, to] of jobs) {
  await mkdir(path.dirname(out(to)), { recursive: true });
  await sharp(src(from)).webp({ quality: 88 }).toFile(out(to));
  console.log("OK ", to, "<-", from);
}

// ---------- Hero slider (homepage) ----------
// Delivered group shots (public/images/HERO/) are 6:5; the hero figure is
// 16:10 with object-contain, so we centre-crop to 16:10 here — that way the
// artwork fills the frame edge-to-edge with no letterbox bars.
await mkdir(out("hero"), { recursive: true });

const heroSlide1 = await sharp(src("HERO/home page hero section image.jpg"))
  .extract({ left: 0, top: 380, width: 2000, height: 1250 }) // trim empty ceiling, keep floor
  .toBuffer();
await sharp(heroSlide1)
  .resize(1920, 1200)
  .webp({ quality: 88 })
  .toFile(out("hero/hero-slide-1-1920x1200.webp"));
await sharp(heroSlide1)
  .resize(1080, 675)
  .webp({ quality: 84 })
  .toFile(out("hero/hero-slide-1-mobile-1080x675.webp"));
console.log("OK  hero/hero-slide-1-1920x1200.webp + mobile");

await sharp(src("HERO/home page here section image 2.jpg"))
  .extract({ left: 0, top: 155, width: 960, height: 600 })
  .webp({ quality: 88 })
  .toFile(out("hero/hero-slide-2-960x600.webp"));
console.log("OK  hero/hero-slide-2-960x600.webp");

// ---------- OG cover: white 1200×630 canvas, logo top-left, FORGE bottom-centre ----------
const robot = await sharp(src("FORGE/FORGE/Layer 2.png"))
  .resize({ height: 500, fit: "inside" })
  .toBuffer();
const logoSvg = await readFile("F:/web/buckbotics/public/images/logo/logo-dark.svg");
const logo = await sharp(logoSvg).resize({ width: 360 }).png().toBuffer();
await mkdir(out("og"), { recursive: true });
await sharp({
  create: { width: 1200, height: 630, channels: 3, background: "#ffffff" },
})
  .composite([
    { input: logo, gravity: "northwest", top: 48, left: 60 },
    { input: robot, gravity: "southeast", bottom: 0, right: 420 },
  ])
  .jpeg({ quality: 90 })
  .toFile(out("og/cover-1200x630.jpg"));
console.log("OK  og/cover-1200x630.jpg (composited)");

console.log(`\nDone — ${jobs.length + 1} files.`);
