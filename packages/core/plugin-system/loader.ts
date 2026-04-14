/**
 * LearnCraft Plugin Loader
 * 
 * Lädt Plugins dynamisch, initialisiert sie und stellt APIs bereit.
 * Unterstützt: npm packages, git submodules, oder local files
 */

import { 
  Plugin, 
  PluginManifest, 
  PluginAPI,
  HookDefinitions,
  RouteDefinition,
  ComponentRegistry
} from './types'

// Registry aller geladenen Plugins
const pluginRegistry: Map<string, LoadedPlugin> = new Map()
const hookRegistry: Map<string, Set<Function>> = new Map()
const routeRegistry: RouteDefinition[] = []
const componentRegistry: ComponentRegistry = {}

interface LoadedPlugin {
  manifest: PluginManifest
  instance: Plugin
  isActive: boolean
  config: Record<string, unknown>
}

/**
 * Plugin Loader - Hauptklasse
 */
export class PluginLoader {
  private api: PluginAPI

  constructor(api: PluginAPI) {
    this.api = api
  }

  /**
   * Einzelnes Plugin laden
   */
  async loadPlugin(manifest: PluginManifest, pluginModule: unknown): Promise<boolean> {
    console.log(`[PluginLoader] Lade Plugin: ${manifest.id} v${manifest.version}`)

    // Prüfe Dependencies
    if (manifest.requires) {
      for (const depId of manifest.requires) {
        if (!pluginRegistry.has(depId)) {
          console.error(`[PluginLoader] Fehlende Dependency: ${depId} für ${manifest.id}`)
          return false
        }
      }
    }

    // Prüfe Konflikte
    if (manifest.conflicts) {
      for (const conflictId of manifest.conflicts) {
        if (pluginRegistry.has(conflictId)) {
          console.error(`[PluginLoader] Konflikt: ${conflictId} ist inkompatibel mit ${manifest.id}`)
          return false
        }
      }
    }

    // Plugin initialisieren
    const plugin = this.createPluginInstance(manifest, pluginModule)
    
    // Zu Registry hinzufügen
    const loadedPlugin: LoadedPlugin = {
      manifest,
      instance: plugin,
      isActive: false,
      config: manifest.defaultConfig || {}
    }
    
    pluginRegistry.set(manifest.id, loadedPlugin)

    // Routes registrieren
    if (plugin.registerRoutes) {
      const routes = plugin.registerRoutes()
      routes.forEach(route => {
        routeRegistry.push({ ...route, pluginId: manifest.id })
      })
    }

    // Komponenten registrieren
    if (plugin.registerComponents) {
      const components = plugin.registerComponents()
      Object.assign(componentRegistry, components)
    }

    // Hooks registrieren
    if (plugin.registerHooks) {
      const hooks = plugin.registerHooks()
      this.registerHooks(manifest.id, hooks)
    }

    // onInstall ausführen (einmalig)
    if (plugin.onInstall) {
      await plugin.onInstall()
    }

    console.log(`[PluginLoader] Plugin ${manifest.id} geladen`)
    return true
  }

  /**
   * Plugin aktivieren
   */
  async activatePlugin(pluginId: string): Promise<boolean> {
    const loaded = pluginRegistry.get(pluginId)
    if (!loaded) {
      console.error(`[PluginLoader] Plugin nicht gefunden: ${pluginId}`)
      return false
    }

    if (loaded.isActive) {
      console.log(`[PluginLoader] Plugin ${pluginId} bereits aktiv`)
      return true
    }

    // Dependencies aktivieren (falls nicht schon aktiv)
    if (loaded.manifest.requires) {
      for (const depId of loaded.manifest.requires) {
        if (!pluginRegistry.get(depId)?.isActive) {
          await this.activatePlugin(depId)
        }
      }
    }

    // onActivate ausführen
    if (loaded.instance.onActivate) {
      await loaded.instance.onActivate()
    }

    loaded.isActive = true
    console.log(`[PluginLoader] Plugin ${pluginId} aktiviert`)
    
    // Event emit
    await this.api.events.emit('plugin:activated', { pluginId })
    
    return true
  }

