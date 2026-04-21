'use client'

import { useState } from 'react'
import { religionQuest } from '@/lib/religion-data'
import { QuizComponent } from '@/components/quiz-component'

interface BundQuizProps {
  onComplete: (passed: boolean) => void
}

export function BundQuiz({ onComplete }: BundQuizProps) {
  // Use quiz questions from silver level
  const questions = religionQuest.levels.silver.tasks.map(task => ({
    question: task.question,
    options: task.options,
    correct: task.correctAnswer,
    explanation: task.hint
  }))

  return (
    <QuizComponent
      questions={questions}
      moduleId="bund"
      onComplete={onComplete}
      xp={35}
    />
  )
}
