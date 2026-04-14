/**
 * LearnCraft Plugin System - Core Types
 * 
 * Jedes Plugin definiert seine Komponenten, Routes und Hooks.
 * Der Core lädt Plugins dynamisch und stellt APIs bereit.
 */

// === PLUGIN BASIS ===

export interface PluginManifest {
  id: string                    // Eindeutige ID: "biology-forelle", "math-fractions"
  name: string                  // Anzeigename: "Forelle - Biologie"
  version: string               // SemVer: "1.0.0"
  author: string                // "Karsten Kühne" oder "Community"
  description: string           // Kurzbeschreibung für Store/Übersicht
  icon?: string                 // Emoji oder URL: "🐟"
  
  // Dependencies
  requires?: string[]          // Andere Plugins die geladen sein müssen
  conflicts?: string[]         // Inkompatible Plugins
  
  // Kategorien
  type: PluginType
  tags?: string[]              // ["biologie", "tiere", "5.klasse"]
  
  // Konfiguration
  configSchema?: ConfigSchema  // Welche Einstellungen hat das Plugin?
  defaultConfig?: Record<string, unknown>
}

export type PluginType = 
  | 'biome'      // Ein komplettes Biom (Fach) mit Quests
  | 'feature'    // Neue Funktionalität (z.B. 3D-Viewer, Audio-Quiz)
  | 'ui'         // UI-Komponenten/Erweiterungen
  | 'gamification' // Neue Spielmechaniken
  | 'integration' // Schnittstellen zu externen Systemen
  | 'theme'      // Visuelle Themes/Skins

export interface ConfigSchema {
  [key: string]: {
    type: 'string' | 'number' | 'boolean' | 'select' | 'array'
    label: string
    description?: string
    default?: unknown
    options?: string[]  // Für 'select'
    required?: boolean
    secret?: boolean    // Für API-Keys (nicht im UI anzeigen)
  }
}

// === PLUGIN LIFECYCLE ===

export interface Plugin {
  manifest: PluginManifest
  
  // Lifecycle Hooks
  onInstall?: () => Promise<void>      // Einmalig bei Installation
  onActivate?: () => Promise<void>   // Bei jedem App-Start
  onDeactivate?: () => Promise<void> // Vor Deaktivierung
  onUninstall?: () => Promise<void>  // Bei Deinstallation
  
  // Feature Registrierung
  registerRoutes?: () => RouteDefinition[]
  registerComponents?: () => ComponentRegistry
  registerHooks?: () => HookDefinitions
  registerAPI?: () => PluginAPI
  
  // Content (für Biome)
  getContent?: () => BiomeContent | FeatureContent
}

// === ROUTING ===

export interface RouteDefinition {
  path: string                    // "/biome/forelle", "/quest/:id"
  component: string               // Name der Komponente
  layout?: string                 // Welches Layout verwenden?
  auth?: boolean                  // Login erforderlich?
  children?: RouteDefinition[]    // Verschachtelte Routes
}

// === KOMPONENTEN ===

export interface ComponentRegistry {
  // Biome-Komponenten
  biomeCard?: React.ComponentType<BiomeCardProps>
  questCard?: React.ComponentType<QuestCardProps>
  levelSelector?: React.ComponentType<LevelSelectorProps>
  
  // Quest-Komponenten
  taskRenderer?: React.ComponentType<TaskRendererProps>
  anatomyViewer?: React.ComponentType<AnatomyViewerProps>
  quizComponent?: React.ComponentType<QuizComponentProps>
  aiDialog?: React.ComponentType<AIDialogProps>
  
  // Gamification
  xpBar?: React.ComponentType<XpBarProps>
  houseBadge?: React.ComponentType<HouseBadgeProps>
  achievementCard?: React.ComponentType<AchievementCardProps>
  
  // Feature-Komponenten (durch Plugins erweitert)
  [key: string]: React.ComponentType<unknown> | undefined
}

// === HOOKS & EVENTS ===

export interface HookDefinitions {
  // App Lifecycle
  'app:init'?: (ctx: AppContext) => void | Promise<void>
  'app:ready'?: (ctx: AppContext) => void | Promise<void>
  
  // User Lifecycle
  'user:register'?: (user: User) => void | Promise<void>
  'user:login'?: (user: User) => void | Promise<void>
  'user:logout'?: () => void | Promise<void>
  
  // Gamification
  'xp:earn'?: (event: XPEvent) => void | Promise<void>
  'level:up'?: (event: LevelUpEvent) => void | Promise<void>
  'streak:update'?: (event: StreakEvent) => void | Promise<void>
  'house:score'?: (event: HouseScoreEvent) => void | Promise<void>
  
