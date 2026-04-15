'use client'

import { useState } from 'react'
import Link from 'next/link'
import { resetProgress } from '@/lib/xp'
import { Trash2, AlertTriangle, Check } from 'lucide-react'

export default function ResetPage() {
  const [resetDone, setResetDone] = useState(false)
  
  const handleReset = () => {
    if (typeof window !== 'undefined') {
      resetProgress()
      setResetDone(true)
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">🗑️ Fortschritt zurücksetzen</h1>
        <p className="text-gray-600">Löscht alle XP und Level-Fortschritte</p>
      </div>
      
      {!resetDone ? (
        <div className="bg-red-50 border-2 border-red-400 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="text-red-600" size={32} />
            <h2 className="text-xl font-bold text-red-800">Achtung!</h2>
          </div>
          
          <p className="text-red-700 mb-6">
            Dies löscht unwiderruflich:
          </p>
          
          <ul className="list-disc list-inside text-red-700 mb-6 space-y-2">
            <li>Alle gesammelten XP</li>
            <li>Abgeschlossene Level (Bronze, Silber, Gold, Anatomie, Boss)</li>
            <li>Quiz-Fortschritte</li>
            <li>Beschriftete Anatomie-Teile</li>
          </ul>
          
          <div className="flex gap-4">
            <button
              onClick={handleReset}
              className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 size={20} />
              Ja, alles zurücksetzen
            </button>
            
            <Link
              href="/"
              className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-600 transition-colors text-center"
            >
              Abbrechen
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border-2 border-green-400 rounded-xl p-8 text-center">
          <Check className="mx-auto mb-4 text-green-600" size={48} />
          <h2 className="text-2xl font-bold text-green-800 mb-4">Zurückgesetzt!</h2>
          <p className="text-green-700 mb-6">
            Alle Fortschritte wurden gelöscht. Du fängst jetzt von vorne an.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700"
          >
            Zurück zur Startseite
          </Link>
        </div>
      )}
    </div>
  )
}
