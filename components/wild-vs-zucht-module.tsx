'use client'

import { useState } from 'react'
import { physiologyQuestions } from '@/lib/physiology-lab'
import { QuizComponent } from './quiz-component'
import { XPReward } from './xp-reward'
import { Fish, AlertTriangle, Shield } from 'lucide-react'

interface WildVsZuchtModuleProps {
  onComplete: () => void
  isCompleted: boolean
}

export function WildVsZuchtModule({ onComplete, isCompleted }: WildVsZuchtModuleProps) {
  const [showQuiz, setShowQuiz] = useState(false)
  const [showReward, setShowReward] = useState(false)

  const handleLearnComplete = () => {
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
        questions={physiologyQuestions['wild-vs-zucht']}
        moduleId="wild-vs-zucht"
        onComplete={handleQuizComplete}
        xp={40}
      />
    )
  }

  return (
    <div className="animate-fadeIn">
      {/* Comparison Cards */}
      <div className="bg-gradient-to-br from-emerald-900/50 to-teal-900/50 rounded-2xl p-6 mb-6">
        <div className="text-center mb-6">
          <span className="text-4xl">🆚</span>
          <h3 className="text-xl font-bold text-white mt-2">Wild vs. Zuchtforelle</h3>
          <p className="text-cyan-300 text-sm mt-1">Warum der Unterschied so wichtig ist</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Wild */}
          <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-xl p-5 border-2 border-emerald-500/30">
            <div className="flex items-center gap-2 mb-4">
              <Fish className="w-6 h-6 text-emerald-400" />
              <h4 className="font-bold text-emerald-300">🌿 Wildforelle</h4>
            </div>
            
            <ul className="space-y-2 text-sm">
              <li className="text-emerald-200 flex items-start gap-2">
                <span>✓</span>
                Kompakte Schwimmblase
              </li>
              <li className="text-emerald-200 flex items-start gap-2">
                <span>✓</span>
                Hochtrainiert gegen Strömung
              </li>
              <li className="text-emerald-200 flex items-start gap-2">
                <span>✓</span>
                Fluchtinstinkt stark
              </li>
              <li className="text-emerald-200 flex items-start gap-2">
                <span>✓</span>
                Perfekt an Wildbäche angepasst
              </li>
              <li className="text-emerald-200 flex items-start gap-2">
                <span>✓</span>
                Genetisch robust
              </li>
            </ul>
          </div>

          {/* Zucht */}
          <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl p-5 border-2 border-blue-500/30">
            <div className="flex items-center gap-2 mb-4">
              <Fish className="w-6 h-6 text-blue-400" />
              <h4 className="font-bold text-blue-300">🏭 Zuchtforelle</h4>
            </div>
            
            <ul className="space-y-2 text-sm">
              <li className="text-blue-200 flex items-start gap-2">
                <span>•</span>
                Größere Schwimmblase
              </li>
              <li className="text-blue-200 flex items-start gap-2">
                <span>•</span>
                Wenig Strömungserfahrung
              </li>
              <li className="text-blue-200 flex items-start gap-2">
                <span>•</span>
                Schwächerer Fluchtinstinkt
              </li>
              <li className="text-blue-200 flex items-start gap-2">
                <span>•</span>
                An Aquakultur angepasst
              </li>
              <li className="text-blue-200 flex items-start gap-2">
                <span>•</span>
                Domestiziert wie Haustiere
              </li>
            </ul>
          </div>
        </div>

        {/* Warning */}
        <div className="mt-6 bg-red-500/20 rounded-xl p-4 border border-red-500/30">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-red-300 mb-1">⚠️ Gefahr: Genetische Vermischung</h4>
              <p className="text-red-200 text-sm">
                Wenn Zuchtforellen entkommen und sich mit Wildforellen vermehren, 
                verlieren die Nachkommen die Anpassung an Wildbäche. Das schwächt 
                die Wildpopulation langfristig.
              </p>
            </div>
          </div>
        </div>

        {/* Physostome Info */}
        <div className="mt-4 bg-amber-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-amber-400" />
            <h4 className="font-bold text-amber-300">🎯 Fachbegriff: Physostom</h4>
          </div>
          <p className="text-amber-200 text-sm">
            Forellen sind <strong>Physostome</strong> – sie haben einen Schlauch 
            (<em>Pneumatischer Ductus</em>) zur Schwimmblase. Damit können sie 
            Luft schlucken oder ablassen, um ihre Tiefe zu regulieren. Genial!
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handleLearnComplete}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-xl font-bold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg"
        >
          Zum Quiz 🧠
        </button>
      </div>

      {showReward && (
        <XPReward amount={40} reason="Wild-vs-Zucht-Experte!" />
      )}
    </div>
  )
}
