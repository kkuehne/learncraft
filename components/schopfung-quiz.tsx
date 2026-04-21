'use client'

import { useState } from 'react'
import { religionQuest } from '@/lib/religion-data'
import { QuizComponent } from '@/components/quiz-component'

interface SchopfungQuizProps {
  onComplete: (passed: boolean) => void
}

export function SchopfungQuiz({ onComplete }: SchopfungQuizProps) {
  // Use quiz questions from bronze level
  const questions = religionQuest.levels.bronze.tasks.slice(0, 3).map(task => ({
    question: task.question,
    options: task.options,
    correct: task.correctAnswer,
    explanation: task.hint
  }))

  return (
    <QuizComponent
      questions={questions}
      moduleId="schöpfung"
      onComplete={onComplete}
      xp={40}
    />
  )
}
