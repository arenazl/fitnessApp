import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, Check } from 'lucide-react';

const WorkoutScreen = ({ onGoBack, canGoBack, onNavigate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(745); // 12:25 in seconds
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [currentExercise, setCurrentExercise] = useState(0);
  
  const exercises = [
    { name: 'Overhead Press', reps: 'x15 Reps', icon: '🏋️', duration: 60 },
    { name: 'Dumbbell Lunges', reps: 'x15 Reps', icon: '🏋️', duration: 90 },
    { name: 'Incline Bench Press', reps: 'x15 Reps', icon: '🏋️', duration: 75 },
    { name: 'Leg Balance Lunges', reps: 'x15 Reps', icon: '⚖️', duration: 80 }
  ];

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    } else if (!isPlaying && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, time]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsPlaying(!isPlaying);
  };

  const resetTimer = () => {
    setIsPlaying(false);
    setTime(0);
    setCompletedExercises(new Set());
    setCurrentExercise(0);
  };

  const toggleExercise = (index) => {
    const newCompleted = new Set(completedExercises);
    if (completedExercises.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedExercises(newCompleted);
    
    // Auto advance to next exercise
    if (!completedExercises.has(index) && index === currentExercise) {
      setCurrentExercise((prev) => Math.min(prev + 1, exercises.length - 1));
    }
  };

  const completionPercentage = (completedExercises.size / exercises.length) * 100;

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
        <h1 className="text-xl font-bold text-gray-800">Full Body Workout</h1>
        <button 
          onClick={resetTimer}
          className="w-6 h-6 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>

      {/* Timer Section */}
      <div className="text-center mb-8">
        <p className="text-gray-500 text-sm mb-2">Duration</p>
        <h2 className="text-4xl font-bold text-gray-800 mb-4 font-mono">{formatTime(time)}</h2>
        
        {/* Progress Ring */}
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#E5E7EB"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#4A90E2"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${completionPercentage * 2.83} 283`}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-blue-500 text-lg font-bold">{Math.round(completionPercentage)}%</span>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm mb-8">30 Min • {exercises.length} Workouts</p>
        
        {/* Control Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button 
            onClick={toggleTimer}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105 ${
              isPlaying 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-orange-500 hover:bg-orange-600'
            }`}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white" />
            ) : (
              <Play className="w-8 h-8 text-white ml-1" />
            )}
          </button>
        </div>
      </div>

      {/* Exercise List */}
      <div className="space-y-4 mb-8">
        {exercises.map((exercise, index) => {
          const isCompleted = completedExercises.has(index);
          const isCurrent = index === currentExercise && !isCompleted;
          
          return (
            <div 
              key={index} 
              className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                isCompleted 
                  ? 'bg-green-50 border-2 border-green-200' 
                  : isCurrent 
                    ? 'bg-blue-50 border-2 border-blue-200 shadow-md' 
                    : 'bg-gray-50 hover:bg-gray-100'
              } ${isCurrent ? 'animate-pulse' : ''}`}
            >
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-all duration-200 ${
                  isCompleted 
                    ? 'bg-green-500' 
                    : isCurrent 
                      ? 'bg-blue-500' 
                      : 'bg-orange-100'
                }`}>
                  {isCompleted ? (
                    <Check className="w-6 h-6 text-white" />
                  ) : (
                    <span className={`text-xl ${isCurrent ? 'text-white' : ''}`}>{exercise.icon}</span>
                  )}
                </div>
                <div>
                  <h3 className={`font-semibold transition-colors ${
                    isCompleted ? 'text-green-800 line-through' : 'text-gray-800'
                  }`}>
                    {exercise.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{exercise.reps}</p>
                </div>
              </div>
              <button
                onClick={() => toggleExercise(index)}
                className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                  isCompleted 
                    ? 'bg-green-500 border-green-500' 
                    : 'border-gray-300 hover:border-blue-500'
                }`}
              >
                {isCompleted && <Check className="w-4 h-4 text-white mx-auto" />}
              </button>
            </div>
          );
        })}
      </div>

      {/* Workout Summary */}
      <div className="bg-gray-50 rounded-2xl p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600 text-sm">Progress</span>
          <span className="text-gray-800 font-medium">{completedExercises.size}/{exercises.length} completed</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
            style={{width: `${completionPercentage}%`}}
          ></div>
        </div>
        
        {completedExercises.size === exercises.length && (
          <div className="text-center">
            <div className="text-green-600 font-bold mb-2">🎉 Workout Complete!</div>
            <button 
              onClick={() => onNavigate('progress')}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              View Progress
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutScreen; 