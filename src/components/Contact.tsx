import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assets } from '../config/assets';
import colors from '../config/colors';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { t } = useTranslation();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const contactRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

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

    if (contactRef.current) observer.observe(contactRef.current);
    if (titleRef.current) observer.observe(titleRef.current);
    if (cardsRef.current) observer.observe(cardsRef.current);
    if (headerRef.current) observer.observe(headerRef.current);
    if (contentRef.current) observer.observe(contentRef.current);
    if (mapRef.current) observer.observe(mapRef.current);

    return () => observer.disconnect();
  }, []);

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
    <section 
      ref={contactRef}
      className="py-20 px-6 relative"
      style={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.darkGreen} 100%)`
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Contact Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Informations de contact */}
          <div className="space-y-6">
            {/* Téléphone */}
            <div className="contact-item p-6 rounded-2xl border backdrop-blur-sm" 
                 style={{ 
                   backgroundColor: `${colors.lightGreen}40`,
                   borderColor: `${colors.green}60`
                 }}>
              <h3 className="font-semibold text-2xl mb-4 text-white">{t('contact.phone.title')}</h3>
              <p className="text-gray-300 mb-4">
                {t('contact.phone.description')}
              </p>
              <a 
                href="tel:+15147651234" 
                className="inline-flex items-center px-6 py-3 rounded-full font-medium text-white transition-all duration-300 transform hover:scale-105"
                style={{ backgroundColor: colors.green }}
              >
                {t('contact.phone.button')}
              </a>
            </div>

            {/* Adresse */}
            <div className="contact-item p-6 rounded-2xl border backdrop-blur-sm"
                 style={{ 
                   backgroundColor: `${colors.accent}20`,
                   borderColor: `${colors.accent}40`
                 }}>
              <h3 className="font-semibold text-2xl mb-4 text-white">{t('contact.address.title')}</h3>
              <p className="text-gray-300 mb-4">
                {t('contact.address.street')}<br />
                {t('contact.address.city')}<br />
                {t('contact.address.country')}
              </p>
              <a
                href={assets.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-full font-medium text-white transition-all duration-300 transform hover:scale-105"
                style={{ backgroundColor: colors.secondary }}
              >
                {t('contact.address.button')}
              </a>
            </div>

            {/* Horaires */}
            <div className="contact-item p-6 rounded-2xl border backdrop-blur-sm"
                 style={{ 
                   backgroundColor: `${colors.primary}40`,
                   borderColor: `${colors.text}40`
                 }}>
              <h3 className="font-semibold text-2xl mb-4 text-white">{t('contact.hours.title')}</h3>
              <div className="text-gray-300 space-y-2">
                <div className="flex justify-between">
                  <span>{t('contact.hours.mondayThursday')}</span>
                  <span>{t('contact.hours.mondayThursdayTime')}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('contact.hours.fridaySaturday')}</span>
                  <span>{t('contact.hours.fridaySaturdayTime')}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('contact.hours.sunday')}</span>
                  <span>{t('contact.hours.sundayTime')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Options de commande */}
          <div className="space-y-6">
            {/* Commander */}
            <div className="contact-item p-6 rounded-2xl border backdrop-blur-sm"
                 style={{ 
                   backgroundColor: `${colors.green}30`,
                   borderColor: `${colors.green}50`
                 }}>
              <h3 className="font-semibold text-2xl mb-4 text-white">{t('contact.order.title')}</h3>
              <p className="text-gray-300 mb-6">
                {t('contact.order.description')}
              </p>
              <button 
                onClick={() => setIsOrderModalOpen(true)}
                className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-white transition-all duration-300 transform hover:scale-105"
                style={{ backgroundColor: colors.darkGreen }}
              >
                <span className="mr-2">🍽️</span>
                {t('contact.order.viewAllOptions')}
              </button>
            </div>

            {/* Livraison rapide */}
            <div className="contact-item p-6 rounded-2xl border backdrop-blur-sm"
                 style={{ 
                   backgroundColor: `${colors.secondary}20`,
                   borderColor: `${colors.secondary}40`
                 }}>
              <h3 className="font-semibold text-2xl mb-4 text-white">{t('contact.delivery.title')}</h3>
              <p className="text-gray-300 mb-6">
                {t('contact.delivery.description')}
              </p>
              <div className="flex flex-col gap-4">
                <a
                  href={assets.uberEatsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                >
                  <img 
                    src={assets.uberEatsLogo}
                    alt="UberEats"
                    className="h-4 w-auto brightness-0 invert mr-3"
                  />
                  UberEats
                </a>
                
                <a
                  href={assets.doorDashLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 text-gray-800"
                  style={{ backgroundColor: colors.lightGreen }}
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

            {/* Service Traiteur */}
            <div className="contact-item p-6 rounded-2xl border backdrop-blur-sm"
                 style={{ 
                   backgroundColor: `${colors.accent}30`,
                   borderColor: `${colors.accent}50`
                 }}>
              <h3 className="font-semibold text-2xl mb-4 text-white">{t('contact.catering.title')}</h3>
              <p className="text-gray-300 mb-6">
                {t('contact.catering.description')}
              </p>
              <a
                href="tel:+15147651234"
                className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-white transition-all duration-300 transform hover:scale-105"
                style={{ backgroundColor: colors.accent }}
              >
                <span className="mr-2">🎉</span>
                {t('contact.catering.button')}
              </a>
            </div>
          </div>
        </div>

        {/* Carte */}
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2796.8!2d-73.59484!3d45.45722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s2357+Jolicoeur+St%2C+Montreal%2C+QC+H4E+1X9!5e0!3m2!1sen!2sca!4v1641234567890!5m2!1sen!2sca"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Chez Maman Jeanne Location"
          />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full blur-3xl opacity-30" 
           style={{ backgroundColor: colors.green }} />
      <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full blur-3xl opacity-20" 
           style={{ backgroundColor: colors.accent }} />
    </section>

    {/* Order Modal */}
    {isOrderModalOpen && (
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={() => setIsOrderModalOpen(false)}
      >
        <div 
          className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 transform animate-in"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.lightGreen }}>
              <span className="text-2xl">🍽️</span>
            </div>
            <h2 className="text-2xl font-bold mb-4" style={{color: colors.text}}>{t('contact.modal.title')}</h2>
            <p className="text-gray-600 mb-6">{t('contact.modal.subtitle')}</p>
            
            {/* Internal Order Options */}
            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-2xl" style={{ backgroundColor: colors.background }}>
                <h3 className="font-semibold mb-3" style={{color: colors.primary}}>{t('contact.modal.directOrder')}</h3>
                <div className="flex flex-col gap-2">
                  <a 
                    href="tel:+15147651234" 
                    className="inline-flex items-center justify-center px-4 py-2 rounded-full font-medium text-white transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: colors.green }}
                  >
                    <span className="mr-2">📞</span>
                    {t('contact.modal.callToOrder')}
                  </a>
                  <button 
                    onClick={() => scrollToSection('location')}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-full font-medium text-white transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: colors.darkGreen }}
                  >
                    <span className="mr-2">🏪</span>
                    {t('contact.modal.orderInStore')}
                  </button>
                </div>
              </div>
            </div>

            {/* Delivery Options */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg" style={{color: colors.primary}}>{t('contact.modal.delivery')}</h3>
              
              <a 
                href={assets.uberEatsLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center px-6 py-3 bg-black hover:bg-gray-800 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 transform"
                aria-label="Order from Uber Eats"
              >
                <img src={assets.uberEatsLogo} alt="Uber Eats" className="h-5 w-auto brightness-0 invert" style={{maxWidth: '80px'}} />
              </a>
              <a
                href={assets.doorDashLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 hover:shadow-lg hover:scale-105 transform"
                aria-label="Order from DoorDash"
              >
                <img src={assets.doorDashLogo} alt="" className="w-5 h-5 brightness-0 invert" />
                <span>DoorDash</span>
              </a>
            </div>
            
            <button
              onClick={() => setIsOrderModalOpen(false)}
              className="mt-6 px-6 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 transition-colors duration-200"
            >
              {t('contact.modal.close')}
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}