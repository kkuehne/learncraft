// Training Camp Daten - Sanfter Einstieg

export interface HabitatHotspot {
  id: string
  x: number
  y: number
  icon: string
  title: string
  fact: string
  profEichAudio: string
}

export interface KnowledgeSnippet {
  id: string
  title: string
  emoji: string
  duration: string
  audioText: string
  description: string
}

export interface MatchPair {
  id: string
  term: string
  definition: string
  emoji: string
}

// Interaktive Habitat-Tour - Hotspots im Bach
export const habitatTour = {
  title: 'Ein Tag im Leben einer Forelle',
  description: 'Klicke auf die Hotspots und entdecke das Habitat der Bachforelle!',
  backgroundImage: '/habitat-stream.svg', // Platzhalter
  hotspots: [
    {
      id: 'sauerstoff',
      x: 20,
      y: 30,
      icon: '💨',
      title: 'Sauerstoffreiches Wasser',
      fact: 'Forellen brauchen besonders viel Sauerstoff - mindestens 8mg pro Liter Wasser. Das Gegenstromprinzip in ihren Kiemen macht sie dafür perfekt ausgestattet.',
      profEichAudio: 'Hier sprudelt das Wasser! Die Bachforelle liebt sauerstoffreiches Wasser. Ihre speziellen Kiemen mit dem Gegenstromprinzip saugen sogar den letzten Sauerstoff aus dem Wasser - effizienter geht es nicht!'
    },
    {
      id: 'schlupfwinkel',
      x: 75,
      y: 60,
      icon: '🪨',
      title: 'Unterwasser-Schlupfwinkel',
      fact: 'Hinter Steinen und Wurzeln versteckt sich die Forelle vor Raubfischen und Greifvögeln. Sie kennt jeden sicheren Platz in ihrem Revier.',
      profEichAudio: 'Siehst du diesen Stein? Dahinter versteckt sich die Forelle vor Fressfeinden. Sie hat ihr Revier perfekt im Blick und weiß genau, wo sie in Notflucht schlüpfen kann!'
    },
    {
      id: 'nahrungsquelle',
      x: 45,
      y: 45,
      icon: '🦟',
      title: 'Nahrungsquelle',
      fact: 'Wasserinsekten und ihre Larven sind das Hauptfutter. Die Forelle wartet geduldig auf Insekten, die von oben auf das Wasser fallen.',
      profEichAudio: 'Mmmh, lecker! Wasserinsekten sind der Hauptbestandteil der Forellen-Diät. Sie lauert geduldig auf Insekten, die vom Baum ins Wasser fallen - ein perfektes Timing ist dabei wichtig!'
    },
    {
      id: 'temperatur',
      x: 60,
      y: 25,
      icon: '🌡️',
      title: 'Kühle Temperaturen',
      fact: 'Ideale Wassertemperatur: 8-15°C. Bei über 20°C wird es kritisch - dann wandert die Forelle in kältere Bereiche oder stirbt.',
      profEichAudio: 'Brrr, schön kühl! Die Bachforelle ist ein Kältestenotherm - sie liebt kaltes Wasser. Bei über 20 Grad bekommt sie Atemnot und muss fliehen oder... leider oft sterben.'
    },
    {
      id: 'laichplatz',
      x: 85,
      y: 35,
      icon: '🥚',
      title: 'Laichplatz',
      fact: 'Im Winter laichen Forellen in kiesigem Grund. Der Kies schützt die Eier vor Prädatoren und sorgt für Wasserdurchfluss.',
      profEichAudio: 'Hier im Kies werden die Eier abgelegt! Der Winter ist Laichzeit. Der Kies schützt die Eier und lässt sauerstoffreiches Wasser durch - essenziell für die Entwicklung der Jungen!'
    },
    {
      id: 'stroemung',
      x: 30,
      y: 70,
      icon: '🌊',
      title: 'Strömung',
      fact: 'Forellen positionieren sich strategisch in der Strömung. Sie sparen Energie, indem sie in ruhigen Bereichen hinter Steinen stehen.',
      profEichAudio: 'Die Strömung ist trickreich! Forellen nutzen sie geschickt - sie stehen hinter Steinen im Windschatten und sparen Energie. Aber sie können auch schnell schwimmen, wenn Beute kommt!'
    }
  ] as HabitatHotspot[]
}

