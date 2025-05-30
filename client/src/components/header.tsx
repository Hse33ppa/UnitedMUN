import { useState, useEffect } from "react";
import { Link } from "wouter";
import { navigationLinks } from "@/lib/data";
import logoImage from "@assets/WhatsApp_Image_2025-05-23_at_02,33,09-removebg-preview-Picsart-AiImageEnhancer.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false);
    const hash = href.includes('#') ? href.substring(href.indexOf('#')) : '';
    const isHomePage = window.location.pathname === '/';

    if (hash && isHomePage) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (hash && !isHomePage) {
      // Navigate to home page and then scroll, Link component will handle this
      // No specific action needed here as Link will navigate to /#hash
    } else {
      // For non-hash links or when Link component handles navigation
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-[20px] shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 mr-auto">
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer">
                <img 
                  src={logoImage} 
                  alt="UnitedMUN Logo" 
                  className="h-10 w-auto"
                />
                <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  UnitedMUN
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-grow">
            <div className="flex items-baseline space-x-8">
              {navigationLinks.map((link) => (
                <>
                  {link.label === "Meet the Team" || link.label === "Judges" ? (
                    <Link key={link.href} href={link.href} onClick={() => handleLinkClick(link.href)}>
                      <span className="text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium cursor-pointer whitespace-nowrap">
                        {link.label}
                      </span>
                    </Link>
                  ) : (
                    <Link key={link.href} href={link.href} onClick={() => handleLinkClick(link.href)}>
                      <span className="text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium cursor-pointer">
                        {link.label}
                      </span>
                    </Link>
                  )}
                </>
              ))}
              <Link key="/sponsors" href="/sponsors" onClick={() => handleLinkClick("/sponsors")}>
                <span className="text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium cursor-pointer">
                  Sponsors
                </span>
              </Link>
              <Link key="/portfolio" href="/portfolio" onClick={() => handleLinkClick("/portfolio")}>
                <span className="text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium cursor-pointer whitespace-nowrap">
                  Our Portfolio
                </span>
              </Link>
              <Link href="/#registration" onClick={() => handleLinkClick("/#registration")}>
                <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full font-medium transition-transform duration-200 hover:scale-105 cursor-pointer inline-block">
                  Register Now
                </span>
              </Link>
            </div>
          </div>



          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1 ${
              isMenuOpen ? "hamburger-active" : ""
            }`}
          >
            <div className={`hamburger-line w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}></div>
            <div className={`hamburger-line w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}></div>
            <div className={`hamburger-line w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}></div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-white backdrop-blur-[20px] border-t border-gray-200 transition-all duration-300 ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}>
          <div className="px-6 py-4 space-y-4">
            {navigationLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => handleLinkClick(link.href)}>
                <span className="block w-full text-left text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium cursor-pointer">
                  {link.label}
                </span>
              </Link>
            ))}
            <Link key="/sponsors" href="/sponsors" onClick={() => handleLinkClick("/sponsors")}>
              <span className="block w-full text-left text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium cursor-pointer">
                Sponsors
              </span>
            </Link>
            <Link key="/portfolio" href="/portfolio" onClick={() => handleLinkClick("/portfolio")}>
              <span className="block w-full text-left text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium cursor-pointer whitespace-nowrap">
                Our Portfolio
              </span>
            </Link>
            <Link href="/#registration" onClick={() => handleLinkClick("/#registration")}>
              <span className="w-full block text-center bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full font-medium cursor-pointer">
                Register Now
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
