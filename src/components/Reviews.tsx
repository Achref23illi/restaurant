import { useEffect, useRef } from 'react';
import { assets } from '../config/assets';
import colors from '../config/colors';

export default function Reviews() {
  const reviewsRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (reviewsRef.current) observer.observe(reviewsRef.current);
    if (titleRef.current) observer.observe(titleRef.current);
    if (cardsRef.current) observer.observe(cardsRef.current);

    return () => observer.disconnect();
  }, []);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400 text-xl">★</span>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400 text-xl">☆</span>
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300 text-xl">☆</span>
      );
    }
    
    return <div className="flex gap-1">{stars}</div>;
  };

  return (
    <section ref={reviewsRef} className="py-20 px-6" style={{ backgroundColor: colors.background }}>
      <div className="max-w-7xl mx-auto">
        {/* Titre */}
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="text-5xl lg:text-6xl font-bold mb-6" style={{ color: colors.secondary }}>
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
                <div className="text-3xl font-bold" style={{ color: colors.secondary }}>4.0</div>
                <div className="text-sm text-gray-500">sur 5</div>
              </div>
            </div>
            
            <div className="space-y-4">
              {renderStars(4)}
              <p className="text-gray-600">
                <span className="font-semibold text-2xl" style={{ color: colors.primary }}>88</span> avis vérifiés
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
                <div className="text-3xl font-bold" style={{ color: colors.secondary }}>3.5</div>
                <div className="text-sm text-gray-500">sur 5</div>
              </div>
            </div>
            
            <div className="space-y-4">
              {renderStars(3.5)}
              <p className="text-gray-600">
                <span className="font-semibold text-2xl" style={{ color: colors.primary }}>50</span> votes
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
              <div className="text-2xl font-bold" style={{ color: colors.green }}>🇨🇦</div>
              <div className="text-right">
                <div className="text-3xl font-bold" style={{ color: colors.secondary }}>4.2</div>
                <div className="text-sm text-gray-500">sur 5</div>
              </div>
            </div>
            
            <div className="space-y-4">
              {renderStars(4.2)}
              <p className="text-gray-600">
                <span className="font-semibold text-2xl" style={{ color: colors.primary }}>Clients</span> Montréal
              </p>
              
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500 italic">
                  "Authenticité et saveurs d'exception dans le cœur de Montréal!"
                </p>
                <p className="text-xs text-gray-400 mt-2">- Avis locaux</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Commandez dès maintenant et découvrez pourquoi nos clients nous adorent!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: colors.green }}
            >
              <span className="mr-3">🍽️</span>
              Commander
            </button>
            
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
              style={{ backgroundColor: colors.lightGreen, borderColor: colors.green }}
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