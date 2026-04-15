'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { XPBar } from '@/components/xp-bar'
import { forelleQuest, professorEich } from '@/lib/data'
import { getUserData } from '@/lib/xp'
import { Check } from 'lucide-react'

export default function Home() {
  const [user, setUser] = useState<{ xp: number; completedLevels: ('bronze' | 'silver' | 'gold' | 'anatomy' | 'innerorgans' | 'boss')[] }>({ xp: 0, completedLevels: [] })
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setUser(getUserData())
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <XPBar />
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🎓 LearnCraft</h1>
          <p className="text-gray-600">Lerne alles über die Forelle!</p>
        </div>
        <div className="animate-pulse bg-gray-200 rounded-xl h-64"></div>
      </div>
    )
  }
  
  const bronzeDone = user.completedLevels.includes('bronze')
  const silverDone = user.completedLevels.includes('silver')
  const goldDone = user.completedLevels.includes('gold')
  const anatomyDone = user.completedLevels.includes('anatomy')
  const innerOrgansDone = user.completedLevels.includes('innerorgans')
  const bossUnlocked = bronzeDone && silverDone && goldDone
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <XPBar />
      
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">🎓 LearnCraft</h1>
        <p className="text-gray-600">Lerne alles über die Forelle!</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-6xl">{forelleQuest.emoji}</span>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{forelleQuest.name}</h2>
            <p className="text-gray-600 italic">{forelleQuest.scientificName}</p>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">{forelleQuest.description}</p>
        
        <div className="bg-cyan-50 rounded-lg p-4 mb-4">
          <p className="text-sm text-cyan-800">🌊 Lebensraum: {forelleQuest.habitat}</p>
        </div>
        
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-4xl">{professorEich.avatar}</span>
            <div>
              <p className="font-bold text-amber-800">{professorEich.name}</p>
              <p className="text-gray-700 text-sm">
                {goldDone && bossUnlocked
                  ? professorEich.greetings.boss
                  : goldDone
                    ? 'Wahnsinn! Du hast alle Levels gemeistert! Aber wartest du... da ist noch etwas Besonderes... 💎'
                    : silverDone
                      ? professorEich.greetings.gold
                      : bronzeDone
                        ? professorEich.greetings.silver
                        : professorEich.greetings.bronze
                }
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Bronze */}
        <Link href="/quest/forelle/bronze">
          <div className={`bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer ${bronzeDone ? 'border-yellow-400 opacity-70' : 'border-yellow-400'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{bronzeDone ? '✅' : '🥉'}</span>
                <div>
                  <h3 className={`text-xl font-bold ${bronzeDone ? 'text-yellow-700 line-through' : 'text-yellow-800'}`}>
                    {bronzeDone ? 'Bronze abgeschlossen' : 'Bronze-Level'}
                  </h3>
                  <p className="text-yellow-700">{forelleQuest.levels.bronze.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{forelleQuest.levels.bronze.description}</p>
                </div>
              </div>
              <span className="text-xl font-bold text-yellow-600">+{forelleQuest.levels.bronze.totalXP} XP</span>
            </div>
          </div>
        </Link>
        
        {/* Anatomie - Immer verfügbar */}
        <Link href="/quest/forelle/anatomy">
          <div className={`bg-gradient-to-r from-teal-100 to-cyan-100 border-2 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer ${anatomyDone ? 'border-teal-400 opacity-70' : 'border-teal-400'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{anatomyDone ? '✅' : '🔬'}</span>
                <div>
                  <h3 className={`text-xl font-bold ${anatomyDone ? 'text-teal-700 line-through' : 'text-teal-800'}`}>
                    {anatomyDone ? 'Anatomie abgeschlossen' : 'Anatomie-Labor'}
                  </h3>
                  <p className="text-teal-700">Die Forelle von außen und innen</p>
                  <p className="text-sm text-gray-600 mt-1">Beschriftet das schematische Bild</p>
                </div>
              </div>
              <span className="text-xl font-bold text-teal-600">+60 XP</span>
            </div>
          </div>
        </Link>
        
        {/* Innere Organe - Immer verfügbar */}
        <Link href="/quest/forelle/inner-organs">
          <div className={`bg-gradient-to-r from-rose-100 to-pink-100 border-2 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer ${innerOrgansDone ? 'border-rose-400 opacity-70' : 'border-rose-400'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{innerOrgansDone ? '✅' : '🫀'}</span>
                <div>
                  <h3 className={`text-xl font-bold ${innerOrgansDone ? 'text-rose-700 line-through' : 'text-rose-800'}`}>
                    {innerOrgansDone ? 'Innere Organe abgeschlossen' : 'Innere Organe'}
                  </h3>
                  <p className="text-rose-700">Mit Herzschlag & Atmungsanimation</p>
                  <p className="text-sm text-gray-600 mt-1">6 Organe mit echten Bewegungen</p>
                </div>
              </div>
              <span className="text-xl font-bold text-rose-600">+80 XP</span>
            </div>
          </div>
        </Link>
        
        {/* Silber */}
        {bronzeDone ? (
          <Link href="/quest/forelle/silver">
            <div className={`bg-gradient-to-r from-gray-100 to-gray-50 border-2 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer ${silverDone ? 'border-gray-400 opacity-70' : 'border-gray-400'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{silverDone ? '✅' : '🥈'}</span>
                  <div>
                    <h3 className={`text-xl font-bold ${silverDone ? 'text-gray-700 line-through' : 'text-gray-800'}`}>
                      {silverDone ? 'Silber abgeschlossen' : 'Silber-Level'}
                    </h3>
                    <p className="text-gray-700">{forelleQuest.levels.silver.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{forelleQuest.levels.silver.description}</p>
                  </div>
                </div>
                <span className="text-xl font-bold text-gray-500">+{forelleQuest.levels.silver.totalXP} XP</span>
              </div>
            </div>
          </Link>
        ) : (
          <div className="bg-gradient-to-r from-gray-100 to-gray-50 border-2 border-gray-300 rounded-xl p-6 opacity-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-700">Silber-Level</h3>
                  <p className="text-gray-600">{forelleQuest.levels.silver.title}</p>
                  <p className="text-sm text-gray-500 mt-1">Schließe erst Bronze ab!</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Gold */}
        {silverDone ? (
          <Link href="/quest/forelle/gold">
            <div className={`bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer ${goldDone ? 'border-yellow-500 opacity-70' : 'border-yellow-500'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{goldDone ? '✅' : '🥇'}</span>
                  <div>
                    <h3 className={`text-xl font-bold ${goldDone ? 'text-yellow-700 line-through' : 'text-yellow-800'}`}>
                      {goldDone ? 'Gold abgeschlossen' : 'Gold-Level'}
                    </h3>
                    <p className="text-yellow-700">{forelleQuest.levels.gold.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{forelleQuest.levels.gold.description}</p>
                  </div>
                </div>
                <span className="text-xl font-bold text-yellow-600">+{forelleQuest.levels.gold.totalXP} XP</span>
              </div>
            </div>
          </Link>
        ) : (
          <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-300 rounded-xl p-6 opacity-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <h3 className="text-xl font-bold text-yellow-700">Gold-Level</h3>
                  <p className="text-yellow-600">{forelleQuest.levels.gold.title}</p>
                  <p className="text-sm text-gray-500 mt-1">Schließe erst Silber ab!</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Boss-Level */}
        {bossUnlocked ? (
          <Link href="/quest/forelle/boss">
            <div className="bg-gradient-to-r from-purple-100 to-purple-50 border-2 border-purple-500 rounded-xl p-6 hover:shadow-xl transition-all cursor-pointer mt-4 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💎</span>
                  <div>
                    <h3 className="text-xl font-bold text-purple-800">
                      🔥 BOSS-LEVEL 🔥
                    </h3>
                    <p className="text-purple-700">{forelleQuest.levels.boss.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{forelleQuest.levels.boss.description}</p>
                  </div>
                </div>
                <span className="text-xl font-bold text-purple-600">+{forelleQuest.levels.boss.totalXP} XP</span>
              </div>
            </div>
          </Link>
        ) : (
          <div className="bg-gradient-to-r from-gray-100 to-gray-50 border-2 border-gray-300 rounded-xl p-6 opacity-50 mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-700">💎 Boss-Level</h3>
                  <p className="text-gray-600">Die ultimative Challenge</p>
                  <p className="text-sm text-gray-500 mt-1">Schließe alle 3 Level ab, um den Boss zu entsperren!</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {goldDone && !bossUnlocked && (
        <div className="mt-6 bg-gradient-to-r from-green-100 to-green-50 border-2 border-green-400 rounded-xl p-6 text-center">
          <div className="text-4xl mb-2">🏆</div>
          <h3 className="text-xl font-bold text-green-800 mb-2">Quest abgeschlossen!</h3>
          <p className="text-green-700">Du bist bereit für die Klassenarbeit am 11. Mai! 🎯</p>
          <p className="text-purple-600 mt-2 text-sm">Aber wartet... da ist noch eine geheime Challenge...</p>
        </div>
      )}
      
      {bossUnlocked && (
        <div className="mt-6 bg-gradient-to-r from-purple-100 to-purple-50 border-2 border-purple-500 rounded-xl p-6 text-center">
          <div className="text-4xl mb-2">👑</div>
          <h3 className="text-xl font-bold text-purple-800 mb-2">Forellen-MEISTER!</h3>
          <p className="text-purple-700">Du hast ALLE Level gemeistert! Absolute Legende! 🏆💎🔥</p>
          <p className="text-gray-600 mt-2">Gesamte XP: {user.xp} / 375</p>
        </div>
      )}
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Klassenarbeit: 11. Mai 2026</p>
        <p className="mt-1">Gesamte XP: {user.xp} / 515</p>
      </div>
    </div>
  )
}
