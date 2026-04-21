'use client'

import { TheologyLabContainer } from '@/components/theology-lab-container'
import { XPBar } from '@/components/xp-bar'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function TheologyLabPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 via-orange-900 to-amber-950">
      <div className="container mx-auto px-4 py-8">
        <XPBar />
        
        <Link href="/biomes/religion">
          <button className="flex items-center gap-2 text-amber-200 hover:text-white transition-colors mb-8">
            <ChevronLeft className="w-5 h-5" />
            Zurück zum Religions-Lernpfad
          </button>
        </Link>

        <div className="mb-6 bg-amber-800/30 rounded-xl p-4">
          <h1 className="text-2xl font-bold text-white mb-2">🧪 Theologie Lab</h1>
          <p className="text-amber-200 text-sm">
            Entdecke die tiefen Zusammenhänge des Alten Testaments durch interaktive Module.
            <strong className="text-yellow-300"> Erkunde alle 4 Module, um zum Theologen-Meister zu werden!</strong>
          </p>
        </div>

        <TheologyLabContainer />
      </div>
    </div>
  )
}
