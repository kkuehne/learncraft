/**
 * LearnCraft Auth API
 * 
 * Authentifizierung und User-Management.
 * Basierend auf Supabase Auth.
 */

import { UserAPI, User, UserStats } from './plugin-system/types'

// Placeholder - wird mit Supabase implementiert
export const authAPI: UserAPI = {
  async getCurrentUser(): Promise<User | null> {
    // TODO: Supabase Auth
    return null
  },

  async updateProfile(data: Partial<User>): Promise<void> {
    console.log('[Auth] Profil update:', data)
    // TODO: Supabase Integration
  },

  async getStats(): Promise<UserStats> {
    // TODO: Aus Datenbank laden
    return {
      totalXP: 0,
      questsCompleted: 0,
      tasksCompleted: 0,
      accuracy: 0,
      studyTime: 0
    }
  }
}

// Session Management
export class SessionManager {
  private token: string | null = null

  setToken(token: string): void {
    this.token = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('learncraft:token', token)
    }
  }

  getToken(): string | null {
    if (!this.token && typeof window !== 'undefined') {
      this.token = localStorage.getItem('learncraft:token')
    }
    return this.token
  }

  clear(): void {
    this.token = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('learncraft:token')
    }
  }
}

export const sessionManager = new SessionManager()
