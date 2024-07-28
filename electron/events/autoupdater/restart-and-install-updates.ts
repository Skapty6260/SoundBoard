import { app } from 'electron'
import { registerEvent } from '../registerEvent'
import updater from 'electron-updater'

const { autoUpdater } = updater

const restartAndInstallUpdate = async (_event: Electron.IpcMainInvokeEvent) => {
	autoUpdater.removeAllListeners()
	if (app.isPackaged) {
		autoUpdater.quitAndInstall(true, true)
	}
}

registerEvent('restart-and-install-update', restartAndInstallUpdate)
