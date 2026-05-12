'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export function KirchenjahrModule({ onComplete, isCompleted }: { onComplete: () => void, isCompleted: boolean }) {
  const [step, setStep] = useState(0)
  const [answered, setAnswered] = useState<Record<string, boolean>>({})

  const content = [
    {
      id: 'advent',
      title: 'Die Erwartung: Advent & Nikolaus',
      text: 'Advent bedeutet "Ankunft". Wir warten auf die Geburt Jesu. Der Nikolaustag (6. Dez) erinnert an die Hilfsbereitschaft des Heiligen Nikolaus.',
      question: 'Was bedeutet das Wort "Advent"?',
      options: ['Ende der Zeit', 'Ankunft', 'Große Freude'],
      correct: 1
    },
    {
      id: 'weihnachten',
      title: 'Die Geburt: Weihnachten',
      text: 'Die Geburt Jesu Christi ist das zentrale Ereignis. Gott wird Mensch, um uns nahe zu sein.',
      question: 'Was feiern wir an Weihnachten?',
      options: ['Das Ende der Welt', 'Die Menschwerdung Gottes', 'Den Beginn des Alten Testaments'],
      correct: 1
    },
    {
      id: 'passion',
      title: 'Der Weg zum Kreuz: Passion',
      text: 'Palmsonntag, Gründonnerstag und Karfreitag bereiten uns auf das Opfer Jesu vor. Karfreitag ist der Tag der Kreuzigung.',
      question: 'Welcher Tag markiert das Ende der Passionswoche?',
      options: ['Palmsonntag', 'Gründonnerstag', 'Karfreitag'],
      correct: 2
    },
    {
      id: 'ostern',
      title: 'Der Sieg: Ostern',
      text: 'Ostern ist das wichtigste Fest: Die Auferstehung Jesu besiegt den Tod und schenkt uns Hoffnung auf ewiges Leben.',
      question: 'Was ist die Kernbotschaft von Ostern?',
      options: ['Das Leiden Jesu', 'Der Sieg über den Tod', 'Die Gründung der Kirche'],
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
