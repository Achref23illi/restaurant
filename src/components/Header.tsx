import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
import { assets } from '../config/assets';

gsap.registerPlugin(ScrollToPlugin);

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLUListElement>(null);
  const orderButtonsRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

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
      const scrolled = window.scrollY > 20;
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      gsap.to(headerRef.current, {
        backgroundColor: scrolled ? 'rgba(254, 250, 240, 0.95)' : 'rgba(254, 250, 240, 1)',
        boxShadow: scrolled ? '0 4px 20px rgba(139, 69, 19, 0.1)' : '0 1px 3px rgba(139, 69, 19, 0.05)',
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
        duration: 0.3,
        ease: "power2.out"
      });

      // Removed floating buttons logic
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  // Animations de hover pour les liens
  const handleNavHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      color: "#8B4513",
      duration: 0.2,
      ease: "power2.out"
    });
  };

  const handleNavLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      color: "#654321",
      duration: 0.2,
      ease: "power2.out"
    });
  };

  // Navigation avec animation smooth
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      const headerHeight = headerRef.current?.offsetHeight || 80;
      const targetPosition = targetSection.offsetTop - headerHeight;
      
      // Animation de scroll smooth avec GSAP
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: targetPosition,
          autoKill: true
        },
        ease: "power2.inOut"
      });

      // Animation du lien cliqué
      gsap.fromTo(e.currentTarget, 
        { scale: 1 },
        { 
          scale: 0.95, 
          duration: 0.1, 
          yoyo: true, 
          repeat: 1,
          ease: "power2.inOut"
        }
      );
    }
  };

  return (
    <>
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ 
        background: 'rgba(254, 250, 240, 1)',
        boxShadow: '0 1px 3px rgba(139, 69, 19, 0.05)'
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center relative">
        {/* Logo */}
        <div 
          ref={logoRef}
          className="flex items-center cursor-pointer group"
        >
          <div className="w-16 h-16 transform group-hover:scale-105 transition-transform duration-300">
            <img 
              src={assets.logo} 
              alt="Restaurant Maman Jeanne Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <ul ref={navItemsRef} className="hidden md:flex items-center space-x-8">
          <li>
            <a 
              href="#home" 
              className="text-sm font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:transition-all after:duration-300 hover:after:w-full nav-underline"
              style={{ 
                color: '#654321',
              }}
              onMouseEnter={handleNavHover}
              onMouseLeave={handleNavLeave}
              onClick={(e) => handleNavClick(e, 'home')}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              className="text-sm font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:transition-all after:duration-300 hover:after:w-full nav-underline"
              style={{ 
                color: '#654321',
              }}
              onMouseEnter={handleNavHover}
              onMouseLeave={handleNavLeave}
              onClick={(e) => handleNavClick(e, 'about')}
            >
              About Us
            </a>
          </li>
          <li>
            <a 
              href="#menu" 
              className="text-sm font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:transition-all after:duration-300 hover:after:w-full nav-underline"
              style={{ 
                color: '#654321',
              }}
              onMouseEnter={handleNavHover}
              onMouseLeave={handleNavLeave}
              onClick={(e) => handleNavClick(e, 'menu')}
            >
              Our Menus
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className="text-sm font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:transition-all after:duration-300 hover:after:w-full nav-underline"
              style={{ 
                color: '#654321',
              }}
              onMouseEnter={handleNavHover}
              onMouseLeave={handleNavLeave}
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              Contact Us
            </a>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Order Buttons */}
        <div ref={orderButtonsRef} className="hidden md:flex items-center space-x-3">
          <a 
            href={assets.uberEatsLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center px-4 py-2 bg-black hover:bg-gray-800 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 transform"
            aria-label="Order from Uber Eats"
          >
            <img src={assets.uberEatsLogo} alt="Uber Eats" className="h-5 w-auto brightness-0 invert" style={{maxWidth: '80px'}} />
          </a>
          <a
            href={assets.doorDashLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-medium text-sm hover:from-red-600 hover:to-red-700 transition-all duration-300 hover:shadow-lg hover:scale-105 transform"
            aria-label="Order from DoorDash"
          >
            <img src={assets.doorDashLogo} alt="" className="w-5 h-5 brightness-0 invert" />
            <span>DoorDash</span>
          </a>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-xl">
            <ul className="flex flex-col items-center space-y-4 py-4">
              <li>
                <a
                  href="#home"
                  className="text-sm font-medium"
                  style={{ color: '#654321' }}
                  onClick={(e) => {
                    setIsMenuOpen(false);
                    handleNavClick(e, 'home');
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-sm font-medium"
                  style={{ color: '#654321' }}
                  onClick={(e) => {
                    setIsMenuOpen(false);
                    handleNavClick(e, 'about');
                  }}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  className="text-sm font-medium"
                  style={{ color: '#654321' }}
                  onClick={(e) => {
                    setIsMenuOpen(false);
                    handleNavClick(e, 'menu');
                  }}
                >
                  Our Menus
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-sm font-medium"
                  style={{ color: '#654321' }}
                  onClick={(e) => {
                    setIsMenuOpen(false);
                    handleNavClick(e, 'contact');
                  }}
                >
                  Contact Us
                </a>
              </li>
              <div className="w-full h-px bg-gray-200 my-2"></div>
              <li className="w-full px-4">
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
              <li className="w-full px-4">
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
        )}
      </nav>
    </header>

    {/* Order Popup */}
    {showPopup && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowPopup(false)}
        />
        
        {/* Popup Content */}
        <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full animate-fadeInUp">
          {/* Close Button */}
          <button
            onClick={() => setShowPopup(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close popup"
          >
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Content */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4" style={{color: '#654321'}}>Commandez en ligne!</h2>
            <p className="text-gray-600 mb-6">Faites-vous livrer vos plats préférés directement chez vous</p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
          </div>
        </div>
      </div>
    )}
    </>
  );
}
