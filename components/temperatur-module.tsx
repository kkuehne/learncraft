'use client'

import { useState } from 'react'
import { temperatureExperiment, physiologyQuestions } from '@/lib/physiology-lab'
import { QuizComponent } from './quiz-component'
import { XPReward } from './xp-reward'

interface TemperaturModuleProps {
  onComplete: () => void
  isCompleted: boolean
}

export function TemperaturModule({ onComplete, isCompleted }: TemperaturModuleProps) {
  const [temperature, setTemperature] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [showReward, setShowReward] = useState(false)

  const temp = temperatureExperiment.temps[temperature]
  const oxygen = temperatureExperiment.oxygenLevels[temperature]
  const metabolism = temperatureExperiment.metabolismMultiplier[temperature]

  const handleExperimentComplete = () => {
    setShowQuiz(true)
  }

  const handleQuizComplete = (passed: boolean) => {
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
        questions={physiologyQuestions.temperatur}
        moduleId="temperatur"
        onComplete={handleQuizComplete}
        xp={35}
      />
    )
  }

  const getDangerLevel = () => {
    if (temp <= 12) return { text: 'Optimal', color: 'text-green-400', bg: 'bg-green-500/20' }
    if (temp <= 16) return { text: 'Kritisch', color: 'text-yellow-400', bg: 'bg-yellow-500/20' }
    return { text: 'Gefährlich!', color: 'text-red-400', bg: 'bg-red-500/20' }
  }

  const danger = getDangerLevel()

  return (
    <div className="animate-fadeIn">
      {/* Temperature Slider */}
      <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 rounded-2xl p-6 mb-6">
        <div className="text-center mb-4">
          <span className="text-4xl">🌡️</span>
          <h3 className="text-xl font-bold text-white mt-2">Temperatur-Experiment</h3>
        </div>

        <div className="mb-6">
          <label className="block text-cyan-200 text-sm mb-2">
            Wassertemperatur: <span className="text-white font-bold text-lg">{temp}°C</span>
          </label>
          <input
            type="range"
            min="0"
            max="5"
            value={temperature}
            onChange={(e) => setTemperature(parseInt(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <div className="flex justify-between text-xs text-cyan-300 mt-1">
            <span>4°C</span>
            <span>24°C</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">💨</div>
            <div className="text-2xl font-bold text-cyan-300">{oxygen.toFixed(1)}</div>
            <div className="text-sm text-cyan-200">Sauerstoff (mg/L)</div>
          </div>
          
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-2xl font-bold text-orange-300">{metabolism}x</div>
            <div className="text-sm text-cyan-200">Stoffwechsel</div>
          </div>
        </div>

        {/* Danger Level */}
        <div className={`mt-6 text-center py-3 rounded-xl ${danger.bg}`}>
          <span className={`font-bold text-lg ${danger.color}`}>
            Status: {danger.text}
          </span>
        </div>

        {temp >= 20 && (
          <div className="mt-4 bg-red-500/20 rounded-lg p-3 text-center">
            <span className="text-red-300 text-sm">⚠️ Ab 20°C wird es kritisch! Die Forelle braucht mehr Sauerstoff, aber das Wasser bietet weniger.</span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handleExperimentComplete}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg"
        >
          Zum Quiz 🧠
        </button>
      </div>

      {showReward && (
        <XPReward amount={35} show={true} message="Temperatur-Experiment abgeschlossen!" />
      )}
    </div>
  )
}
