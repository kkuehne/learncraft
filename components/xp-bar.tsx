'use client'

import { useState, useEffect } from 'react'
import { getUserData, getProgress, getLevel } from '@/lib/xp'

export function XPBar() {
  const [mounted, setMounted] = useState(false)
  const [userData, setUserData] = useState({ xp: 0 })
  
  useEffect(() => {
    setMounted(true)
    setUserData(getUserData())
  }, [])
  
  // Verhindere Hydration-Mismatch
  if (!mounted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-gray-800">Level: BRONZE</span>
          <span className="text-sm text-gray-600">0 XP</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div className="h-4 rounded-full bg-yellow-700" style={{ width: '0%' }} />
        </div>
      </div>
    )
  }
  
  const progress = getProgress(userData.xp)
  const level = getLevel(userData.xp)
  
  const levelColors = {
    bronze: 'bg-yellow-700',
    silver: 'bg-gray-400',
    gold: 'bg-yellow-400',
    anatomy: 'bg-teal-500',
    boss: 'bg-purple-600'
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-gray-800">Level: {level.toUpperCase()}</span>
        <span className="text-sm text-gray-600">{userData.xp} XP</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className={`h-4 rounded-full transition-all duration-500 ${levelColors[level]}`}
          style={{ width: `${Math.min(100, progress.percent)}%` }}
        />
      </div>
      
      <p className="text-xs text-gray-500 mt-1">
        {progress.current} / {progress.next} XP bis nächstes Level
      </p>
    </div>
  )
}
