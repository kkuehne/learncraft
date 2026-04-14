# LearnCraft MVP

> Radikal vereinfachte Lernplattform für die Forelle-Quest
> Ziel: Funktioniert bis 11. Mai für die Klassenarbeit

## 🎯 Scope (Minimal)

**Nur DAS:**
- ✅ EINE Quest: Forelle (3 Level: Bronze, Silber, Gold)
- ✅ Interaktive Anatomie (Beschriftung)
- ✅ Quiz mit Multiple Choice
- ✅ XP-Balken (localStorage)
- ✅ Professor Eich (Web Speech API, kostenlos)

## 🛠️ Tech Stack

```
Frontend:    Next.js 14 + Tailwind + TypeScript
Speicher:    localStorage (erstmal)
KI:          Web Speech API (kostenlos)
Deploy:      Vercel
```

## 🚀 Quick Start

```bash
npm install
npm run dev
# http://localhost:3000
```

## 📊 Daten (localStorage)

```javascript
// Gespeichert im Browser
{
  "learncraft-user": {
    "xp": 150,
    "level": "bronze",
    "completed": ["forelle-bronze"]
  }
}
```

---

*"Done is better than perfect"* 🚀
