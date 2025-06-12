import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { assets } from '../config/assets';

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLUListElement>(null);
  const orderButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    .fromTo(orderButtonRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
      "-=0.2"
    );
  }, []);

  // Gestion du scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
      
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

  // Animation du dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    
    if (!isDropdownOpen) {
      gsap.set(dropdownRef.current, { display: 'flex' });
      gsap.fromTo(dropdownRef.current,
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.7)" }
      );
      gsap.fromTo(dropdownRef.current?.children || [],
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.2, stagger: 0.05, delay: 0.1 }
      );
    } else {
      gsap.to(dropdownRef.current,
        { opacity: 0, y: -10, scale: 0.95, duration: 0.2, ease: "power2.in",
          onComplete: () => gsap.set(dropdownRef.current, { display: 'none' })
        }
      );
    }
  };

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

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ 
        background: 'rgba(254, 250, 240, 1)',
        boxShadow: '0 1px 3px rgba(139, 69, 19, 0.05)'
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
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
        <ul ref={navItemsRef} className="flex items-center space-x-8">
          <li>
            <a 
              href="#" 
              className="text-sm font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:transition-all after:duration-300 hover:after:w-full"
              style={{ 
                color: '#654321',
                '--after-bg': '#8B4513'
              }}
              onMouseEnter={handleNavHover}
              onMouseLeave={handleNavLeave}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="text-sm font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:transition-all after:duration-300 hover:after:w-full"
              style={{ 
                color: '#654321',
                '--after-bg': '#8B4513'
              }}
              onMouseEnter={handleNavHover}
              onMouseLeave={handleNavLeave}
            >
              Our Menus
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="text-sm font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:transition-all after:duration-300 hover:after:w-full"
              style={{ 
                color: '#654321',
                '--after-bg': '#8B4513'
              }}
              onMouseEnter={handleNavHover}
              onMouseLeave={handleNavLeave}
            >
              About Us
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="text-sm font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:transition-all after:duration-300 hover:after:w-full"
              style={{ 
                color: '#654321',
                '--after-bg': '#8B4513'
              }}
              onMouseEnter={handleNavHover}
              onMouseLeave={handleNavLeave}
            >
              Contact Us
            </a>
          </li>
        </ul>

        {/* Order Button with Dropdown */}
        <div className="relative">
          <button
            ref={orderButtonRef}
            onClick={toggleDropdown}
            className="group relative overflow-hidden text-white px-6 py-2 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4"
            style={{
              background: 'linear-gradient(135deg, #8B4513, #A0522D)',
              '--focus-ring-color': 'rgba(139, 69, 19, 0.3)'
            }}
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>Make a Reservation</span>
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, #A0522D, #8B4513)' }}
            ></div>
          </button>

          {/* Dropdown Menu */}
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 hidden flex-col overflow-hidden"
            style={{ display: 'none' }}
          >
            <div className="p-4" style={{ background: 'linear-gradient(135deg, #FEF5E7, #F5E6D3)' }}>
              <h3 className="font-semibold text-center" style={{ color: '#8B4513' }}>Commander via</h3>
            </div>
            
            <a 
              href="https://www.ubereats.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4 px-6 py-4 hover:bg-gray-50 transition-colors duration-200 group"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <img 
                  src={assets.uberEatsLogo}
                  alt="Uber Eats"
                  className="w-8 h-auto"
                />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-800 group-hover:text-black">Uber Eats</div>
                <div className="text-xs text-gray-500">Livraison rapide • 15-30 min</div>
              </div>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            <a 
              href="https://www.doordash.com/store/restaurant-maman-jeanne-inc-montr%C3%A9al-31548079/45475549/" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4 px-6 py-4 hover:bg-gray-50 transition-colors duration-200 group border-t border-gray-100"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <img 
                  src={assets.doorDashLogo}
                  alt="DoorDash"
                  className="w-8 h-8"
                />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-800 group-hover:text-black">DoorDash</div>
                <div className="text-xs text-gray-500">Service premium • 20-35 min</div>
              </div>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
