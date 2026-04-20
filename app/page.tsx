'use client'

import { useState, useEffect } from 'react'
import { LearningPath } from '@/components/learning-path'
import { XPBar } from '@/components/xp-bar'
import { forelleQuest, professorEich, learningPath } from '@/lib/data'
import { getUserData, getTotalXP } from '@/lib/xp'

export default function Home() {
  const [user, setUser] = useState<{ xp: number; completedLevels: string[] }>({ xp: 0, completedLevels: [] })
  const [currentStation, setCurrentStation] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    const data = getUserData()
    setUser(data)
    setMounted(true)
    
    // Aktuelle Station basierend auf XP ermitteln
    const xp = getTotalXP()
    const stations = learningPath.stations
    for (let i = stations.length - 1; i >= 0; i--) {
      if (xp >= stations[i].requiredXP) {
        setCurrentStation(stations[i].id)
        break
      }
    }
  }, [])

  const handleSelectStation = (stationId: string) => {
    // Navigation zu den verschiedenen Stationen
    switch (stationId) {
      case 'training-camp':
        window.location.href = '/quest/forelle/bronze'
        break
      case 'anatomy-lab':
        window.location.href = '/quest/forelle/anatomy'
        break
      case 'quiz':
        // Quiz hat Unter-Level (Bronze, Silber, Gold)
        const xp = getTotalXP()
        if (xp < 125) {
          window.location.href = '/quest/forelle/bronze'
        } else if (xp < 200) {
          window.location.href = '/quest/forelle/silver'
        } else {
          window.location.href = '/quest/forelle/gold'
        }
        break
      case 'boss-arena':
        window.location.href = '/quest/forelle/boss'
        break
    }
  }
  
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 via-cyan-900 to-blue-950">
        <div className="container mx-auto px-4 py-8">
          <XPBar />
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">🦫 LearnCraft</h1>
            <p className="text-cyan-200">Dein Lernpfad zur Forellen-Expertise</p>
          </div>
          
          <div className="animate-pulse bg-white/10 rounded-xl h-96 max-w-2xl mx-auto"></div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-cyan-900 to-blue-950">
      <div className="container mx-auto px-4 py-8">
        <XPBar />
        
        <LearningPath 
          onSelectStation={handleSelectStation}
          currentStation={currentStation}
        />
      </div>
    </div>
  )
}
