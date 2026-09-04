"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "درباره ما", href: "#about" },
  { label: "محصولات", href: "#products" },
  { label: "نمونه‌کارها", href: "#portfolio" },
  { label: "تماس", href: "#contact" },
];

export default function Nav() {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.35 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : -16,
        pointerEvents: visible ? "auto" : "none",
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-6 z-50 flex justify-center px-4"
    >
      <div className="flex w-full max-w-xl items-center justify-between gap-6 rounded-full border border-gold-line bg-ink-900/70 px-6 py-3 backdrop-blur-xl md:w-auto">
        <a href="#hero" dir="ltr" className="font-wordmark text-xs uppercase tracking-[0.15em] text-gold-bright">
          Montakhab Gold
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-body text-sm text-bone-muted transition-colors duration-500 hover:text-gold-bright"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          aria-label="باز و بسته کردن منو"
          onClick={() => setMenuOpen((v) => !v)}
          className="relative flex h-6 w-6 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className="h-px w-4 bg-bone transition-transform duration-500 ease-silk"
            style={menuOpen ? { transform: "translateY(3.5px) rotate(45deg)" } : undefined}
          />
          <span
            className="h-px w-4 bg-bone transition-transform duration-500 ease-silk"
            style={menuOpen ? { transform: "translateY(-3.5px) rotate(-45deg)" } : undefined}
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-ink-900/95 backdrop-blur-2xl md:hidden"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-3xl text-bone"
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
