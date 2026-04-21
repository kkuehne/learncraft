'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Fish, BookOpen, ChevronRight } from 'lucide-react'

// Biome Definitionen
const biomes = [
  {
    id: 'biology',
    name: 'Biologie',
    emoji: '🐟',
    icon: Fish,
    description: 'Die Bachforelle - Anatomie, Physiologie und Lebensweise',
    color: 'from-blue-900 via-cyan-900 to-blue-950',
    route: '/biomes/biology',
    accent: 'cyan',
    available: true
  },
  {
    id: 'religion',
    name: 'Religion',
    emoji: '📖',
    icon: BookOpen,
    description: 'Das Alte Testament - Schöpfung, Bund und Gesetz',
    color: 'from-amber-900 via-orange-900 to-amber-950',
    route: '/biomes/religion',
    accent: 'amber',
    available: true
  }
]

export default function Home() {
  const [selectedBiome, setSelectedBiome] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-4">🎓</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            LearnCraft
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Wähle dein Lerngebiet und starte deine Entdeckungsreise!
          </p>
        </motion.div>

        {/* Biome Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {biomes.map((biome, index) => {
            const Icon = biome.icon
            return (
              <motion.div
                key={biome.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={biome.route}>
                  <div 
                    className={`group relative overflow-hidden rounded-3xl p-8 cursor-pointer
                      bg-gradient-to-br ${biome.color} 
                      border-2 border-white/20 hover:border-white/40
                      transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 right-4 text-8xl">{biome.emoji}</div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`p-4 rounded-2xl bg-white/10 backdrop-blur-sm`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-white">{biome.name}</h2>
                          <div className="text-3xl">{biome.emoji}</div>
                        </div>
                      </div>
                      
                      <p className="text-white/80 mb-6 leading-relaxed">
                        {biome.description}
                      </p>
                      
                      <div className={`flex items-center gap-2 text-${biome.accent}-300 font-bold`}>
                        <span>Entdeckungsreise starten</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-t from-white to-transparent" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Info Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl">
            <h3 className="text-xl font-bold text-white mb-3">
              🎮 Wie funktioniert LearnCraft?
            </h3>
            <ul className="text-slate-300 space-y-2 text-left">
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">⭐</span>
                <span>Sammle XP durch Lernen und Quizze</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">🧪</span>
                <span>Entdecke interaktive Labs mit Animationen</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">🏆</span>
                <span>Meistere die Boss-Arena für den Abschluss</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
