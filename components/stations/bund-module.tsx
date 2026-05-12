'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export function BundModule({ onComplete, isCompleted }: { onComplete: () => void, isCompleted: boolean }) {
  const [step, setStep] = useState(0)
  const [answered, setAnswered] = useState<Record<string, boolean>>({})

  const content = [
    {
      id: 'bund-def',
      title: 'Was ist ein Bund?',
      text: 'Ein Bund ist mehr als ein Vertrag. Es ist ein heiliges Versprechen zwischen Gott und Menschen, das auf Treue und gegenseitiger Verantwortung basiert.',
      question: 'Wie unterscheidet sich ein Bund von einem normalen Vertrag?',
      options: ['Es gibt keine Regeln', 'Es ist eine heilige Bindung der Treue', 'Verträge sind wichtiger'],
      correct: 1
    },
    {
      id: 'abraham',
      title: 'Der Bund mit Abraham',
      text: 'Gott verspricht Abraham eine große Nachkommenschaft und ein eigenes Land. Im Gegenzug soll Abraham Gott vertrauen und ihm folgen.',
      question: 'Was versprach Gott Abraham?',
      options: ['Unendlich Gold', 'Ein Land und viele Nachkommen', 'Die Herrschaft über Ägypten'],
      correct: 1
    }
  ]

  const handleAnswer = (index: number, id: string) => {
    if (answered[id]) return
    setAnswered(prev => ({ ...prev, [id]: true }))
    if (index === content[step].correct) {
      if (step === content.length - 1) {
        onComplete()
      } else {
        setTimeout(() => setStep(prev => prev + 1), 1500)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-amber-100 p-6 rounded-2xl border-2 border-amber-300">
        <h3 className="text-xl font-bold text-amber-900 mb-4">{content[step].title}</h3>
        <p className="text-amber-800 mb-6 leading-relaxed">{content[step].text}</p>
        <div className="space-y-3">
          {content[step].options.map((opt, i) => (
            <button 
              key={i} 
              onClick={() => handleAnswer(i, content[step].id)}
              disabled={answered[content[step].id]}
              className={`w-full p-3 rounded-lg text-left transition-all ${
                answered[content[step].id] 
                  ? i === content[step].correct ? 'bg-green-200 border-green-500 border-2' : 'bg-gray-100' 
                  : 'bg-white border-2 border-amber-200 hover:bg-amber-50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
