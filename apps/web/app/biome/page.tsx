'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { speak, getWelcomeMessage } from '@/lib/tutor'
import { forelleQuest, tutorConfig } from '@/plugins/biology-fishes/content/quests'

export default function BiomePage() {
  const [hasStarted, setHasStarted] = useState(false)
  const [welcomeSpoken, setWelcomeSpoken] = useState(false)

  // Professor Eich begrüßt beim ersten Besuch
  useEffect(() => {
    if (!welcomeSpoken && !hasStarted) {
      const message = getWelcomeMessage('new')
      speak(message)
      setWelcomeSpoken(true)
    }
  }, [welcomeSpoken, hasStarted])

  return (
    <main className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header mit Professor Eich */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2 border-minecraft-water">
          <div className="flex items-start gap-4">
            <div className="text-6xl">{tutorConfig.avatar}</div>
            <div className="flex-1">
              <h1 className="font-pixel text-3xl text-minecraft-water mb-2">
                {tutorConfig.name}
              </h1>
              <p className="text-gray-700 text-lg">
                {!hasStarted 
                  ? getWelcomeMessage('new')
                  : "Bereit für die nächste Challenge? Klick auf ein Level!"
                }
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => speak(getWelcomeMessage('new'))}
                className="mt-2"
              >
                🔊 Nochmal vorlesen
              </Button>
            </div>
          </div>
        </div>

        {/* Forelle-Übersicht */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{forelleQuest.emoji}</span>
            <div>
              <h2 className="font-pixel text-3xl text-gray-800">{forelleQuest.name}</h2>
              <p className="text-gray-600 italic">{forelleQuest.scientificName}</p>
            </div>
          </div>
          
          <p className="text-gray-700 mb-2">{forelleQuest.description}</p>
          <p className="text-sm text-minecraft-water mb-4">
            🌊 Lebensraum: {forelleQuest.habitat}
          </p>
          
          <div className="bg-cyan-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              🎯 <strong>Klassenarbeit am 11. Mai:</strong> Noch 4 Wochen! 
              Meistere alle 3 Level, um perfekt vorbereitet zu sein.
            </p>
          </div>
        </div>

        {/* Level-Auswahl */}
        <div className="grid md:grid-cols-3 gap-6">
          <LevelCard 
            level="bronze" 
            emoji="🥉" 
            title={forelleQuest.levels.bronze.title}
            description={forelleQuest.levels.bronze.description}
            xp={forelleQuest.levels.bronze.xpReward}
            isLocked={false}
            onClick={() => setHasStarted(true)}
          />
          
          <LevelCard 
            level="silver" 
            emoji="🥈" 
            title={forelleQuest.levels.silver.title}
            description={forelleQuest.levels.silver.description}
            xp={forelleQuest.levels.silver.xpReward}
            isLocked={true}
            lockedReason="Schließe erst Bronze ab!"
          />
          
          <LevelCard 
            level="gold" 
            emoji="🥇" 
            title={forelleQuest.levels.gold.title}
            description={forelleQuest.levels.gold.description}
            xp={forelleQuest.levels.gold.xpReward}
            isLocked={true}
            lockedReason="Schließe erst Silber ab!"
          />
        </div>

        {/* KI-Chat Vorschau */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🦫</span>
            <h3 className="font-pixel text-xl">Professor Eich ist überall</h3>
          </div>
          
          <p className="text-gray-600 mb-4">
            In jedem Level begleitet dich Professor Eich persönlich. 
            Du kannst jederzeit Fragen stellen, Hilfe anfordern oder 
            einfach plaudern. Die KI passt sich deinem Lernstil an!
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-green-50 rounded-lg p-3">
              <strong>✅ Erklärt:</strong> "Warum hat die Forelle keine Lungen?"
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <strong>✅ Motiviert:</strong> "Das war knapp! Versuch's nochmal!"
            </div>
            <div className="bg-yellow-50 rounded-lg p-3">
              <strong>✅ Hinterfragt:</strong> "Was denkst du, wozu dient das?"
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <strong>✅ Feiert:</strong> "Hervorragend! Das hast du super verstanden!"
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function LevelCard({
  level,
  emoji,
  title,
  description,
  xp,
  isLocked,
  lockedReason,
  onClick
}: {
  level: string
  emoji: string
  title: string
  description: string
  xp: number
  isLocked: boolean
  lockedReason?: string
  onClick?: () => void
}) {
  const colors: Record<string, string> = {
    bronze: 'from-orange-100 to-orange-50 border-orange-200',
    silver: 'from-gray-100 to-gray-50 border-gray-200',
    gold: 'from-yellow-100 to-yellow-50 border-yellow-200'
  }

  if (isLocked) {
    return (
      <div className={`bg-gradient-to-br ${colors[level]} rounded-2xl p-6 border-2 opacity-60`}>
        <div className="text-center">
          <div className="text-5xl mb-3">🔒</div>
          <h3 className="font-pixel text-2xl text-gray-600 mb-2">{emoji} {title}</h3>
          <p className="text-gray-500 mb-2">{description}</p>
          <p className="text-sm text-red-500 font-medium">{lockedReason}</p>
        </div>
      </div>
    )
  }

  return (
    <Link href={`/quest/forelle/${level}`}>
      <div 
        className={`bg-gradient-to-br ${colors[level]} rounded-2xl p-6 border-2 cursor-pointer 
                    transform hover:scale-105 transition-all hover:shadow-xl`}
        onClick={onClick}
      >
        <div className="text-center">
          <div className="text-5xl mb-3">{emoji}</div>
          
          <h3 className="font-pixel text-2xl text-gray-800 mb-2">{title}</h3>
          
          <p className="text-gray-600 mb-4">{description}</p>
          
          <div className="inline-block bg-white rounded-full px-4 py-2 shadow">
            <span className="text-minecraft-gold font-bold">+{xp} XP</span>
          </div>
          
          <Button className="w-full mt-4" variant="minecraft">
            Level starten
          </Button>
        </div>
      </div>
    </Link>
  )
}
