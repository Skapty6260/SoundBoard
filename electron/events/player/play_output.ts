import { registerEvent } from '../registerEvent'

import path from 'path'
import { app } from 'electron'

const playOutput = async (
	_event: Electron.IpcMainInvokeEvent,
	sound_name: string
) => {
	let storePath = await path.join(app.getPath('appData'), 'soundboard/songs')
	const sound_path = path.join(`${storePath}/${sound_name}.mp3`)

	return sound_path
}

registerEvent('player/playOutput', playOutput)
