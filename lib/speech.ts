// Text-to-Speech with Web Speech API

export function speak(text: string): void {
  if (typeof window === 'undefined') return
  if (!('speechSynthesis' in window)) return
  
  window.speechSynthesis.cancel()
  
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'de-DE'
  utterance.rate = 0.9
  utterance.pitch = 1.0
  
  const voices = window.speechSynthesis.getVoices()
  const germanVoice = voices.find(v => v.lang.includes('de'))
  if (germanVoice) utterance.voice = germanVoice
  
  window.speechSynthesis.speak(utterance)
}

export function getRandomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)]
}
