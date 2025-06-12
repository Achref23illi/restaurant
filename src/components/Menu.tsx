import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { menuCategories, type MenuItem, type MenuCategory } from '../data/menuData';

gsap.registerPlugin(ScrollTrigger);

export default function Menu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(() => 
    menuCategories.flatMap(cat => cat.items)
  );

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
          setFilteredItems(menuCategories.flatMap(cat => cat.items));
        } else {
          const category = menuCategories.find(cat => cat.id === categoryId);
          setFilteredItems(category ? category.items : []);
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

  return (
    <section id="menu" ref={menuRef} className="py-20 px-6" style={{ backgroundColor: '#FEF5E7' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#8B4513' }}>
            Notre Menu
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez notre sélection de plats authentiques, préparés avec des ingrédients frais 
            et les recettes traditionnelles de Maman Jeanne.
          </p>
        </div>

        {/* Filtres */}
        <div ref={filterRef} className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleCategoryFilter('all')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === 'all'
                  ? 'text-white shadow-lg transform scale-105'
                  : 'text-gray-600 bg-white hover:bg-gray-50 shadow-md hover:shadow-lg hover:scale-105'
              }`}
              style={{
                background: activeCategory === 'all' 
                  ? 'linear-gradient(135deg, #8B4513, #A0522D)' 
                  : undefined
              }}
            >
              Tous les plats
            </button>
            {menuCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryFilter(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'text-white shadow-lg transform scale-105'
                    : 'text-gray-600 bg-white hover:bg-gray-50 shadow-md hover:shadow-lg hover:scale-105'
                }`}
                style={{
                  background: activeCategory === category.id 
                    ? 'linear-gradient(135deg, #8B4513, #A0522D)' 
                    : undefined
                }}
              >
                {category.name.split('/')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Grille des plats */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="menu-item group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-52">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {item.popular && (
                    <span className="px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded-full">
                      Populaire
                    </span>
                  )}
                  {item.spicy && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
                      🌶️ Épicé
                    </span>
                  )}
                </div>

                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="mb-3">
                  <h3 className="font-semibold text-lg leading-tight mb-1" style={{ color: '#2D1810' }}>
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
                
                {/* Price */}
                <div className="pt-3 border-t border-gray-100">
                  <span className="text-xl font-bold" style={{ color: '#8B4513' }}>
                    ${item.price.toFixed(2)} CA
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section promotion */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">
                Commandez maintenant et profitez de nos saveurs authentiques
              </h3>
              <p className="text-xl mb-8 opacity-90">
                Livraison disponible via UberEats et DoorDash
              </p>
              <button className="bg-white text-[#8B4513] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105">
                Commander maintenant
              </button>
            </div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
