import { useFadeInAnimation } from "@/hooks/use-gsap";
import { aboutFeatures } from "@/lib/data";

export default function About() {
  useFadeInAnimation(".section-reveal");

  return (
    <section id="about" className="py-20 bg-white section-reveal">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              UnitedMUN
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Since our establishment in 2025, UnitedMUN Headquarters has been dedicated to cultivating diplomatic acumen and advancing global citizenship among students worldwide. Through immersive Model United Nations conferences, Debate houses and tailored educational initiatives the organization equips young leaders with the skills to address complex international challenges. Committed to fostering collaboration and critical thinking, UnitedMUN continues to inspire a generation of informed, empathetic changemakers poised to shape a more interconnected world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            {aboutFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <i className={`${feature.icon} text-white text-xl`}></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
              alt="Students in animated MUN debate discussion"
              className="rounded-2xl shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
              alt="Diverse group of young professionals"
              className="rounded-2xl shadow-lg mt-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
