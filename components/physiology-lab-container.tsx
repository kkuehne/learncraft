'use client'

import { useState } from 'react'
import { physiologyModules } from '@/lib/physiology-lab'
import { GegenstromModule } from './gegenstrom-module'
import { TemperaturModule } from './temperatur-module'
import { FortpflanzungModule } from './fortpflanzung-module'
import { WildVsZuchtModule } from './wild-vs-zucht-module'
import { PhysiologyMaster } from './physiology-master'
import { RefreshCw, Thermometer, Heart, Scale, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { completeLevel, hasSeenMasterCelebration, markMasterCelebrationSeen } from '@/lib/xp'

interface PhysiologyLabContainerProps {
  onComplete?: (success: boolean) => void
}

export function PhysiologyLabContainer({ onComplete }: PhysiologyLabContainerProps) {
  const [activeTab, setActiveTab] = useState<string>('gegenstrom')
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set())
  const [showMasterModal, setShowMasterModal] = useState(false)

  const handleModuleComplete = (moduleId: string) => {
    if (!completedModules.has(moduleId)) {
      const newCompleted = new Set(completedModules)
      newCompleted.add(moduleId)
      setCompletedModules(newCompleted)
      
      // Mark this module as complete in XP system
      completeLevel(moduleId as any)
      
      // Check if all modules complete
      if (newCompleted.size === physiologyModules.length) {
        setTimeout(() => {
          setShowMasterModal(true)
        }, 500)
      } else {
        // Auto-switch to next incomplete module
        const currentIndex = physiologyModules.findIndex(m => m.id === moduleId)
        const nextModule = physiologyModules.slice(currentIndex + 1).find(m => !newCompleted.has(m.id))
        if (nextModule) {
          setActiveTab(nextModule.id)
        }
      }
    }
  }

  const handleCloseMasterModal = () => {
    setShowMasterModal(false)
    markMasterCelebrationSeen('physiology')
  }

  const tabIcons: Record<string, React.ReactNode> = {
    gegenstrom: <RefreshCw size={24} />,
    temperatur: <Thermometer size={24} />,
    fortpflanzung: <Heart size={24} />,
    'wild-vs-zucht': <Scale size={24} />,
  }

  const activeModule = physiologyModules.find(m => m.id === activeTab)
  const isModuleCompleted = (id: string) => completedModules.has(id)
  const allModulesComplete = completedModules.size === physiologyModules.length

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-cyan-900 to-blue-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6 bg-blue-800/30 rounded-xl p-4">
          <h1 className="text-2xl font-bold text-white mb-2">🧪 Physiologie Lab</h1>
          <p className="text-cyan-200 text-sm">
            Verstehe, wie die Forelle funktioniert. Erkunde alle 4 Module!
            <strong className="text-yellow-300"> {allModulesComplete ? '🎉 Alle Module abgeschlossen!' : `(${completedModules.size}/${physiologyModules.length} fertig)`}</strong>
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 flex flex-wrap justify-center gap-2">
            {physiologyModules.map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveTab(module.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl font-bold transition-all relative ${
                  activeTab === module.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg scale-105'
                    : 'text-cyan-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2">
                    {tabIcons[module.id]}
                    {isModuleCompleted(module.id) && (
                      <span className="text-yellow-300">✓</span>
                    )}
                  </div>
                  <div className="text-left mt-1">
                    <div className="text-sm">{module.emoji}</div>
                    <div className="text-xs opacity-80">{module.xp} XP</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Active Module Header */}
        {activeModule && (
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              {activeModule.emoji} {activeModule.title}
            </h2>
            <p className="text-cyan-200">{activeModule.description}</p>
          </div>
        )}

        {/* Module Content */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6">
          {activeTab === 'gegenstrom' && (
            <GegenstromModule 
              onComplete={() => handleModuleComplete('gegenstrom')} 
              isCompleted={isModuleCompleted('gegenstrom')}
            />
          )}
          {activeTab === 'temperatur' && (
            <TemperaturModule 
              onComplete={() => handleModuleComplete('temperatur')} 
              isCompleted={isModuleCompleted('temperatur')}
            />
          )}
          {activeTab === 'fortpflanzung' && (
            <FortpflanzungModule 
              onComplete={() => handleModuleComplete('fortpflanzung')} 
              isCompleted={isModuleCompleted('fortpflanzung')}
            />
          )}
          {activeTab === 'wild-vs-zucht' && (
            <WildVsZuchtModule 
              onComplete={() => handleModuleComplete('wild-vs-zucht')} 
              isCompleted={isModuleCompleted('wild-vs-zucht')}
            />
          )}
        </div>
      </div>

      {/* Master Modal */}
      <PhysiologyMaster 
        isOpen={showMasterModal} 
        onClose={handleCloseMasterModal} 
      />
    </div>
  )
}
