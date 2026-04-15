'use client'

import { useState } from 'react'
import Link from 'next/link'
import { XPBar } from '@/components/xp-bar'
import { Quiz } from '@/components/quiz'
import { forelleQuest } from '@/lib/data'
import { completeLevel, getUserData } from '@/lib/xp'
import { speak } from '@/lib/speech'
import { Check, Lock, Crown, Sparkles } from 'lucide-react'

export default function BossLevel() {
  const [currentTask, setCurrentTask] = useState(0)
  const [completed, setCompleted] = useState(false)
  const user = getUserData()
  
  const level = forelleQuest.levels.boss
  const task = level.tasks[currentTask]
  
  // Prüfe ob alle vorherigen Levels abgeschlossen
  const bronzeCompleted = user.completedLevels.includes('bronze')
  const silverCompleted = user.completedLevels.includes('silver')
  const goldCompleted = user.completedLevels.includes('gold')
  const allCompleted = bronzeCompleted && silverCompleted && goldCompleted
  
  if (!allCompleted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <XPBar />
        <div className="bg-gray-100 border-2 border-gray-300 rounded-xl p-8 text-center">
          <Lock className="mx-auto mb-4 text-gray-400" size={48} />
          <h1 className="text-2xl font-bold text-gray-700 mb-4">Boss-Level gesperrt</h1>
          <p className="text-gray-600 mb-6">
            Schließe zuerst Bronze, Silber UND Gold ab!
          </p>
          
          <div className="flex flex-col gap-2 text-sm text-gray-500 mb-6">
            <div className={bronzeCompleted ? 'text-green-600' : 'text-gray-400'}>
              {bronzeCompleted ? '✅' : '🔒'} Bronze
            </div>
            <div className={silverCompleted ? 'text-green-600' : 'text-gray-400'}>
              {silverCompleted ? '✅' : '🔒'} Silber
            </div>
            <div className={goldCompleted ? 'text-green-600' : 'text-gray-400'}>
              {goldCompleted ? '✅' : '🔒'} Gold
            </div>
          </div>
          
          <Link href="/"
            className="inline-flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-700"
          >
            Zurück zur Übersicht
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
          completeLevel('boss')
          setCompleted(true)
          speak('UNGLAUBLICH! Du hast das Boss-Level gemeistert! Du bist ein FORELLEN-MEISTER!')
        }
      }, 1500)
    }
  }
  
  if (completed) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <XPBar />
        <div className="bg-gradient-to-r from-purple-100 to-purple-50 border-2 border-purple-500 rounded-xl p-8 text-center">
          <div className="text-6xl mb-4 flex justify-center">
            <Sparkles className="text-purple-500" size={64} />
          </div>
          <h1 className="text-3xl font-bold text-purple-800 mb-2">🔥 BOSS-LEVEL GESCHAFFT! 🔥</h1>
          <div className="text-2xl mb-4">👑 FORELLEN-MEISTER 👑</div>
          
          <p className="text-purple-700 mb-2">Du hast {level.totalXP} XP verdient!</p>
          <p className="text-gray-600 mb-6">Gesamte XP: {user.xp} / 375</p>
          
          <div className="bg-white rounded-lg p-4 mb-6 text-left">
            <h3 className="font-bold text-gray-800 mb-2">✅ Abgeschlossene Levels:</h3>
            <ul className="text-gray-700">
              <li className="flex items-center gap-2"><span>🥉</span> Bronze - Äußere Erscheinung</li>
              <li className="flex items-center gap-2"><span>🥈</span> Silber - Innere Organe</li>
              <li className="flex items-center gap-2"><span>🥇</span> Gold - Lebensweise</li>
              <li className="flex items-center gap-2 font-bold text-purple-700"><span>💎</span> BOSS - Die ultimative Challenge</li>
            </ul>
          </div>
          
          <div className="bg-purple-100 rounded-lg p-4 mb-6">
            <p className="text-purple-800 font-bold text-lg">🏆 ABSOLUTE LEGENDE 🏆</p>
            <p className="text-purple-700 text-sm mt-1">
              Du beherrschst die Forelle wie ein echter Experte!
            </p>
          </div>
          
          <div className="text-sm text-gray-500 mb-6">
            <p>Du bist bereit für die Klassenarbeit! 🎯</p>
            <p>11. Mai 2026</p>
          </div>
          
          <Link href="/" className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-purple-700 text-lg">
            <Crown size={24} />
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
        <span className="text-sm text-purple-600">✓✓✓ Alle Levels abgeschlossen</span>
      </div>
      
      <div className="bg-gradient-to-r from-purple-100 to-purple-50 border-2 border-purple-500 rounded-xl p-4 mb-6 animate-pulse">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-purple-800">💎 BOSS: {level.title}</h1>
          <span className="text-sm text-purple-700">Frage {currentTask + 1} / {level.tasks.length}</span>
        </div>
        
        <div className="w-full bg-purple-200 rounded-full h-2 mt-3">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentTask + 1) / level.tasks.length) * 100}%` }}
          />
        </div>
        
        <p className="text-sm text-purple-600 mt-2">🔥 Diese Fragen sind echte Challenges! 🔥</p>
      </div>
      
      <Quiz task={task} onComplete={handleTaskComplete} />
    </div>
  )
}
