'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { getUserData, completeLevel } from '@/lib/xp'
import { speak, stopSpeaking } from '@/lib/speech'
import { Check, Microscope, ArrowRight, X } from 'lucide-react'
import { motion } from 'framer-motion'

interface AnatomyMasterProps {
  onClose: () => void
}

export function AnatomyMaster({ onClose }: AnatomyMasterProps) {
  useEffect(() => {
    completeLevel('anatomy')
    completeLevel('innerorgans')
    speak('Hervorragend! Du hast die komplette Forellen-Anatomie gemeistert! Äußere Form und innere Organe - du bist ein wahrer Experte!')
    
    return () => stopSpeaking()
  }, [])

  const handleClose = () => {
    stopSpeaking()
    onClose()
  }

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
        className="bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-100 border-4 border-blue-400 rounded-3xl p-8 text-center max-w-lg w-full shadow-2xl"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-6xl mb-4">🔬</div>
        
        <h1 className="text-3xl font-bold text-blue-800 mb-2">
          Anatomie gemeistert!
        </h1>
        
        <p className="text-blue-700 mb-6">
          Du hast die komplette Forellen-Anatomie erforscht!
        </p>

        <div className="bg-white/50 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span className="font-semibold text-gray-700">Äußere Anatomie</span>
            </div>
            <span className="text-gray-400">+</span>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span className="font-semibold text-gray-700">Innere Organe</span>
            </div>
          </div>
          
          <div className="text-2xl font-bold text-blue-600">
            = Kompletter Experte! 🎓
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/quest/forelle/boss"
            onClick={handleClose}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
          >
            <Microscope className="w-5 h-5" />
            Zur Boss-Arena →
          </Link>

          <button
            onClick={handleClose}
            className="flex items-center justify-center gap-2 bg-gray-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-600 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            Weiter lernen
          </button>

          <Link
            href="/"
            onClick={handleClose}
            className="text-blue-600 hover:underline text-sm"
          >
            ← Zurück zum Lernpfad
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}
