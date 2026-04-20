'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface DetailedGillProps {
  isOpen: boolean
  onClose: () => void
}

export function DetailedGill({ isOpen, onClose }: DetailedGillProps) {
  const [selectedPart, setSelectedPart] = useState<string | null>(null)

  if (!isOpen) return null

  const gillParts = [
    {
      id: 'reuse',
      name: 'Kiemenreuse',
      description: 'Filtert Nahrungspartikel aus dem Wasser und schützt die Kiemen vor Beschädigung.',
      color: '#8b5cf6',
      position: { x: 50, y: 80 }
    },
    {
      id: 'blättchen',
      name: 'Kiemenblättchen',
      description: 'Feine Fortsätze an den Kiemenbögen, die die eigentliche Atmungsoberfläche bilden.',
      color: '#ec4899',
      position: { x: 200, y: 150 }
    },
    {
      id: 'herzgefäß',
      name: 'Vom Herzen kommendes Kiemengefäß',
      description: 'Afferentes Gefäß - führt sauerstoffarmes Blut vom Herz zu den Kiemen.',
      color: '#dc2626',
      position: { x: 120, y: 280 }
    },
    {
      id: 'kapillare',
      name: 'Kiemenkapillaren',
      description: 'Haargefäße in den Kiemenblättchen, hier findet der Gasaustausch statt.',
      color: '#f97316',
      position: { x: 280, y: 200 }
    },
    {
      id: 'körpergefäß',
      name: 'Zum Körper führendes Kiemengefäß',
      description: 'Efferentes Gefäß - führt sauerstoffreiches Blut vom Kopf zum Rest des Körpers.',
      color: '#16a34a',
      position: { x: 380, y: 280 }
    }
  ]

  const selectedPartData = selectedPart ? gillParts.find(p => p.id === selectedPart) : null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-800 to-cyan-600 p-4 flex justify-between items-center flex-shrink-0">
          <h2 className="text-2xl font-bold text-white">
            🔬 Detaillierte Kiemenanatomie
          </h2>
          <button 
            onClick={onClose} 
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Linke Seite: SVG-Diagramm */}
          <div className="flex-1 bg-gradient-to-b from-blue-50 to-cyan-50 p-6 overflow-auto">
            <svg viewBox="0 0 600 500" className="w-full h-full min-h-[450px]">
              <defs>
                <marker id="arrowRed" markerWidth="12" markerHeight="12" refX="10" refY="4" orient="auto">
                  <path d="M0,0 L0,8 L12,4 z" fill="#dc2626"/>
                </marker>
                <marker id="arrowGreen" markerWidth="12" markerHeight="12" refX="10" refY="4" orient="auto"
