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
      
      {/* Interactive Fish SVG - Realistic Trout */}
      <div className="relative bg-gradient-to-b from-cyan-100 via-blue-50 to-cyan-200 rounded-xl p-4 mb-4 overflow-hidden">
        {/* Water bubbles decoration */}
        <div className="absolute top-4 left-8 w-3 h-3 bg-white/40 rounded-full animate-pulse" />
        <div className="absolute top-8 right-12 w-2 h-2 bg-white/30 rounded-full animate-pulse delay-500" />
        <div className="absolute bottom-12 left-16 w-4 h-4 bg-white/20 rounded-full animate-pulse delay-1000" />
        
        <svg 
          viewBox="0 0 240 100" 
          className="w-full h-auto max-w-2xl mx-auto"
          style={{ filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.15))' }}
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
          
          <g transform="translate(20, 10)">
            {/* Shadow under fish */}
            <ellipse cx="105" cy="78" rx="85" ry="12" fill="#000" opacity="0.1" />
            
            {/* --- TAIL FIN (Schwanzflosse) - Most posterior --- */}
            <g>
              {/* Tail peduncle (narrow part before tail) */}
              <path d="M 25 45 L 35 45 L 35 55 L 25 55 Z" fill="url(#troutBody)" />
              
              {/* Tail fin - deeply forked like a trout */}
              <path 
                d="M 5 50 Q 15 35 20 38 L 35 45 
                   L 35 55 L 20 62 Q 15 65 5 50 Z" 
                fill="url(#tailGradient)" 
                stroke="#991b1b" 
                strokeWidth="0.5"
              />
              {/* Tail rays */}
              <path d="M 8 50 Q 15 42 20 40" fill="none" stroke="#7f1d1d" strokeWidth="0.3" />
              <path d="M 8 50 Q 15 45 20 43" fill="none" stroke="#7f1d1d" strokeWidth="0.3" />
              <path d="M 8 50 Q 15 58 20 60" fill="none" stroke="#7f1d1d" strokeWidth="0.3" />
              <path d="M 8 50 Q 15 55 20 57" fill="none" stroke="#7f1d1d" strokeWidth="0.3" />
            </g>
            
            {/* --- ANAL FIN (After/Dorsal) --- */}
            <path 
              d="M 70 65 Q 75 75 80 70 L 78 65 Z" 
              fill="url(#finGradient)" 
              stroke="#3f6212" 
              strokeWidth="0.5"
              opacity="0.9"
            />
            
            {/* --- MAIN BODY --- */}
            {/* Body shape - streamlined trout profile */}
            <path 
              d="M 35 45 
                 Q 35 25 70 22 
                 Q 110 20 150 25
                 Q 180 30 195 42
                 Q 200 45 200 50
                 Q 200 55 195 58
                 Q 180 70 150 75
                 Q 110 80 70 78
                 Q 35 75 35 55
                 Z" 
              fill="url(#troutBody)" 
              stroke="#3f6212" 
              strokeWidth="0.8"
            />
            
            {/* Scales overlay */}
            <path 
              d="M 35 45 
                 Q 35 25 70 22 
                 Q 110 20 150 25
                 Q 180 30 195 42
                 Q 200 45 200 50
                 Q 200 55 195 58
                 Q 180 70 150 75
                 Q 110 80 70 78
                 Q 35 75 35 55
                 Z" 
              fill="url(#troutScales)" 
              opacity="0.5"
            />
            
            {/* Spots/dots typical of trout */}
            <g fill="#1f2937" opacity="0.7">
              <ellipse cx="60" cy="35" rx="2" ry="1.5" />
              <ellipse cx="75" cy="30" rx="1.5" ry="1" />
              <ellipse cx="90" cy="32" rx="2" ry="1.5" />
              <ellipse cx="110" cy="28" rx="1.5" ry="1" />
              <ellipse cx="125" cy="35" rx="2" ry="1.5" />
              <ellipse cx="140" cy="30" rx="1.5" ry="1" />
              <ellipse cx="155" cy="38" rx="2" ry="1.5" />
              <ellipse cx="85" cy="55" rx="1.5" ry="1" />
              <ellipse cx="100" cy="60" rx="2" ry="1.5" />
              <ellipse cx="120" cy="58" rx="1.5" ry="1" />
              <ellipse cx="135" cy="65" rx="2" ry="1.5" />
            </g>
            
            {/* Red spots (parr marks or spawning colors) */}
            <g fill="#dc2626" opacity="0.5">
              <circle cx="70" cy="40" r="1.2" />
              <circle cx="95" cy="45" r="1" />
              <circle cx="115" cy="42" r="1.2" />
              <circle cx="130" cy="48" r="1" />
              <circle cx="145" cy="52" r="1.2" />
            </g>
            
            {/* --- DORSAL FIN (Rückenflosse) --- */}
            <g>
              <path 
                d="M 80 22 Q 95 8 110 15 L 115 22 L 105 23 L 85 23 Z" 
                fill="url(#finGradient)" 
                stroke="#3f6212" 
                strokeWidth="0.5"
              />
              {/* Fin rays */}
              <path d="M 88 22 L 92 12" fill="none" stroke="#3f6212" strokeWidth="0.3" />
              <path d="M 95 22 L 100 11" fill="none" stroke="#3f6212" strokeWidth="0.3" />
              <path d="M 102 22 L 108 13" fill="none" stroke="#3f6212" strokeWidth="0.3" />
            </g>
            
            {/* --- ADIPOSE FIN (small fin between dorsal and tail) --- */}
            <ellipse 
              cx="50" cy="25" rx="4" ry="2" 
              fill="#4a5d23" 
              stroke="#3f6212" 
              strokeWidth="0.5"
            />
            
            {/* --- PECTORAL FIN (Breast fin) --- */}
            <g>
              <path 
                d="M 135 70 Q 145 82 155 75 L 150 68 Z" 
                fill="url(#finGradient)" 
                stroke="#3f6212" 
                strokeWidth="0.5"
                opacity="0.9"
              />
              {/* Fin rays */}
              <path d="M 142 72 L 148 78" fill="none" stroke="#3f6212" strokeWidth="0.3" />
              <path d="M 145 70 L 152 76" fill="none" stroke="#3f6212" strokeWidth="0.3" />
            </g>
            
            {/* --- HEAD --- */}
            {/* Snout */}
            <path 
              d="M 195 42 Q 210 35 215 42 Q 218 45 215 50 Q 210 60 200 55" 
              fill="url(#troutBody)" 
              stroke="#3f6212" 
              strokeWidth="0.8"
            />
            
            {/* Mouth */}
            <path 
              d="M 210 48 Q 213 48 213 50 Q 213 52 210 52" 
              fill="none" 
              stroke="#1f2937" 
              strokeWidth="1"
              strokeLinecap="round"
            />
            
            {/* Eye */}
            <g>
              <ellipse cx="190" cy="40" rx="5" ry="6" fill="#fef3c7" stroke="#1f2937" strokeWidth="0.8" />
              <circle cx="192" cy="40" r="3" fill="#1f2937" />
              <circle cx="193" cy="39" r="1" fill="white" />
            </g>
            
            {/* Gill cover (Kiemendeckel) */}
            <path 
              d="M 175 35 Q 195 30 198 45 Q 195 60 175 55 Q 165 45 175 35 Z" 
              fill="url(#gillGradient)" 
              stroke="#3f6212" 
              strokeWidth="0.8"
            />
            
            {/* Gill slit line */}
            <path 
              d="M 178 40 Q 182 45 178 50" 
              fill="none" 
              stroke="#7c2d12" 
              strokeWidth="0.5"
              strokeLinecap="round"
            />
            
            {/* --- LATERAL LINE (Seitenlinie) --- */}
            <path 
              d="M 28 50 Q 60 48 100 50 Q 140 52 170 48" 
              fill="none" 
              stroke="#fef3c7" 
              strokeWidth="1.2" 
              opacity="0.8"
              strokeLinecap="round"
            />
            
            {/* Lateral line sensory pores (small dots) */}
            <g fill="#374151">
              <circle cx="45" cy="49.5" r="0.6" />
              <circle cx="60" cy="49" r="0.6" />
              <circle cx="75" cy="49.5" r="0.6" />
              <circle cx="90" cy="50" r="0.6" />
              <circle cx="105" cy="50.5" r="0.6" />
              <circle cx="120" cy="50" r="0.6" />
              <circle cx="135" cy="49.5" r="0.6" />
              <circle cx="150" cy="49" r="0.6" />
            </g>
          </g>
          
          {/* Clickable Hotspots - Updated positions for new fish shape */}
          {parts.map((part) => {
            const isLabeled = labeledParts.includes(part.id)
            const isSelected = selectedPart === part.id
            
            // Adjust coordinates for the new fish position (translate(20, 10))
            const x = ((part.x / 100) * 200) + 20
            const y = ((part.y / 100) * 80) + 10
            
            // Fine-tuned positions for better accuracy
            let adjustedX = x
            let adjustedY = y
            
            if (part.id === 'kopf') { adjustedX = 210; adjustedY = 45 }
            if (part.id === 'kiemen') { adjustedX = 175; adjustedY = 45 }
            if (part.id === 'flosse-ruecken') { adjustedX = 95; adjustedY = 20 }
            if (part.id === 'flosse-seite') { adjustedX = 90; adjustedY = 50 }
            if (part.id === 'schwanz') { adjustedX = 25; adjustedY = 50 }
            
            return (
              <g key={part.id} className="cursor-pointer" onClick={() => handlePartClick(part.id)}>
                {/* Hotspot circle */}
                <circle 
                  cx={adjustedX} 
                  cy={adjustedY} 
                  r={isLabeled ? 7 : 9} 
                  fill={isLabeled ? '#22c55e' : isSelected ? '#f59e0b' : '#ef4444'}
                  stroke="white"
                  strokeWidth="2.5"
                  opacity={isLabeled ? 0.9 : 1}
                  style={{ 
                    filter: isSelected ? 'drop-shadow(0 0 6px #f59e0b)' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                    transition: 'all 0.2s'
                  }}
                />
                
                {/* Pulsing animation for unlabeled parts */}
                {!isLabeled && !isSelected && (
                  <circle 
                    cx={adjustedX} 
                    cy={adjustedY} 
                    r={14} 
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                    opacity="0.5"
                  >
                    <animate 
                      attributeName="r" 
                      values="12;18;12" 
                      dur="2s" 
                      repeatCount="indefinite"
                    />
                    <animate 
                      attributeName="opacity" 
                      values="0.5;0.1;0.5" 
                      dur="2s" 
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
                
                {/* Label text with background */}
                {isLabeled && (
                  <g>
                    <rect 
                      x={adjustedX - 35} 
                      y={adjustedY - 22} 
                      width="70" 
                      height="14" 
                      rx="3" 
                      fill="white" 
                      opacity="0.95"
                      stroke="#22c55e"
                      strokeWidth="1"
                    />
                    <text 
                      x={adjustedX} 
                      y={adjustedY - 12} 
                      textAnchor="middle" 
                      className="text-xs font-bold"
                      fill="#166534"
                      style={{ fontSize: '7px' }}
                    >
                      {part.correctLabel}
                    </text>
                  </g>
                )}
                
                {/* Selection indicator with rotating dashed circle */}
                {isSelected && (
                  <g>
                    <circle 
                      cx={adjustedX} 
                      cy={adjustedY} 
                      r={16} 
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                      strokeDasharray="6,3"
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
                    {/* Glow effect */}
                    <circle 
                      cx={adjustedX} 
                      cy={adjustedY} 
                      r={20} 
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="1"
                      opacity="0.3"
                    />
                  </g>
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
