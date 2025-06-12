import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assets } from '../config/assets';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animation du contenu principal
    gsap.fromTo(contentRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animation de l'image
    gsap.fromTo(imageRef.current,
      { opacity: 0, x: 50, scale: 0.95 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

  }, []);

  return (
    <section id="about" ref={aboutRef} className="py-20 px-6" style={{ backgroundColor: '#F5E6D3' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contenu texte */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#8B4513' }}>
                À Propos de Nous
              </h2>
              <p className="text-xl leading-relaxed text-gray-700 mb-8">
                Chez Maman Jeanne, nous vous proposons les saveurs riches et variées de la cuisine 
                congolaise africaine et créole haïtienne. Notre menu est une fusion de plats 
                traditionnels, préparés avec des ingrédients authentiques et assaisonnés avec amour, 
                comme à la maison.
              </p>
              
              <p className="text-xl leading-relaxed text-gray-700 mb-8">
                Que vous ayez envie des épices audacieuses du Congo ou des saveurs vibrantes d'Haïti, 
                vous trouverez un repas fait maison qui satisfait votre âme. Venez découvrir une 
                atmosphère chaleureuse et accueillante, où chaque plat raconte une histoire de 
                patrimoine et de cœur.
              </p>

              <p className="text-xl leading-relaxed text-gray-700 mb-8">
                Rejoignez-nous pour un voyage culinaire inoubliable.
              </p>

              {/* Citation */}
              <div className="relative p-6 rounded-2xl" 
                   style={{ backgroundColor: 'rgba(139, 69, 19, 0.1)' }}>
                <div className="absolute top-2 left-4 text-6xl opacity-30" style={{ color: '#8B4513' }}>
                  "
                </div>
                <p className="text-lg italic text-gray-800 pl-8" style={{ color: '#2D1810' }}>
                  Chaque plat raconte une histoire de patrimoine et de cœur
                </p>
                <p className="text-sm text-gray-600 mt-3 text-right">- Maman Jeanne</p>
              </div>
            </div>
          </div>

          {/* Images en mosaïque */}
          <div ref={imageRef} className="relative">
            <div className="grid grid-cols-2 gap-4 h-[600px]">
              {/* Image principale */}
              <div className="col-span-2 h-[280px] rounded-3xl overflow-hidden shadow-xl">
                <img 
                  src={assets.dishes.griotPorc}
                  alt="Plat signature"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              {/* Images secondaires */}
              <div className="h-[300px] rounded-3xl overflow-hidden shadow-xl">
                <img 
                  src={assets.dishes.chicken}
                  alt="Cuisine traditionnelle"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="h-[300px] rounded-3xl overflow-hidden shadow-xl">
                <img 
                  src={assets.dishes.goat}
                  alt="Atmosphère chaleureuse"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Élément décoratif */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-yellow-300/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-orange-300/20 rounded-full blur-2xl" />
          </div>
        </div>

      </div>
    </section>
  );
}