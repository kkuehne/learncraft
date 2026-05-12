'use client'

import { useState, useEffect } from 'react'
import { getBiomeById } from '@/lib/biomes'
import { professorEich } from '@/lib/biomes/biology'
import { professorLumen } from '@/lib/biomes/religion'
import { addXP } from '@/lib/xp'
import { speak, getRandomResponse } from '@/lib/speech'
import { Check, X } from 'lucide-react'

interface QuizProps {
  task?: {
    id: string
    question: string
    options: string[]
    correctAnswer: number
    hint?: string
    xp: number
  }
  onComplete?: (success: boolean) => void
  biomeId?: string
}

export default function QuizStation({ task: initialTask, onComplete, biomeId }: QuizProps) {
  const [task, setTask] = useState(initialTask)
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  
  useEffect(() => {
    if (!biomeId) return
    const biome = getBiomeById(biomeId)
    if (biome && biome.quest && biome.quest.levels) {
      // This is a simplified logic to get a task. 
      // In a real scenario, we might track the current level (bronze, silver, gold).
      // For the MVP, we'll iterate through all levels combined.
      const allTasks = [
        ...(biome.quest.levels.bronze?.tasks || []),
        ...(biome.quest.levels.silver?.tasks || []),
        ...(biome.quest.levels.gold?.tasks || [])
      ]
      
      if (allTasks.length > 0) {
        setTask(allTasks[currentTaskIndex] || allTasks[0])
      }
    }
  }, [biomeId, currentTaskIndex])

  // Reset states when task changes
  useEffect(() => {
    setSelected(null)
    setShowResult(false)
    setIsCorrect(false)
  }, [task?.id])
  
  const handleAnswer = (index: number) => {
    if (showResult || !task) return
    
    setSelected(index)
    const correct = index === task.correctAnswer
    setIsCorrect(correct)
    setShowResult(true)
    
    if (correct) {
      addXP(task.xp, task.id)
      
      const expert = biomeId === 'religion' ? professorLumen : professorEich
      const explanation = task.hint || getRandomResponse(expert.correct)
      speak(explanation)
    } else {
      const expert = biomeId === 'religion' ? professorLumen : professorEich
      speak(getRandomResponse(expert.wrong))
    }
    
    setTimeout(() => {
      onComplete?.(correct)
      if (!correct) {
        setSelected(null)
        setShowResult(false)
        setIsCorrect(false)
      } else if (task) {
        // Move to next task if correct
        setCurrentTaskIndex(prev => prev + 1)
      }
    }, correct && task.hint ? 3500 : 1500)
  }
  
  if (!task) return <div className="text-center p-10">Lade Aufgabe...</div>

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-4xl">{biomeId === 'religion' ? '📖' : '🦫'}</span>
          <div>
            <p className="font-bold text-amber-800">{biomeId === 'religion' ? 'Professor Lumen' : 'Professor Eich'}</p>
            <p className="text-gray-700">{task.question}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {task.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={showResult}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all
              ${showResult 
                ? index === task.correctAnswer
                  ? 'bg-green-100 border-green-500'
                  : index === selected
                    ? 'bg-red-100 border-red-500'
                    : 'bg-gray-50 border-gray-200'
                : 'bg-white border-gray-300 hover:border-blue-400 hover:bg-blue-50'
              }
            `}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {showResult && index === task.correctAnswer && <Check className="text-green-600" size={20} />}
              {showResult && index === selected && index !== task.correctAnswer && <X className="text-red-600" size={20} />}
            </div>
          </button>
        ))}
      </div>
      
      {showResult && (
        <div className={`mt-4 p-4 rounded-lg text-center font-bold
          ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
        `}>
          {isCorrect ? `🎉 Richtig! +${task.xp} XP!` : `😅 Nicht ganz. Richtig: ${task.options[task.correctAnswer]}`}
        </div>
      )}
    </div>
  )
}
