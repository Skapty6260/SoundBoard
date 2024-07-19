import { readdirSync } from 'fs-extra'
import { getValue } from '..'

export async function getSongStoragePath() {
	return await getValue('soundStoragePath')
}

export async function getAllSongs(path: string) {
	let songs: string[] = []

	await readdirSync(path).forEach(file => {
		songs.push(file)
	})

	return songs
}
