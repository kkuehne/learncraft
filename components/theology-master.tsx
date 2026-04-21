'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { speak, stopSpeaking } from '@/lib/speech'
import { Check, BookOpen, ArrowRight, X } from 'lucide-react'
import { motion } from 'framer-motion'

interface TheologyMasterProps {
  isOpen: boolean
  onClose: () => void
}

export function TheologyMaster({ isOpen, onClose }: TheologyMasterProps) {
  const hasSpoken = useRef(false)

  useEffect(() => {
    if (isOpen && !hasSpoken.current) {
      hasSpoken.current = true
      speak('Hervorragend! Du hast das Theologie Lab gemeistert! Schöpfung, Bund, Exodus und Propheten - du bist ein wahrer Bibel-Experte!')
    }
    
    return () => stopSpeaking()
  }, [isOpen])

  const handleClose = () => {
    stopSpeaking()
    onClose()
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 border-4 border-amber-400 rounded-3xl p-8 text-center max-w-lg w-full shadow-2xl relative"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-6xl mb-4">📖</div>
        
        <h1 className="text-3xl font-bold text-amber-800 mb-2">
          Theologie gemeistert!
        </h1>
        
        <p className="text-amber-700 mb-6">
          Du verstehst jetzt die Grundlagen des Alten Testaments!
        </p>

        <div className="bg-white/50 rounded-xl p-4 mb-6">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span className="font-semibold text-gray-700 text-sm">Schöpfung</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span className="font-semibold text-gray-700 text-sm">Bund</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span className="font-semibold text-gray-700 text-sm">Exodus</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span className="font-semibold text-gray-700 text-sm">Propheten</span>
            </div>
          </div>
          
          <div className="text-2xl font-bold text-amber-600">
            = Bibel-Experte! 🎓
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/biomes/religion"
            onClick={handleClose}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
          >
            <BookOpen className="w-5 h-5" />
            Zum Quiz →
          </Link>

          <button
            onClick={handleClose}
            className="flex items-center justify-center gap-2 bg-gray-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-600 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            Weiter lernen
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
