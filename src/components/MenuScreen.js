import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Star, Plus, Minus } from 'lucide-react';

const MenuScreen = ({ onGoBack, canGoBack, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('comidas');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
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
  }, [selectedCategory]);

  const filteredProducts = products.filter(product => {
    const matchesCategory = product.category === selectedCategory;
    const matchesSubcategory = selectedSubcategory === 'all' || product.subcategory === selectedSubcategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSubcategory && matchesSearch;
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
    <div className="bg-gray-50 min-h-screen">
      {/* Header fijo estilo app financiera */}
      <div className="fixed top-0 left-0 right-0 z-50 max-w-md mx-auto">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 pt-12 pb-8 rounded-b-3xl shadow-xl">
          {/* Top bar con avatar y carrito */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center border-2 border-white border-opacity-30 backdrop-blur-sm">
                <span className="text-white font-bold text-lg">JD</span>
              </div>
              <div>
                <p className="text-blue-100 text-sm font-medium">Hola, Juan</p>
                <h1 className="text-white text-xl font-bold">¿Qué vas a pedir?</h1>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('cart')}
              className="relative w-11 h-11 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200 backdrop-blur-sm border border-white border-opacity-20"
            >
              <ShoppingCart className="w-6 h-6 text-white" />
              {getTotalItems() > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs font-bold">{getTotalItems()}</span>
                </div>
              )}
            </button>
          </div>

          {/* Barra de búsqueda moderna */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar comida..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-white focus:bg-white transition-all duration-200 placeholder-gray-500 shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Espaciado para el header fijo */}
      <div className="h-52 bg-gradient-to-r from-blue-500 to-blue-600"></div>
      
      {/* Contenido principal */}
      <div className="relative -mt-6 bg-gray-50 rounded-t-3xl min-h-screen pb-24">

      {/* Categorías principales - Estilo app financiera */}
      <div className="px-6 mb-4">
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Categorías</h2>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(categories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`relative overflow-hidden rounded-2xl p-4 transition-all duration-300 transform ${
                  selectedCategory === key
                    ? 'scale-105 shadow-lg'
                    : 'scale-100 shadow-md hover:scale-102 hover:shadow-lg'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} ${
                  selectedCategory === key ? 'opacity-100' : 'opacity-90'
                }`} />
                <div className="relative z-10 text-center">
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <div className="text-white font-semibold text-sm">{category.name}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>



      {/* Subcategorías - Chips modernos */}
      <div className="px-6 py-4 bg-gray-50">
        <div className="flex flex-wrap gap-3 justify-start">
          {Object.entries(categories[selectedCategory].subcategories).map(([key, name]) => (
            <button
              key={key}
              onClick={() => setSelectedSubcategory(key)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-200 text-sm ${
                selectedSubcategory === key
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

             {/* Lista de productos */}
       <div className="px-6 py-4 space-y-4 bg-white">
         {filteredProducts.map((product, index) => (
           <div
             key={product.id}
             className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
             style={{ animationDelay: `${index * 50}ms` }}
           >
             <div className="flex items-center space-x-3">
               {/* Imagen del producto */}
               <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-3xl shadow-sm flex-shrink-0">
                 {product.image}
               </div>

               {/* Información del producto */}
               <div className="flex-1 min-w-0">
                 <div className="flex items-start justify-between">
                   <div className="flex-1 min-w-0">
                     <div className="flex items-center space-x-2 mb-1">
                       <h3 className="font-bold text-gray-800 text-base truncate">{product.name}</h3>
                       {product.popular && (
                         <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                           Popular
                         </span>
                       )}
                     </div>
                     <p className="text-gray-500 text-sm mb-2 line-clamp-2 leading-relaxed">{product.description}</p>
                     <div className="flex items-center space-x-3 mb-1">
                       <div className="flex items-center space-x-1">
                         <Star className="w-3 h-3 text-yellow-400 fill-current" />
                         <span className="text-xs text-gray-600">{product.rating}</span>
                       </div>
                       <span className="text-gray-400 text-xs">⏱️ {product.preparationTime}</span>
                     </div>
                     <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                       ${product.price}
                     </span>
                   </div>

                   {/* Controles del carrito */}
                   <div className="flex items-center ml-3 flex-shrink-0">
                     {getCartQuantity(product.id) === 0 ? (
                       <button
                         onClick={() => addToCart(product)}
                         className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-200 shadow-md"
                       >
                         <Plus className="w-5 h-5 text-white" />
                       </button>
                     ) : (
                       <div className="flex items-center space-x-2">
                         <button
                           onClick={() => removeFromCart(product.id)}
                           className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-all duration-200"
                         >
                           <Minus className="w-4 h-4 text-gray-600" />
                         </button>
                         <span className="w-8 text-center font-bold text-gray-800 text-sm bg-gray-100 rounded-full py-1">
                           {getCartQuantity(product.id)}
                         </span>
                         <button
                           onClick={() => addToCart(product)}
                           className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-200"
                         >
                           <Plus className="w-4 h-4 text-white" />
                         </button>
                       </div>
                     )}
                   </div>
                 </div>
               </div>
             </div>
           </div>
         ))}
       </div>

             {/* Estado vacío */}
       {filteredProducts.length === 0 && (
         <div className="text-center py-16 px-6 bg-white">
           <div className="text-8xl mb-6">🔍</div>
           <h3 className="text-2xl font-bold text-gray-600 mb-2">No encontramos nada</h3>
           <p className="text-gray-500">Intenta con otro término de búsqueda o categoría</p>
         </div>
       )}
       </div>
    </div>
  );
};

export default MenuScreen; 