'use client'

import { useState, useEffect } from 'react'
import { forelleAnatomy, professorEich } from '@/lib/data'
import { addXP } from '@/lib/xp'
import { speak, getRandomResponse } from '@/lib/speech'
import { Check, X, HelpCircle } from 'lucide-react'

interface AnatomyLabProps {
  onComplete: (success: boolean) => void
}

export function AnatomyLab({ onComplete }: AnatomyLabProps) {
  const [labeledParts, setLabeledParts] = useState<string[]>([])
  const [selectedPart, setSelectedPart] = useState<string | null>(null)
  const [showHint, setShowHint] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<{ part: string; correct: boolean } | null>(null)
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
    setShowHint(null)
    setFeedback(null)
  }
  
  const handleLabelSubmit = (partId: string) => {
    if (labeledParts.includes(partId)) return
    
    const part = parts.find(p => p.id === partId)
    if (!part) return
    
    // Simulate correct labeling - in real implementation this could be text input
    // For MVP: clicking confirms the label
    const xpResult = addXP(part.xp, `anatomy-${partId}`)
    
    setLabeledParts(prev => [...prev, partId])
    setSelectedPart(null)
    setFeedback({ part: partId, correct: true })
    
    speak(getRandomResponse(professorEich.correct))
    
    setTimeout(() => {
      setFeedback(null)
    }, 1500)
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
                ? `Klicke auf "${parts.find(p => p.id === selectedPart)?.name} beschriftet" um es zu markieren!`
                : 'Klicke auf die roten Punkte auf dem Bild, um die Teile der Forelle zu beschriftet!'
              }
            </p>
          </div>
        </div>
      </div>
      
      {/* Interactive Fish SVG */}
      <div className="relative bg-gradient-to-b from-cyan-50 to-blue-100 rounded-xl p-6 mb-4 overflow-hidden">
        <svg 
          viewBox="0 0 200 100" 
          className="w-full h-auto max-w-md mx-auto"
          style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
        >
          {/* Water effect background */}
          <defs>
            <linearGradient id="fishGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="50%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
            <pattern id="scales" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#15803d" opacity="0.3" />
            </pattern>
          </defs>
          
          {/* Fish Body - Streamlined trout shape */}
          <g>
            {/* Main body */}
            <ellipse 
              cx="100" cy="50" 
              rx="70" ry="25" 
              fill="url(#fishGradient)" 
              stroke="#166534" 
              strokeWidth="1.5"
            />
            <ellipse 
              cx="100" cy="50" 
              rx="70" ry="25" 
              fill="url(#scales)" 
            />
            
            {/* Head - more pointed */}
            <path 
              d="M 160 50 Q 175 40 185 35 Q 190 32 188 45 L 185 50 L 188 55 Q 190 68 185 65 Q 175 60 160 50" 
              fill="url(#fishGradient)" 
              stroke="#166534" 
              strokeWidth="1.5"
            />
            
            {/* Tail - forked */}
            <path 
              d="M 30 50 L 10 35 Q 5 30 8 40 L 15 50 L 8 60 Q 5 70 10 65 L 30 50" 
              fill="#22c55e" 
              stroke="#166534" 
              strokeWidth="1.5"
            />
            
            {/* Dorsal fin (Rückenflosse) */}
            <path 
              d="M 90 28 Q 100 15 110 20 L 115 28 L 105 30 L 95 30 Z" 
              fill="#16a34a" 
              stroke="#166534" 
              strokeWidth="1"
            />
            
            {/* Pectoral fin (Brustflosse) */}
            <ellipse 
              cx="130" cy="65" 
              rx="12" ry="6" 
              fill="#16a34a" 
              stroke="#166534" 
              strokeWidth="1"
              transform="rotate(-20 130 65)"
            />
            
            {/* Eye */}
            <circle cx="170" cy="45" r="5" fill="white" stroke="#166534" strokeWidth="1" />
            <circle cx="171" cy="45" r="2" fill="black" />
            <circle cx="172" cy="44" r="1" fill="white" opacity="0.8" />
            
            {/* Mouth */}
            <path 
              d="M 185 50 Q 188 50 188 52 Q 188 54 185 54" 
              fill="none" 
              stroke="#166534" 
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            
            {/* Side line (Seitenlinie) */}
            <path 
              d="M 35 50 Q 70 48 100 50 Q 130 52 155 50" 
              fill="none" 
              stroke="#86efac" 
              strokeWidth="1.5" 
              strokeDasharray="3,2"
              opacity="0.7"
            />
          </g>
          
          {/* Clickable Hotspots */}
          {parts.map((part) => {
            const isLabeled = labeledParts.includes(part.id)
            const isSelected = selectedPart === part.id
            
            // Map percentage coordinates to SVG coordinates
            const x = (part.x / 100) * 200
            const y = (part.y / 100) * 100
            
            return (
              <g key={part.id} className="cursor-pointer" onClick={() => handlePartClick(part.id)}>
                {/* Hotspot circle */}
                <circle 
                  cx={x} 
                  cy={y} 
                  r={isLabeled ? 6 : 8} 
                  fill={isLabeled ? '#22c55e' : isSelected ? '#f59e0b' : '#ef4444'}
                  stroke="white"
                  strokeWidth="2"
                  opacity={isLabeled ? 0.8 : 1}
                  style={{ 
                    filter: isSelected ? 'drop-shadow(0 0 4px #f59e0b)' : 'none',
                    transition: 'all 0.2s'
                  }}
                />
                
                {/* Pulsing animation for unlabeled parts */}
                {!isLabeled && !isSelected && (
                  <circle 
                    cx={x} 
                    cy={y} 
                    r={12} 
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="1"
                    opacity="0.4"
                  >
                    <animate 
                      attributeName="r" 
                      values="10;14;10" 
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
                
                {/* Label text */}
                {isLabeled && (
                  <text 
                    x={x} 
                    y={y - 12} 
                    textAnchor="middle" 
                    className="text-xs font-bold"
                    fill="#166534"
                    style={{ fontSize: '8px' }}
                  >
                    {part.correctLabel}
                  </text>
                )}
                
                {/* Selection indicator */}
                {isSelected && (
                  <>
                    <circle 
                      cx={x} 
                      cy={y} 
                      r={14} 
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2"
                      strokeDasharray="4,2"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from={`0 ${x} ${y}`}
                        to={`360 ${x} ${y}`}
                        dur="8s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </>
                )}
              </g>
            )
          })}
        </svg>
      </div>
      
      {/* Part selection panel */}
      {selectedPart && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-4 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-start gap-3">
            <span className="text-3xl">🏷️</span>
            <div className="flex-1">
              <p className="font-bold text-blue-800 mb-1">
                Teil ausgewählt: {parts.find(p => p.id === selectedPart)?.name}
              </p>
              
              {showHint === selectedPart && (
                <p className="text-sm text-blue-600 mb-3 italic">
                  💡 Hinweis: {parts.find(p => p.id === selectedPart)?.hint}
                </p>
              )}
              
              <div className="flex gap-2">
                <button 
                  onClick={() => handleLabelSubmit(selectedPart)}
                  className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Check size={18} />
                  {parts.find(p => p.id === selectedPart)?.correctLabel} beschriftet
                </button>
                
                <button 
                  onClick={() => showPartHint(selectedPart)}
                  className="bg-amber-400 text-white px-4 py-2 rounded-lg font-bold hover:bg-amber-500 transition-colors"
                  title="Hinweis anzeigen"
                >
                  <HelpCircle size={18} />
                </button>
                
                <button 
                  onClick={() => setSelectedPart(null)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              
              <p className="text-xs text-gray-500 mt-2">
                +{parts.find(p => p.id === selectedPart)?.xp} XP für korrekte Beschriftung
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Feedback */}
      {feedback && (
        <div className={`mt-4 p-4 rounded-lg text-center font-bold animate-in zoom-in
          ${feedback.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
        `}>
          {feedback.correct ? (
            <>
              ✅ Richtig beschriftet! +{parts.find(p => p.id === feedback.part)?.xp} XP!
            </>
          ) : (
            <>❌ Versuch es nochmal!</>
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
