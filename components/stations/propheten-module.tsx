'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export function ProphetenModule({ onComplete, isCompleted }: { onComplete: () => void, isCompleted: boolean }) {
  const [step, setStep] = useState(0)
  const [answered, setAnswered] = useState<Record<string, boolean>>({})

  const content = [
    {
      id: 'propheten-rolle',
      title: 'Die Stimme Gottes',
      text: 'Propheten waren keine Wahrsager, sondern Boten Gottes. Sie riefen das Volk zur Umkehr und zur Treue gegenüber dem Bund auf.',
      question: 'Was ist die Hauptaufgabe eines Propheten?',
      options: ['Die Zukunft exakt vorhersagen', 'Die Botschaft Gottes an das Volk weitergeben', 'Politische Macht erlangen'],
      correct: 1
    },
    {
      id: 'botschaft',
      title: 'Gerechtigkeit und Hoffnung',
      text: 'Die Propheten kritisierten soziale Ungerechtigkeit und versprachen gleichzeitig Hoffnung auf eine neue Zeit, wenn das Volk zurück zu Gott kehrt.',
      question: 'Was kritisierten die Propheten vor allem?',
      options: ['Das Wetter', 'Soziale Ungerechtigkeit', 'Die Architektur'],
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
