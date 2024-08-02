import { app } from 'electron'
import { registerEvent } from '../registerEvent'
import { WindowManager } from '../../services'

export async function CloseApp(
	_Event: Electron.IpcMainInvokeEvent,
	behavior: 'quit' | 'hide'
) {
	if (behavior == 'hide') {
		WindowManager.mainWindow?.hide()
	} else {
		app?.quit()
	}
}

registerEvent('window/quit', CloseApp)
