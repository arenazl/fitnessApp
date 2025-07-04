import React from 'react';
import { BarChart3, User, UtensilsCrossed, ShoppingCart, Star } from 'lucide-react';

const BottomNavigation = ({ currentScreen, setCurrentScreen, cartItemCount = 0 }) => {
  const navItems = [
    { id: 'menu', icon: UtensilsCrossed, label: 'Menú' },
    { id: 'cart', icon: ShoppingCart, label: 'Carrito' },
    { id: 'discover', icon: Star, label: 'Descubrir' },
    { id: 'orders', icon: BarChart3, label: 'Pedidos' },
    { id: 'profile', icon: User, label: 'Perfil' }
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around items-center py-3 px-6">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentScreen === item.id;
          const isCart = item.id === 'cart';
          const showBadge = isCart && cartItemCount > 0;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentScreen(item.id)}
              className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 transform ${
                isActive || (isCart && cartItemCount > 0)
                  ? 'text-blue-500 scale-110 font-bold' 
                  : 'text-gray-400 hover:text-gray-600 hover:scale-105'
              }`}
            >
              <div className={`relative p-2 rounded-full transition-all duration-300 ${
                isActive || (isCart && cartItemCount > 0)
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'hover:bg-gray-100'
              }`}>
                <IconComponent size={20} />
                {/* Badge para el carrito */}
                {isCart && cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
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