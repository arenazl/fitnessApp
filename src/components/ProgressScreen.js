import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressScreen = ({ onGoBack, canGoBack, onNavigate }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Week');
  const [progressValue, setProgressValue] = useState(0);
  const [animateChart, setAnimateChart] = useState(false);

  const periods = ['This Week', 'Last Week', 'This Month', 'Last Month'];
  
  const weeklyData = [
    { day: 'Sun', value: 45, calories: 180 },
    { day: 'Mon', value: 30, calories: 120 },
    { day: 'Tue', value: 65, calories: 260 },
    { day: 'Wed', value: 40, calories: 160 },
    { day: 'Thu', value: 55, calories: 220 },
    { day: 'Fri', value: 70, calories: 280 },
    { day: 'Sat', value: 35, calories: 140 }
  ];

  useEffect(() => {
    // Animate progress circle
    const timer = setTimeout(() => {
      setProgressValue(75);
      setAnimateChart(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const totalCalories = weeklyData.reduce((sum, day) => sum + day.calories, 0);

  const handleManage = () => {
    // Navigate to detailed progress management
    onNavigate('workout');
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
        <h1 className="text-xl font-bold text-gray-800">My Progress</h1>
        <div className="w-6 h-6"></div>
      </div>

      {/* Overall Progress */}
      <div className="text-center mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Overall Progress</h2>
        <button 
          onClick={handleManage}
          className="text-blue-500 text-sm font-medium mb-8 hover:text-blue-600 transition-colors"
        >
          Manage
        </button>
        
        <div className={`relative w-48 h-48 mx-auto mb-6 transition-all duration-1000 ${
          animateChart ? 'opacity-100 transform scale-100' : 'opacity-50 transform scale-95'
        }`}>
          <CircularProgressbar
            value={progressValue}
            text={`${progressValue}%`}
            styles={buildStyles({
              textSize: '24px',
              pathColor: '#4A90E2',
              textColor: '#4A90E2',
              trailColor: '#E5E7EB',
              strokeLinecap: 'round',
              pathTransitionDuration: 1.5,
            })}
            strokeWidth={8}
          />
        </div>
      </div>

      {/* Calories Burn */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Calories Burn</h3>
          <div className="relative">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="appearance-none bg-transparent text-sm text-gray-500 pr-6 focus:outline-none cursor-pointer"
            >
              {periods.map(period => (
                <option key={period} value={period}>{period}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
        
        <div className="bg-yellow-50 rounded-2xl p-4 mb-6 hover:bg-yellow-100 transition-colors">
          <div className="text-sm text-gray-600 mb-2">200+</div>
          <div className="flex justify-between items-end h-20 mb-4">
            {weeklyData.map((item, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div 
                  className="bg-yellow-300 rounded-t-lg mb-2 transition-all duration-500 hover:bg-yellow-400 cursor-pointer group-hover:scale-110"
                  style={{ 
                    height: `${item.value}%`, 
                    width: '20px',
                    maxHeight: '60px',
                    animationDelay: `${index * 100}ms`
                  }}
                  title={`${item.calories} calories`}
                ></div>
                <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">{item.day}</span>
              </div>
            ))}
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500">{totalCalories} Cal Total</span>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button 
          onClick={() => onNavigate('workout')}
          className="text-center p-4 bg-orange-50 rounded-2xl hover:bg-orange-100 transition-all duration-200 hover:scale-105"
        >
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-orange-500 text-lg">🏃</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">4.2</div>
          <div className="text-gray-500 text-sm">km Today</div>
        </button>
        <button 
          onClick={() => onNavigate('workout')}
          className="text-center p-4 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-all duration-200 hover:scale-105"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-blue-500 text-lg">💪</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">4.1k</div>
          <div className="text-gray-500 text-sm">Steps</div>
        </button>
      </div>

      {/* Weekly Goal Progress */}
      <div className="bg-gray-50 rounded-2xl p-4 mb-6">
        <h4 className="font-semibold text-gray-800 mb-3">Weekly Goals</h4>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Workouts</span>
              <span className="text-gray-800 font-medium">5/7</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full transition-all duration-1000" style={{width: '71%'}}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Calories</span>
              <span className="text-gray-800 font-medium">1800/2000</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full transition-all duration-1000" style={{width: '90%'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressScreen; 