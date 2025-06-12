import React from 'react';

export default function Header() {
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
      <nav className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-[color:var(--color-primary)]">
          Restaurant Maman Jeanne
        </div>
        <ul className="flex items-center space-x-8">
          <li><a href="#" className="hover:text-[color:var(--color-secondary)]">Accueil</a></li>
          <li><a href="#" className="hover:text-[color:var(--color-secondary)]">Menu</a></li>
          <li className="relative group">
            <button className="bg-[color:var(--color-primary)] text-white px-4 py-2 rounded-md transition-colors group-hover:bg-[color:var(--color-secondary)]">
              Order Now
            </button>
            <div className="absolute right-0 mt-2 hidden flex-col bg-white border rounded-md shadow-lg group-hover:flex">
              <a href="https://www.ubereats.com" className="px-4 py-2 hover:bg-gray-100 whitespace-nowrap">UberEats</a>
              <a href="https://www.doordash.com/store/restaurant-maman-jeanne-inc-montr%C3%A9al-31548079/45475549/" className="px-4 py-2 hover:bg-gray-100 whitespace-nowrap">DoorDash</a>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
