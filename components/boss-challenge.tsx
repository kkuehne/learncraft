'use client'

import { useState, useEffect, useRef } from 'react'
import { bossChallenges, evaluateSubmission, compareAttempts, AttemptResult } from '@/lib/boss-challenges'
import { addXP, completeLevel } from '@/lib/xp'
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
  Volume2,
  Info
} from 'lucide-react'
import Link from 'next/link'

export function BossChallengeComponent() {
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [attempts, setAttempts] = useState<Record<string, AttemptResult[]>>({})
  const [showHints, setShowHints] = useState<Record<string, boolean>>({})
  const [showingSolution, setShowingSolution] = useState(false)
  const [allCompleted, setAllCompleted] = useState(false)
  const [totalScore, setTotalScore] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const challenge = bossChallenges[currentChallenge]
  const currentAnswer = answers[challenge.id] || ''
  const currentAttempts = attempts[challenge.id] || []
  const lastResult = currentAttempts[currentAttempts.length - 1]
  const attemptCount = currentAttempts.length
  const maxAttempts = challenge.maxAttempts
  const attemptsLeft = maxAttempts - attemptCount
  
  // KORREKTE Logik: Weitere Versuche erlaubt, solange:
  // 1. Noch nicht alle Versuche aufgebraucht
  // 2. Noch nicht "Exzellent" (85+) erreicht
  const canRetry = attemptsLeft > 0 && (!lastResult || lastResult.score < 85)
  
  // Musterlösung anzeigen nach allen Versuchen oder bei Erfolg
  const showSolution = lastResult && (lastResult.score >= 85 || attemptsLeft === 0)

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
      attemptCount + 1,
      currentAttempts
    )
    
    // Speichere Versuch
    const newAttempts = [...currentAttempts, result]
    setAttempts(prev => ({ ...prev, [challenge.id]: newAttempts }))
    
    // XP nur beim ersten Versuch
    if (attemptCount === 0) {
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

    // Update total score (nur beste pro Challenge zählt)
    const bestSoFar = newAttempts.reduce((best, a) => a.score > best.score ? a : best, result)
    setTotalScore(prev => prev - (currentAttempts.length > 0 ? Math.max(...currentAttempts.map(a => a.score)) : 0) + bestSoFar.score)
  }

  const handleRetry = () => {
    if (lastResult) {
      // Text vom letzten Versuch laden
      setAnswers(prev => ({ ...prev, [challenge.id]: lastResult.text }))
      setShowingSolution(false)
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
      setShowingSolution(false)
      setShowHints({})
    } else {
      // Alle Challenges abgeschlossen
      const allAttempts = Object.values(attempts).flat()
      const averageScore = allAttempts.length > 0 
        ? allAttempts.reduce((sum, a) => sum + a.score, 0) / allAttempts.length 
        : 0
      
      if (averageScore >= 50) {
        completeLevel('boss')
        setAllCompleted(true)
        speak(`🎉 HERZLICHEN GLÜCKWUNSCH! Du hast die ultimative Denk-Challenge gemeistert und verdienst den Boss-Experten-Titel!`)
      } else {
        setAllCompleted(true)
        speak(`Du hast alle Challenges durchgearbeitet. Für das Boss-Abzeichen brauchst du 50 Prozent. Versuche es gerne nochmal!`)
      }
    }
  }

  const handlePrevious = () => {
    if (currentChallenge > 0) {
      setCurrentChallenge(prev => prev - 1)
      setShowingSolution(false)
      setShowHints({})
    }
  }

  const toggleHint = (hintIndex: number) => {
    setShowHints(prev => ({ ...prev, [`${challenge.id}-${hintIndex}`]: !prev[`${challenge.id}-${hintIndex}`] }))
  }

  const handleAnswerChange = (text: string) => {
    setAnswers(prev => ({ ...prev, [challenge.id]: text }))
  }

  // Beste Bewertung für diese Challenge
  const bestResult = currentAttempts.length > 0 
    ? currentAttempts.reduce((best, current) => current.score > best.score ? current : best)
    : null

  if (allCompleted) {
    return <BossCompletionScreen totalScore={totalScore} attempts={attempts} />
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
          {(!lastResult || (canRetry && !showingSolution)) ? (
            <div className="space-y-4">
              {/* Versuch-Anzeige */}
              {attemptCount > 0 && (
                <div className="bg-purple-800/50 rounded-xl p-4 flex items-center justify-between">
                  <span className="text-purple-200">
                    Versuch {attemptCount + 1} von {maxAttempts}
                  </span>
                  {attemptsLeft === 1 && (
                    <span className="text-amber-400 text-sm">Letzte Chance!</span>
                  )}
                </div>
              )}

              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={currentAnswer}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  placeholder={`Schreibe hier deine Antwort... (mindestens ${challenge.minLength} Zeichen)`}
                  className="w-full bg-slate-800/80 rounded-2xl p-6 text-white placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[200px]"
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
                disabled={currentAnswer.length < 100}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send size={20} />
                {attemptCount === 0 ? 'Antwort einreichen' : `Verbesserter Versuch ${attemptCount + 1}/${maxAttempts}`}
              </button>
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

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-6">
                {canRetry && (
                  <button
                    onClick={handleRetry}
                    className="flex-1 min-w-[200px] flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-bold transition-colors"
                  >
                    <RotateCcw size={20} />
                    Weiteren Versuch starten
                    <span className="text-amber-200 text-sm">({attemptsLeft} übrig)</span>
                  </button>
                )}
                
                {(lastResult.score >= 85 || !canRetry) && (
                  <button
                    onClick={handleNext}
                    className="flex-1 min-w-[200px] flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-xl font-bold transition-all"
                  >
                    <ArrowRight size={20} />
                    {currentChallenge < bossChallenges.length - 1 ? 'Nächste Challenge' : 'Zum Abschluss'}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Musterlösung */}
          {showSolution && (
            <div className="mt-6 bg-gradient-to-br from-emerald-900/50 to-teal-900/50 rounded-2xl p-6 border border-emerald-500/50">
              <div className="flex items-center gap-3 mb-4">
                <Info className="text-emerald-400" size={24} />
                <h3 className="text-xl font-bold text-emerald-400">
                  Musterlösung: {challenge.title}
                </h3>
              </div>
              
              <div className="bg-emerald-950/50 rounded-xl p-4 mb-4">
                <SolutionContent challengeId={challenge.id} />
              </div>

              <button
                onClick={() => speak(getSolutionText(challenge.id))}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold transition-colors"
              >
                <Volume2 size={20} />
                Musterlösung anhören
              </button>
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

// Musterlösungen für jede Challenge
const solutions: Record<string, { title: string; points: string[] }> = {
  bioindikator: {
    title: 'Die Forelle als Bioindikator - Musterlösung',
    points: [
      'Das Gegenstromprinzip in den Kiemen ermöglicht einen extrem effizienten Sauerstoffaustausch mit über 80% Wirkungsgrad. Blut und Wasser fließen dabei in entgegengesetzte Richtungen, was einen maximalen Konzentrationsgradienten aufrechterhält.',
      'Diese hohe Effizienz hat aber einen Preis: Die Forelle braucht viel Energie für ihre Atmung und hat einen schnellen Stoffwechsel. Sie benötigt ständig viel Sauerstoff, auch im Ruhezustand.',
      'Andere Fischarten wie der Karpfen können bei Sauerstoffmangel auf Dämmerschlaf (Winterstarre) umschalten oder sogar Luft atmen. Die Forelle kann das nicht – sie ist auf ständig sauerstoffreiches Wasser angewiesen.',
      'Deshalb verschwindet die Forelle als erste Fischart bei Gewässerverschmutzung. Sie ist wie ein empfindliches Messgerät für Wasserqualität – ein wahrer Bioindikator!'
    ]
  },
  'wild-vs-zucht': {
    title: 'Wild vs. Zucht - Musterlösung',
    points: [
      'Körperlich unterscheiden sich Zuchtforellen durch größere Schwimmblasen (keine Strömung nötig), dickere Körperform (mehr Fett) und manchmal unterschiedliche Färbungen.',
      'Im Verhalten sind Wildforellen scheuer, schneller in der Flucht und präziser in der Laichzeit. Zuchtforellen gewöhnen sich an Menschen und haben weniger Fluchtinstinkt.',
      'Wenn Zuchtforellen in Wildbäche entlassen werden, konkurrieren sie mit Wildforellen um Nahrung und Laichplätze. Durch Vermischung werden die Wildgene verdünnt.',
      'Die Wildpopulation verliert anpassungsfähige Gene. Ethisch ist fragwürdig, ob man Natur durch künstliche Besatzmaßnahmen "verbessern" sollte. Der Naturschutz setzt auf Schutz der Wildbestände statt Zuchteinsatz.'
    ]
  },
  klimawandel: {
    title: 'Klimawandel und Forellen - Musterlösung',
    points: [
      'Bei höheren Temperaturen löst Wasser weniger Sauerstoff. Gleichzeitig steigt der Energiebedarf der Forelle exponentiell. Sie braucht mehr Sauerstoff, aber es gibt weniger im Wasser!',
      'Forellen können in kältere Bereiche wandern (Verhaltensthermoregulation) oder in höhere Gebirgslagen ausweichen. Aber irgendwann gibt es keine höheren Berge mehr.',
      'Die "Gipfelfalle" bedeutet: Gebirgsarten können nicht höher wandern als der Berggipfel. Sie sind gefangen und können dem Klimawandel nicht entkommen.',
      'Evolutionäre Anpassung braucht Tausende von Jahren. Der Klimawandel passiert in Jahrzehnten. Die Forelle hat keine Zeit, sich anzupassen. In 50 Jahren könnte sie in vielen Regionen verschwunden sein.'
    ]
  }
}

function SolutionContent({ challengeId }: { challengeId: string }) {
  const solution = solutions[challengeId]
  if (!solution) return null

  return (
    <div className="space-y-3">
      <h4 className="text-emerald-300 font-bold text-lg mb-2">{solution.title}</h4>
      {solution.points.map((point, idx) => (
        <div key={idx} className="flex gap-3 text-emerald-100">
          <span className="text-emerald-400 font-bold flex-shrink-0">{idx + 1}.</span>
          <p className="text-sm leading-relaxed">{point}</p>
        </div>
      ))}
    </div>
  )
}

function getSolutionText(challengeId: string): string {
  const solution = solutions[challengeId]
  if (!solution) return ''
  return `${solution.title}. ${solution.points.join(' ')}`
}

// Abschluss-Screen
function BossCompletionScreen({ 
  totalScore, 
  attempts 
}: { 
  totalScore: number
  attempts: Record<string, AttemptResult[]>
}) {
  const allAttempts = Object.values(attempts).flat()
  const averageScore = allAttempts.length > 0 
    ? allAttempts.reduce((sum, a) => sum + a.score, 0) / allAttempts.length 
    : 0
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
