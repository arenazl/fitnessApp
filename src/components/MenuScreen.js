import React, { useState, useEffect } from 'react';
import { Star, Plus, Minus } from 'lucide-react';

const MenuScreen = ({ onGoBack, canGoBack, onNavigate, onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('comidas');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [cartItems, setCartItems] = useState([]);

  // Estructura de categorías y subcategorías
  const categories = {
    comidas: {
      name: 'Comidas',
      icon: '🍽️',
      gradient: 'from-orange-400 to-red-500',
      subcategories: {
        all: 'Todo',
        entradas: 'Entradas',
        principales: 'Principales',
        postres: 'Postres'
      }
    },
    bebidas: {
      name: 'Bebidas',
      icon: '🥤',
      gradient: 'from-blue-400 to-purple-500',
      subcategories: {
        all: 'Todo',
        alcoholicas: 'Alcohólicas',
        normales: 'Sin Alcohol',
        calientes: 'Calientes'
      }
    },
    especiales: {
      name: 'Especiales',
      icon: '⭐',
      gradient: 'from-green-400 to-blue-500',
      subcategories: {
        all: 'Todo',
        diarios: 'Del Día',
        temporada: 'Temporada',
        chef: 'Del Chef'
      }
    }
  };

  const products = [
    // Comidas - Entradas
    {
      id: 1,
      name: 'Ensalada César Premium',
      description: 'Lechuga romana, pollo grillado, crutones artesanales, parmesano y aderezo césar casero',
      price: 12.99,
      category: 'comidas',
      subcategory: 'entradas',
      rating: 4.8,
      image: '🥗',
      popular: true,
      preparationTime: '10-15 min'
    },
    {
      id: 2,
      name: 'Bruschetta Italiana',
      description: 'Pan tostado con tomate fresco, albahaca, ajo y aceite de oliva extra virgen',
      price: 8.50,
      category: 'comidas',
      subcategory: 'entradas',
      rating: 4.6,
      image: '🍞',
      popular: false,
      preparationTime: '5-10 min'
    },
    // Comidas - Principales
    {
      id: 3,
      name: 'Hamburguesa Gourmet',
      description: 'Carne angus 200g, queso cheddar, tocino, cebolla caramelizada y papas rústicas',
      price: 18.50,
      category: 'comidas',
      subcategory: 'principales',
      rating: 4.9,
      image: '🍔',
      popular: true,
      preparationTime: '15-20 min'
    },
    {
      id: 4,
      name: 'Pasta Carbonara',
      description: 'Pasta fresca con panceta, huevo, parmesano y pimienta negra recién molida',
      price: 15.75,
      category: 'comidas',
      subcategory: 'principales',
      rating: 4.7,
      image: '🍝',
      popular: false,
      preparationTime: '12-18 min'
    },
    // Comidas - Postres
    {
      id: 5,
      name: 'Cheesecake de Frutos Rojos',
      description: 'Cheesecake cremoso con salsa de frutos rojos y base de galleta',
      price: 8.99,
      category: 'comidas',
      subcategory: 'postres',
      rating: 4.8,
      image: '🍰',
      popular: true,
      preparationTime: '5 min'
    },
    // Bebidas - Sin Alcohol
    {
      id: 6,
      name: 'Smoothie Verde Detox',
      description: 'Espinaca, manzana verde, plátano, jengibre y proteína vegetal',
      price: 6.50,
      category: 'bebidas',
      subcategory: 'normales',
      rating: 4.5,
      image: '🥤',
      popular: true,
      preparationTime: '3-5 min'
    },
    {
      id: 7,
      name: 'Limonada Artesanal',
      description: 'Limón fresco, menta, agua mineral y toque de jengibre',
      price: 4.99,
      category: 'bebidas',
      subcategory: 'normales',
      rating: 4.4,
      image: '🍋',
      popular: false,
      preparationTime: '2-3 min'
    },
    // Bebidas - Alcohólicas
    {
      id: 8,
      name: 'Mojito Clásico',
      description: 'Ron blanco, menta fresca, lima, azúcar y agua mineral',
      price: 9.50,
      category: 'bebidas',
      subcategory: 'alcoholicas',
      rating: 4.7,
      image: '🍹',
      popular: true,
      preparationTime: '3-5 min'
    },
    // Bebidas - Calientes
    {
      id: 9,
      name: 'Café Latte Premium',
      description: 'Espresso doble con leche vaporizada y arte latte',
      price: 5.50,
      category: 'bebidas',
      subcategory: 'calientes',
      rating: 4.6,
      image: '☕',
      popular: false,
      preparationTime: '3-5 min'
    },
    // Especiales
    {
      id: 10,
      name: 'Plato del Chef',
      description: 'Salmón a la plancha con quinoa, vegetales asados y salsa de mango',
      price: 24.99,
      category: 'especiales',
      subcategory: 'chef',
      rating: 4.9,
      image: '🐟',
      popular: true,
      preparationTime: '20-25 min'
    }
  ];

  useEffect(() => {
    // Reset subcategory when category changes
    setSelectedSubcategory('all');
    // Notify parent component about category change
    if (onCategoryChange) {
      onCategoryChange(selectedCategory);
    }
  }, [selectedCategory, onCategoryChange]);

  const filteredProducts = products.filter(product => {
    const matchesCategory = product.category === selectedCategory;
    const matchesSubcategory = selectedSubcategory === 'all' || product.subcategory === selectedSubcategory;
    return matchesCategory && matchesSubcategory;
  });

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => {
      return prev.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, item.quantity - 1) }
          : item
      ).filter(item => item.quantity > 0);
    });
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
    <div className="relative bg-gradient-to-br from-gray-50 to-white min-h-screen pb-24">
      {/* Categorías principales - Cards modernas */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`relative overflow-hidden rounded-2xl p-4 transition-all duration-300 transform ${
                selectedCategory === key
                  ? 'scale-105 shadow-xl'
                  : 'scale-100 shadow-lg hover:scale-102 hover:shadow-xl'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} ${
                selectedCategory === key ? 'opacity-100' : 'opacity-70'
              }`} />
              <div className="relative z-10 text-center">
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="text-white font-semibold text-sm">{category.name}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Subcategorías - Chips modernos */}
      <div className="px-6 mb-8">
        <div className="flex flex-wrap gap-3">
          {Object.entries(categories[selectedCategory].subcategories).map(([key, name]) => (
            <button
              key={key}
              onClick={() => setSelectedSubcategory(key)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedSubcategory === key
                  ? `bg-gradient-to-r ${categories[selectedCategory].gradient} text-white shadow-lg transform scale-105`
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md hover:shadow-lg'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de productos */}
      <div className="px-6 space-y-4">
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            className="bg-white rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-100"
            style={{ animationDelay: `${index * 100}ms` }}
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
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      ${product.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Controles del carrito */}
              <div className="flex flex-col items-center space-y-2">
                {getCartQuantity(product.id) === 0 ? (
                  <button
                    onClick={() => addToCart(product)}
                    className={`w-12 h-12 bg-gradient-to-r ${categories[selectedCategory].gradient} rounded-2xl flex items-center justify-center hover:scale-110 transition-all duration-200 shadow-lg`}
                  >
                    <Plus className="w-6 h-6 text-white" />
                  </button>
                ) : (
                  <div className="flex flex-col items-center space-y-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-200 shadow-md"
                    >
                      <Plus className="w-5 h-5 text-white" />
                    </button>
                    <span className="w-8 text-center font-bold text-gray-800 bg-gray-100 rounded-lg py-1">
                      {getCartQuantity(product.id)}
                    </span>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-200 shadow-md"
                    >
                      <Minus className="w-5 h-5 text-white" />
                    </button>
                  </div>
                )}
              </div>
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