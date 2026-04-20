'use client'

import { useState, useEffect } from 'react'
import { forelleAnatomy, professorEich } from '@/lib/data'
import { addXP } from '@/lib/xp'
import { speak, getRandomResponse } from '@/lib/speech'
import { Check, X, HelpCircle, AlertCircle } from 'lucide-react'

interface AnatomyLabProps {
  onComplete: (success: boolean) => void
}

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[äÄ]/g, 'ae')
    .replace(/[öÖ]/g, 'oe')
    .replace(/[üÜ]/g, 'ue')
    .replace(/[ß]/g, 'ss')
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
}

function checkAnswer(userInput: string, correctAnswer: string): { 
  isCorrect: boolean; 
  similarity: number;
  suggestion: string | null 
} {
  const normalizedUser = normalizeText(userInput)
  const normalizedCorrect = normalizeText(correctAnswer)
  
  if (normalizedUser === normalizedCorrect) {
    return { isCorrect: true, similarity: 100, suggestion: null }
  }
  
  if (normalizedCorrect.includes(normalizedUser) || normalizedUser.includes(normalizedCorrect)) {
    if (normalizedUser.length >= normalizedCorrect.length * 0.7) {
      return { isCorrect: true, similarity: 85, suggestion: correctAnswer }
    }
  }
  
  let matches = 0
  const maxLen = Math.max(normalizedUser.length, normalizedCorrect.length)
  for (let i = 0; i < Math.min(normalizedUser.length, normalizedCorrect.length); i++) {
    if (normalizedUser[i] === normalizedCorrect[i]) matches++
  }
  const similarity = (matches / maxLen) * 100
  
  return { 
    isCorrect: false, 
    similarity, 
    suggestion: similarity > 50 ? correctAnswer : null 
  }
}

