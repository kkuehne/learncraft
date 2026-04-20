'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { XPBar } from '@/components/xp-bar'
import { AnatomyLabContainer } from '@/components/anatomy-lab-container'
import { forelleAnatomy } from '@/lib/data'
import { completeLevel, getUserData } from '@/lib/xp'
import { Check } from 'lucide-react'

export default function AnatomyLevel() {
  const level = forelleAnatomy

  const handleComplete = () => {
    // Just save progress, no celebration yet
    completeLevel('anatomy')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-cyan-900 to-blue-950 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <XPBar />

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">🔬 {level.name}</h1>
          
          <Link 
            href="/"
            className="text-white/70 hover:text-white text-sm underline"
          >
            ← Zurück
          </Link>
        </div>

        <div className="bg-blue-800/30 rounded-xl p-4 mb-4 text-blue-100 text-sm"
003e
          <p>
            🎯 <strong>Tipp:</strong> Beschrifte alle äußeren Teile, dann geht es weiter zu den 
            <Link href="/quest/forelle/inner-organs" className="underline hover:text-white">
              inneren Organen →
            </Link>
          </p>
        </div>

        <AnatomyLabContainer onComplete={handleComplete} />
      </div>
    </div>
  )
}
