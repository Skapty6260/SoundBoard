import { windowsConfig } from '../config/windows'
import { BrowserWindow } from 'electron'

export class WindowManager {
	public static mainWindow: BrowserWindow | null

	public static openAuthWindow(path: string) {
		if (this.mainWindow) {
			const authWindow = new BrowserWindow({
				...windowsConfig.auth,
				parent: this.mainWindow,
			})

			authWindow.removeMenu()

			authWindow.loadURL(path)

			authWindow.once('ready-to-show', () => {
				authWindow.show()
			})
		}
	}
}