003e
                  <path d="M0,0 L0,8 L12,4 z" fill="#16a34a"/>
                </marker>
              </defs>

              {/* Titel */}
              <text x="300" y="30" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e3a5f">
                Querschnitt durch einen Kiemenbogen
              </text>

              {/* 1. KIEMENREUSE (oben) */}
              <g className="cursor-pointer" onClick={() => setSelectedPart('reuse')}>
                <path 
                  d="M 100 60 Q 150 40 200 55 Q 250 45 300 60 Q 350 55 400 65" 
                  fill="none" 
                  stroke={selectedPart === 'reuse' ? '#8b5cf6' : '#6b7280'} 
                  strokeWidth={selectedPart === 'reuse' ? '4' : '2'}
                />
                {/* Reuse-Zähne */}
                {Array.from({ length: 15 }).map((_, i) => (
                  <line 
                    key={i}
                    x1={100 + i * 20} 
                    y1={55 + (i % 2) * 10} 
                    x2={100 + i * 20} 
                    y2={75} 
                    stroke={selectedPart === 'reuse' ? '#8b5cf6' : '#9ca3af'}
                    strokeWidth="2"
                  />
                ))}
                <text x="250" y="95" textAnchor="middle" fontSize="14" fill="#8b5cf6" fontWeight="bold">
                  Kiemenreuse
                </text>
                {selectedPart === 'reuse' && (
                  <rect x="180" y="100" width="140" height="25" fill="#8b5cf6" opacity="0.2" rx="5"/>
                )}
              </g>

              {/* 2. KIEMENBLÄTTCHEN - mehrere Lamellen */}
              <g className="cursor-pointer" onClick={() => setSelectedPart('blättchen')}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <g key={i}>
                    <ellipse 
                      cx={180 + i * 25} 
                      cy="180" 
                      rx="12" 
                      ry="50" 
                      fill={selectedPart === 'blättchen' ? '#fbcfe8' : '#fecdd3'}
                      stroke={selectedPart === 'blättchen' ? '#ec4899' : '#f472b6'}
                      strokeWidth={selectedPart === 'blättchen' ? '3' : '1'}
                      opacity="0.8"
                    />
                  </g>
                ))}
                <text x="280" y="260" textAnchor="middle" fontSize="14" fill="#ec4899" fontWeight="bold">
                  Kiemenblättchen
                </text>
                {selectedPart === 'blättchen' && (
                  <rect x="200" y="265" width="160" height="25" fill="#ec4899" opacity="0.2" rx="5"/>
                )}
              </g>

              {/* 3. VOM HERZEN KOMMENDES GEFÄß (afferent) */}
              <g className="cursor-pointer" onClick={() => setSelectedPart('herzgefäß')}>
                <path 
                  d="M 80 350 Q 100 320 140 310 Q 180 300 220 290" 
                  fill="none" 
                  stroke={selectedPart === 'herzgefäß' ? '#dc2626' : '#ef4444'}
                  strokeWidth={selectedPart === 'herzgefäß' ? '6' : '4'}
                  markerEnd="url(#arrowRed)"
                />
                <text x="120" y="340" textAnchor="middle" fontSize="12" fill="#dc2626" fontWeight="bold">
                  Vom Herzen
                </text>
                <text x="120" y="355" textAnchor="middle" fontSize="12" fill="#dc2626">
                  kommend
                </text>
                <text x="100" y="375" textAnchor="middle" fontSize="10" fill="#991b1b">
                  (sauerstoffarm)
                </text>
                {selectedPart === 'herzgefäß' && (
                  <rect x="60" y="325" width="100" height="55" fill="#dc2626" opacity="0.2" rx="5"/>
                )}
              </g>

              {/* 4. KAPILLARENETZ in den Blättchen */}
              <g className="cursor-pointer" onClick={() => setSelectedPart('kapillare')}>
                {/* Feine Kapillaren in den Blättchen */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <g key={i}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <line 
                        key={j}
                        x1={175 + i * 25}
                        y1={140 + j * 15}
                        x2={185 + i * 25}
                        y2={140 + j * 15}
                        stroke={selectedPart === 'kapillare' ? '#f97316' : '#fb923c'}
                        strokeWidth={selectedPart === 'kapillare' ? '2' : '1'}
                        opacity="0.7"
                      />
                    ))}
                  </g>
                ))}
                <text x="320" y="210" textAnchor="middle" fontSize="13" fill="#f97316" fontWeight="bold">
                  Kiemenkapillaren
                </text>
                {selectedPart === 'kapillare' && (
                  <rect x="240" y="215" width="160" height="25" fill="#f97316" opacity="0.2" rx="5"/>
                )}
              </g>

              {/* 5. ZUM KÖRPER FÜHRENDES GEFÄß (efferent) */}
              <g className="cursor-pointer" onClick={() => setSelectedPart('körpergefäß')}>
                <path 
                  d="M 380 290 Q 420 300 460 310 Q 500 320 520 350" 
                  fill="none" 
                  stroke={selectedPart === 'körpergefäß' ? '#16a34a' : '#22c55e'}
                  strokeWidth={selectedPart === 'körpergefäß' ? '6' : '4'}
                  markerEnd="url(#arrowGreen)"
                />
                <text x="480" y="340" textAnchor="middle" fontSize="12" fill="#16a34a" fontWeight="bold">
                  Zum Körper
                </text>
                <text x="480" y="355" textAnchor="middle" fontSize="12" fill="#16a34a">
                  führend
                </text>
                <text x="500" y="375" textAnchor="middle" fontSize="10" fill="#166534">
                  (sauerstoffreich)
                </text>
                {selectedPart === 'körpergefäß' && (
                  <rect x="440" y="325" width="100" height="55" fill="#16a34a" opacity="0.2" rx="5"/>
                )}
              </g>

              {/* Blutfluss-Pfeile im Hintergrund */}
              <path d="M 150 290 Q 250 250 300 250 Q 350 250 450 290" fill="none" stroke="#fca5a5" strokeWidth="2" strokeDasharray="5,5" opacity="0.5">
                <animate attributeName="stroke-dashoffset" from="0" to="10" dur="2s" repeatCount="indefinite"/>
              </path>

            </svg>

            <div className="text-center text-sm text-gray-600 mt-4">
              👆 Klicke auf die farbigen Strukturen für Details
            </div>
          </div>

          {/* Rechte Seite: Info-Panel */}
          <div className="w-96 bg-white border-l border-gray-200 p-6 overflow-auto">
            <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
              Strukturen
            </h3>

            <div className="space-y-3">
              {gillParts.map((part) => (
                <button
                  key={part.id}
                  onClick={() => setSelectedPart(part.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedPart === part.id
                      ? 'bg-gray-100 ring-2 ring-offset-2'
                      : 'hover:bg-gray-50'
                  }`}
                  style={{ 
                    borderLeft: `4px solid ${part.color}`,
                    ringColor: selectedPart === part.id ? part.color : undefined
                  }}
                >
                  <div className="font-medium text-gray-800">{part.name}</div>
                </button>
              ))}
            </div>

            {selectedPartData && (
              <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: `${selectedPartData.color}15` }}>
                <h4 className="font-bold mb-2" style={{ color: selectedPartData.color }}>
                  {selectedPartData.name}
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {selectedPartData.description}
                </p>
              </div>
            )}

            {!selectedPart && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg text-gray-600 text-sm">
                Wähle eine Struktur aus dem Diagramm oder der Liste aus, um mehr zu erfahren.
              </div>
            )}

            {/* Legende */}
            <div className="mt-8 pt-4 border-t">
              <h4 className="font-bold text-gray-800 mb-3 text-sm">Legende</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-600"></div>
                  <span className="text-gray-600">Sauerstoffarmes Blut</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                  <span className="text-gray-600">Sauerstoffreiches Blut</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
