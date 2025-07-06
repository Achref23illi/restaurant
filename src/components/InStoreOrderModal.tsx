import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import colors from '../config/colors';
// import { menuCategories as menuCategoriesI18n, MenuItem } from '../data/menuDataI18n';

interface MenuItem {
  id: string;
  nameKey: string;
  descriptionKey: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  popular?: boolean;
  spicy?: boolean;
}

interface MenuCategory {
  id: string;
  nameKey: string;
  items: MenuItem[];
}

interface OrderItem extends MenuItem {
  quantity: number;
}

interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  notes: string;
}

interface InStoreOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InStoreOrderModal({ isOpen, onClose }: InStoreOrderModalProps) {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Debug logging
  console.log('InStoreOrderModal render - isOpen:', isOpen);

  // Complete menu data (since we can't import it)
  const menuCategoriesI18n: MenuCategory[] = [
    {
      id: 'special',
      nameKey: 'menu.categories.special',
      items: [
        {
          id: 'special-1',
          nameKey: 'menu.items.threePoutines.name',
          descriptionKey: 'menu.items.threePoutines.description',
          price: 35.00,
          currency: 'CAD',
          image: '/images/threepoutine.png',
          category: 'special',
          popular: true
        }
      ]
    },
    {
      id: 'featured',
      nameKey: 'menu.categories.featured',
      items: [
        {
          id: '1',
          nameKey: 'menu.items.griotPorc.name',
          descriptionKey: 'menu.items.griotPorc.description',
          price: 17.00,
          currency: 'CAD',
          image: '/images/griot_porc.avif',
          category: 'featured',
          popular: true
        },
        {
          id: '2',
          nameKey: 'menu.items.tassotBoeuf.name',
          descriptionKey: 'menu.items.tassotBoeuf.description',
          price: 20.00,
          currency: 'CAD',
          image: '/images/beef_tassot.avif',
          category: 'featured',
          popular: true
        },
        {
          id: '3',
          nameKey: 'menu.items.fritaille.name',
          descriptionKey: 'menu.items.fritaille.description',
          price: 20.00,
          currency: 'CAD',
          image: '/images/fritaille.avif',
          category: 'featured',
          popular: true
        }
      ]
    },
    {
      id: 'plats-africains',
      nameKey: 'menu.categories.african',
      items: [
        {
          id: '4',
          nameKey: 'menu.items.goat.name',
          descriptionKey: 'menu.items.goat.description',
          price: 24.00,
          currency: 'CAD',
          image: '/images/goat.avif',
          category: 'plats-africains'
        },
        {
          id: '5',
          nameKey: 'menu.items.halfChicken.name',
          descriptionKey: 'menu.items.halfChicken.description',
          price: 23.00,
          currency: 'CAD',
          image: '/images/half_chicken.avif',
          category: 'plats-africains'
        },
        {
          id: '6',
          nameKey: 'menu.items.thomsonFish.name',
          descriptionKey: 'menu.items.thomsonFish.description',
          price: 24.00,
          currency: 'CAD',
          image: '/images/thomson_fish.avif',
          category: 'plats-africains'
        },
        {
          id: '7',
          nameKey: 'menu.items.eightChickenWings.name',
          descriptionKey: 'menu.items.eightChickenWings.description',
          price: 18.00,
          currency: 'CAD',
          image: '/images/eight_chicken_wings.avif',
          category: 'plats-africains'
        },
        {
          id: '8',
          nameKey: 'menu.items.twoMakayabus.name',
          descriptionKey: 'menu.items.twoMakayabus.description',
          price: 26.00,
          currency: 'CAD',
          image: '/images/two_Makayabus.avif',
          category: 'plats-africains'
        }
      ]
    },
    {
      id: 'plats-creoles',
      nameKey: 'menu.categories.creole',
      items: [
        {
          id: '9',
          nameKey: 'menu.items.goatTassot.name',
          descriptionKey: 'menu.items.goatTassot.description',
          price: 20.00,
          currency: 'CAD',
          image: '/images/goat_tassot.avif',
          category: 'plats-creoles'
        },
        {
          id: '10',
          nameKey: 'menu.items.vegetables.name',
          descriptionKey: 'menu.items.vegetables.description',
          price: 22.00,
          currency: 'CAD',
          image: '/images/salad_of_the_moment.avif',
          category: 'plats-creoles'
        },
        {
          id: '11',
          nameKey: 'menu.items.chicken.name',
          descriptionKey: 'menu.items.chicken.description',
          price: 17.00,
          currency: 'CAD',
          image: '/images/chicken.avif',
          category: 'plats-creoles'
        },
        {
          id: '12',
          nameKey: 'menu.items.madesu.name',
          descriptionKey: 'menu.items.madesu.description',
          price: 19.00,
          currency: 'CAD',
          image: '/images/Madesu.avif',
          category: 'plats-creoles'
        },
        {
          id: '13',
          nameKey: 'menu.items.tilapia.name',
          descriptionKey: 'menu.items.tilapia.description',
          price: 22.00,
          currency: 'CAD',
          image: '/images/tilapia.avif',
          category: 'plats-creoles'
        },
        {
          id: '14',
          nameKey: 'menu.items.tilapiaV2.name',
          descriptionKey: 'menu.items.tilapiaV2.description',
          price: 26.00,
          currency: 'CAD',
          image: '/images/tilapia.avif',
          category: 'plats-creoles'
        },
        {
          id: '15',
          nameKey: 'menu.items.brokenChicken.name',
          descriptionKey: 'menu.items.brokenChicken.description',
          price: 18.00,
          currency: 'CAD',
          image: '/images/pouletbrise.jpg',
          category: 'plats-creoles'
        }
      ]
    },
    {
      id: 'entrees',
      nameKey: 'menu.categories.entrees',
      items: [
        {
          id: '16',
          nameKey: 'menu.items.chickenWings4.name',
          descriptionKey: 'menu.items.chickenWings4.description',
          price: 8.00,
          currency: 'CAD',
          image: '/images/eight_chicken_wings.avif',
          category: 'entrees'
        },
        {
          id: '17',
          nameKey: 'menu.items.samosas.name',
          descriptionKey: 'menu.items.samosas.description',
          price: 5.00,
          currency: 'CAD',
          image: '/images/two_Makayabus.avif',
          category: 'entrees'
        },
        {
          id: '18',
          nameKey: 'menu.items.saladMoment.name',
          descriptionKey: 'menu.items.saladMoment.description',
          price: 5.00,
          currency: 'CAD',
          image: '/images/salad_of_the_moment.avif',
          category: 'entrees'
        }
      ]
    },
    {
      id: 'viandes-poissons',
      nameKey: 'menu.categories.meat',
      items: [
        {
          id: '19',
          nameKey: 'menu.items.makayabu.name',
          descriptionKey: 'menu.items.makayabu.description',
          price: 16.00,
          currency: 'CAD',
          image: '/images/two_Makayabus.avif',
          category: 'viandes-poissons'
        },
        {
          id: '20',
          nameKey: 'menu.items.chickenDrumsticks.name',
          descriptionKey: 'menu.items.chickenDrumsticks.description',
          price: 13.00,
          currency: 'CAD',
          image: '/images/chicken.avif',
          category: 'viandes-poissons'
        },
        {
          id: '21',
          nameKey: 'menu.items.chickenWings.name',
          descriptionKey: 'menu.items.chickenWings.description',
          price: 10.00,
          currency: 'CAD',
          image: '/images/eight_chicken_wings.avif',
          category: 'viandes-poissons'
        },
        {
          id: '22',
          nameKey: 'menu.items.tilapiaFish.name',
          descriptionKey: 'menu.items.tilapiaFish.description',
          price: 16.00,
          currency: 'CAD',
          image: '/images/tilapia.avif',
          category: 'viandes-poissons'
        },
        {
          id: '23',
          nameKey: 'menu.items.thomsonFishMeat.name',
          descriptionKey: 'menu.items.thomsonFishMeat.description',
          price: 16.00,
          currency: 'CAD',
          image: '/images/thomson_fish.avif',
          category: 'viandes-poissons'
        },
        {
          id: '24',
          nameKey: 'menu.items.brokenFish.name',
          descriptionKey: 'menu.items.brokenFish.description',
          price: 19.00,
          currency: 'CAD',
          image: '/images/poissonbrise.jpg',
          category: 'viandes-poissons'
        }
      ]
    },
    {
      id: 'sides',
      nameKey: 'menu.categories.sides',
      items: [
        {
          id: '25',
          nameKey: 'menu.items.macaroniSalad.name',
          descriptionKey: 'menu.items.macaroniSalad.description',
          price: 11.00,
          currency: 'CAD',
          image: '/images/Macaroni-Salad.jpg',
          category: 'sides'
        },
        {
          id: '26',
          nameKey: 'menu.items.stickyRice.name',
          descriptionKey: 'menu.items.stickyRice.description',
          price: 8.00,
          currency: 'CAD',
          image: '/images/rizcolle.jpg',
          category: 'sides'
        },
        {
          id: '27',
          nameKey: 'menu.items.pondu.name',
          descriptionKey: 'menu.items.pondu.description',
          price: 5.00,
          currency: 'CAD',
          image: '/images/Madesu.avif',
          category: 'sides'
        },
        {
          id: '28',
          nameKey: 'menu.items.friedPlantains.name',
          descriptionKey: 'menu.items.friedPlantains.description',
          price: 4.00,
          currency: 'CAD',
          image: '/images/fritaille.avif',
          category: 'sides'
        },
        {
          id: '29',
          nameKey: 'menu.items.kwanga.name',
          descriptionKey: 'menu.items.kwanga.description',
          price: 5.00,
          currency: 'CAD',
          image: '/images/two_Makayabus.avif',
          category: 'sides'
        },
        {
          id: '30',
          nameKey: 'menu.items.madesauSauce.name',
          descriptionKey: 'menu.items.madesauSauce.description',
          price: 5.00,
          currency: 'CAD',
          image: '/images/Madesu.avif',
          category: 'sides'
        }
      ]
    },
    {
      id: 'boissons',
      nameKey: 'menu.categories.drinks',
      items: [
        {
          id: '31',
          nameKey: 'menu.items.juice.name',
          descriptionKey: 'menu.items.juice.description',
          price: 3.00,
          currency: 'CAD',
          image: '/images/juice.webp',
          category: 'boissons'
        },
        {
          id: '32',
          nameKey: 'menu.items.maltan.name',
          descriptionKey: 'menu.items.maltan.description',
          price: 2.00,
          currency: 'CAD',
          image: '/images/Maltan.jpg',
          category: 'boissons'
        },
        {
          id: '33',
          nameKey: 'menu.items.water.name',
          descriptionKey: 'menu.items.water.description',
          price: 2.00,
          currency: 'CAD',
          image: '/images/water.jpg',
          category: 'boissons'
        },
        {
          id: '34',
          nameKey: 'menu.items.softDrinks.name',
          descriptionKey: 'menu.items.softDrinks.description',
          price: 2.00,
          currency: 'CAD',
          image: '/images/soft-drinks.jpg',
          category: 'boissons'
        },
        {
          id: '35',
          nameKey: 'menu.items.colaChampagne.name',
          descriptionKey: 'menu.items.colaChampagne.description',
          price: 3.50,
          currency: 'CAD',
          image: '/images/Cola-Champan.jpg',
          category: 'boissons'
        }
      ]
    }
  ];
  
