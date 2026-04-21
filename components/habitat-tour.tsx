'use client'

import { useState, useEffect } from 'react'
import { habitatTour } from '@/lib/training-camp'
import { speak, stopSpeaking } from '@/lib/speech'
import { MapPin, Volume2, X, Info, Square } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { XPReward } from '@/components/xp-reward'

interface HabitatTourProps {
  onComplete: (earnedXP: number) => void
}

export function HabitatTour({ onComplete }: HabitatTourProps) {
  const [visitedHotspots, setVisitedHotspots] = useState<string[]>([])
  const [activeHotspot, setActiveHotspot] = useState<typeof habitatTour.hotspots[0] | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [completed, setCompleted] = useState(false)
  const [showReward, setShowReward] = useState(false)

  const totalHotspots = habitatTour.hotspots.length
  const progress = (visitedHotspots.length / totalHotspots) * 100

  useEffect(() => {
    return () => {
      stopSpeaking()
    }
  }, [])

  const handleHotspotClick = (hotspot: typeof habitatTour.hotspots[0]) => {
    setActiveHotspot(hotspot)
    
    if (!visitedHotspots.includes(hotspot.id)) {
      const newVisited = [...visitedHotspots, hotspot.id]
      setVisitedHotspots(newVisited)
      
      // Prüfe ob alle besucht
      if (newVisited.length === totalHotspots && !completed) {
        setCompleted(true)
        setShowReward(true)
        setTimeout(() => {
          onComplete(20)
        }, 2500)
      }
    }
  }

  const playAudio = () => {
    if (activeHotspot) {
      if (isPlaying) {
        // Stop current audio
        stopSpeaking()
        setIsPlaying(false)
      } else {
        setIsPlaying(true)
        speak(activeHotspot.profEichAudio)
        
        // Estimate duration (roughly 150 chars per 10 seconds)
        const estimatedDuration = Math.max(3000, activeHotspot.profEichAudio.length * 50)
        setTimeout(() => setIsPlaying(false), estimatedDuration)
      }
    }
  }

  const closeHotspot = () => {
    stopSpeaking()
    setIsPlaying(false)
    setActiveHotspot(null)
  }

  if (showIntro) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-b from-blue-900 to-cyan-800 rounded-3xl p-8 text-white"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-6xl mb-4"
          >
            🏕️
          </motion.div>
          <h2 className="text-3xl font-bold mb-4">{habitatTour.title}</h2>
          <p className="text-cyan-100 text-lg mb-6">{habitatTour.description}</p>
          
          <div className="bg-white/10 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Info className="w-5 h-5 text-cyan-300" />
              <span className="font-semibold">So funktioniert's:</span>
            </div>
            <ul className="text-sm text-cyan-100 space-y-2">
              <li>🔍 Klicke auf die bunten Hotspots im Bach</li>
              <li>🎧 Prof. Eich erklärt dir interessante Fakten</li>
              <li>📚 Entdecke alle {totalHotspots} Stationen</li>
              <li>✨ Kein Druck - nimm dir Zeit!</li>
            </ul>
          </div>
          
          <button
            onClick={() => {
              setShowIntro(false)
              speak('Willkommen im Bach! Klicke auf die bunten Hotspots und lerne die Forelle kennen!')
            }}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-4 px-8 rounded-full hover:scale-105 transition-transform shadow-lg"
          >
            Tour starten! 🚀
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="relative">
      {/* Progress Bar */}
      <div className="bg-white rounded-2xl p-4 mb-4 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-gray-700">Entdeckt: {visitedHotspots.length} / {totalHotspots}</span>
          <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <motion.div 
            className="bg-gradient-to-r from-green-400 to-emerald-500 h-4 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Habitat Visual */}
      <div className="bg-gradient-to-b from-sky-200 via-cyan-300 to-blue-400 rounded-3xl p-8 relative overflow-hidden shadow-2xl min-h-[500px]"
      >
        {/* Stream/Water effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-0 right-0 h-2 bg-white/30 rounded-full animate-pulse" />
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/20 rounded-full animate-pulse delay-75" />
          <div className="absolute top-3/4 left-0 right-0 h-2 bg-white/30 rounded-full animate-pulse delay-150" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-4 left-8 text-6xl">🪨</div>
        <div className="absolute bottom-8 right-12 text-5xl">🌿</div>
        <div className="absolute top-8 left-1/4 text-4xl">☁️</div>
        <div className="absolute top-16 right-1/3 text-3xl">🌲</div>
        
        {/* Trout silhouette */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-7xl opacity-30">
          🐟
        </div>

        {/* Hotspots */}
        {habitatTour.hotspots.map((hotspot, index) => {
          const isVisited = visitedHotspots.includes(hotspot.id)
          return (
            <motion.button
              key={hotspot.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleHotspotClick(hotspot)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 group
                ${isVisited ? 'opacity-70' : 'opacity-100'}
              `}
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: index * 0.3 }}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg
                  transition-all hover:scale-110 cursor-pointer
                  ${isVisited 
                    ? 'bg-green-500 border-4 border-white' 
                    : 'bg-yellow-400 border-4 border-white hover:bg-yellow-300'
                  }
                `}
              >
                {hotspot.icon}
              </motion.div>
              
              {/* Pulse effect for unvisited */}
              {!isVisited && (
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 rounded-full bg-yellow-400"
                />
              )}
              
              {/* Label */}
              <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap
                text-sm font-bold px-2 py-1 rounded-full
                ${isVisited ? 'bg-green-100 text-green-700' : 'bg-white text-gray-700'}
              `}>
                {isVisited && <span className="mr-1">✓</span>}
                {hotspot.title}
              </div>
            </motion.button>
          )
        })}

        {/* Active Hotspot Modal */}
        <AnimatePresence>
          {activeHotspot && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="absolute inset-x-4 bottom-4 bg-white rounded-2xl shadow-2xl p-6 z-10"
            >
              <button
                onClick={closeHotspot}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex items-start gap-4">
                <div className="text-5xl">{activeHotspot.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {activeHotspot.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {activeHotspot.fact}
                  </p>
                  
                  <button
                    onClick={playAudio}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all
                      ${isPlaying 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-105'
                      }
                    `}
                  >
                    {isPlaying ? (
                      <>
                        <Square className="w-5 h-5 fill-current" />
                        Prof. Eich stoppen
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-5 h-5" />
                        Prof. Eich anhören
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Completion Message */}
        <AnimatePresence>
          {completed && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-3xl z-20"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="bg-white rounded-2xl p-8 text-center shadow-2xl max-w-md mx-4"
              >
                <button
                  onClick={() => setCompleted(false)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-2"
                >
                  ✕
                </button>
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Habitat entdeckt!
                </h3>
                <p className="text-gray-600 mb-4">
                  Du kennst jetzt das Zuhause der Forelle!
                </p>
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 px-6 rounded-full">
                  +20 XP!
                </div>
                <button
                  onClick={() => setCompleted(false)}
                  className="mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Weiter →
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <XPReward 
        amount={20}
        show={showReward}
        message="Habitat entdeckt!"
      />
    </div>
  )
}
