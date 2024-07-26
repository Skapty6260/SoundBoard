import {
	BrowserWindow,
	Menu,
	MenuItem,
	MenuItemConstructorOptions,
	Tray,
	app,
	nativeImage,
	shell,
} from 'electron'
import path from 'node:path'

export class WindowManager {
	public static mainWindow: Electron.BrowserWindow | null = null

	// private static loadURL(hash = '') {
	// 	// HMR for renderer base on electron-vite cli.
	// 	// Load the remote URL for development or the local html file for production.
	// 	if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
	// 		this.mainWindow?.loadURL(
	// 			`${process.env['ELECTRON_RENDERER_URL']}#/${hash}`
	// 		)
	// 	} else {
	// 		this.mainWindow?.loadFile(
	// 			path.join(__dirname, '../renderer/index.html'),
	// 			{
	// 				hash,
	// 			}
	// 		)
	// 	}
	// }

	public static createMainWindow() {
		if (this.mainWindow) return

		this.mainWindow = new BrowserWindow({})
	}

	public static openAuthWindow() {
		if (this.mainWindow) {
			const authWindow = new BrowserWindow({
				width: 600,
				height: 640,
				backgroundColor: '#1c1c1c',
				parent: this.mainWindow,
				modal: true,
				show: false,
				maximizable: false,
				resizable: false,
				minimizable: false,
				webPreferences: {
					sandbox: false,
					nodeIntegrationInSubFrames: true,
				},
			})

			authWindow.removeMenu()

			authWindow.once('ready-to-show', () => {
				authWindow.show()
			})
		}
	}

	// public static redirect(hash: string) {
	// 	if (!this.mainWindow) this.createMainWindow()
	// 	this.loadURL(hash)

	// 	if (this.mainWindow?.isMinimized()) this.mainWindow.restore()
	// 	this.mainWindow?.focus()
	// }

	public static createSystemTray(language: string) {
		let tray
		let trayIcon = path.join(app.getAppPath(), 'assets/tray.png')

		if (process.platform === 'darwin') {
			const macIcon = nativeImage
				.createFromPath(trayIcon)
				.resize({ width: 24, height: 24 })
			tray = new Tray(macIcon)
		} else {
			tray = new Tray(trayIcon)
		}

		tray.setToolTip('Soundboard')

		if (process.platform !== 'darwin') {
			tray.addListener('click', () => {
				if (this.mainWindow) {
					if (WindowManager.mainWindow?.isMinimized())
						WindowManager.mainWindow.restore()

					WindowManager.mainWindow?.focus()
					return
				}

				this.createMainWindow()
			})

			// tray.addListener('right-click', showContextMenu)
		} else {
			// tray.addListener('click', showContextMenu)
			// tray.addListener('right-click', showContextMenu)
		}
	}
}
