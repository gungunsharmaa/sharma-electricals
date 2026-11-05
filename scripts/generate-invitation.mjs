// Generates a subtle, professional ANIMATED invitation (MP4, plays inline on WhatsApp)
// plus a matching still PDF and PNG — all written to ~/Downloads.
//
// Style: clean LIGHT / white theme, teal-navy text, cyan hairline accents.
// Motion: gentle left-to-right slide-ins with soft easing. No blinking, no sparks.
//
// Pipeline (one Chrome session via puppeteer-core, then ffmpeg):
//   1. Load a self-contained HTML invitation (embedded logo + web fonts).
//   2. Seek a JS-driven timeline frame-by-frame, screenshotting each frame.
//   3. Stitch frames into an H.264 MP4, hold on the final frame, loop once.
//   4. Also emit an A4 PDF and a 2x PNG of the final composition.
//
// Usage: node scripts/generate-invitation.mjs
// Requirements: Google Chrome + ffmpeg (brew install ffmpeg) + puppeteer-core.

import { existsSync, mkdirSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { tmpdir, homedir } from "node:os";
import puppeteer from "puppeteer-core";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const downloads = join(homedir(), "Downloads");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// ── Details ───────────────────────────────────────────────────────────────
const company = {
  name: "Sharma Electricals",
  founded: 2000,
  tagline: "Engineers & Contractors",
  address:
    "Office No. 327, 3rd Floor, Bestech Citygate, Sector-81A, Manesar, Gurugram, Haryana – 122001",
  phone: "+91 9811617703",
  email: "sharma.electricals99@gmail.com",
};
const event = {
  dateLine: "Sunday, 25th October 2026",
  day: "25",
  monthYear: "October 2026",
  time: "12:00 PM onwards",
};
const newVenture = { name: "Indetron Enterprises" };

// The source logo (697×720) has extra white space above the blue ring, so crop
// a square centered on the ring (center ≈ 353,374) to sit it true-center.
const logoPath = join(root, "src/assets/se-logo.jpeg");
const logoDataUri = existsSync(logoPath)
  ? `data:image/png;base64,${execFileSync("ffmpeg", [
      "-v", "error", "-i", logoPath, "-vf", "crop=675:675:16:37",
      "-f", "image2pipe", "-vcodec", "png", "-",
    ]).toString("base64")}`
  : "";

const W = 1080, H = 1350, FPS = 30, DURATION = 3.5;
const TOTAL = FPS * DURATION;

// Build the HTML. `isPdf` switches to A4 geometry + settled (final) state.
function buildHtml(isPdf) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"/>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Cormorant+Garamond:wght@500;600;700&display=swap" rel="stylesheet">
<style>
  :root{
    --paper:#ffffff;        /* canvas */
    --ink:#0d2b33;          /* deep teal-navy text */
    --ink-soft:#4a5f66;     /* secondary text */
    --cyan:#0098c7;         /* accent (slightly deeper for contrast on white) */
    --cyan-soft:#e3f4fa;    /* tint */
    --rule:#d9e4e7;         /* hairlines */
  }
  *{margin:0;padding:0;box-sizing:border-box;}
  html,body{width:${isPdf ? "210mm" : W + "px"};height:${isPdf ? "297mm" : H + "px"};}
  ${isPdf ? "@page{size:A4;margin:0;}" : ""}
  body{
    font-family:'Inter',system-ui,sans-serif;color:var(--ink);overflow:hidden;
    display:flex;align-items:center;justify-content:center;position:relative;
    background:var(--paper);
    -webkit-print-color-adjust:exact;print-color-adjust:exact;
  }

  /* very soft corner tints — keeps it from looking flat, stays light */
  body::before,body::after{content:"";position:absolute;width:46%;height:40%;pointer-events:none;}
  body::before{top:0;left:0;background:radial-gradient(circle at 0 0, var(--cyan-soft), transparent 70%);}
  body::after{bottom:0;right:0;background:radial-gradient(circle at 100% 100%, var(--cyan-soft), transparent 70%);}

  .card{
    width:${isPdf ? "182mm" : "90%"};height:${isPdf ? "269mm" : "92%"};
    background:var(--paper);
    border:1px solid var(--rule);
    box-shadow:0 20px 60px rgba(13,43,51,0.08);
    padding:${isPdf ? "18mm 20mm" : "48px 68px"};
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    text-align:center;position:relative;
  }
  /* thin cyan accent rules top & bottom (replaces the left spine) */
  .card::before{content:"";position:absolute;left:0;right:0;top:0;height:4px;background:var(--cyan);}
  .card::after{content:"";position:absolute;left:0;right:0;bottom:0;height:4px;background:var(--cyan);}

  /* ── reveal: subtle left→right slide, soft ease, no flashing ── */
  .r{opacity:0;transform:translateX(-26px);}
  .r.in{opacity:1;transform:translateX(0);
    transition:opacity .9s cubic-bezier(.22,.61,.36,1), transform .9s cubic-bezier(.22,.61,.36,1);}

  /* an underline rule that wipes in from the left, centered */
  .wipe{height:2px;background:var(--cyan);width:0;margin:0 auto;}
  .wipe.in{width:${isPdf ? "70px" : "92px"};transition:width 1s cubic-bezier(.22,.61,.36,1);}

  .top{display:flex;flex-direction:column;align-items:center;gap:${isPdf ? "14px" : "18px"};}
  .logo{width:${isPdf ? "80px" : "112px"};height:${isPdf ? "80px" : "112px"};border-radius:50%;
    background:#fff;border:1px solid var(--rule);display:flex;align-items:center;justify-content:center;
    box-shadow:0 6px 18px rgba(13,43,51,.08);flex:0 0 auto;}
  .logo img{width:84%;height:84%;object-fit:contain;border-radius:50%;}
  .brand .name{font-family:'Cormorant Garamond',Georgia,serif;font-weight:700;
    font-size:${isPdf ? "26px" : "36px"};line-height:1.1;letter-spacing:.3px;}
  .brand .tagline{margin-top:6px;font-size:${isPdf ? "10px" : "12.5px"};letter-spacing:3px;
    text-transform:uppercase;color:var(--cyan);}

  .eyebrow{margin-top:${isPdf ? "18px" : "26px"};font-size:${isPdf ? "11px" : "14px"};
    letter-spacing:5px;text-transform:uppercase;color:var(--ink-soft);}
  .headline{font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;
    font-size:${isPdf ? "52px" : "72px"};line-height:1.04;margin-top:${isPdf ? "8px" : "12px"};}
  .headline .accent{color:var(--cyan);}
  .rule-wrap{margin-top:${isPdf ? "16px" : "22px"};}

  .lead{margin-top:${isPdf ? "18px" : "24px"};max-width:${isPdf ? "150mm" : "82%"};
    font-size:${isPdf ? "13px" : "16.5px"};line-height:1.75;color:var(--ink-soft);}

  .date-row{margin-top:${isPdf ? "20px" : "28px"};display:flex;flex-direction:column;align-items:center;gap:${isPdf ? "12px" : "16px"};}
  .date-chip{display:flex;align-items:baseline;gap:${isPdf ? "10px" : "14px"};
    border:1px solid var(--rule);border-top:3px solid var(--cyan);
    padding:${isPdf ? "12px 24px" : "16px 32px"};background:#fff;}
  .date-chip .day{font-family:'Cormorant Garamond',Georgia,serif;font-weight:700;color:var(--cyan);
    font-size:${isPdf ? "44px" : "60px"};line-height:1;}
  .date-chip .my{font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:${isPdf ? "22px" : "30px"};}
  .date-when{font-size:${isPdf ? "12.5px" : "16px"};color:var(--ink-soft);line-height:1.6;}

  /* formal announcement of the new venture */
  .announce{margin-top:${isPdf ? "22px" : "32px"};width:${isPdf ? "140mm" : "78%"};
    background:var(--cyan-soft);border-left:3px solid var(--cyan);border-right:3px solid var(--cyan);
    padding:${isPdf ? "12px 18px" : "18px 26px"};}
  .announce .a-label{font-size:${isPdf ? "9.5px" : "12px"};letter-spacing:3px;text-transform:uppercase;color:var(--cyan);}
  .announce .a-text{margin-top:6px;font-size:${isPdf ? "12px" : "15.5px"};line-height:1.6;color:var(--ink);}
  .announce .a-name{font-family:'Cormorant Garamond',Georgia,serif;font-weight:700;
    font-size:${isPdf ? "26px" : "36px"};line-height:1.1;margin-top:4px;letter-spacing:1px;}
  .announce .a-soon{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;
    font-size:${isPdf ? "14px" : "19px"};color:var(--cyan);}

  .footer{margin-top:${isPdf ? "22px" : "32px"};padding-top:${isPdf ? "16px" : "22px"};
    border-top:1px solid var(--rule);width:100%;}
  .f-label{font-size:${isPdf ? "10px" : "12.5px"};letter-spacing:3px;text-transform:uppercase;color:var(--cyan);}
  .venue{margin-top:8px;font-size:${isPdf ? "12.5px" : "16px"};line-height:1.6;color:var(--ink);max-width:${isPdf ? "150mm" : "92%"};margin-left:auto;margin-right:auto;}
  .contact{margin-top:12px;font-size:${isPdf ? "11.5px" : "15px"};color:var(--ink-soft);}
  .contact b{color:var(--cyan);font-weight:600;}
  .rsvp{margin-top:${isPdf ? "12px" : "16px"};font-family:'Cormorant Garamond',Georgia,serif;
    font-style:italic;font-size:${isPdf ? "15px" : "20px"};color:var(--ink);}
</style></head>
<body>
  <div class="card" id="card">
    <div class="top r" data-r="1" data-d="0.1">
      <div class="logo">${logoDataUri ? `<img src="${logoDataUri}" alt="logo"/>` : ""}</div>
      <div class="brand">
        <div class="name">${company.name}</div>
        <div class="tagline">${company.tagline}</div>
      </div>
    </div>

    <div class="eyebrow r" data-r="1" data-d="0.5">You are cordially invited to our</div>
    <h1 class="headline r" data-r="1" data-d="0.75">Office<br/><span class="accent">Inauguration</span></h1>
    <div class="rule-wrap"><div class="wipe" data-d="1.1"></div></div>

    <p class="lead r" data-r="1" data-d="1.25">
      With great pride and gratitude, we invite you to the inauguration of our new office.
      Join us as we celebrate this milestone with the partners, clients and well-wishers
      who have been part of our journey since ${company.founded}.
    </p>

    <div class="date-row r" data-r="1" data-d="1.55">
      <div class="date-chip">
        <span class="day">${event.day}</span>
        <span class="my">${event.monthYear}</span>
      </div>
      <div class="date-when">${event.dateLine}<br/>${event.time}</div>
    </div>

    <div class="announce r" data-r="1" data-d="1.9">
      <div class="a-label">Formal Announcement</div>
      <div class="a-text">We are delighted to announce the launch of our new company</div>
      <div class="a-name">${newVenture.name}</div>
      <div class="a-soon">Launching Soon</div>
    </div>

    <div class="footer r" data-r="1" data-d="2.3">
      <div class="f-label">Venue</div>
      <div class="venue">${company.address}</div>
      <div class="contact">RSVP &nbsp;·&nbsp; <b>${company.phone}</b> &nbsp;·&nbsp; <b>${company.email}</b></div>
      <div class="rsvp">We look forward to celebrating with you.</div>
    </div>
  </div>

  <script>
    const reveals=[...document.querySelectorAll('.r')];
    const wipes=[...document.querySelectorAll('.wipe')];

    // Idempotent: set the visible/hidden state for a given time t (seconds).
    window.seek=function(t){
      reveals.forEach(el=>el.classList.toggle('in', t>=Number(el.dataset.d)));
      wipes.forEach(el=>el.classList.toggle('in', t>=Number(el.dataset.d)));
    };

    // Final still — kill transitions so everything is instantly at full opacity.
    window.settle=function(){
      const kill=document.createElement('style');
      kill.textContent='*{transition:none!important;animation:none!important;}';
      document.head.appendChild(kill);
      window.seek(99);
      reveals.forEach(el=>{el.style.opacity=1;el.style.transform='none';});
      wipes.forEach(el=>{el.style.width='${isPdf ? "70px" : "92px"}';});
    };
  </script>
</body></html>`;
}

const work = join(tmpdir(), "se-invite-work");
rmSync(work, { recursive: true, force: true });
mkdirSync(work, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--force-device-scale-factor=1", "--hide-scrollbars"],
});

try {
  // ── 1. Frames: one page, seek the timeline ─────────────────────────────
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
  await page.setContent(buildHtml(false), { waitUntil: "networkidle0" });
  await page.evaluateHandle("document.fonts.ready");

  process.stdout.write(`Rendering ${TOTAL} frames`);
  for (let i = 0; i < TOTAL; i++) {
    const t = i / FPS;
    await page.evaluate((tt) => window.seek(tt), t);
    await page.screenshot({ path: join(work, `frame-${String(i).padStart(4, "0")}.png`) });
    if (i % 20 === 0) process.stdout.write(".");
  }
  process.stdout.write(" done\n");

  // ── 3. Still PDF (A4) ──────────────────────────────────────────────────
  const pdfPage = await browser.newPage();
  await pdfPage.setContent(buildHtml(true), { waitUntil: "networkidle0" });
  await pdfPage.evaluateHandle("document.fonts.ready");
  await pdfPage.evaluate(() => window.settle());
  await pdfPage.pdf({
    path: join(downloads, "Office-Inauguration-Invite.pdf"),
    format: "A4", printBackground: true, preferCSSPageSize: true,
  });

  // ── 4. Still PNG (2x) ──────────────────────────────────────────────────
  const pngPage = await browser.newPage();
  await pngPage.setViewport({ width: W, height: H, deviceScaleFactor: 2 });
  await pngPage.setContent(buildHtml(false), { waitUntil: "networkidle0" });
  await pngPage.evaluateHandle("document.fonts.ready");
  await pngPage.evaluate(() => window.settle());
  await pngPage.screenshot({ path: join(downloads, "Office-Inauguration-Invite.png") });
} finally {
  await browser.close();
}

// ── 2. Assemble MP4: animate once (3.5s), then hold the final frame ───────
const base = join(work, "base.mp4");
execFileSync("ffmpeg", [
  "-y", "-framerate", String(FPS),
  "-i", join(work, "frame-%04d.png"),
  // hold on the last frame ~2s so the finished invite is readable
  "-vf", "tpad=stop_mode=clone:stop_duration=2,format=yuv420p",
  "-c:v", "libx264", "-profile:v", "main", "-level", "4.0", "-crf", "20",
  base,
], { stdio: "ignore" });

// Final file: play once (no loop) and add a silent AAC track — WhatsApp treats
// MP4s with H.264 Main + AAC audio as a playable video rather than a document.
const mp4Path = join(downloads, "Office-Inauguration-Invite.mp4");
execFileSync("ffmpeg", [
  "-y", "-i", base,
  "-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=44100",
  "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "64k",
  "-shortest", "-movflags", "+faststart", mp4Path,
], { stdio: "ignore" });

rmSync(work, { recursive: true, force: true });

console.log("\n✅ Saved to ~/Downloads:");
console.log("   • Office-Inauguration-Invite.mp4  (animated — share this on WhatsApp)");
console.log("   • Office-Inauguration-Invite.pdf  (printable still)");
console.log("   • Office-Inauguration-Invite.png  (still image)");
