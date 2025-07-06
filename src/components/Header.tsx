import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';
import { assets } from '../config/assets';
import colors from '../config/colors';
import LanguageSwitcher from './LanguageSwitcher';
import InStoreOrderModal from './InStoreOrderModal';

gsap.registerPlugin(ScrollToPlugin);

export default function Header() {
  const { t } = useTranslation();
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLUListElement>(null);
  const orderButtonsRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOrderPopupOpen, setIsOrderPopupOpen] = useState(false);
  const [isInStoreOrderOpen, setIsInStoreOrderOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Animation d'entrée
  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(headerRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(logoRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.4"
    )
    .fromTo(navItemsRef.current?.children || [],
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      "-=0.3"
    )
    .fromTo(orderButtonsRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
      "-=0.2"
    );
  }, []);

  // Gestion du scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Show popup after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOrderPopupOpen(true);
    }, 3000); // 3 second delay

    return () => clearTimeout(timer);
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
    setIsMenuOpen(false);
  };

  return (
    <>
    <header 
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 mr-8">
            <div className="flex items-center space-x-3">
              <img 
                src={assets.logo}
                alt="Chez Maman Jeanne Logo" 
                className="h-12 w-auto"
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold" style={{ color: colors.primary }}>
                  Chez Maman Jeanne
                </h1>
                <p className="text-sm" style={{ color: colors.secondary }}>
                  {t('restaurant.tagline')}
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="nav-link text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200"
            >
              {t('navigation.home')}
            </button>
            <button 
              onClick={() => scrollToSection('menu')}
              className="nav-link text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200"
            >
              {t('navigation.menu')}
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="nav-link text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200"
            >
              {t('navigation.about')}
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className="nav-link text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200"
            >
              {t('navigation.gallery')}
            </button>
            <button 
              onClick={() => scrollToSection('reviews')}
              className="nav-link text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200"
            >
              {t('navigation.reviews')}
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="nav-link text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200"
            >
              {t('navigation.contact')}
            </button>
            <button 
              onClick={() => scrollToSection('location')}
              className="nav-link text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200"
            >
              {t('navigation.location')}
            </button>
          </div>

          {/* Language Switcher & Order Button */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOrderPopupOpen(true)}
              className="px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:shadow-lg hover:scale-105 transform"
              style={{ backgroundColor: colors.green }}
            >
              {t('order.button')}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              ref={hamburgerRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Order Buttons */}
        <div ref={orderButtonsRef} className="hidden md:flex items-center space-x-3 mt-4">
          {/* <a 
            href={assets.uberEatsLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center px-4 py-2 bg-black hover:bg-gray-800 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 transform"
            aria-label="Order from Uber Eats"
          >
            <img src={assets.uberEatsLogo} alt="Uber Eats" className="h-5 w-auto brightness-0 invert" style={{maxWidth: '80px'}} />
          </a> */}
          {/* <a
            href={assets.doorDashLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-medium text-sm hover:from-red-600 hover:to-red-700 transition-all duration-300 hover:shadow-lg hover:scale-105 transform"
            aria-label="Order from DoorDash"
          >
            <img src={assets.doorDashLogo} alt="" className="w-5 h-5 brightness-0 invert" />
            <span>DoorDash</span>
          </a> */}
        </div>

        {/* Mobile Menu */}
        <div 
          ref={menuRef}
          className={`lg:hidden fixed left-0 right-0 top-[72px] w-full transition-all duration-300 ease-in-out z-[100] ${
            isMenuOpen 
              ? 'max-h-[80vh] opacity-100 mt-0 pointer-events-auto overflow-y-auto' 
              : 'max-h-0 opacity-0 pointer-events-none overflow-hidden'
          }`}
          style={{
            background: 'rgba(255,255,255,0.98)',
            boxShadow: isMenuOpen ? '0 8px 32px rgba(0,0,0,0.12)' : undefined,
            borderRadius: isMenuOpen ? '0 0 1.5rem 1.5rem' : undefined,
          }}
        >
          <div className="bg-transparent rounded-2xl overflow-visible">
            <ul className="py-4">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-orange-600 font-medium transition-colors duration-200"
                >
                  {t('navigation.home')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('menu')}
                  className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-orange-600 font-medium transition-colors duration-200"
                >
                  {t('navigation.menu')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-orange-600 font-medium transition-colors duration-200"
                >
                  {t('navigation.about')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('gallery')}
                  className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-orange-600 font-medium transition-colors duration-200"
                >
                  {t('navigation.gallery')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('reviews')}
                  className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-orange-600 font-medium transition-colors duration-200"
                >
                  {t('navigation.reviews')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-orange-600 font-medium transition-colors duration-200"
                >
                  {t('navigation.contact')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('location')}
                  className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-orange-600 font-medium transition-colors duration-200"
                >
                  {t('navigation.location')}
                </button>
              </li>
              
              {/* Language Switcher for Mobile */}
              <li className="w-full px-4 mt-4">
                <div className="flex justify-center">
                  <LanguageSwitcher />
                </div>
              </li>

              {/* Mobile Order Button */}
              <li className="w-full px-4 mt-4">
                <button
                  onClick={() => setIsOrderPopupOpen(true)}
                  className="flex items-center justify-center w-full px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg active:scale-95 transform font-medium text-white"
                  style={{ backgroundColor: colors.green }}
                >
                  {t('order.button')}
                </button>
              </li>
              <li className="w-full px-4 mt-6">
                <a
                  href={assets.uberEatsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full px-6 py-3 bg-black hover:bg-gray-800 rounded-lg transition-all duration-300 hover:shadow-lg active:scale-95 transform"
                  aria-label="Order from Uber Eats"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <img src={assets.uberEatsLogo} alt="Uber Eats" className="h-6 w-auto brightness-0 invert" style={{maxWidth: '120px'}} />
                </a>
              </li>
              <li className="w-full px-4 mt-4">
                <a
                  href={assets.doorDashLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 hover:shadow-lg active:scale-95 transform"
                  aria-label="Order from DoorDash"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <img src={assets.doorDashLogo} alt="" className="w-6 h-6 brightness-0 invert" />
                  <span>Order on DoorDash</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    {/* Order Popup */}
    {isOrderPopupOpen && (
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={() => setIsOrderPopupOpen(false)}
      >
        <div 
          className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 transform animate-in"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.lightGreen }}>
              <span className="text-2xl">🍽️</span>
            </div>
            <h2 className="text-2xl font-bold mb-4" style={{color: colors.text}}>{t('order.popup.title')}</h2>
            <p className="text-gray-600 mb-6">{t('order.popup.subtitle')}</p>
            
            {/* Internal Order Options */}
            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-2xl" style={{ backgroundColor: colors.background }}>
                <h3 className="font-semibold mb-3" style={{color: colors.primary}}>{t('order.popup.directOrder')}</h3>
                <div className="flex flex-col gap-2">
                  <a 
                    href="tel:+15147651234" 
                    className="inline-flex items-center justify-center px-4 py-2 rounded-full font-medium text-white transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: colors.green }}
                  >
                    <span className="mr-2">📞</span>
                    {t('order.popup.callToOrder')}
                  </a>
                  <button 
                    onClick={() => {
                      console.log('Order in Store button clicked');
                      setIsOrderPopupOpen(false);
                      setIsInStoreOrderOpen(true);
                      console.log('InStoreOrder state set to true');
                    }}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-full font-medium text-white transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: colors.darkGreen }}
                  >
                    <span className="mr-2">🏪</span>
                    {t('order.popup.orderInStore')}
                  </button>
                </div>
              </div>
            </div>

            {/* Delivery Options */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg" style={{color: colors.primary}}>{t('order.popup.delivery')}</h3>
              
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
              onClick={() => setIsOrderPopupOpen(false)}
              className="mt-6 px-6 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 transition-colors duration-200"
            >
              {t('order.popup.close')}
            </button>
          </div>
        </div>
      </div>
    )}

    {/* In-Store Order Modal */}
    <InStoreOrderModal 
      isOpen={isInStoreOrderOpen}
      onClose={() => setIsInStoreOrderOpen(false)}
    />
    </>
  );
}
