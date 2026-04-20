// Boss Level Challenges - Tiefgründige Expertenfragen
// Erfordern analytisches Denken, Vernetzung und Begründungen

export interface BossChallenge {
  id: string
  title: string
  question: string
  context: string
  hints: string[]
  requiredKeywords: string[]
  minLength: number
  xp: number
  evaluationCriteria: {
    coverage: string[] // Themen die behandelt werden müssen
    connections: string[] // Verbindungen die hergestellt werden müssen
  }
}

export const bossChallenges: BossChallenge[] = [
  {
    id: 'bioindikator',
    title: '🧪 Die Forelle als Bioindikator',
    question: `Die Bachforelle gilt als "Königin der Bäche" und verschwindet als erste Fischart, wenn Gewässer verschmutzt werden. 

ERKLÄRE den ZUSAMMENHANG zwischen:
- Der anatomischen Besonderheit des Gegenstromprinzips in den Kiemen
- Dem hohen Sauerstoffbedarf der Forelle
- Ihrer Empfindlichkeit gegenüber Wasserverschmutzung

Warum überleben andere Fischarten (z.B. Karpfen) in Gewässern, in denen die Forelle verschwindet?`,
    context: 'Hinweis: Denke über Effizienz der Atmung, Energiekosten und Stoffwechselrate nach. Die Forelle ist ein "high-performance" Fisch.',
    hints: [
      'Das Gegenstromprinzip ermöglicht zwar maximalen Sauerstoffaustausch, ist aber energieaufwändig...',
      'Forellen haben einen höheren Ruhe-Sauerstoffverbrauch als viele andere Fischarten...',
      'Bei Wasserverschmutzung sinkt der Sauerstoffgehalt oft ab...',
      'Karpfen können bei niedrigem Sauerstoff zu Luftatmern werden...'
    ],
    requiredKeywords: ['gegenstromprinzip', 'sauerstoff', 'energie', 'kiemen', 'stoffwechsel', 'wirkungsgrad', 'empfindlich'],
    minLength: 250,
    xp: 100,
    evaluationCriteria: {
      coverage: ['Anatomie der Kiemen', 'Gegenstromprinzip Funktion', 'Sauerstoffbedarf', 'Vergleich mit anderen Arten'],
      connections: ['Anatomie → Physiologie → Ökologie', 'Effizienz vs. Energiekosten']
    }
  },
  {
    id: 'wild-vs-zucht',
    title: '🏭 WILD vs. ZUCHT: Evolutions-Biologie in Aktion',
    question: `Vergleiche eine WILDE Bachforelle mit einer aus ZUCHT und analysiere die ökologischen Konsequenzen:

1. ANATOMISCHE Unterschiede (Schwimmblase, Flossenform, Fettverteilung)
2. VERHALTENSWEISEN (Laichzeit-Präzision, Nahrungssuche, Fluchtverhalten)
3. GENETISCHE Anpassung (Stammhirn-Reflexe vs. gelerntes Verhalten)

Was passiert ökologisch, wenn Zuchtforellen in Wildbäche entlassen werden? Welche Gefahren bestehen für den Wildbestand?

Diskutiere auch ethische Aspekte des "Restocking" (Wiederbesetzung von Gewässern).`,
    context: 'Hinweis: Zuchtforellen werden oft für Angler ausgesetzt. Sie sind domestiziert, nicht naturangepasst.',
    hints: [
      'Zuchtforellen haben oft eine andere Schwimmblasen-Größe...',
      'Wildforellen laichen präziser zur optimalen Zeit...',
      'Zuchtforellen konkurrieren oft stärker um Ressourcen...',
      'Genetische Durchmischung kann die Wildpopulation schwächen...',
      'Zuchtforellen haben oft weniger Fluchtverhalten vor Raubtieren...'
    ],
    requiredKeywords: ['zucht', 'wild', 'schwimmblase', 'physostom', 'genetik', 'anpassung', 'konkurrenz', 'laichzeit', 'domestiziert'],
    minLength: 350,
    xp: 100,
    evaluationCriteria: {
      coverage: ['Anatomische Unterschiede', 'Verhaltensunterschiede', 'Genetische Aspekte', 'Ökologische Konsequenzen', 'Ethische Reflexion'],
      connections: ['Evolution → Domestikation → Ökologie', 'Natur vs. Zucht']
    }
  },
  {
    id: 'klimawandel',
    title: '🌡️ Klimawandel: Anpassen oder Aussterben?',
    question: `Die Bachforelle benötigt klares, sauerstoffreiches Wasser bei Temperaturen unter 20°C. 

ANALYSIERE im Detail:

1. WELCHE anatomischen Merkmale (Herz, Kiemen, Stoffwechsel-Enzyme) erklären diese Temperaturabhängigkeit?

2. WAS passiert physiologisch bei Temperaturen über 20°C? (Sauerstofflöslichkeit, Metabolismus, Stresshormone)

3. DISKUTIERE mögliche Anpassungsstrategien:
   - Verhaltensthermoregulation (Suche nach kühleren Bereichen)
   - Wanderung in höhere Regionen (Gebirgsbäche)
   - Phänotypische Plastizität vs. genetische Anpassung

4. WO liegt die Grenze des Möglichen? Welche Regionen werden die Forelle unwiderruflich verlieren?

Beziehe dich auf aktuelle Forschung zur "Summit Trap" (Gipfelfalle) bei Gebirgsarten.`,
    context: 'Hinweis: Die Erderwärmung betrifft Süßwasserökosysteme oft stärker als marine. Die Forelle ist ein Kaltwasser-Stenotherm.',
    hints: [
      'Sauerstofflöslichkeit sinkt mit steigender Temperatur...',
      'Der Fisch-Stoffwechsel steigt exponentiell mit Temperatur...',
      'Forellen können nicht zu warmen Gewässern wandern...',
      'Es gibt obere Grenzen in Gebirgsregionen (Summit Trap)...',
      'Genetische Anpassung braucht Zeit, die der Klimawandel nicht bietet...'
    ],
    requiredKeywords: ['temperatur', 'sauerstoff', 'kiemen', 'herz', 'stoffwechsel', 'habitat', 'erderwärmung', 'summit', 'adaptation', 'wanderung'],
    minLength: 400,
    xp: 100,
    evaluationCriteria: {
      coverage: ['Anatomische Grundlagen', 'Physiologische Mechanismen', 'Anpassungsstrategien', 'Raum-Zeit-Limitationen', 'Zukunftsszenarien'],
      connections: ['Anatomie → Physiologie → Klima → Ökologie', 'Evolution vs. Anthropogenem Wandel']
    }
  }
]

