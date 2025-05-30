import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGSAP() {
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
}

export function useFadeInAnimation(trigger: string) {
  useEffect(() => {
    const elements = document.querySelectorAll(trigger);
    
    elements.forEach((element) => {
      gsap.fromTo(element, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [trigger]);
}

export function useStaggerAnimation(trigger: string, stagger: number = 0.1) {
  useEffect(() => {
    const elements = document.querySelectorAll(trigger);
    
    gsap.fromTo(elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger,
        ease: "power2.out",
        scrollTrigger: {
          trigger: elements[0],
          start: "top 85%",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [trigger, stagger]);
}

export function useHeroAnimation() {
  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo('.hero-title', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
    .fromTo('.hero-subtitle', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, 
      "-=0.5"
    )
    .fromTo('.hero-buttons', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, 
      "-=0.5"
    );

    return () => {
      tl.kill();
    };
  }, []);
}
