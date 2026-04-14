import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// XP Calculation
export function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100))
}

export function xpForLevel(level: number): number {
  return level * level * 100
}

export function xpProgress(xp: number): { current: number; next: number; percentage: number } {
  const level = calculateLevel(xp)
  const currentLevelXp = xpForLevel(level)
  const nextLevelXp = xpForLevel(level + 1)
  const progress = xp - currentLevelXp
  const total = nextLevelXp - currentLevelXp
  
  return {
    current: progress,
    next: total,
    percentage: Math.min(100, Math.round((progress / total) * 100))
  }
}

// Date formatting
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date)
}

// Format XP with commas
export function formatXP(xp: number): string {
  return xp.toLocaleString('de-DE')
}

// Get house color
export function getHouseColor(house: string): string {
  const colors: Record<string, string> = {
    ignis: 'bg-house-ignis',
    aqua: 'bg-house-aqua',
    terra: 'bg-house-terra',
    aer: 'bg-house-aer'
  }
  return colors[house.toLowerCase()] || 'bg-gray-500'
}

// Get house name
export function getHouseName(house: string): string {
  const names: Record<string, string> = {
    ignis: 'Haus Ignis',
    aqua: 'Haus Aqua',
    terra: 'Haus Terra',
    aer: 'Haus Aer'
  }
  return names[house.toLowerCase()] || 'Unbekannt'
}

// Get house emoji
export function getHouseEmoji(house: string): string {
  const emojis: Record<string, string> = {
    ignis: '🔥',
    aqua: '💧',
    terra: '🌿',
    aer: '💨'
  }
  return emojis[house.toLowerCase()] || '🏠'
}
