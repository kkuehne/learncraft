/**
 * LearnCraft Gamification API
 * 
 * Zentrale Schnittstelle für XP, Level, Häuser und Belohnungen.
 * Plugins nutzen diese API über das Plugin-System.
 */

import { 
  GamificationAPI, 
  QuestProgress, 
  XPEvent,
  LevelUpEvent,
  HouseScoreEvent
} from './plugin-system/types'

// Placeholder - wird mit Supabase implementiert
export const gamificationAPI: GamificationAPI = {
  async addXP(userId: string, amount: number, source: string): Promise<void> {
    console.log(`[Gamification] +${amount} XP für ${userId} von ${source}`)
    // TODO: Supabase Integration
  },

  async getLevel(userId: string): Promise<number> {
    // TODO: Aus Datenbank laden
    return 1
  },

  async getProgress(userId: string, questId: string): Promise<QuestProgress> {
    // TODO: Aus Datenbank laden
    return {
      questId,
      bronze: false,
      silver: false,
      gold: false
    }
  },

  async updateProgress(
    userId: string, 
    questId: string, 
    level: string, 
    completed: boolean
  ): Promise<void> {
    console.log(`[Gamification] Progress update: ${questId} - ${level}: ${completed}`)
    // TODO: Supabase Integration
  },

  async getHouseScore(house: string): Promise<number> {
    // TODO: Aus Datenbank laden
    return 0
  },

  async addHouseScore(house: string, points: number): Promise<void> {
    console.log(`[Gamification] +${points} für Haus ${house}`)
    // TODO: Supabase Integration
  }
}

// XP Formeln
export function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100))
}

export function xpForLevel(level: number): number {
  return level * level * 100
}

export function calculateXPProgress(xp: number): {
  current: number
  next: number
  percentage: number
} {
  const level = calculateLevel(xp)
  const currentLevelXP = xpForLevel(level)
  const nextLevelXP = xpForLevel(level + 1)
  const progress = xp - currentLevelXP
  const total = nextLevelXP - currentLevelXP

  return {
    current: progress,
    next: total,
    percentage: Math.min(100, Math.round((progress / total) * 100))
  }
}

// Level-Titel
export function getLevelTitle(level: number): string {
  if (level < 5) return 'Anfänger'
  if (level < 10) return 'Fortgeschritten'
  if (level < 20) return 'Experte'
  if (level < 50) return 'Meister'
  return 'Legende'
}
