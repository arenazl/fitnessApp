import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import ProgressScreen from './components/ProgressScreen';
import WorkoutScreen from './components/WorkoutScreen';
import ProfileScreen from './components/ProfileScreen';
import BottomNavigation from './components/BottomNavigation';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [navigationHistory, setNavigationHistory] = useState(['home']);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
    const screenProps = {
      onNavigate: navigateToScreen,
      onGoBack: goBack,
      canGoBack: navigationHistory.length > 1
    };

    switch (currentScreen) {
      case 'home':
        return <HomeScreen {...screenProps} />;
      case 'progress':
        return <ProgressScreen {...screenProps} />;
      case 'workout':
        return <WorkoutScreen {...screenProps} />;
      case 'profile':
        return <ProfileScreen {...screenProps} />;
      default:
        return <HomeScreen {...screenProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Mobile Container */}
      <div className="max-w-sm mx-auto bg-white min-h-screen relative overflow-hidden">
        {/* Main Content with Animation */}
        <div className={`pb-20 transition-all duration-300 ease-in-out ${
          isTransitioning ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'
        }`}>
          {renderScreen()}
        </div>
        
        {/* Bottom Navigation */}
        <BottomNavigation 
          currentScreen={currentScreen} 
          setCurrentScreen={navigateToScreen} 
        />
      </div>
    </div>
  );
}

export default App; 