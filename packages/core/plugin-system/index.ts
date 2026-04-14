/**
 * LearnCraft Plugin System
 * 
 * Der Core exportiert alle Plugin-System Funktionen.
 * Plugins importieren von hier.
 */

export * from './types'
export * from './loader'

// Re-exports für einfachen Zugriff
export { 
  PluginLoader, 
  EventBus, 
  HookSystem, 
  ComponentSystem,
  eventBus,
  hookSystem,
  componentSystem 
} from './loader'
