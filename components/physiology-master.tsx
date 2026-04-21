'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { speak, stopSpeaking } from '@/lib/speech'
import { Check, Microscope, ArrowRight, X } from 'lucide-react'
import { motion } from 'framer-motion'

interface PhysiologyMasterProps {
  isOpen: boolean
  onClose: () => void
}

export function PhysiologyMaster({ isOpen, onClose }: PhysiologyMasterProps) {
  const hasSpoken = useRef(false)

  useEffect(() => {
    if (isOpen && !hasSpoken.current) {
      hasSpoken.current = true
      speak('Brilliant! Du hast das Physiologie Lab gemeistert! Gegenstromprinzip, Temperatur-Regulation, Fortpflanzung und Wild-vs-Zucht-Unterschiede - du verstehst wie die Forelle funktioniert!')
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
        className="bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-100 border-4 border-teal-400 rounded-3xl p-8 text-center max-w-lg w-full shadow-2xl relative"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-6xl mb-4">🧪</div>
        
        <h1 className="text-3xl font-bold text-teal-800 mb-2">
          Physiologie gemeistert!
        </h1>
        
        <p className="text-teal-700 mb-6">
          Du verstehst jetzt, wie die Forelle funktioniert!
        </p>

        <div className="bg-white/50 rounded-xl p-4 mb-6">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span className="font-semibold text-gray-700 text-sm">Gegenstrom</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span className="font-semibold text-gray-700 text-sm">Temperatur</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span className="font-semibold text-gray-700 text-sm">Fortpflanzung</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span className="font-semibold text-gray-700 text-sm">Wild vs. Zucht</span>
            </div>
          </div>
          
          <div className="text-2xl font-bold text-teal-600">
            = Funktions-Experte! 🎓
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
            className="text-teal-600 hover:underline text-sm"
          >
            ← Zurück zum Lernpfad
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}
