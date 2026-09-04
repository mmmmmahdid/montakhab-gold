/**
 * Regenerates the hero's scroll-scrubbed frame sequence from a source video.
 *
 * Usage:
 *   npm run extract-frames -- path/to/new-video.mp4
 *   npm run extract-frames                              (defaults to public/videos/hero-loop.mp4)
 *
 * How it works: a real <video>.currentTime seek is inherently jerky on a
 * scroll-driven timeline (the browser decodes forward from the nearest
 * keyframe on every seek). This script instead pre-decodes the clip into a
 * dense sequence of still frames once, offline, using headless Chrome's own
 * canvas capture — src/components/Hero.tsx then just swaps between
 * pre-decoded images on scroll, which is instant with no seek latency.
 *
 * Requires: `npm install -D playwright` (not a permanent runtime
 * dependency — only needed when you actually run this script) and a local
 * Chrome install at the path below. Also requires the Next.js dev server
 * running at localhost:3000, since frames are captured from a real
 * same-origin page (a `page.setContent()` document has a different origin
 * than the video file and taints the canvas — see git history for the
 * SecurityError this caused before this was fixed).
 *
 * FRAME_COUNT / OUT_W / OUT_H / QUALITY here must match the constants read
 * by Hero.tsx (FRAME_COUNT) for the sequence to play back correctly.
 */
import { chromium } from "playwright";
import { mkdir, writeFile, readdir, unlink, copyFile } from "node:fs/promises";
import path from "node:path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const DEV_SERVER = "http://localhost:3000";

const FRAME_COUNT = 120; // must match FRAME_COUNT in src/components/Hero.tsx
const OUT_W = 1280; // match the source video's native resolution — upscaling gains nothing
const OUT_H = 720;
const QUALITY = 0.92;

const OUT_DIR = path.resolve("public/frames/hero");
const VIDEO_URL_DEFAULT = "/videos/hero-loop.mp4";

const inputArg = process.argv[2];

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  // clear any previous sequence so stale frames never linger if the new
  // clip is shorter, or FRAME_COUNT changes between runs
  for (const f of await readdir(OUT_DIR)) {
    if (f.endsWith(".webp")) await unlink(path.join(OUT_DIR, f));
  }

  // a new video passed on the command line gets copied into place first,
  // so Hero.tsx's <video>-free markup never needs to change — it's always
  // public/videos/hero-loop.mp4 that gets scrubbed into frames
  if (inputArg) {
    const dest = path.resolve("public/videos/hero-loop.mp4");
    await mkdir(path.dirname(dest), { recursive: true });
    await copyFile(path.resolve(inputArg), dest);
    console.log(`copied ${inputArg} -> ${dest}`);
  }

  const browser = await chromium.launch({ executablePath: CHROME_PATH });
  const page = await browser.newPage();
  page.on("pageerror", (e) => console.error("[pageerror]", String(e)));

  // must be a same-origin navigation (not page.setContent) or drawImage()
  // taints the canvas and toDataURL() throws a SecurityError
  await page.goto(DEV_SERVER + "/");
  await page.bringToFront();

  console.log("source video:", DEV_SERVER + VIDEO_URL_DEFAULT);

  const { duration } = await page.evaluate(
    ({ w, h, src }) => {
      return new Promise((resolve, reject) => {
        const v = document.createElement("video");
        v.id = "extract-v";
        v.src = src;
        v.muted = true;
        v.playsInline = true;
        document.body.appendChild(v);

        const c = document.createElement("canvas");
        c.id = "extract-c";
        c.width = w;
        c.height = h;
        document.body.appendChild(c);

        v.addEventListener("error", () => reject(new Error("video load error — check the path")), { once: true });
        const onReady = () => resolve({ duration: v.duration });
        if (v.readyState >= 1 && v.videoWidth) onReady();
        else v.addEventListener("loadedmetadata", onReady, { once: true });
      });
    },
    { w: OUT_W, h: OUT_H, src: VIDEO_URL_DEFAULT }
  );
  console.log("duration", duration);

  function withTimeout(promise, ms, label) {
    return Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error(`timeout: ${label}`)), ms)),
    ]);
  }

  for (let i = 0; i < FRAME_COUNT; i++) {
    // avoid t=0 exactly — currentTime is already 0 pre-seek, so no 'seeked'
    // event fires and we'd capture a not-yet-decoded (blank) frame
    const t = Math.max(0.02, (i / (FRAME_COUNT - 1)) * duration);

    const dataUrl = await withTimeout(
      page.evaluate(
        ({ t, w, h, quality }) => {
          return new Promise((resolve, reject) => {
            const v = document.getElementById("extract-v");
            const c = document.getElementById("extract-c");
            const ctx = c.getContext("2d");
            let settled = false;
            let timer;
            const capture = () => {
              if (settled) return;
              settled = true;
              v.removeEventListener("seeked", onSeeked);
              clearTimeout(timer);
              try {
                const scale = Math.max(w / v.videoWidth, h / v.videoHeight);
                const dw = v.videoWidth * scale;
                const dh = v.videoHeight * scale;
                const dx = (w - dw) / 2;
                const dy = (h - dh) / 2;
                ctx.clearRect(0, 0, w, h);
                ctx.drawImage(v, dx, dy, dw, dh);
                resolve(c.toDataURL("image/webp", quality));
              } catch (err) {
                reject(err);
              }
            };
            const onSeeked = () => capture();
            if (Math.abs(v.currentTime - t) < 0.001) {
              capture();
              return;
            }
            v.addEventListener("seeked", onSeeked);
            timer = setTimeout(capture, 500);
            v.currentTime = t;
          });
        },
        { t, w: OUT_W, h: OUT_H, quality: QUALITY }
      ),
      8000,
      `frame ${i}`
    );

    const base64 = dataUrl.replace(/^data:image\/webp;base64,/, "");
    const filename = path.join(OUT_DIR, `frame-${String(i).padStart(3, "0")}.webp`);
    await writeFile(filename, Buffer.from(base64, "base64"));
    if (i % 10 === 0) console.log(`frame ${i}/${FRAME_COUNT}`);
  }

  console.log("done, wrote", FRAME_COUNT, "frames to", OUT_DIR);
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
