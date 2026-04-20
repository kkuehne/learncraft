'use client'

import { useState } from 'react'
import { AnatomyLab } from './anatomy-lab'
import { InnerOrgansLab } from './inner-organs-lab'
import { Microscope, Heart, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

interface AnatomyLabContainerProps {
  onComplete?: (success: boolean) => void
}

export function AnatomyLabContainer({ onComplete }: AnatomyLabContainerProps) {
  const [activeTab, setActiveTab] = useState<'outer' | 'inner'>('outer')

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-cyan-900 to-blue-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <button className="flex items-center gap-2 text-cyan-200 hover:text-white transition-colors">
              <ChevronLeft size={24} />
              <span>Zurück zum Lernpfad</span>
            </button>
          </Link>
          
          <h1 className="text-3xl font-bold text-white">🔬 Anatomie Lab</h1>
          
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 flex gap-2">
            <button
              onClick={() => setActiveTab('outer')}
              className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition-all ${
                activeTab === 'outer'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105'
                  : 'text-cyan-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Microscope size={24} />
              <div className="text-left">
                <div className="text-lg">Äußere Anatomie</div>
                <div className="text-xs opacity-80">Flossen & Körperbau</div>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('inner')}
              className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition-all ${
                activeTab === 'inner'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg scale-105'
                  : 'text-cyan-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Heart size={24} />
              <div className="text-left">
                <div className="text-lg">Innere Organe</div>
                <div className="text-xs opacity-80">Herz, Schwimmblase & Co.</div>
              </div>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6">
          {activeTab === 'outer' ? (
            <div className="animate-fadeIn">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">🐟 Äußere Anatomie</h2>
                <p className="text-cyan-200">
                  Beschrifte die Flossen und Körperteile der Forelle. Klicke auf die roten Punkte!
                </p>
              </div>
              <AnatomyLab onComplete={onComplete || (() => {})} />
            </div>
          ) : (
            <div className="animate-fadeIn">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">🫀 Innere Organe</h2>
                <p className="text-cyan-200">
                  Erkunde die inneren Organe mit Herzschlag- und Atmungsanimation!
                </p>
              </div>
              <InnerOrgansLab onComplete={onComplete || (() => {})} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
