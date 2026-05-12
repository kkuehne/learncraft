'use client'

import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { getBiomeById } from '@/lib/biomes'
import { notFound } from 'next/navigation'

// Imports for the specific station components
// Since these are complex, we'll use a dispatcher pattern
import TrainingCamp from '@/components/stations/training-camp'
import AnatomyLab from '@/components/stations/anatomy-lab'
import PhysiologyLab from '@/components/stations/physiology-lab'
import TheologyLab from '@/components/stations/theology-lab'
import QuizStation from '@/components/stations/quiz-station'
import BossArena from '@/components/stations/boss-arena'

export default function DynamicQuestPage() {
  const params = useParams()
  const { biomeId, stationId } = params

  if (!biomeId || !stationId) {
    return notFound()
  }

  const biome = getBiomeById(biomeId as string)

  if (!biome) {
    return notFound()
  }

  // Dispatcher logic to determine which component to render
  const renderStation = () => {
    switch (stationId as string) {
      case 'training-camp':
      case 'religion-training-camp':
        return <TrainingCamp biomeId={biomeId as string} />
      
      case 'anatomy-lab':
        return <AnatomyLab biomeId={biomeId as string} />
      
      case 'physiology-lab':
        return <PhysiologyLab biomeId={biomeId as string} />
      
      case 'theology-lab':
        return <TheologyLab biomeId={biomeId as string} />
      
      case 'quiz':
      case 'religion-quiz':
        return <QuizStation biomeId={biomeId as string} />
      
      case 'boss-arena':
      case 'religion-boss':
        return <BossArena biomeId={biomeId as string} />
      
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen text-white">
            <h1 className="text-4xl font-bold mb-4">Station nicht gefunden</h1>
            <p className="text-xl mb-8">Die gewünschte Station {stationId} existiert in diesem Biom nicht.</p>
            <a href={`/biomes/${biomeId}`} className="bg-white text-black px-6 py-2 rounded-full font-bold">
              Zurück zum Lernpfad
            </a>
          </div>
        )
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${biomeId}-${stationId}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderStation()}
      </motion.div>
    </AnimatePresence>
  )
}
