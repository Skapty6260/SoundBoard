import { registerEvent } from '../registerEvent'
import { getValue } from '../store'

async function getSongStoragePath() {
	return await getValue('soundStoragePath')
}

registerEvent('soundStorage/getSongStoragePath', getSongStoragePath)
