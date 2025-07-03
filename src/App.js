import React, { useState } from 'react';
import MenuScreen from './components/MenuScreen';
import CartScreen from './components/CartScreen';
import OrdersScreen from './components/OrdersScreen';
import RestaurantProfileScreen from './components/RestaurantProfileScreen';
import BottomNavigation from './components/BottomNavigation';

function App() {
  const [currentScreen, setCurrentScreen] = useState('menu');
  const [navigationHistory, setNavigationHistory] = useState(['menu']);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('comidas');

  // Gradientes por categoría
  const categoryGradients = {
    comidas: 'from-orange-400 to-red-500',
    bebidas: 'from-blue-400 to-purple-500',
    especiales: 'from-green-400 to-blue-500'
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const navigateToScreen = (screen) => {
    if (screen === currentScreen) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScreen(screen);
      setNavigationHistory(prev => [...prev, screen]);
      setIsTransitioning(false);
    }, 150);
  };

  const goBack = () => {
    if (navigationHistory.length > 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        const newHistory = navigationHistory.slice(0, -1);
        setNavigationHistory(newHistory);
        setCurrentScreen(newHistory[newHistory.length - 1]);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const renderScreen = () => {
    const screenProps = {
      onNavigate: navigateToScreen,
      onGoBack: goBack,
      canGoBack: navigationHistory.length > 1
    };

    switch (currentScreen) {
      case 'menu':
        return <MenuScreen {...screenProps} onCategoryChange={handleCategoryChange} />;
      case 'cart':
        return <CartScreen {...screenProps} />;
      case 'orders':
        return <OrdersScreen {...screenProps} />;
      case 'profile':
        return <RestaurantProfileScreen {...screenProps} />;
      default:
        return <MenuScreen {...screenProps} onCategoryChange={handleCategoryChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Mobile Container */}
      <div className="max-w-sm mx-auto bg-white min-h-screen relative overflow-hidden">
        {/* Fixed Header - Solo para MenuScreen */}
        {currentScreen === 'menu' && (
          <div className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm z-50 bg-gradient-to-r ${categoryGradients[selectedCategory]} p-6 rounded-b-3xl shadow-lg`}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-white">Restaurante</h1>
                <p className="text-white/80 text-sm">Deliciosa comida casera</p>
              </div>
              <button 
                onClick={() => navigateToScreen('cart')}
                className="relative w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all duration-200 hover:scale-105"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M6 19a1 1 0 100 2 1 1 0 000-2zm10 0a1 1 0 100 2 1 1 0 000-2z" />
                </svg>
              </button>
            </div>
            
            {/* Barra de búsqueda */}
            <div className="relative">
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="¿Qué te apetece hoy?"
                className="w-full pl-12 pr-12 py-4 bg-white/90 backdrop-blur-sm rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 placeholder-gray-500"
              />
            </div>
          </div>
        )}

        {/* Main Content with Animation */}
        <div className={`${currentScreen === 'menu' ? 'pt-40' : ''} pb-20 transition-all duration-300 ease-in-out ${
          isTransitioning ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'
        }`}>
          {renderScreen()}
        </div>
        
        {/* Bottom Navigation */}
        <BottomNavigation 
          currentScreen={currentScreen} 
          setCurrentScreen={navigateToScreen} 
        />
      </div>
    </div>
  );
}

export default App; 