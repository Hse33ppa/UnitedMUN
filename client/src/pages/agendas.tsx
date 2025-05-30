import { useFadeInAnimation } from "@/hooks/use-gsap";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function AgendasPage() {
  useFadeInAnimation(".section-reveal");

  return (
    <div className="bg-white">
      <Header />
      
      <section className="py-20 bg-white section-reveal">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Conference{" "}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Agendas
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the key topics and challenges that will be debated during UnitedMUN 2025
            </p>
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-600">
              Conference agendas and committee topics will be announced soon. Stay tuned for updates on the exciting debates and discussions planned for UnitedMUN 2025.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}