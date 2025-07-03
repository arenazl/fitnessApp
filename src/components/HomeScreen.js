import React, { useState, useEffect } from 'react';
import { Droplets, Flame, Plus } from 'lucide-react';

const HomeScreen = ({ onNavigate, onGoBack, canGoBack }) => {
  const [waterIntake, setWaterIntake] = useState(4.5);
  const [caloriesBurned] = useState(2.3);
  const [selectedDate, setSelectedDate] = useState(16);
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    setAnimateCards(true);
  }, []);

  const addWater = () => {
    setWaterIntake(prev => Math.round((prev + 0.1) * 10) / 10);
  };

  const startWorkout = (type) => {
    onNavigate('workout');
  };

  const viewProgress = () => {
    onNavigate('progress');
  };

  return (
    <div className="p-6 bg-white pb-24">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 animate-fade-in">Hello John!</h1>
          <p className="text-gray-500 text-sm mt-1">January 2025</p>
        </div>
        <button 
          onClick={() => onNavigate('profile')}
          className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-200 hover:scale-105"
        >
          <span className="text-white font-semibold">JD</span>
        </button>
      </div>

      {/* Calendar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="grid grid-cols-7 gap-2 w-full">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <div key={index} className="text-center text-gray-400 text-sm font-medium">
                {day}
              </div>
            ))}
            {[12, 13, 14, 15, 16, 17, 18].map((date, index) => (
              <button 
                key={index} 
                onClick={() => setSelectedDate(date)}
                className={`text-center py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  date === selectedDate 
                    ? 'bg-orange-500 text-white transform scale-105' 
                    : 'text-gray-600 hover:bg-gray-100 hover:scale-105'
                }`}
              >
                {date}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={`grid grid-cols-2 gap-4 mb-8 transition-all duration-500 ${
        animateCards ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
      }`}>
        <button 
          onClick={addWater}
          className="bg-blue-50 rounded-2xl p-4 hover:bg-blue-100 transition-all duration-200 hover:scale-105 hover:shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full">
              <Droplets className="w-4 h-4 text-white" />
            </div>
            <Plus className="w-4 h-4 text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{waterIntake}</h3>
          <p className="text-gray-600 text-sm">Liters Water</p>
        </button>
        
        <button 
          onClick={viewProgress}
          className="bg-orange-50 rounded-2xl p-4 hover:bg-orange-100 transition-all duration-200 hover:scale-105 hover:shadow-lg"
        >
          <div className="flex items-center justify-center w-8 h-8 bg-orange-500 rounded-full mb-3">
            <Flame className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{caloriesBurned}k</h3>
          <p className="text-gray-600 text-sm">Kcal Out</p>
        </button>
      </div>

      {/* Today's Goals */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Today's Goals</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-gradient rounded-2xl p-6 text-white transform transition-all duration-200 hover:scale-105 hover:shadow-xl">
            <h3 className="text-3xl font-bold mb-1">30</h3>
            <p className="text-blue-100 text-sm mb-4">Days</p>
            <button 
              onClick={() => startWorkout('running')}
              className="bg-white bg-opacity-20 rounded-lg px-4 py-2 text-sm font-medium hover:bg-opacity-30 transition-all duration-200"
            >
              Start Now
            </button>
            <p className="text-lg font-semibold mt-2">Running</p>
          </div>
          <div className="bg-orange-gradient rounded-2xl p-6 text-white transform transition-all duration-200 hover:scale-105 hover:shadow-xl">
            <h3 className="text-3xl font-bold mb-1">40</h3>
            <p className="text-orange-100 text-sm mb-4">Days</p>
            <button 
              onClick={() => startWorkout('cycling')}
              className="bg-white bg-opacity-20 rounded-lg px-4 py-2 text-sm font-medium hover:bg-opacity-30 transition-all duration-200"
            >
              Set All
            </button>
            <p className="text-lg font-semibold mt-2">Cycling</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <button 
          onClick={() => onNavigate('workout')}
          className="bg-purple-gradient rounded-xl p-4 text-white text-center hover:opacity-90 transition-all duration-200 hover:scale-105"
        >
          <div className="text-2xl mb-1">💪</div>
          <div className="text-xs font-medium">Workout</div>
        </button>
        <button 
          onClick={() => onNavigate('progress')}
          className="bg-green-gradient rounded-xl p-4 text-white text-center hover:opacity-90 transition-all duration-200 hover:scale-105"
        >
          <div className="text-2xl mb-1">📊</div>
          <div className="text-xs font-medium">Progress</div>
        </button>
        <button 
          onClick={() => onNavigate('profile')}
          className="bg-blue-gradient rounded-xl p-4 text-white text-center hover:opacity-90 transition-all duration-200 hover:scale-105"
        >
          <div className="text-2xl mb-1">👤</div>
          <div className="text-xs font-medium">Profile</div>
        </button>
      </div>
    </div>
  );
};

export default HomeScreen; 