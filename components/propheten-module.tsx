'use client'

import { useState } from 'react'
import { ProphetenQuiz } from '@/components/propheten-quiz'
import { XPReward } from '@/components/xp-reward'

interface ProphetenModuleProps {
  onComplete: () => void
  isCompleted: boolean
}

export function ProphetenModule({ onComplete, isCompleted }: ProphetenModuleProps) {
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
    return <ProphetenQuiz onComplete={handleQuizComplete} />
  }

  return (
    <div className="animate-fadeIn">
      <div className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 rounded-2xl p-6 mb-6">
        <div className="text-center mb-4">
          <span className="text-4xl">📢</span>
          <h3 className="text-xl font-bold text-white mt-2">Die Propheten-Stimme</h3>
        </div>

        <div className="bg-white/10 rounded-xl p-4 mb-4">
          <p className="text-amber-200">
            Propheten warnen und trösten - sie sind Gottes Stimme für das Volk.
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
        <XPReward amount={40} show={true} message="Prophet verstanden!" />
      )}
    </div>
  )
}
