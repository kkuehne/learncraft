'use client'

import { useState, useEffect } from 'react'
import { X, Volume2 } from 'lucide-react'
import { speak, stopSpeaking } from '@/lib/speech'
import { professorEich } from '@/lib/data'

interface DetailedGillProps {
  isOpen: boolean
  onClose: () => void
}

export function DetailedGill({ isOpen, onClose }: DetailedGillProps) {
  const [selectedPart, setSelectedPart] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        speak('Willkommen in der detaillierten Kiemenanatomie. Klicke auf die farbigen Strukturen, um mehr zu erfahren.')
      }, 500)
    }
  }, [isOpen])

  if (!isOpen) return null

  const gillParts = [
    {
      id: 'reuse',
      name: 'Kiemenreuse',
      description: 'Filtert Nahrungspartikel aus dem Wasser und schützt die Kiemen vor Beschädigung.',
      audioText: 'Die Kiemenreuse ist ein feiner Kamm aus knochigen Fortsätzen. Sie filtert Nahrungspartikel aus dem Wasser und schützt die empfindlichen Kiemenblätter vor Beschädigung durch Fremdkörper.',
      color: '#8b5cf6',
    },
    {
      id: 'blattchen',
      name: 'Kiemenblättchen',
      description: 'Feine Fortsätze an den Kiemenbögen, die die eigentliche Atmungsoberfläche bilden.',
      audioText: 'Die Kiemenblättchen sind papierdünne, gefaltete Fortsätze an den Kiemenbögen. Hier findet der eigentliche Gasaustausch statt. Durch die Falten wird die Oberfläche enorm vergrößert.',
      color: '#ec4899',
    },
    {
      id: 'herzgefasz',
      name: 'Vom Herzen kommendes Kiemengefäß',
      description: 'Afferentes Gefäß - führt sauerstoffarmes Blut vom Herz zu den Kiemen.',
      audioText: 'Das vom Herzen kommende Kiemengefäß ist ein afferentes Blutgefäß. Es transportiert sauerstoffarmes Blut vom Herzen zu den Kiemen, wo es mit Sauerstoff angereichert wird.',
      color: '#dc2626',
    },
    {
      id: 'kapillaren',
      name: 'Kiemenkapillaren',
      description: 'Haargefäße in den Kiemenblättchen, hier findet der Gasaustausch statt.',
      audioText: 'In den Kiemenkapillaren findet der eigentliche Gasaustausch statt. Die Blutgefäße sind hier so dünn, dass Sauerstoff und Kohlendioxid durch die Membran diffundieren können. Das Gegenstromprinzip macht dies besonders effizient.',
      color: '#f97316',
    },
    {
      id: 'korpergefasz',
      name: 'Zum Körper führendes Kiemengefäß',
      description: 'Efferentes Gefäß - führt sauerstoffreiches Blut vom Kopf zum Rest des Körpers.',
      audioText: 'Das zum Körper führende Kiemengefäß ist ein efferentes Gefäß. Nach dem Gasaustausch fließt hier sauerstoffreiches Blut vom Kopf zu allen anderen Körperteilen der Forelle.',
      color: '#16a34a',
    },
  ]

  const selectedPartData = selectedPart ? gillParts.find(p => p.id === selectedPart) : null

  const handlePartClick = (partId: string) => {
    setSelectedPart(partId)
    const part = gillParts.find(p => p.id === partId)
    if (part?.audioText) {
      speak(part.audioText)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="bg-gradient-to-r from-blue-800 to-cyan-600 p-4 flex justify-between items-center flex-shrink-0">
          <h2 className="text-2xl font-bold text-white">
            Detaillierte Kiemenanatomie
          </h2>
          <button 
            onClick={() => { stopSpeaking(); onClose(); }} 
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Prof. Eich Info-Box */}
          <div className="w-80 bg-amber-50 border-r border-amber-200 p-4 overflow-auto flex-shrink-0">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-4xl">🦫</span>
              <div>
                <p className="font-bold text-amber-800">Professor Eich</p>
                <p className="text-sm text-gray-700">
                  Klicke auf die farbigen Strukturen, um meine Erklärung zu hören!
                </p>
              </div>
            </div>
            
            {selectedPartData && (
              <div className="bg-white rounded-lg p-3 border border-amber-200 shadow-sm">
                <button 
                  onClick={() => speak(selectedPartData.audioText)}
                  className="w-full flex items-center justify-center gap-2 bg-amber-100 hover:bg-amber-200 text-amber-800 py-2 rounded-lg transition-colors mb-2"
                >
                  <Volume2 size={18} />
                  <span className="text-sm font-medium">Nochmal anhören</span>
                </button>
                <p className="text-xs text-gray-500 text-center">
                  Audio wird automatisch abgespielt
                </p>
              </div>
            )}
          </div>
          <div className="flex-1 bg-gradient-to-b from-blue-50 to-cyan-50 p-6 overflow-auto">
            <svg viewBox="0 0 600 500" className="w-full h-full min-h-[450px]">
              <defs>
                <marker id="arrowRed" markerWidth="12" markerHeight="12" refX="10" refY="4" orient="auto">
                  <path d="M0,0 L0,8 L12,4 z" fill="#dc2626"/>
                </marker>
                <marker id="arrowGreen" markerWidth="12" markerHeight="12" refX="10" refY="4" orient="auto">
                  <path d="M0,0 L0,8 L12,4 z" fill="#16a34a"/>
                </marker>
              </defs>

              <text x="300" y="30" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e3a5f">
                Querschnitt durch einen Kiemenbogen
              </text>

              <g className="cursor-pointer" onClick={() => handlePartClick('reuse')}>
                <path 
                  d="M 100 60 Q 150 40 200 55 Q 250 45 300 60 Q 350 55 400 65" 
                  fill="none" 
                  stroke={selectedPart === 'reuse' ? '#8b5cf6' : '#6b7280'} 
                  strokeWidth={selectedPart === 'reuse' ? '4' : '2'}
                />
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

              <g className="cursor-pointer" onClick={() => handlePartClick('blattchen')}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <g key={i}>
                    <ellipse 
                      cx={180 + i * 25} 
                      cy="180" 
                      rx="12" 
                      ry="50" 
                      fill={selectedPart === 'blattchen' ? '#fbcfe8' : '#fecdd3'}
                      stroke={selectedPart === 'blattchen' ? '#ec4899' : '#f472b6'}
                      strokeWidth={selectedPart === 'blattchen' ? '3' : '1'}
                      opacity="0.8"
                    />
                  </g>
                ))}
                <text x="280" y="260" textAnchor="middle" fontSize="14" fill="#ec4899" fontWeight="bold">
                  Kiemenblattchen
                </text>
                {selectedPart === 'blattchen' && (
                  <rect x="200" y="265" width="160" height="25" fill="#ec4899" opacity="0.2" rx="5"/>
                )}
              </g>

              <g className="cursor-pointer" onClick={() => handlePartClick('herzgefasz')}>
                <path 
                  d="M 80 350 Q 100 320 140 310 Q 180 300 220 290" 
                  fill="none" 
                  stroke={selectedPart === 'herzgefasz' ? '#dc2626' : '#ef4444'}
                  strokeWidth={selectedPart === 'herzgefasz' ? '6' : '4'}
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
                {selectedPart === 'herzgefasz' && (
                  <rect x="60" y="325" width="100" height="55" fill="#dc2626" opacity="0.2" rx="5"/>
                )}
              </g>

              <g className="cursor-pointer" onClick={() => handlePartClick('kapillaren')}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <g key={i}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <line 
                        key={j}
                        x1={175 + i * 25}
                        y1={140 + j * 15}
                        x2={185 + i * 25}
                        y2={140 + j * 15}
                        stroke={selectedPart === 'kapillaren' ? '#f97316' : '#fb923c'}
                        strokeWidth={selectedPart === 'kapillaren' ? '2' : '1'}
                        opacity="0.7"
                      />
                    ))}
                  </g>
                ))}
                <text x="320" y="210" textAnchor="middle" fontSize="13" fill="#f97316" fontWeight="bold">
                  Kiemenkapillaren
                </text>
                {selectedPart === 'kapillaren' && (
                  <rect x="240" y="215" width="160" height="25" fill="#f97316" opacity="0.2" rx="5"/>
                )}
              </g>

              <g className="cursor-pointer" onClick={() => handlePartClick('korpergefasz')}>
                <path 
                  d="M 380 290 Q 420 300 460 310 Q 500 320 520 350" 
                  fill="none" 
                  stroke={selectedPart === 'korpergefasz' ? '#16a34a' : '#22c55e'}
                  strokeWidth={selectedPart === 'korpergefasz' ? '6' : '4'}
                  markerEnd="url(#arrowGreen)"
                />
                <text x="480" y="340" textAnchor="middle" fontSize="12" fill="#16a34a" fontWeight="bold">
                  Zum Korper
                </text>
                <text x="480" y="355" textAnchor="middle" fontSize="12" fill="#16a34a">
                  fuhrend
                </text>
                <text x="500" y="375" textAnchor="middle" fontSize="10" fill="#166534">
                  (sauerstoffreich)
                </text>
                {selectedPart === 'korpergefasz' && (
                  <rect x="440" y="325" width="100" height="55" fill="#16a34a" opacity="0.2" rx="5"/>
                )}
              </g>

              <path d="M 150 290 Q 250 250 300 250 Q 350 250 450 290" fill="none" stroke="#fca5a5" strokeWidth="2" strokeDasharray="5,5" opacity="0.5">
                <animate attributeName="stroke-dashoffset" from="0" to="10" dur="2s" repeatCount="indefinite"/>
              </path>

            </svg>

            <div className="text-center text-sm text-gray-600 mt-4">
              Klicke auf die farbigen Strukturen fur Details
            </div>
          </div>

          <div className="w-96 bg-white border-l border-gray-200 p-6 overflow-auto">
            <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
              Strukturen
            </h3>

            <div className="space-y-3">
              {gillParts.map((part) => (
                <button
                  key={part.id}
                  onClick={() => handlePartClick(part.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedPart === part.id
                      ? 'bg-gray-100 ring-2 ring-offset-2'
                      : 'hover:bg-gray-50'
                  }`}
                  style={{ 
                    borderLeft: `4px solid ${part.color}`,
                    '--tw-ring-color': selectedPart === part.id ? part.color : undefined
                  } as React.CSSProperties}
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
                Wahle eine Struktur aus dem Diagramm oder der Liste aus, um mehr zu erfahren.
              </div>
            )}

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
