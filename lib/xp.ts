// Simple XP System with localStorage

const STORAGE_KEY = 'learncraft-user'

export interface UserData {
  xp: number
  completedTasks: string[]
  completedLevels: ('bronze' | 'silver' | 'gold' | 'anatomy' | 'innerorgans' | 'boss')[]
  labeledParts?: {
    anatomy?: string[]
    innerOrgans?: string[]
  }
}

export function getUserData(): UserData {
  if (typeof window === 'undefined') {
    return { xp: 0, completedTasks: [], completedLevels: [], labeledParts: { anatomy: [], innerOrgans: [] } }
  }
  
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    return JSON.parse(stored)
  }
  
  return { xp: 0, completedTasks: [], completedLevels: [], labeledParts: { anatomy: [], innerOrgans: [] } }
}

export function saveUserData(data: UserData): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function addXP(amount: number, taskId: string): { newXP: number; levelUp: boolean } {
  const user = getUserData()
  
  if (user.completedTasks.includes(taskId)) {
    return { newXP: user.xp, levelUp: false }
  }
  
  const oldLevel = getLevel(user.xp)
  user.xp += amount
  user.completedTasks.push(taskId)
  const newLevel = getLevel(user.xp)
  
  saveUserData(user)
  
  return { 
    newXP: user.xp, 
    levelUp: newLevel !== oldLevel 
  }
}

export function completeLevel(level: 'bronze' | 'silver' | 'gold' | 'anatomy' | 'innerorgans' | 'boss'): void {
  const user = getUserData()
  if (!user.completedLevels.includes(level)) {
    user.completedLevels.push(level)
    saveUserData(user)
  }
}

// Save labeled parts for anatomy
export function saveLabeledParts(type: 'anatomy' | 'innerOrgans', parts: string[]): void {
  const user = getUserData()
  if (!user.labeledParts) {
    user.labeledParts = { anatomy: [], innerOrgans: [] }
  }
  user.labeledParts[type] = parts
  saveUserData(user)
}

// Get labeled parts
export function getLabeledParts(type: 'anatomy' | 'innerOrgans'): string[] {
  const user = getUserData()
  return user.labeledParts?.[type] || []
}

export function getLevel(xp: number): 'bronze' | 'silver' | 'gold' | 'boss' {
  if (xp >= 275) return 'boss'
  if (xp >= 125) return 'gold'
  if (xp >= 50) return 'silver'
  return 'bronze'
}

export function getProgress(xp: number): { current: number; next: number; percent: number } {
  if (xp >= 275) return { current: xp - 275, next: 150, percent: 100 }
  if (xp >= 125) return { current: xp - 125, next: 150, percent: ((xp - 125) / 150) * 100 }
  if (xp >= 50) return { current: xp - 50, next: 75, percent: ((xp - 50) / 75) * 100 }
  return { current: xp, next: 50, percent: (xp / 50) * 100 }
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

export function getTotalXP(): number {
  return getUserData().xp
}
