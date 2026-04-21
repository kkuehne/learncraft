'use client'

import { useState } from 'react'
import { ExodusQuiz } from '@/components/exodus-quiz'
import { XPReward } from '@/components/xp-reward'

interface ExodusModuleProps {
  onComplete: () => void
  isCompleted: boolean
}

export function ExodusModule({ onComplete, isCompleted }: ExodusModuleProps) {
  const [showQuiz, setShowQuiz] = useState(false)
  const [showReward, setShowReward] = useState(false)

  const handleLearnComplete = () => {
    setShowQuiz(true)
  }

  const handleQuizComplete = (passed: boolean) => {
    if (passed) {
      setShowReward(true)
      onComplete()
    } else {
      setShowQuiz(false)
    }
  }

  if (showQuiz) {
    return <ExodusQuiz onComplete={handleQuizComplete} />
  }

  return (
    <div className="animate-fadeIn">
      <div className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 rounded-2xl p-6 mb-6">
        <div className="text-center mb-4">
          <span className="text-4xl">📜</span>
          <h3 className="text-xl font-bold text-white mt-2">Exodus-Navigator</h3>
        </div>

        <div className="bg-white/10 rounded-xl p-4 mb-4">
          <p className="text-amber-200">
            Der Auszug aus Ägypten führte zum Berg Sinai und den 10 Geboten.
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={handleLearnComplete}
          className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
        >
          Zum Quiz 🧠
        </button>
      </div>

      {showReward && (
        <XPReward amount={35} show={true} message="Exodus gemeistert!" />
      )}
    </div>
  )
}
