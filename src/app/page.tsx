import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WorkGrid from "@/components/WorkGrid";
import Services from "@/components/Services";
import Studio from "@/components/Studio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <WorkGrid />
      <Services />
      <Studio />
      <Contact />
      <Footer />
    </main>
  );
}