// Qualitative Bewertungsskala für Prof. Eich
export const bossEvaluationFeedback = {
  excellent: {
    score: 90,
    responses: [
      '🦫 BRILLANT! Deine Analyse zeigt echtes Experten-Niveau. Du verstehst nicht nur die Fakten, sondern die VERNETZUNG zwischen Anatomie, Physiologie und Ökologie!',
      '🦫 ABSOLUT BEEINDRUCKEND! Du argumentierst wie ein Biologe mit Forschungserfahrung. Die Verbindungen die du herstellst sind präzise und tiefgründig!',
      '🦫 OUTSTANDING! Das ist Master-Level Wissen! Du siehst das große Bild und verstehst die komplexen Wechselwirkungen!'
    ]
  },
  good: {
    score: 70,
    responses: [
      '🦫 Sehr gut! Du hast die wichtigsten Punkte erkannt und sinnvoll verbunden. Mit etwas mehr Tiefe wäre das Forschungsniveau!',
      '🦫 Solide Arbeit! Du verstehst die Zusammenhänge, aber einige feineren mechanistischen Details könnten noch präziser sein.',
      '🦫 Gute Analyse! Die Kernpunkte sind da. Für Top-Niveau fehlt noch die eine oder andere Vernetzungsebene.'
    ]
  },
  acceptable: {
    score: 50,
    responses: [
      '🦫 Das ist ein guter Anfang! Du hast einige wichtige Aspekte erkannt, aber die Zusammenhänge zwischen den Systemen müssen noch klarer werden.',
      '🦫 Akzeptabel, aber ausbaufähig. Du hast Fakten genannt, aber die analytische Verbindung fehlt noch. Warum ist das Gegenstromprinzip mit dem Klima verbunden?',
      '🦫 Du bist auf dem richtigen Weg! Die Einzelpunkte stimmen, aber das große Bild der Vernetzung fehlt noch.'
    ]
  },
  insufficient: {
    score: 0,
    responses: [
      '🦫 Das reicht noch nicht. Versuche, nicht nur Fakten aufzuzählen, sondern zu erklären WARUM die Forelle so empfindlich ist. Wie hängen Anatomie und Ökologie zusammen?',
      '🦫 Ich sehe einzelne richtige Begriffe, aber die Argumentationskette fehlt. Baue Brücken: Kiemenstruktur → Sauerstoffeffizienz → Energiebedarf → Umweltansprüche.',
      '🦫 Versuche es mit einem anderen Ansatz: Starte mit der Anatomie, erkläre die Physiologie, dann die ökologischen Konsequenzen. Das ist eine Kette!'
    ]
  }
}

// Keyword-Check mit semantischer Näherung
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
  
  const found: string[] = []
  const missing: string[] = []
  
  requiredKeywords.forEach(keyword => {
    const normalizedKeyword = keyword
      .replace(/[äÄ]/g, 'ae')
      .replace(/[öÖ]/g, 'oe')
      .replace(/[üÜ]/g, 'ue')
      .replace(/[ß]/g, 'ss')
    
    // Check for exact match or partial match (for compound words)
    if (normalizedText.includes(normalizedKeyword) || 
        (normalizedKeyword.length > 5 && normalizedText.includes(normalizedKeyword.substring(0, 5)))) {
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

// Qualitative Bewertung basierend auf Länge, Keywords und manueller Überprüfung
export function evaluateSubmission(
  text: string, 
  challenge: BossChallenge,
  selfAssessment: 'surface' | 'deep' | 'expert'
): {
  score: number
  feedback: string
  level: 'excellent' | 'good' | 'acceptable' | 'insufficient'
  keywordResult: ReturnType<typeof checkKeywords>
} {
  const keywordResult = checkKeywords(text, challenge.requiredKeywords)
  const lengthScore = Math.min(100, (text.length / challenge.minLength) * 100)
  const keywordScore = keywordResult.coverage
  
  // Gewichtung: Keywords 40%, Länge 30%, Selbsteinschätzung 30%
  let baseScore = (keywordScore * 0.4) + (lengthScore * 0.3)
  
  // Selbsteinschätzung berücksichtigen
  if (selfAssessment === 'expert') baseScore += 30
  else if (selfAssessment === 'deep') baseScore += 20
  else baseScore += 10
  
  // Cap bei 100
  const finalScore = Math.min(100, Math.round(baseScore))
  
  let level: 'excellent' | 'good' | 'acceptable' | 'insufficient'
  if (finalScore >= 85) level = 'excellent'
  else if (finalScore >= 65) level = 'good'
  else if (finalScore >= 45) level = 'acceptable'
  else level = 'insufficient'
  
  // Zufällige Response auswählen
  const responses = bossEvaluationFeedback[level].responses
  const feedback = responses[Math.floor(Math.random() * responses.length)]
  
  return {
    score: finalScore,
    feedback,
    level,
    keywordResult
  }
}
