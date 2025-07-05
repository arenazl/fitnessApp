import React, { useState, useEffect } from 'react';
import { Star, Plus, Minus } from 'lucide-react';

const MenuScreen = ({ onGoBack, canGoBack, onNavigate, onCategoryChange, searchTerm = '', onCartUpdate, cartItems = [], onProductSelect, categories, allProducts, handleSearchChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('comidas');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [activeQuantityControl, setActiveQuantityControl] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [autoCloseTimer, setAutoCloseTimer] = useState(null);

  // Definir los colores para el fondo gradual
  const categoryBgColorsUltraSoft = {
    comidas: [
      'rgba(251, 146, 60, 0.02)',
      'rgba(251, 146, 60, 0.05)',
      'rgba(251, 146, 60, 0.10)',
      'rgba(251, 146, 60, 0.18)',
      'rgba(239, 68, 68, 0.18)'
    ],
    bebidas: [
      'rgba(96, 165, 250, 0.02)',
      'rgba(96, 165, 250, 0.05)',
      'rgba(96, 165, 250, 0.10)',
      'rgba(96, 165, 250, 0.18)',
      'rgba(168, 85, 247, 0.18)'
    ],
    especiales: [
      'rgba(74, 222, 128, 0.02)',
      'rgba(74, 222, 128, 0.05)',
      'rgba(74, 222, 128, 0.10)',
      'rgba(74, 222, 128, 0.18)',
      'rgba(59, 130, 246, 0.18)'
    ]
  };
  const bgGradient = `linear-gradient(to bottom, white 0px, ${categoryBgColorsUltraSoft[selectedCategory][0]} 20px, ${categoryBgColorsUltraSoft[selectedCategory][1]} 50px, ${categoryBgColorsUltraSoft[selectedCategory][2]} 90px, ${categoryBgColorsUltraSoft[selectedCategory][3]} 140px, ${categoryBgColorsUltraSoft[selectedCategory][4]} 100%)`;

  useEffect(() => {
    // Reset subcategory when category changes
    setSelectedSubcategory('all');
    // Limpiar el input de búsqueda al cambiar de categoría
    if (handleSearchChange) {
      handleSearchChange('');
    }
    // Notify parent component about category change
    if (onCategoryChange) {
      onCategoryChange(selectedCategory);
    }
  }, [selectedCategory, onCategoryChange, handleSearchChange]);

  // Función para cerrar el modal con animación
  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setActiveQuantityControl(null);
      setIsClosing(false);
    }, 1500); // Duración de la animación de salida (1.5 segundos)
  };

  // Función para iniciar el timer de auto-cierre
  const startAutoCloseTimer = () => {
    // Limpiar timer existente
    if (autoCloseTimer) {
      clearTimeout(autoCloseTimer);
    }
    
    // Crear nuevo timer
    const timer = setTimeout(() => {
      closeModal();
    }, 3000); // 3 segundos
    
    setAutoCloseTimer(timer);
  };

  // Limpiar timer cuando el componente se desmonte o cambie el control activo
  useEffect(() => {
    if (activeQuantityControl) {
      startAutoCloseTimer();
    } else {
      if (autoCloseTimer) {
        clearTimeout(autoCloseTimer);
        setAutoCloseTimer(null);
      }
    }
    
    return () => {
      if (autoCloseTimer) {
        clearTimeout(autoCloseTimer);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeQuantityControl]);

  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = product.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubcategory = selectedSubcategory === 'all' || product.subcategory === selectedSubcategory;
    // Solo filtra por subcategoría si no hay búsqueda activa
    return matchesCategory && (searchTerm ? matchesSearch : matchesSubcategory);
  });

  const addToCart = (product) => {
    const existing = cartItems.find(item => item.id === product.id);
    let newCartItems;
    
    if (existing) {
      newCartItems = cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCartItems = [...cartItems, { ...product, quantity: 1 }];
    }
    
    if (onCartUpdate) {
      onCartUpdate(newCartItems);
    }
    
    // Reiniciar timer si el control está activo
    if (activeQuantityControl === product.id) {
      startAutoCloseTimer();
    }
  };

  const removeFromCart = (productId) => {
    const currentItem = cartItems.find(item => item.id === productId);
    const newCartItems = cartItems.map(item =>
      item.id === productId
        ? { ...item, quantity: Math.max(0, item.quantity - 1) }
        : item
    ).filter(item => item.quantity > 0);
    
    // Cerrar el control si la cantidad llega a 0
    if (currentItem && currentItem.quantity === 1) {
      closeModal();
    } else if (activeQuantityControl === productId) {
      // Reiniciar timer si el control sigue activo
      startAutoCloseTimer();
    }
    
    if (onCartUpdate) {
      onCartUpdate(newCartItems);
    }
  };

  const getCartQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Notify parent about initial category on mount
  useEffect(() => {
    if (onCategoryChange) {
      onCategoryChange(selectedCategory);
    }
  }, [onCategoryChange, selectedCategory]);

  return (
    <div className="relative min-h-screen pb-24" style={{ background: bgGradient }}>
      {/* Categorías principales - Cards modernas */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`relative overflow-hidden rounded-2xl p-4 transition-all duration-300 transform ${
                selectedCategory === key
                  ? 'scale-105 shadow-xl ring-4 ring-white ring-opacity-50'
                  : 'scale-100 shadow-lg hover:scale-102 hover:shadow-xl'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} ${
                selectedCategory === key ? 'opacity-100' : 'opacity-70'
              }`} />
              <div className="relative z-10 text-center">
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="text-white font-semibold text-sm">{category.name}</div>
                {selectedCategory === key && (
                  <div className="text-white/80 text-xs mt-1">Todo</div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Subcategorías - Chips modernos (sin "Todo") */}
      <div className="px-6 mb-8">
        {(() => {
          const subcategories = Object.entries(categories[selectedCategory].subcategories)
            .filter(([key]) => key !== 'all');
          
          return (
            <div className="grid grid-cols-3 gap-3">
              {subcategories.map(([key, name]) => (
                <button
                  key={key}
                  onClick={() => setSelectedSubcategory(key)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 text-center ${
                    selectedSubcategory === key
                      ? `bg-gradient-to-r ${categories[selectedCategory].gradient} text-white shadow-lg transform scale-105`
                      : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md hover:shadow-lg'
                  }`}
                >
                  {name}
                </button>
              ))}
              
              {/* Botón para volver a "Todo" */}
              {selectedSubcategory !== 'all' && (
                <button
                  onClick={() => setSelectedSubcategory('all')}
                  className="px-4 py-2 rounded-full font-medium transition-all duration-200 bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-md hover:shadow-lg text-center col-span-3"
                >
                  Ver Todo
                </button>
              )}
            </div>
          );
        })()}
      </div>

      {/* Lista de productos */}
      <div className="px-6 space-y-4">
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            className="relative bg-white rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-100 cursor-pointer active:scale-[0.98]"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={(e) => {
              // Solo navegar si no se está tocando el modal de cantidad o botones internos
              if (!activeQuantityControl && !e.target.closest('button')) {
                console.log('Panel clickeado para:', product.name);
                if (onProductSelect) {
                  onProductSelect(product);
                }
              }
            }}
          >
            <div className="flex items-start space-x-4">
              {/* Imagen del producto */}
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-4xl shadow-inner">
                {product.image}
              </div>

              {/* Información del producto */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-bold text-gray-800 text-lg">{product.name}</h3>
                      {product.popular && (
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm mb-3 leading-relaxed">{product.description}</p>
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 font-medium">{product.rating}</span>
                      </div>
                      <span className="text-gray-400 text-sm">⏱️ {product.preparationTime}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ${product.price}
                      </span>
                      
                      {/* Botón de cantidad */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Evitar que se active el click del panel
                          if (activeQuantityControl === product.id) {
                            closeModal();
                          } else {
                            setActiveQuantityControl(product.id);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-full font-medium transition-all duration-200 shadow-md hover:shadow-lg ${
                          getCartQuantity(product.id) === 0
                            ? `bg-gradient-to-r ${categories[selectedCategory].gradient} text-white hover:scale-105`
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {getCartQuantity(product.id) === 0 ? (
                          <Plus className="w-4 h-4" />
                        ) : (
                          <span className="text-sm font-bold">{getCartQuantity(product.id)}</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Control flotante de cantidad */}
              {activeQuantityControl === product.id && (
                <div 
                  className={`absolute inset-0 bg-black/20 backdrop-blur-sm rounded-3xl flex items-center justify-center z-10 ${
                    isClosing ? 'animate-fade-out' : 'animate-fade-in'
                  }`}
                  onClick={() => closeModal()}
                >
                  <div 
                    className={`bg-white rounded-2xl p-4 shadow-xl flex items-center space-x-4 ${
                      isClosing ? 'animate-scale-out' : 'animate-scale-in'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-200 shadow-md"
                    >
                      <Minus className="w-5 h-5 text-white" />
                    </button>
                    <span className="w-12 text-center font-bold text-gray-800 text-lg">
                      {getCartQuantity(product.id)}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-200 shadow-md"
                    >
                      <Plus className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Estado vacío */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16 px-6">
          <div className="text-8xl mb-6">🔍</div>
          <h3 className="text-2xl font-bold text-gray-600 mb-2">No encontramos nada</h3>
          <p className="text-gray-500">Intenta con otro término de búsqueda o categoría</p>
        </div>
      )}


    </div>
  );
};

export default MenuScreen; 