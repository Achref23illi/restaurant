import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { assets } from '../config/assets';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<HTMLDivElement[]>([]);

  const dishes = Object.entries(assets.dishes).map(([key, value]) => ({
    name: key,
    image: value
  }));

  useGSAP(() => {
    // Initial setup
    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 0,
      x: -50
    });

    // Main timeline
    const tl = gsap.timeline({ delay: 0.5 });

    // Animate text elements
    tl.to(titleRef.current, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power3.out"
    })
    .to(subtitleRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")
    .to(ctaRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4");

    // Animate images container
    gsap.fromTo(imagesContainerRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out", delay: 0.8 }
    );

    // Slider animation
    const images = imageRefs.current.filter(Boolean);
    if (images.length === 0) return;

    const sliderTl = gsap.timeline({ repeat: -1, defaults: { ease: "power3.out" } });

    images.forEach((img) => {
      sliderTl
        .fromTo(img, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1 })
        .to(img, { yPercent: -100, opacity: 0, duration: 1, delay: 2 });
    });

    return () => {
      sliderTl.kill();
    };
  }, []);
  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-yellow-50 to-orange-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Text content */}
        <div className="space-y-6">
          <h1 
            ref={titleRef}
            className="text-5xl lg:text-7xl font-bold leading-tight"
            style={{ color: '#8B4513' }}
          >
            Bienvenue chez
            <br />
            <span className="text-6xl lg:text-8xl" style={{ color: '#A0522D' }}>
              Maman Jeanne
            </span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-xl lg:text-2xl text-gray-700 leading-relaxed"
          >
            Savourez l'authenticité de la cuisine haïtienne traditionnelle, 
            préparée avec amour et passion depuis trois générations.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              className="group relative overflow-hidden px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #8B4513, #A0522D)',
                color: 'white'
              }}
            >
              <span className="relative z-10">Découvrir le Menu</span>
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, #A0522D, #8B4513)' }}
              />
            </button>

            <button 
              className="px-8 py-4 rounded-full font-semibold text-lg border-2 transition-all duration-300 hover:scale-105"
              style={{
                borderColor: '#8B4513',
                color: '#8B4513',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#8B4513';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#8B4513';
              }}
            >
              Réserver une Table
            </button>
          </div>
        </div>


        {/* Right side - Dishes slider */}
        <div className="relative h-[650px] lg:h-[750px] flex items-center justify-center">
          <div
            ref={imagesContainerRef}
            className="relative w-full max-w-md h-full overflow-hidden rounded-3xl shadow-xl"
          >
            {dishes.map((dish, index) => (
              <div
                key={dish.name}
                ref={el => {
                  if (el) imageRefs.current[index] = el;
                }}
                className="absolute inset-0 opacity-0"
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-6 left-6 text-white text-3xl font-bold capitalize">
                  {dish.name.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
              </div>
            ))}
          </div>
        </div>
        </div>
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-yellow-200 rounded-full filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-200 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
    </section>
  );
}