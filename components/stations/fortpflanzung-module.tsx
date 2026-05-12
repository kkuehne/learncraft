'use client'

import { useState } from 'react'
import { physiologyQuestions } from '@/lib/physiology-lab'
import { QuizComponent } from './quiz-component'
import { XPReward } from './xp-reward'
import { Fish, Egg, Baby, Heart } from 'lucide-react'

interface FortpflanzungModuleProps {
  onComplete: () => void
  isCompleted: boolean
}

export function FortpflanzungModule({ onComplete, isCompleted }: FortpflanzungModuleProps) {
  const [showQuiz, setShowQuiz] = useState(false)
  const [showReward, setShowReward] = useState(false)

  const handleLearnComplete = () => {
    setShowQuiz(true)
  }

  const handleQuizComplete = (passed: boolean) => {
    if (passed) {
      setShowReward(true)
      onComplete()
    } else {
      // Quiz nicht bestanden - zurück zur Timeline
      setShowQuiz(false)
    }
  }

  if (showQuiz) {
    return (
      <QuizComponent
        questions={physiologyQuestions.fortpflanzung}
        moduleId="fortpflanzung"
        onComplete={handleQuizComplete}
        xp={35}
      />
    )
  }

  const timeline = [
    { 
      month: 'Nov-Feb', 
      icon: <Heart className="w-6 h-6" />, 
      title: 'Laichzeit', 
      desc: 'Die Weibchen graben Laichgruben in den Kies',
      color: 'from-pink-500 to-rose-500'
    },
    { 
      month: '3-4 Monate', 
      icon: <Egg className="w-6 h-6" />, 
      title: 'Eientwicklung', 
      desc: 'Bei 4-10°C brauchen die Eier Zeit zum Reifen',
      color: 'from-amber-500 to-orange-500'
    },
    { 
      month: 'März-April', 
      icon: <Baby className="w-6 h-6" />, 
      title: 'Schlüpfen', 
      desc: 'Perfekter Timing: Frühlings-Nahrungsexplosion!',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      month: 'Nach 3-5 Jahren', 
      icon: <Fish className="w-6 h-6" />, 
      title: 'Geschlechtsreif', 
      desc: 'Dann beginnt der Kreislauf von vorne',
      color: 'from-blue-500 to-cyan-500'
    },
  ]

  return (
    <div className="animate-fadeIn">
      {/* Timeline */}
      <div className="bg-gradient-to-br from-pink-900/50 to-purple-900/50 rounded-2xl p-6 mb-6">
        <div className="text-center mb-6">
          <span className="text-4xl">💕</span>
          <h3 className="text-xl font-bold text-white mt-2">Von der Paarung bis zum Schlüpfen</h3>
        </div>

        <div className="space-y-4">
          {timeline.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
              <div className={`bg-gradient-to-br ${item.color} p-3 rounded-full text-white`}>
                {item.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">{item.title}</span>
                  <span className="text-sm text-cyan-300">{item.month}</span>
                </div>
                <p className="text-sm text-cyan-200 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Fun Facts */}
        <div className="mt-6 bg-white/10 rounded-xl p-4">
          <h4 className="font-bold text-yellow-300 mb-3">🎯 Wichtige Fakten</h4>
          <ul className="space-y-2 text-cyan-200 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              Kies = Schutz + Sauerstoffzufuhr
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              3-4 Monate Entwicklung bei Kälte
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              Perfektes Timing zur Nahrungsquellen-Explosion
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              Weibchen können hunderte bis tausende Eier legen
            </li>
          </ul>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handleLearnComplete}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-xl font-bold hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg"
        >
          Zum Quiz 🧠
        </button>
      </div>

      {showReward && (
        <XPReward amount={35} show={true} message="Fortpflanzung gemeistert!" />
      )}
    </div>
  )
}