// Prof. Eich's Wissens-Schnipsel
export const knowledgeSnippets: KnowledgeSnippet[] = [
  {
    id: 'warum-forelle',
    title: 'Warum ist die Forelle so wichtig?',
    emoji: '👑',
    duration: '45 Sekunden',
    audioText: 'Die Bachforelle wird Königin der Bäche genannt - und das nicht ohne Grund! Sie ist ein sogenannter Bioindikator. Das bedeutet: Wo Forellen schwimmen, ist das Wasser sauber. Wo sie verschwinden, haben wir ein Problem. Ihre Anwesenheit zeigt uns, dass das Ökosystem gesund ist.',
    description: 'Lerne, warum die Forelle als "Königin der Bäche" gilt und was sie über Wasserqualität verrät.'
  },
  {
    id: 'besondere-anpassungen',
    title: 'Was macht die Forelle besonders?',
    emoji: '🎯',
    duration: '50 Sekunden',
    audioText: 'Die Bachforelle ist eine Evolutionäre Meisterleistung! Ihr schlanker Körper ist perfekt für schnelles Wasser. Die Fettflosse hinter der Rückenflosse stabilisiert sie. Aber das Genialste sind ihre Kiemen: Das Gegenstromprinzip ermöglicht einen Sauerstoffwirkungsgrad von über 80 Prozent! Kein Mensch kann das erreichen.',
    description: 'Entdecke die anatomischen Besonderheiten, die die Forelle so erfolgreich machen.'
  },
  {
    id: 'lebensweise',
    title: 'Wie lebt eine Forelle?',
    emoji: '🏠',
    duration: '40 Sekunden',
    audioText: 'Forellen sind Reviertiere! Ein erwachsenes Exemplar verteidigt seinen Platz im Bach gegen Artgenossen. Tagsüber versteckt sie sich, nachts wird gejagt. Sie frisst hauptsächlich Insekten und deren Larven. Und hier kommt es: Sie kann über 10 Jahre alt werden und erreicht dann eine stattliche Größe von über 40 Zentimetern!',
    description: 'Einblick in das tägliche Leben und Verhalten der Bachforelle.'
  },
  {
    id: 'bedrohungen',
    title: 'Welche Gefahren bedrohen die Forelle?',
    emoji: '⚠️',
    duration: '55 Sekunden',
    audioText: 'Die Bachforelle ist empfindlich - sehr empfindlich! Zu warmes Wasser durch Klimawandel, zu wenig Sauerstoff durch Düngereintrag, versiegelte Flussufer durch Bauvorhaben - all das gefährdet sie. Überfischung ist ein weiteres Problem. Aber der größte Feind ist die Regenbogenforelle aus der Zucht! Sie verdrängt unsere heimische Bachforelle durch Konkurrenz und genetische Vermischung.',
    description: 'Erfahre mehr über die Bedrohungen durch Umweltveränderungen und invasive Arten.'
  },
  {
    id: 'fortpflanzung',
    title: 'Wie vermehren sich Forellen?',
    emoji: '💕',
    duration: '45 Sekunden',
    audioText: 'Im Herbst beginnt das Laichgeschäft! Die Weibchen graben mit ihrer Körperflosse Mulden in den Kies. Dort werden die Eier abgelegt und vom Männchen befruchtet. Nach 3 Monaten schlüpfen die Jungen - genau zum Frühling, wenn die Nahrungsquellen üppig sind. Timing ist alles in der Natur!',
    description: 'Der Lebenszyklus der Forelle: Von der Eiablage bis zum Schlüpfen.'
  },
  {
    id: 'fischzucht',
    title: 'Zucht vs. Wild - was ist der Unterschied?',
    emoji: '🏭',
    duration: '60 Sekunden',
    audioText: 'Hier wird es komplex! Zuchtforellen werden in Aquakulturen massenhaft produziert. Sie haben kürzere Flossen, dickere Körper und andere Verhaltensmuster als Wildforellen. Wenn Zuchtforellen entkommen und mit Wildforellen paaren, vermischen sich die Gene. Das schwächt die Wildpopulation, denn Zuchtmerkmale sind in der Natur oft Nachteile! Zudem können Zuchtforellen Krankheiten einschleppen.',
    description: 'Die kritischen Unterschiede zwischen domestizierten und wilden Forellen.'
  }
]

// Match & Learn Paare
export const matchGame = {
  title: 'Match & Learn: Ordne zu!',
  description: 'Ziehe die Begriffe zu ihrer passenden Beschreibung. Keine Angst vor Fehlern - hier lernst du ohne Druck!',
  pairs: [
    {
      id: 'kiemen',
      term: 'Kiemen',
      definition: 'Atmungsorgan mit Gegenstromprinzip für maximalen Sauerstoffaustausch',
      emoji: '🫁'
    },
    {
      id: 'fettflosse',
      term: 'Fettflosse',
      definition: 'Kleine Fettflosse zwischen Rücken- und Schwanzflosse zur Stabilisierung',
      emoji: '🦴'
    },
    {
      id: 'schwimmblase',
      term: 'Schwimmblase',
      definition: 'Gasgefülltes Organ zur Höhenregulierung im Wasser',
      emoji: '🎈'
    },
    {
      id: 'seitenlinie',
      term: 'Seitenlinienorgan',
      definition: 'Sinnesorgan zur Wahrnehmung von Druckwellen und Bewegungen im Wasser',
      emoji: '👂'
    },
    {
      id: 'herz',
      term: 'Herz',
      definition: 'Zweikammeriges Herz mit Sinus venosus für den Blutkreislauf',
      emoji: '❤️'
    },
    {
      id: 'leber',
      term: 'Leber',
      definition: 'Größtes inneres Organ mit Verdauungs- und Speicherfunktion',
      emoji: '🫀'
    },
    {
      id: 'bioindikator',
      term: 'Bioindikator',
      definition: 'Organismus, dessen Vorkommen auf Wasserqualität schließen lässt',
      emoji: '📊'
    },
    {
      id: 'stenotherm',
      term: 'Kältestenotherm',
      definition: 'Organismus mit engem Temperatur-Toleranzbereich bei niedrigen Werten',
      emoji: '🌡️'
    }
  ] as MatchPair[]
}

// Training Camp Station Daten für den Lernpfad
export const trainingCampData = {
  id: 'training-camp',
  name: 'Training Camp',
  emoji: '🏕️',
  description: 'Sanfter Einstieg mit Habitat-Tour, Audio-Fakten und Match-Spielen (kein Druck!)',
  totalXP: 60, // Leichter XP-Gewinn ohne Stress
  activities: [
    { id: 'habitat-tour', name: 'Habitat Tour', xp: 20 },
    { id: 'wissen-snippets', name: 'Prof. Eichs Wissen', xp: 20 },
    { id: 'match-game', name: 'Match & Learn', xp: 20 }
  ]
}
