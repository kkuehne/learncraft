'use client'

import { useState } from 'react'
import { Check, X, ArrowRight, RefreshCcw } from 'lucide-react'
import { addXP } from '@/lib/xp'

interface Question {
  question: string
  options: string[]
  correct: number
  explanation: string
}

interface QuizComponentProps {
  questions: Question[]
  moduleId: string
  onComplete: (passed: boolean) => void
  xp: number
}

export function QuizComponent({ questions, moduleId, onComplete, xp }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)

  const question = questions[currentQuestion]
  const isLastQuestion = currentQuestion === questions.length - 1

  const handleSelect = (index: number) => {
    if (showExplanation) return
    setSelectedAnswer(index)
  }

  const handleCheck = () => {
    if (selectedAnswer === null) return
    setShowExplanation(true)
    if (selectedAnswer === question.correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (isLastQuestion) {
      const finalScore = score + (selectedAnswer === question.correct ? 1 : 0)
      const passed = finalScore >= Math.ceil(questions.length * 0.6)
      
      // Add XP if passed and first time
      if (passed) {
        addXP(xp, `quiz-${moduleId}`)
      }
      
      setQuizComplete(true)
    } else {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  const handleRetry = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setQuizComplete(false)
  }

  const progress = ((currentQuestion + (showExplanation ? 1 : 0)) / questions.length) * 100

  // Show completion screen
  if (quizComplete) {
    const finalScore = score + (selectedAnswer === question.correct ? 1 : 0)
    const passed = finalScore >= Math.ceil(questions.length * 0.6)
    
    return (
      <div className="max-w-2xl mx-auto animate-fadeIn">
        <div className="bg-white/10 rounded-2xl p-8 text-center">
          <div className="text-6xl mb-4">{passed ? '🎉' : '🔄'}</div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {passed ? 'Quiz geschafft!' : 'Nicht ganz...'}
          </h3>
          <p className="text-cyan-200 mb-4">
            Du hast {finalScore} von {questions.length} Fragen richtig beantwortet.
          </p>
          
          {passed ? (
            <div className="space-y-3">
              <div className="text-3xl font-bold text-yellow-400">+{xp} XP</div>
              <button
                onClick={() => onComplete(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
              >
                Weiter →
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-red-300 text-sm">Mindestens 60% richtig für XP-Belohnung</p>
              <button
                onClick={handleRetry}
                className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg mx-auto"
              >
                <RefreshCcw className="w-5 h-5" />
                Nochmal versuchen
              </button>
              <button
                onClick={() => onComplete(false)}
                className="text-cyan-300 hover:text-white text-sm underline"
              >
                Zurück zum Lernpfad
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-cyan-300 mb-2">
          <span>Frage {currentQuestion + 1} von {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white/10 rounded-2xl p-6 mb-6">
        <h3 className="text-xl font-bold text-white mb-6">{question.question}</h3>

        <div className="space-y-3">
          {question.options.map((option, idx) => {
            const isSelected = selectedAnswer === idx
            const isCorrect = idx === question.correct
            const showResult = showExplanation

            let buttonClass = 'w-full p-4 rounded-xl text-left font-medium transition-all '
            
            if (showResult) {
              if (isCorrect) {
                buttonClass += 'bg-green-500/30 border-2 border-green-500 text-white'
              } else if (isSelected) {
                buttonClass += 'bg-red-500/30 border-2 border-red-500 text-white'
              } else {
                buttonClass += 'bg-white/10 text-cyan-200 opacity-50'
              }
            } else {
              if (isSelected) {
                buttonClass += 'bg-cyan-500/30 border-2 border-cyan-500 text-white'
              } else {
                buttonClass += 'bg-white/10 text-cyan-200 hover:bg-white/20 border-2 border-transparent'
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={showExplanation}
                className={buttonClass}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showResult && isCorrect && (<Check className="w-5 h-5 text-green-400" />)}
                  {showResult && isSelected && !isCorrect && (<X className="w-5 h-5 text-red-400" />)}
                </div>
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className={`mt-6 p-4 rounded-xl ${
            selectedAnswer === question.correct 
              ? 'bg-green-500/20 border border-green-500/30' 
              : 'bg-red-500/20 border border-red-500/30'
          }`}>
            <div className="flex items-start gap-3">
              {selectedAnswer === question.correct ? (
                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              ) : (
                <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p className={`font-medium ${
                  selectedAnswer === question.correct ? 'text-green-300' : 'text-red-300'
                }`}>
                  {selectedAnswer === question.correct ? 'Richtig!' : 'Nicht ganz...'}
                </p>
                <p className="text-cyan-200 text-sm mt-1">{question.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        {!showExplanation ? (
          <button
            onClick={handleCheck}
            disabled={selectedAnswer === null}
            className={`px-8 py-3 rounded-xl font-bold transition-all ${
              selectedAnswer === null
                ? 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 shadow-lg'
            }`}
          >
            Antwort prüfen ✓
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            {isLastQuestion ? 'Quiz beenden 🎉' : 'Nächste Frage →'}
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  )
}
