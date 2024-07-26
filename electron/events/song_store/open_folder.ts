import { app, IpcMainInvokeEvent, shell } from 'electron'
import path from 'path'
import { registerEvent } from '../registerEvent'
import { ensureDir } from 'fs-extra'

export async function ensureSongDir(path: string) {
	ensureDir(path)
}

const openFolder = async (_event: IpcMainInvokeEvent) => {
	try {
		let storePath = path.join(app.getPath('appData'), 'soundboard/songs')

		ensureSongDir(storePath).then(() => {
			shell.openPath(storePath)
		})
	} catch (error) {
		console.error(error)
	}
}

registerEvent('song_store/open_folder', openFolder)
