'use client'

import { useState, useEffect } from 'react'
import { X, Play, Pause, Info } from 'lucide-react'

interface GillDetailProps {
  isOpen: boolean
  onClose: () => void
}

export function GillDetail({ isOpen, onClose }: GillDetailProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showInfo, setShowInfo] = useState(true)

  useEffect(() => {
    if (isOpen) {
      setIsPlaying(true)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            🫁 Kiemen im Detail
          </h2>
          <button onClick={onClose} className="text-white hover:bg-white/20 rounded-full p-1 transition-colors">
            <X size={28} />
          </button>
        </div>

        <div className="p-6">
          {/* Info-Box */}
          {showInfo && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
              <div className="flex items-start gap-3">
                <Info className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="font-bold text-blue-800 mb-1">Gegenstromprinzip</h3>
                  <p className="text-blue-700 text-sm">
                    Wasser und Blut fließen entgegengesetzt! Das ermöglicht einen ständigen Sauerstoffgradienten 
                    entlang der gesamten Kiemenlänge – super effizient! 🎯
                  </p>
                </div>
                <button 
                  onClick={() => setShowInfo(false)} 
                  className="text-blue-400 hover:text-blue-600"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Animation Container */}
          <div className="bg-gradient-to-b from-blue-100 to-blue-50 rounded-xl p-4 relative overflow-hidden">
            <svg viewBox="0 0 600 400" className="w-full h-auto">
              <defs>
                {/* Wasser-Gradient */}
                <linearGradient id="waterFlow" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.5" />
                </linearGradient>
                
                {/* Blut-Gradient */}
                <linearGradient id="bloodFlow" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#dc2626" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#991b1b" stopOpacity="0.6" />
                </linearGradient>
                
                {/* Membran-Gradient */}
                <linearGradient id="membrane" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fca5a5" />
                  <stop offset="50%" stopColor="#fecaca" />
                  <stop offset="100%" stopColor="#fca5a5" />
                </linearGradient>
              </defs>

              {/* Kiemenlamellen - schematisch */}
              <g>
                {/* Linke Lamelle */}
                <rect x="50" y="50" width="200" height="300" rx="10" fill="url(#membrane)" stroke="#dc2626" strokeWidth="2" />
                
                {/* Rechte Lamelle */}
                <rect x="350" y="50" width="200" height="300" rx="10" fill="url(#membrane)" stroke="#dc2626" strokeWidth="2" />

                {/* Sekundäre Lamellen (Kämme) */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <g key={i}>
                    <line x1="50" y1={80 + i * 35} x2="250" y2={80 + i * 35} stroke="#ef4444" strokeWidth="1" opacity="0.5" />
                    <line x1="350" y1={80 + i * 35} x2="550" y2={80 + i * 35} stroke="#ef4444" strokeWidth="1" opacity="0.5" />
                  </g>
                ))}
              </g>

              {/* Wasserstrom (von oben nach unten) - Blau */}
              <g opacity="0.6">
                <text x="150" y="40" textAnchor="middle" className="font-bold" fill="#1e40af" fontSize="14">Wasserstrom</text>
                <text x="150" y="380" textAnchor="middle" fill="#1e40af" fontSize="12">↓ O₂-arm</text>
                
                {/* Wasser-Partikel */}
                {isPlaying && (
                  <>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <g key={`water-${i}`}>
                        <circle r="4" fill="#3b82f6">
                          <animate 
                            attributeName="cy" 
                            from="60" 
                            to="340" 
                            dur="3s" 
                            repeatCount="indefinite"
                            begin={`${i * 0.5}s`}
                          />
                          <animate 
                            attributeName="cx" 
                            values={`${150 + Math.sin(i) * 20};${150 + Math.sin(i + 1) * 20};${150 + Math.sin(i) * 20}`}
                            dur="3s"
                            repeatCount="indefinite"
                          />
                        </circle>
                        {/* O₂-Label am Anfang */}
                        <text fontSize="8" fill="#1e40af" opacity="0.8">
                          <animate attributeName="y" from="55" to="335" dur="3s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
                          <animate attributeName="x" values={`${155 + Math.sin(i) * 20};${155 + Math.sin(i + 1) * 20};${155 + Math.sin(i) * 20}`} dur="3s" repeatCount="indefinite" />
                          O₂
                        </text>
                      </g>
                    ))}
                  </>
                )}
                
                {/* Wasser-Pfeil */}
                <path d="M 150 60 L 150 340" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowBlue)" opacity="0.4">
                  {isPlaying && <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1s" repeatCount="indefinite" />}
                </path>
              </g>

              {/* Blutstrom (von unten nach oben) - Rot */}
              <g opacity="0.6">
                <text x="450" y="380" textAnchor="middle" className="font-bold" fill="#991b1b" fontSize="14">Blutstrom</text>
                <text x="450" y="40" textAnchor="middle" fill="#991b1b" fontSize="12">O₂-reich ↑</text>
                
                {/* Blut-Partikel */}
                {isPlaying && (
                  <>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <g key={`blood-${i}`}>
                        <circle r="4" fill="#dc2626">
                          <animate 
                            attributeName="cy" 
                            from="340" 
                            to="60" 
                            dur="3s" 
                            repeatCount="indefinite"
                            begin={`${i * 0.5 + 0.25}s`}
                          />
                          <animate 
                            attributeName="cx" 
                            values={`${450 + Math.cos(i) * 20};${450 + Math.cos(i + 1) * 20};${450 + Math.cos(i) * 20}`}
                            dur="3s"
                            repeatCount="indefinite"
                          />
                          {/* Farbwechsel: blau → rot */}
                          <animate 
                            attributeName="fill"
                            values="#3b82f6;#3b82f6;#dc2626;#dc2626"
                            dur="3s"
                            repeatCount="indefinite"
                            begin={`${i * 0.5 + 0.25}s`}
                          />
                        </circle>
                      </g>
                    ))}
                  </>
                )}
                
                {/* Blut-Pfeil */}
                <path d="M 450 340 L 450 60" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrowRed)" opacity="0.4">
                  {isPlaying && <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1s" repeatCount="indefinite" />}
                </path>
              </g>

              {/* Diffusionspfeile (quer durch Membran) */}
              {isPlaying && (
                <g>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <g key={`diffusion-${i}`}>
                      <path d={`M 250 ${100 + i * 50} Q 300 ${100 + i * 50} 350 ${100 + i * 50}`} fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.6">
                        <animate 
                          attributeName="stroke-dasharray" 
                          values="0,50;50,0" 
                          dur="2s" 
                          repeatCount="indefinite"
                          begin={`${i * 0.4}s`}
                        />
                      </path>
                      {/* O₂ Moleküle diffundieren */}
                      <circle r="3" fill="#22c55e">
                        <animateMotion 
                          path={`M 250,${100 + i * 50} Q 300,${100 + i * 50} 350,${100 + i * 50}`}
                          dur="2s"
                          repeatCount="indefinite"
                          begin={`${i * 0.4}s`}
                        />
                      </circle>
                    </g>
                  ))}
                </g>
              )}

              {/* Gradient-Anzeige */}
              <g transform="translate(280, 150)">
                <text x="20" y="-20" textAnchor="middle" fontSize="11" fill="#166534" fontWeight="bold">O₂-Gradient</text>
                <rect x="0" y="0" width="10" height="100" fill="url(#oxygenGradient)" stroke="#374151" strokeWidth="0.5" />
                <text x="15" y="15" fontSize="9" fill="#166534">hoch</text>
                <text x="15" y="95" fontSize="9" fill="#166534">niedrig</text>
              </g>

              {/* Markierungen für Gegenstrom */}
              <text x="30" y="200" fontSize="12" fill="#1e40af" fontWeight="bold" transform="rotate(-90, 30, 200)">Wasser ↓</text>
              <text x="570" y="200" fontSize="12" fill="#991b1b" fontWeight="bold" transform="rotate(90, 570, 200)">Blut ↑</text>

              {/* Definitionen für Pfeilspitzen */}
              <defs>
                <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
                </marker>
                <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L9,3 z" fill="#dc2626" />
                </marker>
                <linearGradient id="oxygenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Kontroll-Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-colors ${
                isPlaying 
                  ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              {isPlaying ? 'Pause' : 'Abspielen'}
            </button>
            
            <button
              onClick={() => setShowInfo(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
            >
              <Info size={20} />
              Erklärung
            </button>
          </div>

          {/* Legende */}
          <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span>Wasser (O₂-arm nach unten)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span>Blut (O₂-reich nach oben)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span>O₂-Diffusion durch Membran</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
