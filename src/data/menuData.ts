export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  popular?: boolean;
  spicy?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'special',
    name: 'Menu Spécial / Special Menu',
    items: [
      {
        id: 'special-1',
        name: '3 Poutines',
        description: 'Mystère à venir... Trois poutines spéciales qui seront bientôt révélées / Mystery coming soon... Three special poutines to be revealed',
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
    name: 'Plats Populaires',
    items: [
      {
        id: '1',
        name: 'Griot de Porc',
        description: 'Tender pork pieces marinated in citrus, slow-cooked, and garnished with fresh herbs',
        price: 17.00,
        currency: 'CAD',
        image: '/images/griot_porc.avif',
        category: 'featured',
        popular: true
      },
      {
        id: '2',
        name: 'Tassot de Bœuf',
        description: 'Marinated and fried beef chunks, garnished with fresh herbs and served with a lemon',
        price: 20.00,
        currency: 'CAD',
        image: '/images/beef_tassot.png',
        category: 'featured',
        popular: true
      },
      {
        id: '3',
        name: 'Fritaille',
        description: 'Mélange de viandes / Mixed meats',
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
    name: 'Nos Plats Africains / Our African Dishes',
    items: [
      {
        id: '4',
        name: 'Chèvre / Goat',
        description: 'Kwanga (cassava bread), white rice, sticky rice, or fufu (West African dough)',
        price: 24.00,
        currency: 'CAD',
        image: '/images/goat.avif',
        category: 'plats-africains'
      },
      {
        id: '5',
        name: 'Deux cuisses / Half Chicken',
        description: 'Kwanga (cassava bread), white rice, sticky rice, or Fufu (pounded yam)',
        price: 23.00,
        currency: 'CAD',
        image: '/images/half_chicken.avif',
        category: 'plats-africains'
      },
      {
        id: '6',
        name: 'Poisson Thomson / Thomson Fish',
        description: 'Et pondu (sauce aux feuilles de manioc) / And pondu (cassava leaf sauce)',
        price: 24.00,
        currency: 'CAD',
        image: '/images/thomson_fish.avif',
        category: 'plats-africains'
      },
      {
        id: '7',
        name: '8 Ailes de Poulet / 8 Chicken Wings',
        description: 'Kwanga, white rice, sticky rice, or fufu',
        price: 18.00,
        currency: 'CAD',
        image: '/images/eight_chicken_wings.avif',
        category: 'plats-africains'
      },
      {
        id: '8',
        name: '2 Makayabus (morues) / 2 Makayabus',
        description: 'Avec fumbwa (sauce aux feuilles et à la pâte d\'arachides) / With fumbwa (peanut paste sauce)',
        price: 26.00,
        currency: 'CAD',
        image: '/images/two_Makayabus.avif',
        category: 'plats-africains'
      }
    ]
  },
  {
    id: 'plats-creoles',
    name: 'Nos Plats Créoles / Our Creole Dishes',
    items: [
      {
        id: '9',
        name: 'Tassot Chèvre / Goat Tassot',
        description: 'Tender goat meat marinated and fried, served with a flavorful Creole sauce',
        price: 20.00,
        currency: 'CAD',
        image: '/images/goat_tassot.avif',
        category: 'plats-creoles'
      },
      {
        id: '10',
        name: 'Légumes / Vegetables',
        description: 'Mélange de cubes de bœuf et d\'une variété de légumes en sauce / Mixture of cubed beef and a variety of vegetables in sauce',
        price: 22.00,
        currency: 'CAD',
        image: '/images/salad_of_the_moment.avif',
        category: 'plats-creoles'
      },
      {
        id: '11',
        name: 'Poulet / Chicken',
        description: 'Tender chicken served with a medley of sautéed vegetables and a side of steamed rice',
        price: 17.00,
        currency: 'CAD',
        image: '/images/chicken.avif',
        category: 'plats-creoles'
      },
      {
        id: '12',
        name: 'Madesu (sauce aux haricots)',
        description: 'Servie avec riz ou pondu (sauce aux feuilles de manioc) ou fumbwa (sauce aux feuilles et à la pâte d\'arachides)',
        price: 19.00,
        currency: 'CAD',
        image: '/images/Madesu.avif',
        category: 'plats-creoles'
      },
      {
        id: '13',
        name: 'Tilapia',
        description: 'Avec du modesu (sauce aux haricots blancs) / with modesu (white bean sauce)',
        price: 22.00,
        currency: 'CAD',
        image: '/images/tilapia.avif',
        category: 'plats-creoles'
      },
      {
        id: '14',
        name: 'Tilapia (version 2)',
        description: 'Avec du modesu (sauce aux haricots blancs) / With modesu (white Bean sauce)',
        price: 26.00,
        currency: 'CAD',
        image: '/images/tilapia.avif',
        category: 'plats-creoles'
      },
      {
        id: '15',
        name: 'Poulet Brisé / Broken Chicken',
        description: 'Poulet tendre mijoté dans une sauce créole savoureuse / Tender chicken simmered in flavorful Creole sauce',
        price: 18.00,
        currency: 'CAD',
        image: '/images/pouletbrise.jpg',
        category: 'plats-creoles'
      }
    ]
  },
  {
    id: 'entrees',
    name: 'Entrées / Starters',
    items: [
      {
        id: '16',
        name: 'Ailes de poulet (4) / Chicken Wings (4)',
        description: 'Ailes de poulet marinées aux épices créoles',
        price: 8.00,
        currency: 'CAD',
        image: '/images/eight_chicken_wings.avif',
        category: 'entrees'
      },
      {
        id: '17',
        name: 'Samosas (2)',
        description: 'Délicieux samosas croustillants',
        price: 5.00,
        currency: 'CAD',
        image: '/images/two_Makayabus.avif',
        category: 'entrees'
      },
      {
        id: '18',
        name: 'Salade du moment / Salad of the moment',
        description: 'Crisp lettuce, sliced cucumbers, cherry tomatoes, croutons, and a sprinkle of grated cheese',
        price: 5.00,
        currency: 'CAD',
        image: '/images/salad_of_the_moment.avif',
        category: 'entrees'
      }
    ]
  },
  {
    id: 'viandes-poissons',
    name: 'Viandes et Poissons / Meat and Fish',
    items: [
      {
        id: '19',
        name: 'Makayabu (morue) / Makayabu (Codfish)',
        description: 'Morue traditionnelle préparée aux épices',
        price: 16.00,
        currency: 'CAD',
        image: '/images/two_Makayabus.avif',
        category: 'viandes-poissons'
      },
      {
        id: '20',
        name: 'Pilons de poulet (6) / Chicken Drumsticks (6)',
        description: 'Six pilons de poulet marinés et grillés',
        price: 13.00,
        currency: 'CAD',
        image: '/images/chicken.avif',
        category: 'viandes-poissons'
      },
      {
        id: '21',
        name: 'Ailes de poulet / Chicken Wings',
        description: 'Chicken Wings Choice of 6 or 12 pieces',
        price: 10.00,
        currency: 'CAD',
        image: '/images/eight_chicken_wings.avif',
        category: 'viandes-poissons'
      },
      {
        id: '22',
        name: 'Tilapia',
        description: 'Poisson tilapia frais grillé',
        price: 16.00,
        currency: 'CAD',
        image: '/images/tilapia.avif',
        category: 'viandes-poissons'
      },
      {
        id: '23',
        name: 'Poisson Thomson / Thomson fish',
        description: 'Poisson Thomson grillé aux épices',
        price: 16.00,
        currency: 'CAD',
        image: '/images/thomson_fish.avif',
        category: 'viandes-poissons'
      },
      {
        id: '24',
        name: 'Poisson Brisé / Broken Fish',
        description: 'Poisson tendre mijoté dans une sauce savoureuse / Tender fish simmered in flavorful sauce',
        price: 19.00,
        currency: 'CAD',
        image: '/images/poissonbrise.jpg',
        category: 'viandes-poissons'
      }
    ]
  },
  {
    id: 'sides',
    name: 'Les À-côtés / Sides',
    items: [
      {
        id: '25',
        name: 'Salade de macaroni / Macaroni Salad',
        description: 'Salade de macaroni crémeuse et savoureuse',
        price: 11.00,
        currency: 'CAD',
        image: '/images/Macaroni-Salad.jpg',
        category: 'sides'
      },
      {
        id: '26',
        name: 'Riz collé (avec haricots rouges) / Sticky Rice (With Kidney Beans)',
        description: 'Riz collant traditionnel aux haricots rouges',
        price: 8.00,
        currency: 'CAD',
        image: '/images/rizcolle.jpg',
        category: 'sides'
      },
      {
        id: '27',
        name: 'Pondu (sauce aux feuilles de manioc) / Pondu (Cassava Leaf Sauce)',
        description: 'Sauce traditionnelle aux feuilles de manioc',
        price: 5.00,
        currency: 'CAD',
        image: '/images/Madesu.avif',
        category: 'sides'
      },
      {
        id: '28',
        name: 'Plantains Paisés (à la façon haïtienne) (2) / Fried Plantains (Haitian Style) (2)',
        description: 'Deux plantains paisés à la façon haïtienne',
        price: 4.00,
        currency: 'CAD',
        image: '/images/fritaille.avif',
        category: 'sides'
      },
      {
        id: '29',
        name: 'Kwanga (bâton de manioc) / Kwanga (Cassava Stick)',
        description: 'Bâton de manioc traditionnel',
        price: 5.00,
        currency: 'CAD',
        image: '/images/two_Makayabus.avif',
        category: 'sides'
      },
      {
        id: '30',
        name: 'Madesu (sauce aux haricots blancs) / Madesu (white Bean Sauce)',
        description: 'Sauce aux haricots blancs traditionnelle',
        price: 5.00,
        currency: 'CAD',
        image: '/images/Madesu.avif',
        category: 'sides'
      }
    ]
  },
  {
    id: 'boissons',
    name: 'Boissons / Drinks',
    items: [
      {
        id: '31',
        name: 'Jus / Juice',
        description: 'Juice: Choice of flavors: Pineapple, Ginger, Oranges, Apples',
        price: 3.00,
        currency: 'CAD',
        image: '/images/juice.webp',
        category: 'boissons'
      },
      {
        id: '32',
        name: 'Maltan',
        description: 'Boisson maltée traditionnelle',
        price: 2.00,
        currency: 'CAD',
        image: '/images/Maltan.jpg',
        category: 'boissons'
      },
      {
        id: '33',
        name: 'Eau / Water',
        description: 'Pure, refreshing hydration',
        price: 2.00,
        currency: 'CAD',
        image: '/images/water.jpg',
        category: 'boissons'
      },
      {
        id: '34',
        name: 'Boissons gazéifiées / Soft drinks',
        description: 'Cola, Diet Cola, or Lemon-Lime soda options',
        price: 2.00,
        currency: 'CAD',
        image: '/images/soft-drinks.jpg',
        category: 'boissons'
      },
      {
        id: '35',
        name: 'Cola Champagne',
        description: 'Puerto Rican favorite- a uniquely tantalizing taste',
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
