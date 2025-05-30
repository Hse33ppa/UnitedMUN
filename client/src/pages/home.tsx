import { useGSAP } from "@/hooks/use-gsap";
import Header from "@/components/header";
import Hero from "@/components/hero";
import About from "@/components/about";
import Committees from "@/components/committees";
import Registration from "@/components/registration";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  useGSAP();

  return (
    <div className="bg-white">
      <Header />
      <Hero />
      <About />
      <Committees />
      <Registration />
      <Contact />
      <Footer />
    </div>
  );
}
