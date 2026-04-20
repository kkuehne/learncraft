'use client'

import { useState } from 'react'
import { forellenSteckbrief } from '@/lib/training-camp'
import { speak } from '@/lib/speech'
import { MapPin, Ruler, Scale, Clock, Users, CheckCircle, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { XPReward } from '@/components/xp-reward'

interface ForellenSteckbriefProps {
  onComplete: (earnedXP: number) => void
}

export function ForellenSteckbrief({ onComplete }: ForellenSteckbriefProps) {
  const [readSections, setReadSections] = useState<Set<string>>(new Set())
  const [completed, setCompleted] = useState(false)
  const [showFunFact, setShowFunFact] = useState<number | null>(null)
  const [showReward, setShowReward] = useState(false)

  const markAsRead = (sectionId: string) => {
    if (!readSections.has(sectionId)) {
      const newRead = new Set(readSections)
      newRead.add(sectionId)
      setReadSections(newRead)
      
      // Check if at least 3 sections read
      if (newRead.size >= 3 && !completed) {
        setCompleted(true)
        setShowReward(true)
        setTimeout(() => onComplete(20), 2500)
      }
    }
  }

  const sections = [
    { id: 'basis', data: forellenSteckbrief.basisDaten, type: 'basis' },
    { id: 'lebensraum', data: forellenSteckbrief.lebensraum, type: 'list' },
    { id: 'nahrung', data: forellenSteckbrief.nahrung, type: 'list' },
    { id: 'fortpflanzung', data: forellenSteckbrief.fortPflanzung, type: 'list' },
    { id: 'besonderheiten', data: forellenSteckbrief.besonderheiten, type: 'list' },
    { id: 'bedrohungen', data: forellenSteckbrief.bedrohungen, type: 'list' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="text-5xl">📋</div>
          <div>
            <h2 className="text-2xl font-bold">{forellenSteckbrief.title}</h2>
            <p className="text-teal-100">{forellenSteckbrief.subtitle}</p>
          </div>
        </div>
        
        <div className="mt-4 flex items-center gap-4 text-sm">
          <div className="bg-white/20 rounded-full px-4 py-2">
            Gelesen: {readSections.size} / 6 Abschnitte
          </div>
          {completed && (
            <div className="bg-green-400 text-teal-900 rounded-full px-4 py-2 font-bold">
              ✓ +20 XP!
            </div>
          )}
        </div>
      </div>

      {/* Basis Daten Karte */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6"
        onClick={() => markAsRead('basis')}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-teal-100 p-3 rounded-xl">
            <span className="text-3xl">🐟</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{forellenSteckbrief.basisDaten.name}</h3>
            <p className="text-gray-500 italic">{forellenSteckbrief.basisDaten.wissenschaftlicherName}</p>
          </div>
          
          {readSections.has('basis') && (
            <CheckCircle className="w-6 h-6 text-green-500 ml-auto" />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
              <Users className="w-4 h-4" />
              Familie
            </div>
            <div className="font-semibold text-gray-800">{forellenSteckbrief.basisDaten.familie}</div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
              <Ruler className="w-4 h-4" />
              Größe
            </div>
            <div className="font-semibold text-gray-800">{forellenSteckbrief.basisDaten.groesse}</div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
              <Scale className="w-4 h-4" />
              Gewicht
            </div>
            <div className="font-semibold text-gray-800">{forellenSteckbrief.basisDaten.gewicht}</div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
              <Clock className="w-4 h-4" />
              Lebensdauer
            </div>
            <div className="font-semibold text-gray-800">{forellenSteckbrief.basisDaten.lebensdauer}</div>
          </div>
        </div>
      </motion.div>

      {/* Info Sections */}
      <div className="grid md:grid-cols-2 gap-4">
        {sections.filter(s => s.type === 'list').map((section, idx) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => markAsRead(section.id)}
            className={`bg-white rounded-2xl shadow-lg p-5 cursor-pointer transition-all hover:shadow-xl
              ${readSections.has(section.id) ? 'border-l-4 border-green-400' : 'border-l-4 border-teal-400'}
            `}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="text-3xl">{section.data.icon}</div>
              <h3 className="text-lg font-bold text-gray-800">{section.data.title}</h3>
              {readSections.has(section.id) && (
                <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
              )}
            </div>
            
            <ul className="space-y-2">
              {section.data.items.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                  <span className="text-teal-500 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Fun Facts */}
      <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-amber-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🎉</span>
          Wusstest du schon?
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {forellenSteckbrief.funFacts.map((fact, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowFunFact(idx)
                speak(fact.text)
              }}
              className="bg-white rounded-xl p-4 text-left shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-2">{fact.emoji}</div>
              <p className="text-sm text-gray-700">{fact.text}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Completion Banner */}
      {completed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white text-center shadow-xl"
        >
          <div className="text-5xl mb-3">🎓</div>
          <h3 className="text-xl font-bold mb-2">Steckbrief gelesen!</h3>
          <p>Du kennst jetzt alle wichtigen Daten zur Forelle!</p>
        </motion.div>
      )}

      <XPReward 
        amount={20}
        show={showReward}
        message="Steckbrief entdeckt!"
      />
    </div>
  )
}
