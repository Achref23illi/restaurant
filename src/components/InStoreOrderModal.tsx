import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import colors from '../config/colors';
import { useAppSelector } from '../hooks/redux';
import { selectAllMenuItems } from '../store/slices/menuSlice';
import type { MenuItem } from '../data/menuDataI18n';

interface CustomizationOptions {
  base: string;
  step2_5: string;
  plantain: string;
  salad: string;
  sauce: string;
  extras: string[];
  children: string;
  softdrink: string;
  poutineBase: string;
  poutineMeat: string;
  poutineCheese: string;
  poutineSauce: string;
}

interface CustomizedOrderItem {
  id: string;
  originalItem: MenuItem;
  customization: CustomizationOptions;
  basePrice: number;
  extrasPrice: number;
  totalPrice: number;
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

type Step = 'customer' | 'menu' | 'customize' | 'summary';
type CustomizationStep = '1' | '2' | '2.5' | '3' | '4' | '5' | 'children' | 'softdrink' | 'poutine1' | 'poutine2' | 'poutine3';

export default function InStoreOrderModal({ isOpen, onClose }: InStoreOrderModalProps) {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Main flow states
  const [currentStep, setCurrentStep] = useState<Step>('customer');
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });
  const [orderItems, setOrderItems] = useState<CustomizedOrderItem[]>([]);

  // Customization states
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [customizationStep, setCustomizationStep] = useState<CustomizationStep>('1');
  const [customization, setCustomization] = useState<CustomizationOptions>({
    base: '',
    step2_5: '',
    plantain: '',
    salad: '',
    sauce: '',
    extras: [],
    children: '',
    softdrink: '',
    poutineBase: '',
    poutineMeat: '',
    poutineCheese: '',
    poutineSauce: ''
  });

  // Menu items from Redux store
  const menuItems = useAppSelector(selectAllMenuItems);

  // Animation effects
  useEffect(() => {
    if (isOpen && modalRef.current && contentRef.current) {
      gsap.fromTo(modalRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(contentRef.current,
        { scale: 0.9, y: 30 },
        { scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
      );
    }
  }, [isOpen]);

  // Reset modal state when closing
  const resetModalState = () => {
    setCurrentStep('customer');
    setSelectedItem(null);
    setCustomizationStep('1');
    setCustomization({
      base: '',
      step2_5: '',
      plantain: '',
      salad: '',
      sauce: '',
      extras: [],
      children: '',
      softdrink: '',
      poutineBase: '',
      poutineMeat: '',
      poutineCheese: '',
      poutineSauce: ''
    });
    setOrderItems([]);
  };

  const handleClose = () => {
    if (modalRef.current && contentRef.current) {
      gsap.to(contentRef.current, {
        scale: 0.9,
        y: 30,
        duration: 0.2
      });
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          onClose();
          resetModalState();
        }
      });
    }
  };

  // Price calculation helpers
  const calculateItemPrice = (item: MenuItem, customization: CustomizationOptions) => {
    let basePrice = item.price;
    let extrasPrice = 0;

    // Handle poutine pricing
    if (isPoutine(item)) {
      // Add price for meat options
      if (customization.poutineMeat === 'griot-porc') {
        extrasPrice += 3;
      } else if (customization.poutineMeat === 'chevre') {
        extrasPrice += 4;
      } else if (customization.poutineMeat === 'poulet') {
        extrasPrice += 3;
      }
      // Base and cheese options are included in base price
    } else {
      // Add price for djon djon rice
      if (customization.base === 'rizDjonDjon') {
        extrasPrice += 2;
      }

      // Add price for extras (each extra is $2)
      extrasPrice += customization.extras.length * 2;
    }

    return {
      basePrice,
      extrasPrice,
      totalPrice: basePrice + extrasPrice
    };
  };

  const getCurrentCustomizationPrice = () => {
    if (!selectedItem) return 0;
    return calculateItemPrice(selectedItem, customization).totalPrice;
  };

  const getCartSubtotal = () => {
    return orderItems.reduce((total, item) => total + (item.totalPrice * item.quantity), 0);
  };

  const getCartTax = () => {
    return getCartSubtotal() * 0.15; // 15% tax
  };

  const getCartTotal = () => {
    return getCartSubtotal() + getCartTax();
  };

  // Customer info validation
  const validateCustomerInfo = () => {
    return customerInfo.name.trim() !== '' && customerInfo.phone.trim() !== '';
  };

  // Customization validation
  const isCustomizationStepValid = (step: CustomizationStep) => {
    if (isPoutine(selectedItem)) {
      switch (step) {
        case '1': return true; // Always valid (dish display)
        case '2': return customization.poutineBase !== '';
        case '3': return customization.poutineMeat !== '';
        case '4': return customization.poutineCheese !== '';
        case '5': return customization.poutineSauce !== '';
        default: return false;
      }
    }
    
    switch (step) {
      case '1': return true; // Always valid (dish display)
      case '2': return customization.base !== '';
      case '2.5': return customization.step2_5 !== '';
      case '3': return customization.plantain !== '';
      case '4': return customization.salad !== '';
      case '5': return customization.sauce !== '';
      case 'children': return customization.children !== '';
      case 'softdrink': return customization.softdrink !== '';
      default: return false;
    }
  };

  const canProceedCustomization = () => {
    return isCustomizationStepValid(customizationStep);
  };

  // Helper functions for step navigation
  const hasStep25 = (item: MenuItem | null) => {
    if (!item) return false;
    return item.orderSteps?.some(step => step.id === 'step2.5');
  };

  const getStepsForItem = (item: MenuItem | null): CustomizationStep[] => {
    if (isChildrensMenu(item)) {
      return ['1', 'children'];
    }
    if (isSoftDrinks(item)) {
      return ['1', 'softdrink'];
    }
    if (isPoutine(item)) {
      return ['1', '2', '3', '4', '5'];
    }
    return hasStep25(item) 
      ? ['1', '2', '2.5', '3', '4', '5']
      : ['1', '2', '3', '4', '5'];
  };

  const getNextStep = (current: CustomizationStep) => {
    const steps = getStepsForItem(selectedItem);
    const currentIndex = steps.indexOf(current);
    if (currentIndex < steps.length - 1) {
      return steps[currentIndex + 1];
    }
    return null;
  };

  const getPreviousStep = (current: CustomizationStep) => {
    const steps = getStepsForItem(selectedItem);
    const currentIndex = steps.indexOf(current);
    if (currentIndex > 0) {
      return steps[currentIndex - 1];
    }
    return null;
  };

  const getCurrentStepNumber = () => {
    const steps = getStepsForItem(selectedItem);
    return steps.indexOf(customizationStep) + 1;
  };

  const getTotalSteps = () => {
    return getStepsForItem(selectedItem).length;
  };

  // Item customization check
  const isItemCustomizable = (item: MenuItem) => {
    // Drinks except soft drinks should not be customizable
    if (isDrinkNoCustomization(item)) {
      return false;
    }
    // Children's menu and soft drinks always need customization
    if (item.category === 'menu-enfants' || item.id === '47') {
      return true;
    }
    // Skip customization for entire categories
    const skipCustomizationCategories = ['viandes-poissons', 'sides', 'boissons', 'desserts'];
    if (skipCustomizationCategories.includes(item.category)) {
      return false;
    }
    // Skip customization for specific dish IDs
    const skipCustomizationDishIds = ['202', '203','301','204','7','302','303','304','27','28','29','30','32','33','104','35','36','37','38','39','40','41','54','55','53']; // Add dish IDs here
    if (skipCustomizationDishIds.includes(item.id)) {
      return false;
    }
    // Standard rule for other items
    return !item.isSeul;
  };

  // Check if item is children's menu
  const isChildrensMenu = (item: MenuItem | null) => {
    return item?.category === 'menu-enfants';
  };

  // Check if item is soft drinks
  const isSoftDrinks = (item: MenuItem | null) => {
    return item?.id === '47'; // soft drinks item
  };

  // Check if item is a poutine
  const isPoutine = (item: MenuItem | null) => {
    return item?.id === 'special-1' || item?.id === 'special-2' || item?.id === 'special-3' || item?.id === 'special-4' || item?.id === 'special-5';
  };

  // Check if item is a drink that needs no customization
  const isDrinkNoCustomization = (item: MenuItem | null) => {
    return item?.category === 'boissons' && item?.id !== '47'; // all drinks except soft drinks
  };

  // Step navigation
  const handleNextStep = () => {
    if (currentStep === 'customer' && validateCustomerInfo()) {
      setCurrentStep('menu');
    } else if (currentStep === 'menu' && orderItems.length > 0) {
      setCurrentStep('summary');
    } else if (currentStep === 'customize') {
      const nextStep = getNextStep(customizationStep);
      if (nextStep && canProceedCustomization()) {
        setCustomizationStep(nextStep);
      } else if (!nextStep && canProceedCustomization()) {
        addCustomizedItemToCart();
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 'menu') {
      setCurrentStep('customer');
    } else if (currentStep === 'customize') {
      const prevStep = getPreviousStep(customizationStep);
      if (prevStep) {
        setCustomizationStep(prevStep);
      } else {
        setCurrentStep('menu');
        setSelectedItem(null);
        resetCustomization();
      }
    } else if (currentStep === 'summary') {
      setCurrentStep('menu');
    }
  };

  // Customization handlers
  const resetCustomization = () => {
    setCustomization({
      base: '',
      step2_5: '',
      plantain: '',
      salad: '',
      sauce: '',
      extras: [],
      children: '',
      softdrink: '',
      poutineBase: '',
      poutineMeat: '',
      poutineCheese: '',
      poutineSauce: ''
    });
    setCustomizationStep('1');
  };

  const handleCustomizationChange = (field: keyof Omit<CustomizationOptions, 'extras'>, value: string) => {
    setCustomization(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleExtraToggle = (extra: string) => {
    setCustomization(prev => ({
      ...prev,
      extras: prev.extras.includes(extra)
        ? prev.extras.filter(e => e !== extra)
        : [...prev.extras, extra]
    }));
  };

  // Cart management
  const startItemCustomization = (item: MenuItem) => {
    setSelectedItem(item);
    setCurrentStep('customize');
    resetCustomization();
  };

  const addItemDirectly = (item: MenuItem) => {
    const prices = calculateItemPrice(item, {
      base: '',
      step2_5: '',
      plantain: '',
      salad: '',
      sauce: '',
      extras: [],
      children: '',
      softdrink: '',
      poutineBase: '',
      poutineMeat: '',
      poutineCheese: '',
      poutineSauce: ''
    });

    const newItem: CustomizedOrderItem = {
      id: `${item.id}-${Date.now()}`,
      originalItem: item,
      customization: {
        base: '',
        step2_5: '',
        plantain: '',
        salad: '',
        sauce: '',
        extras: [],
        children: '',
        softdrink: '',
        poutineBase: '',
        poutineMeat: '',
        poutineCheese: '',
        poutineSauce: ''
      },
      basePrice: prices.basePrice,
      extrasPrice: prices.extrasPrice,
      totalPrice: prices.totalPrice,
      quantity: 1
    };

    setOrderItems(prev => [...prev, newItem]);
  };

  const addCustomizedItemToCart = () => {
    if (!selectedItem) return;

    const prices = calculateItemPrice(selectedItem, customization);
    const newItem: CustomizedOrderItem = {
      id: `${selectedItem.id}-${Date.now()}`,
      originalItem: selectedItem,
      customization: { ...customization },
      basePrice: prices.basePrice,
      extrasPrice: prices.extrasPrice,
      totalPrice: prices.totalPrice,
      quantity: 1
    };

    setOrderItems(prev => [...prev, newItem]);
    setCurrentStep('menu');
    setSelectedItem(null);
    resetCustomization();
  };

  const removeFromCart = (itemId: string) => {
    setOrderItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setOrderItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  // Order submission
  const handleSubmitOrder = () => {
    const orderData = {
      customer: customerInfo,
      items: orderItems,
      pricing: {
        subtotal: getCartSubtotal(),
        tax: getCartTax(),
        total: getCartTotal()
      },
      timestamp: new Date().toISOString()
    };

    console.log('Order submitted:', orderData);
    alert(t('inStoreOrder.orderSuccess'));
    handleClose();
  };

  // Render customization step content
  const renderCustomizationStep = () => {
    if (!selectedItem) return null;

    // Handle poutine steps
    if (isPoutine(selectedItem)) {
      switch (customizationStep) {
        case '1':
          return (
            <div className="text-center py-8">
              <img 
                src={selectedItem.image} 
                alt={t(selectedItem.nameKey)} 
                className="w-48 h-48 object-cover rounded-2xl mx-auto mb-6 shadow-lg"
              />
              <h3 className="text-2xl font-bold mb-3" style={{ color: colors.primary }}>
                {t(selectedItem.nameKey)}
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {t(selectedItem.descriptionKey)}
              </p>
              <div className="bg-green-50 rounded-xl p-4 inline-block">
                <p className="text-3xl font-bold" style={{ color: colors.green }}>
                  ${getCurrentCustomizationPrice().toFixed(2)} {selectedItem.currency}
                </p>
              </div>
            </div>
          );

        case '2':
          return (
            <div className="py-6">
              <div className="text-center mb-8">
                <h4 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
                  {t('orderSteps.poutine.step1.title')}
                </h4>
                <p className="text-gray-600">Choose your base</p>
              </div>
              <div className="grid gap-3 max-w-md mx-auto">
                {Object.entries(t('orderSteps.poutine.step1', { returnObjects: true }) as Record<string, string>).map(([key, label]) => {
                  if (key === 'title') return null;
                  return (
                    <label 
                      key={key} 
                      className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                        customization.poutineBase === key 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="poutineBase"
                        value={key}
                        checked={customization.poutineBase === key}
                        onChange={(e) => handleCustomizationChange('poutineBase', e.target.value)}
                        className="mr-3 scale-125"
                        style={{ accentColor: colors.green }}
                      />
                      <span className="font-medium">{label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          );

        case '3':
          return (
            <div className="py-6">
              <div className="text-center mb-8">
                <h4 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
                  {t('orderSteps.poutine.step2.title')}
                </h4>
                <p className="text-gray-600">Choose your meat</p>
              </div>
              <div className="grid gap-3 max-w-md mx-auto">
                {Object.entries(t('orderSteps.poutine.step2', { returnObjects: true }) as Record<string, string>).map(([key, label]) => {
                  if (key === 'title') return null;
                  return (
                    <label 
                      key={key} 
                      className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                        customization.poutineMeat === key 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="poutineMeat"
                        value={key}
                        checked={customization.poutineMeat === key}
                        onChange={(e) => handleCustomizationChange('poutineMeat', e.target.value)}
                        className="mr-3 scale-125"
                        style={{ accentColor: colors.green }}
                      />
                      <span className="font-medium">{label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          );

        case '4':
          return (
            <div className="py-6">
              <div className="text-center mb-8">
                <h4 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
                  {t('orderSteps.poutine.step3.title')}
                </h4>
                <p className="text-gray-600">Choose your cheese</p>
              </div>
              <div className="grid gap-3 max-w-md mx-auto">
                {Object.entries(t('orderSteps.poutine.step3', { returnObjects: true }) as Record<string, string>).map(([key, label]) => {
                  if (key === 'title') return null;
                  return (
                    <label 
                      key={key} 
                      className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                        customization.poutineCheese === key 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="poutineCheese"
                        value={key}
                        checked={customization.poutineCheese === key}
                        onChange={(e) => handleCustomizationChange('poutineCheese', e.target.value)}
                        className="mr-3 scale-125"
                        style={{ accentColor: colors.green }}
                      />
                      <span className="font-medium">{label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          );

        case '5':
          return (
            <div className="py-6">
              <div className="text-center mb-8">
                <h4 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
                  {t('orderSteps.poutine.step4.title')}
                </h4>
                <p className="text-gray-600">Choose your sauce</p>
              </div>
              <div className="grid gap-3 max-w-md mx-auto">
                {Object.entries(t('orderSteps.poutine.step4', { returnObjects: true }) as Record<string, string>).map(([key, label]) => {
                  if (key === 'title') return null;
                  return (
                    <label 
                      key={key} 
                      className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                        customization.poutineSauce === key 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="poutineSauce"
                        value={key}
                        checked={customization.poutineSauce === key}
                        onChange={(e) => handleCustomizationChange('poutineSauce', e.target.value)}
                        className="mr-3 scale-125"
                        style={{ accentColor: colors.green }}
                      />
                      <span className="font-medium">{label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          );

        default:
          return null;
      }
    }

    // Handle regular steps
    switch (customizationStep) {
      case '1':
        return (
          <div className="text-center py-8">
            <img 
              src={selectedItem.image} 
              alt={t(selectedItem.nameKey)} 
              className="w-48 h-48 object-cover rounded-2xl mx-auto mb-6 shadow-lg"
            />
            <h3 className="text-2xl font-bold mb-3" style={{ color: colors.primary }}>
              {t(selectedItem.nameKey)}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {t(selectedItem.descriptionKey)}
            </p>
            <div className="bg-green-50 rounded-xl p-4 inline-block">
              <p className="text-3xl font-bold" style={{ color: colors.green }}>
                ${getCurrentCustomizationPrice().toFixed(2)} {selectedItem.currency}
              </p>
            </div>
          </div>
        );

      case '2':
        // For menu-midi (lunch special) items, filter out 'kwanga', 'fufu', and 'rizBlancSauce' from Step 2 options
        const isMenuMidi = selectedItem.category === 'menu-midi';
        const filteredStep2Options = Object.entries(t('inStoreOrder.customization.steps.2.options', { returnObjects: true }) as Record<string, string>);
        const displayOptions = isMenuMidi
          ? filteredStep2Options.filter(([key]) => !['kwanga', 'fufu', 'rizBlancSauce'].includes(key))
          : filteredStep2Options;
        return (
          <div className="py-6">
            <div className="text-center mb-8">
              <h4 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
                {t('inStoreOrder.customization.steps.2.title')}
              </h4>
              <p className="text-gray-600">{t('inStoreOrder.customization.steps.2.description')}</p>
            </div>
            <div className="grid gap-3 max-w-md mx-auto">
              {displayOptions.map(([key, label]) => (
                <label
                  key={key}
                  className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                    customization.base === key
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="base"
                    value={key}
                    checked={customization.base === key}
                    onChange={e => handleCustomizationChange('base', e.target.value)}
                    className="mr-3 scale-125"
                    style={{ accentColor: colors.green }}
                  />
                  <span className="font-medium">{label}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case '2.5':
        return (
          <div className="py-6">
            <div className="text-center mb-8">
              <h4 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
                {t('inStoreOrder.customization.steps.2_5.title')}
              </h4>
              <p className="text-gray-600">{t('inStoreOrder.customization.steps.2_5.description')}</p>
            </div>
            <div className="grid gap-3 max-w-md mx-auto">
              {Object.entries(t('inStoreOrder.customization.steps.2_5.options', { returnObjects: true }) as Record<string, string>).map(([key, label]) => (
                <label 
                  key={key} 
                  className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                    customization.step2_5 === key 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="step2_5"
                    value={key}
                    checked={customization.step2_5 === key}
                    onChange={(e) => handleCustomizationChange('step2_5', e.target.value)}
                    className="mr-3 scale-125"
                    style={{ accentColor: colors.green }}
                  />
                  <span className="font-medium">{label}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case '3':
        return (
          <div className="py-6">
            <div className="text-center mb-8">
              <h4 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
                {t('inStoreOrder.customization.steps.3.title')}
              </h4>
              <p className="text-gray-600">{t('inStoreOrder.customization.steps.3.description')}</p>
            </div>
            <div className="grid gap-3 max-w-md mx-auto">
              {Object.entries(t('inStoreOrder.customization.steps.3.options', { returnObjects: true }) as Record<string, string>).map(([key, label]) => (
                <label 
                  key={key} 
                  className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                    customization.plantain === key 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="plantain"
                    value={key}
                    checked={customization.plantain === key}
                    onChange={(e) => handleCustomizationChange('plantain', e.target.value)}
                    className="mr-3 scale-125"
                    style={{ accentColor: colors.green }}
                  />
                  <span className="font-medium">{label}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case '4':
        return (
          <div className="py-6">
            <div className="text-center mb-8">
              <h4 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
                {t('inStoreOrder.customization.steps.4.title')}
              </h4>
              <p className="text-gray-600">{t('inStoreOrder.customization.steps.4.description')}</p>
            </div>
            <div className="grid gap-3 max-w-md mx-auto">
              {Object.entries(t('inStoreOrder.customization.steps.4.options', { returnObjects: true }) as Record<string, string>).map(([key, label]) => (
                <label 
                  key={key} 
                  className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                    customization.salad === key 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="salad"
                    value={key}
                    checked={customization.salad === key}
                    onChange={(e) => handleCustomizationChange('salad', e.target.value)}
                    className="mr-3 scale-125"
                    style={{ accentColor: colors.green }}
                  />
                  <span className="font-medium">{label}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case '5':
        return (
          <div className="py-6">
            <div className="text-center mb-8">
              <h4 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
                {t('inStoreOrder.customization.steps.5.title')}
              </h4>
              <p className="text-gray-600">{t('inStoreOrder.customization.steps.5.description')}</p>
            </div>
            
            {/* Sauce Selection */}
            <div className="mb-8">
              <div className="grid gap-3 max-w-md mx-auto">
                {Object.entries(t('inStoreOrder.customization.steps.5.options', { returnObjects: true }) as Record<string, string>).map(([key, label]) => (
                  <label 
                    key={key} 
                    className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                      customization.sauce === key 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="sauce"
                      value={key}
                      checked={customization.sauce === key}
                      onChange={(e) => handleCustomizationChange('sauce', e.target.value)}
                      className="mr-3 scale-125"
                      style={{ accentColor: colors.green }}
                    />
                    <span className="font-medium">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Extras Section */}
            <div className="border-t pt-6">
              <div className="text-center mb-6">
                <h5 className="text-lg font-bold mb-2" style={{ color: colors.primary }}>
                  {t('inStoreOrder.customization.extras.title')}
                </h5>
                <p className="text-gray-600 text-sm">{t('inStoreOrder.customization.extras.description')}</p>
              </div>
              <div className="grid gap-3 max-w-md mx-auto">
                {Object.entries(t('inStoreOrder.customization.extras.options', { returnObjects: true }) as Record<string, string>).map(([key, label]) => (
                  <label 
                    key={key} 
                    className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                      customization.extras.includes(key) 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={customization.extras.includes(key)}
                      onChange={() => handleExtraToggle(key)}
                      className="mr-3 scale-125"
                      style={{ accentColor: colors.green }}
                    />
                    <span className="font-medium">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 'children':
        return (
          <div className="py-6">
            <div className="text-center mb-8">
              <h4 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
                {t('inStoreOrder.customization.steps.children.title')}
              </h4>
              <p className="text-gray-600">{t('inStoreOrder.customization.steps.children.description')}</p>
            </div>
            <div className="grid gap-3 max-w-md mx-auto">
              {Object.entries(t('inStoreOrder.customization.steps.children.options', { returnObjects: true }) as Record<string, string>).map(([key, label]) => (
                <label 
                  key={key} 
                  className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                    customization.children === key 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="children"
                    value={key}
                    checked={customization.children === key}
                    onChange={(e) => handleCustomizationChange('children', e.target.value)}
                    className="mr-3 scale-125"
                    style={{ accentColor: colors.green }}
                  />
                  <span className="font-medium">{label}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'softdrink':
        return (
          <div className="py-6">
            <div className="text-center mb-8">
              <h4 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
                {t('inStoreOrder.customization.steps.softdrink.title')}
              </h4>
              <p className="text-gray-600">{t('inStoreOrder.customization.steps.softdrink.description')}</p>
            </div>
            <div className="grid gap-3 max-w-md mx-auto">
              {Object.entries(t('inStoreOrder.customization.steps.softdrink.options', { returnObjects: true }) as Record<string, string>).map(([key, label]) => (
                <label 
                  key={key} 
                  className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                    customization.softdrink === key 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="softdrink"
                    value={key}
                    checked={customization.softdrink === key}
                    onChange={(e) => handleCustomizationChange('softdrink', e.target.value)}
                    className="mr-3 scale-125"
                    style={{ accentColor: colors.green }}
                  />
                  <span className="font-medium">{label}</span>
                </label>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div 
        ref={contentRef}
        className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold" style={{color: colors.primary}}>
                {t('inStoreOrder.title')}
              </h2>
              <p className="text-gray-600 mt-1">{t('inStoreOrder.subtitle')}</p>
            </div>
            <button
              onClick={handleClose}
              className="p-3 rounded-full hover:bg-white/80 transition-colors duration-200 shadow-lg"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center mt-6 space-x-2">
            {[
              { key: 'customer', number: 1 },
              { key: 'menu', number: 2 },
              { key: 'customize', number: 3 },
              { key: 'summary', number: 4 }
            ].map(({ key, number }, index) => {
              const isActive = currentStep === key;
              const isCompleted = (
                (key === 'customer' && (currentStep !== 'customer')) ||
                (key === 'menu' && ['customize', 'summary'].includes(currentStep)) ||
                (key === 'customize' && currentStep === 'summary')
              );
              
              return (
                <React.Fragment key={key}>
                  <div className={`flex items-center ${isActive ? 'text-green-600' : isCompleted ? 'text-green-500' : 'text-gray-400'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      isActive ? 'bg-green-600 text-white shadow-lg' : 
                      isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200'
                    }`}>
                      {isCompleted ? '✓' : number}
                    </div>
                    <span className="ml-3 text-sm font-medium hidden sm:block">
                      {t(`inStoreOrder.steps.${key}`)}
                    </span>
                  </div>
                  {index < 3 && (
                    <div className={`flex-1 h-1 rounded-full mx-2 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Customization Sub-Progress */}
          {currentStep === 'customize' && (
            <div className="mt-4 p-4 bg-white rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-600">
                  {t('inStoreOrder.customization.step')} {getCurrentStepNumber()} {t('inStoreOrder.customization.of')} {getTotalSteps()}
                </span>
                <span className="text-sm font-bold" style={{ color: colors.green }}>
                  ${getCurrentCustomizationPrice().toFixed(2)}
                </span>
              </div>
              <div className="flex space-x-1">
                {Array.from({ length: getTotalSteps() }, (_, i) => i + 1).map((step) => (
                  <div
                    key={step}
                    className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                      step <= getCurrentStepNumber() ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {/* Customer Info Step */}
          {currentStep === 'customer' && (
            <div className="p-8">
              <div className="max-w-lg mx-auto">
                <h3 className="text-2xl font-bold mb-6 text-center" style={{color: colors.text}}>
                  {t('inStoreOrder.customerInfo.title')}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('inStoreOrder.customerInfo.name')} *</label>
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo(prev => ({...prev, name: e.target.value}))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder={t('inStoreOrder.customerInfo.namePlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('inStoreOrder.customerInfo.phone')} *</label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo(prev => ({...prev, phone: e.target.value}))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder={t('inStoreOrder.customerInfo.phonePlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('inStoreOrder.customerInfo.email')}</label>
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo(prev => ({...prev, email: e.target.value}))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder={t('inStoreOrder.customerInfo.emailPlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('inStoreOrder.customerInfo.notes')}</label>
                    <textarea
                      value={customerInfo.notes}
                      onChange={(e) => setCustomerInfo(prev => ({...prev, notes: e.target.value}))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder={t('inStoreOrder.customerInfo.notesPlaceholder')}
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Menu Selection Step */}
          {currentStep === 'menu' && (
            <div className="p-8">
              <div className="flex gap-8">
                {/* Menu Items */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-6" style={{color: colors.text}}>
                    {t('inStoreOrder.menu.title')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {menuItems.map((item) => (
                      <div key={item.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200">
                        <img 
                          src={item.image} 
                          alt={t(item.nameKey)} 
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-4">
                          <h4 className="font-semibold text-sm mb-1">{t(item.nameKey)}</h4>
                          <p className="text-xs text-gray-600 mb-3 line-clamp-2">{t(item.descriptionKey)}</p>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-green-600">
                              ${item.price.toFixed(2)}
                            </span>
                            <button
                              onClick={() => {
                                if (isItemCustomizable(item)) {
                                  startItemCustomization(item);
                                } else {
                                  addItemDirectly(item);
                                }
                              }}
                              className="px-3 py-1.5 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors"
                            >
                              {t('inStoreOrder.buttons.addToCart')}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cart Sidebar */}
                <div className="w-80 bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-bold mb-4">{t('inStoreOrder.cart.title')}</h4>
                  {orderItems.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">{t('inStoreOrder.cart.empty')}</p>
                  ) : (
                    <>
                      <div className="space-y-3 mb-6">
                        {orderItems.map((item) => (
                          <div key={item.id} className="bg-white rounded-lg p-3 shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-medium text-sm">{t(item.originalItem.nameKey)}</h5>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700 text-xs"
                              >
                                ✕
                              </button>
                            </div>
                                        {(item.customization.base || item.customization.children || item.customization.softdrink || item.customization.poutineBase || item.customization.poutineMeat || item.customization.poutineCheese || item.customization.poutineSauce) && (
              <div className="text-xs text-gray-600 mb-2">
                {item.customization.base && (
                  <p>Base: {t(`inStoreOrder.customization.steps.2.options.${item.customization.base}`)}</p>
                )}
                {item.customization.poutineBase && (
                  <p>Base: {t(`orderSteps.poutine.step1.${item.customization.poutineBase}`)}</p>
                )}
                {item.customization.poutineMeat && (
                  <p>Meat: {t(`orderSteps.poutine.step2.${item.customization.poutineMeat}`)}</p>
                )}
                {item.customization.poutineCheese && (
                  <p>Cheese: {t(`orderSteps.poutine.step3.${item.customization.poutineCheese}`)}</p>
                )}
                {item.customization.poutineSauce && (
                  <p>Sauce: {t(`orderSteps.poutine.step4.${item.customization.poutineSauce}`)}</p>
                )}
                                {item.customization.step2_5 && (
                                  <p>Sauce légumes: {t(`inStoreOrder.customization.steps.2_5.options.${item.customization.step2_5}`)}</p>
                                )}
                                {item.customization.plantain && (
                                  <p>Plantain: {t(`inStoreOrder.customization.steps.3.options.${item.customization.plantain}`)}</p>
                                )}
                                {item.customization.salad && (
                                  <p>Salade: {t(`inStoreOrder.customization.steps.4.options.${item.customization.salad}`)}</p>
                                )}
                                {item.customization.sauce && (
                                  <p>Sauce: {t(`inStoreOrder.customization.steps.5.options.${item.customization.sauce}`)}</p>
                                )}
                                {item.customization.children && (
                                  <p>Accompagnement: {t(`inStoreOrder.customization.steps.children.options.${item.customization.children}`)}</p>
                                )}
                                {item.customization.softdrink && (
                                  <p>Saveur: {t(`inStoreOrder.customization.steps.softdrink.options.${item.customization.softdrink}`)}</p>
                                )}
                                {item.customization.extras.length > 0 && (
                                  <p>Extras: {item.customization.extras.map(extra => t(`inStoreOrder.customization.extras.options.${extra}`)).join(', ')}</p>
                                )}
                              </div>
                            )}
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-6 h-6 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-xs"
                                >
                                  −
                                </button>
                                <span className="mx-2 text-sm">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-6 h-6 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-xs"
                                >
                                  +
                                </button>
                              </div>
                              <span className="font-semibold text-sm">${(item.totalPrice * item.quantity).toFixed(2)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t pt-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>{t('inStoreOrder.cart.subtotal')}</span>
                          <span>${getCartSubtotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>{t('inStoreOrder.cart.tax')}</span>
                          <span>${getCartTax().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg pt-2 border-t">
                          <span>{t('inStoreOrder.cart.total')}</span>
                          <span>${getCartTotal().toFixed(2)}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Customization Step */}
          {currentStep === 'customize' && selectedItem && (
            <div className="p-8">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2" style={{color: colors.text}}>
                    {t('inStoreOrder.customization.title')}
                  </h3>
                  <p className="text-gray-600">{t(selectedItem.nameKey)}</p>
                </div>

                {renderCustomizationStep()}
              </div>
            </div>
          )}

          {/* Order Summary Step */}
          {currentStep === 'summary' && (
            <div className="p-8">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-6 text-center" style={{color: colors.text}}>
                  {t('inStoreOrder.summary.title')}
                </h3>
                
                <div className="space-y-6">
                  {/* Customer Info */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-bold mb-4">{t('inStoreOrder.summary.customerInfo')}</h4>
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
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-bold mb-4">{t('inStoreOrder.summary.orderItems')}</h4>
                    <div className="space-y-4">
                      {orderItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-start">
                          <div className="flex-1">
                            <h5 className="font-medium">{t(item.originalItem.nameKey)}</h5>
                            {(item.customization.base || item.customization.children || item.customization.softdrink) && (
                              <div className="text-sm text-gray-600 mt-1">
                                {item.customization.base && (
                                  <p>• {t(`inStoreOrder.customization.steps.2.options.${item.customization.base}`)}</p>
                                )}
                                {item.customization.step2_5 && (
                                  <p>• {t(`inStoreOrder.customization.steps.2_5.options.${item.customization.step2_5}`)}</p>
                                )}
                                {item.customization.plantain && (
                                  <p>• {t(`inStoreOrder.customization.steps.3.options.${item.customization.plantain}`)}</p>
                                )}
                                {item.customization.salad && (
                                  <p>• {t(`inStoreOrder.customization.steps.4.options.${item.customization.salad}`)}</p>
                                )}
                                {item.customization.sauce && (
                                  <p>• {t(`inStoreOrder.customization.steps.5.options.${item.customization.sauce}`)}</p>
                                )}
                                {item.customization.children && (
                                  <p>• {t(`inStoreOrder.customization.steps.children.options.${item.customization.children}`)}</p>
                                )}
                                {item.customization.softdrink && (
                                  <p>• {t(`inStoreOrder.customization.steps.softdrink.options.${item.customization.softdrink}`)}</p>
                                )}
                                {item.customization.extras.length > 0 && (
                                  <p>• Extras: {item.customization.extras.map(extra => t(`inStoreOrder.customization.extras.options.${extra}`)).join(', ')}</p>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="text-right ml-4">
                            <p className="font-semibold">${(item.totalPrice * item.quantity).toFixed(2)}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="bg-green-50 rounded-xl p-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>{t('inStoreOrder.cart.subtotal')}</span>
                        <span>${getCartSubtotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>{t('inStoreOrder.cart.tax')} (15%)</span>
                        <span>${getCartTax().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-xl pt-2 border-t border-green-200">
                        <span>{t('inStoreOrder.cart.total')}</span>
                        <span style={{ color: colors.green }}>${getCartTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <button
              onClick={handlePreviousStep}
              className={`px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-200 font-medium ${
                currentStep === 'customer' ? 'invisible' : ''
              }`}
            >
              {t('inStoreOrder.buttons.back')}
            </button>

            {/* Price Display */}
            {currentStep === 'customize' && selectedItem && (
              <div className="text-center">
                <p className="text-2xl font-bold" style={{ color: colors.green }}>
                  ${getCurrentCustomizationPrice().toFixed(2)}
                </p>
              </div>
            )}

            {currentStep === 'summary' ? (
              <button
                onClick={handleSubmitOrder}
                className="px-8 py-3 rounded-xl font-bold text-white transition-all duration-300 hover:shadow-lg hover:scale-105 text-lg"
                style={{ backgroundColor: colors.green }}
              >
                {t('inStoreOrder.buttons.confirmOrder')}
              </button>
            ) : (
              <button
                onClick={handleNextStep}
                disabled={
                  (currentStep === 'customer' && !validateCustomerInfo()) ||
                  (currentStep === 'menu' && orderItems.length === 0) ||
                  (currentStep === 'customize' && !canProceedCustomization())
                }
                className="px-8 py-3 rounded-xl font-bold text-white transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                style={{ backgroundColor: colors.green }}
              >
                {currentStep === 'customize' && getCurrentStepNumber() === getTotalSteps()
                  ? t('inStoreOrder.buttons.addToCart')
                  : t('inStoreOrder.buttons.next')
                }
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}