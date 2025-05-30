import { useHeroAnimation } from "@/hooks/use-gsap";

export default function Hero() {
  useHeroAnimation();

  const handleGetStarted = () => {
    const element = document.querySelector("#registration");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLearnMore = () => {
    const element = document.querySelector("#about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700">
        {/* Fallback background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
          }}
        ></div>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white px-6 max-w-4xl mx-auto">
          <h1 
            className="hero-title text-5xl md:text-7xl font-bold mb-6 opacity-0"
            style={{ textShadow: "0 4px 8px rgba(0,0,0,0.3)" }}
          >
            Shape Tomorrow's{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Diplomacy
            </span>
          </h1>
          
          <p 
            className="hero-subtitle text-xl md:text-2xl mb-8 opacity-90 opacity-0"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
          >
            Join the premier Debate House conference, where future leaders debate, negotiate, and solve global challenges
          </p>
          
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center opacity-0">
            <button 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-transform duration-200 hover:scale-105 shadow-xl"
            >
              <i className="fas fa-play mr-2"></i> Get Started
            </button>
            <button 
              onClick={handleLearnMore}
              className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 hover:bg-opacity-30 border border-white border-opacity-30"
            >
              <i className="fas fa-info-circle mr-2"></i> Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white opacity-60">
        <div className="animate-bounce">
          <i className="fas fa-chevron-down text-2xl"></i>
        </div>
      </div>
    </section>
  );
}