export function AnatomyLab({ onComplete }: AnatomyLabProps) {
  const [labeledParts, setLabeledParts] = useState<string[]>([])
  const [selectedPart, setSelectedPart] = useState<string | null>(null)
  const [showHint, setShowHint] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<{ 
    part: string; 
    correct: boolean; 
    message: string;
    attempts: number;
  } | null>(null)
  const [userInput, setUserInput] = useState('')
  const [attempts, setAttempts] = useState<Record<string, number>>({})
  const [justCompleted, setJustCompleted] = useState(false)
  
  const parts = forelleAnatomy.parts
  const progress = (labeledParts.length / parts.length) * 100
  
  useEffect(() => {
    if (labeledParts.length === parts.length && !justCompleted) {
      setJustCompleted(true)
      setTimeout(() => {
        speak('Hervorragend! Du hast alle Teile der Forelle beschriftet!')
        onComplete(true)
      }, 1000)
    }
  }, [labeledParts, parts.length, justCompleted, onComplete])
  
  const handlePartClick = (partId: string) => {
    if (labeledParts.includes(partId)) return
    setSelectedPart(partId)
    setUserInput('')
    setShowHint(null)
    setFeedback(null)
  }
  
  const handleLabelSubmit = (partId: string) => {
    if (labeledParts.includes(partId)) return
    
    const part = parts.find(p => p.id === partId)
    if (!part) return
    
    const currentAttempts = (attempts[partId] || 0) + 1
    setAttempts(prev => ({ ...prev, [partId]: currentAttempts }))
    
    const result = checkAnswer(userInput, part.correctLabel)
    
    if (result.isCorrect) {
      addXP(part.xp, `anatomy-${partId}`)
      setLabeledParts(prev => [...prev, partId])
      setSelectedPart(null)
      setUserInput('')
      setFeedback({ 
        part: partId, 
        correct: true, 
        message: `✅ Richtig! "${part.correctLabel}" beschriftet! +${part.xp} XP`,
        attempts: currentAttempts 
      })
      speak(getRandomResponse(professorEich.correct))
    } else {
      let message = '❌ Falsch! '
      if (result.similarity > 70) {
        message += `Fast richtig! Du meinst bestimmt "${part.correctLabel}"?`
      } else if (result.similarity > 40) {
        message += 'Das ist nicht ganz richtig. Schau den Hinweis an!'
      } else {
        message += 'Das ist falsch. Lies den Hinweis oder versuche es erneut!'
      }
      
      setFeedback({ 
        part: partId, 
        correct: false, 
        message,
        attempts: currentAttempts 
      })
      
      if (currentAttempts >= 3 && !showHint) {
        setShowHint(partId)
        speak(part.hint)
      }
    }
    
    setTimeout(() => {
      if (feedback?.correct) {
        setFeedback(null)
      }
    }, 3000)
  }
  
  const showPartHint = (partId: string) => {
    setShowHint(partId)
    const part = parts.find(p => p.id === partId)
    if (part) speak(part.hint)
  }
  
  // Hotspot-Positionen - Kopf entfernt
  const getHotspotPos = (partId: string) => {
    const positions: Record<string, {x: number, y: number}> = {
      'kiemen': { x: 218, y: 40 },
      'flosse-ruecken': { x: 135, y: 16 },
      'flosse-seite': { x: 145, y: 45 },
      'schwanz': { x: 35, y: 48 }
    }
    return positions[partId] || { x: 0, y: 0 }
  }
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-gray-800">Fortschritt: {labeledParts.length} / {parts.length}</span>
          <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div className="bg-blue-500 h-3 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>
      
      {/* Professor Eich */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-4xl">🦫</span>
          <div>
            <p className="font-bold text-amber-800">Professor Eich</p>
            <p className="text-gray-700">
              {selectedPart 
                ? `Teil #${parts.findIndex(p => p.id === selectedPart) + 1} ausgewählt. Gib den korrekten Namen ein!`
                : 'Klicke auf die nummerierten Punkte auf dem Bild, gib den Namen des Körperteils ein und drücke Enter!'
              }
            </p>
          </div>
        </div>
      </div>
      
      {/* Forellen-SVG - Bachforelle nach klassischer Zeichnung */}
      <div className="relative bg-gradient-to-b from-cyan-100 via-blue-50 to-cyan-200 rounded-xl p-4 mb-4 overflow-hidden">
        <div className="absolute top-4 left-8 w-3 h-3 bg-white/40 rounded-full animate-pulse" />
        <div className="absolute top-8 right-12 w-2 h-2 bg-white/30 rounded-full animate-pulse delay-500" />
        <div className="absolute bottom-12 left-16 w-4 h-4 bg-white/20 rounded-full animate-pulse delay-1000" />
        
        <svg viewBox="0 0 300 90" className="w-full h-auto max-w-3xl mx-auto" style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.1))' }}>
          <defs>
            <linearGradient id="troutBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3d4f1f" />
              <stop offset="25%" stopColor="#5a6b2c" />
              <stop offset="55%" stopColor="#8a9a9a" />
              <stop offset="100%" stopColor="#d5d8dc" />
            </linearGradient>
            <pattern id="troutScales" x="0" y="0" width="4" height="3" patternUnits="userSpaceOnUse">
              <ellipse cx="2" cy="1.5" rx="1.2" ry="0.8" fill="none" stroke="#2d3748" strokeWidth="0.15" opacity="0.3" />
            </pattern>
            <linearGradient id="finGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#556b2f" />
              <stop offset="100%" stopColor="#8b4513" />
            </linearGradient>
            <linearGradient id="tailGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c53030" />
              <stop offset="30%" stopColor="#f56565" />
              <stop offset="50%" stopColor="#feb2b2" />
              <stop offset="70%" stopColor="#f56565" />
              <stop offset="100%" stopColor="#c53030" />
            </linearGradient>
            <radialGradient id="gillGradient" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#7c2d12" />
              <stop offset="100%" stopColor="#4a5d23" />
            </radialGradient>
          </defs>
          
          <g transform="translate(10, 10)">
            <ellipse cx="140" cy="72" rx="120" ry="7" fill="#000" opacity="0.06" />
            
            {/* Schwanzflosse - tief gegabelt */}
            <g>
              <path d="M 40 40 L 55 40 L 55 55 L 40 55 Z" fill="url(#troutBody)" />
              <path d="M 5 48 C 10 30, 20 32, 40 40 L 40 55 C 20 63, 10 65, 5 48 Z" fill="url(#tailGradient)" stroke="#9b2c2c" strokeWidth="0.5" />
              <path d="M 40 47 L 40 48" fill="none" stroke="#9b2c2c" strokeWidth="0.4" />
              <path d="M 12 48 C 18 38 25 35 32 38" fill="none" stroke="#7b1d1d" strokeWidth="0.3" />
              <path d="M 12 48 C 20 42 28 40 35 41" fill="none" stroke="#7b1d1d" strokeWidth="0.3" />
              <path d="M 12 48 C 20 54 28 55 35 54" fill="none" stroke="#7b1d1d" strokeWidth="0.3" />
              <path d="M 12 48 C 18 58 25 60 32 57" fill="none" stroke="#7b1d1d" strokeWidth="0.3" />
            </g>
            
            {/* Afterflosse */}
            <path d="M 100 62 C 105 70 112 67 115 62 L 110 58 Z" fill="url(#finGradient)" stroke="#3f6212" strokeWidth="0.4" opacity="0.9" />
            
            {/* Körper - durchgehend von Kopf bis Schwanz */}
            <path 
              d="M 55 42 
                 C 55 25, 90 18, 130 16 
                 C 170 14, 210 20, 235 30 
                 C 250 34, 275 32, 282 38 
                 C 285 42, 283 48, 278 52 
                 C 272 56, 260 54, 250 50
                 C 245 55, 255 58, 245 58 
                 C 220 68, 180 72, 130 70 
                 C 90 68, 55 65, 55 48 
                 Z" 
              fill="url(#troutBody)" 
              stroke="#3f6212" 
              strokeWidth="0.5" 
            />
            <path 
              d="M 55 42 C 55 25, 90 18, 130 16 C 170 14, 210 20, 235 30 C 250 34, 275 32, 282 38 C 285 42, 283 48, 278 52 C 272 56, 260 54, 250 50 C 245 55, 255 58, 245 58 C 220 68, 180 72, 130 70 C 90 68, 55 65, 55 48 Z" 
              fill="url(#troutScales)" 
              opacity="0.35" 
            />
            
            {/* Schwarze Flecken (parr marks) */}
            <g fill="#1a202c" opacity="0.65">
              <ellipse cx="80" cy="30" rx="1.8" ry="1.2" />
              <ellipse cx="105" cy="26" rx="1.5" ry="1" />
              <ellipse cx="130" cy="24" rx="1.8" ry="1.2" />
              <ellipse cx="160" cy="26" rx="1.5" ry="1" />
              <ellipse cx="190" cy="30" rx="1.8" ry="1.2" />
              <ellipse cx="210" cy="34" rx="1.5" ry="1" />
              <ellipse cx="90" cy="50" rx="1.5" ry="1" />
              <ellipse cx="120" cy="52" rx="1.8" ry="1.2" />
              <ellipse cx="150" cy="54" rx="1.5" ry="1" />
              <ellipse cx="180" cy="52" rx="1.5" ry="1" />
            </g>
            
            {/* Rote Flecken mit weißen Rändern - typisch Bachforelle */}
            <g opacity="0.75">
              <circle cx="95" cy="32" r="1.2" fill="#c53030" />
              <circle cx="120" cy="34" r="1.1" fill="#c53030" />
              <circle cx="145" cy="36" r="1.2" fill="#c53030" />
              <circle cx="170" cy="38" r="1.1" fill="#c53030" />
              <circle cx="195" cy="40" r="1.2" fill="#c53030" />
              <circle cx="95" cy="32" r="1.8" fill="none" stroke="#f7fafc" strokeWidth="0.3" opacity="0.5" />
              <circle cx="120" cy="34" r="1.7" fill="none" stroke="#f7fafc" strokeWidth="0.3" opacity="0.5" />
              <circle cx="145" cy="36" r="1.8" fill="none" stroke="#f7fafc" strokeWidth="0.3" opacity="0.5" />
              <circle cx="170" cy="38" r="1.7" fill="none" stroke="#f7fafc" strokeWidth="0.3" opacity="0.5" />
              <circle cx="195" cy="40" r="1.8" fill="none" stroke="#f7fafc" strokeWidth="0.3" opacity="0.5" />
            </g>
            
            {/* Rückenflosse */}
            <g>
              <path d="M 115 16 C 130 4 150 8 158 16 L 150 18 L 125 18 Z" fill="url(#finGradient)" stroke="#3f6212" strokeWidth="0.4" />
              <path d="M 125 18 L 128 8" fill="none" stroke="#3f6212" strokeWidth="0.25" />
              <path d="M 132 18 L 138 6" fill="none" stroke="#3f6212" strokeWidth="0.25" />
              <path d="M 140 18 L 150 10" fill="none" stroke="#3f6212" strokeWidth="0.25" />
            </g>
            
            {/* Fettflosse */}
            <ellipse cx="85" cy="17" rx="4" ry="2" fill="#4a5d23" stroke="#3f6212" strokeWidth="0.4" />
            
            {/* Brustflosse */}
            <g>
              <path d="M 195 60 C 205 68 215 64 218 58 L 210 52 Z" fill="url(#finGradient)" stroke="#3f6212" strokeWidth="0.4" opacity="0.9" />
              <path d="M 200 62 L 208 66" fill="none" stroke="#3f6212" strokeWidth="0.25" />
              <path d="M 205 60 L 213 64" fill="none" stroke="#3f6212" strokeWidth="0.25" />
            </g>
            
            {/* Maul - als Einschnitt in den durchgehenden Körper */}
            <path 
              d="M 278 40 C 282 40, 284 42, 284 45 C 284 48, 282 50, 278 50" 
              fill="none" 
              stroke="#1a202c" 
              strokeWidth="1.2" 
              strokeLinecap="round" 
            />
            
            {/* Oberlippe */}
            <path 
              d="M 275 38 C 280 36, 283 38, 282 40" 
              fill="none" 
              stroke="#2d3748" 
              strokeWidth="0.6" 
              opacity="0.7" 
            />
            
            {/* Auge - positioniert nach hinten versetzt */}
            <g>
              <ellipse cx="230" cy="34" rx="4" ry="5" fill="#fef3c7" stroke="#1a202c" strokeWidth="0.5" />
              <circle cx="232" cy="34" r="2.8" fill="#1a202c" />
              <circle cx="233" cy="33" r="0.9" fill="white" />
            </g>
            
            {/* Kiemendeckel - größer und deutlicher */}
            <path d="M 210 28 C 230 24, 235 38, 231 50 C 225 58, 210 54, 203 45 C 197 36, 203 30, 210 28 Z" fill="url(#gillGradient)" stroke="#3f6212" strokeWidth="0.5" />
            <path d="M 213 35 C 216 40, 214 46, 211 48" fill="none" stroke="#5c2810" strokeWidth="0.5" strokeLinecap="round" />
            
            {/* Seitenlinie */}
            <path d="M 55 45 C 90 43 130 44 170 45 C 210 46 240 42 255 40" fill="none" stroke="#faf5eb" strokeWidth="1" opacity="0.8" strokeLinecap="round" />
            <g fill="#4a5568">
              <circle cx="75" cy="44.5" r="0.5" />
              <circle cx="100" cy="44.3" r="0.5" />
              <circle cx="125" cy="44.5" r="0.5" />
              <circle cx="150" cy="45" r="0.5" />
              <circle cx="175" cy="45.2" r="0.5" />
              <circle cx="200" cy="44.8" r="0.5" />
              <circle cx="225" cy="43.5" r="0.5" />
            </g>
            
            {/* Hotspots */}
            {parts.map((part) => {
              const isLabeled = labeledParts.includes(part.id)
              const isSelected = selectedPart === part.id
              const pos = getHotspotPos(part.id)
              
              return (
                <g key={part.id} onClick={() => handlePartClick(part.id)} style={{ cursor: isLabeled ? 'default' : 'pointer' }}>
                  <circle cx={pos.x} cy={pos.y} r={isLabeled ? 4 : 5} fill={isLabeled ? '#22c55e' : isSelected ? '#f59e0b' : '#ef4444'} stroke="white" strokeWidth="1.5" opacity={isLabeled ? 0.85 : 0.9} />
                  
                  {!isLabeled && !isSelected && (
                    <circle cx={pos.x} cy={pos.y} r="8" fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0.4">
                      <animate attributeName="r" values="7;11;7" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}
                  
                  {isLabeled && (
                    <g>
                      <rect x={pos.x - 22} y={pos.y - 14} width="44" height="10" rx="2" fill="white" opacity="0.9" stroke="#22c55e" strokeWidth="0.5" />
                      <text x={pos.x} y={pos.y - 7} textAnchor="middle" fill="#166534" style={{ fontSize: '5px' }}>{part.correctLabel}</text>
                    </g>
                  )}
                  
                  {isSelected && (
                    <g>
                      <circle cx={pos.x} cy={pos.y} r="9" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,2">
                        <animateTransform attributeName="transform" type="rotate" from={`0 ${pos.x} ${pos.y}`} to={`360 ${pos.x} ${pos.y}`} dur="8s" repeatCount="indefinite" />
                      </circle>
                      <circle cx={pos.x} cy={pos.y} r="12" fill="none" stroke="#fbbf24" strokeWidth="0.8" opacity="0.25" />
                    </g>
                  )}
                </g>
              )
            })}
          </g>
        </svg>
      </div>
      
      {/* Eingabefeld */}
      {selectedPart && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Teil beschriften: {parts.find(p => p.id === selectedPart)?.name}
            </h3>
            
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLabelSubmit(selectedPart)}
              placeholder="Name eingeben..."
              className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg mb-4 focus:border-blue-500 focus:outline-none"
              autoFocus
            />
            
            {showHint === selectedPart && (
              <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 mb-3">
                <p className="text-sm text-amber-800 font-bold">💡 Hinweis:</p>
                <p className="text-sm text-amber-700">{parts.find(p => p.id === selectedPart)?.hint}</p>
              </div>
            )}
            
            {(attempts[selectedPart] || 0) > 0 && (
              <div className="flex items-center gap-2 mb-3 text-amber-600 text-sm">
                <AlertCircle size={16} />
                <span>Versuch {(attempts[selectedPart] || 0)} / ∞</span>
                {(attempts[selectedPart] || 0) >= 3 && (
                  <span className="text-amber-700 font-bold">- Hinweis verfügbar!</span>
                )}
              </div>
            )}
            
            <div className="flex gap-2">
              <button onClick={() => handleLabelSubmit(selectedPart)} disabled={!userInput.trim()} className="flex-1 bg-green-500 text-white px-4 py-3 rounded-lg font-bold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed">
                <Check size={18} /> Überprüfen
              </button>
              <button onClick={() => showPartHint(selectedPart)} className="bg-amber-400 text-white px-4 py-3 rounded-lg font-bold hover:bg-amber-500 transition-colors">
                <HelpCircle size={18} />
              </button>
              <button onClick={() => { setSelectedPart(null); setUserInput(''); setShowHint(null); }} className="bg-gray-400 text-white px-4 py-3 rounded-lg font-bold hover:bg-gray-500 transition-colors">
                <X size={18} />
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-3">+{parts.find(p => p.id === selectedPart)?.xp} XP bei korrekter Schreibweise</p>
          </div>
        </div>
      )}
      
      {/* Feedback */}
      {feedback && (
        <div className={`mt-4 p-4 rounded-lg text-center font-bold ${feedback.correct ? 'bg-green-100 text-green-800 border-2 border-green-300' : 'bg-red-100 text-red-800 border-2 border-red-300'}`}>
          <div className="text-lg">{feedback.message}</div>
          {!feedback.correct && feedback.attempts > 0 && (
            <div className="text-sm mt-2 font-normal">
              {feedback.attempts >= 3 ? '👆 Klicke auf das Fragezeichen für einen Hinweis!' : 'Versuche es nochmal oder hol dir einen Hinweis!'}
            </div>
          )}
        </div>
      )}
      
      {/* Legende */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-600">
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>Noch nicht beschriftet</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>Bereits beschriftet</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>Ausgewählt</div>
      </div>
    </div>
  )
}
