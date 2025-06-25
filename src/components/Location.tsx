import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assets } from '../config/assets';

gsap.registerPlugin(ScrollTrigger);

export default function Location() {
  const { t } = useTranslation();
  const locationRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animation du contenu
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: locationRef.current,
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
        delay: 0.3,
        scrollTrigger: {
          trigger: locationRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <section ref={locationRef} className="py-20 px-6" style={{ backgroundColor: '#F5E6D3' }}>
      <div className="max-w-7xl mx-auto">
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Informations de contact */}
          <div className="space-y-8">
            <div>
              <h2 className="text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#8B4513' }}>
                {t('location.title')}
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                {t('location.subtitle')}
              </p>
            </div>

            <div className="space-y-6">
              {/* Adresse */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" 
                     style={{ backgroundColor: '#8B4513' }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2" style={{ color: '#2D1810' }}>{t('location.address.title')}</h3>
                  <p className="text-gray-600">
                    {t('location.address.street')}<br />
                    {t('location.address.city')}<br />
                    {t('location.address.country')}
                  </p>
                </div>
              </div>

              {/* Heures d'ouverture */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" 
                     style={{ backgroundColor: '#8B4513' }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2" style={{ color: '#2D1810' }}>{t('location.hours.title')}</h3>
                  <div className="text-gray-600 space-y-1">
                    <p><span className="font-medium">{t('location.hours.mondayWednesday')}</span> {t('location.hours.mondayWednesdayTime')}</p>
                    <p><span className="font-medium">{t('location.hours.thursday')}</span> {t('location.hours.thursdayTime')}</p>
                    <p><span className="font-medium">{t('location.hours.friday')}</span> {t('location.hours.fridayTime')}</p>
                    <p><span className="font-medium">{t('location.hours.saturday')}</span> {t('location.hours.saturdayTime')}</p>
                    <p><span className="font-medium">{t('location.hours.sunday')}</span> {t('location.hours.sundayTime')}</p>
                  </div>
                </div>
              </div>

              {/* Téléphone */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" 
                     style={{ backgroundColor: '#8B4513' }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2" style={{ color: '#2D1810' }}>{t('location.phone.title')}</h3>
                  <p className="text-gray-600">{t('location.phone.number')}</p>
                </div>
              </div>

              {/* Bouton directions */}
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
                <span>{t('location.directions')}</span>
              </a>
            </div>
          </div>

          {/* Carte Google Maps */}
          <div ref={mapRef} className="h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
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
      </div>
    </section>
  );
}