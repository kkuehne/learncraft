'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { XPBar } from '@/components/xp-bar'
import { InnerOrgansLab } from '@/components/inner-organs-lab'
import { AnatomyMaster } from '@/components/anatomy-master'
import { forelleInnerOrgans } from '@/lib/data'
import { completeLevel, getUserData, hasSeenMasterCelebration, markMasterCelebrationSeen } from '@/lib/xp'
import { speak } from '@/lib/speech'
import { Check, Heart } from 'lucide-react'

export default function InnerOrgansLevel() {
  const [completed, setCompleted] = useState(false)
  const [showMasterModal, setShowMasterModal] = useState(false)
  const [anatomyComplete, setAnatomyComplete] = useState(false)
  const [alreadyCelebrated, setAlreadyCelebrated] = useState(false)
  const level = forelleInnerOrgans

  // Check completion status on mount
  useEffect(() => {
    const userData = getUserData()
    setAnatomyComplete(userData.completedLevels.includes('anatomy'))
    setAlreadyCelebrated(hasSeenMasterCelebration())
  }, [])
  
  const handleComplete = (success: boolean) => {
    if (success && !completed) {
      completeLevel('innerorgans')
      setCompleted(true)
      
      // Check if both anatomy parts are complete
      const userData = getUserData()
      const isAnatomyDone = userData.completedLevels.includes('anatomy') || anatomyComplete
      const hasCelebrated = hasSeenMasterCelebration()
      
      if (isAnatomyDone && !hasCelebrated) {
        // Both parts done AND not yet celebrated - show master celebration!
        markMasterCelebrationSeen()
        setShowMasterModal(true)
      } else if (isAnatomyDone && hasCelebrated) {
        // Both done but already celebrated - just show completion screen
        // No modal, no audio
      } else {
        // Only inner organs done - small celebration
        speak('Fantastisch! Du kennst jetzt die inneren Organe der Forelle!')
      }
    }
  }
  
  // Completion view (when only inner organs done, or after modal closed)
  if (completed && !showMasterModal) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-900 via-pink-900 to-rose-950 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <XPBar />
          
          <div className="bg-gradient-to-r from-rose-100 to-pink-100 border-2 border-rose-500 rounded-2xl p-8 text-center mt-8">
            <div className="text-6xl mb-4">🫀</div>
            <h1 className="text-3xl font-bold text-rose-800 mb-4">Innere Organe gemeistert!</h1>
            <p className="text-rose-700 mb-6">Du hast alle Organe beschriftet!</p>
            
            <div className="bg-white rounded-lg p-4 mb-6">
              <h3 className="font-bold text-gray-800 mb-2">Gelernte Organe:</h3>
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

            {!anatomyComplete && (
              <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
                <p className="text-amber-800">
                  🎯 <strong>Noch ein Schritt:</strong> Beschrifte auch die 
                  <Link href="/quest/forelle/anatomy" className="underline hover:text-amber-900">
                    äußere Anatomie →
                  </Link>
                  <br />
                  für die komplette Meisterfeier!
                </p>
              </div>
            )}
            
            {alreadyCelebrated && (
              <div className="bg-green-50 border border-green-300 rounded-lg p-4 mb-6">
                <p className="text-green-800">
                  ✅ <strong>Bereits gemeistert!</strong> Du hast die komplette Anatomie bereits gefeiert.
                </p>
              </div>
            )}
            
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 bg-rose-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-rose-700"
            >
              <Check size={20} />
              Zurück zur Übersicht
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-900 via-pink-900 to-rose-950 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <XPBar />
        
        <div className="mb-6">
          <Link href="/" className="text-rose-200 hover:text-white text-sm underline">← Zurück</Link>
        </div>
        
        <div className="bg-gradient-to-r from-rose-100 to-pink-100 border-2 border-rose-400 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-rose-800 flex items-center gap-2">
              <Heart size={24} />
              {level.title}
            </h1>
            <span className="text-sm text-rose-700">+{level.totalXP} XP</span>
          </div>
          <p className="text-rose-700 text-sm mt-1">{level.description}</p>
          <p className="text-xs text-gray-600 mt-2">
            💡 Tipp: Klicke auf Play/Pause um die Animationen zu steuern!
          </p>
        </div>
        
        <InnerOrgansLab onComplete={handleComplete} />

        {/* Master Modal - only when both anatomy parts done AND not yet celebrated */}
        {showMasterModal && (
          <AnatomyMaster onClose={() => setShowMasterModal(false)} />
        )}
      </div>
    </div>
  )
}
