'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, Fish, Microscope, Scroll, Crown } from 'lucide-react'
import { learningPath } from '@/lib/data'
import { getUserData, getTotalXP } from '@/lib/xp'

type StationId = 'training-camp' | 'anatomy-lab' | 'physiology-lab' | 'quiz' | 'boss-arena'

export default function BiologyBiomePage() {
  const [userXP, setUserXP] = useState(0)
  const [completedLevels, setCompletedLevels] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    const data = getUserData()
    setUserXP(data.xp)
    setCompletedLevels(data.completedLevels)
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 via-cyan-900 to-blue-950">
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
          <div className="animate-pulse bg-white/10 rounded-xl h-96 w-full max-w-2xl"></div>
        </div>
      </div>
    )
  }

  const getStationIcon = (id: StationId) => {
    switch (id) {
      case 'training-camp': return <Fish className="w-6 h-6" />
      case 'anatomy-lab': return <Microscope className="w-6 h-6" />
      case 'physiology-lab': return <Microscope className="w-6 h-6" />
      case 'quiz': return <Scroll className="w-6 h-6" />
      case 'boss-arena': return <Crown className="w-6 h-6" />
    }
  }

  const isStationCompleted = (id: string) => completedLevels.includes(id)
  const isStationLocked = (station: typeof learningPath.stations[0]) => {
    if (!station.requiredXP) return false
    return userXP < station.requiredXP
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-cyan-900 to-blue-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/">
            <button className="flex items-center gap-2 text-cyan-200 hover:text-white transition-colors mb-6">
              <ChevronLeft className="w-5 h-5" />
              Zurück zur Übersicht
            </button>
          </Link>
          
          <div className="text-center">
            <div className="text-6xl mb-4">🐟</div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Biologie
            </h1>
            <p className="text-cyan-200 max-w-xl mx-auto">
              Die Bachforelle - Anatomie, Physiologie und Lebensweise
            </p>
          </div>
        </motion.div>

        {/* XP Progress */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-white font-medium">Dein Fortschritt</span>
            <span className="text-yellow-400 font-bold text-xl">{userXP} XP</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <motion.div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (userXP / 350) * 100)}%` }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>
          <p className="text-cyan-200 text-sm mt-2 text-center">
            {userXP >= 350 ? '🎉 Boss Arena freigeschaltet!' : `${350 - userXP} XP bis zur Boss Arena`}
          </p>
        </motion.div>

        {/* Learning Path Stations */}
        <div className="max-w-2xl mx-auto space-y-4">
          {learningPath.stations.map((station, index) => {
            const completed = isStationCompleted(station.id)
            const locked = isStationLocked(station)
            
            return (
              <motion.div
                key={station.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                {locked ? (
                  <div className="bg-white/10 rounded-2xl p-6 opacity-50 cursor-not-allowed">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-gray-500/30">
                        <Crown className="w-6 h-6 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-400">{station.name}</h3>
                        <p className="text-sm text-gray-500">
                          Benötigt: {station.requiredXP} XP
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link href={station.route || '#'}>
                    <div 
                      className={`group relative overflow-hidden rounded-2xl p-6 cursor-pointer
                        transition-all duration-300 hover:scale-[1.02] hover:shadow-xl
                        ${completed 
                          ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30 border-2 border-green-400/50' 
                          : 'bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border-2 border-cyan-400/50 hover:border-cyan-300'
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${completed ? 'bg-green-500/30' : 'bg-cyan-500/30'}`}>
                          {getStationIcon(station.id as StationId)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{station.emoji}</span>
                            <h3 className={`text-xl font-bold ${completed ? 'text-green-300' : 'text-white'}`}>
                              {station.name}
                            </h3>
                            {completed && <span className="text-green-400 text-sm">✓ Abgeschlossen</span>}
                          </div>
                          
                          <p className="text-cyan-200/80 text-sm mt-1">{station.description}</p>
                          
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-yellow-400 text-sm font-medium">+{station.totalXP} XP</span>
                            {!completed && <span className="text-cyan-300 text-sm">Klicke zum Starten →</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
