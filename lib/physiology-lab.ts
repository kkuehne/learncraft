// Physiologie Lab Daten - Brücke zwischen Anatomie und Boss Challenge
// Erklärt Funktionsweisen und Zusammenhänge

export interface PhysiologyModule {
  id: string
  title: string
  emoji: string
  description: string
  xp: number
}

export interface GegenstromAnimation {
  step: number
  title: string
  description: string
  bloodO2: number // Sauerstoff im Blut (%)
  waterO2: number // Sauerstoff im Wasser (%)
  efficiency: number // Wirkungsgrad (%)
}

export const physiologyModules: PhysiologyModule[] = [
  {
    id: 'gegenstrom',
    title: 'Das Gegenstromprinzip',
    emoji: '🔄',
    description: 'Warum sind Forellen-Kiemen so effizient?',
    xp: 40
  },
  {
    id: 'temperatur',
    title: 'Temperatur & Sauerstoff',
    emoji: '🌡️',
    description: 'Der gefährliche Zusammenhang',
    xp: 35
  },
  {
    id: 'fortpflanzung',
    title: 'Fortpflanzung & Laichzeit',
    emoji: '💕',
    description: 'Von der Paarung bis zum Schlüpfen',
    xp: 35
  },
  {
    id: 'wild-vs-zucht',
    title: 'Wild vs. Zuchtforelle',
    emoji: '🆚',
    description: 'Anatomische und verhaltensbiologische Unterschiede',
    xp: 40
  }
]

// Interaktive Gegenstrom-Animation Schritte
export const gegenstromSteps: GegenstromAnimation[] = [
  {
    step: 1,
    title: 'Gleichstrom-Prinzip (ineffizient)',
    description: 'Stell dir vor: Blut und Wasser fließen in DIESELBE Richtung. Das Blut nimmt Sauerstoff auf, aber nur bis zur Hälfte des Wassers.',
    bloodO2: 50,
    waterO2: 50,
    efficiency: 50
  },
  {
    step: 2,
    title: 'Das Problem mit Gleichstrom',
    description: 'Wenn Blut und Wasser gleich schnell fließen, erreichen sie am Ende denselben Sauerstoffgehalt. Der Gradient verschwindet!',
    bloodO2: 60,
    waterO2: 60,
    efficiency: 40
  },
  {
    step: 3,
    title: 'Gegenstrom-Prinzip (genial!)',
    description: 'Jetzt fließt das Blut in die ENTGEGENGESETZTE Richtung zum Wasser. Überall herrscht ein Konzentrationsunterschied!',
    bloodO2: 80,
    waterO2: 20,
    efficiency: 80
  },
  {
    step: 4,
    title: 'Maximale Effizienz',
    description: 'Das Blut nimmt Sauerstoff auf vom Einstieg bis zum Ausstieg. Ergebnis: Über 80% Wirkungsgrad! Aber: Das kostet viel Energie.',
    bloodO2: 95,
    waterO2: 5,
    efficiency: 85
  }
]

