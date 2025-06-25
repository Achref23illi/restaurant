import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useTranslation } from 'react-i18next';
import { assets } from '../config/assets';

gsap.registerPlugin(ScrollToPlugin);

export default function Hero() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const dishes = Object.entries(assets.dishes).map(([key, value]) => ({
    name: key,
    image: value
  }));

  // Function to scroll to menu section
  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: menuSection,
          autoKill: true
        },
        ease: "power2.inOut"
      });
    }
  };

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
      { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.8 }
    );

    // Simple vertical auto-scroll
    const scrollTl = gsap.timeline({ repeat: -1 });
    
    scrollTl.to(scrollContainerRef.current, {
      y: `-${100 * dishes.length}%`,
      duration: dishes.length * 4,
      ease: "none"
    });

    // Pause on hover
    const container = imagesContainerRef.current;
    if (container) {
      container.addEventListener('mouseenter', () => scrollTl.pause());
      container.addEventListener('mouseleave', () => scrollTl.play());
    }

    return () => {
      scrollTl.kill();
    };
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-yellow-50 to-orange-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Text content */}
        <div className="space-y-6">
          <h1 
            ref={titleRef}
            className="text-5xl lg:text-7xl font-bold leading-tight"
            style={{ color: '#8B4513' }}
          >
            {t('hero.welcome')}
            <br />
            <span className="text-6xl lg:text-8xl" style={{ color: '#A0522D' }}>
              {t('hero.title')}
            </span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-xl lg:text-2xl text-gray-700 leading-relaxed"
          >
            {t('hero.subtitle')}
          </p>

          <div ref={ctaRef} className="flex flex-col gap-6 pt-4">
            <button 
              onClick={scrollToMenu}
              className="group relative overflow-hidden px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-fit"
              style={{
                background: 'linear-gradient(135deg, #8B4513, #A0522D)',
                color: 'white'
              }}
            >
              <span className="relative z-10">{t('hero.discoverMenu')}</span>
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, #A0522D, #8B4513)' }}
              />
            </button>

            {/* Google Reviews Link */}
            <a 
              href="https://g.co/kgs/Q3zFq49"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors duration-300 group"
            >
              <div className="flex items-center">
                {/* Google Icon */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                
                {/* Rating Stars */}
                <div className="flex items-center ml-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
              </div>
              
              <span className="text-sm font-medium group-hover:underline">
                {t('hero.googleReviews')}
              </span>
            </a>
          </div>
        </div>

        {/* Right side - Simple vertical scrolling images */}
        <div className="relative h-[600px] lg:h-[700px]">
          <div 
            ref={imagesContainerRef}
            className="relative w-full h-full overflow-hidden rounded-3xl shadow-2xl"
          >
            {/* Scrolling container */}
            <div ref={scrollContainerRef} className="absolute inset-0">
              {/* Original set of images */}
              {dishes.map((dish) => (
                <div
                  key={`${dish.name}-1`}
                  className="relative w-full h-full"
                  style={{ height: '100%' }}
                >
                  <img 
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-10 left-10 right-10">
                    <p className="text-white/80 text-sm font-medium mb-2">{t('hero.signature')}</p>
                    <h3 className="text-white text-4xl font-bold capitalize">
                      {dish.name.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                  </div>
                </div>
              ))}
              
              {/* Duplicate set for seamless loop */}
              {dishes.map((dish) => (
                <div
                  key={`${dish.name}-2`}
                  className="relative w-full h-full"
                  style={{ height: '100%' }}
                >
                  <img 
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-10 left-10 right-10">
                    <p className="text-white/80 text-sm font-medium mb-2">{t('hero.signature')}</p>
                    <h3 className="text-white text-4xl font-bold capitalize">
                      {dish.name.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Gradient overlays */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-orange-50 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-orange-50 to-transparent pointer-events-none z-10" />
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-yellow-200 rounded-full filter blur-3xl opacity-30 animate-pulse pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-orange-200 rounded-full filter blur-3xl opacity-30 animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />
    </section>
  );
}