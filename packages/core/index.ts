/**
 * LearnCraft Core Package
 * 
 * Stellt die zentralen APIs für Plugins bereit:
 * - Plugin System (laden, aktivieren, verwalten)
 * - Gamification (XP, Level, Häuser)
 * - Auth (User, Sessions)
 * - Storage (Datenbank, Cache)
 * - Events (kommunikation zwischen Plugins)
 */

export * from './plugin-system'

// Core APIs (werden später implementiert)
export * from './gamification'
export * from './storage'
export * from './auth'

// Utilities
export * from './utils'
