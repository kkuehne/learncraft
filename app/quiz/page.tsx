'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { XPBar } from '@/components/xp-bar'
import { getUserData, getTotalXP } from '@/lib/xp'
import { forelleQuest } from '@/lib/data'
import { Lock, CheckCircle, Trophy } from 'lucide-react'

export default function QuizPage() {
  const [userXP, setUserXP] = useState(0)
  const [completedLevels, setCompletedLevels] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    const data = getUserData()
    setUserXP(data.xp)
    setCompletedLevels(data.completedLevels)
    setMounted(true)
  }, [])

  const bronzeDone = completedLevels.includes('bronze')
  const silverDone = completedLevels.includes('silver')
  const goldDone = completedLevels.includes('gold')
  
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-900 via-orange-900 to-amber-950">
        <div className="container mx-auto px-4 py-8">
          <XPBar />
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">📝 Quiz</h1>
            <p className="text-amber-200">Teste dein Wissen!</p>
          </div>
          <div className="animate-pulse bg-white/10 rounded-xl h-96 max-w-2xl mx-auto"></div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 via-orange-900 to-amber-950">
      <div className="container mx-auto px-4 py-8">
        <XPBar />
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            📝 Quiz
          </h1>
          <p className="text-amber-200 text-lg">
            Teste dein Wissen in drei Schwierigkeitsstufen!
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
            <span className="text-2xl">⭐</span>
            <span className="text-white font-bold">{userXP} XP</span>
          </div>
        </div>

        {/* Quiz Levels */}
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* Bronze - Immer verfügbar */}
          <Link href="/quest/forelle/bronze">
            <div className={`bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 rounded-xl p-6 hover:shadow-xl transition-all cursor-pointer ${bronzeDone ? 'border-yellow-400 opacity-70' : 'border-yellow-400'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">🥉</span>
                  <div>
                    <h3 className={`text-xl font-bold ${bronzeDone ? 'text-yellow-700 line-through' : 'text-yellow-800'}`}>
                      {bronzeDone ? 'Bronze abgeschlossen' : 'Bronze-Level'}
                    </h3>
                    <p className="text-yellow-700">{forelleQuest.levels.bronze.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{forelleQuest.levels.bronze.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-yellow-600">+{forelleQuest.levels.bronze.totalXP} XP</span>
                  {bronzeDone && <CheckCircle className="w-6 h-6 text-green-500 mt-2 ml-auto" />}
                </div>
              </div>
            </div>
          </Link>
          
          {/* Silber */}
          {bronzeDone ? (
            <Link href="/quest/forelle/silver">
              <div className={`bg-gradient-to-r from-gray-100 to-gray-50 border-2 rounded-xl p-6 hover:shadow-xl transition-all cursor-pointer ${silverDone ? 'border-gray-400 opacity-70' : 'border-gray-400'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">🥈</span>
                    <div>
                      <h3 className={`text-xl font-bold ${silverDone ? 'text-gray-700 line-through' : 'text-gray-800'}`}>
                        {silverDone ? 'Silber abgeschlossen' : 'Silber-Level'}
                      </h3>
                      <p className="text-gray-700">{forelleQuest.levels.silver.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{forelleQuest.levels.silver.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-gray-500">+{forelleQuest.levels.silver.totalXP} XP</span>
                    {silverDone && <CheckCircle className="w-6 h-6 text-green-500 mt-2 ml-auto" />}
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="bg-gradient-to-r from-gray-100 to-gray-50 border-2 border-gray-300 rounded-xl p-6 opacity-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-4xl"><Lock className="w-10 h-10 text-gray-400" /></span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-700">Silber-Level</h3>
                    <p className="text-gray-600">{forelleQuest.levels.silver.title}</p>
                    <p className="text-sm text-gray-500 mt-1">Schließe erst Bronze ab!</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Gold */}
          {silverDone ? (
            <Link href="/quest/forelle/gold">
              <div className={`bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 rounded-xl p-6 hover:shadow-xl transition-all cursor-pointer ${goldDone ? 'border-yellow-500 opacity-70' : 'border-yellow-500'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">🥇</span>
                    <div>
                      <h3 className={`text-xl font-bold ${goldDone ? 'text-yellow-700 line-through' : 'text-yellow-800'}`}>
                        {goldDone ? 'Gold abgeschlossen' : 'Gold-Level'}
                      </h3>
                      <p className="text-yellow-700">{forelleQuest.levels.gold.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{forelleQuest.levels.gold.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-yellow-600">+{forelleQuest.levels.gold.totalXP} XP</span>
                    {goldDone && <CheckCircle className="w-6 h-6 text-green-500 mt-2 ml-auto" />}
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-300 rounded-xl p-6 opacity-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-4xl"><Lock className="w-10 h-10 text-yellow-600" /></span>
                  <div>
                    <h3 className="text-xl font-bold text-yellow-700">Gold-Level</h3>
                    <p className="text-yellow-600">{forelleQuest.levels.gold.title}</p>
                    <p className="text-sm text-gray-500 mt-1">Schließe erst Silber ab!</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Zurück Button */}
        <div className="mt-12 text-center">
          <Link href="/">
            <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl transition-colors">
              ← Zurück zum Lernpfad
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
