'use client'

import { useState, useEffect } from 'react'
import { matchGame } from '@/lib/training-camp'
import { speak } from '@/lib/speech'
import { Check, X, RotateCcw, Trophy } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface MatchGameProps {
  onComplete: (earnedXP: number) => void
}

export function MatchLearn({ onComplete }: MatchGameProps) {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)
  const [selectedDef, setSelectedDef] = useState<string | null>(null)
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set())
  const [wrongAttempt, setWrongAttempt] = useState(false)
  const [completed, setCompleted] = useState(false)

  const pairs = matchGame.pairs
  const progress = (matchedPairs.size / pairs.length) * 100

  const handleTermClick = (id: string) => {
    if (matchedPairs.has(id)) return
    if (selectedTerm === id) {
      setSelectedTerm(null)
      return
    }
    setSelectedTerm(id)
    setWrongAttempt(false)

    // If definition already selected, check match
    if (selectedDef) {
      checkMatch(id, selectedDef)
    }
  }

  const handleDefClick = (id: string) => {
    if (matchedPairs.has(id)) return
    if (selectedDef === id) {
      setSelectedDef(null)
      return
    }
    setSelectedDef(id)
    setWrongAttempt(false)

    // If term already selected, check match
    if (selectedTerm) {
      checkMatch(selectedTerm, id)
    }
  }

  const checkMatch = (termId: string, defId: string) => {
    if (termId === defId) {
      // Correct match!
      const newMatched = new Set(matchedPairs)
      newMatched.add(termId)
      setMatchedPairs(newMatched)
      setSelectedTerm(null)
      setSelectedDef(null)
      
      speak('Richtig gematcht! Sehr gut!')

      // Check completion
      if (newMatched.size === pairs.length) {
        setTimeout(() => {
          setCompleted(true)
          setTimeout(() => onComplete(20), 1500)
        }, 500)
      }
    } else {
      // Wrong match
      setWrongAttempt(true)
      setTimeout(() => {
        setWrongAttempt(false)
        setSelectedTerm(null)
        setSelectedDef(null)
      }, 800)
      
      speak('Das passt noch nicht ganz - versuche es weiter!')
    }
  }

  const resetGame = () => {
    setMatchedPairs(new Set())
    setSelectedTerm(null)
    setSelectedDef(null)
    setWrongAttempt(false)
    setCompleted(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{matchGame.title}</h2>
            <p className="text-gray-500">{matchGame.description}</p>
          </div>
          
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Neustart
          </button>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-600">
                Gepaart: {matchedPairs.size} / {pairs.length}
              </span>
              <span className="text-sm font-bold text-blue-600">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          
          <div className="text-4xl">🧩</div>
        </div>
      </div>

      {/* Game Area */}
      {!completed ? (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Terms Column */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-700 text-center mb-4">Begriffe 🔤</h3>
            <div className="space-y-3">
              {pairs.map((pair) => {
                const isMatched = matchedPairs.has(pair.id)
                const isSelected = selectedTerm === pair.id
                
                return (
                  <motion.button
                    key={`term-${pair.id}`}
                    onClick={() => handleTermClick(pair.id)}
                    disabled={isMatched}
                    whileHover={!isMatched ? { scale: 1.02 } : {}}
                    whileTap={!isMatched ? { scale: 0.98 } : {}}
                    className={`w-full p-4 rounded-xl text-left transition-all relative
                      ${isMatched 
                        ? 'bg-green-100 border-2 border-green-400 cursor-default' 
                        : isSelected
                          ? 'bg-blue-500 text-white border-2 border-blue-600 shadow-lg'
                          : 'bg-white border-2 border-gray-200 hover:border-blue-300 cursor-pointer'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{pair.emoji}</span>
                      <span className={`font-bold ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                        {pair.term}
                      </span>
                      
                      {isMatched && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute right-3"
                        >
                          <Check className="w-6 h-6 text-green-600" />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Definitions Column */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-700 text-center mb-4">Bedeutungen 📝</h3>
            <div className="space-y-3">
              {pairs.map((pair) => {
                const isMatched = matchedPairs.has(pair.id)
                const isSelected = selectedDef === pair.id
                
                return (
                  <motion.button
                    key={`def-${pair.id}`}
                    onClick={() => handleDefClick(pair.id)}
                    disabled={isMatched}
                    whileHover={!isMatched ? { scale: 1.02 } : {}}
                    whileTap={!isMatched ? { scale: 0.98 } : {}}
                    className={`w-full p-4 rounded-xl text-left transition-all relative
                      ${isMatched 
                        ? 'bg-green-100 border-2 border-green-400 cursor-default' 
                        : isSelected
                          ? 'bg-purple-500 text-white border-2 border-purple-600 shadow-lg'
                          : 'bg-white border-2 border-gray-200 hover:border-purple-300 cursor-pointer'
                      }
                    `}
                  >
                    <span className={`text-sm leading-relaxed ${isSelected ? 'text-white' : 'text-gray-600'}`}>
                      {pair.definition}
                    </span>
                    
                    {isMatched && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        <Check className="w-6 h-6 text-green-600" />
                      </motion.div>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Completion Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-8 text-white text-center shadow-2xl"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-6xl mb-4"
          >
            🏆
          </motion.div>
          
          <h3 className="text-3xl font-bold mb-2">Super gematcht!</h3>
          <p className="text-white/90 mb-6">
            Du hast alle {pairs.length} Begriffe korrekt zugeordnet!
          </p>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-6">
            <div className="text-4xl font-bold">+20 XP!</div>
          </div>
          
          <button
            onClick={resetGame}
            className="bg-white text-orange-600 font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform"
          >
            Nochmal spielen
          </button>
        </motion.div>
      )}

      {/* Wrong Attempt Feedback */}
      <AnimatePresence>
        {wrongAttempt && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
          >
            <X className="w-5 h-5" />
            Das passt noch nicht - probiere es weiter!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
