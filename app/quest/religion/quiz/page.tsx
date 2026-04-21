'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, BookOpen, Lock, CheckCircle, Crown } from 'lucide-react'
import { religionQuest } from '@/lib/religion-data'
import { getUserData } from '@/lib/xp'

export default function ReligionQuizPage() {
  const [userData, setUserData] = useState({ xp: 0, completedLevels: [] as string[] })
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    const data = getUserData()
    setUserData(data)
    setMounted(true)
  }, [])
  
  const bronzeDone = userData.completedLevels.includes('bronze')
  const silverDone = userData.completedLevels.includes('silver')
  const goldDone = userData.completedLevels.includes('gold')
  
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-900 via-orange-900 to-amber-950">
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
          <div className="animate-pulse bg-white/10 rounded-xl h-96 w-full max-w-2xl"></div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 via-orange-900 to-amber-950">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/biomes/religion">
            <button className="flex items-center gap-2 text-amber-200 hover:text-white transition-colors mb-6">
              <ChevronLeft className="w-5 h-5" />
              Zurück zum Religions-Lernpfad
            </button>
          </Link>
          
          <div className="text-center">
            <div className="text-6xl mb-4">📝</div>
            <h1 className="text-4xl font-bold text-white mb-2">Glaubens-Quiz</h1>
            <p className="text-amber-200 max-w-xl mx-auto">
              Teste dein Wissen über das Alte Testament
            </p>
          </div>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Bronze */}
          <Link href="/quest/religion/bronze">
            <div className={`bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 rounded-xl p-6 hover:shadow-xl transition-all cursor-pointer ${bronzeDone ? 'border-yellow-400 opacity-70' : 'border-yellow-400'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">🥉</span>
                  <div>
                    <h3 className={`text-xl font-bold ${bronzeDone ? 'text-yellow-700 line-through' : 'text-yellow-800'}`}>
                      {bronzeDone ? 'Bronze abgeschlossen' : 'Bronze-Level'}
                    </h3>
                    <p className="text-yellow-700">{religionQuest.levels.bronze.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{religionQuest.levels.bronze.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-yellow-600">+{religionQuest.levels.bronze.totalXP} XP</span>
                  {bronzeDone && <CheckCircle className="w-6 h-6 text-green-500 mt-2 ml-auto" />}
                </div>
              </div>
            </div>
          </Link>
          
          {/* Silber */}
          {bronzeDone ? (
            <Link href="/quest/religion/silver">
              <div className={`bg-gradient-to-r from-gray-100 to-gray-50 border-2 rounded-xl p-6 hover:shadow-xl transition-all cursor-pointer ${silverDone ? 'border-gray-400 opacity-70' : 'border-gray-400'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">🥈</span>
                    <div>
                      <h3 className={`text-xl font-bold ${silverDone ? 'text-gray-700 line-through' : 'text-gray-800'}`}>
                        {silverDone ? 'Silber abgeschlossen' : 'Silber-Level'}
                      </h3>
                      <p className="text-gray-700">{religionQuest.levels.silver.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{religionQuest.levels.silver.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-gray-500">+{religionQuest.levels.silver.totalXP} XP</span>
                    {silverDone && <CheckCircle className="w-6 h-6 text-green-500 mt-2 ml-auto" />}
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="bg-gradient-to-r from-gray-100 to-gray-50 border-2 border-gray-300 rounded-xl p-6 opacity-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Lock className="w-10 h-10 text-gray-400" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-700">Silber-Level</h3>
                    <p className="text-gray-600">{religionQuest.levels.silver.title}</p>
                    <p className="text-sm text-gray-500 mt-1">Schließe erst Bronze ab!</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Gold */}
          {silverDone ? (
            <Link href="/quest/religion/gold">
              <div className={`bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 rounded-xl p-6 hover:shadow-xl transition-all cursor-pointer ${goldDone ? 'border-yellow-500 opacity-70' : 'border-yellow-500'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">🥇</span>
                    <div>
                      <h3 className={`text-xl font-bold ${goldDone ? 'text-yellow-700 line-through' : 'text-yellow-800'}`}>
                        {goldDone ? 'Gold abgeschlossen' : 'Gold-Level'}
                      </h3>
                      <p className="text-yellow-700">{religionQuest.levels.gold.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{religionQuest.levels.gold.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-yellow-600">+{religionQuest.levels.gold.totalXP} XP</span>
                    {goldDone && <CheckCircle className="w-6 h-6 text-green-500 mt-2 ml-auto" />}
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-300 rounded-xl p-6 opacity-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Lock className="w-10 h-10 text-yellow-600" />
                  <div>
                    <h3 className="text-xl font-bold text-yellow-700">Gold-Level</h3>
                    <p className="text-yellow-600">{religionQuest.levels.gold.title}</p>
                    <p className="text-sm text-gray-500 mt-1">Schließe erst Silber ab!</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
