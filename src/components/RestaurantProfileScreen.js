import React, { useState } from 'react';
import { ArrowLeft, User, MapPin, Phone, Mail, CreditCard, Bell, Star, Heart, Settings } from 'lucide-react';

const RestaurantProfileScreen = ({ onGoBack, canGoBack, onNavigate }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const userStats = {
    totalOrders: 47,
    favoriteRestaurants: 3,
    totalSpent: 1247.50,
    averageRating: 4.8
  };

  const favoriteItems = [
    { name: 'Hamburguesa Premium', orders: 12, image: '🍔' },
    { name: 'Smoothie Verde', orders: 8, image: '🥤' },
    { name: 'Ensalada César', orders: 6, image: '🥗' }
  ];

  const profileSections = [
    {
      title: 'Información Personal',
      items: [
        { icon: User, label: 'Editar Perfil', action: () => {} },
        { icon: MapPin, label: 'Direcciones', action: () => {} },
        { icon: Phone, label: 'Teléfono', action: () => {} },
        { icon: Mail, label: 'Email', action: () => {} }
      ]
    },
    {
      title: 'Pagos y Facturación',
      items: [
        { icon: CreditCard, label: 'Métodos de Pago', action: () => {} },
        { icon: Star, label: 'Programa de Puntos', action: () => {} }
      ]
    },
    {
      title: 'Configuración',
      items: [
        { icon: Bell, label: 'Notificaciones', action: () => {}, toggle: true },
        { icon: Settings, label: 'Preferencias', action: () => {} }
      ]
    }
  ];

  return (
    <div className="p-6 bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        {canGoBack ? (
          <button 
            onClick={onGoBack}
            className="w-6 h-6 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        ) : (
          <div className="w-6 h-6"></div>
        )}
        <h1 className="text-xl font-bold text-gray-800">Mi Perfil</h1>
        <div className="w-6 h-6"></div>
      </div>

      {/* Profile Header */}
      <div className="bg-blue-gradient rounded-2xl p-6 mb-6 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Juan Pérez</h2>
            <p className="text-blue-100">Cliente Premium</p>
            <div className="flex items-center space-x-1 mt-1">
              <Star className="w-4 h-4 text-yellow-300 fill-current" />
              <span className="text-sm">{userStats.averageRating}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{userStats.totalOrders}</div>
            <div className="text-blue-100 text-sm">Pedidos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">${userStats.totalSpent}</div>
            <div className="text-blue-100 text-sm">Total Gastado</div>
          </div>
        </div>
      </div>

      {/* Favorite Items */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Tus Favoritos</h3>
        <div className="space-y-3">
          {favoriteItems.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-4 flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">
                {item.image}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{item.name}</h4>
                <p className="text-gray-500 text-sm">{item.orders} pedidos</p>
              </div>
              <Heart className="w-5 h-5 text-red-500 fill-current" />
            </div>
          ))}
        </div>
      </div>

      {/* Profile Sections */}
      {profileSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{section.title}</h3>
          <div className="bg-gray-50 rounded-2xl overflow-hidden">
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex}>
                <button
                  onClick={item.action}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-800">{item.label}</span>
                  </div>
                  {item.toggle ? (
                    <div className="flex items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setNotificationsEnabled(!notificationsEnabled);
                        }}
                        className={`w-12 h-6 rounded-full transition-all duration-200 ${
                          notificationsEnabled ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-all duration-200 ${
                          notificationsEnabled ? 'transform translate-x-6' : 'transform translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  ) : (
                    <ArrowLeft className="w-5 h-5 text-gray-400 transform rotate-180" />
                  )}
                </button>
                {itemIndex < section.items.length - 1 && (
                  <div className="border-t border-gray-200 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Logout Button */}
      <button className="w-full bg-red-500 text-white p-4 rounded-2xl font-semibold hover:bg-red-600 transition-all duration-200 hover:scale-[1.02]">
        Cerrar Sesión
      </button>

      {/* App Version */}
      <div className="text-center mt-6">
        <p className="text-gray-400 text-sm">Versión 1.0.0</p>
      </div>
    </div>
  );
};

export default RestaurantProfileScreen; 