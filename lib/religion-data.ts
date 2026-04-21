// Religion-Quest Daten - Klasse 5 Gymnasium
// Fokus: Altes Testament, Schöpfung, Bund und Gesetz

export const religionLearningPath = {
  stations: [
    {
      id: 'religion-training-camp',
      name: 'Religions-Camp',
      emoji: '🏕️',
      description: 'Einstieg in die Bibel-Welt: Symbole, Begriffe und erste Geschichten',
      category: 'theorie',
      requiredXP: 0,
      totalXP: 80,
      locked: false,
      color: '#22c55e'
    },
    {
      id: 'theology-lab',
      name: 'Theologie Lab',
      emoji: '🧪',
      description: 'Interaktive Analyse von Schöpfung, Bund und Gesetz',
      category: 'praxis',
      requiredXP: 0,
      totalXP: 150,
      locked: false,
      color: '#0d9488',
      route: '/quest/religion/theology-lab'
    },
    {
      id: 'religion-quiz',
      name: 'Glaubens-Quiz',
      emoji: '📝',
      description: 'Bronze, Silber und Gold Level zur Wissensprüfung',
      category: 'wissenscheck',
      requiredXP: 0,
      totalXP: 500,
      locked: false,
      color: '#f59e0b'
    },
    {
      id: 'religion-boss',
      name: 'Boss Arena',
      emoji: '👑',
      description: 'Die ultimative Challenge: Interpretation & Anwendung',
      category: 'boss',
      requiredXP: 350,
      totalXP: 300,
      locked: true,
      color: '#dc2626',
      isBoss: true
    }
  ]
}

// Theologie Lab Module (Interaktive Lernbausteine)
export const theologyModules = [
  {
    id: 'schöpfung',
    title: 'Die Schöpfungs-Werkstatt',
    emoji: '🌍',
    description: 'Wie entstand die Welt in 7 Tagen?',
    xp: 40
  },
  {
    id: 'bund',
    title: 'Der Bund-Generator',
    emoji: '🤝',
    description: 'Das Versprechen zwischen Gott und Mensch',
    xp: 35
  },
  {
    id: 'exodus',
    title: 'Exodus-Navigator',
    emoji: '📜',
    description: 'Von Ägypten zu den 10 Geboten',
    xp: 35
  },
  {
    id: 'propheten',
    title: 'Die Propheten-Stimme',
    emoji: '📢',
    description: 'Warnungen und Verheißungen verstehen',
    xp: 40
  }
]

