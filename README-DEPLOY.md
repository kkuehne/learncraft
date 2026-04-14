# LearnCraft Deployment Guide

## GitHub Repository

Das Projekt soll in dein bestehendes Repository:
**https://github.com/kkuehne**

### Schritte zum Hochladen

```bash
# 1. In das Projekt-Verzeichnis wechseln
cd projects/learning-platform

# 2. Git initialisieren (falls noch nicht geschehen)
git init

# 3. Remote hinzufügen
git remote add origin https://github.com/kkuehne/learncraft.git

# 4. Alle Dateien hinzufügen
git add .

# 5. Commit
git commit -m "Initial commit: LearnCraft v0.1 - Fische Biom"

# 6. Auf GitHub pushen
git branch -M main
git push -u origin main
```

### Repository-Struktur auf GitHub

```
kkuehne/learncraft/
├── apps/
│   └── web/              # Next.js App
├── packages/
│   ├── core/             # XP-System, Auth
│   ├── ui/               # UI-Komponenten
│   └── tutor/            # KI-Tutor
├── plugins/
│   └── biology-fishes/   # Fische-Plugin
├── docs/                 # Dokumentation
├── README.md
├── LICENSE (MIT)
└── package.json
```

## Lokale Entwicklung

```bash
# 1. Repo klonen
git clone https://github.com/kkuehne/learncraft.git
cd learncraft

# 2. Dependencies installieren
npm install

# 3. Environment einrichten
cp apps/web/.env.example apps/web/.env.local
# → Supabase credentials eintragen

# 4. Dev-Server starten
npm run dev
```

## Deployment auf Vercel

### Option A: Vercel CLI

```bash
# 1. Vercel CLI installieren
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod
```

### Option B: GitHub Integration

1. Auf [vercel.com](https://vercel.com) anmelden
2. "Add New Project"
3. GitHub-Repo `kkuehne/learncraft` auswählen
4. Framework Preset: Next.js
5. Environment Variables eintragen
6. Deploy!

### Supabase Setup

1. [supabase.com](https://supabase.com) → Neues Projekt
2. Database Schema importieren (siehe `packages/core/database/schema.sql`)
3. Auth → Email provider aktivieren
4. API Keys kopieren → in Vercel Env vars eintragen

## Kosten

| Service | Kosten/Monat |
|---------|--------------|
| Vercel (Free) | 0€ |
| Supabase (Free) | 0€ |
| Domain | ~1€ |
| OpenAI (optional) | 0-10€ |
| **Gesamt** | **~1-11€** |

## Nächste Schritte

1. ✅ Repo erstellen
2. ⬜ Supabase Projekt einrichten
3. ⬜ Vercel Deployment
4. ⬜ Erste Nutzer-Registrierung testen
5. ⬜ Sohn testen lassen 🐟
