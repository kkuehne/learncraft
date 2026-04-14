import Link from 'next/link'
import { XPBar } from '@/components/xp-bar'
import { forelleQuest, professorEich } from '@/lib/data'

export default function Home() {
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
              <p className="text-gray-700 text-sm">{professorEich.greetings.bronze}</p>
            </div>
          </div>
        </div>
      </div>
      
      <Link href="/quest/forelle/bronze">
        <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-400 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-yellow-800">🥉 Bronze-Level starten</h3>
              <p className="text-yellow-700">{forelleQuest.levels.bronze.title}</p>
              <p className="text-sm text-gray-600 mt-1">{forelleQuest.levels.bronze.description}</p>
            </div>
            <span className="text-2xl font-bold text-yellow-600">+{forelleQuest.levels.bronze.totalXP} XP</span>
          </div>
        </div>
      </Link>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Klassenarbeit: 11. Mai 2026</p>
      </div>
    </div>
  )
}
