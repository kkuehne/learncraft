# 🎭 LearnCraft RPG Status & Mentor System

> Tief integriertes Fortschritts- und Verantwortungssystem
> Modular erweiterbar für verschiedene Lernpfade
> Verzahnt mit Mentor-Mentee-Beziehungen
>
> **Version:** 1.0
> **Autor:** Karsten Kühne

---

## 🏰 Übersicht: Das Lern-Adelssystem

```
Lern-Reise (Anfänger → Meister → Lehrer → Führer)

LEVEL 1-10        LEVEL 11-20       LEVEL 21-30       LEVEL 31+
┌─────────┐      ┌─────────┐       ┌─────────┐       ┌─────────┐
│ SCHÜLER │  →   │ GELEHRTER│  →   │  MEISTER │  →   │  LEGENDE │
│         │      │         │       │         │       │         │
│ Lernen  │      │ Üben    │       │ Lehren  │       │ Führen  │
│ Selbst  │      │ Anderen │       │ Mentoren│       │ Gruppen │
└─────────┘      └─────────┘       └─────────┘       └─────────┘
    ↓                 ↓                  ↓                ↓
  EIGENES         HAUS              MENTOR           HAUPTLING
  WACHSTUM        VERDIENST         SYSTEM           /FÜRST/
                                                         KÖNIG
```

---

## 📊 Status-System (Modular)

### Basis-Struktur

```typescript
// Jeder Status ist ein Plugin!
interface StatusDefinition {
  id: string                    // "schueler", "gelehrter", "meister"
  name: string                  // Anzeigename
  levelRange: [number, number]  // z.B. [1, 10]
  icon: string                  // 🌱, 📚, 🎓, 👑
  color: string                 // Tailwind-Klasse
  
  // Verantwortungs-Stufen innerhalb des Status
  ranks: StatusRank[]
  
  // Freischaltungen
  unlocks: StatusUnlocks
  
  // Mentor-Beziehung
  mentorRelation: MentorConfig
  
  // Automatische Prüfungen
  requirements: StatusRequirement[]
}

interface StatusRank {
  id: string                    // "anfaenger", "fortgeschritten", "experte"
  name: string                  // "Anfänger", "Fortgeschritten", "Experte"
  minLevel: number
  maxLevel: number
  title: string                 // "Wissbegieriger", "Unermüdlicher", "Hervorragender"
  
  // Aufgaben für diesen Rang
  responsibilities?: Responsibility[]
  
  // Mentor-Status
  canBeMentor: boolean          // Ab wann kann ich Mentor sein?
  needsMentor: boolean          // Brauche ich noch einen Mentor?
  
  // Belohnungen
  rewards: RankReward[]
}
```

### Standard-Status-Hierarchie (erweiterbar)

