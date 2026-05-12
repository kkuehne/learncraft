'use client'

import { motion } from 'framer-motion'

interface TheologyMasterProps {
  isOpen: boolean
  onClose: () => void
}

export function TheologyMaster({ isOpen, onClose }: TheologyMasterProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-amber-100 to-yellow-200 rounded-3xl p-8 max-w-lg w-full text-center shadow-2xl border-4 border-amber-500"
      >
        <div className="text-6xl mb-4">👑</div>
        <h2 className="text-3xl font-bold text-amber-900 mb-4">Theologie-Meister!</h2>
        <p className="text-amber-800 text-lg mb-8">
          Du hast alle Module des Theologie-Labs gemeistert und ein tiefes Verständnis für die Grundlagen des Glaubens erworben!
        </p>
        <button 
          onClick={onClose}
          className="bg-amber-600 text-white font-bold py-3 px-8 rounded-full hover:bg-amber-700 transition-colors shadow-lg"
        >
          Großartig!
        </button>
      </motion.div>
    </div>
  )
}
