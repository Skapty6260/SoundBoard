import { app, BrowserWindow, dialog, Menu, MenuItem, Tray } from 'electron'
import { windowsConfig } from './config/windows'
import { initStore } from './events'
import { WindowManager } from './services'
// @ts-ignore
import pluginManager from 'pluggable-electron/main'

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { initSettingsStore } from './events/store/settings'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
	? path.join(process.env.APP_ROOT, 'public')
	: RENDERER_DIST

process.env.STORAGE_DIR = path.join(process.env.APP_ROOT, 'storage')

let win: BrowserWindow | null
let tray: Tray | null

async function createWindow() {
	await import('./events')
	await initStore()
	await initSettingsStore()

	win = new BrowserWindow({
		...windowsConfig.main,
	})

	tray = new Tray(path.join(process.env.VITE_PUBLIC + '/icon.png'))
	tray.setToolTip('Soundboard')

	const trayContextMenu = Menu.buildFromTemplate([
		{ label: 'Open', type: 'normal', click: () => win?.show() },
		{
			label: 'Exit',
			type: 'normal',
			click: () => {
				console.log('Menu/Quit was clicked')
				app.quit()
			},
		},
	])

	tray.setContextMenu(trayContextMenu)

	tray.on('click', () => {
		tray?.popUpContextMenu()
	})

	WindowManager.mainWindow = win

	// Test active push message to Renderer-process.
	win.webContents.on('did-finish-load', () => {
		win?.webContents.send('main-process-message', new Date().toLocaleString())
	})

	if (VITE_DEV_SERVER_URL) {
		win.loadURL(VITE_DEV_SERVER_URL)
	} else {
		win.loadFile(path.join(RENDERER_DIST, 'index.html'))
	}

	if (!app.isPackaged) win.webContents.openDevTools()
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
		win = null
	}
})

app.commandLine.appendSwitch('use-gl', 'desktop')

app.whenReady().then(async () => {
	// Init plugins
	pluginManager.init({
		// Function to check from the main process that user wants to install a plugin
		confirmInstall: async (plugins: any) => {
			const answer = await dialog.showMessageBox({
				message: `Are you sure you want to install the plugin ${plugins.join(
					', '
				)}`,
				buttons: ['Ok', 'Cancel'],
				cancelId: 1,
			})
			console.log('Main:', answer)
			return answer.response == 0
		},
		// Path to install plugin to
		pluginsPath: path.join(app.getPath('userData'), 'plugins'),
	})

	const ctxMenu = new Menu()
	ctxMenu.append(
		new MenuItem({
			label: 'Edit category',
		})
	)

	win?.webContents.on('context-menu', function (_e, params) {
		// @ts-ignore;
		ctxMenu.popup({ window: win, x: params.x, y: params.y })
	})

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow()
		}
	})

	createWindow()

	app.on('will-finish-launching', () => {
		win?.show()
	})
})
