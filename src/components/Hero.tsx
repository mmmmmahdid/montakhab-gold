"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-scrubbed hero, driven by a pre-extracted image sequence instead of
 * <video>.currentTime. Seeking a real <video> element is inherently jerky —
 * the browser has to decode forward from the nearest keyframe on every seek,
 * which shows up as stutter on a scroll-driven timeline. Canvas frame-swaps
 * have no such latency, so this is what buttery scroll-scrub sequences
 * (Apple product pages, etc.) actually use under the hood.
 */
const FRAME_COUNT = 120;
const FRAME_PATH = (i: number) => `/frames/hero/frame-${String(i).padStart(3, "0")}.webp`;
const PIN_DISTANCE = "+=220%";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const drawnIndexRef = useRef(-1);
  const [ready, setReady] = useState(false);

  // preload the sequence
  useEffect(() => {
    let cancelled = false;
    const images = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image();
      img.src = FRAME_PATH(i);
      return img;
    });
    framesRef.current = images;

    Promise.all(
      images.map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete) resolve();
            else {
              img.onload = () => resolve();
              img.onerror = () => resolve();
            }
          })
      )
    ).then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // draw a given frame index to canvas, object-fit: cover
  const draw = (index: number) => {
    const canvas = canvasRef.current;
    const img = framesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    if (drawnIndexRef.current === index) return;
    drawnIndexRef.current = index;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
      canvas.width = cssW * dpr;
      canvas.height = cssH * dpr;
    }

    const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    const dx = (canvas.width - dw) / 2;
    const dy = (canvas.height - dh) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  useEffect(() => {
    if (!ready) return;

    draw(0);
    const onResize = () => draw(drawnIndexRef.current === -1 ? 0 : drawnIndexRef.current);
    window.addEventListener("resize", onResize);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true })
        // step 0.00 -> 0.02 — the down-arrow cue disappears the instant scrolling begins
        .fromTo(cueRef.current, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.02, ease: "power1.out" }, 0)
        // step 0.90 -> 1.00 — eyebrow label lands right as the sequence finishes
        .fromTo(eyebrowRef.current, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.06, ease: "power2.out" }, 0.9)
        // step 0.93 -> 1.00 — the closing statement is the last frame of the scrub
        .fromTo(headlineRef.current, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.07, ease: "power2.out" }, 0.93);

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: PIN_DISTANCE,
        // canvas frame-swaps are instant, so this scrub value is pure feel —
        // pushed higher than a video-backed scrub could tolerate, for a
        // softer, weightier catch-up without ever reading as laggy
        scrub: 0.6,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          tl.progress(self.progress);
          draw(Math.round(self.progress * (FRAME_COUNT - 1)));
        },
      });
    }, sectionRef);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[100dvh] w-full overflow-hidden bg-ink"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/30" />
      <div className="pointer-events-none absolute inset-0 bg-rim-light" />

      <div className="absolute inset-x-0 bottom-14 z-20 px-6 text-center md:bottom-20">
        <p ref={eyebrowRef} className="eyebrow mb-4 opacity-0">
          دقت پایدار &middot; اعتماد نسل‌ها
        </p>
        <h1
          ref={headlineRef}
          dir="ltr"
          className="font-wordmark text-[clamp(1.4rem,4.6vw,4.25rem)] font-semibold uppercase tracking-[0.05em] leading-[1.15] text-bone opacity-0"
        >
          Montakhab <span className="text-gold-bright">Gold</span> Company
        </h1>
      </div>

      <div
        ref={cueRef}
        className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="font-body text-xs text-bone-dim">اسکرول کنید</span>
        <span className="block h-10 w-px bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}
