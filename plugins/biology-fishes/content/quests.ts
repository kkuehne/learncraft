export interface FishQuest {
  id: string
  name: string
  scientificName: string
  emoji: string
  description: string
  habitat: string
  aiContext: string  // KI-Kontext für personalisierte Erklärungen
  levels: {
    bronze: QuestLevel
    silver: QuestLevel
    gold: QuestLevel
  }
}

export interface QuestLevel {
  title: string
  description: string
  learningGoals: string[]  // Was soll der Schüler lernen?
  aiPromptContext: string  // Kontext für KI-Tutor
  tasks: Task[]
  xpReward: number
}

export interface Task {
  id: string
  type: 'label' | 'quiz' | 'explain' | 'observe' | 'ai_dialog'
  question: string
  aiGuidance?: string  // Spezifischer KI-Hinweis
  options?: string[]
  correctAnswer?: string | number
  hint?: string
}

export const forelleQuest: FishQuest = {
  id: "forelle",
  name: "Forelle",
  scientificName: "Salmo trutta",
  emoji: "🐟",
  description: "Ein Bachforelle - Königin des klaren Wassers mit perfekten Anpassungen an den Lebensraum",
  habitat: "Sauerstoffreiche, klare Bäche und Flüsse mit Kiesboden",
  aiContext: `Die Forelle (Salmo trutta) ist ein klassischer Süßwasserfisch mit besonderen Anpassungen:
- Körperform: Stromlinienförmig für schnelles Schwimmen gegen die Strömung
- Schuppen: Cycloidschuppen (rund, glatt)
- Flossen: Paarige (Brust-, Bauchflossen) und unpaarige (Rücken-, After-, Schwanzflosse)
- Atmung: 4 Kiemenbögen mit vielen Kiemenblättchen
- Schwimmblase: Physostom (mit Verbindung zum Darm)
- Sinne: Seitenlinienorgan, Geruchssinn, Geschmack
- Ernährung: Raubfisch (Insektenlarven, kleine Fische)
- Fortpflanzung: Laich im Kies (Dezember-Februar)

Die Forelle ist ideal für Schüler der 5. Klasse, da sie alle typischen Fisch-Merkmale zeigt und gleichzeitig interessante Spezialisierungen hat.`,
  levels: {
    bronze: {
      title: "Äußere Erscheinung entdecken",
      description: "Erkunde die sichtbaren Merkmale der Forelle",
      learningGoals: [
        "Körperform und ihre Bedeutung erkennen",
        "Flossen benennen und ihre Funktion verstehen",
        "Schuppenart identifizieren"
      ],
      aiPromptContext: "Der Schüler beginnt mit der äußeren Anatomie. Er soll verstehen: Warum ist die Forelle stromlinienförmig? Welche Flossen gibt es und wozu dienen sie? Erkläre anschaulich, vergleiche mit Mensch/Tieren, die der Schüler kennt.",
      xpReward: 50,
      tasks: [
        {
          id: "forelle-b-1",
          type: "label",
          question: "Beschriftet die äußeren Merkmale: Kopf, Rumpf, Schwanzstiel, Schwanzflosse, Rückenflosse, Afterflosse, Brustflosse, Bauchflosse",
          aiGuidance: "Erkläre jedes Körperteil kurz, während der Schüler beschriftet. Mache auf Besonderheiten aufmerksam (z.B. das Fettfleckchen zwischen Rücken- und Afterflosse).",
          hint: "Beachte das kleine Fettfleckchen - typisch für Salmoniden!"
        },
        {
          id: "forelle-b-2",
          type: "ai_dialog",
          question: "Warum hat die Forelle eine stromlinienförmige Gestalt?",
          aiGuidance: "Führe einen Dialog: Erst die Vermutung des Schülers hören, dann erklären mit Vergleich (Auto, Vogel), dann Rückfrage ob verstanden.",
          hint: "Denke an das Medium Wasser - ist es leicht durchzukommen?"
        },
        {
          id: "forelle-b-3",
          type: "quiz",
          question: "Welche Schuppenart hat die Forelle?",
          options: ["Placoidschuppen (wie Hai)", "Ganoidschuppen", "Cycloidschuppen (rund, glatt)", "Ctenoidschuppen (kammartig)"],
          correctAnswer: 2,
          aiGuidance: "Nach richtiger/falscher Antwort: Erkläre die Unterschiede der Schuppenarten kurz. Placoid = Haie, Ganoid = Störe, Cycloid = Forelle/Karpfen, Ctenoid = Barsch.",
          hint: "Die Schuppen der Forelle fühlen sich glatt an und haben keine rauen Kanten."
        },
        {
          id: "forelle-b-4",
          type: "explain",
          question: "Erkläre: Warum sind die Brustflossen der Forelle so positioniert, dass sie seitlich herausragen?",
          aiGuidance: "Hilf dem Schüler beim Formulieren. Frage nach: Stabilität, Bremsen, Manövrieren. Bestätige richtige Ansätze, korrigiere freundlich.",
          hint: "Stell dir vor, wie ein Flugzeug landet - wozu dienen die 'Seitenruder'?"
        }
      ]
    },
    silver: {
      title: "Atmung und Organe verstehen",
      description: "Wie atmet die Forelle? Was passiert innen im Körper?",
      learningGoals: [
        "Kiemenatmung erklären können",
        "Schwimmblase verstehen",
        "Herz-Kreislauf verstehen"
      ],
      aiPromptContext: "Jetzt geht es um innere Organe, besonders Atmung. Die Forelle hat keine Lungen! Wichtig: Schwimmblase als Auftriebshilfe, aber keine Atmung. Kiemen mit Kiemenbögen. Zweikammeriges Herz (Vorhof + Kammer).",
      xpReward: 75,
      tasks: [
        {
          id: "forelle-s-1",
          type: "ai_dialog",
          question: "Wie atmet die Forelle? Beschreibe den Weg des Wassers durch den Körper.",
          aiGuidance: "Führe Schritt-für-Schritt durch: Mund auf → Wasser eintreten → Kiemen → Sauerstoff wird aufgenommen → Wasser wieder aus. Frage zwischen drin: Was passiert hier? Wohin geht das Wasser?",
          hint: "Beginne beim Mund, ende bei den Kiemendeckeln"
        },
        id: "forelle-s-2",
          type: "label",
          question: "Ordne die inneren Organe zu: Herz (zweikammerig), Schwimmblase, Leber, Niere, Darm",
          aiGuidance: "Erkläre jedes Organ kurz: Herz (pumpt Blut), Schwimmblase (Auftrieb, nicht Atmung!), Leber (Stoffwechsel), Niere (Ausscheidung), Darm (Verdauung).",
          hint: "Die Schwimmblase ist wie ein aufblasbarer Ballon - hilft beim Aufsteigen!"
        },
        {
          id: "forelle-s-3",
          type: "quiz",
          question: "Was ist besonders an der Schwimmblase der Forelle (Physostom)?",
          options: ["Sie ist mit dem Darm verbunden", "Sie enthält Sauerstoff", "Sie kann nicht entleert werden", "Sie ersetzt die Kiemen"],
          correctAnswer: 0,
          aiGuidance: "Erkläre Physostom vs. Physoclist: Forelle kann Gas über Darm aufnehmen/abgeben. Andere Fische (z.B. Barsch = Physoclist) müssen es aus der Blutbahn diffundieren lassen.",
          hint: "Forelle kann 'furzen' um schnell tiefer zu tauchen!"
        },
        {
          id: "forelle-s-4",
          type: "observe",
          question: "Wenn du eine Forelle im Aquarium beobachtest: Welche Körperbewegungen siehst du beim Atmen?",
          aiGuidance: "Lenke die Aufmerksamkeit auf: Mund öffnen/schließen (rhythmisch), Kiemendeckel bewegen sich. Frage: Wie oft pro Minute? Zähle mit!",
          hint: "Atmung ist bei Fischen schneller als bei uns - oft 60-80 Mal pro Minute"
        }
      ]
    },
    gold: {
      title: "Lebensweise und Fortpflanzung",
      description: "Wie lebt die Forelle? Wie vermehrt sie sich?",
      learningGoals: [
        "Lebensraum-Anforderungen verstehen",
        "Fortpflanzungsstrategie erklären",
        "Schutzmaßnahmen verstehen"
      ],
      aiPromptContext: "Fortpflanzung ist faszinierend bei Forellen: Laichzeit im Winter (Dez-Feb), besonders Ort (Kiesboden), klebrige Eier. Bedrohung durch Mensch (Überfischung, Gewässerverschmutzung). Bedeutung von sauberem, sauerstoffreichem Wasser.",
      xpReward: 100,
      tasks: [
        {
          id: "forelle-g-1",
          type: "explain",
          question: "Warum braucht die Forelle besonders sauberes, sauerstoffreiches Wasser?",
          aiGuidance: "Verknüpfe mit vorherigem Wissen: Kiemenatmung braucht viel Sauerstoff im Wasser. Forelle ist anspruchsvoll. Vergleiche mit anderen Tieren (Lachs ähnlich).",
          hint: "Denke an die Kiemen - je kälter/sauerstoffreicher das Wasser, desto besser"
        },
        {
          id: "forelle-g-2",
          type: "ai_dialog",
          question: "Wann und wo laicht die Forelle? Warum gerade dort?",
          aiGuidance: "Erkläre die Laichwanderung: Flussaufwärts, Kiesgrund (Eier werden zwischen Steinen festgeklebt), Winter (Dez-Feb). Warum Winter? Wenig Konkurrenz, Kühlung wichtig für Eientwicklung.",
          hint: "Die Forelle wandert oft flussaufwärts zurück zu ihren Geburtsgewässern"
        },
        {
          id: "forelle-g-3",
          type: "label",
          question: "Beschriftet die Geschlechtsorgane: Milchdrüse (Männchen), Laichdrüse/Eierstock (Weibchen), Geschlechtsöffnung (Urogenitalpapille)",
          aiGuidance: "Erkläre die Laichhandlung: Weibchen legt Eier in Kies, Männchen begießt mit Milch (Spermien). Eier werden klebrig und haften fest.",
          hint: "Außen sind Männchen und Weibchen oft schwer zu unterscheiden"
        },
        {
          id: "forelle-g-4",
          type: "ai_dialog",
          question: "Warum ist die Forelle gefährdet? Was können wir tun?",
          aiGuidance: "Führe ein Umweltbewusstsein-Gespräch: Überfischung, Gewässerverschmutzung (Dünger, Abwasser), Stauwehre (Wanderhindernis). Maßnahmen: Schonzeiten, Besatz, Gewässerschutz. Frage nach Meinung des Schülers.",
          hint: "Forelle ist wie ein Kanarienvogel im Bergwerk - zeigt Wassergüte an"
        }
      ]
    }
  }
}

