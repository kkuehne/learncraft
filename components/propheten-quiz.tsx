'use client'

import { useState } from 'react'
import { religionQuest } from '@/lib/religion-data'
import { QuizComponent } from '@/components/quiz-component'

interface ProphetenQuizProps {
  onComplete: (passed: boolean) => void
}

export function ProphetenQuiz({ onComplete }: ProphetenQuizProps) {
  // Use quiz questions from boss level
  const questions = religionQuest.levels.boss.tasks.map(task => ({
    question: task.question,
    options: task.options,
    correct: task.correctAnswer,
    explanation: task.hint
  }))

  return (
    <QuizComponent
      questions={questions}
      moduleId="propheten"
      onComplete={onComplete}
      xp={40}
    />
  )
}
