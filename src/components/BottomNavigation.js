import React from 'react';
import { BarChart3, User, UtensilsCrossed, ShoppingCart } from 'lucide-react';

const BottomNavigation = ({ currentScreen, setCurrentScreen }) => {
  const navItems = [
    { id: 'menu', icon: UtensilsCrossed, label: 'Menú' },
    { id: 'cart', icon: ShoppingCart, label: 'Carrito' },
    { id: 'orders', icon: BarChart3, label: 'Pedidos' },
    { id: 'profile', icon: User, label: 'Perfil' }
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around items-center py-3 px-6">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setCurrentScreen(item.id)}
              className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 transform ${
                isActive 
                  ? 'text-blue-500 scale-110' 
                  : 'text-gray-400 hover:text-gray-600 hover:scale-105'
              }`}
            >
              <div className={`p-2 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'hover:bg-gray-100'
              }`}>
                <IconComponent size={20} />
              </div>
              <span className={`text-xs mt-1 font-medium transition-all duration-300 ${
                isActive 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-2'
              }`}>
                {item.label}
              </span>
              {/* Active indicator dot */}
              {isActive && (
                <div className="w-1 h-1 bg-blue-500 rounded-full mt-1 animate-pulse"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation; 