import { readdirSync } from 'fs-extra'
import { registerEvent } from '../registerEvent'
import { app, IpcMainInvokeEvent } from 'electron'
import path from 'path'
import { ISound } from '@shared/types/SoundTypes'

async function getAllSongs(_: IpcMainInvokeEvent) {
	try {
		let songs: ISound[] = []
		let storePath = await path.join(app.getPath('appData'), 'soundboard/songs')

		await readdirSync(storePath).forEach(
			file => {
				songs.push({
					name: file,
					length: 0,
					ext: file.endsWith('.mp3') ? 'mp3' : 'ogg',
					shortcut: 'none',
					author: 'unknown',
				})
			},
			{ withFileTypes: false }
		)

		return songs
	} catch (error) {
		console.error(error)
	}
}

registerEvent('song_store/get_songs', getAllSongs)
