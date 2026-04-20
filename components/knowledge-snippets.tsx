'use client'

import { useState, useEffect } from 'react'
import { knowledgeSnippets } from '@/lib/training-camp'
import { speak, stopSpeaking } from '@/lib/speech'
import { Play, Pause, Volume2, Clock, ChevronRight, ChevronLeft, Check, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { XPReward } from '@/components/xp-reward'

interface KnowledgeSnippetsProps {
  onComplete: (earnedXP: number) => void
}

export function KnowledgeSnippets({ onComplete }: KnowledgeSnippetsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [watchedSnippets, setWatchedSnippets] = useState<Set<string>>(new Set())
  const [completed, setCompleted] = useState(false)
  const [showReward, setShowReward] = useState(false)

  const currentSnippet = knowledgeSnippets[currentIndex]
  const totalSnippets = knowledgeSnippets.length
  const progress = (watchedSnippets.size / totalSnippets) * 100

  useEffect(() => {
    return () => {
      stopSpeaking()
    }
  }, [])

  const playAudio = () => {
    if (isPlaying) {
      stopSpeaking()
      setIsPlaying(false)
    } else {
      setIsPlaying(true)
      speak(currentSnippet.audioText)
      
      // Mark as watched
      setWatchedSnippets(prev => {
        const newSet = new Set(prev)
        newSet.add(currentSnippet.id)
        return newSet
      })
      
      // Estimate duration
      const estimatedDuration = Math.max(3000, currentSnippet.audioText.length * 50)
      setTimeout(() => setIsPlaying(false), estimatedDuration)
    }
  }

  const nextSnippet = () => {
    stopSpeaking()
    setIsPlaying(false)
    if (currentIndex < totalSnippets - 1) {
      setCurrentIndex(prev => prev + 1)
    } else if (watchedSnippets.size >= 3 && !completed) {
      setCompleted(true)
      setShowReward(true)
      setTimeout(() => onComplete(20), 2500)
    }
  }

  const prevSnippet = () => {
    stopSpeaking()
    setIsPlaying(false)
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="bg-white rounded-2xl p-4 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-gray-700">
            Schnipsel {currentIndex + 1} / {totalSnippets}
          </span>
          <span className="text-sm text-gray-500">
            {watchedSnippets.size} gehört
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Höre mindestens 3 Schnipsel für +20 XP!
        </p>
      </div>

      {/* Snippet Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSnippet.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 rounded-3xl p-8 text-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="text-4xl">{currentSnippet.emoji}</div>
              <div>
                <h3 className="text-xl font-bold">{currentSnippet.title}</h3>
                <div className="flex items-center gap-2 text-purple-200 text-sm">
                  <Clock className="w-4 h-4" />
                  {currentSnippet.duration}
                </div>
              </div>
            </div>
            
            {watchedSnippets.has(currentSnippet.id) && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-green-500 rounded-full p-2"
              >
                <Check className="w-5 h-5 text-white" />
              </motion.div>
            )}
          </div>

          {/* Description */}
          <p className="text-purple-100 text-lg leading-relaxed mb-6">
            {currentSnippet.description}
          </p>

          {/* Audio Player */}
          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={playAudio}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all
                  ${isPlaying 
                    ? 'bg-white text-purple-600 animate-pulse' 
                    : 'bg-white/20 hover:bg-white/30 text-white'
                  }
                `}
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </button>
              
              <div className="flex-1">
                <p className="text-white font-semibold mb-1">
                  {isPlaying ? 'Prof. Eich spricht...' : 'Prof. Eich erklärt'}
                </p>
                <p className="text-purple-200 text-sm">
                  {isPlaying ? 'Klicke zum Pausieren' : 'Klicke zum Abspielen'}
                </p>
              </div>
            </div>

            {/* Visual Audio Wave */}
            {isPlaying && (
              <div className="flex items-center justify-center gap-1 h-8">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: [8, 24 + Math.random() * 16, 8],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.5,
                      delay: i * 0.05,
                    }}
                    className="w-1.5 bg-white/60 rounded-full"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevSnippet}
              disabled={currentIndex === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all
                ${currentIndex === 0 
                  ? 'bg-white/10 text-white/50 cursor-not-allowed' 
                  : 'bg-white/20 hover:bg-white/30 text-white'
                }
              `}
            >
              <ChevronLeft className="w-5 h-5" />
              Zurück
            </button>
            
            <div className="flex gap-2">
              {knowledgeSnippets.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    stopSpeaking()
                    setIsPlaying(false)
                    setCurrentIndex(idx)
                  }}
                  className={`w-3 h-3 rounded-full transition-all
                    ${idx === currentIndex 
                      ? 'bg-white w-8' 
                      : watchedSnippets.has(knowledgeSnippets[idx].id)
                        ? 'bg-green-400'
                        : 'bg-white/30'
                    }
                  `}
                />
              ))}
            </div>
            
            <button
              onClick={nextSnippet}
              className="flex items-center gap-2 px-6 py-3 bg-white text-purple-700 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              {currentIndex === totalSnippets - 1 ? 'Fertig' : 'Weiter'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* XP Reward */}
      <XPReward 
        amount={20}
        show={showReward}
        message="Wissen angeeignet!"
      />
    </div>
  )
}
