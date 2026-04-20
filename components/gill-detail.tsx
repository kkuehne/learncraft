'use client'

import { useState, useEffect } from 'react'
import { X, Play, Pause, Volume2 } from 'lucide-react'
import { speak, stopSpeaking } from '@/lib/speech'

interface GillDetailProps {
  isOpen: boolean
  onClose: () => void
}

export function GillDetail({ isOpen, onClose }: GillDetailProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioPlayed, setAudioPlayed] = useState(false)

  useEffect(() => {
    if (isOpen && !audioPlayed) {
      setIsPlaying(true)
      setAudioPlayed(true)
      // Prof. Eich Erklärung beim Öffnen
      setTimeout(() => {
        speak('Hier siehst du das Gegenstromprinzip in Aktion. Wasser und Blut fließen entgegengesetzt. Dadurch kann das Blut maximal Sauerstoff aufnehmen. Das ist so effizient wie ein Autobahn-Auffahrt, wo immer frischer Treibstoff nachkommt.')
      }, 500)
    }
  }, [isOpen, audioPlayed])

  const handleClose = () => {
    stopSpeaking()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">
            Kiemen-Detail: Gegenstromprinzip
          </h2>
          <button 
            onClick={handleClose} 
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        <div className="p-6 overflow-auto">
          {/* Erklärung mit Prof. Eich */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <span className="text-3xl">🦫</span>
              <div className="flex-1">
                <h3 className="font-bold text-blue-900 text-lg mb-2">
                  Professor Eich erklärt: Das Gegenstromprinzip
                </h3>
                <p className="text-blue-800 mb-3">
                  Wasser und Blut fließen entgegengesetzt! Dadurch gibt es über die gesamte Kiemenlänge 
                  einen Sauerstoffgradienten – das Blut kann maximal O₂ aufnehmen.
                </p>
                <button
                  onClick={() => speak('Hier siehst du das Gegenstromprinzip in Aktion. Wasser und Blut fließen entgegengesetzt. Dadurch kann das Blut maximal Sauerstoff aufnehmen. Das ist so effizient wie ein Autobahn-Auffahrt, wo immer frischer Treibstoff nachkommt.')}
                  className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  <Volume2 size={18} />
                  Erklärung anhören
                </button>
              </div>
            </div>
          </div>

          {/* Schema-Animation */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-4 relative overflow-auto max-h-[50vh]">
            <svg viewBox="0 0 700 380" className="w-full h-auto" style={{ maxHeight: '45vh' }}>
              <defs>
                {/* Farbverläufe */}
                <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.9"/>
                </linearGradient>
                
                <linearGradient id="bloodGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#fca5a5" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#dc2626" stopOpacity="0.9"/>
                </linearGradient>

                {/* Pfeil-Marker */}
                <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L9,3 z" fill="#2563eb"/>
                </marker>
                <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L9,3 z" fill="#dc2626"/>
                </marker>
              </defs>

              {/* Titel */}
              <text x="350" y="30" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e3a5f">
                Schematischer Aufbau einer Kiemenblättchen-Lamelle
              </text>

              {/* ÄUSSERE BEGRENZUNG - Linke Seite (Wasser) */}
              <line x1="100" y1="70" x2="100" y2="380" stroke="#1e40af" strokeWidth="3"/>
              
              {/* ÄUSSERE BEGRENZUNG - Rechte Seite (Blut) */}
              <line x1="600" y1="70" x2="600" y2="380" stroke="#991b1b" strokeWidth="3"/>

              {/* SEKUNDÄRE KIEMENLAMELLEN - Querstreifen */}
              {Array.from({ length: 12 }).map((_, i) => {
                const y = 80 + i * 25
                return (
                  <g key={i}>
                    {/* Membran zwischen Wasser und Blut */}
                    <rect x="100" y={y} width="500" height="20" fill="none" stroke="#64748b" strokeWidth="1"/>
                    
                    {/* Diffusionsbarriere */}
                    <line x1="350" y1={y + 10} x2="350" y2={y + 10} stroke="#475569" strokeWidth="1" strokeDasharray="2,2"/>
                  </g>
                )
              })}

              {/* LINKER BEREICH: WASSERSTRÖMUNG */}
              <text x="225" y="60" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e40af">
                Wasserstrom (außen)
              </text>
              
              {/* Wasser-Pfeil - nach unten */}
              <line 
                x1="225" y1="70" x2="225" y2="380" 
                stroke="#2563eb" 
                strokeWidth="4"
                markerEnd="url(#arrowBlue)"
                opacity="0.7"
              />
              
              <text x="240" y="200" fontSize="12" fill="#1e40af" fontWeight="bold">
                → nach unten
              </text>

              {/* O₂-Reiche Wasser-Partikel */}
              {isPlaying && (
                <g>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <g key={`water-${i}`}>
                      <circle r="5" fill="#3b82f6" opacity="0.8">
                        <animate
                          attributeName="cy"
                          from="80"
                          to="370"
                          dur="4s"
                          repeatCount="indefinite"
                          begin={`${i * 0.8}s`}
                        />
                        <animate
                          attributeName="cx"
                          values={`${160 + i * 25};${170 + i * 25};${160 + i * 25}`}
                          dur="4s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      {/* O₂-Label oben */}
                      <text fontSize="8" fill="#1e40af" fontWeight="bold">
                        <animate
                          attributeName="y"
                          from="75"
                          to="365"
                          dur="4s"
                          repeatCount="indefinite"
                          begin={`${i * 0.8}s`}
                        />
                        <animate
                          attributeName="x"
                          values={`${157 + i * 25};${167 + i * 25};${157 + i * 25}`}
                          dur="4s"
                          repeatCount="indefinite"
                        />
                        O₂
                      </text>
                    </g>
                  ))}
                </g>
              )}

              {/* Beschriftung Wasser */}
              <text x="50" y="120" fontSize="10" fill="#1e40af" transform="rotate(-90, 50, 120)">
                Sauerstoffreiches Wasser
              </text>
              <text x="50" y="350" fontSize="10" fill="#1e40af" transform="rotate(-90, 50, 350)">
                Sauerstoffarmes Wasser
              </text>

              {/* RECHTER BEREICH: BLUTSTRÖMUNG */}
              <text x="475" y="60" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#991b1b">
                Blutstrom (innen)
              </text>
              
              {/* Blut-Pfeil - nach oben */}
              <line 
                x1="475" y1="380" x2="475" y2="70" 
                stroke="#dc2626" 
                strokeWidth="4"
                markerEnd="url(#arrowRed)"
                opacity="0.7"
              />
              
              <text x="490" y="240" fontSize="12" fill="#991b1b" fontWeight="bold">
                → nach oben
              </text>

              {/* Blut-Partikel mit Farbwechsel */}
              {isPlaying && (
                <g>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <g key={`blood-${i}`}>
                      <circle r="5" fill="#fca5a5">
                        <animate
                          attributeName="cy"
                          from="370"
                          to="80"
                          dur="4s"
                          repeatCount="indefinite"
                          begin={`${i * 0.8 + 0.4}s`}
                        />
                        <animate
                          attributeName="cx"
                          values={`${410 + i * 25};${420 + i * 25};${410 + i * 25}`}
                          dur="4s"
                          repeatCount="indefinite"
                        />
                        {/* Farbwechsel: hell (O₂-arm) → dunkel (O₂-reich) */}
                        <animate
                          attributeName="fill"
                          values="#fca5a5;#fca5a5;#dc2626;#dc2626"
                          dur="4s"
                          repeatCount="indefinite"
                          begin={`${i * 0.8 + 0.4}s`}
                        />
                      </circle>
                    </g>
                  ))}
                </g>
              )}

              {/* Beschriftung Blut */}
              <text x="650" y="350" fontSize="10" fill="#991b1b" transform="rotate(90, 650, 350)">
                Sauerstoffarmes Blut
              </text>
              <text x="650" y="120" fontSize="10" fill="#991b1b" transform="rotate(90, 650, 120)">
                Sauerstoffreiches Blut
              </text>

              {/* DIFFUSIONSPFEILE quer durch die Membran */}
              {isPlaying && (
                <g>
                  {Array.from({ length: 8 }).map((_, i) => {
                    const y = 95 + i * 30
                    return (
                      <g key={`diffusion-${i}`}>
                        {/* Pfeil von links nach rechts */}
                        <line 
                          x1="320" y1={y} x2="380" y2={y}
                          stroke="#16a34a" 
                          strokeWidth="2"
                          markerEnd="url(#arrowGreen)"
                          opacity="0.8"
                        >
                          <animate
                            attributeName="opacity"
                            values="0;1;0"
                            dur="3s"
                            repeatCount="indefinite"
                            begin={`${i * 0.3}s`}
                          />
                        </line>
                        {/* O₂-Symbol */}
                        <text x="350" y={y - 5} fontSize="10" fill="#16a34a" fontWeight="bold" textAnchor="middle">
                          <animate
                            attributeName="opacity"
                            values="0;1;0"
                            dur="3s"
                            repeatCount="indefinite"
                            begin={`${i * 0.3}s`}
                          />
                          O₂
                        </text>
                      </g>
                    )
                  })}
                </g>
              )}

              {/* Membran-Beschriftung */}
              <text x="350" y="400" textAnchor="middle" fontSize="11" fill="#475569">
                Diffusionsmembran (Epithel)
              </text>

              {/* Definition für grüne Pfeile */}
              <defs>
                <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L9,3 z" fill="#16a34a"/>
                </marker>
              </defs>
            </svg>
          </div>

          {/* Legende */}
          <div className="mt-6 grid grid-cols-4 gap-4 text-sm bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span className="text-gray-700">Wasser (O₂-reich → O₂-arm)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-400"></div>
              <span className="text-gray-700">Blut (O₂-arm → O₂-reich)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-gray-700">O₂-Diffusion durch Membran</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-gray-400"></div>
              <span className="text-gray-700">Sekundäre Kiemenlamelle</span>
            </div>
          </div>

          {/* Controls */}
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
              {isPlaying ? 'Pause' : 'Start'}
            </button>
          </div>

          {/* Bildnachweis */}
          <div className="mt-4 text-center text-xs text-gray-500">
            Basierend auf: Lehrerfortbildungsserver Baden-Württemberg - 
            <a href="https://lehrerfortbildung-bw.de/u_matnatech/bnt/gym/bp2016/fb2/3_wasser/1_fisch/6_atmen/bau-loes.html" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-blue-600 hover:underline">
              Kiemenatmung - Biologie
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
