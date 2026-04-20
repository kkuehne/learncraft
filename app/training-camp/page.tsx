'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { XPBar } from '@/components/xp-bar'
import { getTotalXP } from '@/lib/xp'
import { Construction } from 'lucide-react'

export default function TrainingCampPage() {
  const [userXP, setUserXP] = useState(0)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setUserXP(getTotalXP())
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-900 via-emerald-900 to-green-950">
        <div className="container mx-auto px-4 py-8">
          <XPBar />
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">🏕️ Training Camp</h1>
            <p className="text-green-200">Lerne die Grundlagen</p>
          </div>
          <div className="animate-pulse bg-white/10 rounded-xl h-96 max-w-2xl mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 via-emerald-900 to-green-950">
      <div className="container mx-auto px-4 py-8">
        <XPBar />
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            🏕️ Training Camp
          </h1>
          <p className="text-green-200 text-lg">
            Lerne die Grundlagen der Forellen-Anatomie
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
            <span className="text-2xl">⭐</span>
            <span className="text-white font-bold">{userXP} XP</span>
          </div>
        </div>

        {/* Platzhalter Content */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 text-center">
            <Construction className="w-24 h-24 text-green-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">
              In Entwicklung
            </h2>
            <p className="text-green-200 mb-8">
              Das Training Camp wird bald mit interaktiven Lektionen gefüllt!
            </p>
            <p className="text-green-300 text-sm">
              Nutze in der Zwischenzeit das <strong>Anatomie Lab</strong> und das <strong>Quiz</strong>,
              <br />
              um dein Wissen zu testen und XP zu sammeln!
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex justify-center gap-4">
          <Link href="/">
            <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl transition-colors">
              ← Zurück zum Lernpfad
            </button>
          </Link>
          
          <Link href="/quest/forelle/anatomy">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl transition-colors">
              Zum Anatomie Lab →
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