  // Quest Lifecycle
  'quest:start'?: (event: QuestEvent) => void | Promise<void>
  'quest:complete'?: (event: QuestCompleteEvent) => void | Promise<void>
  'task:attempt'?: (event: TaskAttemptEvent) => void | Promise<void>
  'task:success'?: (event: TaskSuccessEvent) => void | Promise<void>
  'task:fail'?: (event: TaskFailEvent) => void | Promise<void>
  
  // KI-Tutor
  'tutor:message'?: (event: TutorMessageEvent) => void | Promise<void>
  'tutor:hint'?: (event: TutorHintEvent) => void | Promise<void>
  
  // Custom Hooks (Plugins können eigene definieren)
  [key: string]: ((event: unknown) => void | Promise<void>) | undefined
}

// === PLUGIN API ===

export interface PluginAPI {
  // Core APIs die Plugins nutzen können
  storage: StorageAPI
  gamification: GamificationAPI
  user: UserAPI
  tutor: TutorAPI
  events: EventAPI
  ui: UIAPI
  
  // Plugin-to-Plugin Kommunikation
  getPlugin?: (id: string) => Plugin | undefined
  callPluginMethod?: (pluginId: string, method: string, ...args: unknown[]) => Promise<unknown>
}

// === CONTENT TYPES ===

export interface BiomeContent {
  id: string
  name: string
  description: string
  icon: string
  theme: ThemeConfig
  
  // Quests
  quests: QuestDefinition[]
  
  // KI-Kontext
  aiContext: string
  tutorPersona: TutorPersona
  
  // Medien
  assets: {
    images: Record<string, string>
    audio?: Record<string, string>
    video?: Record<string, string>
  }
}

export interface QuestDefinition {
  id: string
  name: string
  description: string
  emoji: string
  
  // Levels
  levels: {
    bronze: LevelDefinition
    silver: LevelDefinition
    gold: LevelDefinition
  }
  
  // Abhängigkeiten
  requires?: string[]  // Quest-IDs die vorher abgeschlossen sein müssen
  unlocks?: string[]   // Quests die freigeschaltet werden
}

export interface LevelDefinition {
  id: string
  title: string
  description: string
  learningGoals: string[]
  aiPromptContext: string
  tasks: TaskDefinition[]
  xpReward: number
  
  // Spezielle Features
  features?: string[]  // z.B. ["3d-viewer", "audio-quiz"]
}

export interface TaskDefinition {
  id: string
  type: TaskType
  question: string
  options?: string[]
  correctAnswer?: string | number | string[]
  hint?: string
  aiGuidance?: string
  
  // Task-spezifisch
  config?: Record<string, unknown>
}

export type TaskType = 
  | 'label'           // Bildbeschriftung
  | 'quiz'            // Multiple Choice
  | 'explain'         // Freitext-Erklärung
  | 'observe'         // Beobachtungsaufgabe
  | 'ai_dialog'       // Dialog mit KI-Tutor
  | 'match'           // Zuordnung
  | 'order'           // Reihenfolge
  | 'custom'          // Plugin-definiert

export interface FeatureContent {
  // Für Feature-Plugins (keine Biome)
  features: FeatureDefinition[]
}

export interface FeatureDefinition {
  id: string
  name: string
  description: string
  type: 'viewer' | 'quiz' | 'tool' | 'game'
  component: string
  config?: Record<string, unknown>
}

// === THEME & STYLING ===

export interface ThemeConfig {
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
  }
  fonts?: {
    heading?: string
    body?: string
    pixel?: string
  }
  sounds?: {
    success?: string
    fail?: string
    levelUp?: string
    xpGain?: string
  }
}

export interface TutorPersona {
  name: string
  avatar: string
  personality: string
  welcomeMessages: Record<string, string>
  hints: string[]
}

// === EVENT TYPES ===

export interface XPEvent {
  userId: string
  amount: number
  source: string
  questId?: string
  taskId?: string
}

export interface LevelUpEvent {
  userId: string
  newLevel: number
  totalXP: number
}

export interface QuestEvent {
  userId: string
  questId: string
  biomeId: string
}

export interface QuestCompleteEvent extends QuestEvent {
  level: 'bronze' | 'silver' | 'gold'
  xpEarned: number
  accuracy: number
}

export interface TaskAttemptEvent {
  userId: string
  taskId: string
  questId: string
  attempt: number
  answer: unknown
}

export interface TaskSuccessEvent extends TaskAttemptEvent {
  xpEarned: number
}

export interface TaskFailEvent extends TaskAttemptEvent {
  expectedAnswer: unknown
}

export interface TutorMessageEvent {
  userId: string
  questId: string
  message: string
  response: string
}

// === API INTERFACES ===

export interface StorageAPI {
  get: (key: string) => Promise<unknown>
  set: (key: string, value: unknown) => Promise<void>
  remove: (key: string) => Promise<void>
  getUserData: (userId: string, key: string) => Promise<unknown>
  setUserData: (userId: string, key: string, value: unknown) => Promise<void>
}

