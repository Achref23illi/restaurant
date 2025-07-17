import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { menuCategories, type MenuItem } from '../data/menuDataI18n';

import colors from '../config/colors';

function moveGriotLast(items: MenuItem[]): MenuItem[] {
  const index = items.findIndex((item) => item?.nameKey === 'menu.items.griotPorc.name');
  if (index !== -1) {
    const [griot] = items.splice(index, 1);
    items.push(griot);
  }
  return items;
}

gsap.registerPlugin(ScrollTrigger);

export default function Menu() {
  const { t } = useTranslation();
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(() =>
    moveGriotLast(menuCategories.flatMap(cat => cat.items))
  );

  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (filterRef.current && !isMobile) {
        const rect = filterRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 80);
      }
    };

    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // Reset sticky when switching to mobile
      if (mobile) {
        setIsSticky(false);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  useGSAP(() => {
    // Animation d'entrée
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: menuRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(filterRef.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: menuRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animation des cartes menu
    gsap.fromTo(".menu-item",
      { opacity: 0, y: 30, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  const handleCategoryFilter = (categoryId: string) => {
    setActiveCategory(categoryId);
    
    // Animation de sortie
    gsap.to(".menu-item", {
      opacity: 0,
      y: -20,
      scale: 0.95,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.in",
      onComplete: () => {
        // Filtrer les items
        if (categoryId === 'all') {
          setFilteredItems(moveGriotLast(menuCategories.flatMap(cat => cat.items)));
        } else {
          const category = menuCategories.find(cat => cat.id === categoryId);
          setFilteredItems(category ? moveGriotLast([...category.items]) : []);
        }
        
        // Animation d'entrée après filtrage
        setTimeout(() => {
          gsap.fromTo(".menu-item",
            { opacity: 0, y: 30, scale: 0.95 },
            { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              duration: 0.5,
              stagger: 0.08,
              ease: "power3.out"
            }
          );
        }, 100);
      }
    });
  };

  const allItems = menuCategories.flatMap(category => category.items);

  const categories = [
    { id: 'all', name: t('menu.categories.all') || 'All dishes', count: allItems.length },
    ...menuCategories.map(category => ({
      id: category.id,
      name: t(category.nameKey),
      count: category.items.length
    }))
  ];

  return (
    <section id="menu" ref={menuRef} className="py-20 px-6 min-h-screen" style={{ backgroundColor: colors.background }}>
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

        {/* Filtres */}
        <div 
          ref={filterRef}
          className={`transition-all duration-300 ${
            isSticky && !isMobile ? 'md:sticky md:top-20 md:z-40 bg-white/95 backdrop-blur-md shadow-lg' : ''
          }`}
        >
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryFilter(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeCategory === category.id
                      ? 'text-white shadow-lg scale-105'
                      : 'text-gray-600 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                  style={{
                    backgroundColor: activeCategory === category.id ? colors.green : 'white',
                  }}
                >
                  {category.name}
                  <span className="ml-2 text-sm opacity-75">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grille des plats */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const isSpecialItem = item.category === 'special';
            return (
            <div
              key={item.id}
              className={`menu-item group rounded-2xl overflow-hidden border transition-all duration-300 transform hover:-translate-y-1 ${
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
                  <p 
                    className={`text-sm leading-relaxed line-clamp-2 ${
                      isSpecialItem ? 'font-medium' : ''
                    }`}
                    style={{ 
                      color: isSpecialItem ? colors.text : '#6B7280'
                    }}
                  >
                    {t(item.descriptionKey)}
                  </p>
                </div>
                
                {/* Price */}
                <div className="pt-3 border-t border-gray-100">
                  <span className="text-xl font-bold" style={{ color: colors.secondary }}>
                    ${item.price.toFixed(2)} CA
                  </span>
                </div>

                {/* Extras */}
                {item.extras && item.extras.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <h4 className="text-sm font-semibold mb-2" style={{ color: colors.darkGreen }}>
                      {t('menu.extras.title')}:
                    </h4>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      {item.extras.map((extra) => (
                        <div key={extra.id} className="flex justify-between items-center">
                          <span className="text-gray-600">{t(extra.nameKey)}</span>
                          <span className="font-semibold" style={{ color: colors.secondary }}>
                            +${extra.price.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            );
          })}
        </div>

        {/* Section promotion */}
        <div className="mt-20 text-center">
          <div 
            className="rounded-3xl p-12 text-white relative overflow-hidden"
            style={{ 
              background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.green} 100%)` 
            }}
          >
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">
                {t('menu.orderNow')}
              </h3>
              <p className="text-xl mb-8 opacity-90">
                {t('menu.orderSubtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  className="px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105"
                  style={{ 
                    backgroundColor: colors.darkGreen,
                    color: 'white'
                  }}
                >
                  <span className="mr-2">🍽️</span>
                  {t('menu.orderButton')}
                </button>
                <button 
                  className="bg-white rounded-full font-bold text-lg px-8 py-4 transition-colors duration-300 transform hover:scale-105"
                  style={{ color: colors.secondary }}
                >
                  {t('menu.viewAllOptions')}
                </button>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
