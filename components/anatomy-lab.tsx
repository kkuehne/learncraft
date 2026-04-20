'use client'

import { useState, useEffect } from 'react'
import { forelleAnatomy, professorEich } from '@/lib/data'
import { addXP } from '@/lib/xp'
import { speak, getRandomResponse } from '@/lib/speech'
import { Check, X, HelpCircle, AlertCircle } from 'lucide-react'

interface AnatomyLabProps {
  onComplete: (success: boolean) => void
}

// Funktion zum Normalisieren des Textes für Vergleich
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

// Funktion zum Prüfen der Ähnlichkeit (Levenshtein-Distanz könnte man hier verwenden, 
// aber wir machen es erstmal einfach mit exaktem oder fast-exaktem Match)
function checkAnswer(userInput: string, correctAnswer: string): { 
  isCorrect: boolean; 
  similarity: number;
  suggestion: string | null 
} {
  const normalizedUser = normalizeText(userInput)
  const normalizedCorrect = normalizeText(correctAnswer)
  
  // Exaktes Match
  if (normalizedUser === normalizedCorrect) {
    return { isCorrect: true, similarity: 100, suggestion: null }
  }
  
  // Teilweise Übereinstimmung (für Tippfehler)
  if (normalizedCorrect.includes(normalizedUser) || normalizedUser.includes(normalizedCorrect)) {
    if (normalizedUser.length >= normalizedCorrect.length * 0.7) {
      return { isCorrect: true, similarity: 85, suggestion: correctAnswer }
    }
  }
  
  // Ähnlichkeit berechnen (einfache Version)
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
    setUserInput('')  // Reset input bei neuem Teil
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
      // Richtig! XP gibt's erst bei korrekter Antwort
      const xpResult = addXP(part.xp, `anatomy-${partId}`)
      
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
      // Falsch! Kein XP, Hinweis zeigen
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
      
      // Nach 3 Fehlversuchen automatisch Hinweis anzeigen
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
    if (part) {
      speak(part.hint)
    }
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
          <div 
            className="bg-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
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
      
      {/* Interactive Fish SVG - Realistic Trout */}
      <div className="relative bg-gradient-to-b from-cyan-100 via-blue-50 to-cyan-200 rounded-xl p-4 mb-4 overflow-hidden">
        {/* Water bubbles decoration */}
        <div className="absolute top-4 left-8 w-3 h-3 bg-white/40 rounded-full animate-pulse" />
        <div className="absolute top-8 right-12 w-2 h-2 bg-white/30 rounded-full animate-pulse delay-500" />
        <div className="absolute bottom-12 left-16 w-4 h-4 bg-white/20 rounded-full animate-pulse delay-1000" />
        
        <svg 
          viewBox="0 0 280 80" 
          className="w-full h-auto max-w-3xl mx-auto"
          style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.12))' }}
        >
          <defs>
            {/* Realistic trout body gradient - olive to silver */}
            <linearGradient id="troutBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4a5d23" />   {/* Dark olive top */}
              <stop offset="30%" stopColor="#6b8e23" />  {/* Olive green */}
              <stop offset="60%" stopColor="#9ca3af" />  {/* Silver gray */}
              <stop offset="100%" stopColor="#e5e7eb" /> {/* Light silver belly */}
            </linearGradient>
            
            {/* Scale pattern */}
            <pattern id="troutScales" x="0" y="0" width="3" height="2" patternUnits="userSpaceOnUse">
              <ellipse cx="1.5" cy="1" rx="1" ry="0.6" fill="none" stroke="#374151" strokeWidth="0.2" opacity="0.4" />
            </pattern>
            
            {/* Fin gradient */}
            <linearGradient id="finGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6b8e23" />
              <stop offset="100%" stopColor="#d97706" /> {/* Hint of amber/orange */}
            </linearGradient>
            
            {/* Tail fin gradient - pinkish */}
            <linearGradient id="tailGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#dc2626" />   {/* Red edge */}
              <stop offset="50%" stopColor="#f87171" />  {/* Pink */}
              <stop offset="100%" stopColor="#dc2626" /> {/* Red edge */}
            </linearGradient>
            
            {/* Gill cover gradient */}
            <radialGradient id="gillGradient" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#7c2d12" />   {/* Dark red/brown */}
              <stop offset="100%" stopColor="#4a5d23" />
            </radialGradient>
          </defs>
          
          <g transform="translate(15, 8)">
            {/* Shadow under fish - adjusted for new proportions */}
            <ellipse cx="130" cy="70" rx="100" ry="8" fill="#000" opacity="0.08" />
            
            {/* --- TAIL FIN (Schwanzflosse) - Most posterior --- */}
            <g>
              {/* Tail peduncle - narrower for streamlined look */}
              <path d="M 30 38 L 42 38 L 42 48 L 30 48 Z" fill="url(#troutBody)" />
              
              {/* Tail fin - more elongated and forked */}
              <path 
                d="M 5 43 Q 12 30 18 33 L 30 40 
                   L 30 46 L 18 53 Q 12 56 5 43 Z" 
                fill="url(#tailGradient)" 
                stroke="#991b1b" 
                strokeWidth="0.4"
              />
              {/* Tail rays - finer */}
              <path d="M 8 43 Q 14 36 18 34" fill="none" stroke="#7f1d1d" strokeWidth="0.25" />
              <path d="M 8 43 Q 14 40 18 38" fill="none" stroke="#7f1d1d" strokeWidth="0.25" />
              <path d="M 8 43 Q 14 50 18 52" fill="none" stroke="#7f1d1d" strokeWidth="0.25" />
              <path d="M 8 43 Q 14 46 18 48" fill="none" stroke="#7f1d1d" strokeWidth="0.25" />
            </g>
            
            {/* --- ANAL FIN (After/Dorsal) --- */}
            <path 
              d="M 85 58 Q 90 66 95 62 L 92 57 Z" 
              fill="url(#finGradient)" 
              stroke="#3f6212" 
              strokeWidth="0.4"
              opacity="0.85"
            />
            
            {/* --- MAIN BODY --- */}
            {/* Body shape - more streamlined, elongated trout */}
            <path 
              d="M 42 40 
                 Q 42 22 80 18 
                 Q 130 14 175 20
                 Q 210 26 225 38
                 Q 230 42 230 43
                 Q 230 44 225 48
                 Q 210 60 175 66
                 Q 130 72 80 68
                 Q 42 64 42 46
                 Z" 
              fill="url(#troutBody)" 
              stroke="#3f6212" 
              strokeWidth="0.6"
            />
            
            {/* Scales overlay */}
            <path 
              d="M 42 40 
                 Q 42 22 80 18 
                 Q 130 14 175 20
                 Q 210 26 225 38
                 Q 230 42 230 43
                 Q 230 44 225 48
                 Q 210 60 175 66
                 Q 130 72 80 68
                 Q 42 64 42 46
                 Z" 
              fill="url(#troutScales)" 
              opacity="0.4"
            />
            
            {/* Spots/dots typical of trout - more scattered */}
            <g fill="#1f2937" opacity="0.6">
              <ellipse cx="70" cy="28" rx="1.5" ry="1" />
              <ellipse cx="90" cy="26" rx="1.2" ry="0.8" />
              <ellipse cx="110" cy="24" rx="1.5" ry="1" />
              <ellipse cx="135" cy="26" rx="1.2" ry="0.8" />
              <ellipse cx="155" cy="30" rx="1.5" ry="1" />
              <ellipse cx="175" cy="32" rx="1.2" ry="0.8" />
              <ellipse cx="100" cy="50" rx="1.2" ry="0.8" />
              <ellipse cx="125" cy="52" rx="1.5" ry="1" />
              <ellipse cx="150" cy="54" rx="1.2" ry="0.8" />
              <ellipse cx="170" cy="52" rx="1.2" ry="0.8" />
            </g>
            
            {/* Red spots - more subtle */}
            <g fill="#dc2626" opacity="0.4">
              <circle cx="85" cy="32" r="0.9" />
              <circle cx="105" cy="35" r="0.8" />
              <circle cx="125" cy="38" r="0.9" />
              <circle cx="145" cy="40" r="0.8" />
              <circle cx="165" cy="42" r="0.9" />
            </g>
            
            {/* --- DORSAL FIN (Rückenflosse) --- */}
            <g>
              <path 
                d="M 95 16 Q 110 6 125 12 L 128 18 L 118 18 L 98 18 Z" 
                fill="url(#finGradient)" 
                stroke="#3f6212" 
                strokeWidth="0.4"
              />
              {/* Fin rays */}
              <path d="M 105 18 L 108 10" fill="none" stroke="#3f6212" strokeWidth="0.25" />
              <path d="M 112 18 L 116 9" fill="none" stroke="#3f6212" strokeWidth="0.25" />
              <path d="M 119 18 L 124 11" fill="none" stroke="#3f6212" strokeWidth="0.25" />
            </g>
            
            {/* --- ADIPOSE FIN --- */}
            <ellipse 
              cx="60" cy="18" rx="3" ry="1.5" 
              fill="#4a5d23" 
              stroke="#3f6212" 
              strokeWidth="0.4"
            />
            
            {/* --- PECTORAL FIN (Breast fin) --- */}
            <g>
              <path 
                d="M 160 60 Q 170 70 178 64 L 174 58 Z" 
                fill="url(#finGradient)" 
                stroke="#3f6212" 
                strokeWidth="0.4"
                opacity="0.85"
              />
              {/* Fin rays */}
              <path d="M 166 62 L 172 67" fill="none" stroke="#3f6212" strokeWidth="0.25" />
              <path d="M 168 60 L 175 65" fill="none" stroke="#3f6212" strokeWidth="0.25" />
            </g>
            
            {/* --- HEAD --- */}
            {/* Snout - more pointed */}
            <path 
              d="M 225 38 Q 245 32 250 40 Q 252 43 250 46 Q 245 54 235 50" 
              fill="url(#troutBody)" 
              stroke="#3f6212" 
              strokeWidth="0.6"
            />
            
            {/* Mouth */}
            <path 
              d="M 245 44 Q 248 44 248 46 Q 248 48 245 48" 
              fill="none" 
              stroke="#1f2937" 
              strokeWidth="0.8"
              strokeLinecap="round"
            />
            
            {/* Eye */}
            <g>
              <ellipse cx="218" cy="36" rx="4" ry="5" fill="#fef3c7" stroke="#1f2937" strokeWidth="0.6" />
              <circle cx="220" cy="36" r="2.5" fill="#1f2937" />
              <circle cx="221" cy="35" r="0.8" fill="white" />
            </g>
            
            {/* Gill cover (Kiemendeckel) - smaller */}
            <path 
              d="M 205 32 Q 220 28 223 42 Q 220 54 205 50 Q 198 41 205 32 Z" 
              fill="url(#gillGradient)" 
              stroke="#3f6212" 
              strokeWidth="0.6"
            />
            
            {/* Gill slit line */}
            <path 
              d="M 208 38 Q 211 42 208 46" 
              fill="none" 
              stroke="#7c2d12" 
              strokeWidth="0.4"
              strokeLinecap="round"
            />
            
            {/* --- LATERAL LINE (Seitenlinie) --- */}
            <path 
              d="M 35 43 Q 70 41 115 43 Q 160 45 200 42" 
              fill="none" 
              stroke="#fef3c7" 
              strokeWidth="0.9" 
              opacity="0.7"
              strokeLinecap="round"
            />
            
            {/* Lateral line sensory pores - smaller */}
            <g fill="#374151">
              <circle cx="55" cy="42.8" r="0.45" />
              <circle cx="75" cy="42.5" r="0.45" />
              <circle cx="95" cy="42.8" r="0.45" />
              <circle cx="115" cy="43" r="0.45" />
              <circle cx="135" cy="43.2" r="0.45" />
              <circle cx="155" cy="43" r="0.45" />
              <circle cx="175" cy="42.5" r="0.45" />
              <circle cx="192" cy="42" r="0.45" />
            </g>
          </g>
          
          {/* Clickable Hotspots - Updated positions for new fish shape */}
          {parts.map((part) => {
            const isLabeled = labeledParts.includes(part.id)
            const isSelected = selectedPart === part.id
            
            // Fine-tuned positions for new streamlined fish proportions
            let adjustedX = 0, adjustedY = 0
            
            if (part.id === 'kopf') { adjustedX = 238; adjustedY = 38 }
            if (part.id === 'kiemen') { adjustedX = 208; adjustedY = 38 }
            if (part.id === 'flosse-ruecken') { adjustedX = 110; adjustedY = 15 }
            if (part.id === 'flosse-seite') { adjustedX = 105; adjustedY = 43 }
            if (part.id === 'schwanz') { adjustedX = 32; adjustedY = 43 }
            
            return (
              <g key={part.id} className="cursor-pointer" onClick={() => handlePartClick(part.id)}>
                {/* Hotspot circle - smaller and more subtle */}
                <circle 
                  cx={adjustedX} 
                  cy={adjustedY} 
                  r={isLabeled ? 4 : 5} 
                  fill={isLabeled ? '#22c55e' : isSelected ? '#f59e0b' : '#ef4444'}
                  stroke="white"
                  strokeWidth="1.5"
                  opacity={isLabeled ? 0.85 : 0.9}
                  style={{ 
                    filter: isSelected ? 'drop-shadow(0 0 4px #f59e0b)' : 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))',
                    transition: 'all 0.2s'
                  }}
                />
                
                {/* Pulsing animation for unlabeled parts - smaller */}
                {!isLabeled && !isSelected && (
                  <circle 
                    cx={adjustedX} 
                    cy={adjustedY} 
                    r={8} 
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="1.5"
                    opacity="0.4"
                  >
                    <animate 
                      attributeName="r" 
                      values="7;11;7" 
                      dur="2s" 
                      repeatCount="indefinite"
                    />
                    <animate 
                      attributeName="opacity" 
                      values="0.4;0.1;0.4" 
                      dur="2s" 
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
                
                {/* Label text - smaller, more compact */}
                {isLabeled && (
                  <g>
                    <rect 
                      x={adjustedX - 22} 
                      y={adjustedY - 14} 
                      width="44" 
                      height="10" 
                      rx="2" 
                      fill="white" 
                      opacity="0.9"
                      stroke="#22c55e"
                      strokeWidth="0.5"
                    />
                    <text 
                      x={adjustedX} 
                      y={adjustedY - 7} 
                      textAnchor="middle" 
                      className="font-medium"
                      fill="#166534"
                      style={{ fontSize: '5px' }}
                    >
                      {part.correctLabel}
                    </text>
                  </g>
                )}
                
                {/* Selection indicator - smaller */}
                {isSelected && (
                  <g>
                    <circle 
                      cx={adjustedX} 
                      cy={adjustedY} 
                      r={9} 
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="1.5"
                      strokeDasharray="4,2"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from={`0 ${adjustedX} ${adjustedY}`}
                        to={`360 ${adjustedX} ${adjustedY}`}
                        dur="8s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    {/* Glow effect - smaller */}
                    <circle 
                      cx={adjustedX} 
                      cy={adjustedY} 
                      r={12} 
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="0.8"
                      opacity="0.25"
                    />
                  </g>
                )}
              </g>
            )
          })}
        </svg>
      </div>
      
      {/* Part selection panel with TEXT INPUT */}
      {selectedPart && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-4 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-start gap-3">
            <span className="text-3xl">✏️</span>
            <div className="flex-1">
              <p className="font-bold text-blue-800 mb-1">
                Teil #{parts.findIndex(p => p.id === selectedPart) + 1}: {parts.find(p => p.id === selectedPart)?.name}
              </p>
              
              <p className="text-sm text-blue-600 mb-3">
                💡 Tipp: Schreibe den korrekten Namen. Achte auf Groß- und Kleinschreibung!
              </p>
              
              {/* Text Input Field */}
              <div className="mb-3">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleLabelSubmit(selectedPart)
                    }
                  }}
                  placeholder="Name des Teils eingeben..."
                  className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 text-lg"
                  autoFocus
                />
              </div>
              
              {showHint === selectedPart && (
                <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 mb-3">
                  <p className="text-sm text-amber-800 font-bold">💡 Hinweis:</p>
                  <p className="text-sm text-amber-700">
                    {parts.find(p => p.id === selectedPart)?.hint}
                  </p>
                </div>
              )}
              
              {/* Attempt counter warning */}
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
                <button 
                  onClick={() => handleLabelSubmit(selectedPart)}
                  disabled={!userInput.trim()}
                  className="flex-1 bg-green-500 text-white px-4 py-3 rounded-lg font-bold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Check size={18} />
                  Überprüfen
                </button>
                
                <button 
                  onClick={() => showPartHint(selectedPart)}
                  className="bg-amber-400 text-white px-4 py-3 rounded-lg font-bold hover:bg-amber-500 transition-colors"
                  title="Hinweis anzeigen"
                >
                  <HelpCircle size={18} />
                </button>
                
                <button 
                  onClick={() => {
                    setSelectedPart(null)
                    setUserInput('')
                    setShowHint(null)
                  }}
                  className="bg-gray-400 text-white px-4 py-3 rounded-lg font-bold hover:bg-gray-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              
              <p className="text-xs text-gray-500 mt-3">
                +{parts.find(p => p.id === selectedPart)?.xp} XP bei korrekter Schreibweise
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Feedback with detailed message */}
      {feedback && (
        <div className={`mt-4 p-4 rounded-lg text-center font-bold animate-in zoom-in ${
          feedback.correct 
            ? 'bg-green-100 text-green-800 border-2 border-green-300' 
            : 'bg-red-100 text-red-800 border-2 border-red-300'
        }`}>
          <div className="text-lg">
            {feedback.message}
          </div>
          {!feedback.correct && feedback.attempts > 0 && (
            <div className="text-sm mt-2 font-normal">
              {feedback.attempts >= 3 
                ? '👆 Klicke auf das Fragezeichen für einen Hinweis!' 
                : 'Versuche es nochmal oder hol dir einen Hinweis!'}
            </div>
          )}
        </div>
      )}
      
      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
          Noch nicht beschriftet
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
          Bereits beschriftet
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
          Ausgewählt
        </div>
      </div>
    </div>
  )
}
