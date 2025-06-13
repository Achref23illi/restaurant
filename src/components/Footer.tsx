import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { assets } from '../config/assets';

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animation d'entr�e du footer
    gsap.fromTo(footerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <footer ref={footerRef} className="py-16 px-6" style={{ backgroundColor: '#1F1611' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Logo et description */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-4">
              <img 
                src={assets.logo} 
                alt="Chez Maman Jeanne Logo" 
                className="w-16 h-16 object-contain"
              />
              <h3 className="text-3xl font-bold text-white">Chez Maman Jeanne</h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              Chez Maman Jeanne, nous vous proposons les saveurs riches et variées de la cuisine 
              congolaise africaine et créole haïtienne. Notre menu est une fusion de plats 
              traditionnels, préparés avec des ingrédients authentiques et assaisonnés avec amour, 
              comme à la maison.
            </p>
            
            {/* R�seaux sociaux et commandes */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-lg">Commandez en ligne</h4>
              <div className="flex flex-wrap gap-4">
                <a
                  href={assets.uberEatsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                >
                  <img 
                    src={assets.uberEatsLogo}
                    alt="UberEats"
                    className="h-5 w-auto brightness-0 invert"
                  />
                </a>
                
                <a
                  href={assets.doorDashLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-white transition-all duration-300 transform hover:scale-105"
                >
                  <img 
                    src={assets.doorDashLogo}
                    alt="DoorDash"
                    className="h-5 w-5 mr-2"
                  />
                  DoorDash
                </a>
              </div>
            </div>
          </div>

          {/* Informations de contact */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold text-xl">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-gray-300">
                    2357 Jolicoeur St<br />
                    Montreal, Quebec H4E 1X9
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-orange-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a 
                  href="tel:+15143543811" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  +1 514-354-3811
                </a>
              </div>
            </div>
          </div>

          {/* Heures d'ouverture */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold text-xl">Heures d'ouverture</h4>
            <div className="space-y-2 text-gray-300">
              <p><span className="text-white">Lun - Mer:</span> 11 AM - 10 PM</p>
              <p><span className="text-white">Jeudi:</span> 11 AM - 10 PM</p>
              <p><span className="text-white">Vendredi:</span> 11 AM - 11 PM</p>
              <p><span className="text-white">Samedi:</span> 12 PM - 11 PM</p>
              <p><span className="text-white">Dimanche:</span> 12 PM - 10 PM</p>
            </div>
          </div>
        </div>

        {/* Section Google Reviews */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="text-center">
            <h4 className="text-white font-semibold text-lg mb-4">Laissez-nous un avis</h4>
            <a
              href="https://g.co/kgs/Q3zFq49"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-orange-600 to-yellow-600 text-white rounded-full font-medium hover:from-orange-700 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor"/>
              </svg>
              <span>Evaluez-nous sur Google</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Chez Maman Jeanne. Tous droits reserves. 
            <span className="block mt-2 text-sm">
              Cuisine congolaise africaine et creole haitienne • Montreal, Quebec
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
} 