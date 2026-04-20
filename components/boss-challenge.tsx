'use client'

import { useState, useEffect, useRef } from 'react'
import { bossChallenges, evaluateSubmission, BossChallenge } from '@/lib/boss-challenges'
import { addXP, completeLevel } from '@/lib/xp'
import { speak } from '@/lib/speech'
import { professorEich } from '@/lib/data'
import { 
  ChevronLeft, 
  Send, 
  Lightbulb, 
  Trophy, 
  Target, 
  AlertCircle,
  CheckCircle,
  Crown,
  Sparkles,
  BarChart3,
  BookOpen,
  BrainCircuit
} from 'lucide-react'
import Link from 'next/link'

export function BossChallengeComponent() {
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({})
  const [evaluations, setEvaluations] = useState<Record<string, ReturnType<typeof evaluateSubmission>>>({})
  const [selfAssessment, setSelfAssessment] = useState<'surface' | 'deep' | 'expert'>('surface')
  const [showHint, setShowHint] = useState<number | null>(null)
  const [allCompleted, setAllCompleted] = useState(false)
  const [totalScore, setTotalScore] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const challenge = bossChallenges[currentChallenge]
  const currentAnswer = answers[challenge.id] || ''
  const isSubmitted = submitted[challenge.id]
  const evaluation = evaluations[challenge.id]

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [currentAnswer])

  const handleSubmit = () => {
    if (currentAnswer.length < 50) {
      speak('Das ist zu kurz für eine fundierte Analyse. Entwickle deine Gedanken weiter!')
      return
    }

    const result = evaluateSubmission(currentAnswer, challenge, selfAssessment)
    setEvaluations(prev => ({ ...prev, [challenge.id]: result }))
    setSubmitted(prev => ({ ...prev, [challenge.id]: true }))
    
    // XP proportional zur Bewertung
    const xpEarned = Math.round((result.score / 100) * challenge.xp)
    addXP(xpEarned, `boss-${challenge.id}`)
    
    // Audio Feedback
    setTimeout(() => {
      speak(result.feedback)
    }, 500)

    // Update total score
    setTotalScore(prev => prev + result.score)
  }

  const handleNext = () => {
    if (currentChallenge < bossChallenges.length - 1) {
      setCurrentChallenge(prev => prev + 1)
      setSelfAssessment('surface')
      setShowHint(null)
    } else {
      // All challenges completed
      const averageScore = totalScore / bossChallenges.length
      if (averageScore >= 60) {
        completeLevel('boss')
        setAllCompleted(true)
        speak(`MEISTERHAFT! Durchschnittliche Bewertung: ${Math.round(averageScore)} Prozent! Du hast die ultimative Denk-Challenge gemeistert!`)
      } else {
        speak(`Du hast alle Challenges bearbeitet. Durchschnitt: ${Math.round(averageScore)} Prozent. Für das Boss-Level-Abzeichen brauchst du 60 Prozent.`)
      }
    }
  }

  const handlePrevious = () => {
    if (currentChallenge > 0) {
      setCurrentChallenge(prev => prev - 1)
    }
  }

  if (allCompleted) {
    return <BossCompletionScreen totalScore={totalScore} averageScore={totalScore / bossChallenges.length} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <button className="flex items-center gap-2 text-purple-200 hover:text-white transition-colors mb-4">
              <ChevronLeft size={20} />
              Zurück zum Lernpfad
            </button>
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                👑 Boss Arena: Denk-Challenge
              </h1>
              <p className="text-purple-200">
                Textbasierte Expertenfragen • Analyse • Vernetzung • Reflexion
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl mb-1">🦫</div>
              <div className="text-xs text-purple-300">Prof. Eich bewertet</div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-purple-200">Challenge {currentChallenge + 1} / {bossChallenges.length}</span>
            <span className="text-purple-200">+{challenge.xp} XP max</span>
          </div>
          <div className="w-full bg-purple-900/50 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentChallenge + 1) / bossChallenges.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Challenge Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Challenge Header */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 p-6">
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-2xl">
                <BrainCircuit className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">{challenge.title}</h2>
                <div className="flex flex-wrap gap-2">
                  {challenge.evaluationCriteria.coverage.map((criterion, idx) => (
                    <span 
                      key={idx}
                      className="bg-white/20 text-white text-xs px-3 py-1 rounded-full"
                    >
                      {criterion}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Question */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-6 border-l-4 border-purple-500">
              <div className="flex items-start gap-3 mb-3">
                <Target className="w-5 h-5 text-purple-600 mt-1" />
                <span className="font-semibold text-slate-700">Aufgabe:</span>
              </div>
              <pre className="whitespace-pre-wrap font-sans text-slate-700 text-sm leading-relaxed">
                {challenge.question}
              </pre>
            </div>

            {/* Context */}
            <div className="bg-amber-50 rounded-xl p-4 mb-6 border-l-4 border-amber-400">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <span className="font-semibold text-amber-800 block mb-1">Denkanstoß:</span>
                  <span className="text-amber-700 text-sm">{challenge.context}</span>
                </div>
              </div>
            </div>

            {/* Self-Assessment (before submit) */}
            {!isSubmitted && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Wie tief ist dein aktuelles Verständnis dieses Themas?
                </label>
                <div className="flex gap-3">
                  {(['surface', 'deep', 'expert'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelfAssessment(level)}
                      className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                        selfAssessment === level
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-slate-200 hover:border-purple-300 text-slate-600'
                      }`}
                    >
                      <div className="font-semibold text-sm">
                        {level === 'surface' && '📖 Oberflächlich'}
                        {level === 'deep' && '🔍 Tiefgehend'}
                        {level === 'expert' && '🎓 Experte'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Answer Textarea */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Deine Analyse (min. {challenge.minLength} Zeichen)
              </label>
              
              <textarea
                ref={textareaRef}
                value={currentAnswer}
                onChange={(e) => !isSubmitted && setAnswers(prev => ({ 
                  ...prev, 
                  [challenge.id]: e.target.value 
                }))}
                disabled={isSubmitted}
                placeholder="Entwickle hier deine Antwort... Verbinde Anatomie mit Physiologie und Ökologie. Nutze alle Unterlagen, die du während des Lernpfads gesammelt hast!"
                className="w-full min-h-[200px] p-4 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none text-slate-700 leading-relaxed disabled:bg-slate-50"
              />
              
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>{currentAnswer.length} Zeichen</span>
                <span>Mindestens {challenge.minLength} Zeichen empfohlen</span>
              </div>
            </div>

            {/* Hints */}
            {!isSubmitted && (
              <div className="mb-6">
                <button
                  onClick={() => setShowHint(showHint === currentChallenge ? null : currentChallenge)}
                  className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium text-sm"
                >
                  <Lightbulb className="w-4 h-4" />
                  {showHint === currentChallenge ? 'Hinweise verbergen' : 'Hinweise anzeigen (reduziert XP)'}
                </button>
                
                {showHint === currentChallenge && (
                  <div className="mt-3 bg-amber-50 rounded-xl p-4 border border-amber-200">
                    <ul className="space-y-2">
                      {challenge.hints.map((hint, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-amber-800">
                          <span className="font-bold">{idx + 1}.</span>
                          <span>{hint}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Submit Button */}
            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={currentAnswer.length < 50}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                An Prof. Eich senden
              </button>
            ) : (
              <div className="bg-slate-100 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`text-4xl ${
                    evaluation!.score >= 85 ? '🏆' :
                    evaluation!.score >= 65 ? '⭐' :
                    evaluation!.score >= 45 ? '📖' : '💭'
                  }`}>
                    {evaluation!.score >= 85 ? '🏆' :
                     evaluation!.score >= 65 ? '⭐' :
                     evaluation!.score >= 45 ? '📖' : '💭'}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-slate-600 mb-1">Bewertung</div>
                    <div className="flex items-center gap-3">
                      <div className="text-3xl font-bold text-purple-600">{evaluation!.score}%</div>
                      <div className="text-sm text-slate-500">
                        (+{Math.round((evaluation!.score / 100) * challenge.xp)} XP)
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 mb-4">
                  <p className="text-slate-800 font-medium">{evaluation!.feedback}</p>
                </div>
                
                {/* Keyword Coverage */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                    <BarChart3 className="w-4 h-4" />
                    Themenabdeckung: {evaluation!.keywordResult.coverage}%
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {challenge.requiredKeywords.map(keyword => {
                      const found = evaluation!.keywordResult.found.includes(keyword)
                      return (
                        <span 
                          key={keyword}
                          className={`text-xs px-2 py-1 rounded-full ${
                            found 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {found ? '✓' : '○'} {keyword}
                        </span>
                      )
                    })}
                  </div>
                </div>
                
                <button
                  onClick={handleNext}
                  className="w-full py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-all flex items-center justify-center gap-2"
                >
                  {currentChallenge < bossChallenges.length - 1 ? (
                    <>
                      Nächste Challenge
                      <ChevronLeft className="w-5 h-5 rotate-180" />
                    </>
                  ) : (
                    <>
                      Alle Challenges abschließen
                      <Trophy className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function BossCompletionScreen({ totalScore, averageScore }: { totalScore: number, averageScore: number }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center">
        <div className="text-6xl mb-6">👑</div>
        <h1 className="text-3xl font-bold text-purple-900 mb-4">
          🏆 DENK-CHALLENGE MEISTER! 🏆
        </h1>
        
        <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
          {Math.round(averageScore)}%
        </div>
        <p className="text-slate-600 mb-8">
          Durchschnittliche Bewertung über alle Challenges
        </p>
        
        <div className="bg-purple-50 rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-purple-800 mb-4">✨ Was du bewiesen hast:</h2>
          <ul className="text-left text-slate-700 space-y-3">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5" />
              <span>Vernetzung von Anatomie, Physiologie und Ökologie</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5" />
              <span>Analytisches Denken und wissenschaftliche Argumentation</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5" />
              <span>Verständnis komplexer ökologischer Zusammenhänge</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5" />
              <span>Reflexion ethischer und ökologischer Fragestellungen</span>
            </li>
          </ul>
        </div>
        
        {averageScore >= 80 && (
          <div className="bg-gradient-to-r from-yellow-100 to-amber-100 rounded-xl p-4 mb-6 border-2 border-yellow-400">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-yellow-600" />
              <span className="font-bold text-yellow-800">LEGENDEN-STATUS!</span>
              <Sparkles className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-yellow-700 text-sm">
              Über 80% Durchschnitt - Das ist Forschungs-Niveau!
            </p>
          </div>
        )}
        
        <Link href="/">
          <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2">
            <Crown className="w-5 h-5" />
            Zurück zum Lernpfad
          </button>
        </Link>
      </div>
    </div>
  )
}
