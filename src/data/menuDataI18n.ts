import { useTranslation } from 'react-i18next';

export interface MenuExtra {
  id: string;
  nameKey: string;
  price: number;
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
}

export interface MenuCategory {
  id: string;
  nameKey: string;
  items: MenuItem[];
}

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
        image: '/images/threepoutine.png',
        category: 'special',
        popular: true
      },
      {
        id: 'special-2',
        nameKey: 'menu.items.grandePoutine.name',
        descriptionKey: 'menu.items.grandePoutine.description',
        price: 14.99,
        currency: 'CAD',
        image: '/images/threepoutine.png',
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
      },
      {
        id: 'african-1',
        nameKey: 'menu.items.pondu.name',
        descriptionKey: 'menu.items.pondu.description',
        price: 17.00,
        currency: 'CAD',
        image: '/images/Madesu.avif',
        category: 'plats-africains'
      },
      {
        id: 'african-2',
        nameKey: 'menu.items.fumbwa.name',
        descriptionKey: 'menu.items.fumbwa.description',
        price: 17.00,
        currency: 'CAD',
        image: '/images/Madesu.avif',
        category: 'plats-africains'
      },
      {
        id: 'african-3',
        nameKey: 'menu.items.makoso.name',
        descriptionKey: 'menu.items.makoso.description',
        price: 17.00,
        currency: 'CAD',
        image: '/images/chicken.avif',
        category: 'plats-africains'
      },
      {
        id: 'african-4',
        nameKey: 'menu.items.dindonFume.name',
        descriptionKey: 'menu.items.dindonFume.description',
        price: 19.00,
        currency: 'CAD',
        image: '/images/chicken.avif',
        category: 'plats-africains'
      },
      {
        id: 'african-5',
        nameKey: 'menu.items.libokePoisson.name',
        descriptionKey: 'menu.items.libokePoisson.description',
        price: 26.00,
        currency: 'CAD',
        image: '/images/thomson_fish.avif',
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
      },
      {
        id: '31',
        nameKey: 'menu.items.safou.name',
        descriptionKey: 'menu.items.safou.description',
        price: 5.00,
        currency: 'CAD',
        image: '/images/fritaille.avif',
        category: 'sides'
      }
    ]
  },
  {
    id: 'boissons',
    nameKey: 'menu.categories.drinks',
    items: [
      {
        id: '32',
        nameKey: 'menu.items.juice.name',
        descriptionKey: 'menu.items.juice.description',
        price: 3.00,
        currency: 'CAD',
        image: '/images/juice.webp',
        category: 'boissons'
      },
      {
        id: '33',
        nameKey: 'menu.items.maltan.name',
        descriptionKey: 'menu.items.maltan.description',
        price: 2.00,
        currency: 'CAD',
        image: '/images/Maltan.jpg',
        category: 'boissons'
      },
      {
        id: '34',
        nameKey: 'menu.items.water.name',
        descriptionKey: 'menu.items.water.description',
        price: 2.00,
        currency: 'CAD',
        image: '/images/water.jpg',
        category: 'boissons'
      },
      {
        id: '35',
        nameKey: 'menu.items.softDrinks.name',
        descriptionKey: 'menu.items.softDrinks.description',
        price: 2.00,
        currency: 'CAD',
        image: '/images/soft-drinks.jpg',
        category: 'boissons'
      },
      {
        id: '36',
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

export const getAllMenuItems = (): MenuItem[] => {
  return menuCategories.flatMap(category => category.items);
};

export const getPopularItems = (): MenuItem[] => {
  return getAllMenuItems().filter(item => item.popular);
};
