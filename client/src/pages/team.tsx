import { useFadeInAnimation } from "@/hooks/use-gsap";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function TeamPage() {
  useFadeInAnimation(".section-reveal");

  return (
    <div className="bg-white">
      <Header />
      
      <section className="py-20 bg-white section-reveal">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet the{" "}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Team
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The dedicated professionals working behind the scenes to make UnitedMUN an exceptional experience
            </p>
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-600">
              Our team information will be updated soon. Stay tuned for more details about the organizers and staff behind UnitedMUN 2025.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}