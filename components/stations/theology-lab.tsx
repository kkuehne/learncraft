'use client'

import { useState } from 'react'
import { theologyModules } from '@/lib/theology-lab'
import { SchöpfungModule } from './schöpfung-module'
import { KirchenjahrModule } from './kirchenjahr-module'
import { BundModule } from './bund-module'
import { ProphetenModule } from './propheten-module'
import { TheologyMaster } from './theology-master'
import { Calendar, Globe, Heart, Megaphone, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { completeLevel } from '@/lib/xp'

interface TheologyLabProps {
  onComplete?: (success: boolean) => void
  biomeId?: string
}

export default function TheologyLab({ onComplete, biomeId = 'religion' }: TheologyLabProps) {
  const [activeTab, setActiveTab] = useState<string>('schöpfung')
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set())
  const [showMasterModal, setShowMasterModal] = useState(false)

  const handleModuleComplete = (moduleId: string) => {
    if (!completedModules.has(moduleId)) {
      const newCompleted = new Set(completedModules)
      newCompleted.add(moduleId)
      setCompletedModules(newCompleted)
      completeLevel(moduleId as any)
      
      if (newCompleted.size === theologyModules.length) {
        setTimeout(() => setShowMasterModal(true), 500)
      } else {
        const currentIndex = theologyModules.findIndex(m => m.id === moduleId)
        const nextModule = theologyModules.slice(currentIndex + 1).find(m => !newCompleted.has(m.id))
        if (nextModule) setActiveTab(nextModule.id)
      }
    }
  }

  const handleCloseMasterModal = () => {
    setShowMasterModal(false)
  }

  const tabIcons: Record<string, React.ReactNode> = {
    schöpfung: <Globe size={24} />,
    kirchenjahr: <Calendar size={24} />,
    bund: <Heart size={24} />,
    propheten: <Megaphone size={24} />,
  }

  const activeModule = theologyModules.find(m => m.id === activeTab)
  const isModuleCompleted = (id: string) => completedModules.has(id)
  const allModulesComplete = completedModules.size === theologyModules.length

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 via-orange-900 to-amber-950">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 bg-amber-800/30 rounded-xl p-4">
          <h1 className="text-2xl font-bold text-white mb-2">📖 Theologie Lab</h1>
          <p className="text-amber-200 text-sm">
            Erforsche die Grundlagen des Glaubens und die Geschichte der Schöpfung.
            <strong className="text-yellow-300"> {allModulesComplete ? '🎉 Alle Module abgeschlossen!' : `(${completedModules.size}/${theologyModules.length} fertig)`}</strong>
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 flex flex-wrap justify-center gap-2">
            {theologyModules.map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveTab(module.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl font-bold transition-all relative ${
                  activeTab === module.id
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-105'
                    : 'text-amber-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2">
                    {tabIcons[module.id]}
                    {isModuleCompleted(module.id) && <span className="text-yellow-300">✓</span>}
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

        {activeModule && (
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              {activeModule.emoji} {activeModule.title}
            </h2>
            <p className="text-amber-200">{activeModule.description}</p>
          </div>
        )}

        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6">
          {activeTab === 'schöpfung' && (
            <SchöpfungModule 
              onComplete={() => handleModuleComplete('schöpfung')} 
              isCompleted={isModuleCompleted('schöpfung')}
            />
          )}
          {activeTab === 'kirchenjahr' && (
            <KirchenjahrModule 
              onComplete={() => handleModuleComplete('kirchenjahr')} 
              isCompleted={isModuleCompleted('kirchenjahr')}
            />
          )}
          {activeTab === 'bund' && (
            <BundModule 
              onComplete={() => handleModuleComplete('bund')} 
              isCompleted={isModuleCompleted('bund')}
            />
          )}
          {activeTab === 'propheten' && (
            <ProphetenModule 
              onComplete={() => handleModuleComplete('propheten')} 
              isCompleted={isModuleCompleted('propheten')}
            />
          )}
        </div>
      </div>

      <TheologyMaster 
        isOpen={showMasterModal} 
        onClose={handleCloseMasterModal} 
      />
    </div>
  )
}