```typescript
const defaultStatusHierarchy: StatusDefinition[] = [
  {
    id: 'schueler',
    name: 'Schüler',
    levelRange: [1, 10],
    icon: '🌱',
    color: 'text-green-500',
    ranks: [
      {
        id: 'anfaenger',
        name: 'Anfänger',
        minLevel: 1,
        maxLevel: 3,
        title: 'Wissbegieriger',
        canBeMentor: false,
        needsMentor: true,
        responsibilities: [],
        rewards: ['avatar_sprout', 'badge_newcomer']
      },
      {
        id: 'entdecker',
        name: 'Entdecker',
        minLevel: 4,
        maxLevel: 7,
        title: 'Neugieriger',
        canBeMentor: false,
        needsMentor: true,
        responsibilities: [],
        rewards: ['avatar_explorer', 'house_join']
      },
      {
        id: 'lernender',
        name: 'Lerner',
        minLevel: 8,
        maxLevel: 10,
        title: 'Unermüdlicher',
        canBeMentor: false,
        needsMentor: true,
        responsibilities: [],
        rewards: ['avatar_student', 'quest_helper']
      }
    ]
  },
  {
    id: 'gelehrter',
    name: 'Gelehrter',
    levelRange: [11, 20],
    icon: '📚',
    color: 'text-blue-500',
    ranks: [
      {
        id: 'wissender',
        name: 'Wissender',
        minLevel: 11,
        maxLevel: 13,
        title: 'Aufstrebender',
        canBeMentor: true,      // ✨ Ab hier Mentor!
        needsMentor: false,     // Kein Mentor mehr nötig
        responsibilities: [
          {
            type: 'mentor_anfaenger',
            description: 'Betreue 1-2 Anfänger',
            minLevel: 11
          }
        ],
        rewards: ['mentor_badge', 'mentor_chat']
      },
      {
        id: 'ueber',
        name: 'Über',
        minLevel: 14,
        maxLevel: 17,
        title: 'Hervorragender',
        canBeMentor: true,
        needsMentor: false,
        responsibilities: [
          {
            type: 'mentor_entdecker',
            description: 'Betreue 2-3 Entdecker',
            minLevel: 14
          },
          {
            type: 'house_contributor',
            description: 'Trage zum Haus-Punktestand bei',
            minLevel: 15
          }
        ],
        rewards: ['mentor_silver', 'house_councillor']
      },
      {
        id: 'meisterling',
        name: 'Meisterling',
        minLevel: 18,
        maxLevel: 20,
        title: 'Bemerkenswerter',
        canBeMentor: true,
        needsMentor: false,
        responsibilities: [
          {
            type: 'mentor_multiple',
            description: 'Betreue bis zu 5 Schüler',
            minLevel: 18
          },
          {
            type: 'content_creator',
            description: 'Erstelle Lerninhalte (freigeschaltet)',
            minLevel: 20
          }
        ],
        rewards: ['mentor_gold', 'content_creator_badge']
      }
    ]
  },
  {
    id: 'meister',
    name: 'Meister',
    levelRange: [21, 30],
    icon: '🎓',
    color: 'text-purple-500',
    ranks: [
      {
        id: 'lehrmeister',
        name: 'Lehrmeister',
        minLevel: 21,
        maxLevel: 23,
        title: 'Weiser',
        canBeMentor: true,
        needsMentor: false,
        responsibilities: [
          {
            type: 'mentor_lead',
            description: 'Leite Mentoren-Gruppe (3-5 Mentoren)',
            minLevel: 21
          },
          {
            type: 'quest_designer',
            description: 'Entwerfe Quests für dein Haus',
            minLevel: 22
          }
        ],
        rewards: ['meister_crown', 'quest_designer']
      },
      {
        id: 'ratgeber',
        name: 'Ratgeber',
        minLevel: 24,
        maxLevel: 27,
        title: 'Beratender',
        canBeMentor: true,
        needsMentor: false,
        responsibilities: [
          {
            type: 'house_advisor',
            description: 'Berate Haus-Anführer',
            minLevel: 24
          },
          {
            type: 'dispute_resolver',
            description: 'Schlichte Konflikte zwischen Mentoren',
            minLevel: 26
          }
        ],
        rewards: ['advisor_robe', 'house_privileges']
      },
      {
        id: 'erleuchteter',
        name: 'Erleuchteter',
        minLevel: 28,
        maxLevel: 30,
        title: 'Erleuchteter',
        canBeMentor: true,
        needsMentor: false,
        responsibilities: [
          {
            type: 'house_deputy',
            description: 'Stellvertretender Haus-Anführer',
            minLevel: 28
          }
        ],
        rewards: ['enlightened_aura', 'deputy_powers']
      }
    ]
  },
  {
    id: 'legende',
    name: 'Legende',
    levelRange: [31, 50],
    icon: '👑',
    color: 'text-yellow-500',
    ranks: [
      {
        id: 'hauptling',
        name: 'Häuptling',
        minLevel: 31,
        maxLevel: 35,
        title: 'Führender',
        canBeMentor: true,
        needsMentor: false,
        responsibilities: [
          {
            type: 'house_leader',
            description: 'Führe dein Lernhaus',
            minLevel: 31
          },
          {
            type: 'event_organizer',
            description: 'Organisiere Haus-Events',
            minLevel: 33
          }
        ],
        rewards: ['chieftain_staff', 'house_banner']
      },
      {
        id: 'fuerst',
        name: 'Fürst',
        minLevel: 36,
        maxLevel: 42,
        title: 'Vornehmer',
        canBeMentor: true,
        needsMentor: false,
        responsibilities: [
          {
            type: 'multi_house_coordination',
            description: 'Koordiniere mehrere Häuser',
            minLevel: 36
          },
          {
            type: 'newbie_welcome',
            description: 'Begrüße neue Mitglieder persönlich',
            minLevel: 38
          }
        ],
        rewards: ['prince_crown', 'multi_house_access']
      },
      {
        id: 'koenig',
        name: 'König',
        minLevel: 43,
        maxLevel: 50,
        title: 'Mächtiger',
        canBeMentor: true,
        needsMentor: false,
        responsibilities: [
          {
            type: 'platform_ambassador',
            description: 'Vertrete LearnCraft nach außen',
            minLevel: 43
          },
          {
            type: 'system_designer',
            description: 'Gestalte neue Features mit',
            minLevel: 45
          },
          {
            type: 'legend_guide',
            description: 'Weise den Weg für alle Schüler',
            minLevel: 50
          }
        ],
        rewards: ['king_throne', 'legend_immortal', 'system_access']
      }
    ]
  }
]
```

