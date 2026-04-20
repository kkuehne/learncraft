// Boss Level Challenges - Für 5.-Klässler Gymnasium (10-11 Jahre)
// Anspruchsvoll aber altersgerecht: analytisches Denken, Vernetzung, Begründungen

export interface BossChallenge {
  id: string
  title: string
  question: string
  context: string
  hints: string[]
  requiredKeywords: string[]
  minLength: number
  maxAttempts: number
  xp: number
  evaluationCriteria: {
    coverage: string[]
    connections: string[]
  }
  learningGoals: string[]
}

export interface AttemptResult {
  attemptNumber: number
  score: number
  feedback: string
  level: 'excellent' | 'good' | 'acceptable' | 'insufficient'
  suggestions: string[]
  text: string
}

export const bossChallenges: BossChallenge[] = [
  {
    id: 'bioindikator',
    title: '🧪 Die Forelle als Bioindikator',
    question: `Die Bachforelle gilt als "Königin der Bäche" und verschwindet als erste Fischart, wenn Gewässer verschmutzt werden.

ERKLÄRE: Warum ist die Forelle so empfindlich?

Gehe dabei auf diese drei Punkte ein:

1️⃣ **Das Gegenstromprinzip in den Kiemen** – Wie funktioniert es und warum ist es so effizient?

2️⃣ **Der hohe Sauerstoffbedarf** – Warum braucht die Forelle besonders viel Sauerstoff im Vergleich zu anderen Fischen?

3️⃣ **Der Unterschied zu anderen Fischarten** – Warum überleben Karpfen oder Aale in Gewässern, in denen die Forelle verschwindet?

**WICHTIG:** Verbinde die Punkte! Wie hängen Kiemenbau, Sauerstoff und Umweltverschmutzung zusammen?`,
    context: '💡 **Tipp:** Die Forelle ist wie ein Sportwagen – hochleistungsfähig, aber anspruchsvoll. Andere Fische sind wie robuste Geländewagen.',
    hints: [
      '💡 Das Gegenstromprinzip: Wasser und Blut fließen in entgegengesetzte Richtungen. Das ergibt 80% Sauerstoff-Ausnutzung! Aber das braucht viel Energie...',
      '💡 Die Forelle hat einen schnellen Stoffwechsel – sie muss ständig aktiv sein und braucht daher viel Sauerstoff, auch im Ruhezustand.',
      '💡 Bei Verschmutzung sinkt der Sauerstoff im Wasser. Karpfen können schlafen und weniger Sauerstoff verbrauchen. Die Forelle kann das nicht!',
      '💡 Überlege: Warum ist hohe Effizienz (Gegenstromprinzip) bei niedrigem Sauerstoff ein Nachteil?'
    ],
    requiredKeywords: ['gegenstromprinzip', 'sauerstoff', 'kiemen', 'stoffwechsel', 'empfindlich', 'wirkungsgrad', 'energie', 'verschmutzung'],
    minLength: 200,
    maxAttempts: 3,
    xp: 100,
    evaluationCriteria: {
      coverage: ['Kiemen-Anatomie', 'Gegenstromprinzip erklärt', 'Sauerstoffbedarf', 'Vergleich mit anderen Fischen'],
      connections: ['Anatomie → Funktion → Empfindlichkeit']
    },
    learningGoals: [
      'Versteht das Gegenstromprinzip und seine Bedeutung',
      'Kann den Zusammenhang zwischen Bau und Funktion erklären',
      'Vergleicht verschiedene Fischarten sachgerecht'
    ]
  },
  {
    id: 'wild-vs-zucht',
    title: '🏭 WILD vs. ZUCHT: Warum sind Zuchtforellen keine echten Forellen mehr?',
    question: `Angler freuen sich über dick gezüchtete Regenbogenforellen. Aber Biologen sind besorgt, wenn diese in Flüsse entlassen werden.

**ANALYSIERE die Unterschiede:**

1️⃣ **Körperbau**: Wie unterscheiden sich Wild- und Zuchtforellen äußerlich? (Schwimmblase, Flossen, Körperform)

2️⃣ **Verhalten**: Was macht eine Wildforelle bei Gefahr? Und eine Zuchtforelle? Was ist beim Laichen anders?

3️⃣ **Probleme für die Natur**: Was passiert, wenn Zuchtforellen mit Wildforellen laichen? Warum ist das gefährlich?

**ZUSATZFRAGE**: Sollte man Zuchtforellen überhaupt in Gewässer setzen? Begründe deine Meinung!`,
    context: '💡 **Tipp:** Zuchtforellen sind wie Haustiere – nützlich für den Menschen, aber nicht mehr für das Leben in der Natur geeignet.',
    hints: [
      '💡 Zuchtforellen haben oft größere Schwimmbblasen – sie müssen nicht gegen Strömung ankämpfen.',
      '💡 Wildforellen sind scheuer und schwimmen schneller weg. Zuchtforellen gewöhnen sich an Menschen.',
      '💡 Wildforellen laichen nur bei perfekten Bedingungen. Zuchtforellen laichen oft zu früh oder zu spät.',
      '💡 Die Gene von Zuchtforellen sind an Aquakulturen angepasst, nicht an Wildbäche. Bei Vermischung wird die Wildpopulation schwächer.',
      '💡 Überlege: Was ist wichtiger – glückliche Angler oder gesunde Wildpopulationen?'
    ],
    requiredKeywords: ['zucht', 'wild', 'schwimmblase', 'genetik', 'laichen', 'anpassung', 'verhalten', 'gefahr', 'population'],
    minLength: 250,
    maxAttempts: 3,
    xp: 100,
    evaluationCriteria: {
      coverage: ['Körperliche Unterschiede', 'Verhaltensunterschiede', 'Gefahren für Wildbestände', 'Eigene Meinung mit Begründung'],
      connections: ['Domestikation → Unterschiede → Konsequenzen']
    },
    learningGoals: [
      'Erkennt Unterschiede zwischen Wild- und Zuchttieren',
      'Versteht die Bedeutung von Anpassung',
      'Formuliert und begründet eine eigene Meinung'
    ]
  },
  {
    id: 'klimawandel',
    title: '🌡️ Klimawandel: Können Forellen sich anpassen?',
    question: `Die Erde wird wärmer. Für die Bachforelle ist das ein großes Problem, denn sie liebt kaltes Wasser (unter 20°C).

**ERKLÄRE das Problem Schritt für Schritt:**

1️⃣ **Warum mag die Forelle kein warmes Wasser?** 
   - Was passiert mit Sauerstoff in warmem Wasser?
   - Warum steigt der Energiebedarf der Forelle bei Wärme?

2️⃣ **Was kann die Forelle tun?**
   - Kann sie einfach weiter oben in den Bergen leben?
   - Kann sie sich an wärmeres Wasser anpassen?

3️⃣ **Welche Gefahren drohen wirklich?**
   - Was ist die "Gipfelfalle" (Summit Trap)?
   - Warum reicht Zeit nicht für Evolution?

**ABSCHLIESSEND:** Wie sieht die Zukunft der Forelle aus? Werden wir sie noch in 50 Jahren in allen Flüssen finden?`,
    context: '💡 **Tipp:** Die Forelle ist spezialisiert auf kaltes, sauerstoffreiches Wasser. Das hat Jahrmillionen gedauert. Der Klimawandel passiert in Jahrzehnten.',
    hints: [
      '💡 Warmes Wasser kann weniger Sauerstoff lösen – wie bei Limonade, die warm wird.',
      '💡 Der Stoffwechsel der Forelle steigt bei Wärme. Sie braucht mehr Sauerstoff, aber es gibt weniger im Wasser!',
      '💡 Forellen können wandern, aber irgendwann gibt es keine höheren Berge mehr. Das nennt man "Gipfelfalle".',
      '💡 Evolution braucht tausende Jahre. Der Klimawandel passiert in Jahrzehnten.',
      '💡 Überlege: Was könnte helfen? Muss die Forelle lernen, in wärmerem Wasser zu leben?'
    ],
    requiredKeywords: ['temperatur', 'sauerstoff', 'klimawandel', 'anpassung', 'gipfelfalle', 'evolution', 'wanderung', 'stoffwechsel', 'zukunft'],
    minLength: 300,
    maxAttempts: 3,
    xp: 100,
    evaluationCriteria: {
      coverage: ['Physik der Sauerstofflöslichkeit', 'Stoffwechsel-Physiologie', 'Migrationsmöglichkeiten', 'Zeit-Problematik', 'Zukunftsszenario'],
      connections: ['Temperatur → Sauerstoff → Physiologie → Migration → Evolution']
    },
    learningGoals: [
      'Versteht physikalische und physiologische Zusammenhänge',
      'Erkennt zeitliche Dimensionen von Evolution',
      'Entwickelt ein Zukunftsszenario'
    ]
  }
]

