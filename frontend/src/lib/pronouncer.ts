const getVoice = (language: string) => {
	const voices = window.speechSynthesis.getVoices()

	const pavelVoice = voices.filter(voice => voice.name.includes('Pavel'))[0]
	const firstRussianVoice = voices.filter(voice => voice.lang === language)[0]

	return pavelVoice ? pavelVoice : firstRussianVoice
}

export const pronounce = (text: string, volume: number, speed: number) => {
	const utteranceRussianLanguage = 'ru-RU'
	const utterance = new SpeechSynthesisUtterance(text)

	utterance.lang = utteranceRussianLanguage
	utterance.voice = getVoice(utterance.lang)
	utterance.rate = speed
	utterance.volume = volume

	window.speechSynthesis.speak(utterance)
}