// KI-Tutor Konfiguration
export const tutorConfig = {
  name: "Professor Eich",
  avatar: "🦫",
  personality: `Du bist Professor Eich, ein freundlicher, weiser Eichhörnchen-Professor der Biologie. 
Dein Ton ist:
- Wertschätzend und ermutigend
- Nie belehrend oder überheblich
- Mit echtem Interesse am Lernfortschritt
- Korrigierst freundlich: "Das war noch nicht ganz richtig, aber schau mal..."
- Feierst Erfolge: "Hervorragend! Das hast du gut verstanden!"
- Fragst nach: "Was denkst du, warum das so ist?"
- Gibst Hinweise statt sofortiger Antworten
- Verwendest Vergleiche aus dem Alltag des Schülers
- Bist geduldig bei wiederholten Fragen

Du begleitest den Schüler durch die Forelle-Quest. Du kennst seinen Fortschritt (Bronze/Silber/Gold) und passt deine Erklärungen an sein Level an.`,
  
  welcomeMessages: {
    bronze: "Willkommen bei der Forelle! Wir starten mit dem Äußeren - schau dir diese wunderschöne stromlinienförmige Gestalt an. Perfekt für schnelles Schwimmen im Bach! Bereit?",
    silver: "Ausgezeichnet! Du hast die äußere Anatomie gemeistert. Jetzt schauen wir hinein - wie atmet so eine Forelle eigentlich? Keine Lunge, das verrate ich schon mal!",
    gold: "Wow, du machst dich wirklich gut! Bronze und Silber geschafft. Jetzt kommen wir zur Lebensweise - wie lebt die Forelle, wann laicht sie, und warum ist sie gefährdet?"
  },
  
  hints: {
    general: [
      "Denke immer: Die Forelle ist ein Fisch - keine Lungen, sondern Kiemen!",
      "Vergleiche mit dir selbst: Was machst du anders als die Forelle?",
      "Das Wasser ist ihr Lebensraum - alle Anpassungen dienen dem Überleben im Wasser",
      "Beobachte genau: Details sind wichtig bei der Forelle!"
    ],
    stuck: [
      "Kein Problem, schauen wir uns das nochmal an...",
      "Das ist ein kniffliger Punkt, ich erkläre es anders...",
      "Stell dir vor, du wärst die Forelle...",
      "Lass uns das Schritt für Schritt durchgehen..."
    ]
  }
}

// Hilfsfunktionen für KI-Integration
export function getQuestContext(questId: string, level: 'bronze' | 'silver' | 'gold'): string {
  const quest = forelleQuest
  const levelData = quest.levels[level]
  
  return `
Quest: ${quest.name} (${level})
Lernziele: ${levelData.learningGoals.join(', ')}
Kontext: ${levelData.aiPromptContext}
Aktuelle Aufgabe: (wird dynamisch eingefügt)
`
}

export function generateTutorPrompt(
  userMessage: string,
  currentTask: string,
  level: 'bronze' | 'silver' | 'gold',
  attemptCount: number
): string {
  const quest = forelleQuest
  const context = getQuestContext(quest.id, level)
  
  let guidance = tutorConfig.personality
  
  if (attemptCount > 2) {
    guidance += "\nDer Schüler hat mehrere Versuche gebraucht. Sei besonders geduldig und gib konkretere Hinweise."
  }
  
  return `${guidance}

${context}

Aktuelle Aufgabe: ${currentTask}

Schüler sagt: "${userMessage}"

Antworte als Professor Eich:`
}
