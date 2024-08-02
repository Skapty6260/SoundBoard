import { windowsConfig } from '@e/config/windows'
import { IElectronModal } from '../config/modals'
import { BrowserWindow } from 'electron'

export class WindowManager {
	public static mainWindow: BrowserWindow | null

	public static openModalWindow(modal: IElectronModal) {
		if (this.mainWindow) {
			const modalWindow = new BrowserWindow({
				...modal.windowConfig,
				parent: this.mainWindow,
			})

			modalWindow.removeMenu()

			modalWindow.loadURL(modal.path)

			modalWindow.once('ready-to-show', () => {
				modalWindow.show()
			})
		}
	}

	public static openAuthWindow() {
		if (this.mainWindow) {
			const modalWindow = new BrowserWindow({
				...windowsConfig.auth,
				parent: this.mainWindow,
			})

			modalWindow.removeMenu()

			modalWindow.loadURL('http://localhost:5173/login')

			modalWindow.once('ready-to-show', () => {
				modalWindow.show()
			})
		}
	}
}
