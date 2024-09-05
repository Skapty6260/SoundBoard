import { useState } from 'react'

export const usePlayer = () => {
	const [currentSound, setCurrentSound] = useState<string>('')

	const play = (deviceId: string, audio: HTMLAudioElement | null) => {
		if (audio == null) return

		navigator.mediaDevices
			.getUserMedia({ audio: { deviceId: deviceId } })
			.then(stream => {
				const audioContext = new AudioContext()
				const source = audioContext.createMediaStreamSource(stream)
				const destination = audioContext.destination
				source.connect(destination)
				audio.play()
			})
	}

	return {
		currentSound,
		setCurrentSound,

		play,
		load: () => {},
		pause: () => {},
	}
}
