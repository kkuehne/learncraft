'use client'

import { useState } from 'react'
import Link from 'next/link'
import { XPBar } from '@/components/xp-bar'
import { AnatomyLabContainer } from '@/components/anatomy-lab-container'
import { forelleAnatomy } from '@/lib/data'
import { completeLevel } from '@/lib/xp'
import { speak } from '@/lib/speech'
import { Check } from 'lucide-react'

export default function AnatomyLevel() {
  const [completed, setCompleted] = useState(false)
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
      <div className="min-h-screen bg-gradient-to-b from-blue-900 via-cyan-900 to-blue-950 p-8">
        <div className="max-w-2xl mx-auto">
          <XPBar />
          <div className="bg-gradient-to-r from-teal-100 to-cyan-100 border-2 border-teal-500 rounded-xl p-8 text-center mt-8">
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
              Zurück zum Lernpfad
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  return <AnatomyLabContainer onComplete={handleComplete} />
}