---

## 🎓 Mentor-System (Verzahnung)

### Beziehungs-Typen

```typescript
interface MentorRelation {
  id: string
  mentorId: string      // Der Lehrer
  menteeId: string      // Der Lernende
  
  // Status
  status: 'pending' | 'active' | 'paused' | 'completed'
  
  // Metadaten
  createdAt: Date
  activatedAt?: Date
  completedAt?: Date
  
  // Ziele
  learningGoals: LearningGoal[]
  
  // Interaktion
  sessions: MentorSession[]
  messages: Message[]
  
  // Belohnungen
  mentorXP: number      // XP für den Mentor
  menteeXP: number      // XP für den Mentee
  
  // Automatisches Matching
  matchScore?: number    // Wie gut passen sie zusammen?
  matchReason?: string   // Warum wurde dieses Paar vorgeschlagen?
}

interface LearningGoal {
  id: string
  questId: string       // Welche Quest?
  targetLevel: 'bronze' | 'silver' | 'gold'
  deadline: Date
  completed: boolean
  
  // Tracking
  progressUpdates: ProgressUpdate[]
}

interface MentorSession {
  id: string
  date: Date
  duration: number      // Minuten
  type: 'chat' | 'voice' | 'video' | 'screen_share'
  
  // Inhalt
  topics: string[]      // Was wurde besprochen?
  questionsAnswered: number
  
  // Feedback
  menteeRating?: number // 1-5 Sterne
  menteeFeedback?: string
  mentorReflection?: string
  
  // XP
  xpEarned: {
    mentor: number
    mentee: number
  }
}

// Automatisches Matching-System
interface MentorMatching {
  // Für Mentees: Finde passenden Mentor
  findMentor(menteeId: string, preferences: MatchPreferences): Promise<MentorCandidate[]>
  
  // Für Mentoren: Finde Mentees
  findMentees(mentorId: string, criteria: MenteeCriteria): Promise<MenteeCandidate[]>
}

interface MatchPreferences {
  subjects: string[]          // Welche Fächer?
  schedule: TimePreference   // Wann verfügbar?
  learningStyle: 'visual' | 'auditory' | 'practical' | 'theoretical'
  difficulty: 'patient' | 'challenging' | 'balanced'
  
  // Haus-Präferenz (optional)
  preferredHouse?: 'same' | 'different' | 'any'
}
```

### Mentor-Aufgaben nach Status

