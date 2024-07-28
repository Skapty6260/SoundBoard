import { registerEvent } from '../registerEvent'
import { WindowManager } from '../../services'

const openAuthWindow = async (_event: Electron.IpcMainInvokeEvent) => {
	// WindowManager.openAuthWindow('http://localhost:4200')
}

registerEvent('openAuthWindow', openAuthWindow)
