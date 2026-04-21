'use client'

import { useState } from 'react'
import { gegenstromSteps, physiologyQuestions } from '@/lib/physiology-lab'
import { QuizComponent } from './quiz-component'
import { XPReward } from './xp-reward'

interface GegenstromModuleProps {
  onComplete: () => void
  isCompleted: boolean
}

export function GegenstromModule({ onComplete, isCompleted }: GegenstromModuleProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [showReward, setShowReward] = useState(false)
  const [quizPassed, setQuizPassed] = useState(false)

  const step = gegenstromSteps[currentStep]

  const handleNext = () => {
    if (currentStep < gegenstromSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowQuiz(true)
    }
  }

  const handleQuizComplete = (passed: boolean) => {
    setQuizPassed(passed)
    if (passed) {
      setShowReward(true)
      setTimeout(() => {
        onComplete()
        setShowReward(false)
      }, 2000)
    }
  }

  if (showQuiz) {
    return (
      <QuizComponent
        questions={physiologyQuestions.gegenstrom}
        moduleId="gegenstrom"
        onComplete={handleQuizComplete}
        xp={40}
      />
    )
  }

  return (
    <div className="animate-fadeIn">
      {/* Step Progress */}
      <div className="flex justify-center gap-2 mb-6">
        {gegenstromSteps.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 rounded-full transition-all ${
              idx <= currentStep ? 'w-8 bg-cyan-400' : 'w-4 bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Animation Area */}
      <div className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 rounded-2xl p-6 mb-6 min-h-[300px] flex flex-col items-center justify-center">
        <div className="text-6xl mb-4">
          {currentStep === 0 && '🌊'}
          {currentStep === 1 && '🔄'}
          {currentStep === 2 && '✨'}
          {currentStep === 3 && '🎯'}
        </div>
        
        {/* Blood vs Water Animation */}
        <div className="w-full max-w-md mb-6">
          <div className="relative h-40 bg-blue-900/50 rounded-xl overflow-hidden">
            {/* Blood flow */}
            <div 
              className="absolute top-0 left-0 h-full transition-all duration-1000 ease-in-out"
              style={{ width: `${step.bloodO2}%`, backgroundColor: '#ef4444' }}
            >
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs font-bold">
                Blut {step.bloodO2}%
              </span>
            </div>
            {/* Water flow */}
            <div 
              className="absolute top-0 right-0 h-full transition-all duration-1000 ease-in-out"
              style={{ width: `${step.waterO2}%`, backgroundColor: '#06b6d4' }}
            >
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-xs font-bold">
                Wasser {step.waterO2}%
              </span>
            </div>
          </div>
          
          {/* Efficiency Badge */}
          <div className="text-center mt-4">
            <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold">
              Wirkungsgrad: {step.efficiency}%
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
        <p className="text-cyan-200 text-center max-w-lg">{step.description}</p>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handleNext}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-xl font-bold hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg"
        >
          {currentStep < gegenstromSteps.length - 1 ? 'Nächster Schritt →' : 'Zum Quiz 🧠'}
        </button>
      </div>

      {/* XP Reward Animation */}
      {showReward && (
        <XPReward amount={40} show={true} message="Gegenstromprinzip gemeistert!" />
      )}
    </div>
  )
}
