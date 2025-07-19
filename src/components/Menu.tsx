import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  setActiveCategory,
  setSearchQuery,
  toggleSidebar,
  setSidebarOpen,
  toggleFavorite,
  selectFilteredItems,
  selectActiveCategory,
  selectSearchQuery,
  selectSidebarOpen,
  selectCategoriesWithCounts,
  selectFavorites,
} from '../store/slices/menuSlice';
import colors from '../config/colors';
import InStoreOrderModal from './InStoreOrderModal';

gsap.registerPlugin(ScrollTrigger);

export default function Menu() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  
  // Redux state
  const filteredItems = useAppSelector(selectFilteredItems);
  const activeCategory = useAppSelector(selectActiveCategory);
  const searchQuery = useAppSelector(selectSearchQuery);
  const sidebarOpen = useAppSelector(selectSidebarOpen);
  const categories = useAppSelector(selectCategoriesWithCounts);
  const favorites = useAppSelector(selectFavorites);
  
  // Local state
  const [isMobile, setIsMobile] = useState(false);
  const [isOrderPopupOpen, setIsOrderPopupOpen] = useState(false);
  const [isInStoreOrderOpen, setIsInStoreOrderOpen] = useState(false);
  
  // Refs
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (!mobile) {
        dispatch(setSidebarOpen(false));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  // GSAP Animations
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: menuRef.current,
        start: "top 80%",
        once: true
      }
    });

    if (headerRef.current?.children) {
      tl.fromTo(headerRef.current.children, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
      );
    }

    // Animate sidebar
    if (sidebarRef.current) {
      gsap.fromTo(sidebarRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.6, delay: 0.3, ease: "power3.out" }
      );
    }

    // Animate content
    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.5, ease: "power3.out" }
      );
    }
  }, []);

  // Animate items when category changes
  useEffect(() => {
    gsap.fromTo(".menu-item",
      { opacity: 0, y: 20, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.4,
        stagger: 0.05,
        ease: "power3.out"
      }
    );
  }, [filteredItems]);

  const handleCategoryFilter = (categoryId: string) => {
    dispatch(setActiveCategory(categoryId));
    if (isMobile) {
      dispatch(setSidebarOpen(false));
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleToggleFavorite = (itemId: string) => {
    dispatch(toggleFavorite(itemId));
  };

  const clearSearch = () => {
    dispatch(setSearchQuery(''));
  };

  const handleOpenOrder = () => {
    setIsOrderPopupOpen(true);
  };

  return (
    <>
    <section id="menu" ref={menuRef} className="py-20 px-6 min-h-screen relative" style={{ backgroundColor: colors.background }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold mb-6" style={{ color: colors.primary }}>
            {t('menu.title')}
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t('menu.subtitle')}
          </p>
          <div className="mt-8 p-6 rounded-2xl border-2 border-dashed max-w-4xl mx-auto" style={{ borderColor: colors.green, backgroundColor: `${colors.lightGreen}20` }}>
            <p className="text-lg font-medium" style={{ color: colors.darkGreen }}>
              {t('menu.accompaniment')}
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder={t('menu.search') || 'Rechercher un plat...'}
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-12 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:border-transparent transition-all duration-300 text-lg focus:ring-green-500"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear search"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        {isMobile && (
          <div className="mb-6 flex justify-center">
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 text-white shadow-lg flex items-center gap-2"
              style={{ backgroundColor: colors.green }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
              {sidebarOpen ? t('menu.closeMobileMenu') || 'Fermer Menu' : t('menu.openMobileMenu') || 'Ouvrir Menu'}
            </button>
          </div>
        )}

        {/* Main Menu Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:items-start">
          {/* Sidebar */}
          <div 
            ref={sidebarRef}
            className={`lg:w-80 lg:flex-shrink-0 transition-all duration-300 ${
              isMobile 
                ? `${sidebarOpen ? 'block' : 'hidden'} w-full mb-6` 
                : 'block'
            }`}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto lg:z-10">
              <h3 className="text-2xl font-bold mb-6" style={{ color: colors.primary }}>
                {t('menu.categories.title') || 'Catégories'}
              </h3>
              
              {/* Category Statistics */}
              <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: `${colors.lightGreen}20` }}>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>{t('menu.totalItems') || 'Total des plats'}</span>
                  <span className="font-bold" style={{ color: colors.darkGreen }}>{filteredItems.length}</span>
                </div>
                {searchQuery && (
                  <div className="flex justify-between items-center text-sm text-gray-600 mt-1">
                    <span>{t('menu.searchResults') || 'Résultats de recherche'}</span>
                    <span className="font-bold" style={{ color: colors.darkGreen }}>"{searchQuery}"</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryFilter(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-102 ${
                      activeCategory === category.id
                        ? 'text-white shadow-lg scale-102'
                        : 'text-gray-600 bg-gray-50 hover:bg-gray-100 hover:shadow-md'
                    }`}
                    style={{
                      backgroundColor: activeCategory === category.id ? colors.green : 'transparent',
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span>{t(category.name)}</span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        activeCategory === category.id 
                          ? 'bg-white/20 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {category.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Favorites Section */}
              {favorites.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>
                    ❤️ {t('menu.favorites') || 'Favoris'} ({favorites.length})
                  </h4>
                  <button
                    onClick={() => handleCategoryFilter('favorites')}
                    className="w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-102 text-gray-600 bg-red-50 hover:bg-red-100 hover:shadow-md"
                  >
                    {t('menu.showFavorites') || 'Voir mes favoris'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div ref={contentRef} className="flex-1">
            {/* Category Title */}
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>
                {activeCategory === 'all' 
                  ? t('menu.categories.all') || 'Tous les plats'
                  : activeCategory === 'favorites'
                  ? t('menu.favorites') || 'Mes favoris'
                  : t(categories.find(cat => cat.id === activeCategory)?.name || '')
                }
              </h3>
              <p className="text-gray-600">
                {filteredItems.length} {filteredItems.length === 1 ? 'plat' : 'plats'} 
                {searchQuery && ` correspondant à "${searchQuery}"`}
              </p>
            </div>

            {/* Menu Items Grid */}
            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  {t('menu.noResults') || 'Aucun résultat trouvé'}
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchQuery 
                    ? `Aucun plat ne correspond à "${searchQuery}"`
                    : 'Cette catégorie ne contient aucun plat pour le moment'
                  }
                </p>
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="px-6 py-2 rounded-full text-white font-medium transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: colors.green }}
                  >
                    {t('menu.clearSearch') || 'Effacer la recherche'}
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredItems.map((item) => {
                  const isSpecialItem = item.category === 'special';
                  const isFavorite = favorites.includes(item.id);
                  
                  return (
                    <div
                      key={item.id}
                      className={`menu-item group rounded-2xl overflow-hidden border transition-all duration-300 transform hover:-translate-y-1 relative ${
                        isSpecialItem 
                          ? 'border-2 hover:shadow-2xl shadow-xl ring-2' 
                          : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-lg'
                      }`}
                      style={isSpecialItem ? {
                        background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.accent} 30%, ${colors.mintGreen} 100%)`,
                        borderColor: colors.green,
                        boxShadow: `0 10px 25px -5px ${colors.green}20, 0 0 0 1px ${colors.lightGreen}40`,
                      } : {}}
                    >
                      {/* Favorite Button */}
                      <button
                        onClick={() => handleToggleFavorite(item.id)}
                        className={`absolute top-3 right-3 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isFavorite 
                            ? 'bg-red-500 text-white scale-110' 
                            : 'bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white'
                        } shadow-lg backdrop-blur-sm`}
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                      >
                        <svg className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>

                      {/* Image */}
                      <div className="relative overflow-hidden h-48 sm:h-52">
                        <img
                          src={item.image}
                          alt={t(item.nameKey)}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {isSpecialItem && (
                            <span 
                              className="px-3 py-1 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg animate-pulse"
                              style={{ 
                                background: `linear-gradient(45deg, ${colors.darkGreen}, ${colors.green})`,
                              }}
                            >
                              ✨ {t('menu.mystery')}
                            </span>
                          )}
                          {item.popular && !isSpecialItem && (
                            <span 
                              className="px-2 py-1 text-white text-xs font-medium rounded-full"
                              style={{ backgroundColor: colors.green }}
                            >
                              {t('menu.popular')}
                            </span>
                          )}
                          {item.spicy && (
                            <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
                              🌶️ {t('menu.spicy')}
                            </span>
                          )}
                        </div>

                        {/* Subtle overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="mb-3">
                          <h3 
                            className={`font-semibold text-lg leading-tight mb-1 ${
                              isSpecialItem ? 'font-bold text-xl' : ''
                            }`}
                            style={{ 
                              color: isSpecialItem ? colors.darkGreen : colors.primary,
                              ...(isSpecialItem && {
                                textShadow: `1px 1px 2px ${colors.green}40`
                              })
                            }}
                          >
                            {t(item.nameKey)}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {t(item.descriptionKey)}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <span 
                              className={`text-2xl font-bold ${isSpecialItem ? 'text-3xl' : ''}`}
                              style={{ color: isSpecialItem ? colors.darkGreen : colors.green }}
                            >
                              {item.price.toFixed(2)} {item.currency}
                            </span>
                          </div>
                          
                          {/* Order button */}
                          <div className="flex gap-2 items-center">
                            <button
                              onClick={handleOpenOrder}
                              className="px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
                              style={{ backgroundColor: colors.green }}
                            >
                                                             {t('order.button')}
                            </button>
                            
                            <button
                              onClick={() => handleToggleFavorite(item.id)}
                              className={`p-2 rounded-full transition-all duration-300 ${
                                favorites.includes(item.id)
                                  ? 'text-red-500 hover:text-red-600'
                                  : 'text-gray-400 hover:text-red-500'
                              }`}
                              aria-label="Toggle favorite"
                            >
                              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>

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
            <h2 className="text-2xl font-bold mb-4" style={{color: colors.primary}}>{t('order.popup.title')}</h2>
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
                      setIsOrderPopupOpen(false);
                      setIsInStoreOrderOpen(true);
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
                href="https://www.ubereats.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center px-6 py-3 bg-black hover:bg-gray-800 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 transform text-white font-medium"
                aria-label="Order from Uber Eats"
              >
                <span className="mr-2">🚗</span>
                Uber Eats
              </a>
              <a
                href="https://www.doordash.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 hover:shadow-lg hover:scale-105 transform"
                aria-label="Order from DoorDash"
              >
                <span>🚗</span>
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
