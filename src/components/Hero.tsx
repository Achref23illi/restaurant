import React, { useRef, useEffect } from 'react';
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

    // Animate images container with perspective
    gsap.fromTo(imagesContainerRef.current,
      { 
        opacity: 0, 
        rotateY: -15,
        scale: 0.9,
        transformPerspective: 1200
      },
      { 
        opacity: 1, 
        rotateY: 0,
        scale: 1, 
        duration: 1.5, 
        ease: "power3.out",
        delay: 0.8
      }
    );

    // Enhanced vertical carousel setup
    const images = imageRefs.current.filter(Boolean);
    if (images.length === 0) return;

    const imageHeight = 220;
    const gap = 20;
    const totalItemHeight = imageHeight + gap;
    const visibleItems = 3;
    const totalHeight = totalItemHeight * images.length;

    // Initial positioning with stagger effect
    images.forEach((img, index) => {
      gsap.set(img, {
        y: index * totalItemHeight,
        scale: 0.85,
        opacity: 0
      });
      
      // Staggered entrance
      gsap.to(img, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        delay: 1.2 + (index * 0.1),
        ease: "back.out(1.2)"
      });
    });

    // Create smooth infinite scroll
    const scrollTl = gsap.timeline({ 
      repeat: -1,
      defaults: { ease: "none" }
    });
    
    // Clone items for seamless loop
    const scrollDuration = images.length * 3; // Slower, smoother scroll
    
    images.forEach((img) => {
      scrollTl.to(img, {
        y: `-=${totalHeight}`,
        duration: scrollDuration,
        modifiers: {
          y: (y) => {
            const rawY = parseFloat(y);
            const wrappedY = gsap.utils.wrap(0, totalHeight)(rawY);
            return wrappedY + "px";
          }
        }
      }, 0);
    });

    // Add parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const rect = imagesContainerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      gsap.to(imagesContainerRef.current, {
        rotateY: (x - 0.5) * 10,
        rotateX: (y - 0.5) * -5,
        transformPerspective: 1200,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(imagesContainerRef.current, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    // Interactive controls
    let isPaused = false;
    
    const container = imagesContainerRef.current;
    if (container) {
      container.addEventListener('mouseenter', () => {
        if (!isPaused) {
          scrollTl.pause();
          gsap.to(images, {
            scale: 1.02,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.out"
          });
        }
      });
      
      container.addEventListener('mouseleave', () => {
        if (!isPaused) {
          scrollTl.play();
          gsap.to(images, {
            scale: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.out"
          });
        }
      });
      
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      scrollTl.kill();
      container?.removeEventListener('mousemove', handleMouseMove);
      container?.removeEventListener('mouseleave', handleMouseLeave);
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
            Savourez l'authenticit� de la cuisine ha�tienne traditionnelle, 
            pr�par�e avec amour et passion depuis trois g�n�rations.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              className="group relative overflow-hidden px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #8B4513, #A0522D)',
                color: 'white'
              }}
            >
              <span className="relative z-10">D�couvrir le Menu</span>
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
              R�server une Table
            </button>
          </div>
        </div>

        {/* Right side - Enhanced scrolling carousel */}
        <div className="relative h-[650px] lg:h-[750px] flex items-center justify-center">
          <div className="relative w-full max-w-md mx-auto">
            {/* Main container with perspective */}
            <div 
              ref={imagesContainerRef}
              className="relative h-[650px] w-full preserve-3d"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Track background */}
              <div className="absolute inset-0 bg-gradient-to-b from-orange-100/20 to-yellow-100/20 rounded-3xl backdrop-blur-sm" />
              
              {/* Images container */}
              <div className="relative h-full overflow-hidden rounded-3xl p-4">
                {[...dishes, ...dishes].map((dish, index) => (
                  <div
                    key={`${dish.name}-${index}`}
                    ref={el => {
                      if (el && index < dishes.length) {
                        imageRefs.current[index] = el;
                      }
                    }}
                    className="absolute w-full h-[200px] px-2"
                  >
                    <div className="relative w-full h-full group cursor-pointer">
                      {/* Card container */}
                      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
                        {/* Background glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-2xl opacity-0 group-hover:opacity-70 blur transition-opacity duration-500" />
                        
                        {/* Image */}
                        <div className="relative h-full rounded-2xl overflow-hidden bg-white">
                          <img 
                            src={dish.image}
                            alt={dish.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          
                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                          
                          {/* Content overlay */}
                          <div className="absolute inset-0 flex flex-col justify-end p-6">
                            <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                              <p className="text-white/80 text-sm font-medium mb-1">Plat Signature</p>
                              <h3 className="text-white text-2xl font-bold capitalize">
                                {dish.name.replace(/([A-Z])/g, ' $1').trim()}
                              </h3>
                            </div>
                            
                            {/* Decorative elements */}
                            <div className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Side indicators */}
                      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-orange-400 to-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-orange-400 to-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced gradient overlays */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-orange-50 via-orange-50/50 to-transparent pointer-events-none z-10 rounded-t-3xl" />
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-50 via-orange-50/50 to-transparent pointer-events-none z-10 rounded-b-3xl" />
              
              {/* Side fade effects */}
              <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-orange-50 to-transparent pointer-events-none z-10" />
              <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-orange-50 to-transparent pointer-events-none z-10" />
            </div>

            {/* Decorative elements around carousel */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-300/30 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-300/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-yellow-200 rounded-full filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-200 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
    </section>
  );
}