export const religionQuest = {
  id: 'religion',
  name: 'Altes Testament',
  emoji: '📖',
  description: 'Die Anfänge der Menschheit und Gottes Weg mit seinem Volk',
  
  levels: {
    bronze: {
      id: 'bronze',
      name: 'Bronze',
      title: 'Die Grundlagen',
      description: 'Schöpfung und die ersten Geschichten',
      totalXP: 50,
      tasks: [
        {
          id: 'r-b1',
          question: 'Was geschah am ersten Tag der Schöpfung?',
          options: ['Die Tiere wurden erschaffen', 'Licht wurde geschaffen', 'Der Mensch wurde erschafft'],
          correctAnswer: 1,
          hint: 'Es war ganz dunkel, dann sagte Gott: "Es werde Licht!"',
          xp: 20
        },
        {
          id: 'r-b2',
          question: 'Warum baute Noah die Arche?',
          options: ['Um auf Urlaub zu fahren', 'Um vor der Sintflut gerettet zu werden', 'Um Tiere zu sammeln'],
          correctAnswer: 1,
          hint: 'Gott warnte Noah vor einem gewaltigen Regen.',
          xp: 20
        },
        {
          id: 'r-b3',
          question: 'Was ist die Bibel?',
          options: ['Ein einziges langes Buch', 'Eine Sammlung von heiligen Schriften', 'Einmal ein Tagebuch'],
          correctAnswer: 1,
          hint: 'Sie besteht aus vielen verschiedenen Büchern.',
          xp: 10
        }
      ]
    },
    
    silver: {
      id: 'silver',
      name: 'Silber',
      title: 'Der Bund',
      description: 'Abraham, Moses und die Verheißung',
      totalXP: 75,
      tasks: [
        {
          id: 'r-s1',
          question: 'Was versprach Gott Abraham im Bund?',
          options: ['Unendlich viel Gold', 'Einen reichen Nachkommen und ein eigenes Land', 'Die Herrschaft über die Welt'],
          correctAnswer: 1,
          hint: 'Abraham sollte "Vater vieler Völker" werden.',
          xp: 30
        },
        {
          id: 'r-s2',
          question: 'Wie erschien Gott Moses zum ersten Mal?',
          options: ['In einem Traum', 'In einem brennenden Dornbusch', 'Durch einen Engel'],
          correctAnswer: 1,
          hint: 'Der Busch brannte, wurde aber nicht verzehrt.',
          xp: 30
        },
        {
          id: 'r-s3',
          question: 'Was ist ein "Bund" in der Bibel?',
          options: ['Ein einfaches Versprechen', 'Ein heiliger Vertrag mit gegenseitigen Pflichten', 'Ein rechtliches Dokument'],
          correctAnswer: 1,
          hint: 'Gott bindet sich an den Menschen und fordert Treue.',
          xp: 15
        }
      ]
    },
    
    gold: {
      id: 'gold',
      name: 'Gold',
      title: 'Gesetz & Ethik',
      description: 'Die 10 Gebote und die Rolle der Propheten',
      totalXP: 100,
      tasks: [
        {
          id: 'r-g1',
          question: 'Wo erhielt Moses die 10 Gebote?',
          options: ['Im Tal des Nils', 'Auf dem Berg Sinai', 'In Jerusalem'],
          correctAnswer: 1,
          hint: 'Es war ein heiliger Berg in der Wüste.',
          xp: 35
        },
        {
          id: 'r-g2',
          question: 'Was ist die Hauptaufgabe eines Propheten?',
          options: ['Die Zukunft exakt vorherzusagen', 'Die Botschaft Gottes an das Volk weiterzugeben', 'Könige zu stürzen'],
          correctAnswer: 1,
          hint: 'Propheten rufen das Volk zur Umkehr und Treue zu Gott auf.',
          xp: 35
        },
        {
          id: 'r-g3',
          question: 'Welches Gebot betont den Respekt gegenüber den Eltern?',
          options: ['Das erste', 'Das fünfte', 'Das zehnte'],
          correctAnswer: 1,
          hint: "Ehre Vater und Mutter...",
          xp: 30
        }
      ]
    },
    
    boss: {
      id: 'boss',
      name: '💎 Boss',
      title: 'Theologische Challenge',
      description: 'Interpretation und Anwendung',
      totalXP: 150,
      isBoss: true,
      tasks: [
        {
          id: 'r-boss1',
          question: 'Warum ist das Konzept der "Schöpfung" heute noch wichtig für den Umweltschutz?',
          options: ['Weil es alt ist', 'Weil die Welt als Gottes Geschenk gesehen wird, das man bewahren muss', 'Weil es keine anderen Gründe gibt'],
          correctAnswer: 1,
          hint: 'Der Mensch ist Verwalter der Schöpfung, nicht ihr Besitzer.',
          xp: 50
        },
        {
          id: 'r-boss2',
          question: 'Wie lässt sich die Idee des "Bundes" auf heutige Beziehungen übertragen?',
          options: ['Es geht nur um Gesetze', 'Es geht um Vertrauen, Treue und gegenseitige Verantwortung', 'Bunde gibt es heute nicht mehr'],
          correctAnswer: 1,
          hint: 'Ein Bund ist tiefer als ein Vertrag - es geht um eine Beziehung.',
          xp: 50
        },
        {
          id: 'r-boss3',
          question: 'Welchen Kernwert vermitteln die 10 Gebote für ein friedliches Zusammenleben?',
          options: ['Strenge Strafen', 'Die Würde und das Recht des Mitmenschen zu achten', 'Nur Gehorsam gegenüber dem König'],
          correctAnswer: 1,
          hint: 'Nicht töten, nicht stehlen - das schützt alle Menschen.',
          xp: 50
        }
      ]
    }
  }
}
