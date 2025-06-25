import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { assets } from '../config/assets';
import colors from '../config/colors';

export default function Footer() {
  const { t } = useTranslation();
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animation d'entrée du footer
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
    <footer ref={footerRef} className="text-white py-16 px-6" style={{ backgroundColor: colors.primary }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src={assets.logo}
                alt="Chez Maman Jeanne Logo" 
                className="h-12 w-auto"
              />
              <div>
                <h3 className="text-xl font-bold">{t('restaurant.name')}</h3>
                <p className="text-sm opacity-75">{t('restaurant.tagline')}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed opacity-90">
              {t('footer.description')}
            </p>
          </div>

          {/* Horaires */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">{t('footer.hours.title')}</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>{t('footer.hours.mondayThursday')}</span>
                <span className="opacity-75">{t('footer.hours.mondayThursdayTime')}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('footer.hours.fridaySaturday')}</span>
                <span className="opacity-75">{t('footer.hours.fridaySaturdayTime')}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('footer.hours.sunday')}</span>
                <span className="opacity-75">{t('footer.hours.sundayTime')}</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">{t('footer.contact.title')}</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <span className="text-lg">📍</span>
                <span className="opacity-90">{t('footer.contact.address')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-lg">📞</span>
                <a href="tel:+15147651234" className="opacity-90 hover:opacity-100 transition-opacity">
                  {t('footer.contact.phone')}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-lg">✉️</span>
                <a href="mailto:info@chezmamanjean.com" className="opacity-90 hover:opacity-100 transition-opacity">
                  {t('footer.contact.email')}
                </a>
              </div>
            </div>
          </div>

          {/* Commandes */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">{t('footer.orderOnline.title')}</h4>
            <div className="space-y-3">
              <button
                className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 text-white"
                style={{ backgroundColor: colors.green }}
              >
                <span className="mr-2">🍽️</span>
                {t('footer.orderOnline.orderButton')}
              </button>
              
              <a
                href={assets.uberEatsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
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
                className="w-full inline-flex items-center px-4 py-2 rounded-lg hover:bg-white transition-all duration-300 transform hover:scale-105 text-gray-800"
                style={{ backgroundColor: colors.lightGreen }}
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

        {/* Séparateur */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm opacity-75">
              {t('footer.rights')}
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                {t('footer.privacy')}
              </a>
              <a href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                {t('footer.terms')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}