  /**
   * Plugin deaktivieren
   */
  async deactivatePlugin(pluginId: string): Promise<boolean> {
    const loaded = pluginRegistry.get(pluginId)
    if (!loaded || !loaded.isActive) {
      return false
    }

    // Prüfe ob andere Plugins davon abhängen
    for (const [id, otherPlugin] of pluginRegistry) {
      if (otherPlugin.manifest.requires?.includes(pluginId) && otherPlugin.isActive) {
        console.error(`[PluginLoader] Kann ${pluginId} nicht deaktivieren - ${id} hängt davon ab`)
        return false
      }
    }

    if (loaded.instance.onDeactivate) {
      await loaded.instance.onDeactivate()
    }

    loaded.isActive = false
    
    // Event emit
    await this.api.events.emit('plugin:deactivated', { pluginId })
    
    return true
  }

  /**
   * Plugin entfernen
   */
  async uninstallPlugin(pluginId: string): Promise<boolean> {
    const loaded = pluginRegistry.get(pluginId)
    if (!loaded) {
      return false
    }

    // Erst deaktivieren
    if (loaded.isActive) {
      await this.deactivatePlugin(pluginId)
    }

    // onUninstall ausführen
    if (loaded.instance.onUninstall) {
      await loaded.instance.onUninstall()
    }

    // Routes entfernen
    const routesToRemove = routeRegistry.filterIndex(r => (r as any).pluginId === pluginId)
    routesToRemove.reverse().forEach(index => {
      routeRegistry.splice(index, 1)
    })

    // Hooks entfernen
    hookRegistry.forEach((handlers, event) => {
      handlers.forEach(handler => {
        if ((handler as any)._pluginId === pluginId) {
          handlers.delete(handler)
        }
      })
    })

    // Registry entfernen
    pluginRegistry.delete(pluginId)

    // Event emit
    await this.api.events.emit('plugin:uninstalled', { pluginId })

    return true
  }

  /**
   * Alle aktiven Plugins zurückgeben
   */
  getActivePlugins(): Plugin[] {
    return Array.from(pluginRegistry.values())
      .filter(p => p.isActive)
      .map(p => p.instance)
  }

  /**
   * Alle installierten Plugins zurückgeben
   */
  getAllPlugins(): LoadedPlugin[] {
    return Array.from(pluginRegistry.values())
  }

  /**
   * Einzelnes Plugin abrufen
   */
  getPlugin(pluginId: string): LoadedPlugin | undefined {
    return pluginRegistry.get(pluginId)
  }

  /**
   * Plugin Konfiguration aktualisieren
   */
  updatePluginConfig(pluginId: string, config: Record<string, unknown>): void {
    const loaded = pluginRegistry.get(pluginId)
    if (loaded) {
      loaded.config = { ...loaded.config, ...config }
    }
  }

  /**
   * Plugin Instanz erstellen
   */
  private createPluginInstance(manifest: PluginManifest, module: unknown): Plugin {
    // Je nach Modul-Typ (ES6, CommonJS, etc.)
    const pluginModule = module as any
    
    return {
      manifest,
      ...pluginModule.default,
      ...pluginModule
    }
  }

  /**
   * Hooks registrieren
   */
  private registerHooks(pluginId: string, hooks: HookDefinitions): void {
    Object.entries(hooks).forEach(([event, handler]) => {
      if (!handler) return
      
      // Handler mit Plugin-ID markieren
      const wrappedHandler = (...args: unknown[]) => {
        return handler(...args)
      }
      ;(wrappedHandler as any)._pluginId = pluginId

      if (!hookRegistry.has(event)) {
        hookRegistry.set(event, new Set())
      }
      hookRegistry.get(event)?.add(wrappedHandler)
    })
  }

  /**
   * Routes abrufen
   */
  getRoutes(): RouteDefinition[] {
    return [...routeRegistry]
  }

