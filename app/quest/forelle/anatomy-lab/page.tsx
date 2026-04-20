'use client'

import { AnatomyLabContainer } from '@/components/anatomy-lab-container'
import { XPBar } from '@/components/xp-bar'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function AnatomyLabPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-cyan-900 to-blue-950">
      <div className="container mx-auto px-4 py-8">
        <XPBar />
        
        <Link href="/">
          <button className="flex items-center gap-2 text-cyan-200 hover:text-white transition-colors mb-8">
            <ChevronLeft className="w-5 h-5" />
            Zurück zum Lernpfad
          </button>
        </Link>

        <div className="mb-6 bg-blue-800/30 rounded-xl p-4">
          <h1 className="text-2xl font-bold text-white mb-2">🔬 Anatomie Lab</h1>
          <p className="text-cyan-200 text-sm">
            Beschrifte sowohl die äußere Form als auch die inneren Organe.
            <strong className="text-yellow-300"> Erst wenn beide Teile fertig sind, gibt es die große Meister-Feier!</strong>
          </p>
        </div>

        <AnatomyLabContainer />
      </div>
    </div>
  )
}
