// Forelle-Quest Daten

// Lernpfad Stationen
export const learningPath = {
  stations: [
    {
      id: 'training-camp',
      name: 'Training Camp',
      emoji: '🏕️',
      description: 'Lerne die Grundlagen der Forellen-Anatomie',
      category: 'theorie',
      requiredXP: 0,
      totalXP: 75,
      locked: false,
      color: '#22c55e'
    },
    {
      id: 'anatomy-lab',
      name: 'Anatomie Lab',
      emoji: '🔬',
      description: 'Beschriftet die äußere Anatomie der Forelle',
      category: 'praxis',
      requiredXP: 75,
      totalXP: 90,
      locked: true,
      color: '#3b82f6'
    },
    {
      id: 'quiz',
      name: 'Quiz',
      emoji: '📝',
      description: 'Teste dein Wissen in drei Schwierigkeitsstufen',
      category: 'wissenscheck',
      requiredXP: 165,
      totalXP: 325,
      locked: true,
      color: '#f59e0b'
    },
    {
      id: 'boss-arena',
      name: 'Boss Arena',
      emoji: '👑',
      description: 'Die ultimative Challenge für Forellen-Experten',
      category: 'boss',
      requiredXP: 490,
      totalXP: 150,
      locked: true,
      color: '#dc2626',
      isBoss: true
    }
  ]
}

// Forelle Anatomie-Daten (Außen) - Alle Flossen beschriftbar
export const forelleAnatomy = {
  id: 'anatomy',
  name: 'Anatomie',
  title: 'Die Forelle von außen und innen',
  description: 'Beschriftet das schematische Bild der Forelle',
  totalXP: 90,
  parts: [
    {
      id: 'kiemen',
      name: 'Kiemendeckel',
      x: 65,
      y: 25,
      correctLabel: 'Kiemendeckel',
      hint: 'Hier befinden sich die Kiemen zum Atmen',
      xp: 15,
      fact: 'Die Kiemen bestehen aus 4 Kiemenbögen mit jeweils zwei Kiemenblättchen. Das Gegenstromprinzip ermöglicht einen Wirkungsgrad von über 80 Prozent beim Sauerstoffaustausch.'
    },
    {
      id: 'flosse-ruecken',
      name: 'Rückenflosse',
      x: 50,
      y: 15,
      correctLabel: 'Rückenflosse',
      hint: 'Die Flosse auf dem Rücken zur Stabilisierung',
      xp: 10,
      fact: 'Die Rückenflosse dient der Stabilisierung und Lenkung. Sie wird von Muskeln gestützt und kann bei Bedarf eingeklappt werden, um Widerstand zu reduzieren.'
    },
    {
      id: 'fettflosse',
      name: 'Fettflosse',
      x: 35,
      y: 12,
      correctLabel: 'Fettflosse',
      hint: 'Kleine Fette Flosse hinter der Rückenflosse',
      xp: 10,
      fact: 'Die Fettflosse ist ein typisches Merkmal der Lachsfische. Sie enthält fettreiches Gewebe und dient möglicherweise der Wahrnehmung von Strömungen.'
    },
    {
      id: 'flosse-brust',
      name: 'Brustflosse',
      x: 70,
      y: 45,
      correctLabel: 'Brustflosse',
      hint: 'Die seitlichen Flossen zur Steuerung',
      xp: 10,
      fact: 'Die Brustflossen ermöglichen präzise Richtungsänderungen und das Bremsen. Sie sind mit Schultergürtel verbunden und können unabhängig voneinander bewegt werden.'
    },
    {
      id: 'flosse-after',
      name: 'Afterflosse',
      x: 45,
      y: 50,
      correctLabel: 'Afterflosse',
      hint: 'Die Flosse am Bauch vor dem Schwanz',
      xp: 10,
      fact: 'Die Afterflosse sitzt auf der Bauchseite vor der Schwanzflosse. Zusammen mit der Bauchflosse dient sie der vertikalen Steuerung und Stabilisierung.'
    },
    {
      id: 'flosse-seite',
      name: 'Seitenlinie',
      x: 55,
      y: 45,
      correctLabel: 'Seitenlinienorgan',
      hint: 'Wichtig für die Orientierung im Wasser',
      xp: 15,
      fact: 'Das Seitenlinienorgan besteht aus Sinneszellen, die Druckwellen und Strömungen im Wasser wahrnehmen. So kann die Forelle Beutetiere auch im Dunkeln orten.'
    },
    {
      id: 'schwanz',
      name: 'Schwanzflosse',
      x: 15,
      y: 40,
      correctLabel: 'Schwanzflosse',
      hint: 'Die große Flosse hinten zum Schwimmen',
      xp: 10,
      fact: 'Die tief gegabelte Schwanzflosse ist das Hauptantriebsorgan. Durch schnelle Schläge kann die Forelle kurzzeitig Geschwindigkeiten bis zu 40 Kilometer pro Stunde erreichen.'
    }
  ]
}