| Status | Kann helfen bei | Verantwortung |
|--------|----------------|---------------|
| **Wissender** (Lvl 11-13) | Anfänger (Lvl 1-3) | 1-2 Mentees |
| **Über** (Lvl 14-17) | Entdecker (Lvl 4-7) | 2-3 Mentees, Haus-Beiträge |
| **Meisterling** (Lvl 18-20) | Lerner (Lvl 8-10) | Bis 5 Mentees, Content erstellen |
| **Lehrmeister** (Lvl 21-23) | Alle unter Level 20 | Mentoren-Gruppe leiten |
| **Ratgeber** (Lvl 24-27) | Mentoren selbst | Konflikte schlichten |
| **Häuptling+** (Lvl 31+) | Ganze Häuser | Strategie, Events |

---

## 🔄 Modulare Status-Erweiterung

### Neuer Status als Plugin

```typescript
// Plugin: status-eremit.ts
export const eremitStatus: StatusDefinition = {
  id: 'eremit',
  name: 'Eremit',
  levelRange: [51, 75],  // Nach König!
  icon: '🧙',
  color: 'text-indigo-500',
  
  // Eigene Ränge
  ranks: [
    {
      id: 'weiser',
      name: 'Weiser',
      minLevel: 51,
      maxLevel: 60,
      title: 'Einsiedler',
      canBeMentor: true,
      needsMentor: false,
      responsibilities: [
        {
          type: 'philosophy_guide',
          description: 'Schreibe Weisheiten und Lernphilosophien'
        }
      ]
    }
  ],
  
  // Integration in Hierarchie
  requiresStatus: ['koenig'],  // Muss König gewesen sein
  unlocksStatus: ['legend'],     // Schaltet Legende frei?
  
  // Spezielle Mechaniken
  mechanics: {
    soloQuests: true,      // Eremiten machen Solo-Quests
    mentorshipOptional: true,  // Mentoring nicht Pflicht
    wisdomSharing: true    // Teile Weisheiten statt direkt zu lehren
  }
}

// Als Plugin registrieren
export const eremitPlugin: Plugin = {
  manifest: {
    id: 'status-eremit',
    type: 'gamification',
    // ...
  },
  
  registerStatusExtensions() {
    return [eremitStatus]
  },
  
  // Überschreibe Standard-Verhalten
  onStatusChange(event) {
    if (event.newStatus === 'eremit') {
      // Spezielle Animation
      // Anderes UI-Theme
      // Zugriff auf geheime Bereiche
    }
  }
}
```

### Status-Kombinationen (Multi-Classing)

```typescript
// Ein Spieler kann mehrere "Rollen" haben
interface PlayerRoles {
  primary: StatusDefinition    // Haupt-Status (Level-basiert)
  secondary: RoleDefinition[]  // Zusätzliche Rollen
}

// Beispiel: Ein "König" kann auch "Fisch-Experte" sein
const playerRoles: PlayerRoles = {
  primary: koenigStatus,           // Level 43
  secondary: [
    { id: 'fisch-experte', level: 25 },      // Spezialisierung
    { id: 'mentor-champion', level: 15 },    // Mentoring-Expertise
    { id: 'quest-designer', level: 10 }     // Content-Erstellung
  ]
}

// Rollen bringen eigene Fähigkeiten
interface RoleDefinition {
  id: string
  name: string
  
  // Wie erlangt?
  earnedBy: {
    questsCompleted: number    // z.B. 50 Fisch-Quests
    mentorSessions: number     // z.B. 20 Mentoring-Sessions
    specialAchievements: string[]
  }
  
  // Vorteile
  benefits: {
    xpBonus: number            // +10% XP in diesem Bereich
    specialAbilities: string[] // "Sehen Fisch-Verhalten", "Vorhersagen Prüfungen"
    unlocks: string[]          // Spezielle Quests, Items
  }
}
```

---

## 🎮 Integration in Gameplay

### Sichtbare Status-Elemente

