import React from 'react';
import { Plus, Minus } from 'lucide-react';

const QuantityControl = ({
  quantity = 0,
  onAdd,
  onRemove,
  onTapNumber,
  isActive = false,
  isClosing = false,
  onClose,
  gradient = 'from-blue-600 to-purple-600',
}) => {
  return (
    <>
      {/* Botón de cantidad compacto */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (quantity === 0) {
            onAdd && onAdd();
          } else if (onTapNumber) {
            onTapNumber();
          }
        }}
        className={`px-3 py-1.5 rounded-full font-medium transition-all duration-200 shadow-md hover:shadow-lg ${
          quantity === 0
            ? `bg-gradient-to-r ${gradient} text-white hover:scale-105`
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        }`}
      >
        {quantity === 0 ? (
          <Plus className="w-4 h-4" />
        ) : (
          <span className="text-sm font-bold">{quantity}</span>
        )}
      </button>

      {/* Modal flotante de cantidad */}
      {isActive && (
        <div
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm rounded-3xl flex items-center justify-center z-10 ${
            isClosing ? 'animate-fade-out' : 'animate-fade-in'
          }`}
          onClick={onClose}
        >
          <div
            className={`bg-white rounded-2xl p-4 shadow-xl flex items-center space-x-4 ${
              isClosing ? 'animate-scale-out' : 'animate-scale-in'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onRemove}
              className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-200 shadow-md"
            >
              <Minus className="w-5 h-5 text-white" />
            </button>
            <span className="w-12 text-center font-bold text-gray-800 text-lg">
              {quantity}
            </span>
            <button
              onClick={onAdd}
              className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-200 shadow-md"
            >
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default QuantityControl; 