// Innere Organe Daten
export const forelleInnerOrgans = {
  id: 'innerorgans',
  name: 'Innere Organe',
  title: 'Die Anatomie im Detail',
  description: 'Beschriftet die inneren Organe der Forelle',
  totalXP: 80,
  parts: [
    {
      id: 'herz',
      name: 'Herz',
      x: 45,
      y: 55,
      correctLabel: 'Herz',
      hint: 'Das zweiseitige Herz pumpt das Blut durch den Körper',
      xp: 15,
      animates: true
    },
    {
      id: 'kiemeninnen',
      name: 'Kiemen',
      x: 15,
      y: 35,
      correctLabel: 'Kiemen',
      hint: 'Hier findet der Gasaustausch statt - Sauerstoff aufnehmen, CO2 abgeben',
      xp: 15,
      animates: true
    },
    {
      id: 'schwimmblase',
      name: 'Schwimmblase',
      x: 55,
      y: 30,
      correctLabel: 'Schwimmblase',
      hint: 'Physostom - mit Darm verbunden, reguliert den Auftrieb',
      xp: 15,
      animates: false
    },
    {
      id: 'darm',
      name: 'Darm',
      x: 65,
      y: 65,
      correctLabel: 'Darm',
      hint: 'Verdauungsweg, führt zum After',
      xp: 10,
      animates: false
    },
    {
      id: 'niere',
      name: 'Niere',
      x: 70,
      y: 45,
      correctLabel: 'Niere',
      hint: 'Filtration des Blutes, Ausscheidung von Stoffwechselprodukten',
      xp: 15,
      animates: false
    },
    {
      id: 'leber',
      name: 'Leber',
      x: 60,
      y: 50,
      correctLabel: 'Leber',
      hint: 'Verdauungsorgan, Stoffwechsel, Glykogenspeicher',
      xp: 10,
      animates: false
    }
  ]
}

