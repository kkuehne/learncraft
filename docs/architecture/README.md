# LearnCraft Architektur

## System-Übersicht

```
┌─────────────────────────────────────────────┐
│              BROWSER/CLIENT                 │
│  ┌─────────────────────────────────────┐   │
│  │  React + Next.js App Router         │   │
│  │  ├─ Core Module (XP, Auth)          │   │
│  │  ├─ Plugin Loader                   │   │
│  │  └─ UI Components (shadcn)          │   │
│  └─────────────────────────────────────┘   │
│                    ↓                        │
│  ┌─────────────────────────────────────┐   │
│  │  Active Plugin: biology-fishes      │   │
│  │  ├─ Quest Components                │   │
│  │  ├─ Quiz Logic                      │   │
│  │  └─ Content Data (JSON)             │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│           SUPABASE BACKEND                  │
│  ├─ Auth (Users, Profiles)                  │
│  ├─ XP & Progress (Gamification)            │
│  ├─ Plugin Registry                         │
│  └─ Storage (Images, optional)              │
└─────────────────────────────────────────────┘
```

## Datenmodelle

### User
```typescript
{
  id: string
  email: string
  username: string
  house: 'ignis' | 'aqua' | 'terra' | 'aer'
  avatar: AvatarConfig
  xp: number
  level: number
  streak: number
  created_at: timestamp
}
```

### Quest Progress
```typescript
{
  user_id: string
  plugin_id: string
  quest_id: string
  level: 'bronze' | 'silver' | 'gold'
  completed: boolean
  xp_earned: number
  completed_at: timestamp
}
```

### House Tournament
```typescript
{
  week_start: date
  house_scores: {
    ignis: number
    aqua: number
    terra: number
    aer: number
  }
  last_updated: timestamp
}
```

## Plugin System

### Core Events
Plugins können auf Events reagieren:

- `QUEST_START` - Quest wurde gestartet
- `QUEST_COMPLETE` - Quest abgeschlossen
- `XP_EARNED` - XP wurde verdient
- `HOUSE_TOURNAMENT_UPDATE` - Haus-Scores aktualisiert

### Plugin Interface
```typescript
interface LearnCraftPlugin {
  manifest: PluginManifest
  routes: RouteConfig[]
  components: ComponentRegistry
  content: QuestCollection
  onEvent?: (event: CoreEvent) => void
}
```

## Gamification Engine

### XP-Berechnung
- Quiz richtig: +10 XP
- Quest Bronze: +50 XP
- Quest Silber: +75 XP
- Quest Gold: +100 XP
- Streak Bonus: +5 XP pro Tag
- Haus-Turnier Beitrag: zusätzlich +20 XP

### Level-Formel
Level = floor(sqrt(XP / 100))

### Belohnungen
- Level 5: Erster Avatar-Unlock
- Level 10: Haus-Banner
- Level 20: Legendärer Skin

## KI-Tutor Architektur

### Aktuell (Text)
```
User Input → Context (Quest, Progress, History)
                  ↓
         OpenAI GPT-4 / GPT-3.5
                  ↓
         Text Response + XP/Action
```

### Zukünftig (Audio)
```
User Input → KI-Response (Text)
                  ↓
         Text-to-Speech (Web Speech API)
                  ↓
         Audio Playback
```

## Authentication Flow

1. Magic Link (Email) - kein Passwort nötig
2. Haus-Auswahl (nach erstem Login)
3. Tutorial-Quest
4. Freies Erkunden

## Deployment

- Vercel (Frontend + API Routes)
- Supabase (Database + Auth + Storage)
- Keine Server nötig
