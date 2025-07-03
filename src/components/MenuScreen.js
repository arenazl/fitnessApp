import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Star, Plus, Minus } from 'lucide-react';

const MenuScreen = ({ onGoBack, canGoBack, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [animateCards, setAnimateCards] = useState(false);

  const categories = [
    { id: 'all', name: 'Todo', icon: '🍽️' },
    { id: 'appetizers', name: 'Entradas', icon: '🥗' },
    { id: 'mains', name: 'Principales', icon: '🍖' },
    { id: 'desserts', name: 'Postres', icon: '🍰' },
    { id: 'drinks', name: 'Bebidas', icon: '🥤' }
  ];

  const products = [
    {
      id: 1,
      name: 'Ensalada César',
      description: 'Lechuga fresca, pollo grillado, crutones y aderezo césar',
      price: 12.99,
      category: 'appetizers',
      rating: 4.8,
      image: '🥗',
      popular: true
    },
    {
      id: 2,
      name: 'Hamburguesa Premium',
      description: 'Carne angus, queso cheddar, tocino y papas fritas',
      price: 18.50,
      category: 'mains',
      rating: 4.9,
      image: '🍔',
      popular: true
    },
    {
      id: 3,
      name: 'Pasta Carbonara',
      description: 'Pasta fresca con salsa carbonara y panceta',
      price: 15.75,
      category: 'mains',
      rating: 4.7,
      image: '🍝',
      popular: false
    },
    {
      id: 4,
      name: 'Cheesecake',
      description: 'Delicioso cheesecake con frutos rojos',
      price: 8.99,
      category: 'desserts',
      rating: 4.6,
      image: '🍰',
      popular: false
    },
    {
      id: 5,
      name: 'Smoothie Verde',
      description: 'Espinaca, manzana, plátano y proteína',
      price: 6.50,
      category: 'drinks',
      rating: 4.5,
      image: '🥤',
      popular: true
    }
  ];

  useEffect(() => {
    setAnimateCards(true);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
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

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="p-6 bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Restaurante</h1>
          <p className="text-gray-500 text-sm">Deliciosa comida casera</p>
        </div>
        <button 
          onClick={() => onNavigate('cart')}
          className="relative w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-200 hover:scale-105"
        >
          <ShoppingCart className="w-6 h-6 text-white" />
          {getTotalItems() > 0 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">{getTotalItems()}</span>
            </div>
          )}
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-blue-gradient text-white shadow-lg transform scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <span className="font-medium">{category.name}</span>
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className={`space-y-4 transition-all duration-500 ${
        animateCards ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
      }`}>
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-all duration-200 hover:scale-[1.02] border border-gray-100"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center space-x-4">
              {/* Product Image */}
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">
                {product.image}
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-gray-800">{product.name}</h3>
                  {product.popular && (
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">${product.price}</span>
                </div>
              </div>

              {/* Add to Cart Controls */}
              <div className="flex items-center space-x-2">
                {getCartQuantity(product.id) === 0 ? (
                  <button
                    onClick={() => addToCart(product)}
                    className="w-10 h-10 bg-blue-gradient rounded-full flex items-center justify-center hover:scale-110 transition-all duration-200 shadow-lg"
                  >
                    <Plus className="w-5 h-5 text-white" />
                  </button>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-200"
                    >
                      <Minus className="w-4 h-4 text-white" />
                    </button>
                    <span className="w-8 text-center font-bold text-gray-800">
                      {getCartQuantity(product.id)}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-200"
                    >
                      <Plus className="w-4 h-4 text-white" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron productos</h3>
          <p className="text-gray-500">Intenta con otro término de búsqueda</p>
        </div>
      )}
    </div>
  );
};

export default MenuScreen; 