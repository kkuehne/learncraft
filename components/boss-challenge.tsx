'use client'

import { useState, useEffect, useRef } from 'react'
import { bossChallenges, evaluateSubmission, compareAttempts, AttemptResult } from '@/lib/boss-challenges'
import { addXP, completeLevel, getUserData } from '@/lib/xp'
import { speak } from '@/lib/speech'
import { 
  ChevronLeft, 
  Send, 
  Lightbulb, 
  Trophy, 
  AlertCircle,
  CheckCircle,
  Crown,
  Sparkles,
  RotateCcw,
  TrendingUp,
  BookOpen,
  ArrowRight,
  Edit3
} from 'lucide-react'
import Link from 'next/link'

export function BossChallengeComponent() {
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [currentAttempt, setCurrentAttempt] = useState(1)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [attempts, setAttempts] = useState<Record<string, AttemptResult[]>>({})
  const [showHints, setShowHints] = useState<Record<string, boolean>>({})
  const [allCompleted, setAllCompleted] = useState(false)
  const [totalScore, setTotalScore] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const challenge = bossChallenges[currentChallenge]
  const currentAnswer = answers[challenge.id] || ''
  const currentAttempts = attempts[challenge.id] || []
  const lastResult = currentAttempts[currentAttempts.length - 1]
  const canRetry = currentAttempt < challenge.maxAttempts && (!lastResult || lastResult.score < 85)
  const hasMoreAttempts = currentAttempt < challenge.maxAttempts

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [currentAnswer])

  const handleSubmit = () => {
    if (currentAnswer.length < 100) {
      speak('Das ist noch etwas kurz. Versuche, deine Gedanken ausführlicher zu erklären!')
      return
    }

    const result = evaluateSubmission(
      currentAnswer, 
      challenge, 
      currentAttempt,
      currentAttempts
    )
    
    // Speichere Versuch
    const newAttempts = [...currentAttempts, result]
    setAttempts(prev => ({ ...prev, [challenge.id]: newAttempts }))
    
    // XP beim ersten Mal
    if (currentAttempt === 1) {
      const xpEarned = Math.round((result.score / 100) * challenge.xp)
      addXP(xpEarned, `boss-${challenge.id}`)
    }
    
    // Vergleiche mit vorherigem Versuch
    let feedbackMessage = result.feedback
    if (currentAttempts.length > 0) {
      const comparison = compareAttempts(currentAttempts[currentAttempts.length - 1], result)
      if (comparison.improved) {
        feedbackMessage += ` ${comparison.message}`
      }
    }
    
    // Audio Feedback
    setTimeout(() => {
      speak(feedbackMessage)
    }, 300)

    // Update total score
    setTotalScore(prev => prev + result.score)
    
    // Nächster Versuch oder nächste Challenge
    if (result.score >= 85) {
      setCurrentAttempt(challenge.maxAttempts) // Bestanden
    } else {
      setCurrentAttempt(prev => prev + 1)
    }
  }

  const handleRetry = () => {
    if (lastResult) {
      setIsEditing(true)
      setCurrentAttempt(currentAttempts.length + 1)
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus()
          textareaRef.current.setSelectionRange(lastResult.text.length, lastResult.text.length)
        }
      }, 100)
    }
  }

  const handleNext = () => {
    if (currentChallenge < bossChallenges.length - 1) {
      setCurrentChallenge(prev => prev + 1)
      setCurrentAttempt(1)
      setIsEditing(false)
      setShowHints({})
    } else {
      // Alle Challenges abgeschlossen
      const averageScore = totalScore / bossChallenges.length
      if (averageScore >= 50) {
        completeLevel('boss')
        setAllCompleted(true)
        speak(`🎉 HERZLICHEN GLÜCKWUNSCH! Durchschnittliche Bewertung: ${Math.round(averageScore)} Prozent! Du hast die ultimative Denk-Challenge gemeistert und verdienst den Boss-Experten-Titel!`)
      } else {
        setAllCompleted(true)
        speak(`Du hast alle Challenges durchgearbeitet. Durchschnitt: ${Math.round(averageScore)} Prozent. Für das Boss-Abzeichen brauchst du 50 Prozent. Versuche es gerne nochmal!`)
      }
    }
  }

  const handlePrevious = () => {
    if (currentChallenge > 0) {
      setCurrentChallenge(prev => prev - 1)
      setCurrentAttempt(1)
      setIsEditing(false)
      setShowHints({})
    }
  }

  const toggleHint = (hintIndex: number) => {
    setShowHints(prev => ({ ...prev, [`${challenge.id}-${hintIndex}`]: !prev[`${challenge.id}-${hintIndex}`] }))
  }

  const handleAnswerChange = (text: string) => {
    setAnswers(prev => ({ ...prev, [challenge.id]: text }))
    setIsEditing(true)
  }

  // Berechne verfügbare Versuche
  const attemptsLeft = challenge.maxAttempts - currentAttempt + 1
  
  // Beste Bewertung für diese Challenge
  const bestResult = currentAttempts.length > 0 
    ? currentAttempts.reduce((best, current) => current.score > best.score ? current : best)
    : null

  if (allCompleted) {
    return <BossCompletionScreen totalScore={totalScore} averageScore={totalScore / bossChallenges.length} attempts={attempts} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <button className="flex items-center gap-2 text-purple-200 hover:text-white transition-colors mb-4">
              <ChevronLeft size={24} />
              <span>Zurück zum Lernpfad</span>
            </button>
          </Link>
          
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
              <Crown className="text-yellow-400" />
              Boss Arena
            </h1>
            <div className="text-purple-200">
              Challenge {currentChallenge + 1} von {bossChallenges.length}
            </div>
          </div>
          
          {/* Fortschrittsbalken */}
          <div className="mt-4 bg-white/10 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full transition-all duration-500"
              style={{ width: `${((currentChallenge) / bossChallenges.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Challenge Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-purple-500/30">
          {/* Titel */}
          <h2 className="text-2xl font-bold text-white mb-4">{challenge.title}</h2>
          
          {/* Frage */}
          <div className="bg-purple-800/50 rounded-2xl p-6 mb-6">
            <p className="text-white whitespace-pre-line leading-relaxed text-lg">
              {challenge.question}
            </p>
          </div>
          
          {/* Kontext */}
          <div className="bg-blue-800/30 rounded-xl p-4 mb-6 flex items-start gap-3">
            <BookOpen className="text-blue-300 flex-shrink-0 mt-1" size={20} />
            <p className="text-blue-100 text-sm">{challenge.context}</p>
          </div>

          {/* Lernziele */}
          <div className="mb-6">
            <h3 className="text-purple-200 font-semibold mb-2 flex items-center gap-2">
              <Sparkles size={18} />
              Deine Lernziele:
            </h3>
            <ul className="space-y-1">
              {challenge.learningGoals.map((goal, idx) => (
                <li key={idx} className="text-purple-100 text-sm flex items-center gap-2">
                  <span className="text-purple-400">•</span>
                  {goal}
                </li>
              ))}
            </ul>
          </div>

          {/* Eingabebereich */}
          {!lastResult || canRetry ? (
            <div className="space-y-4">
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={currentAnswer}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  placeholder={`Schreibe hier deine Antwort... (mindestens ${challenge.minLength} Zeichen)`}
                  className="w-full bg-slate-800/80 rounded-2xl p-6 text-white placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[200px]"
                  disabled={!!lastResult && !canRetry}
                />
                <div className="absolute bottom-4 right-4 text-slate-400 text-sm">
                  {currentAnswer.length} Zeichen
                </div>
              </div>

              {/* Hinweise */}
              <div className="bg-amber-900/30 rounded-xl p-4">
                <h4 className="text-amber-200 font-semibold mb-3 flex items-center gap-2">
                  <Lightbulb size={18} />
                  Hinweise ({challenge.hints.length} verfügbar)
                </h4>
                <div className="space-y-2">
                  {challenge.hints.map((hint, idx) => (
                    <button
                      key={idx}
                      onClick={() => toggleHint(idx)}
                      className="w-full text-left p-3 rounded-lg bg-amber-800/30 hover:bg-amber-700/40 transition-colors text-amber-100 text-sm"
                    >
                      {showHints[`${challenge.id}-${idx}`] ? hint : `💡 Hinweis ${idx + 1} anzeigen...`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={currentAnswer.length < 100 || (!!lastResult && !canRetry)}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send size={20} />
                {currentAttempt === 1 ? 'Antwort einreichen' : `Verbesserter Versuch ${currentAttempt}/${challenge.maxAttempts}`}
              </button>

              {/* Versuche-Anzeige */}
              <div className="flex items-center justify-center gap-2 text-purple-200">
                <span>Versuch {currentAttempt} von {challenge.maxAttempts}</span>
                {attemptsLeft <= 2 && attemptsLeft > 0 && (
                  <span className="text-amber-400">(noch {attemptsLeft} {attemptsLeft === 1 ? 'Versuch' : 'Versuche'} übrig)</span>
                )}
              </div>
            </div>
          ) : null}

          {/* Ergebnisanzeige */}
          {lastResult && (
            <div className={`mt-6 rounded-2xl p-6 border-2 ${
              lastResult.score >= 85 ? 'bg-green-900/30 border-green-500' :
              lastResult.score >= 65 ? 'bg-blue-900/30 border-blue-500' :
              lastResult.score >= 45 ? 'bg-amber-900/30 border-amber-500' :
              'bg-red-900/30 border-red-500'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold ${
                  lastResult.score >= 85 ? 'text-green-400' :
                  lastResult.score >= 65 ? 'text-blue-400' :
                  lastResult.score >= 45 ? 'text-amber-400' :
                  'text-red-400'
                }`}>
                  {lastResult.score >= 85 ? '🌟 Exzellent!' :
                   lastResult.score >= 65 ? '👍 Gut gemacht!' :
                   lastResult.score >= 45 ? '📝 Ausbaufähig' :
                   '💪 Weiter üben!'}
                </h3>
                <div className="text-2xl font-bold text-white">
                  {lastResult.score}/100 Punkte
                </div>
              </div>

              <p className="text-white mb-4">{lastResult.feedback}</p>

              {/* Verbesserungsvorschläge */}
              <div className="space-y-2">
                <h4 className="text-purple-200 font-semibold flex items-center gap-2">
                  <TrendingUp size={18} />
                  {lastResult.score >= 85 ? 'Hervorragend! Hier kannst du noch tiefer gehen:' : 'So kannst du noch besser werden:'}
                </h4>
                <ul className="space-y-1">
                  {lastResult.suggestions.map((suggestion, idx) => (
                    <li key={idx} className="text-purple-100 text-sm flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Neue Keywords anzeigen */}
              {currentAttempts.length > 1 && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-green-400 text-sm">
                    ✓ Neue Aspekte in diesem Versuch erkannt
                  </p>
                </div>
              )}

              {/* Weiter-Buttons */}
              <div className="flex gap-4 mt-6">
                {canRetry && (
                  <button
                    onClick={handleRetry}
                    className="flex-1 flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-bold transition-colors"
                  >
                    <RotateCcw size={20} />
                    Text verbessern
                  </button>
                )}
                {(lastResult.score >= 85 || !canRetry) && (
                  <button
                    onClick={handleNext}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-xl font-bold transition-all"
                  >
                    <ArrowRight size={20} />
                    {currentChallenge < bossChallenges.length - 1 ? 'Nächste Challenge' : 'Abschluss'}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Bestes Ergebnis anzeigen */}
          {bestResult && currentAttempts.length > 1 && (
            <div className="mt-4 bg-purple-800/30 rounded-xl p-4 flex items-center justify-between">
              <span className="text-purple-200">Dein bestes Ergebnis:</span>
              <span className={`font-bold text-xl ${
                bestResult.score >= 85 ? 'text-green-400' :
                bestResult.score >= 65 ? 'text-blue-400' :
                'text-amber-400'
              }`}>
                {bestResult.score}/100
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Abschluss-Screen
function BossCompletionScreen({ 
  totalScore, 
  averageScore,
  attempts 
}: { 
  totalScore: number
  averageScore: number
  attempts: Record<string, AttemptResult[]>
}) {
  const passed = averageScore >= 50
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className={`rounded-3xl p-8 text-center border-4 ${
          passed 
            ? 'bg-gradient-to-br from-yellow-100 to-amber-100 border-yellow-400' 
            : 'bg-gradient-to-br from-slate-700 to-slate-800 border-slate-500'
        }`}>
          <div className="text-6xl mb-4">{passed ? '👑' : '📝'}</div>
          
          <h1 className={`text-3xl font-bold mb-4 ${passed ? 'text-yellow-800' : 'text-white'}`}>
            {passed ? '🎉 Boss-Level gemeistert!' : 'Challenges abgeschlossen'}
          </h1>
          
          <div className={`text-5xl font-bold mb-6 ${passed ? 'text-yellow-600' : 'text-slate-300'}`}>
            {Math.round(averageScore)}%
          </div>
          
          <p className={`mb-8 ${passed ? 'text-yellow-700' : 'text-slate-300'}`}>
            {passed 
              ? 'Herzlichen Glückwunsch! Du hast die ultimative Denk-Challenge gemeistert. Du verstehst jetzt komplexe Zusammenhänge zwischen Anatomie, Physiologie und Ökologie der Forelle!' 
              : `Du hast alle Challenges bearbeitet. Für das Boss-Abzeichen brauchst du 50%. Dein Durchschnitt: ${Math.round(averageScore)}%. Versuche es gerne nochmal!`}
          </p>

          {/* Versuchs-Statistik */}
          <div className="bg-white/20 rounded-xl p-4 mb-6">
            <h3 className={`font-bold mb-3 ${passed ? 'text-yellow-800' : 'text-white'}`}>
              Deine Versuche:
            </h3>
            <div className="space-y-2">
              {bossChallenges.map((challenge, idx) => {
                const challengeAttempts = attempts[challenge.id] || []
                const best = challengeAttempts.length > 0 
                  ? Math.max(...challengeAttempts.map(a => a.score))
                  : 0
                return (
                  <div key={challenge.id} className="flex items-center justify-between text-sm">
                    <span className={passed ? 'text-yellow-900' : 'text-slate-300'}>
                      {idx + 1}. {challenge.title.replace(/^[^\s]+\s/, '')}
                    </span>
                    <span className={best >= 65 ? 'text-green-400' : best >= 45 ? 'text-amber-400' : 'text-red-400'}>
                      {challengeAttempts.length} Versuch{challengeAttempts.length !== 1 ? 'e' : ''}, Beste: {best}%
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex gap-4">
            <Link 
              href="/" 
              className={`flex-1 py-3 rounded-xl font-bold transition-colors ${
                passed 
                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                  : 'bg-slate-600 hover:bg-slate-700 text-white'
              }`}
            >
              Zurück zum Lernpfad
            </Link>
            {!passed && (
              <Link 
                href="/quest/forelle/boss" 
                className="flex-1 py-3 rounded-xl font-bold bg-amber-600 hover:bg-amber-700 text-white"
                onClick={() => window.location.reload()}
              >
                Nochmal versuchen
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
