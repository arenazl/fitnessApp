import React, { useState } from 'react';
import { ArrowLeft, Clock, CheckCircle, Package, Star } from 'lucide-react';

const OrdersScreen = ({ onGoBack, canGoBack, onNavigate }) => {
  const [selectedTab, setSelectedTab] = useState('current');

  const currentOrders = [
    {
      id: 'ORD-001',
      status: 'preparing',
      items: [
        { name: 'Hamburguesa Premium', quantity: 1, price: 18.50 },
        { name: 'Smoothie Verde', quantity: 2, price: 6.50 }
      ],
      total: 31.50,
      estimatedTime: '15-20 min',
      orderTime: '14:30',
      restaurant: 'Restaurante Central'
    },
    {
      id: 'ORD-002',
      status: 'ready',
      items: [
        { name: 'Ensalada César', quantity: 1, price: 12.99 }
      ],
      total: 12.99,
      estimatedTime: 'Listo',
      orderTime: '13:45',
      restaurant: 'Restaurante Central'
    }
  ];

  const orderHistory = [
    {
      id: 'ORD-098',
      status: 'delivered',
      items: [
        { name: 'Pasta Carbonara', quantity: 1, price: 15.75 },
        { name: 'Cheesecake', quantity: 1, price: 8.99 }
      ],
      total: 24.74,
      orderTime: '12:15',
      deliveredTime: '12:45',
      restaurant: 'Restaurante Central',
      rating: 5
    },
    {
      id: 'ORD-097',
      status: 'delivered',
      items: [
        { name: 'Hamburguesa Premium', quantity: 2, price: 18.50 },
        { name: 'Smoothie Verde', quantity: 1, price: 6.50 }
      ],
      total: 43.50,
      orderTime: 'Ayer 19:30',
      deliveredTime: 'Ayer 20:10',
      restaurant: 'Restaurante Central',
      rating: 4
    }
  ];

  const getStatusInfo = (status) => {
    switch (status) {
      case 'preparing':
        return { color: 'bg-orange-500', text: 'Preparando', icon: Clock };
      case 'ready':
        return { color: 'bg-green-500', text: 'Listo', icon: CheckCircle };
      case 'delivered':
        return { color: 'bg-blue-500', text: 'Entregado', icon: Package };
      default:
        return { color: 'bg-gray-500', text: 'Desconocido', icon: Clock };
    }
  };

  const reorderItems = (order) => {
    // Navigate to menu and add items to cart
    onNavigate('menu');
  };

  const OrderCard = ({ order, showActions = false }) => {
    const statusInfo = getStatusInfo(order.status);
    const StatusIcon = statusInfo.icon;

    return (
      <div className="bg-white rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-all duration-200 border border-gray-100 mb-4">
        {/* Order Header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-gray-800">{order.id}</h3>
            <p className="text-gray-500 text-sm">{order.restaurant}</p>
            <p className="text-gray-400 text-xs">{order.orderTime}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`${statusInfo.color} text-white px-3 py-1 rounded-full flex items-center space-x-1`}>
              <StatusIcon className="w-4 h-4" />
              <span className="text-sm font-medium">{statusInfo.text}</span>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="space-y-2 mb-3">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-gray-700">
                {item.quantity}x {item.name}
              </span>
              <span className="text-gray-600 font-medium">${item.price}</span>
            </div>
          ))}
        </div>

        {/* Order Footer */}
        <div className="border-t pt-3 flex justify-between items-center">
          <div>
            <span className="text-lg font-bold text-blue-600">${order.total}</span>
            {order.estimatedTime && order.status !== 'delivered' && (
              <p className="text-green-600 text-sm font-medium">{order.estimatedTime}</p>
            )}
            {order.deliveredTime && order.status === 'delivered' && (
              <p className="text-gray-500 text-sm">Entregado: {order.deliveredTime}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {order.rating && (
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600">{order.rating}</span>
              </div>
            )}
            {showActions && (
              <button
                onClick={() => reorderItems(order)}
                className="bg-blue-gradient text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-all duration-200 hover:scale-105"
              >
                Repetir
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

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
        <h1 className="text-xl font-bold text-gray-800">Mis Pedidos</h1>
        <div className="w-6 h-6"></div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setSelectedTab('current')}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
            selectedTab === 'current'
              ? 'bg-blue-gradient text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Actuales ({currentOrders.length})
        </button>
        <button
          onClick={() => setSelectedTab('history')}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
            selectedTab === 'history'
              ? 'bg-blue-gradient text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Historial
        </button>
      </div>

      {/* Content */}
      {selectedTab === 'current' ? (
        <div>
          {currentOrders.length > 0 ? (
            currentOrders.map((order) => (
              <OrderCard key={order.id} order={order} showActions={false} />
            ))
          ) : (
            <div className="text-center py-16">
              <div className="text-8xl mb-6">📋</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">No tienes pedidos actuales</h3>
              <p className="text-gray-500 mb-8">¡Haz tu primer pedido!</p>
              <button 
                onClick={() => onNavigate('menu')}
                className="bg-blue-gradient text-white px-8 py-3 rounded-2xl font-semibold hover:opacity-90 transition-all duration-200 hover:scale-105"
              >
                Explorar Menú
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          {orderHistory.length > 0 ? (
            orderHistory.map((order) => (
              <OrderCard key={order.id} order={order} showActions={true} />
            ))
          ) : (
            <div className="text-center py-16">
              <div className="text-8xl mb-6">📚</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">Sin historial de pedidos</h3>
              <p className="text-gray-500">Tus pedidos anteriores aparecerán aquí</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrdersScreen; 