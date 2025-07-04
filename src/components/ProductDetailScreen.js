import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Plus, Minus, Clock, Users } from 'lucide-react';
import QuantityControl from './QuantityControl';

const ProductDetailScreen = (props) => {
  const { onGoBack, canGoBack, categories, allProducts, selectedProduct } = props;
  const [quantity, setQuantity] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeQuantityControl, setActiveQuantityControl] = useState(null); // Para modal animado
  const [isClosing, setIsClosing] = useState(false);
  const [autoCloseTimer, setAutoCloseTimer] = useState(null);

  useEffect(() => {
    // Obtener cantidad actual del carrito
    const cartItem = props.cartItems.find(item => item.id === selectedProduct.id);
    setQuantity(cartItem ? cartItem.quantity : 0);

    // Obtener productos relacionados (misma subcategoría, excluyendo el actual)
    const related = allProducts.filter(p => 
      p.subcategory === selectedProduct.subcategory && 
      p.id !== selectedProduct.id
    ).slice(0, 6); // Máximo 6 productos relacionados
    setRelatedProducts(related);
  }, [selectedProduct, props.cartItems, allProducts]);

  // Scroll to top solo cuando cambia el producto
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedProduct.id]);

  useEffect(() => {
    if (activeQuantityControl) {
      // Limpiar timer existente
      if (autoCloseTimer) clearTimeout(autoCloseTimer);
      // Crear nuevo timer
      const timer = setTimeout(() => {
        setIsClosing(true);
        setTimeout(() => {
          setActiveQuantityControl(null);
          setIsClosing(false);
        }, 500); // Duración animación de salida
      }, 3000); // 3 segundos
      setAutoCloseTimer(timer);
    } else {
      if (autoCloseTimer) {
        clearTimeout(autoCloseTimer);
        setAutoCloseTimer(null);
      }
    }
    return () => {
      if (autoCloseTimer) clearTimeout(autoCloseTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeQuantityControl]);

  const addToCart = () => {
    const existing = props.cartItems.find(item => item.id === selectedProduct.id);
    let newCartItems;
    
    if (existing) {
      newCartItems = props.cartItems.map(item =>
        item.id === selectedProduct.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCartItems = [...props.cartItems, { ...selectedProduct, quantity: 1 }];
    }
    
    if (props.onCartUpdate) {
      props.onCartUpdate(newCartItems);
    }
  };

  const removeFromCart = () => {
    const newCartItems = props.cartItems.map(item =>
      item.id === selectedProduct.id
        ? { ...item, quantity: Math.max(0, item.quantity - 1) }
        : item
    ).filter(item => item.quantity > 0);
    
    if (props.onCartUpdate) {
      props.onCartUpdate(newCartItems);
    }
  };

  const addRelatedToCart = (relatedProduct) => {
    const existing = props.cartItems.find(item => item.id === relatedProduct.id);
    let newCartItems;
    
    if (existing) {
      newCartItems = props.cartItems.map(item =>
        item.id === relatedProduct.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCartItems = [...props.cartItems, { ...relatedProduct, quantity: 1 }];
    }
    
    if (props.onCartUpdate) {
      props.onCartUpdate(newCartItems);
    }
  };

  const removeRelatedFromCart = (relatedProduct) => {
    const newCartItems = props.cartItems.map(item =>
      item.id === relatedProduct.id
        ? { ...item, quantity: Math.max(0, item.quantity - 1) }
        : item
    ).filter(item => item.quantity > 0);
    
    if (props.onCartUpdate) {
      props.onCartUpdate(newCartItems);
    }
  };

  const getCartQuantity = (productId) => {
    const item = props.cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const currentCategory = categories[selectedProduct.category];

  // Animación modal para producto principal
  const handleTapNumber = () => setActiveQuantityControl(selectedProduct.id);
  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setActiveQuantityControl(null);
      setIsClosing(false);
    }, 500);
  };

  // Animación modal para productos relacionados
  const handleTapNumberRelated = (id) => setActiveQuantityControl(id);
  const handleCloseModalRelated = () => {
    setIsClosing(true);
    setTimeout(() => {
      setActiveQuantityControl(null);
      setIsClosing(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header con botón de regreso */}
      <div className="fixed top-0 left-0 w-full z-[999] bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center p-4">
          <button
            onClick={onGoBack}
            className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800 truncate max-w-xs">{selectedProduct.name}</h1>
        </div>
      </div>

      {/* Imagen grande del producto */}
      <div className="px-6 pt-2" style={{ paddingTop: '60px' }}>
        <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center text-8xl shadow-lg mb-8">
          {selectedProduct.image}
        </div>
      </div>

      {/* Información del producto */}
      <div className="px-6 mb-8">
        <div className="bg-white rounded-3xl p-6 shadow-lg relative">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-800">{selectedProduct.name}</h2>
                {selectedProduct.popular && (
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                    Popular
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                {selectedProduct.description}
              </p>

              {/* Información adicional */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-gray-700 font-medium">{selectedProduct.rating}</span>
                  <span className="text-gray-500 text-sm">(4.2k reseñas)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700">{selectedProduct.preparationTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Para 1-2 personas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 text-center">🔥</span>
                  <span className="text-gray-700">Nivel medio</span>
                </div>
              </div>

              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                ${selectedProduct.price}
              </div>
            </div>
          </div>

          {/* Control de cantidad: ahora centrado y fuera del flex de la fila */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Cantidad en el carrito: {quantity}
            </div>
          </div>
          <div className="w-full flex justify-center relative mt-4">
            <QuantityControl
              quantity={quantity}
              onAdd={addToCart}
              onRemove={removeFromCart}
              onTapNumber={handleTapNumber}
              isActive={activeQuantityControl === selectedProduct.id}
              isClosing={isClosing}
              onClose={handleCloseModal}
              gradient={currentCategory.gradient}
            />
          </div>
        </div>
      </div>

      {/* Productos relacionados */}
      {relatedProducts.length > 0 && (
        <div className="px-6 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Productos relacionados</h3>
          <div className="overflow-x-auto">
            <div className="flex space-x-4 pb-4">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="flex-shrink-0 w-48 bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 relative cursor-pointer"
                  onClick={(e) => {
                    if (!e.target.closest('button')) {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      props.onProductSelect && props.onProductSelect(relatedProduct);
                    }
                  }}
                >
                  {/* Imagen del producto relacionado */}
                  <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-4xl mb-3">
                    {relatedProduct.image}
                  </div>
                  
                  {/* Información */}
                  <h4 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2">
                    {relatedProduct.name}
                  </h4>
                  
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600">{relatedProduct.rating}</span>
                  </div>
                  
                  <div className="flex items-center justify-between relative">
                    <span className="text-lg font-bold text-blue-600">
                      ${relatedProduct.price}
                    </span>
                    
                    <QuantityControl
                      quantity={getCartQuantity(relatedProduct.id)}
                      onAdd={() => addRelatedToCart(relatedProduct)}
                      onRemove={() => removeRelatedFromCart(relatedProduct)}
                      onTapNumber={() => handleTapNumberRelated(relatedProduct.id)}
                      isActive={activeQuantityControl === relatedProduct.id}
                      isClosing={isClosing}
                      onClose={handleCloseModalRelated}
                      gradient={currentCategory.gradient}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailScreen; 