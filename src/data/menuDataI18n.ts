export interface MenuExtra {
  id: string;
  nameKey: string;
  price: number;
}

export interface OrderStep {
  id: string;
  nameKey: string;
  options: {
    id: string;
    nameKey: string;
    price?: number;
    default?: boolean;
  }[];
}

export interface MenuItem {
  id: string;
  nameKey: string;
  descriptionKey: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  popular?: boolean;
  spicy?: boolean;
  extras?: MenuExtra[];
  orderSteps?: OrderStep[];
  isSeul?: boolean; // Pour les plats "Seul" qui n'ont pas d'étapes
}

export interface MenuCategory {
  id: string;
  nameKey: string;
  items: MenuItem[];
  noticeKey?: string;
}

// Étapes de commande standard pour tous les plats (sauf "Seul")
export const standardOrderSteps: OrderStep[] = [
  {
    id: 'step2',
    nameKey: 'orderSteps.step2.title',
    options: [
      { id: 'kwanga', nameKey: 'orderSteps.step2.kwanga', default: true },
      { id: 'fufu', nameKey: 'orderSteps.step2.fufu' },
      { id: 'riz-blanc', nameKey: 'orderSteps.step2.rizBlanc' },
      { id: 'riz-djon-djon', nameKey: 'orderSteps.step2.rizDjonDjon', price: 2.00 },
      { id: 'riz-colli', nameKey: 'orderSteps.step2.rizColli' }
    ]
  },
  {
    id: 'step3',
    nameKey: 'orderSteps.step3.title',
    options: [
      { id: 'banane-paise', nameKey: 'orderSteps.step3.bananePaise', default: true },
      { id: 'banane-sucre', nameKey: 'orderSteps.step3.bananeSucre' }
    ]
  },
  {
    id: 'step4',
    nameKey: 'orderSteps.step4.title',
    options: [
      { id: 'salade-macaroni', nameKey: 'orderSteps.step4.saladeMacaroni', default: true },
      { id: 'salade-verte', nameKey: 'orderSteps.step4.saladeVerte' },
      { id: 'aucune-salade', nameKey: 'orderSteps.step4.aucuneSalade' }
    ]
  },
  {
    id: 'step5',
    nameKey: 'orderSteps.step5.title',
    options: [
      { id: 'avec-sauce', nameKey: 'orderSteps.step5.avecSauce', default: true },
      { id: 'sans-sauce', nameKey: 'orderSteps.step5.sansSauce' }
    ]
  }
];


// Étapes de commande avec étape 2.5 pour certains plats spéciaux
export const orderStepsWithStep25: OrderStep[] = [
  {
    id: 'step2',
    nameKey: 'orderSteps.step2.title',
    options: [
      { id: 'kwanga', nameKey: 'orderSteps.step2.kwanga', default: true },
      { id: 'fufu', nameKey: 'orderSteps.step2.fufu' },
      { id: 'riz-blanc', nameKey: 'orderSteps.step2.rizBlanc' },
      { id: 'riz-djon-djon', nameKey: 'orderSteps.step2.rizDjonDjon', price: 2.00 },
      { id: 'riz-colli', nameKey: 'orderSteps.step2.rizColli' }
    ]
  },
  {
    id: 'step2.5',
    nameKey: 'orderSteps.step2_5.title',
    options: [
      { id: 'pondu', nameKey: 'orderSteps.step2_5.pondu', default: true },
      { id: 'fumbwa', nameKey: 'orderSteps.step2_5.fumbwa' },
      { id: 'madesu', nameKey: 'orderSteps.step2_5.madesu' }
    ]
  },
  {
    id: 'step3',
    nameKey: 'orderSteps.step3.title',
    options: [
      { id: 'banane-paise', nameKey: 'orderSteps.step3.bananePaise', default: true },
      { id: 'banane-sucre', nameKey: 'orderSteps.step3.bananeSucre' }
    ]
  },
  {
    id: 'step4',
    nameKey: 'orderSteps.step4.title',
    options: [
      { id: 'salade-macaroni', nameKey: 'orderSteps.step4.saladeMacaroni', default: true },
      { id: 'salade-verte', nameKey: 'orderSteps.step4.saladeVerte' },
      { id: 'aucune-salade', nameKey: 'orderSteps.step4.aucuneSalade' }
    ]
  },
  {
    id: 'step5',
    nameKey: 'orderSteps.step5.title',
    options: [
      { id: 'avec-sauce', nameKey: 'orderSteps.step5.avecSauce', default: true },
      { id: 'sans-sauce', nameKey: 'orderSteps.step5.sansSauce' }
    ]
  }
];