// Wissens-Fragen für jedes Modul
export const physiologyQuestions: Record<string, {
  question: string
  options: string[]
  correct: number
  explanation: string
}[]> = {
  gegenstrom: [
    {
      question: 'Warum ist das Gegenstromprinzip so effizient?',
      options: [
        'Weil das Blut schneller fließt als das Wasser',
        'Weil überall ein Konzentrationsgradient herrscht',
        'Weil die Kiemen größer sind',
        'Weil das Wärmer ist'
      ],
      correct: 1,
      explanation: 'Beim Gegenstromprinzip fließen Blut und Wasser entgegengesetzt. Deshalb gibt es IMMER einen Sauerstoff-Unterschied, der den Austrieb gibt.'
    },
    {
      question: 'Was ist der NACHTEIL des Gegenstromprinzips?',
      options: [
        'Es funktioniert nur in kaltem Wasser',
        'Es braucht viel Energie',
        'Es ist zu kompliziert',
        'Es funktioniert nur bei jungen Forellen'
      ],
      correct: 1,
      explanation: 'Hohe Effizienz hat ihren Preis! Die Forelle muss ständig viel Energie für die Atmung aufwenden - daher ihr hoher Ruhe-Sauerstoffbedarf.'
    },
    {
      question: 'Wie viel Sauerstoff kann die Forelle maximal aus dem Wasser ziehen?',
      options: [
        'Etwa 20%',
        'Etwa 50%',
        'Etwa 80%',
        'Etwa 99%'
      ],
      correct: 2,
      explanation: 'Das Gegenstromprinzip ermöglicht der Forelle einen Wirkungsgrad von über 80% - das ist Spitzenklasse im Tierreich!'
    }
  ],
  temperatur: [
    {
      question: 'Was passiert mit Sauerstoff in warmem Wasser?',
      options: [
        'Er wird mehr',
        'Er bleibt gleich',
        'Er wird weniger (schlechter löslich)',
        'Er wird giftig'
      ],
      correct: 2,
      explanation: 'Wie bei einer Limonade: Warmes Wasser kann weniger Gas (Sauerstoff) lösen. Das ist gefährlich für die Forelle!'
    },
    {
      question: 'Was passiert mit dem Stoffwechsel der Forelle bei Wärme?',
      options: [
        'Er wird langsamer',
        'Er bleibt gleich',
        'Er wird schneller (mehr Sauerstoffbedarf)',
        'Er stoppt'
      ],
      correct: 2,
      explanation: 'Bei Wärme steigt der Stoffwechsel exponentiell! Die Forelle braucht MEHR Sauerstoff, aber das Wasser bietet WENIGER an - ein tödlicher Teufelskreis.'
    },
    {
      question: 'Was ist die "Gipfelfalle" (Summit Trap)?',
      options: [
        'Eine Angelmethode',
        'Eine Falle für Fische',
        'Gebirgsarten können nicht höher wandern als der Gipfel',
        'Ein besonderer Laichplatz'
      ],
      correct: 2,
      explanation: 'Bei Klimawandel wandern Forellen in höhere, kühlere Regionen. Aber irgendwann gibt es keine Berge mehr - sie sind in der "Gipfelfalle" gefangen!'
    }
  ],
  fortpflanzung: [
    {
      question: 'Wann laichen Bachforellen?',
      options: [
        'Im Frühling',
        'Im Sommer',
        'Im Herbst/Winter',
        'Das ganze Jahr'
      ],
      correct: 2,
      explanation: 'Bachforellen laichen von November bis Februar. Die Eier brauchen 3-4 Monate bei niedrigen Temperaturen bis zum Schlüpfen - perfekt zum Frühling!'
    },
    {
      question: 'Warum brauchen die Eier Kies zum Laichen?',
      options: [
        'Zum Spielen',
        'Für Sauerstoffzufuhr und Schutz',
        'Zum Fressen',
        'Zur Orientierung'
      ],
      correct: 1,
      explanation: 'Der Kies schützt die Eier vor Fressfeinden UND lässt sauerstoffreiches Wasser durchfließen - essenziell für die Entwicklung!'
    },
    {
      question: 'Wie lange brauchen Forellen-Eier bis zum Schlüpfen?',
      options: [
        '1-2 Wochen',
        '1-2 Monate',
        '3-4 Monate',
        '1 Jahr'
      ],
      correct: 2,
      explanation: 'Bei kalten Temperaturen (4-10°C) dauert die Entwicklung 3-4 Monate. Genau richtig, damit die Jungen im Frühling schlüpfen, wenn reichlich Nahrung da ist!'
    }
  ],
  'wild-vs-zucht': [
    {
      question: 'Was ist ein "Physostome"?',
      options: [
        'Ein Muskel',
        'Ein Fisch mit Schlauch zur Schwimmblase',
        'Ein Organ',
        'Eine Krankheit'
      ],
      correct: 1,
      explanation: 'Forellen sind Physostome - sie haben einen Schlauch (Pneumatischer Ductus) zur Schwimmblase. Sie können Luft schlucken und abschnallen, um die Tiefe zu regulieren!'
    },
    {
      question: 'Warum sind Zuchtforellen oft größere Schwimmblasen?',
      options: [
        'Sie essen mehr',
        'Sie müssen nicht gegen Strömung ankämpfen',
        'Sie sind krank',
        'Das ist eine Mutation'
      ],
      correct: 1,
      explanation: 'In Aquakulturen gibt es keine Strömung. Zuchtforellen haben größere Schwimmblasen weil sie nicht gegen Strömung schwimmen müssen - eine domestizierte Eigenschaft!'
    },
    {
      question: 'Was passiert bei genetischer Vermischung von Wild- und Zuchtforellen?',
      options: [
        'Die Fische werden gesünder',
        'Die Wildpopulation wird geschwächt',
        'Nichts',
        'Sie können nicht miteinander laichen'
      ],
      correct: 1,
      explanation: 'Zuchtmerkmale (große Schwimmblase, weniger Fluchtverhalten) sind in der Natur NACHTEILE. Wenn sich die Gene vermischen, verliert die Wildpopulation ihre Anpassung!'
    }
  ]
}

// Temperatur-Experiment Daten
export const temperatureExperiment = {
  title: 'Das Temperatur-Sauerstoff-Experiment',
  description: 'Verschiebe den Temperaturregler und beobachte, was passiert!',
  temps: [4, 8, 12, 16, 20, 24],
  oxygenLevels: [ // mg/L Sauerstofflöslichkeit
    13.1, // 4°C
    11.8, // 8°C
    10.5, // 12°C
    9.5,  // 16°C
    8.7,  // 20°C
    8.0   // 24°C
  ],
  metabolismMultiplier: [ // Stoffwechsel-Faktor (Relativ zu 4°C)
    1.0,
    1.3,
    1.7,
    2.2,
    2.9,
    3.8
  ]
}

// Physiologie-Fakten für Audio
export const physiologyFacts = {
  gegenstrom: 'Das Gegenstromprinzip ist eines der genialsten Erfindungen der Evolution. Blut und Wasser fließen entgegengesetzt, sodass immer ein Sauerstoff-Unterschied besteht. Ergebnis: Über 80 Prozent Wirkungsgrad! Aber Achtung: Das kostet viel Energie. Die Forelle muss ständig aktiv atmen.',
  temperatur: 'Hier passiert ein doppelter Teufelskreis: Bei Wärme sinkt der Sauerstoff im Wasser, aber der Stoffwechsel der Forelle steigt! Sie braucht mehr, bekommt aber weniger. Ab 20 Grad wird es kritisch.',
  fortpflanzung: 'Die Fortpflanzung ist ein Meisterwerk des Timings. Laichzeit im Winter, Schlüpfen im Frühling - genau wenn die Nahrungsquellen explodieren. Der Kies ist dabei der perfekte Babysitter: Schutz plus Sauerstoffzufuhr!',
  wildzucht: 'Die Unterscheidung von Wild- und Zuchtforellen ist wichtig für den Naturschutz. Zuchtforellen sind domestiziert - wie Haustiere. Ihre Gene sind an Aquakulturen angepasst, nicht an Wildbäche. Vermischung gefährdet die Wildpopulation!'
}
