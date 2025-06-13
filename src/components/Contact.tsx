import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assets } from '../config/assets';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const contactRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animation du header
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animation du contenu
    gsap.fromTo(".contact-item",
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animation de la carte
    gsap.fromTo(mapRef.current,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.4,
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <section id="contact" ref={contactRef} className="py-20 px-6" style={{ backgroundColor: '#2D1810' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-white">
            Contactez-Nous
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Nous sommes là pour vous servir ! N'hésitez pas à nous contacter pour toute question 
            ou pour passer votre commande directement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Informations de contact */}
          <div ref={contentRef} className="space-y-8">
            
            {/* Adresse */}
            <div className="contact-item flex items-start space-x-6 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0" 
                   style={{ backgroundColor: '#8B4513' }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-2xl mb-3 text-white">Notre Adresse</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  2357 Jolicoeur St<br />
                  Montreal, Quebec H4E 1X9<br />
                  Canada
                </p>
                <a
                  href={assets.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-4 text-orange-400 hover:text-orange-300 transition-colors duration-300 text-sm font-medium"
                >
                  <span>Voir sur Google Maps</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Téléphone */}
            <div className="contact-item flex items-start space-x-6 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0" 
                   style={{ backgroundColor: '#8B4513' }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-2xl mb-3 text-white">Téléphone</h3>
                <a 
                  href="tel:+15143543811" 
                  className="text-gray-300 text-lg hover:text-white transition-colors duration-300"
                >
                  +1 514-354-3811
                </a>
                <p className="text-gray-400 text-sm mt-2">
                  Appelez pour passer commande ou pour toute information
                </p>
              </div>
            </div>

            {/* Heures d'ouverture */}
            <div className="contact-item flex items-start space-x-6 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0" 
                   style={{ backgroundColor: '#8B4513' }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-2xl mb-3 text-white">Heures d'Ouverture</h3>
                <div className="text-gray-300 space-y-1">
                  <p><span className="font-medium text-white">Lundi - Mercredi:</span> 11 AM - 10 PM</p>
                  <p><span className="font-medium text-white">Jeudi:</span> 11 AM - 10 PM</p>
                  <p><span className="font-medium text-white">Vendredi:</span> 11 AM - 11 PM</p>
                  <p><span className="font-medium text-white">Samedi:</span> 12 PM - 11 PM</p>
                  <p><span className="font-medium text-white">Dimanche:</span> 12 PM - 10 PM</p>
                </div>
              </div>
            </div>

            {/* Commandes en ligne */}
            <div className="contact-item p-6 bg-gradient-to-r from-orange-600/20 to-yellow-600/20 backdrop-blur-sm rounded-2xl border border-orange-400/30">
              <h3 className="font-semibold text-2xl mb-4 text-white">Commandez en Ligne</h3>
              <p className="text-gray-300 mb-6">
                Commandez facilement via nos partenaires de livraison
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={assets.uberEatsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                >
                  <img 
                    src={assets.uberEatsLogo}
                    alt="UberEats"
                    className="h-4 w-auto brightness-0 invert"
                  />
                </a>
                
                <a
                  href={assets.doorDashLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-800 rounded-full font-medium hover:bg-white transition-all duration-300 transform hover:scale-105"
                >
                  <img 
                    src={assets.doorDashLogo}
                    alt="DoorDash"
                    className="h-4 w-4 mr-3"
                  />
                  DoorDash
                </a>
              </div>
            </div>
          </div>

          {/* Carte */}
          <div ref={mapRef} className="h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2796.1611183651!2d-73.56957668444268!3d45.50168887910128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc9111e3b2167bd%3A0x7c2c1a172184714c!2sChez%20Maman%20Jeanne!5e0!3m2!1sen!2sca!4v1639000000000!5m2!1sen!2sca"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Section finale */}
        <div className="mt-16 text-center">
          <div className="p-8 bg-gradient-to-r from-orange-600/10 to-yellow-600/10 backdrop-blur-sm rounded-3xl border border-orange-400/20">
            <h3 className="text-3xl font-bold mb-4 text-white">
              Venez Nous Rendre Visite !
            </h3>
            <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
              Découvrez l'atmosphère chaleureuse de Chez Maman Jeanne et savourez nos plats 
              authentiques dans un cadre convivial.
            </p>
            <a
              href={assets.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: '#8B4513' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <span>Obtenir les Directions</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}