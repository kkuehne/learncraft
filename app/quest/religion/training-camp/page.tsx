'use client'

import { useState } from 'react'
import { trainingCampData } from '@/lib/training-camp' // Use generic logic
import { Map, BookOpen, Puzzle, FileText, ChevronLeft, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function ReligionTrainingCamp() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 via-orange-900 to-amber-950 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/biomes/religion">
            <button className="flex items-center gap-2 text-amber-200 hover:text-white transition-colors mb-4">
              <ChevronLeft className="w-5 h-5" />
              Zurück zum Lernpfad
            </button>
          </Link>
          <h1 className="text-3xl font-bold text-white">Religions-Camp 🏕️</h1>
          <p className="text-amber-200">Coming Soon: Interaktive Einführung in die Bibel-Welt</p>
        </div>
        <div className="bg-white/10 rounded-2xl p-12 text-center text-white border-2 border-dashed border-white/20">
          <p className="text-xl">Dieses Modul befindet sich noch im Bau.</p>
          <p className="text-amber-300 mt-2">Hier folgen bald: Bibel-Tour, Symbol-Match und Figuren-Steckbriefe!</p>
        </div>
      </div>
    </div>
  )
}
