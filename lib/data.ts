// Forelle-Quest Daten

export const forelleQuest = {
  id: 'forelle',
  name: 'Forelle',
  emoji: '🐟',
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
    }
  }
}

export const professorEich = {
  name: 'Professor Eich',
  avatar: '🦫',
  
  greetings: {
    bronze: 'Willkommen! Ich bin Professor Eich. Gemeinsam erkunden wir die Forelle. Bereit für die erste Aufgabe?',
    silver: 'Großartig! Du kennst die Außenseite. Jetzt schauen wir hinein!',
    gold: 'Beeindruckend! Du bist bereit für das Gold-Level!'
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
