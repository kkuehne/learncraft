'use client'

import { useState, useEffect } from 'react'
import { forelleInnerOrgans, professorEich } from '@/lib/data'
import { addXP, getLabeledParts, saveLabeledParts } from '@/lib/xp'
import { speak, getRandomResponse } from '@/lib/speech'
import { Check, X, HelpCircle, Play, Pause } from 'lucide-react'

interface InnerOrgansLabProps {
  onComplete: (success: boolean) => void
}

export function InnerOrgansLab({ onComplete }: InnerOrgansLabProps) {
  const [labeledParts, setLabeledParts] = useState<string[]>([])
  const [selectedPart, setSelectedPart] = useState<string | null>(null)
  const [showHint, setShowHint] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<{ part: string; correct: boolean } | null>(null)
  const [justCompleted, setJustCompleted] = useState(false)
  const [animationEnabled, setAnimationEnabled] = useState(true)
  const [heartBeat, setHeartBeat] = useState(1)
  const [gillCycle, setGillCycle] = useState(0)
  
  // Load saved progress on mount
  useEffect(() => {
    const savedParts = getLabeledParts('innerOrgans')
    setLabeledParts(savedParts)
  }, [])
  
  // NEW: Animation toggles for educational animations
  const [showGasExchange, setShowGasExchange] = useState(false)
  const [showBloodFlow, setShowBloodFlow] = useState(false)
  const [showHeartDetail, setShowHeartDetail] = useState(false)
  const [activeInfoBox, setActiveInfoBox] = useState<string | null>(null)
  
  const parts = forelleInnerOrgans.parts
  const progress = (labeledParts.length / parts.length) * 100
  
  // Heart beat animation
  useEffect(() => {
    if (!animationEnabled) return
    const interval = setInterval(() => {
      setHeartBeat(prev => prev === 1 ? 1.15 : 1)
    }, 600)
    return () => clearInterval(interval)
  }, [animationEnabled])
  
  // Gill breathing animation
  useEffect(() => {
    if (!animationEnabled) return
    const interval = setInterval(() => {
      setGillCycle(prev => (prev + 1) % 100)
    }, 50)
    return () => clearInterval(interval)
  }, [animationEnabled])
  
  useEffect(() => {
    if (labeledParts.length === parts.length && !justCompleted) {
      setJustCompleted(true)
      setTimeout(() => {
        speak('Hervorragend! Du hast alle inneren Organe der Forelle beschriftet!')
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
    
    addXP(part.xp, `innerorgans-${partId}`)
    const newLabeledParts = [...labeledParts, partId]
    setLabeledParts(newLabeledParts)
    saveLabeledParts('innerOrgans', newLabeledParts) // Save to localStorage
    setSelectedPart(null)
    setFeedback({ part: partId, correct: true })
    speak(getRandomResponse(professorEich.correct))
    
    setTimeout(() => setFeedback(null), 1500)
  }
  
  const showPartHint = (partId: string) => {
    setShowHint(partId)
    const part = parts.find(p => p.id === partId)
    if (part) speak(part.hint)
  }
  
  const gillOpacity = 0.6 + (Math.sin(gillCycle * 0.1) * 0.3)
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header with animation toggle */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-gray-800">Fortschritt: {labeledParts.length} / {parts.length}</span>
            <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-rose-500 h-3 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <button
          onClick={() => setAnimationEnabled(!animationEnabled)}
          className="flex items-center gap-2 bg-rose-100 text-rose-700 px-3 py-2 rounded-lg hover:bg-rose-200 transition-colors"
        >
          {animationEnabled ? <Pause size={18} /> : <Play size={18} />}
          {animationEnabled ? 'Pause' : 'Play'}
        </button>
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
                : 'Klicke auf die nummerierten Bereiche, um die inneren Organe zu beschriftet! Beobachte das schlagende Herz und die atmenden Kiemen!'
              }
            </p>
          </div>
        </div>
      </div>
      
      {/* Animation Toggle Buttons */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        <button
          onClick={() => {
            setShowGasExchange(!showGasExchange)
            setActiveInfoBox(showGasExchange ? null : 'gills')
          }}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg font-bold text-sm transition-all ${
            showGasExchange 
              ? 'bg-cyan-500 text-white shadow-lg ring-2 ring-cyan-300' 
              : 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'
          }`}
        >
          {showGasExchange ? <Pause size={16} /> : <Play size={16} />}
          💨 Gas-Austausch
        </button>
        
        <button
          onClick={() => {
            setShowBloodFlow(!showBloodFlow)
            setActiveInfoBox(showBloodFlow ? null : 'circulation')
          }}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg font-bold text-sm transition-all ${
            showBloodFlow 
              ? 'bg-red-500 text-white shadow-lg ring-2 ring-red-300' 
              : 'bg-red-100 text-red-700 hover:bg-red-200'
          }`}
        >
          {showBloodFlow ? <Pause size={16} /> : <Play size={16} />}
          💓 Blutkreislauf
        </button>
        
        <button
          onClick={() => {
            setShowHeartDetail(!showHeartDetail)
            setActiveInfoBox(showHeartDetail ? null : 'heart')
          }}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg font-bold text-sm transition-all ${
            showHeartDetail 
              ? 'bg-rose-500 text-white shadow-lg ring-2 ring-rose-300' 
              : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
          }`}
        >
          {showHeartDetail ? <Pause size={16} /> : <Play size={16} />}
          🫀 Herz-Details
        </button>
      </div>
      
      {/* Info Box */}
      {activeInfoBox && (
        <div className="mb-4 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-400 rounded-xl animate-in fade-in slide-in-from-top-2">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <p className="font-bold text-amber-800 mb-1">
                {activeInfoBox === 'gills' && '💨 Sauerstoff-Austausch in den Kiemen'}
                {activeInfoBox === 'circulation' && '💓 Blutkreislauf der Forelle'}
                {activeInfoBox === 'heart' && '🫀 Zweikammer-Herz: Vorhof & Kammer'}
              </p>
              <p className="text-amber-700 text-sm">
                {activeInfoBox === 'gills' && 'Sauerstoffreiches Wasser (blau) strömt über die Kiemen. Sauerstoff (O₂) wird ins Blut aufgenommen, Kohlendioxid (CO₂) abgegeben. Das Blut wird dadurch sauerstoffreich (rot).'}
                {activeInfoBox === 'circulation' && 'Das Herz pumpt das Blut: Kiemen → Körper → Herz. Das Blut fließt durch Arterien (vom Herz weg) und Venen (zum Herz hin).'}
                {activeInfoBox === 'heart' && 'Das zweikammerige Herz besteht aus Vorhof (empfängt Blut) und Kammer (pumpt Blut). Es schlägt etwa 40-50 mal pro Minute bei einer Forelle.'}
              </p>
            </div>
          </div>        
        </div>
      )}
      
      {/* Animated Fish Anatomy */}
      <div className="relative bg-gradient-to-b from-rose-50 via-pink-50 to-rose-100 rounded-xl p-4 mb-4 overflow-hidden">
        <svg viewBox="0 0 300 180" className="w-full h-auto max-w-3xl mx-auto">
          <defs>
            {/* Body outline gradient */}
            <linearGradient id="bodyOutline" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9ca3af" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#6b7280" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.3" />
            </linearGradient>
            
            {/* Heart gradient */}
            <radialGradient id="heartGradient" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="70%" stopColor="#991b1b" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </radialGradient>
            
            {/* Gill gradient */}
            <linearGradient id="gillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7c2d12" />
              <stop offset="50%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#7c2d12" />
            </linearGradient>
            
            {/* Swim bladder gradient */}
            <radialGradient id="swimBladderGradient" cx="30%" cy="30%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="60%" stopColor="#fcd34d" />
              <stop offset="100%" stopColor="#d97706" />
            </radialGradient>
            
            {/* Kidney gradient */}
            <linearGradient id="kidneyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9f1239" />
              <stop offset="100%" stopColor="#881337" />
            </linearGradient>
            
            {/* Liver gradient */}
            <radialGradient id="liverGradient" cx="40%" cy="40%">
              <stop offset="0%" stopColor="#65a30d" />
              <stop offset="100%" stopColor="#3f6212" />
            </radialGradient>
            
            {/* Intestine gradient */}
            <linearGradient id="intestineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>
          </defs>
          
          {/* Fish body outline - transparent to show organs */}
          <g opacity="0.4">
            <path
              d="M 280 90 Q 260 40 180 35 Q 120 30 60 45 Q 30 55 20 75 L 15 90 L 20 105 Q 30 125 60 135 Q 120 150 180 145 Q 260 140 280 90 Z"
              fill="url(#bodyOutline)"
              stroke="#6b7280"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          </g>
          
          {/* SKELETON - subtle background */}
          <g opacity="0.15">
            {/* Spine */}
            <path d="M 60 90 Q 150 92 250 88" fill="none" stroke="#374151" strokeWidth="4" strokeLinecap="round" />
            {/* Ribs */}
            {[80, 100, 120, 140, 160, 180, 200, 220].map((x, i) => (
              <path key={i} d={`M ${x} 90 Q ${x} 70 ${x+5} 55 M ${x} 90 Q ${x} 110 ${x+5} 125`} fill="none" stroke="#374151" strokeWidth="2" />
            ))}
          </g>
          
          {/* ORGANS */}
          
          {/* 1. GILLS (Kiemen) - Left side, animated breathing */}
          <g opacity={gillOpacity}>
            <path
              d="M 55 50 Q 70 40 75 55 Q 78 65 75 75 Q 70 90 55 80 Q 45 65 55 50 Z"
              fill="url(#gillGradient)"
              stroke="#7f1d1d"
              strokeWidth="1"
            />
            {/* Gill filaments */}
            <g stroke="#fca5a5" strokeWidth="0.8" opacity="0.8">
              {[50, 55, 60, 65, 70].map((y, i) => (
                <line key={i} x1={58} y1={y} x2={72} y2={y} />
              ))}
            </g>
            {/* Blood vessels */}
            <path d="M 60 55 Q 55 65 60 75" fill="none" stroke="#991b1b" strokeWidth="1.5" />
          </g>
          
          {/* 2. HEART - Beating animation */}
          <g transform={`scale(${heartBeat})`} style={{ transformOrigin: '135px 98px' }}>
            <path
              d="M 125 90 C 125 85, 130 80, 140 80 C 150 80, 155 85, 155 90 C 155 95, 150 100, 140 110 C 130 100, 125 95, 125 90 Z"
              fill="url(#heartGradient)"
              stroke="#7f1d1d"
              strokeWidth="1.5"
            />
            {/* Heart chambers indication */}
            <ellipse cx="138" cy="88" rx="4" ry="3" fill="#450a0a" opacity="0.5" />
            <ellipse cx="145" cy="92" rx="3" ry="2.5" fill="#450a0a" opacity="0.5" />
            {/* Blood flow arrows */}
            <path d="M 150 95 L 160 100 L 155 100 L 155 105 Z" fill="#dc2626" opacity="0.8" />
          </g>
          
          {/* Blood vessel from heart */}
          <path d="M 155 95 Q 180 92 200 90" fill="none" stroke="#dc2626" strokeWidth="3" opacity="0.7" strokeLinecap="round" />
          
          {/* 3. SWIM BLADDER - Top middle */}
          <ellipse
            cx="160"
            cy="55"
            rx="35"
            ry="15"
            fill="url(#swimBladderGradient)"
            stroke="#d97706"
            strokeWidth="1.5"
            opacity="0.9"
          />
          {/* Gas exchange indication */}
          <ellipse cx="170" cy={52 + Math.sin(gillCycle * 0.05) * 2} rx="8" ry="4" fill="#fef3c7" opacity="0.6" />
          
          {/* Connection to esophagus */}
          <path d="M 140 65 Q 135 70 140 75" fill="none" stroke="#d97706" strokeWidth="2" />
          
          {/* 4. INTESTINE - Lower middle, coiled */}
          <g>
            {/* Stomach/Intestine coil */}
            <path
              d="M 145 105 Q 160 110 170 115 Q 185 125 175 135 Q 165 140 150 135 Q 140 130 145 120 Q 150 115 145 105 Z"
              fill="url(#intestineGradient)"
              stroke="#92400e"
              strokeWidth="1.5"
            />
            {/* Intestinal detail */}
            <path d="M 150 120 Q 160 125 170 122" fill="none" stroke="#78350f" strokeWidth="1" opacity="0.5" />
            {/* Anus exit */}
            <circle cx="175" cy="140" r="3" fill="#92400e" />
          </g>
          
          {/* 5. KIDNEY - Behind swim bladder */}
          <ellipse
            cx="200"
            cy={55 + Math.sin(gillCycle * 0.03) * 2}
            rx="25"
            ry="12"
            fill="url(#kidneyGradient)"
            stroke="#881337"
            strokeWidth="1.5"
            opacity="0.85"
          />
          {/* Kidney texture */}
          <ellipse cx="195" cy={53 + Math.sin(gillCycle * 0.03) * 2} rx="8" ry="4" fill="#9f1239" opacity="0.5" />
          <ellipse cx="205" cy={58 + Math.sin(gillCycle * 0.03) * 2} rx="6" ry="3" fill="#9f1239" opacity="0.5" />
          
          {/* 6. LIVER - Below swim bladder */}
          <path
            d="M 140 70 Q 160 65 180 70 Q 200 75 195 85 Q 190 95 170 90 Q 150 85 140 80 Z"
            fill="url(#liverGradient)"
            stroke="#3f6212"
            strokeWidth="1.5"
            opacity="0.85"
          />
          {/* Liver lobes */}
          <path d="M 155 75 Q 165 78 175 76" fill="none" stroke="#65a30d" strokeWidth="1" opacity="0.6" />
          
          {/* 6. LIVER - Below swim bladder */}
          <path
            d="M 140 70 Q 160 65 180 70 Q 200 75 195 85 Q 190 95 170 90 Q 150 85 140 80 Z"
            fill="url(#liverGradient)"
            stroke="#3f6212"
            strokeWidth="1.5"
            opacity="0.85"
          />
          {/* Liver lobes */}
          <path d="M 155 75 Q 165 78 175 76" fill="none" stroke="#65a30d" strokeWidth="1" opacity="0.6" />
          
          {/* ==========================================
               ANIMATED PARTICLE EFFECTS (ON DEMAND)
          ========================================== */}
          
          {/* 💨 GAS EXCHANGE ANIMATION - Gills */}
          {showGasExchange && (
            <g>
              {/* Incoming water flow - Blue particles (O2 rich) */}
              <g>
                {[0, 1, 2, 3, 4].map(i => (
                  <circle key={`o2-${i}`} r="2" fill="#3b82f6" opacity="0.9">
                    <animate
                      attributeName="cx"
                      values={`${10 + i * 3};${25 + i * 2}`}
                      dur={`${2 + i * 0.5}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.3}s`}
                    />
                    <animate
                      attributeName="cy"
                      values={`${40 + i * 3};${45 + i * 2}`}
                      dur={`${2 + i * 0.5}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.3}s`}
                    />
                    <animate
                      attributeName="fill"
                      values="#3b82f6;#3b82f6;#ef4444"
                      keyTimes="0;0.7;1"
                      dur={`${2 + i * 0.5}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.3}s`}
                    />
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      keyTimes="0;0.1;0.9;1"
                      dur={`${2 + i * 0.5}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.3}s`}
                    />
                  </circle>
                ))}
              </g>
              
              {/* O2 bubbles rising from gills */}
              <g>
                {[0, 1, 2].map(i => (
                  <circle key={`bubble-${i}`} r="1.5" fill="#60a5fa" opacity="0.8">
                    <animate
                      attributeName="cx"
                      values={`${45 + i * 5};${50 + i * 3}`}
                      dur={`${3 + i * 0.7}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.5}s`}
                    />
                    <animate
                      attributeName="cy"
                      values={`${45 - i * 2};${30 - i * 3}`}
                      dur={`${3 + i * 0.7}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.5}s`}
                    />
                    <animate
                      attributeName="opacity"
                      values="0;0.8;0"
                      keyTimes="0;0.5;1"
                      dur={`${3 + i * 0.7}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.5}s`}
                    />
                    <animate
                      attributeName="r"
                      values="1.5;2;2.5"
                      dur={`${3 + i * 0.7}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.5}s`}
                    />
                  </circle>
                ))}
              </g>
              
              {/* Blood vessels showing O2 absorption */}
              <path
                d="M 55 50 Q 60 45 65 50 Q 70 55 65 60"
                fill="none"
                stroke="url(#bloodO2Gradient)"
                strokeWidth="2"
                opacity="0.8"
              >
                <animate
                  attributeName="stroke-dasharray"
                  values="0,10;5,5;10,0"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          )}
          
          {/* 💓 BLOOD FLOW ANIMATION - Through body */}
          {showBloodFlow && (
            <g>
              {/* Artery from heart to gills - Red blood cells */}
              <g>
                {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                  <circle key={`artery-${i}`} r="1.8" fill="#dc2626" opacity="0.9">
                    <animate
                      attributeName="cx"
                      values={`${150 + i * 8};${25 + i * 8}`}
                      dur={`${4 + i * 0.2}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.5}s`}
                    />
                    <animate
                      attributeName="cy"
                      values={`${90 + i * 2};${50 + i * 2}`}
                      dur={`${4 + i * 0.2}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.5}s`}
                    />
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      keyTimes="0;0.05;0.95;1"
                      dur={`${4 + i * 0.2}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.5}s`}
                    />
                  </circle>
                ))}
              </g>
              
              {/* Vein from body back to heart - Dark red cells */}
              <g>
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <circle key={`vein-${i}`} r="1.5" fill="#7f1d1d" opacity="0.85">
                    <animate
                      attributeName="cx"
                      values={`${100 - i * 10};${135 - i * 8}`}
                      dur={`${5 + i * 0.3}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.7}s`}
                    />
                    <animate
                      attributeName="cy"
                      values={`${80 - i * 5};${95 - i * 3}`}
                      dur={`${5 + i * 0.3}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.7}s`}
                    />
                    <animate
                      attributeName="opacity"
                      values="0;0.85;0"
                      keyTimes="0;0.5;1"
                      dur={`${5 + i * 0.3}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.7}s`}
                    />
                  </circle>
                ))}
              </g>
              
              {/* Heart pumping effect lines */}
              <g opacity="0.6">
                {[0, 1, 2].map(i => (
                  <path
                    key={`pulse-${i}`}
                    d={`M ${135} ${85 + i * 8} Q ${140 + i * 5} ${90 + i * 3} ${155} ${93 + i * 5}`}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="1.5"
                  >
                    <animate
                      attributeName="opacity"
                      values="0;0.8;0"
                      dur="1.2s"
                      repeatCount="indefinite"
                      begin={`${i * 0.4}s`}
                    />
                    <animate
                      attributeName="stroke-width"
                      values="1.5;2.5;1.5"
                      dur="1.2s"
                      repeatCount="indefinite"
                      begin={`${i * 0.4}s`}
                    />
                  </path>
                ))}
              </g>
            </g>
          )}
          
          {/* 🫀 HEART DETAIL ANIMATION */}
          {showHeartDetail && (
            <g>
              {/* Atrium filling */}
              <ellipse cx="138" cy="85" rx="4" ry="3" fill="#ef4444" opacity="0.5">
                <animate
                  attributeName="rx"
                  values="3;5;3"
                  dur="1.2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.3;0.6;0.3"
                  dur="1.2s"
                  repeatCount="indefinite"
                />
              </ellipse>
              
              {/* Chamber contracting */}
              <path
                d="M 142 90 Q 148 105 155 90"
                fill="none"
                stroke="#991b1b"
                strokeWidth="2"
              >
                <animate
                  attributeName="d"
                  values="M 142 90 Q 148 105 155 90;M 142 88 Q 148 100 155 88;M 142 90 Q 148 105 155 90"
                  dur="1.2s"
                  repeatCount="indefinite"
                />
              </path>
              
              {/* Blood flow arrows */}
              <g>
                <path d="M 145 75 L 145 82" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arrowhead)">
                  <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur="1.2s"
                    repeatCount="indefinite"
                    begin="0.2s"
                  />
                </path>
                
                <path d="M 158 92 L 168 95" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arrowhead)">
                  <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur="1.2s"
                    repeatCount="indefinite"
                    begin="0.6s"
                  />
                </path>
              </g>
              
              {/* Chamber labels */}
              <text x="128" y="78" fontSize="6" fill="#7f1d1d" opacity="0.8">Vorhof</text>
              <text x="148" y="112" fontSize="6" fill="#7f1d1d" opacity="0.8">Kammer</text>
            </g>
          )}
          
          {/* Gradient for blood O2 exchange */}
          <defs>
            <linearGradient id="bloodO2Gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
            
            <marker id="arrowhead" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
              <polygon points="0 0, 4 2, 0 4" fill="#dc2626" />
            </marker>
          </defs>
          
          {/* Labels for blood flow */}
          <g opacity="0.5" fontSize="6" fill="#7f1d1d">
            <text x="165" y="100">Blutgefäße</text>
          </g>
          
          {/* Clickable Hotspots */}
          {parts.map((part) => {
            const isLabeled = labeledParts.includes(part.id)
            const isSelected = selectedPart === part.id
            const x = (part.x / 100) * 300
            const y = (part.y / 100) * 180
            
            return (
              <g key={part.id} className="cursor-pointer" onClick={() => handlePartClick(part.id)}>
                {/* Hotspot circle with pulse */}
                <circle
                  cx={x}
                  cy={y}
                  r={isLabeled ? 10 : 12}
                  fill={isLabeled ? '#22c55e' : isSelected ? '#f59e0b' : '#ef4444'}
                  stroke="white"
                  strokeWidth="3"
                  opacity={isLabeled ? 0.9 : 1}
                  style={{
                    filter: isSelected ? 'drop-shadow(0 0 8px #f59e0b)' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                    transition: 'all 0.2s'
                  }}
                >
                  {part.animates && !isLabeled && (
                    <animate
                      attributeName="r"
                      values="12;14;12"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  )}
                </circle>
                
                {/* Number in circle */}
                <text
                  x={x}
                  y={y + 4}
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                >
                  {parts.indexOf(part) + 1}
                </text>
                
                {/* Pulse ring for unlabeled */}
                {!isLabeled && !isSelected && (
                  <circle
                    cx={x}
                    cy={y}
                    r={18}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                    opacity="0.5"
                  >
                    <animate
                      attributeName="r"
                      values="16;22;16"
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
                
                {/* Label when completed */}
                {isLabeled && (
                  <g>
                    <rect
                      x={x - 40}
                      y={y - 30}
                      width="80"
                      height="18"
                      rx="4"
                      fill="white"
                      opacity="0.95"
                      stroke="#22c55e"
                      strokeWidth="1"
                    />
                    <text
                      x={x}
                      y={y - 17}
                      textAnchor="middle"
                      fill="#166534"
                      fontSize="9"
                      fontWeight="bold"
                    >
                      {part.correctLabel}
                    </text>
                  </g>
                )}
                
                {/* Selection indicator */}
                {isSelected && (
                  <>
                    <circle
                      cx={x}
                      cy={y}
                      r={22}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="3"
                      strokeDasharray="6,3"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from={`0 ${x} ${y}`}
                        to={`360 ${x} ${y}`}
                        dur="6s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle cx={x} cy={y} r={26} fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.4" />
                  </>
                )}
              </g>
            )
          })}
        </svg>
      </div>
      
      {/* Organ Legend */}
      <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-600 inline-block"></span>
          Herz (schlägt)
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-700 inline-block"></span>
          Kiemen (atmen)
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-300 inline-block"></span>
          Schwimmblase
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-600 inline-block"></span>
          Darm
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-900 inline-block"></span>
          Niere
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-lime-700 inline-block"></span>
          Leber
        </div>
      </div>
      
      {/* Selection panel */}
      {selectedPart && (
        <div className="bg-rose-50 border-2 border-rose-200 rounded-xl p-4 mb-4">
          <div className="flex items-start gap-3">
            <span className="text-3xl">🫀</span>
            <div className="flex-1">
              <p className="font-bold text-rose-800 mb-1">
                Organ #{parts.findIndex(p => p.id === selectedPart) + 1}: {parts.find(p => p.id === selectedPart)?.name}
              </p>
              
              {showHint === selectedPart && (
                <p className="text-sm text-rose-600 mb-3 italic">
                  💡 {parts.find(p => p.id === selectedPart)?.hint}
                </p>
              )}
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleLabelSubmit(selectedPart)}
                  className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 flex items-center justify-center gap-2"
                >
                  <Check size={18} />
                  {parts.find(p => p.id === selectedPart)?.correctLabel} beschriftet
                </button>
                
                <button
                  onClick={() => showPartHint(selectedPart)}
                  className="bg-amber-400 text-white px-4 py-2 rounded-lg font-bold hover:bg-amber-500"
                >
                  <HelpCircle size={18} />
                </button>
                
                <button
                  onClick={() => setSelectedPart(null)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-500"
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
        <div className={`mt-4 p-4 rounded-lg text-center font-bold ${feedback.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {feedback.correct ? (
            <>✅ Richtig beschriftet! +{parts.find(p => p.id === feedback.part)?.xp} XP!</>
          ) : (
            <>❌ Versuch es nochmal!</>
          )}
        </div>
      )}
    </div>
  )
}
