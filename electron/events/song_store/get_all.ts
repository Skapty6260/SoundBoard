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
					name: file.replace('.mp3', ''),
					length: 0,
					author: 'unknown',
					shortcut: 'none',
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
