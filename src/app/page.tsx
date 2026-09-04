import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import About from "@/components/About";
import Products from "@/components/Products";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Manifesto />
      <About />
      <Products />
      <Portfolio />
      <Contact />
      <Footer />
    </main>
  );
}