// Iterative Feedback für mehrere Versuche
export const iterativeFeedback = {
  excellent: {
    score: 85,
    responses: [
      '🦫 WOW! Das ist auf Gymnasium-Niveau! Du verstehst nicht nur die Fakten, sondern auch die Zusammenhänge zwischen Biologie, Physik und Ökologie!',
      '🦫 Hervorragend! Du argumentierst wissenschaftlich und verbindest verschiedene Fachbereiche gekonnt!',
      '🦫 Ausgezeichnet! Das ist analytisches Denken auf hohem Niveau. Du siehst das große Bild!'
    ],
    suggestions: ['Kannst du noch ein konkretes Beispiel aus der Natur nennen?', 'Was würdest du einem Freund erklären, der das nicht versteht?']
  },
  good: {
    score: 65,
    responses: [
      '🦫 Sehr gut! Du hast die wichtigsten Punkte erkannt. Jetzt fehlt noch die Verbindung zwischen den Bereichen.',
      '🦫 Gut gemacht! Du verstehst die Einzelteile. Versuche nun zu erklären, wie sie zusammenhängen.',
      '🦫 Das ist schon solide! Für die nächste Stufe: Warum passiert das alles? Was ist die Ursache?'
    ],
    suggestions: ['Versuche Ursache und Wirkung klarer zu verbinden.', 'Nutze die Hinweise für fehlende Aspekte.', 'Schreibe etwas ausführlicher zu den Verbindungen.']
  },
  acceptable: {
    score: 45,
    responses: [
      '🦫 Das ist ein Anfang! Du hast einige Fakten, aber die Erklärung fehlt. Warum ist das so?',
      '🦫 Du hast richtige Begriffe genannt, aber die Geschichte fehlt. Erzähle, wie die Dinge zusammenhängen!',
      '🦫 Nicht schlecht, aber ausbaufähig. Welche Frage versuchst du zu beantworten?'
    ],
    suggestions: ['Beginne mit einer klaren These.', 'Erkläre Schritt für Schritt.', 'Nutze alle vier Hinweise aus.', 'Lies die Aufgabe nochmal genau durch.']
  },
  insufficient: {
    score: 0,
    responses: [
      '🦫 Das ist noch zu kurz und oberflächlich. Versuche, tiefer zu graben!',
      '🦫 Ich sehe einzelne Worte, aber keine zusammenhängende Erklärung. Bau eine Brücke zwischen den Fakten!',
      '🦫 Fang nochmal an: Was ist die Kernaussage? Wie begründest du sie?'
    ],
    suggestions: ['Schreibe mindestens die geforderte Zeichenanzahl.', 'Nutze alle Hinweise.', 'Erkläre es so, als würdest du es einem Freund erklären.', 'Was würde passieren, wenn...?']
  }
}

