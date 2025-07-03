import React from 'react';
import { ArrowLeft, Settings, Award, Target, Calendar } from 'lucide-react';

const ProfileScreen = ({ onGoBack, canGoBack }) => {
  const stats = [
    { label: 'Workouts Completed', value: '127', icon: Award, color: 'bg-blue-500' },
    { label: 'Total Calories Burned', value: '12.5k', icon: Target, color: 'bg-orange-500' },
    { label: 'Days Active', value: '89', icon: Calendar, color: 'bg-green-500' },
  ];

  return (
    <div className="p-6 bg-white min-h-screen">
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
        <h1 className="text-xl font-bold text-gray-800">Profile</h1>
        <Settings className="w-6 h-6 text-gray-600" />
      </div>

      {/* Profile Info */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-2xl font-bold">JD</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">John Doe</h2>
        <p className="text-gray-500">Fitness Enthusiast</p>
        <div className="flex justify-center space-x-4 mt-4">
          <div className="text-center">
            <div className="text-xl font-bold text-gray-800">75kg</div>
            <div className="text-gray-500 text-sm">Weight</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-gray-800">180cm</div>
            <div className="text-gray-500 text-sm">Height</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-gray-800">25</div>
            <div className="text-gray-500 text-sm">BMI</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="space-y-4 mb-8">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="flex items-center p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
              <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center mr-4`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{stat.label}</h3>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button className="w-full p-4 bg-blue-gradient text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity">
          Edit Profile
        </button>
        <button className="w-full p-4 bg-gray-100 text-gray-800 rounded-2xl font-semibold hover:bg-gray-200 transition-colors">
          Settings
        </button>
        <button className="w-full p-4 bg-gray-100 text-gray-800 rounded-2xl font-semibold hover:bg-gray-200 transition-colors">
          Help & Support
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen; 