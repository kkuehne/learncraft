// KI-Tutor Integration - Zentrale Engine für Professor Eich

import { forelleQuest, tutorConfig, generateTutorPrompt } from '@/plugins/biology-fishes/content/quests'

// OpenAI API Integration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

// Text-to-Speech (Web Speech API als kostenlose Alternative)
export function speak(text: string, voiceConfig?: SpeechSynthesisUtterance) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'de-DE'
    utterance.rate = 0.9  // Etwas langsamer für bessere Verständlichkeit
    utterance.pitch = 1.1 // Etwas höher für freundlichen Ton
    
    if (voiceConfig) {
      Object.assign(utterance, voiceConfig)
    }
    
    window.speechSynthesis.speak(utterance)
    return utterance
  }
  return null
}

// KI-Anfrage an OpenAI
export async function askProfessorEich(
  userMessage: string,
  context: {
    currentQuest: string
    currentLevel: 'bronze' | 'silver' | 'gold'
    currentTask: string
    attemptCount: number
    previousMessages: { role: 'user' | 'assistant', content: string }[]
  }
): Promise<{ text: string; audio?: SpeechSynthesisUtterance }> {
  
  // System-Prompt mit Kontext
  const systemPrompt = `${tutorConfig.personality}

Du begleitest einen Schüler der 5. Klasse durch die Biologie-Quest "Forelle".

AKTUELLER STATUS:
- Quest: ${context.currentQuest}
- Level: ${context.currentLevel}
- Aufgabe: ${context.currentTask}
- Versuche bisher: ${context.attemptCount}

WICHTIGE REGELN:
1. Antworte als Professor Eich (persönlich, nicht als KI)
2. Bleibe beim Thema Forelle/Biologie
3. Maximal 3-4 Sätze pro Antwort (kurz und prägnant)
4. Stelle Rückfragen, um Dialog aufrechtzuerhalten
5. Erkenne Erfolge und ermutige bei Schwierigkeiten
6. Verwende gelegentlich das Avatar-Emoji 🦫
7. Wenn der Schüler antwortet, warte mit der Bewertung bis zum nächsten Schritt

KONTEXT ZUR FORELLE:
${forelleQuest.aiContext}

AKTUELLES LEVEL (${context.currentLevel}):
${forelleQuest.levels[context.currentLevel].aiPromptContext}
`

  // Fallback ohne API Key
  if (!OPENAI_API_KEY) {
    const fallbackResponse = generateFallbackResponse(userMessage, context)
    const audio = speak(fallbackResponse)
    return { text: fallbackResponse, audio }
  }

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          ...context.previousMessages,
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 150
      })
    })

    if (!response.ok) {
      throw new Error('OpenAI API error')
    }

    const data = await response.json()
    const aiResponse = data.choices[0].message.content
    
    // Direkt vorlesen
    const audio = speak(aiResponse)
    
    return { text: aiResponse, audio }
    
  } catch (error) {
    console.error('KI-Fehler:', error)
    const fallbackResponse = generateFallbackResponse(userMessage, context)
    const audio = speak(fallbackResponse)
    return { text: fallbackResponse, audio }
  }
}

// Fallback-Antworten wenn OpenAI nicht verfügbar
function generateFallbackResponse(
  userMessage: string,
  context: {
    currentLevel: 'bronze' | 'silver' | 'gold'
    currentTask: string
    attemptCount: number
  }
): string {
  const level = context.currentLevel
  const task = context.currentTask
  
  // Ein paar vordefinierte, aber persönliche Antworten
  const responses: Record<string, string[]> = {
    bronze: [
      "🦫 Sehr gute Frage! Die Forelle hat diese Form, damit sie schnell durch das Wasser gleiten kann. Stell dir vor, du würdest gegen den Wind rennen - da willst du auch aerodynamisch sein!",
      "🦫 Das ist ein wichtiger Punkt! Schau mal genau auf die Flossen - siehst du, wie sie wie kleine Ruder wirken? Damit kann die Forelle sich lenken und stabilisieren.",
      "🦫 Fast! Die Schuppen der Forelle sind rund und glatt - wir nennen sie Cycloidschuppen. Fühl mal an deinem Arm vorbei - so glatt sind sie!"
    ],
    silver: [
      "🦫 Exakt! Die Forelle atmet mit ihren Kiemen. Das Wasser kommt durch den Mund rein, strömt über die Kiemen, und dort nimmt sie den Sauerstoff auf. Clever, oder?",
      "🦫 Die Schwimmblase ist wie ein aufblasbarer Ballon in ihrem Bauch! Wenn sie Luft aufnimmt, steigt sie hoch; wenn sie ablässt, sinkt sie. Aber Achtung: Sie atmet damit NICHT!",
      "🦫 Das Herz der Forelle hat zwei Kammern - einen Vorhof und eine Kammer. Das reicht völlig für ihren Kreislauf. Wir Menschen haben ja vier Kammern, weil wir warmblütig sind."
    ],
    gold: [
      "🦫 Die Forelle laicht im Winter, oft sogar unter Eis! Die Eier werden zwischen Kiesel im Bachboden versteckt. Das Weibchen grabt dafür sogar eine kleine Mulde!",
      "🦫 Sauberes Wasser ist überlebenswichtig! Die Forelle ist wie ein Kanarienvogel im Bergwerk - wenn sie verschwindet, wissen wir: Das Wasser ist krank. Deshalb müssen wir unsere Gewässer schützen!",
      "🦫 Ausgezeichnet beobachtet! Die Forelle ist ein Raubfisch - sie jagt Insektenlarven, kleine Fische und sogar Mäuse, die ins Wasser fallen."
    ]
  }
  
  // Zufällige Antwort aus dem passenden Level
  const levelResponses = responses[level] || responses.bronze
  const randomIndex = Math.floor(Math.random() * levelResponses.length)
  
  return levelResponses[randomIndex]
}