// Keyword-Check
export function checkKeywords(text: string, requiredKeywords: string[]): {
  found: string[]
  missing: string[]
  coverage: number
} {
  const normalizedText = text.toLowerCase()
    .replace(/[äÄ]/g, 'ae')
    .replace(/[öÖ]/g, 'oe')
    .replace(/[üÜ]/g, 'ue')
    .replace(/[ß]/g, 'ss')
    .replace(/[^a-z0-9\s]/g, ' ')
  
  const found: string[] = []
  const missing: string[] = []
  
  requiredKeywords.forEach(keyword => {
    const normalizedKeyword = keyword
      .replace(/[äÄ]/g, 'ae')
      .replace(/[öÖ]/g, 'oe')
      .replace(/[üÜ]/g, 'ue')
      .replace(/[ß]/g, 'ss')
    
    if (normalizedText.includes(normalizedKeyword)) {
      found.push(keyword)
    } else {
      missing.push(keyword)
    }
  })
  
  return {
    found,
    missing,
    coverage: Math.round((found.length / requiredKeywords.length) * 100)
  }
}

// Verbesserte Bewertung mit konkreten Verbesserungsvorschlägen
export function evaluateSubmission(
  text: string, 
  challenge: BossChallenge,
  attemptNumber: number = 1,
  previousAttempts?: AttemptResult[]
): AttemptResult {
  const keywordResult = checkKeywords(text, challenge.requiredKeywords)
  
  // Längen-Score (weicher für Schüler)
  const lengthRatio = text.length / challenge.minLength
  let lengthScore = 0
  if (lengthRatio >= 1.2) lengthScore = 100
  else if (lengthRatio >= 0.8) lengthScore = 85
  else if (lengthRatio >= 0.5) lengthScore = 60
  else lengthScore = 40
  
  // Keyword-Score (40%)
  const keywordScore = keywordResult.coverage
  
  // Verbesserung-Bonus
  let improvementBonus = 0
  if (previousAttempts && previousAttempts.length > 0) {
    const lastScore = previousAttempts[previousAttempts.length - 1].score
    if (keywordResult.coverage > lastScore * 0.8) improvementBonus = 5
  }
  
  // Finaler Score
  const baseScore = (keywordScore * 0.5) + (lengthScore * 0.3)
  const finalScore = Math.min(100, Math.round(baseScore + improvementBonus))
  
  // Level bestimmen
  let level: 'excellent' | 'good' | 'acceptable' | 'insufficient'
  if (finalScore >= 85) level = 'excellent'
  else if (finalScore >= 65) level = 'good'
  else if (finalScore >= 45) level = 'acceptable'
  else level = 'insufficient'
  
  // Feedback
  const responses = iterativeFeedback[level].responses
  const feedback = responses[Math.floor(Math.random() * responses.length)]
  
  // Verbesserungsvorschläge basierend auf fehlenden Keywords
  let suggestions = [...iterativeFeedback[level].suggestions]
  if (keywordResult.missing.length > 0) {
    const missingKeywords = keywordResult.missing.slice(0, 3).join(', ')
    suggestions.push(`Vielleicht solltest du diese Begriffe einbauen: ${missingKeywords}`)
  }
  
  // Versuchsspezifisches Feedback
  if (attemptNumber === 1 && level !== 'excellent') {
    suggestions.unshift('Das war dein erster Versuch. Du hast noch 2 weitere Versuche, um es zu verbessern!')
  } else if (attemptNumber === 2) {
    suggestions.unshift('Letzte Chance! Nutze alle Hinweise und schreibe ausführlicher.')
  }
  
  return {
    attemptNumber,
    score: finalScore,
    feedback,
    level,
    suggestions,
    text
  }
}

// Vergleich zwischen Versuchen
export function compareAttempts(previous: AttemptResult, current: AttemptResult): {
  improved: boolean
  newKeywords: string[]
  message: string
} {
  const scoreDiff = current.score - previous.score
  const prevKeywords = new Set(checkKeywords(previous.text, []).found)
  const currKeywords = new Set(checkKeywords(current.text, []).found)
  const newKeywords = Array.from(currKeywords).filter(k => !prevKeywords.has(k))
  
  let message = ''
  if (scoreDiff > 10) {
    message = `🌟 Super Verbesserung! +${scoreDiff} Punkte!`
  } else if (scoreDiff > 0) {
    message = `👍 Bessere! +${scoreDiff} Punkte.`
  } else if (scoreDiff < 0) {
    message = `🔄 Versuche, die neuen Aspekte beizubehalten!`
  } else {
    message = `📝 Gleichbleibend – versuche noch tiefer zu gehen!`
  }
  
  return {
    improved: scoreDiff > 0,
    newKeywords,
    message
  }
}
