import { app } from 'electron'
import path from 'path'

export function getSoundPath(name: string) {
	return path.join(app.getPath('appData'), 'soundboard/songs', `${name}.mp3`)
}
