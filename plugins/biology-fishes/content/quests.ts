export interface FishQuest {
  id: string
  name: string
  scientificName: string
  emoji: string
  description: string
  habitat: string
  levels: {
    bronze: QuestLevel
    silver: QuestLevel
    gold: QuestLevel
  }
}

export interface QuestLevel {
  title: string
  description: string
  tasks: Task[]
  xpReward: number
}

export interface Task {
  id: string
  type: 'label' | 'quiz' | 'explain' | 'observe'
  question: string
  options?: string[]
  correctAnswer?: string | number
  hint?: string
}

export const fishQuests: FishQuest[] = [
  {
    id: "karpfen",
    name: "Karpfen",
    scientificName: "Cyprinus carpio",
    emoji: "🐟",
    description: "Ein typischer Süßwasserfisch mit klassischer Fischanatomie",
    habitat: "Süßwasser, Seen und Flüsse",
    levels: {
      bronze: {
        title: "Grundbau erkennen",
        description: "Lerne die äußeren Merkmale des Karpfens kennen",
        xpReward: 50,
        tasks: [
          {
            id: "karpfen-1",
            type: "label",
            question: "Ziehe die Begriffe an die richtigen Stellen: Kopf, Rumpf, Schwanzflosse, Brustflosse",
            hint: "Die Schwanzflosse ist hinten, die Brustflossen seitlich"
          },
          {
            id: "karpfen-2",
            type: "quiz",
            question: "Wie atmet ein Karpfen?",
            options: ["Mit Lungen", "Mit Kiemen", "Durch die Haut", "Mit einem Schnabel"],
            correctAnswer: 1,
            hint: "Fische haben keine Lungen"
          },
          {
            id: "karpfen-3",
            type: "quiz",
            question: "Welche Schuppenart hat der Karpfen?",
            options: ["Placoidschuppen", "Ganoidschuppen", "Schuppen mit festem Anwachsen", "Keine Schuppen"],
            correctAnswer: 2,
            hint: "Karpfen haben große, glänzende Schuppen"
          }
        ]
      },
      silver: {
        title: "Organe verstehen",
        description: "Erkunde die inneren Organe des Karpfens",
        xpReward: 75,
        tasks: [
          {
            id: "karpfen-4",
            type: "label",
            question: "Beschriftet die Organe: Herz, Schwimmblase, Leber, Niere",
            hint: "Die Schwimmblase hilft beim Auf- und Abtauchen"
          },
          {
            id: "karpfen-5",
            type: "quiz",
            question: "Wofür ist die Schwimmblase zuständig?",
            options: ["Atmung", "Fortbewegung", "Auftrieb", "Verdauung"],
            correctAnswer: 2,
            hint: "Ohne Schwimmblase würde der Fisch absinken"
          },
          {
            id: "karpfen-6",
            type: "explain",
            question: "Erkläre: Warum hat der Karpfen ein zweikammeriges Herz?",
            hint: "Denke an den Kreislauf und den Sauerstofftransport"
          }
        ]
      },
      gold: {
        title: "Fortpflanzung & Lebensweise",
        description: "Verstehe wie Karpfen sich vermehren und überleben",
        xpReward: 100,
        tasks: [
          {
            id: "karpfen-7",
            type: "quiz",
            question: "Wie viele Eier legt ein Weibchen pro Jahr?",
            options: ["Hunderte", "Tausende", "Hunderttausende", "Millionen"],
            correctAnswer: 2,
            hint: "Viele Eier, damit einige überleben"
          },
          {
            id: "karpfen-8",
            type: "label",
            question: "Beschriftet die Geschlechtsorgane bei Männchen und Weibchen",
            hint: "Männchen haben Milchdrüsen, Weibchen Eierstöcke"
          },
          {
            id: "karpfen-9",
            type: "observe",
            question: "Beobachte: Wie verhält sich ein Karpfen im Aquarium? Notiere 3 Verhaltensweisen.",
            hint: "Achtet auf Atmung, Bewegung, Reaktion auf Futter"
          }
        ]
      }
    }
  },
  {
    id: "hai",
    name: "Hai",
    scientificName: "Selachii",
    emoji: "🦈",
    description: "Ein Knorpelfisch mit besonderen Anpassungen",
    habitat: "Meer, küstennahe Gewässer",
    levels: {
      bronze: {
        title: "Knorpel statt Knochen",
        description: "Entdecke den Unterschied zu Knochenfischen",
        xpReward: 50,
        tasks: [
          {
            id: "hai-1",
            type: "quiz",
            question: "Aus welchem Material besteht das Skelett des Hais?",
            options: ["Knochen", "Knorpel", "Chitin", "Kalk"],
            correctAnswer: 1,
            hint: "Hai gehören zu den Knorpelfischen"
          },
          {
            id: "hai-2",
            type: "label",
            question: "Beschriftet die besonderen Merkmale: Placoidschuppen, Kiefer, Kiemenspalten",
            hint: "Die Schuppen fühlen sich wie Sandpapier an"
          },
          {
            id: "hai-3",
            type: "quiz",
            question: "Warum muss ein Hai ständig schwimmen?",
            options: ["Zur Nahrungssuche", "Zur Fortpflanzung", "Für die Atmung", "Zur Orientierung"],
            correctAnswer: 2,
            hint: "Wasser muss über die Kiemen strömen"
          }
        ]
      },
      silver: {
        title: "Perfekte Jäger",
        description: "Anpassungen an die Lebensweise als Raubfisch",
        xpReward: 75,
        tasks: [
          {
            id: "hai-4",
            type: "quiz",
            question: "Wie viele Kiemenspalten hat ein Hai?",
            options: ["3-4", "5-7", "8-10", "12-15"],
            correctAnswer: 1,
            hint: "Mehr als beim Karpfen"
          },
          {
            id: "hai-5",
            type: "explain",
            question: "Erkläre: Warum sinkt ein Hai, wenn er aufhört zu schwimmen?",
            hint: "Keine Schwimmblase vorhanden"
          },
          {
            id: "hai-6",
            type: "label",
            question: "Beschriftet die Sinnesorgane: Ampullen von Lorenzini, Seitenlinie, Augen",
            hint: "Die Ampullen erkennen elektrische Felder"
          }
        ]
      },
      gold: {
        title: "Fortpflanzungsstrategien",
        description: "Verschiedene Arten der Nachkommenschaft",
        xpReward: 100,
        tasks: [
          {
            id: "hai-7",
            type: "quiz",
            question: "Welche Fortpflanzungsarten gibt es bei Haien?",
            options: ["Nur Eier", "Nur lebendgebärend", "Eier und lebendgebärend", "Eier, lebendgebärend und Mischformen"],
            correctAnswer: 3,
            hint: "Bei Haien gibt es alle Strategien"
          },
          {
            id: "hai-8",
            type: "observe",
            question: "Vergleiche: Welche Vorteile hat lebendgebärend gegenüber Eier legend?",
            hint: "Denke an Schutz und Überlebensrate"
          },
          {
            id: "hai-9",
            type: "quiz",
            question: "Wie viele Jungtiere bekommt ein Weiblicher Weißer Hai typischerweise?",
            options: ["1-2", "5-10", "20-50", "100+"],
            correctAnswer: 1,
            hint: "Wenige, dafür gut entwickelte Jungtiere"
          }
        ]
      }
    }
  },
  {
    id: "clownfisch",
    name: "Clownfisch",
    scientificName: "Amphiprioninae",
    emoji: "🐠",
    description: "Ein buntes Korallenriffbewohner mit Symbiose",
    habitat: "Korallenriffe im Indopazifik",
    levels: {
      bronze: {
        title: "Symbiose erleben",
        description: "Die besondere Beziehung zur Anemone",
        xpReward: 50,
        tasks: [
          {
            id: "clownfisch-1",
            type: "quiz",
            question: "Womit lebt der Clownfisch in Symbiose?",
            options: ["Korallen", "Seeanemonen", "Schwämme", "Quallen"],
            correctAnswer: 1,
            hint: "Der Film 'Findet Nemo' zeigt es"
          },
          {
            id: "clownfisch-2",
            type: "explain",
            question: "Erkläre: Was bedeutet Symbiose?",
            hint: "Beide Partner haben einen Nutzen"
          },
          {
            id: "clownfisch-3",
            type: "quiz",
            question: "Warum sticht die Anemone den Clownfisch nicht?",
            options: ["Er ist zu schnell", "Er hat Schleim auf der Haut", "Er füttert die Anemone", "Er ist giftig"],
            correctAnswer: 1,
            hint: "Spezieller Schutz auf der Haut"
          }
        ]
      },
      silver: {
        title: "Geschlechtswechsel",
        description: "Eine besondere Anpassung an die Umwelt",
        xpReward: 75,
        tasks: [
          {
            id: "clownfisch-4",
            type: "quiz",
            question: "Wer ist im Clownfisch-Rudel das dominante Weibchen?",
            options: ["Das größte Tier", "Das älteste Tier", "Das buntste Tier", "Das aggressivste Tier"],
            correctAnswer: 0,
            hint: "Größe bedeutet Dominanz"
          },
          {
            id: "clownfisch-5",
            type: "explain",
            question: "Erkläre: Was passiert wenn das dominante Weibchen stirbt?",
            hint: "Ein Männchen verändert sich"
          },
          {
            id: "clownfisch-6",
            type: "label",
            question: "Ordne die Rangfolge im Rudel: dominantes Weibchen, Männchen, kleine Männchen",
            hint: "Hierarchie ist wichtig für die Reproduktion"
          }
        ]
      },
      gold: {
        title: "Korallenriff-Ökosystem",
        description: "Verstehe das komplexe Zusammenspiel",
        xpReward: 100,
        tasks: [
          {
            id: "clownfisch-7",
            type: "observe",
            question: "Beschreibe: Welche weiteren Tiere leben im Korallenriff? Nenne 5 Beispiele.",
            hint: "Denke an verschiedene Lebensformen"
          },
          {
            id: "clownfisch-8",
            type: "quiz",
            question: "Warum sind Korallenriffe so wichtig für die Meere?",
            options: ["Nur als Touristenattraktion", "Als Lebensraum für 25% aller Meerestiere", "Nur für Fische", "Als Nahrungsquelle für Haie"],
            correctAnswer: 1,
            hint: "Große Bedeutung für Biodiversität"
          },
          {
            id: "clownfisch-9",
            type: "explain",
            question: "Erkläre: Warum sind Korallenriffe gefährdet?",
            hint: "Temperatur, Verschmutzung, Überfischung"
          }
        ]
      }
    }
  }
]

export const tutorIntro = {
  name: "Professor Eich",
  greeting: "Willkommen in der Welt der Fische! Ich bin Professor Eich, euer Begleiter durch dieses faszinierende Biom. Gemeinsam werden wir erkunden, wie Fische atmen, schwimmen und überleben. Jedes Tier hat dabei ganz eigene Anpassungen entwickelt - vom Karpfen in unseren Seen bis zum Hai in den tiefen Ozeanen. Bereit? Dann tauchen wir ein! 🐟",
  hints: [
    "Denke immer daran: Fische atmen mit Kiemen, nicht mit Lungen!",
    "Die Schwimmblasse ist der Schlüssel zum Auf- und Abtauchen.",
    "Bei der Fortpflanzung geht es um Überleben der Nachkommen.",
    "Vergleiche Fische - Gemeinsamkeiten und Unterschiede sind aufschlussreich."
  ]
}
