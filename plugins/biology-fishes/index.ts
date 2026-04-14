/**
 * LearnCraft Plugin: Biologie - Fische
 * 
 * Beispiel-Implementierung eines Biome-Plugins.
 * Zeigt wie alle Aspekte modular aufgebaut sind.
 */

import type { 
  Plugin, 
  PluginManifest,
  RouteDefinition,
  ComponentRegistry,
  BiomeContent,
  HookDefinitions,
  PluginAPI
} from '@learncraft/core/plugin-system'

import { forelleQuest, tutorConfig } from './content/quests'

/**
 * Plugin Manifest
 */
export const manifest: PluginManifest = {
  id: 'biology-fishes',
  name: 'Biologie: Fische',
  version: '1.0.0',
  author: 'Karsten Kühne',
  description: 'Erkunde die faszinierende Welt der Fische mit Fokus auf die Forelle',
  icon: '🐟',
  type: 'biome',
  tags: ['biologie', 'tiere', 'fische', '5.klasse', 'gymnasium'],
  requires: ['core'],  // Benötigt Core-System
  defaultConfig: {
    showScientificNames: true,
    enable3DViewer: false,
    audioEnabled: true
  }
}

/**
 * Biome Content
 * Alles was das Plugin bereitstellt
 */
const biomeContent: BiomeContent = {
  id: 'biology-fishes',
  name: 'Fische',
  description: 'Entdecke die faszinierende Welt der Fische',
  icon: '🐟',
  
  theme: {
    colors: {
      primary: '#3D5A80',      // Wasser-Blau
      secondary: '#98C1D9',    // Hell-Blau
      accent: '#EE6C4D',       // Lachs-Rot
      background: '#E0FBFC',   // Sehr hell-Blau
      surface: '#FFFFFF',
      text: '#293241'
    },
    fonts: {
      heading: 'font-pixel',
      body: 'font-sans',
      pixel: 'font-pixel'
    },
    sounds: {
      success: '/sounds/bubble-pop.mp3',
      levelUp: '/sounds/splash.mp3'
    }
  },
  
  quests: [
    {
      id: 'forelle',
      name: 'Forelle',
      description: forelleQuest.description,
      emoji: forelleQuest.emoji,
      levels: forelleQuest.levels,
      // Keine Abhängigkeiten - erste Quest
    }
    // Weitere Fische können hier hinzugefügt werden
  ],
  
  aiContext: forelleQuest.aiContext,
  
  tutorPersona: {
    name: tutorConfig.name,
    avatar: tutorConfig.avatar,
    personality: tutorConfig.personality,
    welcomeMessages: tutorConfig.welcomeMessages,
    hints: tutorConfig.hints.general
  },
  
  assets: {
    images: {
      'forelle-overview': '/biomes/fishes/forelle-overview.jpg',
      'forelle-anatomy': '/biomes/fishes/forelle-anatomy.jpg',
      'forelle-organs': '/biomes/fishes/forelle-organs.jpg',
      'habitat-stream': '/biomes/fishes/habitat-stream.jpg'
    },
    audio: {
      'water-ambient': '/biomes/fishes/water-ambient.mp3'
    }
  }
}

/**
 * Plugin Implementation
 */
const biologyFishesPlugin: Plugin = {
  manifest,
  
  /**
   * Wird einmalig bei Installation ausgeführt
   */
  async onInstall() {
    console.log('[biology-fishes] Plugin installiert')
    
    // Hier könnte man:
    // - Datenbank-Tabellen erstellen
    // - Standard-Content laden
    // - Assets kopieren
  },
  
  /**
   * Wird bei jedem App-Start ausgeführt
   */
  async onActivate() {
    console.log('[biology-fishes] Plugin aktiviert')
    
    // Hier könnte man:
    // - Content in den Cache laden
    // - Audio vorladen
    // - Analytics initialisieren
  },
  
  /**
   * Wird vor Deaktivierung ausgeführt
   */
  async onDeactivate() {
    console.log('[biology-fishes] Plugin deaktiviert')
  },
  
  /**
   * Routes registrieren
   */
  registerRoutes(): RouteDefinition[] {
    return [
      {
        path: '/biome/fishes',
        component: 'BiomePage',
        layout: 'biome',
        auth: true  // Login erforderlich
      },
      {
        path: '/quest/forelle/:level',
        component: 'QuestPage',
        layout: 'quest',
        auth: true
      },
      {
        path: '/quest/forelle/:level/task/:taskId',
        component: 'TaskPage',
        layout: 'quest',
        auth: true
      },
      {
        path: '/learn/fish-anatomy',
        component: 'AnatomyViewer',
        layout: 'full',
        auth: true
      }
    ]
  },
  
  /**
   * Komponenten registrieren
   */
  registerComponents(): ComponentRegistry {
    return {
      // Biome-Komponenten
      biomeCard: require('./components/BiomeCard').default,
      questCard: require('./components/QuestCard').default,
      levelSelector: require('./components/LevelSelector').default,
      
      // Quest-Komponenten
      anatomyViewer: require('./components/AnatomyViewer').default,
      taskRenderer: require('./components/TaskRenderer').default,
      aiDialog: require('./components/AIDialog').default,
      
      // Spezialisierte Komponenten
      'biology-fishes:WaterBackground': require('./components/WaterBackground').default,
      'biology-fishes:FishCard': require('./components/FishCard').default
    }
  },
  
  /**
   * Hooks registrieren
   * Reagiert auf Events aus dem Core und anderen Plugins
   */
  registerHooks(): HookDefinitions {
    return {
      // Wenn ein User dieses Biom betritt
      'quest:start': async (event) => {
        if (event.questId === 'forelle') {
          console.log('[biology-fishes] Forelle-Quest gestartet')
          
          // Ambient-Wasser-Sound abspielen
          // await playAmbientSound('water-ambient')
        }
      },
      
      // Wenn XP verdient wird
      'xp:earn': async (event) => {
        // Spezial-XP für Fische-Quiz?
        if (event.source.includes('forelle')) {
          console.log('[biology-fishes] Bonus-XP für Forelle!')
        }
      },
      
      // Wenn ein Level abgeschlossen wird
      'quest:complete': async (event) => {
        if (event.questId === 'forelle') {
          // Nächste Quest freischalten?
          console.log('[biology-fishes] Forelle abgeschlossen!')
          
          // Achievement freischalten
          // await unlockAchievement('forelle-master')
        }
      },
      
      // KI-Tutor Messages
      'tutor:message': async (event) => {
        // Context zur Forelle hinzufügen
        if (event.questId === 'forelle') {
          // Spezifische Antworten basierend auf Fortschritt
        }
      }
    }
  },
  
  /**
   * Plugin API für andere Plugins
   */
  registerAPI(): Partial<PluginAPI> {
    return {
      // Andere Plugins können auf Fisch-Daten zugreifen
      getFishData: (fishId: string) => {
        if (fishId === 'forelle') return forelleQuest
        return null
      },
      
      // Andere Plugins können Quiz-Fragen abfragen
      getRandomQuestion: (level: string) => {
        const tasks = forelleQuest.levels[level as keyof typeof forelleQuest.levels].tasks
        return tasks[Math.floor(Math.random() * tasks.length)]
      }
    }
  },
  
  /**
   * Content bereitstellen
   */
  getContent() {
    return biomeContent
  }
}

export default biologyFishesPlugin
