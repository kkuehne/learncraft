'use client'

import { useState } from 'react'
import Link from 'next/link'
import { XPBar } from '@/components/xp-bar'
import { Quiz } from '@/components/quiz'
import { forelleQuest } from '@/lib/data'
import { completeLevel, getUserData } from '@/lib/xp'
import { speak } from '@/lib/speech'
import { Check, Lock } from 'lucide-react'

export default function SilverLevel() {
  const [currentTask, setCurrentTask] = useState(0)
  const [completed, setCompleted] = useState(false)
  const user = getUserData()
  
  const level = forelleQuest.levels.silver
  const task = level.tasks[currentTask]
  
  // Prüfe ob Bronze abgeschlossen
  const bronzeCompleted = user.completedLevels.includes('bronze')
  
  if (!bronzeCompleted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <XPBar />
        <div className="bg-gray-100 border-2 border-gray-300 rounded-xl p-8 text-center">
          <Lock className="mx-auto mb-4 text-gray-400" size={48} />
          <h1 className="text-2xl font-bold text-gray-700 mb-4">Silber-Level gesperrt</h1>
          <p className="text-gray-600 mb-6">Schließe erst das Bronze-Level ab!</p>
          
          <Link href="/quest/forelle/bronze"
            className="inline-flex items-center gap-2 bg-yellow-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-yellow-700"
          >
            Zum Bronze-Level →
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
          completeLevel('silver')
          setCompleted(true)
          speak('Herzlichen Glückwunsch! Silber-Level gemeistert!')
        }
      }, 1500)
    }
  }
  
  if (completed) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <XPBar />
        <div className="bg-gray-100 border-2 border-gray-400 rounded-xl p-8 text-center">
          <div className="text-6xl mb-4">🥈</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Silber-Level geschafft!</h1>
          <p className="text-gray-700 mb-6">Du hast {level.totalXP} XP verdient und die inneren Organe gemeistert!</p>
          
          <div className="flex gap-4 justify-center">
            <Link href="/quiz" className="inline-flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-700">
              <Check size={20} />
              Zurück
            </Link>
            <Link href="/quest/forelle/gold"
              className="inline-flex items-center gap-2 bg-yellow-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-yellow-700"
            >
              Zum Gold-Level →
            </Link>
          </div>
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
        <span className="text-sm text-yellow-600">✓ Bronze abgeschlossen</span>
      </div>
      
      <div className="bg-gradient-to-r from-gray-100 to-gray-50 border-2 border-gray-400 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">🥈 Silber: {level.title}</h1>
          <span className="text-sm text-gray-700">Frage {currentTask + 1} / {level.tasks.length}</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
          <div
            className="bg-gray-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentTask + 1) / level.tasks.length) * 100}%` }}
          />
        </div>
      </div>
      
      <Quiz task={task} onComplete={handleTaskComplete} />
    </div>
  )
}