export const forelleQuest = {
  id: 'forelle',
  name: 'Forelle',
  emoji: '🐟',
  scientificName: 'Salmo trutta fario',
  description: 'Die Bachforelle - perfekt an ihr Habitat angepasst',
  habitat: 'Sauerstoffreiche, klare Bäche und Flüsse',
  
  levels: {
    bronze: {
      id: 'bronze',
      name: 'Bronze',
      title: 'Äußere Erscheinung',
      description: 'Lerne die sichtbaren Merkmale der Forelle kennen',
      totalXP: 50,
      tasks: [
        {
          id: 'b1',
          question: 'Wie atmet eine Forelle?',
          options: ['Mit Lungen', 'Mit Kiemen', 'Durch die Haut'],
          correctAnswer: 1,
          hint: 'Fische haben keine Lungen wie wir!',
          xp: 20
        },
        {
          id: 'b2',
          question: 'Warum ist die Forelle stromlinienförmig?',
          options: ['Schöner aussehen', 'Schneller schwimmen', 'Mehr essen'],
          correctAnswer: 1,
          hint: 'Denke an den Wasser-Widerstand',
          xp: 20
        },
        {
          id: 'b3',
          question: 'Welche Schuppenart hat die Forelle?',
          options: ['Cycloidschuppen (rund, glatt)', 'Placoidschupmen (wie Hai)', 'Ganoidschuppen'],
          correctAnswer: 0,
          hint: 'Fühlen sich glatt an, keine rauen Kanten',
          xp: 10
        }
      ]
    },
    
    silver: {
      id: 'silver',
      name: 'Silber',
      title: 'Innere Organe',
      description: 'Wie funktioniert die Atmung?',
      totalXP: 75,
      tasks: [
        {
          id: 's1',
          question: 'Wofür ist die Schwimmblase zuständig?',
          options: ['Atmen', 'Auftrieb', 'Verdauung'],
          correctAnswer: 1,
          hint: 'Wie ein aufblasbarer Ballon!',
          xp: 30
        },
        {
          id: 's2',
          question: 'Wie viele Herzkammern hat die Forelle?',
          options: ['Eins', 'Zwei', 'Vier'],
          correctAnswer: 1,
          hint: 'Wir haben vier, Forelle weniger',
          xp: 30
        },
        {
          id: 's3',
          question: 'Was bedeutet Physostom?',
          options: ['Schwimmblase mit Darm verbunden', 'Keine Schwimmblase', 'Feste Schwimmblase'],
          correctAnswer: 0,
          hint: 'Forelle kann Gas aufnehmen/abgeben',
          xp: 15
        }
      ]
    },
    
    gold: {
      id: 'gold',
      name: 'Gold',
      title: 'Lebensweise',
      description: 'Fortpflanzung und Gefährdung',
      totalXP: 100,
      tasks: [
        {
          id: 'g1',
          question: 'Wann laicht die Forelle?',
          options: ['Im Sommer', 'Im Winter', 'Im Frühling'],
          correctAnswer: 1,
          hint: 'Oft unter dem Eis!',
          xp: 35
        },
        {
          id: 'g2',
          question: 'Warum braucht die Forelle sauberes Wasser?',
          options: ['Zum Trinken', 'Für die Kiemenatmung', 'Zum Spielen'],
          correctAnswer: 1,
          hint: 'Schmutziges Wasser = wenig Sauerstoff',
          xp: 35
        },
        {
          id: 'g3',
          question: 'Warum ist die Forelle ein Bioindikator?',
          options: ['Zeigt Wassergüte an', 'Ist sehr groß', 'Lebt sehr lange'],
          correctAnswer: 0,
          hint: 'Verschwindet bei schlechtem Wasser',
          xp: 30
        }
      ]
    },
    
    boss: {
      id: 'boss',
      name: '💎 Boss',
      title: 'Die ultimative Challenge',
      description: 'Meistere das finale Boss-Level und werde zum Forellen-Meister!',
      totalXP: 150,
      isBoss: true,
      tasks: [
        {
          id: 'boss1',
          question: 'Welche spezielle Anpassung ermöglicht der Forelle, in sauerstoffarmem Wasser zu überleben?',
          options: ['Sie kann Luft atmen', 'Ihre Kiemen haben eine höhere Oberfläche', 'Sie schwimmt nur sehr langsam', 'Sie ändert ihre Hautfarbe'],
          correctAnswer: 1,
          hint: 'Mehr Oberfläche = mehr Sauerstoffaufnahme',
          xp: 50
        },
        {
          id: 'boss2',
          question: 'Warum kann die Forelle als "Physostomer" Gas direkt aus dem Darm in die Schwimmblase pumpen?',
          options: ['Um schneller zu schwimmen', 'Um in verschiedenen Tiefen zu bleiben', 'Um lauter zu sein', 'Um besser zu riechen'],
          correctAnswer: 1,
          hint: 'Sie reguliert damit ihren Auftrieb!',
          xp: 50
        },
        {
          id: 'boss3',
          question: 'Was passiert physiologisch bei der Forelle im Winter, wenn das Wasser eisig kalt wird?',
          options: ['Sie friert ein', 'Ihr Stoffwechsel wird langsamer', 'Sie wächst schneller', 'Sie wechselt die Farbe'],
          correctAnswer: 1,
          hint: 'Kälteres Wasser = langsamerer Stoffwechsel bei Kaltblütern',
          xp: 50
        }
      ]
    }
  }
}

export const professorEich = {
  name: 'Professor Eich',
  avatar: '🦫',
  
  greetings: {
    bronze: 'Willkommen! Ich bin Professor Eich. Gemeinsam erkunden wir die Forelle. Bereit für die erste Aufgabe?',
    silver: 'Großartig! Du kennst die Außenseite. Jetzt schauen wir hinein!',
    gold: 'Beeindruckend! Du bist bereit für das Gold-Level!',
    boss: 'WOW! Du hast alle Level gemeistert! Aber bist du bereit für die ULTIMATIVE CHALLENGE? Diese Fragen sind nicht aus dem Buch... sondern aus dem echten Leben eines Forellen-Experten! 💎🔥'
  },
  
  correct: [
    'Richtig! Das hast du gut verstanden! 🎉',
    'Perfekt! Weiter so! ⭐',
    'Hervorragend! 👏',
    'Genau! ✅'
  ],
  
  wrong: [
    'Fast! Schau nochmal genau hin. 🧐',
    'Nicht ganz. Denk an die Kiemen... 💭',
    'Guter Versuch! 🤔',
    'Noch nicht ganz. Probier es nochmal! 💪'
  ]
}

// XP System
export const XP_CONFIG = {
  calculateLevel(xp: number): 'bronze' | 'silver' | 'gold' {
    if (xp >= 125) return 'gold'
    if (xp >= 50) return 'silver'
    return 'bronze'
  },
  
  getProgress(xp: number): { current: number; next: number; percent: number } {
    if (xp >= 125) return { current: xp - 125, next: 100, percent: 100 }
    if (xp >= 50) return { current: xp - 50, next: 75, percent: ((xp - 50) / 75) * 100 }
    return { current: xp, next: 50, percent: (xp / 50) * 100 }
  }
}
