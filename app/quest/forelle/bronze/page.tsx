'use client'

import { useState } from 'react'
import Link from 'next/link'
import { XPBar } from '@/components/xp-bar'
import { Quiz } from '@/components/quiz'
import { forelleQuest, professorEich } from '@/lib/data'
import { completeLevel } from '@/lib/xp'
import { speak } from '@/lib/speech'
import { Check } from 'lucide-react'

export default function BronzeLevel() {
  const [currentTask, setCurrentTask] = useState(0)
  const [completed, setCompleted] = useState(false)
  
  const level = forelleQuest.levels.bronze
  const task = level.tasks[currentTask]
  
  const handleTaskComplete = (success: boolean) => {
    if (success) {
      setTimeout(() => {
        if (currentTask < level.tasks.length - 1) {
          setCurrentTask(currentTask + 1)
        } else {
          completeLevel('bronze')
          setCompleted(true)
          speak('Herzlichen Glückwunsch! Bronze-Level geschafft!')
        }
      }, 1500)
    }
    // Bei falscher Antwort: nichts tun, Quiz resetet sich selbst
  }
  
  if (completed) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <XPBar />
        <div className="bg-green-100 border-2 border-green-400 rounded-xl p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-green-800 mb-4">Bronze-Level geschafft!</h1>
          <p className="text-green-700 mb-6">Du hast {level.totalXP} XP verdient!</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700">
            <Check size={20} />
            Zurück zur Übersicht
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <XPBar />
      
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:underline">← Zurück</Link>
      </div>
      
      <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-400 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-yellow-800">🥉 Bronze: {level.title}</h1>
          <span className="text-sm text-yellow-700">Frage {currentTask + 1} / {level.tasks.length}</span>
        </div>
        
        <div className="w-full bg-yellow-200 rounded-full h-2 mt-3">
          <div
            className="bg-yellow-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentTask + 1) / level.tasks.length) * 100}%` }}
          />
        </div>
      </div>
      
      <Quiz task={task} onComplete={handleTaskComplete} />
    </div>
  )
}
