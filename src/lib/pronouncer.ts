const getVoice = (language: string) => {
	const voices = window.speechSynthesis.getVoices()

	for (const voice of voices) {
		if (voice.lang === language) {
			return voice
		}
	}

	return null
}

export const pronounce = (
	text: string,
	pause: () => void,
	resume: () => void,
	volume: number
) => {
	const utteranceRussianLanguage = 'ru-RU'
	const utterance = new SpeechSynthesisUtterance(text)

	utterance.lang = utteranceRussianLanguage
	utterance.voice = getVoice(utterance.lang)
	utterance.volume = volume

	pause()
	utterance.onend = resume

	window.speechSynthesis.speak(utterance)
}
