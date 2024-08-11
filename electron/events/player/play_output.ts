import { app } from 'electron'
import { registerEvent } from '../registerEvent'

import path from 'node:path'

const playOutput = async (
	_event: Electron.IpcMainInvokeEvent,
	sound_name: string
) => {
	const sound_path = path.join(
		app.getPath('appData'),
		'soundboard/songs',
		`${sound_name}`
	)

	return sound_path
}

registerEvent('player/playOutput', playOutput)