```typescript
// UI-Komponenten
interface StatusUIComponents {
  // Profil-Header
  profileBadge: {
    statusIcon: string      // 🌱, 📚, 🎓, 👑
    rankTitle: string       // "Wissbegieriger Schüler"
    level: number
    progressBar: number     // % bis nächster Rang
  }
  
  // Überall sichtbar
  floatingIndicator: {
    miniIcon: string        // Kleines Icon neben Namen
    houseBadge: string      // 🔥💧🌿💨
    mentorIndicator?: string // ⭐ wenn man Mentor ist
  }
  
  // In Quests
  questDifficulty: {
    recommendedLevel: number
    statusBonus: string     // "Als Meister: +20% XP"
  }
  
  // Im Haus
  houseHierarchy: {
    position: number        // Rang innerhalb des Hauses
    contribution: number    // Punktebeitrag
    responsibilities: string[] // Was muss ich tun?
  }
}

// Animationen bei Status-Änderung
const statusTransitions = {
  levelUp: {
    animation: 'level-up-burst',
    sound: 'level-up-fanfare',
    particles: 'xp-sparkles',
    announcement: 'global'   // Im Haus-Chat bekannt geben
  },
  
  rankUp: {
    animation: 'rank-ceremony',
    sound: 'rank-fanfare',
    cutscene: 'rank-promotion',
    rewards: 'showcase'     // Neue Fähigkeiten zeigen
  },
  
  statusUpgrade: {
    animation: 'status-evolution',
    sound: 'epic-orchestra',
    quest: 'unlock-ceremony',  // Spezielle Quest
    titleChange: 'broadcast'    // Alle wissen es
  }
}
```

### Nach außen sichtbar (Public Profile)

```typescript
interface PublicProfile {
  // Basis
  username: string
  avatar: AvatarConfig
  house: 'ignis' | 'aqua' | 'terra' | 'aer'
  
  // Status (immer sichtbar)
  status: {
    current: string           // "meister"
    rank: string              // "lehrmeister"
    title: string             // "Weiser"
    level: number             // 22
    totalXP: number
  }
  
  // Öffentliche Erfolge
  achievements: PublicAchievement[]
  
  // Mentor-Status
  mentoring: {
    isMentor: boolean
    menteesCount: number
    totalSessions: number
    averageRating: number     // 1-5 Sterne
    specialties: string[]     // ["Fische", "Biologie", "Anfänger"]
  }
  
  // Haus-Beitrag
  houseContribution: {
    totalPoints: number
    tournamentWins: number
    currentRank: number       // #3 im Haus
  }
  
  // Aktivität
  recentActivity: {
    lastQuest: string
    lastLogin: Date
    streak: number
    studyHours: number
  }
  
  // Teilen-Buttons
  shareable: {
    achievementCard: string   // PNG zum Teilen
    progressVideo: string     // Zeitraffer der Lernreise
    rankCertificate: string   // PDF-Zertifikat
  }
}

// Teilen auf Social Media
const shareOptions = {
  platforms: ['twitter', 'facebook', 'linkedin', 'whatsapp', 'copy-link'],
  templates: {
    levelUp: "Ich bin jetzt Level {level} in LearnCraft! 🎮📚",
    rankUp: "Ich wurde zum {rank} ernannt! {title} {icon}",
    mentor: "Ich betreue jetzt {count} Schüler als Mentor! 🎓",
    house: "Mein Haus {house} ist auf Platz {rank}! 🏆"
  }
}
```

---

## 🔌 Modulare Erweiterung

### Status als Plugin-System

