import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import colors from '../config/colors';

gsap.registerPlugin(ScrollTrigger);

export default function Tribute() {
  const { t } = useTranslation();
  const tributeRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animation for the tribute section
    gsap.fromTo(imageRef.current,
      { opacity: 0, scale: 0.8, y: 50 },
      { 
        opacity: 1, 
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: tributeRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(contentRef.current,
      { opacity: 0, x: 50 },
      { 
        opacity: 1, 
        x: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: tributeRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <section 
      id="tribute" 
      ref={tributeRef} 
      className="py-20 px-6"
      style={{ backgroundColor: `${colors.background}` }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Mother's Image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/resturant/mother.jpg"
                alt={t('tribute.motherAlt')}
                className="w-full h-[500px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            {/* Decorative border */}
            <div 
              className="absolute -inset-4 rounded-3xl opacity-30"
              style={{ 
                background: `linear-gradient(45deg, ${colors.green}, ${colors.accent})`,
                zIndex: -1
              }}
            />
          </div>

          {/* Tribute Content */}
          <div ref={contentRef} className="space-y-8">
            <div className="text-center md:text-left">
              <h2 
                className="text-4xl lg:text-5xl font-bold mb-4"
                style={{ color: colors.primary }}
              >
                {t('tribute.title')}
              </h2>
              <div 
                className="w-24 h-1 mx-auto md:mx-0 mb-8 rounded-full"
                style={{ backgroundColor: colors.green }}
              />
            </div>

            <div className="space-y-6">
              <p 
                className="text-lg leading-relaxed"
                style={{ color: colors.text }}
              >
                {t('tribute.paragraph1')}
              </p>
              
              <p 
                className="text-lg leading-relaxed"
                style={{ color: colors.text }}
              >
                {t('tribute.paragraph2')}
              </p>

              <div 
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-l-4 shadow-lg"
                style={{ borderColor: colors.green }}
              >
                <blockquote 
                  className="text-xl italic font-medium text-center"
                  style={{ color: colors.darkGreen }}
                >
                  "{t('tribute.quote')}"
                </blockquote>
                <p 
                  className="text-right mt-4 font-semibold"
                  style={{ color: colors.secondary }}
                >
                  - {t('tribute.dedication')}
                </p>
              </div>

              <p 
                className="text-lg leading-relaxed"
                style={{ color: colors.text }}
              >
                {t('tribute.paragraph3')}
              </p>
            </div>

            {/* Heart decoration */}
            <div className="text-center md:text-left">
              <span className="text-4xl animate-pulse">💝</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 