import { app, BrowserWindow, Tray } from 'electron'
import { windowsConfig, trayConfig } from './config/windows'
import { initStore } from './events'
import { WindowManager } from './services'

import path from 'node:path'
import { fileURLToPath } from 'node:url'
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

	win = new BrowserWindow({
		...windowsConfig.main,
	})

	tray = new Tray(path.join(process.env.VITE_PUBLIC + '/icon.png'))

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
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
		win = null
	}
})

app.commandLine.appendSwitch('use-gl', 'desktop')

app.whenReady().then(async () => {
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
