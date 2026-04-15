'use client'

import { useState } from 'react'
import Link from 'next/link'
import { XPBar } from '@/components/xp-bar'
import { AnatomyLab } from '@/components/anatomy-lab'
import { forelleAnatomy, professorEich } from '@/lib/data'
import { completeLevel, getUserData } from '@/lib/xp'
import { speak } from '@/lib/speech'
import { Check, Crown, Sparkles } from 'lucide-react'

export default function AnatomyLevel() {
  const [completed, setCompleted] = useState(false)
  const user = getUserData()
  
  const level = forelleAnatomy
  
  const handleComplete = (success: boolean) => {
    if (success) {
      completeLevel('anatomy')
      setCompleted(true)
      speak('Ausgezeichnet! Du hast die Forelle-Anatomie gemeistert!')
    }
  }
  
  if (completed) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <XPBar />
        <div className="bg-gradient-to-r from-teal-100 to-cyan-100 border-2 border-teal-500 rounded-xl p-8 text-center">
          <div className="text-6xl mb-4">🔬</div>
          <h1 className="text-3xl font-bold text-teal-800 mb-4">Anatomie gemeistert!</h1>
          <p className="text-teal-700 mb-6">Du hast alle Teile der Forelle beschriftet!</p>
          
          <div className="bg-white rounded-lg p-4 mb-6">
            <h3 className="font-bold text-gray-800 mb-2">Gelernte Teile:</h3>
            <ul className="text-left text-gray-700 space-y-1">
              {level.parts.map(part => (
                <li key={part.id} className="flex items-center gap-2">
                  <Check size={16} className="text-green-500" />
                  <span>{part.correctLabel}</span>
                  <span className="text-xs text-gray-400">(+{part.xp} XP)</span>
                </li>
              ))}
            </ul>
          </div>
          
          <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-teal-700">
            <Check size={20} />
            Zurück zur Übersicht
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <XPBar />
      
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:underline">← Zurück</Link>
      </div>
      
      <div className="bg-gradient-to-r from-teal-100 to-cyan-100 border-2 border-teal-400 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-teal-800">🔬 {level.title}</h1>
          <span className="text-sm text-teal-700">+{level.totalXP} XP</span>
        </div>
        <p className="text-teal-700 text-sm mt-1">{level.description}</p>
      </div>
      
      <AnatomyLab onComplete={handleComplete} />
    </div>
  )
}
