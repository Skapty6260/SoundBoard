import { registerEvent } from '../registerEvent'
import { WindowManager } from '../../services'

const openAuthWindow = async (_event: Electron.IpcMainInvokeEvent) => {
	WindowManager.openAuthWindow()
}

registerEvent('openAuthWindow', openAuthWindow)
