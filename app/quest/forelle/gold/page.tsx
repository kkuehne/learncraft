'use client'

import { useState } from 'react'
import Link from 'next/link'
import { XPBar } from '@/components/xp-bar'
import { Quiz } from '@/components/quiz'
import { forelleQuest } from '@/lib/data'
import { completeLevel, getUserData } from '@/lib/xp'
import { speak } from '@/lib/speech'
import { Check, Lock, Crown } from 'lucide-react'

export default function GoldLevel() {
  const [currentTask, setCurrentTask] = useState(0)
  const [completed, setCompleted] = useState(false)
  const user = getUserData()
  
  const level = forelleQuest.levels.gold
  const task = level.tasks[currentTask]
  
  // Prüfe ob Silber abgeschlossen
  const silverCompleted = user.completedLevels.includes('silver')
  
  if (!silverCompleted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <XPBar />
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-8 text-center">
          <Lock className="mx-auto mb-4 text-yellow-500" size={48} />
          <h1 className="text-2xl font-bold text-yellow-800 mb-4">Gold-Level gesperrt</h1>
          <p className="text-yellow-700 mb-6">Schließe erst das Silber-Level ab!</p>
          
          <Link href="/quest/forelle/silver"
            className="inline-flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-700"
          >
            Zum Silber-Level →
          </Link>
        </div>
      </div>
    )
  }
  
  const handleTaskComplete = (success: boolean) => {
    if (success) {
      setTimeout(() => {
        if (currentTask < level.tasks.length - 1) {
          setCurrentTask(currentTask + 1)
        } else {
          completeLevel('gold')
          setCompleted(true)
          speak('Wahnsinn! Du bist ein echter Forellen-Experte! Gold-Level gemeistert!')
        }
      }, 1500)
    }
  }
  
  if (completed) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <XPBar />
        <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-400 rounded-xl p-8 text-center">
          <Crown className="mx-auto mb-4 text-yellow-500" size={64} />
          <h1 className="text-3xl font-bold text-yellow-800 mb-4">🏆 GOLD-LEVEL GESCHAFFT! 🏆</h1>
          
          <p className="text-yellow-700 mb-2">Du bist jetzt ein echter Forellen-Experte!</p>
          <p className="text-gray-700 mb-6">Insgesamt verdient: {user.xp} XP</p>
          
          <div className="bg-white rounded-lg p-4 mb-6">
            <h3 className="font-bold text-gray-800 mb-2">✅ Abgeschlossene Levels:</h3>
            <ul className="text-left text-gray-700">
              <li className="flex items-center gap-2"><span>🥉</span> Bronze - Äußere Erscheinung</li>
              <li className="flex items-center gap-2"><span>🥈</span> Silber - Innere Organe</li>
              <li className="flex items-center gap-2"><span>🥇</span> Gold - Lebensweise</li>
            </ul>
          </div>
          
          <div className="text-sm text-gray-500 mb-6">
            <p>Du bist bereit für die Klassenarbeit! 🎯</p>
            <p>11. Mai 2026</p>
          </div>
          
          <Link href="/quiz" className="inline-flex items-center gap-2 bg-yellow-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-yellow-700 text-lg">
            <Check size={24} />
            Zurück zur Übersicht
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <XPBar />
      
      <div className="mb-6 flex items-center gap-4">
        <Link href="/" className="text-blue-600 hover:underline">← Zurück</Link>
        <span className="text-sm text-gray-500">|</span>
        <span className="text-sm text-yellow-600">✓✓ Bronze & Silber abgeschlossen</span>
      </div>
      
      <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-400 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-yellow-800">🥇 Gold: {level.title}</h1>
          <span className="text-sm text-yellow-700">Frage {currentTask + 1} / {level.tasks.length}</span>
        </div>
        
        <div className="w-full bg-yellow-200 rounded-full h-2 mt-3">
          <div
            className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentTask + 1) / level.tasks.length) * 100}%` }}
          />
        </div>
      </div>
      
      <Quiz task={task} onComplete={handleTaskComplete} />
    </div>
  )
}
