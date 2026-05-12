'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export function SchöpfungModule({ onComplete, isCompleted }: { onComplete: () => void, isCompleted: boolean }) {
  const [step, setStep] = useState(0)
  const [answered, setAnswered] = useState<Record<string, boolean>>({})

  const content = [
    {
      id: 'psalm104',
      title: 'Der Lobpreis der Schöpfung',
      text: 'Psalm 104 ist ein wunderschönes Lied, das die Natur und die Geschöpfe Gottes preist. Es beschreibt die Welt als geordnet und voller Leben.',
      question: 'Was steht im Zentrum von Psalm 104?',
      options: ['Das Gericht Gottes', 'Die Herrlichkeit der Schöpfung', 'Die Gesetze Mosais'],
      correct: 1
    },
    {
      id: 'marduk',
      title: 'Babylon vs. Israel',
      text: 'Im babylonischen Schöpfungsmythos kämpft Marduk gegen das Chaos und erschafft die Welt aus den Überresten eines besiegten Gegners. Der Gott Israels hingegen erschafft die Welt einfach durch sein Wort – ohne Kampf, in Liebe und Ordnung.',
      question: 'Was ist der Hauptunterschied zwischen Marduk und dem Gott Israels?',
      options: ['Marduk ist gütiger', 'Der Gott Israels erschafft durch Kampf', 'Der Gott Israels erschafft friedlich durch sein Wort'],
      correct: 2
    },
    {
      id: 'untertan',
      title: 'Die Bedeutung von "Untertan machen"',
      text: 'Die Aussage "Macht euch die Erde untertan" wird oft missverstanden. Es bedeutet nicht Ausbeutung, sondern eine verantwortungsvolle Verwaltung (Stewardship). Der Mensch soll die Welt pflegen und bewahren.',
      question: 'Was bedeutet "Macht euch die Erde untertan" im eigentlichen Sinne?',
      options: ['Die Natur zerstören', 'Die Erde als Herrscher ausbeuten', 'Die Welt verantwortungsbewusst bewahren und pflegen'],
      correct: 2
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
