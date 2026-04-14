/**
 * LearnCraft Storage API
 * 
 * Abstraktion für Datenbank (Supabase) und Cache.
 * Plugins nutzen diese API über das Plugin-System.
 */

import { StorageAPI } from './plugin-system/types'

// Placeholder - wird mit Supabase implementiert
export const storageAPI: StorageAPI = {
  async get(key: string): Promise<unknown> {
    // LocalStorage oder Supabase
    if (typeof window !== 'undefined') {
      const value = localStorage.getItem(`learncraft:${key}`)
      return value ? JSON.parse(value) : null
    }
    return null
  },

  async set(key: string, value: unknown): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`learncraft:${key}`, JSON.stringify(value))
    }
  },

  async remove(key: string): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`learncraft:${key}`)
    }
  },

  async getUserData(userId: string, key: string): Promise<unknown> {
    // TODO: Supabase Integration
    return this.get(`user:${userId}:${key}`)
  },

  async setUserData(userId: string, key: string, value: unknown): Promise<void> {
    // TODO: Supabase Integration
    return this.set(`user:${userId}:${key}`, value)
  }
}

// Cache für häufige Abfragen
export class Cache {
  private store: Map<string, { value: unknown; expires: number }> = new Map()

  get(key: string): unknown | null {
    const entry = this.store.get(key)
    if (!entry) return null
    if (entry.expires < Date.now()) {
      this.store.delete(key)
      return null
    }
    return entry.value
  }

  set(key: string, value: unknown, ttlSeconds: number = 300): void {
    this.store.set(key, {
      value,
      expires: Date.now() + (ttlSeconds * 1000)
    })
  }

  clear(): void {
    this.store.clear()
  }
}

export const cache = new Cache()
