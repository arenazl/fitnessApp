import React, { useState, useCallback } from 'react';
import MenuScreen from './components/MenuScreen';
import CartScreen from './components/CartScreen';
import OrdersScreen from './components/OrdersScreen';
import RestaurantProfileScreen from './components/RestaurantProfileScreen';
import ProductDetailScreen from './components/ProductDetailScreen';
import BottomNavigation from './components/BottomNavigation';
import DiscoverScreen from './components/DiscoverScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('menu');
  const [navigationHistory, setNavigationHistory] = useState(['menu']);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('comidas');
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Gradientes por categoría
  const categoryGradients = {
    comidas: 'from-orange-400 to-red-500',
    bebidas: 'from-blue-400 to-purple-500',
    especiales: 'from-green-400 to-blue-500'
  };

  // Estructura de categorías y subcategorías (movido desde MenuScreen)
  const categories = {
    comidas: {
      name: 'Comidas',
      icon: '🍽️',
      gradient: 'from-orange-400 to-red-500',
      subcategories: {
        all: 'Todo',
        entradas: 'Entradas',
        principales: 'Principales',
        postres: 'Postres',
        ensaladas: 'Ensaladas',
        sopas: 'Sopas',
        pizzas: 'Pizzas'
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
        calientes: 'Calientes',
        jugos: 'Jugos',
        smoothies: 'Smoothies',
        cocteles: 'Cócteles'
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
        chef: 'Del Chef',
        veganos: 'Veganos',
        saludables: 'Saludables',
        promociones: 'Promociones'
      }
    }
  };

  // Lista de productos expandida (movido desde MenuScreen)
  const allProducts = [
    // ===== COMIDAS - ENTRADAS =====
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
    {
      id: 3,
      name: 'Carpaccio de Res',
      description: 'Finas láminas de res con rúcula, parmesano, alcaparras y aceite de trufa',
      price: 16.50,
      category: 'comidas',
      subcategory: 'entradas',
      rating: 4.7,
      image: '🥩',
      popular: true,
      preparationTime: '8-12 min'
    },
    {
      id: 4,
      name: 'Tabla de Quesos',
      description: 'Selección de quesos artesanales con frutos secos, miel y mermeladas',
      price: 19.99,
      category: 'comidas',
      subcategory: 'entradas',
      rating: 4.5,
      image: '🧀',
      popular: false,
      preparationTime: '5-8 min'
    },
    {
      id: 5,
      name: 'Ceviche Peruano',
      description: 'Pescado fresco marinado en limón con cebolla morada, ají y cilantro',
      price: 14.75,
      category: 'comidas',
      subcategory: 'entradas',
      rating: 4.9,
      image: '🐟',
      popular: true,
      preparationTime: '10-15 min'
    },
    {
      id: 6,
      name: 'Hummus Mediterráneo',
      description: 'Hummus casero con pan pita, aceitunas, tomates cherry y aceite de oliva',
      price: 9.99,
      category: 'comidas',
      subcategory: 'entradas',
      rating: 4.4,
      image: '🫘',
      popular: false,
      preparationTime: '5-8 min'
    },
    // Nuevos productos locales y variados
    {
      id: 37,
      name: 'Empanada Salteña',
      description: 'Empanada tradicional del norte argentino, rellena de carne cortada a cuchillo y papa.',
      price: 3.50,
      category: 'comidas',
      subcategory: 'entradas',
      rating: 4.9,
      image: '🥟',
      popular: true,
      preparationTime: '7-10 min'
    },
    {
      id: 38,
      name: 'Tortilla Española',
      description: 'Clásica tortilla de papas y cebolla, servida en porciones.',
      price: 6.00,
      category: 'comidas',
      subcategory: 'entradas',
      rating: 4.7,
      image: '🍳',
      popular: false,
      preparationTime: '8-12 min'
    },
    {
      id: 39,
      name: 'Provoleta Porteña',
      description: 'Queso provolone fundido con orégano y aceite de oliva, típico de Buenos Aires.',
      price: 7.50,
      category: 'comidas',
      subcategory: 'entradas',
      rating: 4.8,
      image: '🧀',
      popular: true,
      preparationTime: '6-9 min'
    },
    {
      id: 40,
      name: 'Bastones de Mandioca',
      description: 'Bastones crocantes de mandioca frita, servidos con salsa criolla.',
      price: 5.00,
      category: 'comidas',
      subcategory: 'entradas',
      rating: 4.5,
      image: '🍠',
      popular: false,
      preparationTime: '6-10 min'
    },
    {
      id: 41,
      name: 'Humita en Chala',
      description: 'Preparación andina de maíz, cebolla y queso, cocida en hojas de maíz.',
      price: 6.50,
      category: 'comidas',
      subcategory: 'entradas',
      rating: 4.6,
      image: '🌽',
      popular: true,
      preparationTime: '12-15 min'
    },
    {
      id: 42,
      name: 'Chipa Misionero',
      description: 'Panecillos de almidón de mandioca y queso, típicos del litoral.',
      price: 4.00,
      category: 'comidas',
      subcategory: 'entradas',
      rating: 4.7,
      image: '🥯',
      popular: false,
      preparationTime: '5-8 min'
    },

    // ===== COMIDAS - PRINCIPALES =====
    {
      id: 7,
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
      id: 8,
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
    {
      id: 9,
      name: 'Paella Valenciana',
      description: 'Arroz bomba con pollo, conejo, judías verdes, garrofón y azafrán',
      price: 22.99,
      category: 'comidas',
      subcategory: 'principales',
      rating: 4.8,
      image: '🥘',
      popular: true,
      preparationTime: '25-30 min'
    },
    {
      id: 10,
      name: 'Filete de Salmón',
      description: 'Salmón grillado con puré de papas, espárragos y salsa holandesa',
      price: 24.50,
      category: 'comidas',
      subcategory: 'principales',
      rating: 4.6,
      image: '🍣',
      popular: false,
      preparationTime: '18-22 min'
    },
    {
      id: 11,
      name: 'Pollo al Curry',
      description: 'Pollo tierno en salsa de curry con arroz basmati y naan',
      price: 17.25,
      category: 'comidas',
      subcategory: 'principales',
      rating: 4.5,
      image: '🍛',
      popular: true,
      preparationTime: '20-25 min'
    },
    {
      id: 12,
      name: 'Risotto de Hongos',
      description: 'Arroz arborio cremoso con hongos porcini, parmesano y trufa',
      price: 19.75,
      category: 'comidas',
      subcategory: 'principales',
      rating: 4.7,
      image: '🍄',
      popular: false,
      preparationTime: '22-28 min'
    },
    // Nuevos principales locales y variados
    {
      id: 43,
      name: 'Milanesa a la Napolitana',
      description: 'Clásica milanesa de carne con salsa de tomate, jamón y queso gratinado, servida con papas fritas.',
      price: 15.00,
      category: 'comidas',
      subcategory: 'principales',
      rating: 4.8,
      image: '🥩',
      popular: true,
      preparationTime: '18-22 min'
    },
    {
      id: 44,
      name: 'Locro Criollo',
      description: 'Guiso tradicional argentino de maíz, porotos, zapallo, carne y chorizo.',
      price: 14.00,
      category: 'comidas',
      subcategory: 'principales',
      rating: 4.7,
      image: '🍲',
      popular: true,
      preparationTime: '30-40 min'
    },
    {
      id: 45,
      name: 'Asado de Tira',
      description: 'Tira de asado a la parrilla, servida con chimichurri y ensalada mixta.',
      price: 22.00,
      category: 'comidas',
      subcategory: 'principales',
      rating: 4.9,
      image: '🥩',
      popular: true,
      preparationTime: '25-35 min'
    },
    {
      id: 46,
      name: 'Polenta con Tuco',
      description: 'Polenta cremosa con salsa tuco de carne y queso rallado.',
      price: 12.00,
      category: 'comidas',
      subcategory: 'principales',
      rating: 4.6,
      image: '🍚',
      popular: false,
      preparationTime: '15-20 min'
    },
    {
      id: 47,
      name: 'Matambre a la Pizza',
      description: 'Matambre de vaca al horno con salsa de tomate, morrones y queso gratinado.',
      price: 18.00,
      category: 'comidas',
      subcategory: 'principales',
      rating: 4.7,
      image: '🍖',
      popular: true,
      preparationTime: '20-25 min'
    },
    {
      id: 48,
      name: 'Canelones de Verdura',
      description: 'Canelones rellenos de espinaca y ricota, gratinados con salsa blanca y roja.',
      price: 13.50,
      category: 'comidas',
      subcategory: 'principales',
      rating: 4.5,
      image: '🥬',
      popular: false,
      preparationTime: '18-22 min'
    },
    {
      id: 49,
      name: 'Pescado Patagónico',
      description: 'Filete de trucha patagónica grillada con papines andinos y salsa de limón.',
      price: 21.00,
      category: 'comidas',
      subcategory: 'principales',
      rating: 4.8,
      image: '🐟',
      popular: true,
      preparationTime: '20-25 min'
    },
    {
      id: 50,
      name: 'Guiso de Lentejas',
      description: 'Guiso casero de lentejas, chorizo colorado, panceta y verduras.',
      price: 11.00,
      category: 'comidas',
      subcategory: 'principales',
      rating: 4.6,
      image: '🥣',
      popular: false,
      preparationTime: '25-30 min'
    },
    {
      id: 51,
      name: 'Ravioles de Ricota',
      description: 'Ravioles caseros de ricota y nuez, servidos con salsa fileto.',
      price: 14.50,
      category: 'comidas',
      subcategory: 'principales',
      rating: 4.7,
      image: '🍝',
      popular: false,
      preparationTime: '15-20 min'
    },

    // ===== COMIDAS - POSTRES =====
    {
      id: 13,
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
    {
      id: 14,
      name: 'Tiramisú Clásico',
      description: 'Mascarpone, café espresso, cacao y bizcochos de soletilla',
      price: 7.50,
      category: 'comidas',
      subcategory: 'postres',
      rating: 4.6,
      image: '🍮',
      popular: false,
      preparationTime: '5 min'
    },
    {
      id: 15,
      name: 'Brownie con Helado',
      description: 'Brownie de chocolate caliente con helado de vainilla y salsa de caramelo',
      price: 9.25,
      category: 'comidas',
      subcategory: 'postres',
      rating: 4.7,
      image: '🍫',
      popular: true,
      preparationTime: '8-10 min'
    },
    {
      id: 16,
      name: 'Flan de Vainilla',
      description: 'Flan casero de vainilla con caramelo líquido y crema batida',
      price: 6.75,
      category: 'comidas',
      subcategory: 'postres',
      rating: 4.4,
      image: '🍯',
      popular: false,
      preparationTime: '3-5 min'
    },
    {
      id: 17,
      name: 'Tarta de Manzana',
      description: 'Tarta de manzana con canela, masa quebrada y helado de canela',
      price: 8.25,
      category: 'comidas',
      subcategory: 'postres',
      rating: 4.5,
      image: '🥧',
      popular: true,
      preparationTime: '10-12 min'
    },
    {
      id: 18,
      name: 'Mousse de Chocolate',
      description: 'Mousse de chocolate negro con crema chantilly y fresas',
      price: 7.99,
      category: 'comidas',
      subcategory: 'postres',
      rating: 4.6,
      image: '🍓',
      popular: false,
      preparationTime: '5 min'
    },
    // Nuevos postres locales y variados
    {
      id: 52,
      name: 'Dulce de Leche Casero',
      description: 'Clásico postre argentino, servido con nueces y galletitas.',
      price: 6.00,
      category: 'comidas',
      subcategory: 'postres',
      rating: 4.9,
      image: '🥄',
      popular: true,
      preparationTime: '3-5 min'
    },
    {
      id: 53,
      name: 'Helado Artesanal Porteño',
      description: 'Helado de crema y chocolate, estilo tradicional de Buenos Aires.',
      price: 7.00,
      category: 'comidas',
      subcategory: 'postres',
      rating: 4.8,
      image: '🍦',
      popular: true,
      preparationTime: '2-4 min'
    },
    {
      id: 54,
      name: 'Queso y Dulce',
      description: 'Postre simple de queso fresco y dulce de membrillo.',
      price: 5.50,
      category: 'comidas',
      subcategory: 'postres',
      rating: 4.7,
      image: '🧀',
      popular: false,
      preparationTime: '2-3 min'
    },
    {
      id: 55,
      name: 'Chocotorta',
      description: 'Torta fría de galletitas de chocolate, dulce de leche y queso crema.',
      price: 8.00,
      category: 'comidas',
      subcategory: 'postres',
      rating: 4.8,
      image: '🍫',
      popular: true,
      preparationTime: '5-8 min'
    },
    {
      id: 56,
      name: 'Budín de Pan',
      description: 'Budín de pan casero con pasas y caramelo.',
      price: 6.50,
      category: 'comidas',
      subcategory: 'postres',
      rating: 4.6,
      image: '🍞',
      popular: false,
      preparationTime: '6-10 min'
    },
    {
      id: 57,
      name: 'Alfajor Marplatense',
      description: 'Alfajor relleno de dulce de leche y bañado en chocolate.',
      price: 4.00,
      category: 'comidas',
      subcategory: 'postres',
      rating: 4.9,
      image: '🍪',
      popular: true,
      preparationTime: '2-3 min'
    },
    {
      id: 58,
      name: 'Tarta Rogel',
      description: 'Capas de masa crocante, dulce de leche y merengue italiano.',
      price: 7.50,
      category: 'comidas',
      subcategory: 'postres',
      rating: 4.7,
      image: '🍰',
      popular: false,
      preparationTime: '8-12 min'
    },
    {
      id: 59,
      name: 'Panqueque de Dulce de Leche',
      description: 'Panqueque tibio relleno de dulce de leche y azúcar impalpable.',
      price: 5.00,
      category: 'comidas',
      subcategory: 'postres',
      rating: 4.8,
      image: '🥞',
      popular: true,
      preparationTime: '4-6 min'
    },

    // ===== COMIDAS - ENSALADAS =====
    {
      id: 19,
      name: 'Ensalada Mediterránea',
      description: 'Lechuga, tomate, pepino, aceitunas, queso feta y vinagreta de hierbas',
      price: 11.50,
      category: 'comidas',
      subcategory: 'ensaladas',
      rating: 4.5,
      image: '🥙',
      popular: true,
      preparationTime: '8-10 min'
    },
    {
      id: 20,
      name: 'Ensalada de Quinoa',
      description: 'Quinoa, aguacate, tomates cherry, pepino y aderezo de limón',
      price: 12.75,
      category: 'comidas',
      subcategory: 'ensaladas',
      rating: 4.6,
      image: '🥑',
      popular: false,
      preparationTime: '10-12 min'
    },
    {
      id: 21,
      name: 'Ensalada de Pollo Thai',
      description: 'Pollo marinado, lechuga, zanahoria, mango y aderezo de maní',
      price: 14.25,
      category: 'comidas',
      subcategory: 'ensaladas',
      rating: 4.7,
      image: '🥜',
      popular: true,
      preparationTime: '12-15 min'
    },
    {
      id: 22,
      name: 'Ensalada Caprese',
      description: 'Tomate, mozzarella fresca, albahaca y reducción de balsámico',
      price: 10.99,
      category: 'comidas',
      subcategory: 'ensaladas',
      rating: 4.4,
      image: '🍅',
      popular: false,
      preparationTime: '5-8 min'
    },
    {
      id: 23,
      name: 'Ensalada de Salmón',
      description: 'Salmón ahumado, rúcula, aguacate, alcaparras y vinagreta cítrica',
      price: 16.50,
      category: 'comidas',
      subcategory: 'ensaladas',
      rating: 4.8,
      image: '🐠',
      popular: true,
      preparationTime: '10-12 min'
    },
    {
      id: 24,
      name: 'Ensalada de Cabra',
      description: 'Mix de lechugas, queso de cabra, nueces, pera y vinagreta de miel',
      price: 13.75,
      category: 'comidas',
      subcategory: 'ensaladas',
      rating: 4.5,
      image: '🍐',
      popular: false,
      preparationTime: '8-10 min'
    },
    // Nuevas ensaladas locales y variadas
    {
      id: 60,
      name: 'Ensalada Pampeana',
      description: 'Lechuga, tomate, huevo duro, jamón cocido y arvejas, típica de la región pampeana.',
      price: 10.00,
      category: 'comidas',
      subcategory: 'ensaladas',
      rating: 4.6,
      image: '🥗',
      popular: true,
      preparationTime: '7-10 min'
    },
    {
      id: 61,
      name: 'Ensalada Patagónica',
      description: 'Mix de verdes, trucha ahumada, papines y cebolla morada.',
      price: 14.00,
      category: 'comidas',
      subcategory: 'ensaladas',
      rating: 4.7,
      image: '🥔',
      popular: false,
      preparationTime: '8-12 min'
    },
    {
      id: 62,
      name: 'Ensalada Norteña',
      description: 'Quinoa, choclo, tomate, cebolla y queso fresco, inspirada en el NOA.',
      price: 12.00,
      category: 'comidas',
      subcategory: 'ensaladas',
      rating: 4.8,
      image: '🌽',
      popular: true,
      preparationTime: '10-13 min'
    },
    {
      id: 63,
      name: 'Ensalada Porteña',
      description: 'Lechuga, tomate, cebolla, zanahoria y huevo, clásica de Buenos Aires.',
      price: 9.50,
      category: 'comidas',
      subcategory: 'ensaladas',
      rating: 4.5,
      image: '🥕',
      popular: false,
      preparationTime: '6-9 min'
    },
    {
      id: 64,
      name: 'Ensalada Primavera',
      description: 'Mix de hojas verdes, frutas frescas, semillas y queso azul.',
      price: 13.00,
      category: 'comidas',
      subcategory: 'ensaladas',
      rating: 4.7,
      image: '🥬',
      popular: true,
      preparationTime: '8-11 min'
    },
    {
      id: 65,
      name: 'Ensalada de Remolacha y Naranja',
      description: 'Remolacha asada, naranja, rúcula y nueces.',
      price: 11.00,
      category: 'comidas',
      subcategory: 'ensaladas',
      rating: 4.6,
      image: '🍊',
      popular: false,
      preparationTime: '7-10 min'
    },

    // ===== COMIDAS - SOPAS =====
    {
      id: 25,
      name: 'Sopa de Tomate',
      description: 'Sopa cremosa de tomate con albahaca fresca y crutones',
      price: 8.50,
      category: 'comidas',
      subcategory: 'sopas',
      rating: 4.4,
      image: '🍲',
      popular: true,
      preparationTime: '10-12 min'
    },
    {
      id: 26,
      name: 'Bisque de Langosta',
      description: 'Sopa cremosa de langosta con coñac y crema fresca',
      price: 18.99,
      category: 'comidas',
      subcategory: 'sopas',
      rating: 4.8,
      image: '🦞',
      popular: false,
      preparationTime: '15-18 min'
    },
    {
      id: 27,
      name: 'Sopa de Cebolla',
      description: 'Sopa francesa de cebolla con queso gratinado y pan tostado',
      price: 9.75,
      category: 'comidas',
      subcategory: 'sopas',
      rating: 4.6,
      image: '🧅',
      popular: true,
      preparationTime: '12-15 min'
    },
    {
      id: 28,
      name: 'Minestrone',
      description: 'Sopa italiana de verduras con pasta y frijoles',
      price: 7.99,
      category: 'comidas',
      subcategory: 'sopas',
      rating: 4.3,
      image: '🥕',
      popular: false,
      preparationTime: '10-12 min'
    },
    {
      id: 29,
      name: 'Sopa de Mariscos',
      description: 'Sopa con camarones, mejillones, calamares y pescado en caldo aromático',
      price: 16.25,
      category: 'comidas',
      subcategory: 'sopas',
      rating: 4.7,
      image: '🦐',
      popular: true,
      preparationTime: '18-22 min'
    },
    {
      id: 30,
      name: 'Gazpacho Andaluz',
      description: 'Sopa fría de tomate, pepino, pimiento y ajo con aceite de oliva',
      price: 6.50,
      category: 'comidas',
      subcategory: 'sopas',
      rating: 4.2,
      image: '🌶️',
      popular: false,
      preparationTime: '5-8 min'
    },

    // ===== COMIDAS - PIZZAS =====
    {
      id: 31,
      name: 'Pizza Margherita',
      description: 'Salsa de tomate, mozzarella fresca, albahaca y aceite de oliva',
      price: 14.99,
      category: 'comidas',
      subcategory: 'pizzas',
      rating: 4.6,
      image: '🍕',
      popular: true,
      preparationTime: '15-18 min'
    },
    {
      id: 32,
      name: 'Pizza Pepperoni',
      description: 'Salsa de tomate, mozzarella y pepperoni premium',
      price: 16.50,
      category: 'comidas',
      subcategory: 'pizzas',
      rating: 4.7,
      image: '🍕',
      popular: true,
      preparationTime: '15-18 min'
    },
    {
      id: 33,
      name: 'Pizza Quattro Stagioni',
      description: 'Cuatro sabores: jamón, champiñones, alcachofas y aceitunas',
      price: 18.75,
      category: 'comidas',
      subcategory: 'pizzas',
      rating: 4.5,
      image: '🍕',
      popular: false,
      preparationTime: '18-22 min'
    },
    {
      id: 34,
      name: 'Pizza Hawaiana',
      description: 'Salsa de tomate, mozzarella, jamón y piña natural',
      price: 15.99,
      category: 'comidas',
      subcategory: 'pizzas',
      rating: 4.3,
      image: '🍍',
      popular: false,
      preparationTime: '15-18 min'
    },
    {
      id: 35,
      name: 'Pizza Prosciutto',
      description: 'Mozzarella, prosciutto di Parma, rúcula y parmesano',
      price: 19.99,
      category: 'comidas',
      subcategory: 'pizzas',
      rating: 4.8,
      image: '🥓',
      popular: true,
      preparationTime: '18-20 min'
    },
    {
      id: 36,
      name: 'Pizza Vegetariana',
      description: 'Pimientos, champiñones, cebolla, tomate cherry y aceitunas',
      price: 17.25,
      category: 'comidas',
      subcategory: 'pizzas',
      rating: 4.4,
      image: '🥬',
      popular: false,
      preparationTime: '16-20 min'
    },
    // ===== BEBIDAS - ALCOHÓLICAS =====
    {
      id: 1001,
      name: 'Fernet con Cola',
      description: 'Clásico trago argentino, fernet con gaseosa cola y mucho hielo.',
      price: 7.00,
      category: 'bebidas',
      subcategory: 'alcoholicas',
      rating: 4.8,
      image: '🥃',
      popular: true,
      preparationTime: '2-3 min'
    },
    {
      id: 1002,
      name: 'Malbec Mendocino',
      description: 'Copa de vino Malbec de Mendoza, intenso y frutado.',
      price: 6.50,
      category: 'bebidas',
      subcategory: 'alcoholicas',
      rating: 4.7,
      image: '🍷',
      popular: false,
      preparationTime: '1-2 min'
    },
    {
      id: 1003,
      name: 'Daiquiri de Frutilla',
      description: 'Cóctel dulce de ron, frutilla y azúcar, bien frío.',
      price: 8.00,
      category: 'bebidas',
      subcategory: 'alcoholicas',
      rating: 4.9,
      image: '🍓',
      popular: true,
      preparationTime: '3-5 min'
    },
    // ===== BEBIDAS - SIN ALCOHOL =====
    {
      id: 1011,
      name: 'Limonada Cordobesa',
      description: 'Limonada fresca con azúcar, menta y rodajas de limón.',
      price: 4.00,
      category: 'bebidas',
      subcategory: 'normales',
      rating: 4.8,
      image: '🍋',
      popular: true,
      preparationTime: '2-3 min'
    },
    {
      id: 1012,
      name: 'Agua Mineral',
      description: 'Botella de agua mineral natural, fría.',
      price: 2.50,
      category: 'bebidas',
      subcategory: 'normales',
      rating: 4.5,
      image: '💧',
      popular: false,
      preparationTime: '1 min'
    },
    {
      id: 1013,
      name: 'Jugo de Naranja Dulce',
      description: 'Jugo exprimido de naranja, con azúcar a gusto.',
      price: 4.50,
      category: 'bebidas',
      subcategory: 'normales',
      rating: 4.7,
      image: '🍊',
      popular: true,
      preparationTime: '2-3 min'
    },
    // ===== BEBIDAS - CALIENTES =====
    {
      id: 1021,
      name: 'Café Doble',
      description: 'Café espresso doble, intenso y aromático.',
      price: 3.00,
      category: 'bebidas',
      subcategory: 'calientes',
      rating: 4.8,
      image: '☕',
      popular: true,
      preparationTime: '2-3 min'
    },
    {
      id: 1022,
      name: 'Té de Hierbas',
      description: 'Infusión de hierbas serranas, suave y reconfortante.',
      price: 2.50,
      category: 'bebidas',
      subcategory: 'calientes',
      rating: 4.6,
      image: '🍵',
      popular: false,
      preparationTime: '3-4 min'
    },
    {
      id: 1023,
      name: 'Submarino Dulce',
      description: 'Leche caliente con barra de chocolate y azúcar, para los más golosos.',
      price: 4.00,
      category: 'bebidas',
      subcategory: 'calientes',
      rating: 4.9,
      image: '🍫',
      popular: true,
      preparationTime: '4-5 min'
    },
    // ===== BEBIDAS - JUGOS =====
    {
      id: 1031,
      name: 'Jugo de Pomelo',
      description: 'Jugo natural de pomelo rosado, refrescante.',
      price: 4.00,
      category: 'bebidas',
      subcategory: 'jugos',
      rating: 4.5,
      image: '🍈',
      popular: false,
      preparationTime: '2-3 min'
    },
    {
      id: 1032,
      name: 'Jugo Multifruta',
      description: 'Mezcla de jugos de naranja, manzana y durazno, con azúcar.',
      price: 4.50,
      category: 'bebidas',
      subcategory: 'jugos',
      rating: 4.7,
      image: '🍹',
      popular: true,
      preparationTime: '2-3 min'
    },
    {
      id: 1033,
      name: 'Jugo Verde',
      description: 'Jugo detox de espinaca, manzana verde y limón.',
      price: 5.00,
      category: 'bebidas',
      subcategory: 'jugos',
      rating: 4.6,
      image: '🥒',
      popular: false,
      preparationTime: '3-4 min'
    },
    // ===== BEBIDAS - SMOOTHIES =====
    {
      id: 1041,
      name: 'Smoothie de Frutilla',
      description: 'Batido de frutilla, yogur y azúcar.',
      price: 5.50,
      category: 'bebidas',
      subcategory: 'smoothies',
      rating: 4.8,
      image: '🍓',
      popular: true,
      preparationTime: '3-4 min'
    },
    {
      id: 1042,
      name: 'Smoothie Tropical',
      description: 'Batido de mango, ananá y jugo de naranja.',
      price: 6.00,
      category: 'bebidas',
      subcategory: 'smoothies',
      rating: 4.7,
      image: '🥭',
      popular: false,
      preparationTime: '3-4 min'
    },
    {
      id: 1043,
      name: 'Smoothie Dulce de Banana',
      description: 'Banana, leche, miel y azúcar, bien cremoso.',
      price: 5.00,
      category: 'bebidas',
      subcategory: 'smoothies',
      rating: 4.9,
      image: '🍌',
      popular: true,
      preparationTime: '3-4 min'
    },
    // ===== BEBIDAS - CÓCTELES =====
    {
      id: 1051,
      name: 'Mojito Clásico',
      description: 'Ron, menta, lima, azúcar y soda.',
      price: 7.00,
      category: 'bebidas',
      subcategory: 'cocteles',
      rating: 4.8,
      image: '🍸',
      popular: true,
      preparationTime: '3-5 min'
    },
    {
      id: 1052,
      name: 'Caipirinha Dulce',
      description: 'Cachaça, lima, azúcar y mucho hielo.',
      price: 7.50,
      category: 'bebidas',
      subcategory: 'cocteles',
      rating: 4.7,
      image: '🍹',
      popular: true,
      preparationTime: '3-5 min'
    },
    {
      id: 1053,
      name: 'Clericó',
      description: 'Vino blanco, frutas frescas y azúcar, ideal para el verano.',
      price: 8.00,
      category: 'bebidas',
      subcategory: 'cocteles',
      rating: 4.8,
      image: '🍇',
      popular: false,
      preparationTime: '5-7 min'
    },
    // ===== ESPECIALES - DEL DÍA =====
    {
      id: 2001,
      name: 'Sopa del Día',
      description: 'Sopa casera de verduras frescas, receta del chef.',
      price: 7.00,
      category: 'especiales',
      subcategory: 'diarios',
      rating: 4.7,
      image: '🥣',
      popular: true,
      preparationTime: '10-15 min'
    },
    {
      id: 2002,
      name: 'Tarta Dulce del Día',
      description: 'Tarta dulce de estación, con masa casera y azúcar.',
      price: 6.50,
      category: 'especiales',
      subcategory: 'diarios',
      rating: 4.8,
      image: '🥧',
      popular: true,
      preparationTime: '8-12 min'
    },
    {
      id: 2003,
      name: 'Ensalada Especial',
      description: 'Ensalada fresca con ingredientes seleccionados del día.',
      price: 8.00,
      category: 'especiales',
      subcategory: 'diarios',
      rating: 4.6,
      image: '🥗',
      popular: false,
      preparationTime: '7-10 min'
    },
    // ===== ESPECIALES - TEMPORADA =====
    {
      id: 2011,
      name: 'Guiso de Invierno',
      description: 'Guiso caliente de carne, papas y verduras, ideal para el frío.',
      price: 12.00,
      category: 'especiales',
      subcategory: 'temporada',
      rating: 4.7,
      image: '🍲',
      popular: true,
      preparationTime: '20-30 min'
    },
    {
      id: 2012,
      name: 'Helado de Verano',
      description: 'Helado artesanal de frutas y azúcar, refrescante.',
      price: 5.00,
      category: 'especiales',
      subcategory: 'temporada',
      rating: 4.9,
      image: '🍦',
      popular: true,
      preparationTime: '2-4 min'
    },
    {
      id: 2013,
      name: 'Ensalada de Frutas',
      description: 'Frutas frescas de estación, cortadas y endulzadas.',
      price: 6.00,
      category: 'especiales',
      subcategory: 'temporada',
      rating: 4.8,
      image: '🍉',
      popular: false,
      preparationTime: '5-7 min'
    },
    // ===== ESPECIALES - DEL CHEF =====
    {
      id: 2021,
      name: 'Plato del Chef',
      description: 'Creación especial del chef, cambia cada semana.',
      price: 18.00,
      category: 'especiales',
      subcategory: 'chef',
      rating: 4.9,
      image: '👨‍🍳',
      popular: true,
      preparationTime: '20-30 min'
    },
    {
      id: 2022,
      name: 'Postre del Chef',
      description: 'Postre dulce y creativo, con azúcar y frutas.',
      price: 7.00,
      category: 'especiales',
      subcategory: 'chef',
      rating: 4.8,
      image: '🍮',
      popular: true,
      preparationTime: '8-12 min'
    },
    {
      id: 2023,
      name: 'Entrada del Chef',
      description: 'Entrada gourmet, selección del chef.',
      price: 9.00,
      category: 'especiales',
      subcategory: 'chef',
      rating: 4.7,
      image: '🥗',
      popular: false,
      preparationTime: '7-10 min'
    },
    // ===== ESPECIALES - VEGANOS =====
    {
      id: 2031,
      name: 'Bowl Vegano',
      description: 'Bowl de arroz integral, vegetales y tofu.',
      price: 10.00,
      category: 'especiales',
      subcategory: 'veganos',
      rating: 4.8,
      image: '🥦',
      popular: true,
      preparationTime: '10-15 min'
    },
    {
      id: 2032,
      name: 'Tarta Vegana Dulce',
      description: 'Tarta de manzana y azúcar mascabo, 100% vegana.',
      price: 7.00,
      category: 'especiales',
      subcategory: 'veganos',
      rating: 4.7,
      image: '🥧',
      popular: true,
      preparationTime: '8-12 min'
    },
    {
      id: 2033,
      name: 'Ensalada de Quinoa Vegana',
      description: 'Quinoa, tomate, palta y limón.',
      price: 9.00,
      category: 'especiales',
      subcategory: 'veganos',
      rating: 4.6,
      image: '🥗',
      popular: false,
      preparationTime: '7-10 min'
    },
    // ===== ESPECIALES - SALUDABLES =====
    {
      id: 2041,
      name: 'Ensalada Detox',
      description: 'Ensalada de hojas verdes, semillas y frutas.',
      price: 8.00,
      category: 'especiales',
      subcategory: 'saludables',
      rating: 4.8,
      image: '🥗',
      popular: true,
      preparationTime: '7-10 min'
    },
    {
      id: 2042,
      name: 'Smoothie Saludable',
      description: 'Batido de frutas, yogur y azúcar mascabo.',
      price: 6.00,
      category: 'especiales',
      subcategory: 'saludables',
      rating: 4.7,
      image: '🥤',
      popular: true,
      preparationTime: '3-5 min'
    },
    {
      id: 2043,
      name: 'Barra de Cereal Casera',
      description: 'Barra de avena, miel y frutos secos.',
      price: 4.00,
      category: 'especiales',
      subcategory: 'saludables',
      rating: 4.6,
      image: '🍯',
      popular: false,
      preparationTime: '2-3 min'
    },
    // ===== ESPECIALES - PROMOCIONES =====
    {
      id: 2051,
      name: 'Combo Dulce',
      description: 'Café, medialuna y jugo de naranja con azúcar.',
      price: 7.00,
      category: 'especiales',
      subcategory: 'promociones',
      rating: 4.8,
      image: '🥐',
      popular: true,
      preparationTime: '5-7 min'
    },
    {
      id: 2052,
      name: 'Promo Merienda',
      description: 'Té, tostadas y mermelada casera.',
      price: 6.00,
      category: 'especiales',
      subcategory: 'promociones',
      rating: 4.7,
      image: '🍞',
      popular: false,
      preparationTime: '5-7 min'
    },
    {
      id: 2053,
      name: 'Promo Saludable',
      description: 'Ensalada, agua y fruta fresca.',
      price: 8.00,
      category: 'especiales',
      subcategory: 'promociones',
      rating: 4.8,
      image: '🍏',
      popular: true,
      preparationTime: '7-10 min'
    }
  ];

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  const handleSearchChange = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const handleCartUpdate = useCallback((items) => {
    setCartItems(items);
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);
    setCartItemCount(totalItems);
  }, []);

  const handleProductSelect = useCallback((product) => {
    console.log('handleProductSelect llamado con:', product);
    setSelectedProduct(product);
    setCurrentScreen('productDetail');
    setNavigationHistory(prev => [...prev, 'productDetail']);
    console.log('Estado actualizado - currentScreen: productDetail');
  }, []);

  const canGoBack = () => navigationHistory.length > 1;

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
    switch (currentScreen) {
      case 'menu':
        return (
          <MenuScreen
            onGoBack={canGoBack() ? goBack : null}
            canGoBack={canGoBack()}
            onNavigate={navigateToScreen}
            onCategoryChange={setSelectedCategory}
            searchTerm={searchTerm}
            onCartUpdate={handleCartUpdate}
            cartItems={cartItems}
            onProductSelect={handleProductSelect}
            categories={categories}
            allProducts={allProducts}
          />
        );
      case 'cart':
        return (
          <CartScreen
            onGoBack={canGoBack() ? goBack : null}
            canGoBack={canGoBack()}
            cartItems={cartItems}
            onCartUpdate={handleCartUpdate}
          />
        );
      case 'orders':
        return (
          <OrdersScreen
            onGoBack={canGoBack() ? goBack : null}
            canGoBack={canGoBack()}
          />
        );
      case 'discover':
        return (
          <DiscoverScreen
            onGoBack={canGoBack() ? goBack : null}
            canGoBack={canGoBack()}
          />
        );
      case 'profile':
        return (
          <RestaurantProfileScreen
            onGoBack={canGoBack() ? goBack : null}
            canGoBack={canGoBack()}
          />
        );
      case 'productDetail':
        if (!categories || !allProducts || !selectedProduct) {
          return <div className="p-8 text-center text-gray-500">Cargando datos del producto...</div>;
        }
        return (
          <ProductDetailScreen
            onGoBack={canGoBack() ? goBack : null}
            canGoBack={canGoBack()}
            categories={categories}
            allProducts={allProducts}
            selectedProduct={selectedProduct}
            cartItems={cartItems}
            onCartUpdate={handleCartUpdate}
            onProductSelect={handleProductSelect}
          />
        );
      default:
        return null;
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
                <p className="text-white/80 text-sm">
                  {selectedCategory ? categories[selectedCategory].name : 'Deliciosa comida casera'}
                </p>
              </div>
              <button 
                onClick={() => navigateToScreen('cart')}
                className="relative w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all duration-200 hover:scale-105"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M6 19a1 1 0 100 2 1 1 0 000-2zm10 0a1 1 0 100 2 1 1 0 000-2z" />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </button>
            </div>
            
            {/* Barra de búsqueda */}
            <div className="relative">
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder={selectedCategory ? `Buscar en ${categories[selectedCategory].name.toLowerCase()}...` : '¿Qué te apetece hoy?'}
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-white/90 backdrop-blur-sm rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 placeholder-gray-500"
              />
            </div>
          </div>
        )}

        {/* Fixed Header - Solo para ProductDetailScreen */}
        {currentScreen === 'productDetail' && selectedProduct && (
          <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm z-[999] bg-white/90 backdrop-blur-sm border-b border-gray-200">
            <div className="flex items-center p-4">
              <button
                onClick={goBack}
                className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-lg font-semibold text-gray-800 truncate max-w-xs">{selectedProduct.name}</h1>
            </div>
          </div>
        )}

        {/* Main Content with Animation */}
        <div className={`${currentScreen === 'menu' ? 'pt-48' : currentScreen === 'productDetail' ? 'pt-24' : ''} pb-20 transition-all duration-300 ease-in-out ${
          isTransitioning ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'
        }`}>
          {renderScreen()}
        </div>
        
        {/* Bottom Navigation */}
        <BottomNavigation 
          currentScreen={currentScreen} 
          setCurrentScreen={navigateToScreen} 
          cartItemCount={cartItemCount}
        />
      </div>
    </div>
  );
}

export default App; 