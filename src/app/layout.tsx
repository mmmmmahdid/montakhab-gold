import type { Metadata } from "next";
import { Amiri, Vazirmatn, Cinzel } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";

// Amiri only ships weight 400/normal and 700/bold — every font-display
// heading in the components below is deliberately font-bold to match
const display = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Vazirmatn({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

// the Latin wordmark ("Montakhab Gold Company") gets its own typeface — a
// Roman-inscription-style luxury display serif, the family of lettering
// actual jewelry/couture logotypes use. No italic form (there isn't one);
// it's set uppercase with wide tracking instead — see the font-wordmark
// usages in Nav / Hero / Footer
const wordmark = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-wordmark",
  display: "swap",
});

export const metadata: Metadata = {
  title: "شرکت طلای منتخب",
  description: "Montakhab Gold Company — طلای تصفیه‌شده با دقت، مورد اعتماد نسل‌ها.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${display.variable} ${body.variable} ${wordmark.variable} font-body antialiased bg-ink text-bone`}
      >
        <div className="grain-overlay" />
        <SmoothScroll>
          <Nav />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