```typescript
// Core-System für Status
class StatusSystem {
  private statuses: Map<string, StatusDefinition> = new Map()
  private activePlugins: Map<string, StatusPlugin> = new Map()
  
  // Neuen Status registrieren
  registerStatus(status: StatusDefinition, pluginId: string): void {
    this.statuses.set(status.id, status)
    
    // Plugin-Integration
    if (!this.activePlugins.has(pluginId)) {
      this.activePlugins.set(pluginId, {
        statuses: [],
        hooks: {}
      })
    }
    this.activePlugins.get(pluginId)?.statuses.push(status.id)
  }
  
  // Status-Hierarchie berechnen
  getStatusChain(startStatus: string): StatusDefinition[] {
    const chain: StatusDefinition[] = []
    let current = this.statuses.get(startStatus)
    
    while (current) {
      chain.push(current)
      current = current.unlocksStatus 
        ? this.statuses.get(current.unlocksStatus)
        : undefined
    }
    
    return chain
  }
  
  // Prüfe ob Status-Wechsel möglich
  canProgress(user: User, targetStatus: string): {
    possible: boolean
    requirements: Requirement[]
    missing: Requirement[]
  } {
    const status = this.statuses.get(targetStatus)
    if (!status) return { possible: false, requirements: [], missing: [] }
    
    // Prüfe alle Requirements
    const results = status.requirements.map(req => ({
      requirement: req,
      met: this.checkRequirement(user, req)
    }))
    
    return {
      possible: results.every(r => r.met),
      requirements: results.map(r => r.requirement),
      missing: results.filter(r => !r.met).map(r => r.requirement)
    }
  }
}

// Beispiel: Community erstellt "Drachen-Status"
const dragonStatusPlugin: StatusPlugin = {
  manifest: {
    id: 'status-dragons',
    name: 'Drachen-Status-Erweiterung',
    type: 'gamification'
  },
  
  registerStatusExtensions() {
    return [{
      id: 'drachenreiter',
      name: 'Drachenreiter',
      levelRange: [51, 100],  // Nach König!
      requiresStatus: ['koenig'],
      
      // Spezielle Mechanik
      mechanics: {
        dragonTaming: true,
        flightAbility: true,
        fireBreathing: false  // Erst bei Level 75
      }
    }]
  },
  
  // Überschreibe Verhalten
  hooks: {
    'status:change': (event) => {
      if (event.newStatus === 'drachenreiter') {
        // Spezielle Drachen-Animation
        // Neues Mount-System freischalten
        // Quests in der Luft
      }
    }
  }
}
```

---

## 📊 Datenmodell

```typescript
// Datenbank-Schema (Supabase)
interface DatabaseSchema {
  // User-Status
  user_status: {
    user_id: string
    current_status: string
    current_rank: string
    level: number
    xp: number
    title: string
    
    // Mentor-Status
    is_mentor: boolean
    mentor_since: Date
    mentees_count: number
    total_mentor_sessions: number
    mentor_rating: number
    
    // Verlauf
    status_history: StatusHistoryEntry[]
    
    // Ziele
    next_requirements: Requirement[]
  }
  
  // Mentor-Beziehungen
  mentor_relations: {
    id: string
    mentor_id: string
    mentee_id: string
    status: string
    
    goals: LearningGoal[]
    sessions: Session[]
    messages: Message[]
    
    created_at: Date
    completed_at?: Date
  }
  
  // Status-Definitionen (dynamisch ladbar)
  status_definitions: {
    id: string
    plugin_id: string
    definition: StatusDefinition
    is_active: boolean
    created_at: Date
    updated_at: Date
  }
}
```

---

## 🎯 Zusammenfassung

| Feature | Implementierung |
|---------|-----------------|
| **4 Haupt-Status** | Schüler → Gelehrter → Meister → Legende |
| **3 Ränge pro Status** | Anfänger → Fortgeschritten → Experte |
| **Titel-System** | Dynamisch basierend auf Verhalten |
| **Mentor-Verzahnung** | Ab Gelehrter (Lvl 11) kann man helfen |
| **Verantwortung** | Je höher, desto mehr Führung |
| **Modular** | Neue Status als Plugins möglich |
| **Öffentlich sichtbar** | Profile, Badges, Zertifikate |
| **Sozial** | Teilen, Vergleichen, Wettbewerb |

---

*"Vom Schüler zum König - jeder Schritt zählt"* 👑
