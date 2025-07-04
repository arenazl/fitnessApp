import React, { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadialBarChart, RadialBar,
  Cell
} from 'recharts';

const DiscoverScreen = ({ onGoBack, canGoBack }) => {
  const [activeTab, setActiveTab] = useState('resumen');
  const [selectedMood, setSelectedMood] = useState('trabajo'); // 'trabajo', 'relax', 'celebracion'
  
  // Estados para el tab de cupones
  const [scratchedCoupons, setScratchedCoupons] = useState(new Set());
  const [activeCoupon, setActiveCoupon] = useState(null);
  const [couponFilter, setCouponFilter] = useState('todos'); // 'todos', 'nuevos', 'expirando', 'favoritos'

  // Datos de cupones creativos
  const cupones = [
    {
      id: 1,
      type: 'scratch',
      title: '¡Rasca y Gana!',
      subtitle: 'Descuento sorpresa',
      discount: '25%',
      category: 'comidas',
      gradient: 'from-orange-400 to-red-500',
      icon: '🎰',
      validUntil: '2024-12-31',
      isNew: true,
      description: 'Descuento en tu próximo pedido de comidas'
    },
    {
      id: 2,
      type: 'location',
      title: 'Cerca de Ti',
      subtitle: 'Estás a 200m del restaurante',
      discount: '15%',
      category: 'bebidas',
      gradient: 'from-blue-400 to-purple-500',
      icon: '📍',
      validUntil: '2024-12-25',
      isExpiring: true,
      description: 'Válido solo cuando estés cerca'
    },
    {
      id: 3,
      type: 'countdown',
      title: 'Flash Sale',
      subtitle: 'Solo por tiempo limitado',
      discount: '30%',
      category: 'especiales',
      gradient: 'from-green-400 to-blue-500',
      icon: '⚡',
      validUntil: '2024-12-20',
      timeLeft: 3600, // segundos
      isNew: true,
      description: 'Descuento en menú especial'
    },
    {
      id: 4,
      type: 'loyalty',
      title: 'Cliente Fiel',
      subtitle: 'Has pedido 8 veces',
      discount: '20%',
      category: 'comidas',
      gradient: 'from-purple-400 to-pink-500',
      icon: '👑',
      validUntil: '2024-12-30',
      progress: 80,
      description: '2 pedidos más para el siguiente nivel'
    },
    {
      id: 5,
      type: 'share',
      title: 'Comparte y Gana',
      subtitle: 'Invita a tus amigos',
      discount: '2x1',
      category: 'bebidas',
      gradient: 'from-pink-400 to-rose-500',
      icon: '🤝',
      validUntil: '2024-12-28',
      description: 'Por cada amigo que invite, ambos ganan'
    },
    {
      id: 6,
      type: 'birthday',
      title: '¡Feliz Cumpleaños!',
      subtitle: 'Regalo especial para ti',
      discount: '50%',
      category: 'especiales',
      gradient: 'from-yellow-400 to-orange-500',
      icon: '🎂',
      validUntil: '2024-12-22',
      isSpecial: true,
      description: 'Descuento de cumpleaños'
    }
  ];

  // Datos de ejemplo
  const gastoMensual = [
    { mes: 'Ene', gasto: 120, prediccion: 130 },
    { mes: 'Feb', gasto: 140, prediccion: 145 },
    { mes: 'Mar', gasto: 90, prediccion: 100 },
    { mes: 'Abr', gasto: 180, prediccion: 185 },
    { mes: 'May', gasto: 200, prediccion: 195 },
    { mes: 'Jun', gasto: 170, prediccion: 180 }
  ];

  const habitosPedidos = [
    { name: 'Cena', value: 70, fill: '#F97316' },  // orange-500
    { name: 'Almuerzo', value: 50, fill: '#3B82F6' }, // blue-500
    { name: 'Merienda', value: 30, fill: '#22C55E' }  // green-500
  ];

  const categoryColors = {
    comidas: '#F97316',    // orange-500 (color del tab de comidas)
    bebidas: '#3B82F6',    // blue-500 (color del tab de bebidas)
    especiales: '#22C55E'  // green-500 (color del tab de especiales)
  };

  const preferencias = [
    { categoria: 'Comidas', valor: 8, color: categoryColors.comidas },
    { categoria: 'Bebidas', valor: 6, color: categoryColors.bebidas },
    { categoria: 'Especiales', valor: 4, color: categoryColors.especiales }
  ];

  const moodStyles = {
    trabajo: {
      icon: '💼',
      label: 'Trabajo',
      gradient: 'from-orange-400 to-red-500',
      containerGradient: 'from-orange-400/5 to-red-500/5'
    },
    relax: {
      icon: '☀️',
      label: 'Relax',
      gradient: 'from-blue-400 to-purple-500',
      containerGradient: 'from-blue-400/5 to-purple-500/5'
    },
    celebracion: {
      icon: '🎉',
      label: 'Celebración',
      gradient: 'from-green-400 to-emerald-500',
      containerGradient: 'from-green-400/5 to-emerald-500/5'
    }
  };

  const tabStyles = {
    resumen: {
      color: '#F97316', // orange-500
      underlineGradient: 'from-orange-400 to-red-500',
      bgGradient: 'from-white via-orange-200/90 to-orange-300/80'
    },
    recomendaciones: {
      color: '#3B82F6', // blue-500
      underlineGradient: 'from-blue-400 to-purple-500',
      bgGradient: 'from-white via-blue-200/90 to-blue-300/80'
    },
    cupones: {
      color: '#22C55E', // green-500
      underlineGradient: 'from-green-400 to-blue-500',
      bgGradient: 'from-white via-green-200/90 to-green-300/80'
    }
  };

  const moodCombos = {
    trabajo: {
      title: 'Productividad y Sabor',
      description: 'Combos perfectos para tu día laboral',
      gradient: 'from-orange-400 to-red-500',
      combos: [
        {
          id: 1,
          name: 'Energía Total',
          comida: { name: 'Bowl de Quinoa', price: 12.99, image: '🥗' },
          bebida: { name: 'Smoothie Verde', price: 5.99, image: '🥤' },
          postre: { name: 'Mix de Frutos Secos', price: 4.99, image: '🥜' }
        },
        {
          id: 2,
          name: 'Balance Perfecto',
          comida: { name: 'Wrap de Pavo', price: 10.99, image: '🌯' },
          bebida: { name: 'Té Matcha', price: 4.99, image: '🍵' },
          postre: { name: 'Yogur con Granola', price: 3.99, image: '🍯' }
        },
        {
          id: 3,
          name: 'Concentración',
          comida: { name: 'Ensalada Proteica', price: 13.99, image: '🥗' },
          bebida: { name: 'Café Cold Brew', price: 4.99, image: '☕' },
          postre: { name: 'Barra Energética', price: 2.99, image: '🍫' }
        }
      ]
    },
    relax: {
      title: 'Momento de Disfrutar',
      description: 'Combos para tu tiempo libre',
      gradient: 'from-blue-400 to-purple-500',
      combos: [
        {
          id: 1,
          name: 'Comfort Food',
          comida: { name: 'Pizza Artesanal', price: 15.99, image: '🍕' },
          bebida: { name: 'Limonada Casera', price: 4.99, image: '🍋' },
          postre: { name: 'Brownie Tibio', price: 5.99, image: '🍫' }
        },
        {
          id: 2,
          name: 'Sabores del Mundo',
          comida: { name: 'Pad Thai', price: 14.99, image: '🥡' },
          bebida: { name: 'Té de Jazmín', price: 3.99, image: '🫖' },
          postre: { name: 'Mochi Variado', price: 4.99, image: '🍡' }
        },
        {
          id: 3,
          name: 'Movie Night',
          comida: { name: 'Nachos Supremos', price: 13.99, image: '🧀' },
          bebida: { name: 'Malteada', price: 5.99, image: '🥤' },
          postre: { name: 'Helado Artesanal', price: 4.99, image: '🍨' }
        }
      ]
    },
    celebracion: {
      title: '¡Momento Especial!',
      description: 'Combos para celebrar',
      gradient: 'from-green-400 to-emerald-500',
      combos: [
        {
          id: 1,
          name: 'Festejo Premium',
          comida: { name: 'Sushi Premium', price: 24.99, image: '🍱' },
          bebida: { name: 'Champagne', price: 29.99, image: '🍾' },
          postre: { name: 'Torta Especial', price: 8.99, image: '🎂' }
        },
        {
          id: 2,
          name: 'Celebración Latina',
          comida: { name: 'Parrillada Mix', price: 34.99, image: '🥩' },
          bebida: { name: 'Sangría', price: 19.99, image: '🍷' },
          postre: { name: 'Tiramisú', price: 7.99, image: '🍮' }
        },
        {
          id: 3,
          name: 'Fiesta Gourmet',
          comida: { name: 'Risotto Trufado', price: 28.99, image: '🍚' },
          bebida: { name: 'Vino Premium', price: 24.99, image: '🍷' },
          postre: { name: 'Macarons', price: 9.99, image: '🍪' }
        }
      ]
    }
  };

  const renderResumenTab = () => (
    <div className="space-y-6 p-4">
      {/* Gráfico 1: Evolución del gasto con predicción */}
      <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl p-6 text-white shadow-lg">
        <h3 className="text-lg font-bold mb-1">Evolución de tu consumo</h3>
        <p className="text-sm text-white/90 mb-4">Seguimiento de tus gastos mensuales</p>
        <div className="bg-white/20 rounded-2xl p-4">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={gastoMensual}>
              <defs>
                <linearGradient id="gastoGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="mes" stroke="#FFFFFF" fontSize={12} />
              <YAxis stroke="#FFFFFF" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="gasto" 
                stroke="#FFFFFF" 
                fillOpacity={1} 
                fill="url(#gastoGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-white/90">Predicción del próximo mes:</span>
            <span className="font-bold text-white">+5%</span>
          </div>
        </div>
      </div>

      {/* Gráfico 2: Hábitos de pedidos */}
      <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl p-6 text-white shadow-lg">
        <h3 className="text-lg font-bold mb-1">Tus hábitos de pedidos</h3>
        <p className="text-sm text-white/90 mb-4">Análisis de tus horarios favoritos</p>
        <div className="bg-white/20 rounded-2xl p-4">
          <ResponsiveContainer width="100%" height={200}>
            <RadialBarChart 
              innerRadius="30%" 
              outerRadius="100%" 
              data={habitosPedidos}
              startAngle={180} 
              endAngle={0}
            >
              <RadialBar 
                minAngle={15} 
                background
                clockWise={true} 
                dataKey="value"
                cornerRadius={15}
              />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-white/90">Horario favorito:</span>
            <span className="font-bold text-white">20:00 - 21:00</span>
          </div>
        </div>
      </div>

      {/* Gráfico 3: Preferencias */}
      <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl p-6 text-white shadow-lg">
        <h3 className="text-lg font-bold mb-1">Tus preferencias</h3>
        <p className="text-sm text-white/90 mb-4">Categorías más pedidas</p>
        <div className="bg-white/20 rounded-2xl p-4">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={preferencias}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="categoria" stroke="#FFFFFF" fontSize={12} />
              <YAxis stroke="#FFFFFF" fontSize={12} />
              <Tooltip />
              <Bar dataKey="valor" radius={[5, 5, 0, 0]}>
                {preferencias.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    fillOpacity={0.9}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-white/90">Categoría favorita:</span>
            <span className="font-bold text-white">Comidas</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRecomendacionesTab = () => {
    return (
      <div className="space-y-6 p-4 pb-24">
        {/* Radar de Tendencias */}
        <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl p-6 text-white shadow-lg max-w-md mx-auto">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 rounded-full p-3">
              <span className="text-2xl">🔥</span>
            </div>
            <div>
              <h3 className="text-lg font-bold">¡Trending ahora!</h3>
              <p className="text-sm text-white/90">El plato más viral de la semana</p>
            </div>
          </div>
          
          <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl font-bold">Poke Bowl Tropical</h4>
                <p className="text-sm text-white/90">Salmón, mango y aguacate con salsa especial</p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-300">⭐</span>
                  <span className="ml-1 text-sm">4.9 (128 reviews)</span>
                </div>
              </div>
              <div className="text-3xl">🍱</div>
            </div>
            <button className="mt-4 w-full bg-white/20 hover:bg-white/30 transition-colors rounded-xl py-2.5 text-sm font-medium">
              ¡Probar ahora!
            </button>
          </div>
        </div>

        {/* Selector de Momento */}
        <div className="flex justify-center gap-3 px-4">
          {Object.entries(moodStyles).map(([id, style]) => (
            <button
              key={id}
              onClick={() => setSelectedMood(id)}
              className={`flex-1 max-w-[130px] flex items-center justify-center px-4 py-2.5 rounded-full transition-all ${
                selectedMood === id
                  ? `bg-gradient-to-r ${style.gradient} text-white shadow-md scale-105`
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-base mr-2">{style.icon}</span>
              <span className="text-sm font-medium">{style.label}</span>
            </button>
          ))}
        </div>

        {/* Título y descripción */}
        <div className={`bg-gradient-to-r ${moodStyles[selectedMood].gradient} rounded-3xl p-6 text-white shadow-md mx-auto max-w-md`}>
          <h3 className="text-xl font-bold text-center">{moodCombos[selectedMood].title}</h3>
          <p className="text-white/90 mt-1 text-center">{moodCombos[selectedMood].description}</p>
        </div>

        {/* Combos */}
        <div className="space-y-4 max-w-md mx-auto">
          {moodCombos[selectedMood].combos.map(combo => (
            <div 
              key={combo.id}
              className={`bg-gradient-to-r ${moodStyles[selectedMood].containerGradient} rounded-2xl p-4`}
            >
              <h4 className="text-lg font-bold text-gray-800 mb-3 text-center">{combo.name}</h4>
              <div className="grid grid-cols-3 gap-4">
                {[combo.comida, combo.bebida, combo.postre].map((item, idx) => (
                  <div key={idx} className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                    <div className="text-2xl mb-2">{item.image}</div>
                    <div className="text-sm font-medium text-gray-800">{item.name}</div>
                    <div className="text-xs text-gray-600 mt-1">${item.price}</div>
                  </div>
                ))}
              </div>
              <button 
                className={`mt-4 w-full bg-gradient-to-r ${moodStyles[selectedMood].gradient} text-white 
                  transition-all hover:opacity-90 rounded-xl py-2.5 text-sm font-medium shadow-sm`}
              >
                Ordenar Combo ${(combo.comida.price + combo.bebida.price + combo.postre.price).toFixed(2)}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCuponesTab = () => {
    const filterCoupons = () => {
      switch (couponFilter) {
        case 'nuevos':
          return cupones.filter(c => c.isNew);
        case 'expirando':
          return cupones.filter(c => c.isExpiring);
        case 'favoritos':
          return cupones.filter(c => c.isSpecial);
        default:
          return cupones;
      }
    };

    const handleScratch = (couponId) => {
      setScratchedCoupons(prev => new Set([...prev, couponId]));
    };

    const formatTimeLeft = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const CouponCard = ({ coupon }) => {
      const isScratched = scratchedCoupons.has(coupon.id);
      
      return (
        <div 
          className={`relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer overflow-hidden`}
          onClick={() => setActiveCoupon(coupon)}
        >
          {/* Fondo con gradiente */}
          <div className={`absolute inset-0 bg-gradient-to-br ${coupon.gradient} opacity-10`} />
          
          {/* Efecto de brillo para cupones especiales */}
          {coupon.isSpecial && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          )}
          
          {/* Header del cupón */}
          <div className="relative flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-2xl">{coupon.icon}</span>
                <h3 className="text-lg font-bold text-gray-800">{coupon.title}</h3>
                {coupon.isNew && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    NUEVO
                  </span>
                )}
                {coupon.isExpiring && (
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    EXPIRA PRONTO
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm">{coupon.subtitle}</p>
            </div>
            
            {/* Descuento */}
            <div className={`bg-gradient-to-r ${coupon.gradient} text-white px-4 py-2 rounded-2xl font-bold text-lg shadow-md`}>
              {coupon.discount}
            </div>
          </div>

          {/* Contenido específico por tipo */}
          {coupon.type === 'scratch' && (
            <div className="relative">
              {!isScratched ? (
                <div 
                  className="bg-gray-300 rounded-xl p-4 cursor-pointer hover:bg-gray-400 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleScratch(coupon.id);
                  }}
                >
                  <p className="text-center text-gray-600 font-medium">
                    🪙 ¡Toca para rascar! 🪙
                  </p>
                </div>
              ) : (
                <div className={`bg-gradient-to-r ${coupon.gradient} text-white rounded-xl p-4 animate-pulse`}>
                  <p className="text-center font-bold">
                    ¡Ganaste {coupon.discount} de descuento! 🎉
                  </p>
                </div>
              )}
            </div>
          )}

          {coupon.type === 'countdown' && coupon.timeLeft && (
            <div className="bg-red-100 rounded-xl p-3 mb-3">
              <div className="flex items-center justify-between">
                <span className="text-red-600 font-medium text-sm">Tiempo restante:</span>
                <span className="text-red-700 font-bold text-lg font-mono">
                  {formatTimeLeft(coupon.timeLeft)}
                </span>
              </div>
            </div>
          )}

          {coupon.type === 'loyalty' && coupon.progress && (
            <div className="mb-3">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progreso de fidelidad</span>
                <span>{coupon.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`bg-gradient-to-r ${coupon.gradient} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${coupon.progress}%` }}
                />
              </div>
            </div>
          )}

          {coupon.type === 'location' && (
            <div className="bg-blue-50 rounded-xl p-3 mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-blue-500">📍</span>
                <span className="text-blue-700 text-sm font-medium">
                  Válido en tu ubicación actual
                </span>
              </div>
            </div>
          )}

          {/* Descripción y validez */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-gray-600 text-sm mb-2">{coupon.description}</p>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>Válido hasta: {coupon.validUntil}</span>
              <span className={`px-2 py-1 rounded-full ${
                coupon.category === 'comidas' ? 'bg-orange-100 text-orange-600' :
                coupon.category === 'bebidas' ? 'bg-blue-100 text-blue-600' :
                'bg-green-100 text-green-600'
              }`}>
                {coupon.category}
              </span>
            </div>
          </div>

          {/* Botón de usar cupón */}
          <button 
            className={`w-full mt-4 bg-gradient-to-r ${coupon.gradient} text-white py-3 rounded-2xl font-semibold hover:opacity-90 transition-all transform hover:scale-[1.02] shadow-md`}
            onClick={(e) => {
              e.stopPropagation();
              // Aquí iría la lógica para usar el cupón
              alert(`¡Cupón ${coupon.title} aplicado!`);
            }}
          >
            Usar Cupón
          </button>
        </div>
      );
    };

    return (
      <div className="space-y-6 p-4 pb-24">
        {/* Header con estadísticas */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Mis Cupones</h2>
              <p className="text-white/90 text-sm">¡Ahorra en cada pedido!</p>
            </div>
            <div className="text-3xl">🎟️</div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/20 rounded-2xl p-3 text-center">
              <div className="text-2xl font-bold">{cupones.length}</div>
              <div className="text-white/90 text-xs">Disponibles</div>
            </div>
            <div className="bg-white/20 rounded-2xl p-3 text-center">
              <div className="text-2xl font-bold">$127</div>
              <div className="text-white/90 text-xs">Ahorrado</div>
            </div>
            <div className="bg-white/20 rounded-2xl p-3 text-center">
              <div className="text-2xl font-bold">3</div>
              <div className="text-white/90 text-xs">Por expirar</div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {[
            { id: 'todos', label: 'Todos', icon: '📋' },
            { id: 'nuevos', label: 'Nuevos', icon: '✨' },
            { id: 'expirando', label: 'Expirando', icon: '⏰' },
            { id: 'favoritos', label: 'Especiales', icon: '⭐' }
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setCouponFilter(filter.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                couponFilter === filter.id
                  ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>{filter.icon}</span>
              <span className="text-sm font-medium">{filter.label}</span>
            </button>
          ))}
        </div>

        {/* Lista de cupones */}
        <div className="space-y-4">
          {filterCoupons().map(coupon => (
            <CouponCard key={coupon.id} coupon={coupon} />
          ))}
        </div>

        {/* Modal de detalle del cupón */}
        {activeCoupon && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{activeCoupon.title}</h3>
                <button 
                  onClick={() => setActiveCoupon(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className={`bg-gradient-to-r ${activeCoupon.gradient} text-white rounded-2xl p-6 mb-4 text-center`}>
                <div className="text-4xl mb-2">{activeCoupon.icon}</div>
                <div className="text-3xl font-bold mb-1">{activeCoupon.discount}</div>
                <div className="text-white/90">{activeCoupon.subtitle}</div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Descripción</h4>
                  <p className="text-gray-600">{activeCoupon.description}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Términos y condiciones</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Válido hasta: {activeCoupon.validUntil}</li>
                    <li>• Aplicable a categoría: {activeCoupon.category}</li>
                    <li>• No acumulable con otras ofertas</li>
                    <li>• Válido para pedidos mínimos de $15</li>
                  </ul>
                </div>
              </div>
              
              <button 
                className={`w-full mt-6 bg-gradient-to-r ${activeCoupon.gradient} text-white py-3 rounded-2xl font-semibold hover:opacity-90 transition-all`}
                onClick={() => {
                  setActiveCoupon(null);
                  alert(`¡Cupón ${activeCoupon.title} aplicado!`);
                }}
              >
                Usar Este Cupón
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen w-full absolute inset-0">
      {/* Fondo con gradiente */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b ${tabStyles[activeTab].bgGradient} transition-all duration-500`} 
        style={{ backgroundSize: '100% 100%' }}
      />
      
      {/* Contenido */}
      <div className="relative flex flex-col min-h-screen w-full">
        {/* Header con fondo translúcido */}
        <div className="bg-white/80 backdrop-blur-sm shadow-sm z-10 w-full">
          <div className="flex items-center p-4">
            {canGoBack && (
              <button
                onClick={onGoBack}
                className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <h1 className="text-xl font-semibold flex-1 text-center">Descubrir</h1>
            {canGoBack && <div className="w-10" />}
          </div>
          
          {/* Tabs */}
          <div className="flex w-full">
            {Object.entries(tabStyles).map(([tab, style]) => (
              <button
                key={tab}
                className={`flex-1 py-3 text-sm font-medium relative transition-colors ${
                  activeTab === tab 
                    ? `text-[${style.color}]`
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'resumen' ? 'Resumen' : 
                 tab === 'recomendaciones' ? 'Recomendaciones' : 
                 'Cupones'}
                {activeTab === tab && (
                  <div 
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${style.underlineGradient}`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto w-full">
          <div className="min-h-full p-4">
            {activeTab === 'resumen' && renderResumenTab()}
            {activeTab === 'recomendaciones' && renderRecomendacionesTab()}
            {activeTab === 'cupones' && renderCuponesTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverScreen; 