  const [currentStep, setCurrentStep] = useState<'customer' | 'menu' | 'summary'>('customer');
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Animation when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(modalRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(contentRef.current, 
        { scale: 0.9, y: 20 }, 
        { scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
      );
    }
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(modalRef.current, { 
      opacity: 0, 
      duration: 0.2, 
      onComplete: onClose 
    });
  };

  const getAllMenuItems = (): MenuItem[] => {
    return menuCategoriesI18n.flatMap(category => category.items);
  };

  const getFilteredItems = (): MenuItem[] => {
    let items = getAllMenuItems();
    
    if (selectedCategory !== 'all') {
      items = items.filter(item => item.category === selectedCategory);
    }
    
    if (searchQuery) {
      items = items.filter(item => 
        t(item.nameKey).toLowerCase().includes(searchQuery.toLowerCase()) ||
        t(item.descriptionKey).toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return items;
  };

  const addToOrder = (item: MenuItem) => {
    setOrderItems(prev => {
      const existingItem = prev.find(orderItem => orderItem.id === item.id);
      if (existingItem) {
        return prev.map(orderItem =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromOrder = (itemId: string) => {
    setOrderItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromOrder(itemId);
    } else {
      setOrderItems(prev =>
        prev.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    }
  };

  const getTotalPrice = (): number => {
    return orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTax = (): number => {
    return getTotalPrice() * 0.15; // 15% tax (GST + QST for Quebec)
  };

  const getFinalTotal = (): number => {
    return getTotalPrice() + getTax();
  };

  const validateCustomerInfo = (): boolean => {
    return customerInfo.name.trim() !== '' && customerInfo.phone.trim() !== '';
  };

  const handleNextStep = () => {
    if (currentStep === 'customer' && validateCustomerInfo()) {
      setCurrentStep('menu');
    } else if (currentStep === 'menu' && orderItems.length > 0) {
      setCurrentStep('summary');
    }
  };

  const handleSubmitOrder = () => {
    // Here you would typically send the order to your backend
    const orderData = {
      customer: customerInfo,
      items: orderItems,
      subtotal: getTotalPrice(),
      tax: getTax(),
      total: getFinalTotal(),
      timestamp: new Date().toISOString(),
      type: 'in-store'
    };
    
    console.log('Order submitted:', orderData);
    
    // Show success message and close modal
    alert(t('inStoreOrder.orderSuccess'));
    
    // Reset form
    setCustomerInfo({ name: '', phone: '', email: '', notes: '' });
    setOrderItems([]);
    setCurrentStep('customer');
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div 
        ref={contentRef}
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold" style={{color: colors.primary}}>
                {t('inStoreOrder.title')}
              </h2>
              <p className="text-gray-600 mt-1">{t('inStoreOrder.subtitle')}</p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center mt-6">
            <div className={`flex items-center ${currentStep === 'customer' ? 'text-orange-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === 'customer' ? 'bg-orange-600 text-white' : 'bg-gray-200'
              }`}>
                1
              </div>
              <span className="ml-2 text-sm font-medium">{t('inStoreOrder.steps.customer')}</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>
            <div className={`flex items-center ${currentStep === 'menu' ? 'text-orange-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === 'menu' ? 'bg-orange-600 text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="ml-2 text-sm font-medium">{t('inStoreOrder.steps.menu')}</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>
            <div className={`flex items-center ${currentStep === 'summary' ? 'text-orange-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === 'summary' ? 'bg-orange-600 text-white' : 'bg-gray-200'
              }`}>
                3
              </div>
              <span className="ml-2 text-sm font-medium">{t('inStoreOrder.steps.summary')}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Customer Information Step */}
          {currentStep === 'customer' && (
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-6" style={{color: colors.text}}>
                {t('inStoreOrder.customerInfo.title')}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('inStoreOrder.customerInfo.name')} *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder={t('inStoreOrder.customerInfo.namePlaceholder')}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('inStoreOrder.customerInfo.phone')} *
                  </label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder={t('inStoreOrder.customerInfo.phonePlaceholder')}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('inStoreOrder.customerInfo.email')}
                  </label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder={t('inStoreOrder.customerInfo.emailPlaceholder')}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('inStoreOrder.customerInfo.notes')}
                  </label>
                  <textarea
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder={t('inStoreOrder.customerInfo.notesPlaceholder')}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Menu Selection Step */}
          {currentStep === 'menu' && (
            <div>
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Menu Items */}
                <div className="flex-1">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4" style={{color: colors.text}}>
                      {t('inStoreOrder.menu.title')}
                    </h3>
                    
                    {/* Search and Category Filter */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t('inStoreOrder.menu.search')}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        aria-label="Filter by category"
                      >
                        <option value="all">{t('menu.categories.all')}</option>
                        {menuCategoriesI18n.map(category => (
                          <option key={category.id} value={category.id}>
                            {t(category.nameKey)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* Menu Items Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                    {getFilteredItems().map(item => (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-start gap-4">
                          <img
                            src={item.image}
                            alt={t(item.nameKey)}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{t(item.nameKey)}</h4>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {t(item.descriptionKey)}
                            </p>
                            <div className="flex items-center justify-between mt-3">
                              <span className="font-bold text-lg" style={{color: colors.primary}}>
                                ${item.price.toFixed(2)}
                              </span>
                              <button
                                onClick={() => addToOrder(item)}
                                className="px-3 py-1 text-sm font-medium text-white rounded-full transition-all duration-200 hover:scale-105"
                                style={{ backgroundColor: colors.green }}
                              >
                                {t('inStoreOrder.menu.add')}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary Sidebar */}
                <div className="lg:w-80">
                  <div className="sticky top-0">
                    <h4 className="text-lg font-semibold mb-4" style={{color: colors.text}}>
                      {t('inStoreOrder.cart.title')} ({orderItems.length})
                    </h4>
                    
                    {orderItems.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">
                        {t('inStoreOrder.cart.empty')}
                      </p>
                    ) : (
                      <div className="space-y-3 max-h-80 overflow-y-auto">
                        {orderItems.map(item => (
                          <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <img
                              src={item.image}
                              alt={t(item.nameKey)}
                              className="w-12 h-12 rounded object-cover"
                            />
                            <div className="flex-1">
                              <h5 className="font-medium text-sm">{t(item.nameKey)}</h5>
                              <p className="text-xs text-gray-600">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm hover:bg-gray-300"
                              >
                                -
                              </button>
                              <span className="w-8 text-center text-sm">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm hover:bg-gray-300"
                              >
                                +
                              </button>
                              <button
                                onClick={() => removeFromOrder(item.id)}
                                className="ml-2 text-red-500 hover:text-red-700"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {orderItems.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>{t('inStoreOrder.cart.subtotal')}</span>
                            <span>${getTotalPrice().toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-gray-600">
                            <span>{t('inStoreOrder.cart.tax')}</span>
                            <span>${getTax().toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                            <span>{t('inStoreOrder.cart.total')}</span>
                            <span>${getFinalTotal().toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Order Summary Step */}
          {currentStep === 'summary' && (
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-6" style={{color: colors.text}}>
                {t('inStoreOrder.summary.title')}
              </h3>
              
              {/* Customer Information */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-3">{t('inStoreOrder.summary.customerInfo')}</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>{t('inStoreOrder.customerInfo.name')}:</strong> {customerInfo.name}</p>
                  <p><strong>{t('inStoreOrder.customerInfo.phone')}:</strong> {customerInfo.phone}</p>
                  {customerInfo.email && (
                    <p><strong>{t('inStoreOrder.customerInfo.email')}:</strong> {customerInfo.email}</p>
                  )}
                  {customerInfo.notes && (
                    <p><strong>{t('inStoreOrder.customerInfo.notes')}:</strong> {customerInfo.notes}</p>
                  )}
                </div>
              </div>
              
              {/* Order Items */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">{t('inStoreOrder.summary.orderItems')}</h4>
                <div className="space-y-3">
                  {orderItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={t(item.nameKey)}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div>
                          <h5 className="font-medium">{t(item.nameKey)}</h5>
                          <p className="text-sm text-gray-600">
                            ${item.price.toFixed(2)} x {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Summary */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t('inStoreOrder.cart.subtotal')}</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>{t('inStoreOrder.cart.tax')} (15%)</span>
                    <span>${getTax().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                    <span>{t('inStoreOrder.cart.total')}</span>
                    <span>${getFinalTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-between">
            <button
              onClick={() => {
                if (currentStep === 'menu') setCurrentStep('customer');
                else if (currentStep === 'summary') setCurrentStep('menu');
              }}
              className={`px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 ${
                currentStep === 'customer' ? 'invisible' : ''
              }`}
            >
              {t('inStoreOrder.buttons.back')}
            </button>
            
            {currentStep === 'summary' ? (
              <button
                onClick={handleSubmitOrder}
                className="px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
                style={{ backgroundColor: colors.green }}
              >
                {t('inStoreOrder.buttons.confirmOrder')}
              </button>
            ) : (
              <button
                onClick={handleNextStep}
                disabled={
                  (currentStep === 'customer' && !validateCustomerInfo()) ||
                  (currentStep === 'menu' && orderItems.length === 0)
                }
                className="px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: colors.green }}
              >
                {t('inStoreOrder.buttons.next')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}