'use client'

import { useState } from 'react'
import { SchopfungQuiz } from '@/components/schopfung-quiz'
import { XPReward } from '@/components/xp-reward'

interface SchopfungModuleProps {
  onComplete: () => void
  isCompleted: boolean
}

const creationDays = [
  { day: 1, title: 'Licht und Finsternis', emoji: '☀️', description: 'Gott sprach: "Es werde Licht!" Und es ward Licht.' },
  { day: 2, title: 'Das Himmelsgewölbe', emoji: '☁️', description: 'Gott schied das Wasser und schuf den Himmel.' },
  { day: 3, title: 'Land und Pflanzen', emoji: '🌱', description: 'Trockenes Land erschien und das Grün begann zu wachsen.' },
  { day: 4, title: 'Sonne, Mond und Sterne', emoji: '🌙', description: 'Lichter am Himmel wurden gesetzt, um Tag und Nacht zu unterscheiden.' },
  { day: 5, title: 'Tiere im Wasser und in der Luft', emoji: '🐟', description: 'Fische schwammen und Vögel flogen - das Leben erfüllte die Welt.' },
  { day: 6, title: 'Landtiere und Menschen', emoji: '🦁', description: 'Tiere auf dem Land und zum Schluss: Der Mensch, geschaffen nach Gottes Bild.' },
  { day: 7, title: 'Der Ruhetag', emoji: '⛅', description: 'Gott ruhte und segnete den siebten Tag - der Sabbat war geboren.' }
]

export function SchopfungModule({ onComplete, isCompleted }: SchopfungModuleProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [showReward, setShowReward] = useState(false)

  const step = creationDays[currentStep]

  const handleNext = () => {
    if (currentStep < creationDays.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowQuiz(true)
    }
  }

  const handleQuizComplete = (passed: boolean) => {
    if (passed) {
      setShowReward(true)
      onComplete()
    } else {
      setShowQuiz(false)
      setCurrentStep(0)
    }
  }

  if (showQuiz) {
    return <SchopfungQuiz onComplete={handleQuizComplete} />
  }

  return (
    <div className="animate-fadeIn">
      {/* Day Progress */}
      <div className="flex justify-center gap-2 mb-6">
        {creationDays.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 rounded-full transition-all ${
              idx <= currentStep ? 'w-8 bg-amber-400' : 'w-4 bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Animation Area */}
      <div className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 rounded-2xl p-8 mb-6 text-center">
        <div className="text-8xl mb-4 animate-bounce">{step.emoji}</div>
        
        <div className="inline-block bg-amber-500/20 rounded-full px-4 py-2 mb-4">
          <span className="text-amber-300 font-bold">Tag {step.day}</span>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
        <p className="text-amber-200 text-lg max-w-lg mx-auto leading-relaxed">{step.description}</p>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handleNext}
          className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
        >
          {currentStep < creationDays.length - 1 ? 'Nächster Tag →' : 'Zum Quiz 🧠'}
        </button>
      </div>

      {showReward && (
        <XPReward amount={40} show={true} message="Schöpfung durchdrungen!" />
      )}
    </div>
  )
}
