'use client'

import { useState, useEffect } from 'react'
import { learningPath } from '@/lib/data'
import { getTotalXP } from '@/lib/xp'
import { Lock, CheckCircle, ChevronRight, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface LearningPathProps {
  onSelectStation: (stationId: string) => void
  currentStation: string | null
}

export function LearningPath({ onSelectStation, currentStation }: LearningPathProps) {
  const [userXP, setUserXP] = useState(0)
  
  useEffect(() => {
    setUserXP(getTotalXP())
  }, [])

  const getStationStatus = (station: typeof learningPath.stations[0], index: number) => {
    const prevStation = learningPath.stations[index - 1]
    const isCompleted = userXP >= station.requiredXP + station.totalXP
    const isUnlocked = userXP >= station.requiredXP
    const isCurrent = currentStation === station.id
    
    return { isCompleted, isUnlocked, isCurrent }
  }

  return (
    <div className="bg-gradient-to-b from-blue-900 via-cyan-900 to-blue-950 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            🦫 Dein Lernpfad
          </h1>
          <p className="text-cyan-200 text-lg">
            Meistere alle Stationen und werde zum Forellen-Experten!
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
            <span className="text-2xl">⭐</span>
            <span className="text-white font-bold">{userXP} XP</span>
          </div>
        </div>

        {/* Path Container */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-24 bottom-24 w-1 bg-gradient-to-b from-green-400 via-blue-400 to-red-500 opacity-30" />
          
          {/* Stations */}
          <div className="space-y-8 relative">
            {learningPath.stations.map((station, index) => {
              const { isCompleted, isUnlocked, isCurrent } = getStationStatus(station, index)
              const isEven = index % 2 === 0
              
              return (
                <motion.div
                  key={station.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-6 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Station Card */}
                  <div 
                    className={`flex-1 relative ${isEven ? 'text-right' : 'text-left'}`}
                  >
                    <button
                      onClick={() => isUnlocked && onSelectStation(station.id)}
                      disabled={!isUnlocked}
                      className={`
                        relative inline-block p-6 rounded-2xl transition-all duration-300
                        ${isUnlocked 
                          ? 'cursor-pointer hover:scale-105 hover:shadow-2xl' 
                          : 'cursor-not-allowed opacity-60'
                        }
                        ${isCurrent 
                          ? 'ring-4 ring-yellow-400 ring-opacity-50 shadow-xl' 
                          : ''
                        }
                        ${isCompleted 
                          ? 'bg-gradient-to-br from-green-600 to-green-800' 
                          : isUnlocked 
                            ? `bg-gradient-to-br ${getStationGradient(station.color)}` 
                            : 'bg-gray-700'
                        }
                      `}
                    >
                      {/* Locked Overlay */}
                      {!isUnlocked && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40">
                          <Lock className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                      
                      {/* Station Content */}
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{station.emoji}</span>
                        <div className={isEven ? 'text-right' : 'text-left'}>
                          <h3 className="text-xl font-bold text-white">
                            {station.name}
                          </h3>
                          <p className="text-white/80 text-sm mt-1">
                            {station.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2 justify-end">
                            {isCompleted && (
                              <CheckCircle className="w-5 h-5 text-green-300" />
                            )}
                            <span className="text-yellow-300 text-sm font-medium">
                              {station.totalXP} XP
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Category Badge */}
                      <div className={`absolute -bottom-3 ${isEven ? 'right-4' : 'left-4'}`}>
                        <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full">
                          {station.category}
                        </span>
                      </div>
                    </button>
                    
                    {/* Animated Arrow for Current Station */}
                    {isCurrent && (
                      <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className={`absolute -top-8 ${isEven ? 'right-8' : 'left-8'}`}
                      >
                        <ArrowRight 
                          className="w-8 h-8 text-yellow-400 transform rotate-[90deg]" 
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Center Dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div 
                      className={`w-6 h-6 rounded-full border-4 transition-colors duration-300
                        ${isCompleted 
                          ? 'bg-green-400 border-green-600' 
                          : isUnlocked 
                            ? 'bg-white border-' + station.color.replace('#', '')
                            : 'bg-gray-600 border-gray-500'
                        }
                      `}
                      style={{ borderColor: isUnlocked ? station.color : undefined }}
                    />
                    {/* Pulse Animation for Current */}
                    {isCurrent && (
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="absolute inset-0 rounded-full bg-yellow-400"
                      />
                    )}
                  </div>

                  {/* Empty Space for Layout */}
                  <div className="flex-1" />
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-12 flex justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500" />
            <span className="text-green-200">Abgeschlossen</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500" />
            <span className="text-blue-200">Verfügbar</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400">Gesperrt</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function getStationGradient(color: string): string {
  switch (color) {
    case '#22c55e': return 'from-green-500 to-green-700'
    case '#3b82f6': return 'from-blue-500 to-blue-700'
    case '#f59e0b': return 'from-amber-500 to-amber-700'
    case '#dc2626': return 'from-red-500 to-red-700'
    default: return 'from-gray-500 to-gray-700'
  }
}
