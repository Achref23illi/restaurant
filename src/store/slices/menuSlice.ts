import { createSlice } from '@reduxjs/toolkit';
import type { MenuItem, MenuCategory } from '../../data/menuDataI18n';
import { menuCategories } from '../../data/menuDataI18n';

interface MenuState {
  categories: MenuCategory[];
  allItems: MenuItem[];
  filteredItems: MenuItem[];
  activeCategory: string;
  searchQuery: string;
  isLoading: boolean;
  sidebarOpen: boolean;
  favorites: string[]; // Array of item IDs
}

const initialState: MenuState = {
  categories: menuCategories,
  allItems: menuCategories.flatMap(category => category.items),
  filteredItems: menuCategories.flatMap(category => category.items),
  activeCategory: 'all',
  searchQuery: '',
  isLoading: false,
  sidebarOpen: false,
  favorites: [],
};

// Helper function to move griot items to the end
const moveGriotLast = (items: MenuItem[]): MenuItem[] => {
  const griotItems = items.filter(item => 
    item.nameKey.toLowerCase().includes('griot') || 
    item.id === '1' || 
    item.id === '48' || 
    item.id === '54'
  );
  const otherItems = items.filter(item => 
    !item.nameKey.toLowerCase().includes('griot') && 
    item.id !== '1' && 
    item.id !== '48' && 
    item.id !== '54'
  );
  return [...otherItems, ...griotItems];
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setActiveCategory: (state, action: { payload: string }) => {
      state.activeCategory = action.payload;
      
      if (action.payload === 'all') {
        state.filteredItems = moveGriotLast(state.allItems);
      } else {
        const category = state.categories.find(cat => cat.id === action.payload);
        state.filteredItems = category ? moveGriotLast([...category.items]) : [];
      }
      
      // Apply search filter if there's a search query
      if (state.searchQuery) {
        state.filteredItems = state.filteredItems.filter(item =>
          item.nameKey.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          item.descriptionKey.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      }
    },
    
    setSearchQuery: (state, action: { payload: string }) => {
      state.searchQuery = action.payload;
      
      // Start with items from active category
      let items = state.activeCategory === 'all' 
        ? state.allItems 
        : state.categories.find(cat => cat.id === state.activeCategory)?.items || [];
      
      // Apply search filter
      if (action.payload) {
        items = items.filter(item =>
          item.nameKey.toLowerCase().includes(action.payload.toLowerCase()) ||
          item.descriptionKey.toLowerCase().includes(action.payload.toLowerCase())
        );
      }
      
      state.filteredItems = moveGriotLast(items);
    },
    
    setSidebarOpen: (state, action: { payload: boolean }) => {
      state.sidebarOpen = action.payload;
    },
    
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    
    addToFavorites: (state, action: { payload: string }) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    
    removeFromFavorites: (state, action: { payload: string }) => {
      state.favorites = state.favorites.filter(id => id !== action.payload);
    },
    
    toggleFavorite: (state, action: { payload: string }) => {
      if (state.favorites.includes(action.payload)) {
        state.favorites = state.favorites.filter(id => id !== action.payload);
      } else {
        state.favorites.push(action.payload);
      }
    },
    
    setLoading: (state, action: { payload: boolean }) => {
      state.isLoading = action.payload;
    },
    
    resetFilters: (state) => {
      state.activeCategory = 'all';
      state.searchQuery = '';
      state.filteredItems = moveGriotLast(state.allItems);
    },
  },
});

export const {
  setActiveCategory,
  setSearchQuery,
  setSidebarOpen,
  toggleSidebar,
  addToFavorites,
  removeFromFavorites,
  toggleFavorite,
  setLoading,
  resetFilters,
} = menuSlice.actions;

// Selectors
export const selectMenuCategories = (state: { menu: MenuState }) => state.menu.categories;
export const selectAllMenuItems = (state: { menu: MenuState }) => state.menu.allItems;
export const selectFilteredItems = (state: { menu: MenuState }) => state.menu.filteredItems;
export const selectActiveCategory = (state: { menu: MenuState }) => state.menu.activeCategory;
export const selectSearchQuery = (state: { menu: MenuState }) => state.menu.searchQuery;
export const selectSidebarOpen = (state: { menu: MenuState }) => state.menu.sidebarOpen;
export const selectFavorites = (state: { menu: MenuState }) => state.menu.favorites;
export const selectIsLoading = (state: { menu: MenuState }) => state.menu.isLoading;

// Complex selectors
export const selectCategoriesWithCounts = (state: { menu: MenuState }) => [
  { 
    id: 'all', 
    name: 'menu.categories.all', 
    count: state.menu.allItems.length 
  },
  ...state.menu.categories.map(category => ({
    id: category.id,
    name: category.nameKey,
    count: category.items.length
  }))
];

export const selectPopularItems = (state: { menu: MenuState }) =>
  state.menu.allItems.filter(item => item.popular);

export const selectFavoriteItems = (state: { menu: MenuState }) =>
  state.menu.allItems.filter(item => state.menu.favorites.includes(item.id));

export default menuSlice.reducer; 