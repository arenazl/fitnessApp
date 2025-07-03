import React, { useState } from 'react';
import { ArrowLeft, Trash2, Plus, Minus, CreditCard, Clock } from 'lucide-react';

const CartScreen = ({ onGoBack, canGoBack, onNavigate }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Ensalada César',
      description: 'Lechuga fresca, pollo grillado, crutones',
      price: 12.99,
      quantity: 2,
      image: '🥗'
    },
    {
      id: 2,
      name: 'Hamburguesa Premium',
      description: 'Carne angus, queso cheddar, tocino',
      price: 18.50,
      quantity: 1,
      image: '🍔'
    },
    {
      id: 5,
      name: 'Smoothie Verde',
      description: 'Espinaca, manzana, plátano y proteína',
      price: 6.50,
      quantity: 3,
      image: '🥤'
    }
  ]);

  const [deliveryTime, setDeliveryTime] = useState('30-45');
  const [orderNotes, setOrderNotes] = useState('');

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getDeliveryFee = () => {
    return getSubtotal() > 25 ? 0 : 3.99;
  };

  const getTax = () => {
    return getSubtotal() * 0.1; // 10% tax
  };

  const getTotal = () => {
    return getSubtotal() + getDeliveryFee() + getTax();
  };

  const proceedToCheckout = () => {
    // Navigate to checkout/payment
    onNavigate('payment');
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
        <h1 className="text-xl font-bold text-gray-800">Tu Carrito</h1>
        <div className="w-6 h-6"></div>
      </div>

      {cartItems.length === 0 ? (
        /* Empty Cart */
        <div className="text-center py-16">
          <div className="text-8xl mb-6">🛒</div>
          <h3 className="text-2xl font-bold text-gray-600 mb-2">Tu carrito está vacío</h3>
          <p className="text-gray-500 mb-8">Agrega algunos productos deliciosos</p>
          <button 
            onClick={() => onNavigate('menu')}
            className="bg-blue-gradient text-white px-8 py-3 rounded-2xl font-semibold hover:opacity-90 transition-all duration-200 hover:scale-105"
          >
            Explorar Menú
          </button>
        </div>
      ) : (
        <>
          {/* Delivery Time */}
          <div className="bg-green-50 rounded-2xl p-4 mb-6 border border-green-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-green-800">Tiempo de entrega</h3>
                <p className="text-green-600 text-sm">{deliveryTime} minutos</p>
              </div>
            </div>
          </div>

          {/* Cart Items */}
          <div className="space-y-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Productos ({cartItems.length})</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">
                    {item.image}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-500 text-sm mb-2">{item.description}</p>
                    <span className="text-lg font-bold text-blue-600">${item.price}</span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-200"
                    >
                      <Minus className="w-4 h-4 text-white" />
                    </button>
                    <span className="w-8 text-center font-bold text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-200"
                    >
                      <Plus className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-red-100 hover:text-red-500 transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Notes */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Notas del pedido</h3>
            <textarea
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              placeholder="Instrucciones especiales para tu pedido..."
              className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none"
              rows="3"
            />
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumen del pedido</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${getSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Envío</span>
                <span className="font-semibold">
                  {getDeliveryFee() === 0 ? 'Gratis' : `$${getDeliveryFee().toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Impuestos</span>
                <span className="font-semibold">${getTax().toFixed(2)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-xl font-bold text-blue-600">${getTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={proceedToCheckout}
            className="w-full bg-blue-gradient text-white p-4 rounded-2xl font-semibold hover:opacity-90 transition-all duration-200 hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-2"
          >
            <CreditCard className="w-5 h-5" />
            <span>Proceder al pago</span>
          </button>

          {/* Free Delivery Notice */}
          {getSubtotal() < 25 && (
            <div className="mt-4 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
              <p className="text-yellow-800 text-sm text-center">
                Agrega ${(25 - getSubtotal()).toFixed(2)} más para envío gratis
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CartScreen; 