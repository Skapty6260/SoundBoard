import { readdirSync } from 'fs-extra'
import { registerEvent } from '../registerEvent'
import { app, IpcMainInvokeEvent } from 'electron'
import path from 'path'

async function getAllSongs(_: IpcMainInvokeEvent) {
	try {
		let songs: string[] = []
		let storePath = await path.join(app.getPath('appData'), 'soundboard/songs')

		await readdirSync(storePath).forEach(
			file => {
				songs.push(file)
			},
			{ withFileTypes: false }
		)

		return songs
	} catch (error) {
		console.error(error)
	}
}

registerEvent('song_store/get_songs', getAllSongs)
