# 🎓 LearnCraft

> Eine modulare, gamifizierte Lernplattform im Minecraft-Stil
> Mit Lernhäuser-System, KI-Tutor und Plugin-Architektur
>
> **Repository:** https://github.com/kkuehne/learncraft
> **Erstellt:** 2026-04-14

---

## 🎯 Vision

LearnCraft transformiert Lernen in ein Abenteuer: Schüler erkunden "Biome" (Fachbereiche), meistern Quests, sammeln XP und treten in Lernhäusern gegeneinander an – alles im charmanten Stil von Minecraft und der Belohnungspsychologie von Duolingo.

**Aktueller Fokus:** Biologie (Fische) für 5. Klasse Gymnasium  
**Zukünftig:** Mathe, Deutsch, Englisch – beliebig erweiterbar durch Plugins

---

## 🏛️ Lernhäuser (Community-Wettkampf)

### Die 4 Häuser
- **🔥 Haus Ignis** - Feuer, Leidenschaft, schnelles Denken
- **💧 Haus Aqua** - Wasser, Anpassungsfähigkeit, Tiefe
- **🌿 Haus Terra** - Erde, Geduld, Fundamentales
- **💨 Haus Aer** - Luft, Kreativität, Weitblick

*(Namen sind neutral, passen zu allen Fächern)*

### Features
- Wochen-Turniere (Welches Haus sammelt meiste XP?)
- Haus-interne Chaträume
- Gemeinsame Ziele: "Alle zusammen 10.000 XP = Belohnung für alle"
- Ranglisten pro Haus und global

---

## 🧩 Plugin-System

LearnCraft ist modular aufgebaut. Jedes Fach ist ein Plugin.

```
plugins/
├── biology-fishes/          # Biologie: Fische
├── math-arithmetic/         # Mathe: Grundrechenarten
├── german-grammar/          # Deutsch: Grammatik
└── english-vocabulary/      # Englisch: Vokabeln
```

**Core bleibt stabil**, Plugins werden geladen. Community kann eigene entwickeln.

---

## 🚀 Quick Start

```bash
# 1. Repo klonen
git clone https://github.com/kkuehne/learncraft.git
cd learncraft

# 2. Dependencies installieren
npm install

# 3. Environment einrichten
cp .env.example .env.local
# → Supabase credentials eintragen

# 4. Dev-Server starten
npm run dev
```

**Öffne:** http://localhost:3000

---

## 📁 Projektstruktur

```
learncraft/
├── 📁 apps/
│   └── web/                 # Next.js 14 App
│       ├── app/             # Routes & Pages
│       ├── components/      # React Components
│       └── lib/             # Utils, Hooks
│
├── 📁 packages/
│   ├── core/                # Gamification, Auth, XP-System
│   ├── ui/                  # Design-System (shadcn)
│   └── tutor/               # KI-Tutor (textbasiert, Audio-ready)
│
├── 📁 plugins/
│   └── biology-fishes/      # Aktives Plugin
│       ├── content/         # Texte, Bilder, Quiz-Daten
│       ├── components/      # Fachspezifische UI
│       └── index.ts         # Plugin-Entry
│
├── 📁 docs/
│   ├── architecture/        # System-Design
│   ├── plugin-dev/          # Plugin-Entwicklung Guide
│   └── api/                 # API-Dokumentation
│
├── 📄 .env.example          # Umgebungsvariablen
├── 📄 package.json          # Turborepo Root
└── 📄 turbo.json            # Build-Pipeline
```

---

## 🛠️ Tech Stack

| Bereich | Technologie |
|---------|-------------|
| **Framework** | Next.js 14 (App Router) |
| **Sprache** | TypeScript |
| **Styling** | Tailwind CSS + shadcn/ui |
| **State** | Zustand |
| **Auth** | Supabase Auth |
| **Database** | Supabase (PostgreSQL) |
| **Storage** | Supabase Storage |
| **KI** | OpenAI GPT-4 (optional, für Tutor) |
| **Audio** | Web Speech API (kostenlos) / Azure TTS (optional) |
| **Deployment** | Vercel |

---

## 🎮 Features

### Aktuell (MVP)
- [x] Plugin-basierte Architektur
- [x] Lernhäuser-System
- [x] XP & Gamification
- [x] Quest-System mit Level-Freischaltung
- [x] KI-Tutor (textbasiert)
- [x] Interaktive Bild-Beschriftung
- [x] Quiz-Modus

### Geplant
- [ ] Audio-Ausgabe für KI-Tutor
- [ ] Mobile App (React Native)
- [ ] Community Plugin-Store
- [ ] Eltern-Dashboard
- [ ] Offline-Modus

---

## 📝 Plugin entwickeln

Siehe [docs/plugin-dev/README.md](./docs/plugin-dev/README.md)

**Kurzform:**
1. Ordner in `plugins/` erstellen
2. `manifest.json` definieren
3. Content als JSON bereitstellen
4. In `apps/web/plugins.ts` registrieren

---

## 💰 Kosten

| Posten | Kosten/Monat |
|--------|--------------|
| Domain | 0,80€ |
| Vercel | 0€ (Free Tier) |
| Supabase | 0€ (Free Tier) |
| OpenAI | 0-10€ (optional) |
| **Gesamt** | **~1-11€** |

---

## 🤝 Mitwirken

Pull Requests willkommen! Siehe [CONTRIBUTING.md](./CONTRIBUTING.md)

---

**Lizenz:** MIT  
**Autor:** Karsten Kühne & Sohn 🚀
