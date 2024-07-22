export const getSoundLength = (soundName: string, soundStorePath: string) => {
	return new Promise((resolve, reject) => {
		window.api
			.getSoundLength(soundName, soundStorePath)
			.then((value: number) => {
				resolve(value)
			})
			.catch(e => {
				reject(e)
			})
	})
}