// Extras disponibles pour tous les plats
export const standardExtras: MenuExtra[] = [
  { id: 'extra-macaroni', nameKey: 'menu.extras.macaroni', price: 2.00 },
  { id: 'extra-sauce', nameKey: 'menu.extras.sauce', price: 1.00 },
  { id: 'extra-piments', nameKey: 'menu.extras.piments', price: 0.50 },
  { id: 'extra-pikliz', nameKey: 'menu.extras.pikliz', price: 1.00 },
  { id: 'extra-plantain', nameKey: 'menu.extras.plantain', price: 2.00 }
];

export const menuCategories: MenuCategory[] = [
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
        image: '/images/new_images/3-Cheese-Poutine-025.jpg',
        category: 'special',
        popular: true
      },
      {
        id: 'special-2',
        nameKey: 'menu.items.grandePoutine.name',
        descriptionKey: 'menu.items.grandePoutine.description',
        price: 14.99,
        currency: 'CAD',
        image: '/images/new_images/Grande poutine de base.jpg',
        category: 'special',
        popular: true,
        extras: [
          {
            id: 'extra-chevre',
            nameKey: 'menu.extras.chevre',
            price: 5.00
          },
          {
            id: 'extra-legume',
            nameKey: 'menu.extras.legume',
            price: 5.00
          },
          {
            id: 'extra-poulet',
            nameKey: 'menu.extras.poulet',
            price: 4.00
          },
          {
            id: 'extra-plantain',
            nameKey: 'menu.extras.plantain',
            price: 4.00
          },
          {
            id: 'extra-patate-sucre',
            nameKey: 'menu.extras.patateSuccre',
            price: 4.00
          },
          {
            id: 'extra-porc',
            nameKey: 'menu.extras.porc',
            price: 4.00
          }
        ]
      },
      {
        id: 'special-3',
        nameKey: 'menu.items.petitePoutine.name',
        descriptionKey: 'menu.items.petitePoutine.description',
        price: 8.00,
        currency: 'CAD',
        image: '/images/new_images/petitepoutinereguliere.webp',
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
        image: '/images/new_images/Griot de Porc.jpg',
        category: 'featured',
        popular: true,
        orderSteps: standardOrderSteps,
        extras: standardExtras
      },

      {
        id: '4',
        nameKey: 'menu.items.goat.name',
        descriptionKey: 'menu.items.goat.description',
        price: 24.00,
        currency: 'CAD',
        image: '/images/new_images/goat.jpg',
        category: 'featured',
        popular: true,
        orderSteps: standardOrderSteps,
        extras: standardExtras
      },
      {
        id: '8',
        nameKey: 'menu.items.twoMakayabus.name',
        descriptionKey: 'menu.items.twoMakayabus.description',
        price: 26.00,
        currency: 'CAD',
        image: '/images/new_images/2 Makayabus.png',
        category: 'featured',
        popular: true,
        orderSteps: orderStepsWithStep25,
        extras: standardExtras
      },

    ]
  },
  {
    id: 'plats-africains',
    nameKey: 'menu.categories.african',
    items: [

      {
        id: '5',
        nameKey: 'menu.items.halfChicken.name',
        descriptionKey: 'menu.items.halfChicken.description',
        price: 23.00,
        currency: 'CAD',
        image: '/images/new_images/Half Chicken.webp',
        category: 'plats-africains',
        orderSteps: standardOrderSteps,
        extras: standardExtras
      },
      {
        id: '6',
        nameKey: 'menu.items.thomsonFish.name',
        descriptionKey: 'menu.items.thomsonFish.description',
        price: 24.00,
        currency: 'CAD',
        image: '/images/new_images/Thomson fish.jpg',
        category: 'plats-africains',
        orderSteps: orderStepsWithStep25,
        extras: standardExtras
      },
      {
        id: 'thomson-basic',
        nameKey: 'menu.items.thomsonFishBasic.name',
        descriptionKey: 'menu.items.thomsonFishBasic.description',
        price: 20.00,
        currency: 'CAD',
        image: '/images/new_images/Thomson fish.jpg',
        category: 'plats-africains',
        orderSteps: standardOrderSteps,
        extras: standardExtras
      },
      {
        id: '7',
        nameKey: 'menu.items.eightChickenWings.name',
        descriptionKey: 'menu.items.eightChickenWings.description',
        price: 18.00,
        currency: 'CAD',
        image: '/images/new_images/wings.jpg',
        category: 'plats-africains',
        orderSteps: standardOrderSteps,
        extras: standardExtras
      },

      {
        id: '9',
        nameKey: 'menu.items.tilapia.name',
        descriptionKey: 'menu.items.tilapia.description',
        price: 22.00,
        currency: 'CAD',
        image: '/images/tilapia.avif',
        category: 'plats-africains',
        orderSteps: standardOrderSteps,
        extras: standardExtras
      },
      {
        id: '10',
        nameKey: 'menu.items.tilapiaV2.name',
        descriptionKey: 'menu.items.tilapiaV2.description',
        price: 26.00,
        currency: 'CAD',
        image: '/images/tilapia.avif',
        category: 'plats-africains',
        orderSteps: orderStepsWithStep25,
        extras: standardExtras
      },
      {
        id: 'african-3',
        nameKey: 'menu.items.makoso.name',
        descriptionKey: 'menu.items.makoso.description',
        price: 17.00,
        currency: 'CAD',
        image: '/images/new_images/Makoso.jpg',
        category: 'plats-africains',
        orderSteps: standardOrderSteps,
        extras: standardExtras
      },
      {
        id: 'african-4',
        nameKey: 'menu.items.dindonFume.name',
        descriptionKey: 'menu.items.dindonFume.description',
        price: 19.00,
        currency: 'CAD',
        image: '/images/new_images/dindon.jpg',
        category: 'plats-africains',
        orderSteps: standardOrderSteps,
        extras: standardExtras
      },
      {
        id: 'african-5',
        nameKey: 'menu.items.mabokePoisson.name',
        descriptionKey: 'menu.items.mabokePoisson.description',
        price: 26.00,
        currency: 'CAD',
        image: '/images/new_images/maboke.jpg',
        category: 'plats-africains',
        orderSteps: standardOrderSteps,
        extras: standardExtras
      },
      {
        id: '105',
        nameKey: 'menu.items.brokenChicken.name',
        descriptionKey: 'menu.items.brokenChicken.description',
        price: 18.00,
        currency: 'CAD',
        image: '/images/new_images/broken_chicken.jpg',
        category: 'plats-africains',
        orderSteps: standardOrderSteps,
        extras: standardExtras
      }
    ]
  },
  {
    id: 'plats-creoles',
    nameKey: 'menu.categories.creole',
    items: [
      {
        id: '101',
        nameKey: 'menu.items.goatTassot.name',
        descriptionKey: 'menu.items.goatTassot.description',
        price: 20.00,
        currency: 'CAD',
        image: '/images/new_images/Goat Tassot.jpg',
        category: 'plats-creoles',
        orderSteps: standardOrderSteps,
        extras: standardExtras
      },
      {
        id: '102',
        nameKey: 'menu.items.vegetables.name',
        descriptionKey: 'menu.items.vegetables.description',
        price: 22.00,
        currency: 'CAD',
        image: '/images/new_images/vegtables.jpg',
        category: 'plats-creoles',
        orderSteps: standardOrderSteps,
        extras: standardExtras
      },
      {
        id: '103',
        nameKey: 'menu.items.chicken.name',
        descriptionKey: 'menu.items.chicken.description',
        price: 17.00,
        currency: 'CAD',
        image: '/images/new_images/Chickenn.jpg',
        category: 'plats-creoles',
        orderSteps: standardOrderSteps,
        extras: standardExtras
      },
      {
        id: '104',
        nameKey: 'menu.items.madesu.name',
        descriptionKey: 'menu.items.madesu.description',
        price: 19.00,
        currency: 'CAD',
        image: '/images/new_images/Madesu (bean sauce).jpg',
        category: 'plats-creoles',
        orderSteps: standardOrderSteps,
        extras: standardExtras
      },

    ]
  },
  {
    id: 'entrees',
    nameKey: 'menu.categories.entrees',
    items: [
      {
        id: '301',
        nameKey: 'menu.items.chickenWings4.name',
        descriptionKey: 'menu.items.chickenWings4.description',
        price: 8.00,
        currency: 'CAD',
        image: '/images/new_images/wings.jpg',
        category: 'entrees',
        orderSteps: standardOrderSteps,
        extras: standardExtras
      },
      {
        id: '302',
        nameKey: 'menu.items.samosas.name',
        descriptionKey: 'menu.items.samosas.description',
        price: 5.00,
        currency: 'CAD',
        image: '/images/new_images/samosa.jpg',
        category: 'entrees',
        orderSteps: standardOrderSteps,
        extras: standardExtras
      },
      {
        id: '303',
        nameKey: 'menu.items.saladMoment.name',
        descriptionKey: 'menu.items.saladMoment.description',
        price: 5.00,
        currency: 'CAD',
        image: '/images/new_images/Salad of the moment.jpg',
        category: 'entrees',
        orderSteps: standardOrderSteps,
        extras: standardExtras
      },
      {
        id: '304',
        nameKey: 'menu.items.soupeJour.name',
        descriptionKey: 'menu.items.soupeJour.description',
        price: 5.00,
        currency: 'CAD',
        image: '/images/new_images/soupe.webp',
        category: 'entrees',
        orderSteps: standardOrderSteps,
        extras: standardExtras
      }
    ]
  },
  {
    id: 'viandes-poissons',
    nameKey: 'menu.categories.meat',
    items: [
      {
        id: '201',
        nameKey: 'menu.items.makayabu.name',
        descriptionKey: 'menu.items.makayabu.description',
        price: 16.00,
        currency: 'CAD',
        image: '/images/new_images/Makayabu (Codfish).webp',
        category: 'viandes-poissons',
        isSeul: true
      },
      {
        id: '202',
        nameKey: 'menu.items.chickenDrumsticks.name',
        descriptionKey: 'menu.items.chickenDrumsticks.description',
        price: 13.00,
        currency: 'CAD',
        image: '/images/new_images/drumb_stick.jpg',
        category: 'viandes-poissons',
        isSeul: true
      },
      {
        id: '203',
        nameKey: 'menu.items.chickenWings6.name',
        descriptionKey: 'menu.items.chickenWings6.description',
        price: 10.00,
        currency: 'CAD',
        image: '/images/new_images/wings.jpg',
        category: 'viandes-poissons',
        isSeul: true
      },
      {
        id: '204',
        nameKey: 'menu.items.chickenWings12.name',
        descriptionKey: 'menu.items.chickenWings12.description',
        price: 18.00,
        currency: 'CAD',
        image: '/images/new_images/wings.jpg',
        category: 'viandes-poissons',
        isSeul: true
      },

      {
        id: '205',
        nameKey: 'menu.items.thomsonFishMeat.name',
        descriptionKey: 'menu.items.thomsonFishMeat.description',
        price: 16.00,
        currency: 'CAD',
        image: '/images/new_images/Thomson fish.jpg',
        category: 'viandes-poissons',
        isSeul: true
      },
      {
        id: '206',
        nameKey: 'menu.items.brokenFish.name',
        descriptionKey: 'menu.items.brokenFish.description',
        price: 19.00,
        currency: 'CAD',
        image: '/images/new_images/brokenfish.jpg',
        category: 'viandes-poissons',
        isSeul: true
      },
      {
        id: '207',
        nameKey: 'menu.items.goat.name',
        descriptionKey: 'menu.items.goat.description',
        price: 18.00,
        currency: 'CAD',
        image: '/images/new_images/goat.jpg',
        category: 'viandes-poissons',
        isSeul: true
      },
      {
        id: '208',
        nameKey: 'menu.items.tilapiaFish.name',
        descriptionKey: 'menu.items.tilapiaFish.description',
        price: 16.00,
        currency: 'CAD',
        image: '/images/new_images/Tilapia.jpg',
        category: 'viandes-poissons',
        isSeul: true
      }

    ]
  },
  {
    id: 'sides',
    nameKey: 'menu.categories.sides',
    items: [
      {
        id: '27',
        nameKey: 'menu.items.macaroniSalad.name',
        descriptionKey: 'menu.items.macaroniSalad.description',
        price: 11.00,
        currency: 'CAD',
        image: '/images/new_images/macaroni_salad.jpg',
        category: 'sides'
      },
      {
        id: '28',
        nameKey: 'menu.items.stickyRice.name',
        descriptionKey: 'menu.items.stickyRice.description',
        price: 8.00,
        currency: 'CAD',
        image: '/images/rizcolle.jpg', // no new image
        category: 'sides'
      },
      {
        id: '29',
        nameKey: 'menu.items.pondu.name',
        descriptionKey: 'menu.items.pondu.description',
        price: 5.00,
        currency: 'CAD',
        image: '/images/new_images/Pondu (Cassava Leaf Sauce).jpg',
        category: 'sides'
      },
      {
        id: '30',
        nameKey: 'menu.items.friedPlantains.name',
        descriptionKey: 'menu.items.friedPlantains.description',
        price: 4.00,
        currency: 'CAD',
        image: '/images/new_images/Fried Plantains (Haitian Style) (2).png',
        category: 'sides'
      },
      {
        id: '32',
        nameKey: 'menu.items.sweetPlantains.name',
        descriptionKey: 'menu.items.sweetPlantains.description',
        price: 4.00,
        currency: 'CAD',
        image: '/images/new_images/Bananesplantainssucrees.jpg',
        category: 'sides'
      },
      {
        id: '33',
        nameKey: 'menu.items.kwanga.name',
        descriptionKey: 'menu.items.kwanga.description',
        price: 5.00,
        currency: 'CAD',
        image: '/images/new_images/kwanga.jpg',
        category: 'sides'
      },
      {
        id: '34',
        nameKey: 'menu.items.madesauSauce.name',
        descriptionKey: 'menu.items.madesauSauce.description',
        price: 5.00,
        currency: 'CAD',
        image: '/images/Madesu.jpg',
        category: 'sides'
      },
      {
        id: '35',
        nameKey: 'menu.items.safou.name',
        descriptionKey: 'menu.items.safou.description',
        price: 5.00,
        currency: 'CAD',
        image: '/images/new_images/2 Safou (African plums).webp',
        category: 'sides'
      },
      {
        id: '36',
        nameKey: 'menu.items.fumbwaSide.name',
        descriptionKey: 'menu.items.fumbwaSide.description',
        price: 7.00,
        currency: 'CAD',
        image: '/images/new_images/Fumbwa.jpg',
        category: 'sides'
      },
      {
        id: '37',
        nameKey: 'menu.items.patesChoix.name',
        descriptionKey: 'menu.items.patesChoix.description',
        price: 3.00,
        currency: 'CAD',
        image: '/images/new_images/pate.webp',
        category: 'sides'
      },
      {
        id: '38',
        nameKey: 'menu.items.whiteRice.name',
        descriptionKey: 'menu.items.whiteRice.description',
        price: 6.00,
        currency: 'CAD',
        image: '/images/new_images/rizblanc.jpeg',
        category: 'sides'
      },
      {
        id: '39',
        nameKey: 'menu.items.djonDjonRice.name',
        descriptionKey: 'menu.items.djonDjonRice.description',
        price: 11.00,
        currency: 'CAD',
        image: '/images/new_images/djondjonriz.webp',
        category: 'sides'
      },
      {
        id: '40',
        nameKey: 'menu.items.vegetableRice.name',
        descriptionKey: 'menu.items.vegetableRice.description',
        price: 11.00,
        currency: 'CAD',
        image: '/images/new_images/rizveg.jpg',
        category: 'sides'
      },
      {
        id: '41',
        nameKey: 'menu.items.greenSalad.name',
        descriptionKey: 'menu.items.greenSalad.description',
        price: 8.00,
        currency: 'CAD',
        image: '/images/new_images/Salad of the moment.jpg',
        category: 'sides'
      }
    ]
  },
  {
    id: 'boissons',
    nameKey: 'menu.categories.drinks',
    items: [
      {
        id: '42',
        nameKey: 'menu.items.juice.name',
        descriptionKey: 'menu.items.juice.description',
        price: 3.00,
        currency: 'CAD',
        image: '/images/new_images/pomme.webp',
        category: 'boissons'
      },
      {
        id: '43',
        nameKey: 'menu.items.gingerJuice.name',
        descriptionKey: 'menu.items.gingerJuice.description',
        price: 7.00,
        currency: 'CAD',
        image: '/images/new_images/gingermbre.avif',
        category: 'boissons'
      },
      {
        id: '44',
        nameKey: 'menu.items.bissapJuice.name',
        descriptionKey: 'menu.items.bissapJuice.description',
        price: 7.00,
        currency: 'CAD',
        image: '/images/new_images/bissap.JPG',
        category: 'boissons'
      },
      {
        id: '45',
        nameKey: 'menu.items.maltan.name',
        descriptionKey: 'menu.items.maltan.description',
        price: 2.00,
        currency: 'CAD',
        image: '/images/Maltan.jpg',
        category: 'boissons'
      },
      {
        id: '46',
        nameKey: 'menu.items.water.name',
        descriptionKey: 'menu.items.water.description',
        price: 2.00,
        currency: 'CAD',
        image: '/images/water.jpg',
        category: 'boissons'
      },
      {
        id: '47',
        nameKey: 'menu.items.softDrinks.name',
        descriptionKey: 'menu.items.softDrinks.description',
        price: 2.00,
        currency: 'CAD',
        image: '/images/soft-drinks.jpg',
        category: 'boissons'
      },
      {
        id: '48',
        nameKey: 'menu.items.colaChampagne.name',
        descriptionKey: 'menu.items.colaChampagne.description',
        price: 3.50,
        currency: 'CAD',
        image: '/images/Cola-Champan.jpg',
        category: 'boissons'
      }
    ]
  },
  {
    id: 'menu-enfants',
    nameKey: 'menu.categories.menuEnfants',
    items: [
      {
        id: '50',
        nameKey: 'menu.items.childrenWings.name',
        descriptionKey: 'menu.items.childrenWings.description',
        price: 8.00,
        currency: 'CAD',
        image: '/images/new_images/wings.jpg',
        category: 'menu-enfants'
      },
      {
        id: '51',
        nameKey: 'menu.items.childrenGriot.name',
        descriptionKey: 'menu.items.childrenGriot.description',
        price: 10.00,
        currency: 'CAD',
        image: '/images/griot_porc.avif',
        category: 'menu-enfants'
      },
      {
        id: '52',
        nameKey: 'menu.items.childrenChicken.name',
        descriptionKey: 'menu.items.childrenChicken.description',
        price: 10.00,
        currency: 'CAD',
        image: '/images/new_images/Chickenn.jpg',
        category: 'menu-enfants'
      }
    ]
  },
  {
    id: 'desserts',
    nameKey: 'menu.categories.desserts',
    items: [
      {
        id: '53',
        nameKey: 'menu.items.bananaSplit.name',
        descriptionKey: 'menu.items.bananaSplit.description',
        price: 8.00,
        currency: 'CAD',
        image: '/images/new_images/bananaSplit.jpg',
        category: 'desserts'
      },
      {
        id: '54',
        nameKey: 'menu.items.beignets.name',
        descriptionKey: 'menu.items.beignets.description',
        price: 4.00,
        currency: 'CAD',
        image: '/images/new_images/Beignets.jpeg',
        category: 'desserts'
      },
      {
        id: '55',
        nameKey: 'menu.items.iceCream.name',
        descriptionKey: 'menu.items.iceCream.description',
        price: 4.00,
        currency: 'CAD',
        image: '/images/new_images/Cremeglacee2boules.webp',
        category: 'desserts'
      }
    ]
  },
  {
    id: 'menu-midi',
    nameKey: 'menu.categories.menuMidi',
    noticeKey: 'menu.categories.menuMidiNotice',
    items: [
      {
        id: '60',
        nameKey: 'menu.items.midiWings.name',
        descriptionKey: 'menu.items.midiWings.description',
        price: 8.00,
        currency: 'CAD',
        image: '/images/new_images/wings.jpg',
        category: 'menu-midi'
      },
      {
        id: '61',
        nameKey: 'menu.items.midiGriot.name',
        descriptionKey: 'menu.items.midiGriot.description',
        price: 10.00,
        currency: 'CAD',
        image: '/images/griot_porc.avif',
        category: 'menu-midi'
      },
      {
        id: '62',
        nameKey: 'menu.items.midiChicken.name',
        descriptionKey: 'menu.items.midiChicken.description',
        price: 10.00,
        currency: 'CAD',
        image: '/images/chicken.avif',
        category: 'menu-midi'
      },
      {
        id: '63',
        nameKey: 'menu.items.midiTurkey.name',
        descriptionKey: 'menu.items.midiTurkey.description',
        price: 10.00,
        currency: 'CAD',
        image: '/images/new_images/Smoked Turkey.jpg',
        category: 'menu-midi'
      },
      {
        id: '64',
        nameKey: 'menu.items.midiGoat.name',
        descriptionKey: 'menu.items.midiGoat.description',
        price: 12.00,
        currency: 'CAD',
        image: '/images/goat.avif',
        category: 'menu-midi'
      },
      {
        id: '65',
        nameKey: 'menu.items.midiBeef.name',
        descriptionKey: 'menu.items.midiBeef.description',
        price: 12.00,
        currency: 'CAD',
        image: '/images/beef_tassot.avif',
        category: 'menu-midi'
      },
      {
        id: '66',
        nameKey: 'menu.items.midiVegetables.name',
        descriptionKey: 'menu.items.midiVegetables.description',
        price: 14.00,
        currency: 'CAD',
        image: '/images/new_images/Vegetables.jpg',
        category: 'menu-midi'
      },
      {
        id: '67',
        nameKey: 'menu.items.midiFritaille.name',
        descriptionKey: 'menu.items.midiFritaille.description',
        price: 14.00,
        currency: 'CAD',
        image: '/images/fritaille.avif',
        category: 'menu-midi'
      }
    ]
  }
];

export const getAllMenuItems = (): MenuItem[] => {
  return menuCategories.flatMap(category => category.items);
};

export const getPopularItems = (): MenuItem[] => {
  return getAllMenuItems().filter(item => item.popular);
};