// Tutor-Hilfe für spezifische Aufgaben
export async function getTaskHint(
  taskId: string,
  level: 'bronze' | 'silver' | 'gold',
  wrongAnswer?: string
): Promise<string> {
  
  const hints: Record<string, string[]> = {
    'forelle-b-1': [
      "🦫 Schau auf die Seiten - da sind die paarigen Flossen. Oben ist die Rückenflosse, unten die Afterflosse. Hinten kommt die Schwanzflosse!",
      "🦫 Vergiss das kleine Fettfleckchen nicht - das liegt zwischen Rücken- und Afterflosse."
    ],
    'forelle-b-2': [
      "🦫 Die Forelle muss ständig schwimmen - warum wohl? Damit Wasser über die Kiemen strömt!",
      "🦫 Keine Lunge! Stell dir vor, du müsstest mit offenem Mund durch Wasser 'atmen'..."
    ],
    'forelle-s-1': [
      "🦫 Mund auf → Kiemen → Sauerstoff wird aufgenommen → Wasser raus durch die Kiemendeckel.",
      "🦫 Die Kiemen sind wie Filter - voller feiner Kiemenblättchen."
    ],
    'forelle-s-2': [
      "🦫 Die Schwimmblase ist mit dem Darm verbunden - das nennen wir 'Physostom'.",
      "🦫 Herz ganz klein, Schwimmblase mittig, Leber vorne."
    ],
    'forelle-g-2': [
      "🦫 Dezember bis Februar - mitten im Winter! Warum da? Wenig Konkurrenz!",
      "🦫 Flussaufwärts, Kiesgrund - die Eier müssen zwischen Steinen haften bleiben."
    ],
    'forelle-g-4': [
      "🦫 Überfischung, Gewässerverschmutzung, Stauwehre - alles Hindernisse für die Forelle.",
      "🦫 Schonzeiten und Besatz helfen. Aber am wichtigsten: Sauberes Wasser!"
    ]
  }
  
  const taskHints = hints[taskId] || ["🦫 Schau nochmal genau hin - du schaffst das!"]
  
  // Bei wiederholtem Fehler spezifischer werden
  if (wrongAnswer) {
    return `${taskHints[0]} Deine Antwort "${wrongAnswer}" war nah dran, aber schau nochmal...`
  }
  
  return taskHints[0]
}

// Begrüßung je nach Level-Fortschritt
export function getWelcomeMessage(level: 'bronze' | 'silver' | 'gold' | 'new'): string {
  if (level === 'new') {
    return tutorConfig.welcomeMessages.bronze
  }
  return tutorConfig.welcomeMessages[level] || tutorConfig.welcomeMessages.bronze
}

// XP-Feedback durch Tutor
export function getXPFeedback(xp: number, isLevelUp: boolean): string {
  if (isLevelUp) {
    return `🦫 Wahnsinn! Level-Up! Du hast jetzt genug XP für das nächste Level. Ich bin stolz auf dich! Weiter so! 🎉`
  }
  
  if (xp >= 50) {
    return `🦫 Hervorragend! +${xp} XP! Du sammelst XP wie ein Eichhörnchen Nüsse!`
  } else if (xp >= 25) {
    return `🦫 Gut gemacht! +${xp} XP! Jeder Schritt zählt!`
  } else {
    return `🦫 +${xp} XP! Nicht aufgeben, beim nächsten Mal wird es noch besser!`
  }
}

// Motivation bei Schwierigkeiten
export function getEncouragement(attemptCount: number): string {
  const encouragements = [
    "🦫 Kein Problem! Lernen bedeutet ausprobieren. Schauen wir uns das nochmal an.",
    "🦫 Das ist ein kniffliger Punkt - viele Schüler brauchen hier mehrere Versuche.",
    "🦫 Du bist dran! Denke an die Grundregel: Die Forelle atmet mit...?",
    "🦫 Fast! Du bist auf der richtigen Spur. Ein kleiner Schubser noch...",
    "🦫 Ich sehe, du gibst nicht auf - das ist die wichtigste Eigenschaft eines Forschers!"
  ]
  
  const index = Math.min(attemptCount - 1, encouragements.length - 1)
  return encouragements[index]
}

// Zusammenfassung am Ende einer Quest
export async function getQuestSummary(
  level: 'bronze' | 'silver' | 'gold',
  xpEarned: number
): Promise<string> {
  const summaries = {
    bronze: `🦫 Fantastisch! Bronze-Level gemeistert! Du kennst jetzt die äußere Anatomie der Forelle. Merke dir: Stromlinienform für Schnelligkeit, Flossen für Lenkung, Schuppen für Schutz. ${xpEarned} XP verdient - klasse!`,
    silver: `🦫 Beeindruckend! Silber-Level geschafft! Du verstehst jetzt, wie die Forelle atmet (Kiemen!) und warum die Schwimmblase so wichtig ist. Das war schon anspruchsvoll! Weiter geht's!`,
    gold: `🦫 WAHNSINN! Gold-Level erreicht! Du bist jetzt ein echter Forellen-Experte! Du weißt alles über Anatomie, Atmung, Fortpflanzung und Lebensraum. Ich bin beeindruckt! 🏆`
  }
  
  return summaries[level]
}
