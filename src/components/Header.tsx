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
      
      gsap.to(headerRef.current, {
        backgroundColor: scrolled ? 'rgba(254, 250, 240, 0.95)' : 'rgba(254, 250, 240, 1)',
        boxShadow: scrolled ? '0 4px 20px rgba(139, 69, 19, 0.1)' : '0 1px 3px rgba(139, 69, 19, 0.05)',
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
        duration: 0.3,
        ease: "power2.out"
      });
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
        <div ref={orderButtonsRef} className="hidden md:flex items-center space-x-4">
          <a
            href={assets.uberEatsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden text-white px-5 py-2 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4"
            style={{
              background: 'linear-gradient(135deg, #8B4513, #A0522D)',
            }}
          >
            <span className="relative z-10 flex items-center space-x-2">
              <img src={assets.uberEatsLogo} alt="Uber Eats" className="w-4 h-4" />
              <span>Uber Eats</span>
            </span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, #A0522D, #8B4513)' }}
            ></div>
          </a>
          <a
            href={assets.doorDashLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden text-white px-5 py-2 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4"
            style={{
              background: 'linear-gradient(135deg, #8B4513, #A0522D)',
            }}
          >
            <span className="relative z-10 flex items-center space-x-2">
              <img src={assets.doorDashLogo} alt="DoorDash" className="w-4 h-4" />
              <span>DoorDash</span>
            </span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, #A0522D, #8B4513)' }}
            ></div>
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
              <li>
                <a
                  href={assets.uberEatsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden text-white px-6 py-2 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4"
                  style={{ background: 'linear-gradient(135deg, #8B4513, #A0522D)' }}
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <img src={assets.uberEatsLogo} alt="Uber Eats" className="w-4 h-4" />
                    <span>Uber Eats</span>
                  </span>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(135deg, #A0522D, #8B4513)' }}
                  ></div>
                </a>
              </li>
              <li>
                <a
                  href={assets.doorDashLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden text-white px-6 py-2 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4"
                  style={{ background: 'linear-gradient(135deg, #8B4513, #A0522D)' }}
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <img src={assets.doorDashLogo} alt="DoorDash" className="w-4 h-4" />
                    <span>DoorDash</span>
                  </span>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(135deg, #A0522D, #8B4513)' }}
                  ></div>
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
