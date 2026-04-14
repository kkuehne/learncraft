# Contributing to LearnCraft

Danke für dein Interesse! LearnCraft ist eine modulare Lernplattform, die durch Community-Plugins wächst.

## Plugin entwickeln

1. Ordner in `plugins/` erstellen: `mkdir plugins/dein-plugin`
2. `manifest.json` erstellen
3. Content als JSON/TS bereitstellen
4. PR erstellen

## Manifest-Format

```json
{
  "name": "dein-plugin",
  "version": "1.0.0",
  "title": "Mein Fach",
  "description": "Kurzbeschreibung",
  "author": "Dein Name",
  "dependencies": ["core"],
  "entry": "./index.ts"
}
```

## Code Standards

- TypeScript für alles
- ESLint/Prettier konfiguriert
- Komponenten mit shadcn/ui Muster
- Responsive Design (Mobile First)

## Fragen?

Issue erstellen oder Discord (falls vorhanden).