  /**
   * Komponenten abrufen
   */
  getComponents(): ComponentRegistry {
    return { ...componentRegistry }
  }
}

/**
 * Event System - Globaler Event Bus
 */
export class EventBus {
  private listeners: Map<string, Set<Function>> = new Map()

  on(event: string, handler: (data: unknown) => void): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event)?.add(handler)

    // Unsubscribe function
    return () => {
      this.listeners.get(event)?.delete(handler)
    }
  }

  once(event: string, handler: (data: unknown) => void): void {
    const wrappedHandler = (data: unknown) => {
      handler(data)
      this.off(event, wrappedHandler)
    }
    this.on(event, wrappedHandler)
  }

  off(event: string, handler: Function): void {
    this.listeners.get(event)?.delete(handler)
  }

  async emit(event: string, data: unknown): Promise<void> {
    const handlers = this.listeners.get(event)
    if (!handlers) return

    // Ausführen und auf Promises warten
    const promises = Array.from(handlers).map(async handler => {
      try {
        await handler(data)
      } catch (error) {
        console.error(`[EventBus] Fehler in Handler für ${event}:`, error)
      }
    })

    await Promise.all(promises)
  }
}

/**
 * Hook System - Erweitertes Event System mit Prioritäten
 */
export class HookSystem {
  private hooks: Map<string, HookHandler[]> = new Map()

  register(hook: string, handler: HookHandler, priority: number = 10): void {
    if (!this.hooks.has(hook)) {
      this.hooks.set(hook, [])
    }
    
    const handlers = this.hooks.get(hook)!
    handlers.push({ handler, priority })
    
    // Nach Priorität sortieren (niedriger = früher)
    handlers.sort((a, b) => a.priority - b.priority)
  }

  async execute(hook: string, context: unknown): Promise<unknown> {
    const handlers = this.hooks.get(hook)
    if (!handlers) return context

    let result = context
    
    for (const { handler } of handlers) {
      try {
        const newResult = await handler(result)
        if (newResult !== undefined) {
          result = newResult
        }
      } catch (error) {
        console.error(`[HookSystem] Fehler in Hook ${hook}:`, error)
      }
    }

    return result
  }

  async executeFilters(hook: string, value: unknown, ...args: unknown[]): Promise<unknown> {
    const handlers = this.hooks.get(hook)
    if (!handlers) return value

    let result = value
    
    for (const { handler } of handlers) {
      try {
        result = await handler(result, ...args)
      } catch (error) {
        console.error(`[HookSystem] Fehler in Filter ${hook}:`, error)
      }
    }

    return result
  }
}

interface HookHandler {
  handler: (context: unknown) => unknown | Promise<unknown>
  priority: number
}

/**
 * Component Registry - Dynamische UI-Komponenten
 */
export class ComponentSystem {
  private components: Map<string, React.ComponentType> = new Map()
  private overrides: Map<string, string> = new Map() // pluginId -> componentName

  register(name: string, component: React.ComponentType, pluginId?: string): void {
    const key = pluginId ? `${pluginId}:${name}` : name
    this.components.set(key, component)
    
    // Standard-Komponente überschreiben?
    if (pluginId && !this.components.has(name)) {
      this.components.set(name, component)
    }
  }

  get(name: string, pluginId?: string): React.ComponentType | undefined {
    // Zuerst Plugin-spezifisch suchen
    if (pluginId) {
      const pluginComponent = this.components.get(`${pluginId}:${name}`)
      if (pluginComponent) return pluginComponent
    }
    
    // Dann global suchen
    return this.components.get(name)
  }

  override(standardName: string, pluginId: string, replacementName: string): void {
    this.overrides.set(standardName, `${pluginId}:${replacementName}`)
  }

  getWithOverride(name: string): React.ComponentType | undefined {
    const overrideKey = this.overrides.get(name)
    if (overrideKey) {
      return this.components.get(overrideKey)
    }
    return this.components.get(name)
  }
}

// Singletons exportieren
export const eventBus = new EventBus()
export const hookSystem = new HookSystem()
export const componentSystem = new ComponentSystem()
