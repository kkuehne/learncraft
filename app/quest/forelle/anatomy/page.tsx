'use client'

import { useState } from 'react'
import Link from 'next/link'
import { XPBar } from '@/components/xp-bar'
import { AnatomyLabContainer } from '@/components/anatomy-lab-container'
import { forelleAnatomy } from '@/lib/data'
import { completeLevel } from '@/lib/xp'
import { speak, stopSpeaking } from '@/lib/speech'
import { Check, RotateCcw, ExternalLink } from 'lucide-react'

export default function AnatomyLevel() {
  const [completed, setCompleted] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const level = forelleAnatomy
  
  const handleComplete = (success: boolean) => {
    if (success && !completed) {
      completeLevel('anatomy')
      setCompleted(true)
      setShowSuccess(true)
      speak('Ausgezeichnet! Du hast die Forelle-Anatomie gemeistert!')
    }
  }

  const continueLearning = () => {
    setShowSuccess(false)
    stopSpeaking()
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-cyan-900 to-blue-950 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <XPBar />

        {/* Success Modal - erscheint über dem Lab, blockiert aber nicht */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-r from-teal-100 to-cyan-100 border-2 border-teal-500 rounded-2xl p-8 text-center max-w-md w-full shadow-2xl">
              <div className="text-6xl mb-4">🔬</div>
              <h1 className="text-3xl font-bold text-teal-800 mb-4">Anatomie gemeistert!</h1>
              <p className="text-teal-700 mb-6">Du hast alle Teile der Forelle beschriftet!</p>
              
              <div className="bg-white rounded-lg p-4 mb-6 text-left">
                <h3 className="font-bold text-gray-800 mb-2">Gelernte Teile:</h3>
                <ul className="text-gray-700 space-y-1">
                  {level.parts.map(part => (
                    <li key={part.id} className="flex items-center gap-2">
                      <Check size={16} className="text-green-500" />
                      <span>{part.correctLabel}</span>
                      <span className="text-xs text-gray-400">(+{part.xp} XP)</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={continueLearning}
                  className="flex items-center justify-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-teal-700 transition-colors"
                >
                  <RotateCcw size={20} />
                  Weiter lernen / Üben
                </button>

                <Link 
                  href="/quest/forelle/inner-organs" 
                  className="flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors"
                >
                  <ExternalLink size={20} />
                  Zu den inneren Organen →
                </Link>

                <Link 
                  href="/" 
                  className="flex items-center justify-center gap-2 bg-gray-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-600 transition-colors"
                >
                  <Check size={20} />
                  Zurück zum Lernpfad
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Lab bleibt immer sichtbar */}
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white">🔬 {level.name}</h1>
            
            <div className="flex items-center gap-3">
              {completed && (
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  ✓ Gemeistert
                </span>
              )}
              <Link 
                href="/"
                className="text-white/70 hover:text-white text-sm underline"
              >
                ← Zurück
              </Link>
            </div>
          </div>

          <AnatomyLabContainer onComplete={handleComplete} />
        </div>
      </div>
    </div>
  )
}
