import confetti from 'canvas-confetti';

export function useConfetti() {
  const triggerConfetti = (options?: confetti.Options) => {
    const defaults: confetti.Options = {
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    };
    
    confetti({ ...defaults, ...options });
  };

  const celebrateRegistration = () => {
    // First burst
    triggerConfetti({
      particleCount: 50,
      spread: 60,
      origin: { x: 0.25, y: 0.7 },
      colors: ['#ef4444', '#f97316', '#eab308']
    });
    
    // Second burst
    setTimeout(() => {
      triggerConfetti({
        particleCount: 50,
        spread: 60,
        origin: { x: 0.75, y: 0.7 },
        colors: ['#ef4444', '#f97316', '#eab308']
      });
    }, 300);
  };

  const celebrateSuccess = () => {
    triggerConfetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ef4444', '#f97316', '#eab308', '#22c55e']
    });
  };

  const celebrateMilestone = () => {
    // Multi-burst celebration
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#ef4444', '#f97316', '#eab308']
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      triggerConfetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  return {
    triggerConfetti,
    celebrateRegistration,
    celebrateSuccess,
    celebrateMilestone
  };
}