export interface GamificationAPI {
  addXP: (userId: string, amount: number, source: string) => Promise<void>
  getLevel: (userId: string) => Promise<number>
  getProgress: (userId: string, questId: string) => Promise<QuestProgress>
  updateProgress: (userId: string, questId: string, level: string, completed: boolean) => Promise<void>
  getHouseScore: (house: string) => Promise<number>
  addHouseScore: (house: string, points: number) => Promise<void>
}

export interface UserAPI {
  getCurrentUser: () => Promise<User | null>
  updateProfile: (data: Partial<User>) => Promise<void>
  getStats: () => Promise<UserStats>
}

export interface TutorAPI {
  sendMessage: (message: string, context: TutorContext) => Promise<TutorResponse>
  speak: (text: string) => Promise<void>
  getHint: (taskId: string, attemptCount: number) => Promise<string>
}

export interface EventAPI {
  emit: (event: string, data: unknown) => Promise<void>
  on: (event: string, handler: (data: unknown) => void) => () => void
  once: (event: string, handler: (data: unknown) => void) => void
}

export interface UIAPI {
  showToast: (message: string, type: 'success' | 'error' | 'info') => void
  showModal: (component: string, props: Record<string, unknown>) => void
  registerComponent: (name: string, component: React.ComponentType) => void
}

// === KONTEXT TYPES ===

export interface AppContext {
  plugins: Plugin[]
  config: AppConfig
  user?: User
}

export interface TutorContext {
  currentQuest: string
  currentLevel: string
  currentTask: string
  attemptCount: number
  previousMessages: { role: 'user' | 'assistant'; content: string }[]
}

export interface TutorResponse {
  text: string
  audio?: boolean
  actions?: TutorAction[]
}

export interface TutorAction {
  type: 'hint' | 'explain' | 'celebrate' | 'redirect'
  payload: unknown
}

// === USER TYPES ===

export interface User {
  id: string
  email: string
  username: string
  house: 'ignis' | 'aqua' | 'terra' | 'aer'
  avatar: AvatarConfig
  xp: number
  level: number
  streak: number
  createdAt: Date
  preferences: UserPreferences
}

export interface AvatarConfig {
  base: string
  skin?: string
  accessories: string[]
  effects?: string[]
}

export interface UserPreferences {
  soundEnabled: boolean
  aiVoiceEnabled: boolean
  notificationsEnabled: boolean
  difficulty: 'easy' | 'normal' | 'hard'
}

export interface UserStats {
  totalXP: number
  questsCompleted: number
  tasksCompleted: number
  accuracy: number
  favoriteBiome?: string
  studyTime: number // in Minuten
}

export interface QuestProgress {
  questId: string
  bronze: boolean
  silver: boolean
  gold: boolean
  currentLevel?: string
  lastAttempt?: Date
}

export interface StreakEvent {
  userId: string
  currentStreak: number
  lastLogin: Date
}

export interface HouseScoreEvent {
  house: string
  newScore: number
  delta: number
  userId: string
}

// === COMPONENT PROPS ===

export interface BiomeCardProps {
  biome: BiomeContent
  progress: number
  isLocked: boolean
}

export interface QuestCardProps {
  quest: QuestDefinition
  progress: { bronze: boolean; silver: boolean; gold: boolean }
  isLocked: boolean
}

export interface LevelSelectorProps {
  levels: LevelDefinition[]
  currentLevel: string
  onSelect: (level: string) => void
}

export interface TaskRendererProps {
  task: TaskDefinition
  onAnswer: (answer: unknown) => void
  attemptCount: number
}

export interface AnatomyViewerProps {
  imageUrl: string
  hotspots: HotspotDefinition[]
  onLabel: (id: string, label: string) => void
}

export interface HotspotDefinition {
  id: string
  x: number
  y: number
  correctLabel: string
  hint?: string
}

export interface QuizComponentProps {
  question: string
  options: string[]
  correctAnswer: number
  onAnswer: (selected: number) => void
}

export interface AIDialogProps {
  messages: { role: 'user' | 'assistant'; content: string }[]
  onSend: (message: string) => void
  isTyping?: boolean
}

export interface XpBarProps {
  currentXP: number
  nextLevelXP: number
  level: number
}

export interface HouseBadgeProps {
  house: 'ignis' | 'aqua' | 'terra' | 'aer'
  score: number
}

export interface AchievementCardProps {
  achievement: Achievement
  unlocked: boolean
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  requirement: string
  xpReward: number
}

export interface AppConfig {
  version: string
  features: Record<string, boolean>
  plugins: Record<string, PluginConfig>
}

export interface PluginConfig {
  enabled: boolean
  version: string
  config: Record<string, unknown>
}
