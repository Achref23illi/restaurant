import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assets } from '../config/assets';

gsap.registerPlugin(ScrollTrigger);

export default function Reviews() {
  const reviewsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animation du titre
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: reviewsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animation des cartes
    gsap.fromTo(".review-card",
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            return (
              <svg key={index} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
            );
          } else if (index === fullStars && hasHalfStar) {
            return (
              <svg key={index} className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20">
                <defs>
                  <linearGradient id="half-star">
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="#E5E7EB" />
                  </linearGradient>
                </defs>
                <path fill="url(#half-star)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
            );
          } else {
            return (
              <svg key={index} className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
            );
          }
        })}
      </div>
    );
  };

  return (
    <section ref={reviewsRef} className="py-20 px-6" style={{ backgroundColor: '#FEF5E7' }}>
      <div className="max-w-7xl mx-auto">
        {/* Titre */}
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#8B4513' }}>
            Nos Avis Clients
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Ce que nos clients pensent de nous sur les différentes plateformes
          </p>
        </div>

        {/* Cartes des avis */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* UberEats Review */}
          <div className="review-card bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center justify-between mb-6">
              <img 
                src={assets.uberEatsLogo}
                alt="UberEats"
                className="h-8 w-auto"
              />
              <div className="text-right">
                <div className="text-3xl font-bold" style={{ color: '#8B4513' }}>4.0</div>
                <div className="text-sm text-gray-500">sur 5</div>
              </div>
            </div>
            
            <div className="space-y-4">
              {renderStars(4)}
              <p className="text-gray-600">
                <span className="font-semibold text-2xl" style={{ color: '#2D1810' }}>88</span> avis vérifiés
              </p>
              
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500 italic">
                  "Excellente cuisine haïtienne, service rapide et portions généreuses!"
                </p>
                <p className="text-xs text-gray-400 mt-2">- Dernier avis</p>
              </div>
            </div>
          </div>

          {/* DoorDash Review */}
          <div className="review-card bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center justify-between mb-6">
              <img 
                src={assets.doorDashLogo}
                alt="DoorDash"
                className="h-8 w-auto"
              />
              <div className="text-right">
                <div className="text-3xl font-bold" style={{ color: '#8B4513' }}>3.5</div>
                <div className="text-sm text-gray-500">sur 5</div>
              </div>
            </div>
            
            <div className="space-y-4">
              {renderStars(3.5)}
              <p className="text-gray-600">
                <span className="font-semibold text-2xl" style={{ color: '#2D1810' }}>50</span> votes
              </p>
              
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500 italic">
                  "Bonne nourriture, livraison dans les temps. À essayer!"
                </p>
                <p className="text-xs text-gray-400 mt-2">- Avis récent</p>
              </div>
            </div>
          </div>

          {/* Montreal Reviews */}
          <div className="review-card bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" 
                     style={{ backgroundColor: '#8B4513' }}>
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <span className="font-semibold text-lg text-gray-800">Montréal</span>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold" style={{ color: '#8B4513' }}>4.6</div>
                <div className="text-sm text-gray-500">sur 5</div>
              </div>
            </div>
            
            <div className="space-y-4">
              {renderStars(4.6)}
              <p className="text-gray-600">
                <span className="font-semibold text-2xl" style={{ color: '#2D1810' }}>30</span> votes
              </p>
              
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500 italic">
                  "Un vrai goût d'Haïti au cœur de Montréal. Hautement recommandé!"
                </p>
                <p className="text-xs text-gray-400 mt-2">- Avis récent</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Commandez dès maintenant et découvrez pourquoi nos clients nous adorent!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={assets.uberEatsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: '#000' }}
            >
              <img 
                src={assets.uberEatsLogo}
                alt="UberEats"
                className="h-4 w-auto mr-3 brightness-0 invert"
              />
              Commander sur UberEats
            </a>
            
            <a
              href={assets.doorDashLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-2"
              style={{ backgroundColor: '#F3F4F6', borderColor: '#E5E7EB' }}
            >
              <img 
                src={assets.doorDashLogo}
                alt="DoorDash"
                className="h-4 w-4 mr-3"
              />
              Commander sur DoorDash
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}