'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Star, Trophy, Zap } from 'lucide-react'

interface XPRewardProps {
  amount: number
  show: boolean
  onComplete?: () => void
  variant?: 'default' | 'large' | 'boss'
  message?: string
}

export function XPReward({ 
  amount, 
  show, 
  onComplete, 
  variant = 'default',
  message = '+XP!'
}: XPRewardProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        onComplete?.()
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  if (!show) return null

  const isLarge = variant === 'large'
  const isBoss = variant === 'boss'

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: -50 }}
          transition={{ 
            type: 'spring',
            stiffness: 200,
            damping: 20,
            duration: 0.6 
          }}
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              repeat: 2,
              duration: 0.5,
              ease: 'easeInOut'
            }}
            className={`
              relative flex flex-col items-center justify-center
              ${isBoss 
                ? 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-8' 
                : isLarge 
                  ? 'bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 p-6' 
                  : 'bg-gradient-to-br from-green-400 to-emerald-500 p-4'
              }
              rounded-3xl shadow-2xl border-4 border-white/50
            `}
          >
            {/* Sparkle Effects */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: [0, (i % 2 === 0 ? 1 : -1) * (50 + Math.random() * 50)],
                  y: [0, -50 - Math.random() * 50]
                }}
                transition={{ 
                  delay: i * 0.1,
                  duration: 1,
                  repeat: 2
                }}
                className="absolute"
              >
                <Sparkles className={`
                  ${isBoss ? 'w-8 h-8 text-yellow-200' : 'w-6 h-6 text-white'}
                `} />
              </motion.div>
            ))}

            {/* Icon */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: 0 }}
              className="mb-2"
            >
              {isBoss ? (
                <Trophy className="w-12 h-12 text-white" />
              ) : isLarge ? (
                <Star className="w-10 h-10 text-white" />
              ) : (
                <Zap className="w-8 h-8 text-white" />
              )}
            </motion.div>

            {/* XP Amount */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
              className="text-white font-bold"
            >
              <span className={isBoss ? 'text-6xl' : isLarge ? 'text-5xl' : 'text-4xl'}>
                +{amount}
              </span>
              <span className={`block text-center ${isBoss ? 'text-xl' : 'text-lg'}`}>
                XP
              </span>
            </motion.div>

            {/* Message */}
            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-2 text-white/90 font-medium text-center"
              >
                {message}
              </motion.div>
            )}

            {/* Particle Burst */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial="initial"
              animate="animate"
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className={`absolute w-2 h-2 rounded-full bg-white/60
                    left-1/2 top-1/2
                  `}
                  animate={{
                    x: [0, Math.cos(i * 30 * Math.PI / 180) * 100],
                    y: [0, Math.sin(i * 30 * Math.PI / 180) * 100],
                    opacity: [1, 0],
                    scale: [1, 0]
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.2,
                    ease: 'easeOut'
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// XP Bar with animation
interface AnimatedXPBarProps {
  currentXP: number
  maxXP: number
  label?: string
  showLevelUp?: boolean
}

export function AnimatedXPBar({ 
  currentXP, 
  maxXP, 
  label,
  showLevelUp = true 
}: AnimatedXPBarProps) {
  const [displayXP, setDisplayXP] = useState(currentXP)
  const [isLevelingUp, setIsLevelingUp] = useState(false)

  useEffect(() => {
    if (currentXP > displayXP) {
      const diff = currentXP - displayXP
      const duration = 1000
      const steps = 30
      const increment = diff / steps
      let step = 0

      const timer = setInterval(() => {
        step++
        setDisplayXP(prev => {
          const newValue = prev + increment
          return step >= steps ? currentXP : newValue
        })

        if (step >= steps) {
          clearInterval(timer)
          if (showLevelUp) {
            setIsLevelingUp(true)
            setTimeout(() => setIsLevelingUp(false), 1500)
          }
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [currentXP, displayXP, showLevelUp])

  const percent = Math.min(100, (displayXP / maxXP) * 100)

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-600">{label}</span>
          <motion.span 
            className="text-sm font-bold text-blue-600"
            animate={isLevelingUp ? { scale: [1, 1.3, 1], color: ['#2563eb', '#22c55e', '#2563eb'] } : {}}
            transition={{ duration: 0.5 }}
          >
            {Math.round(displayXP)} / {maxXP} XP
          </motion.span>
        </div>
      )}
      
      <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <motion.div 
          className="absolute h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
          />
        </motion.div>

        {/* Level up flash */}
        {isLevelingUp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-green-400 rounded-full"
          />
        )}
      </div>
    </div>
  )
}

// Floating XP text for small gains
interface FloatingXPProps {
  amount: number
  position: { x: number; y: number }
  show: boolean
}

export function FloatingXP({ amount, position, show }: FloatingXPProps) {
  if (!show) return null

  return (
    <motion.div
      initial={{ opacity: 1, y: 0, scale: 1 }}
      animate={{ 
        opacity: 0, 
        y: -50,
        scale: [1, 1.2, 1]
      }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      style={{ 
        position: 'fixed',
        left: position.x,
        top: position.y,
        pointerEvents: 'none',
        zIndex: 100
      }}
      className="flex items-center gap-1 text-green-500 font-bold text-xl"
    >
      <Zap className="w-5 h-5 fill-current" />
      +{amount} XP
    </motion.div>
  )
}
