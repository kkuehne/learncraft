'use client'

import { useState } from 'react'
import { HabitatTour } from '@/components/habitat-tour'
import { KnowledgeSnippets } from '@/components/knowledge-snippets'
import { MatchLearn } from '@/components/match-learn'
import { addXP } from '@/lib/xp'
import { trainingCampData } from '@/lib/training-camp'
import { ForellenSteckbrief } from '@/components/forellen-steckbrief'
import { Map, BookOpen, Puzzle, FileText, ChevronLeft, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

type TabId = 'habitat' | 'snippets' | 'match' | 'steckbrief'

export default function TrainingCampPage() {
  const [activeTab, setActiveTab] = useState<TabId>('habitat')
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set())
  const [totalXP, setTotalXP] = useState(0)

  const handleActivityComplete = (activityId: string, xp: number) => {
    if (!completedActivities.has(activityId)) {
      setCompletedActivities(prev => new Set([...prev, activityId]))
      setTotalXP(prev => prev + xp)
      addXP(xp, `training-camp-${activityId}`)
    }
  }

  const allCompleted = completedActivities.size === 4

  const tabs = [
    { 
      id: 'habitat' as TabId, 
      label: 'Habitat-Tour', 
      mobileLabel: 'Tour',
      icon: <Map className="w-5 h-5" />, 
      completedIcon: <CheckCircle className="w-5 h-5 text-green-500" />,
      activeColor: 'text-emerald-700'
    },
    { 
      id: 'snippets' as TabId, 
      label: 'Wissen', 
      mobileLabel: 'Wissen',
      icon: <BookOpen className="w-5 h-5" />, 
      completedIcon: <CheckCircle className="w-5 h-5 text-green-500" />,
      activeColor: 'text-purple-700'
    },
    { 
      id: 'match' as TabId, 
      label: 'Match-Spiel', 
      mobileLabel: 'Match',
      icon: <Puzzle className="w-5 h-5" />, 
      completedIcon: <CheckCircle className="w-5 h-5 text-green-500" />,
      activeColor: 'text-blue-700'
    },
    { 
      id: 'steckbrief' as TabId, 
      label: 'Steckbrief', 
      mobileLabel: 'Steckbrief',
      icon: <FileText className="w-5 h-5" />, 
      completedIcon: <CheckCircle className="w-5 h-5 text-green-500" />,
      activeColor: 'text-teal-700'
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 via-emerald-900 to-teal-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link href="/">
            <button className="flex items-center gap-2 text-emerald-200 hover:text-white transition-colors mb-4">
              <ChevronLeft className="w-5 h-5" />
              Zurück zum Lernpfad
            </button>
          </Link>
          
          <div className="text-6xl mb-4">🏕️</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {trainingCampData.name}
          </h1>
          <p className="text-emerald-200 max-w-2xl mx-auto">
            {trainingCampData.description}
          </p>
          
          {/* XP Progress */}
          <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4 max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">
                Fortschritt: {completedActivities.size} / 4 Aktivitäten
              </span>
              <span className="text-yellow-400 font-bold">{totalXP} XP</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <motion.div 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(completedActivities.size / 4) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Custom Tabs */}
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2 bg-white/10 backdrop-blur-sm p-2 rounded-2xl">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              const isCompleted = completedActivities.has(tab.id)
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center gap-2 rounded-xl py-3 transition-all
                    ${isActive 
                      ? 'bg-white shadow-lg ' + tab.activeColor
                      : 'text-white/70 hover:text-white'
                    }
                  `}
                >
                  {isCompleted ? tab.completedIcon : tab.icon}
                  <span className="hidden md:inline font-medium">{tab.label}</span>
                  <span className="md:hidden font-medium">{tab.mobileLabel}</span>
                </button>
              )
            })}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'habitat' && (
                <HabitatTour onComplete={(xp) => handleActivityComplete('habitat', xp)} />
              )}
              {activeTab === 'snippets' && (
                <KnowledgeSnippets onComplete={(xp) => handleActivityComplete('snippets', xp)} />
              )}
              {activeTab === 'match' && (
                <MatchLearn onComplete={(xp) => handleActivityComplete('match', xp)} />
              )}
              {activeTab === 'steckbrief' && (
                <ForellenSteckbrief onComplete={(xp) => handleActivityComplete('steckbrief', xp)} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Completion Message */}
        {allCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl p-6 text-white text-center shadow-2xl"
          >
            <div className="text-5xl mb-3">🎓</div>
            <h2 className="text-2xl font-bold mb-2">Training Camp gemeistert!</h2>
            <p className="mb-4">Du bist bereit für die nächsten Stationen!</p>
            <Link href="/">
              <button className="bg-white text-orange-600 font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform">
                Weiter zum Lernpfad →
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}
