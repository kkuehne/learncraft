'use client'

import { useState } from 'react'
import { religionQuest } from '@/lib/religion-data'
import { QuizComponent } from '@/components/quiz-component'

interface ExodusQuizProps {
  onComplete: (passed: boolean) => void
}

export function ExodusQuiz({ onComplete }: ExodusQuizProps) {
  // Use quiz questions from gold level
  const questions = religionQuest.levels.gold.tasks.map(task => ({
    question: task.question,
    options: task.options,
    correct: task.correctAnswer,
    explanation: task.hint
  }))

  return (
    <QuizComponent
      questions={questions}
      moduleId="exodus"
      onComplete={onComplete}
      xp={35}
    />
  )
}
