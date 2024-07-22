import { app, BrowserWindow, ipcMain, shell } from 'electron'
// import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { windowConfiguration } from './config'
import { getValue, initStore, setValue, STORE_KEYS } from './lib/storage'
import { ensureDir, readFileSync } from 'fs-extra'
import { getAllSongs } from './lib/storage/songs'

// const require = createRequire(import.meta.url)
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

function createWindow() {
	win = new BrowserWindow({
		...windowConfiguration,
		webPreferences: {
			preload: path.join(__dirname, 'preload.mjs'),
			sandbox: false,
			nodeIntegration: true,
			contextIsolation: true,
		},
		icon: path.join(`${process.env.VITE_PUBLIC}`, 'electron-vite.svg'),
	})

	// Test active push message to Renderer-process.
	win.webContents.on('did-finish-load', () => {
		win?.webContents.send('main-process-message', new Date().toLocaleString())
	})

	if (VITE_DEV_SERVER_URL) {
		win.loadURL(VITE_DEV_SERVER_URL)
	} else {
		// win.loadFile('dist/index.html')
		win.loadFile(path.join(RENDERER_DIST, 'index.html'))
	}
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
		win = null
	}
})

app.commandLine.appendSwitch('use-gl', 'desktop')
app.whenReady().then(async () => {
	await initStore()
	await ipcMain.handle('store/get', (_, key: STORE_KEYS) => getValue(key))
	await ipcMain.handle('store/set', (_, key: STORE_KEYS, value: any) =>
		setValue(key, value)
	)

	// Song storage
	await ipcMain.handle('songStorage/openFolder', async _ => {
		// try {
		// 	function ensureAndOpenFolder(path: string) {
		// 		ensureSongDir(path)
		// 			.then(() => {
		// 				shell.openPath(path)
		// 			})
		// 			.catch(e => console.error(e))
		// 	}

		// 	let value = await getValue('soundStoragePath')
		// 	const defaultPath = path.join(app.getPath('appData'), 'soundboard/songs')

		// 	if (!value || value?.length == 0) {
		// 		return setValue('soundStoragePath', defaultPath).then(() =>
		// 			ensureAndOpenFolder(defaultPath)
		// 		)
		// 	} else {
		// 		ensureAndOpenFolder(value)
		// 	}
		// } catch (e) {
		// 	console.error(e)
		// }

		try {
			let storePath = path.join(app.getPath('appData'), 'soundboard/songs')

			ensureSongDir(storePath).then(() => {
				shell.openPath(storePath)
			})
		} catch (error) {
			console.error(error)
		}
	})
	await ipcMain.handle('songStorage/getAllSongs', async _ => {
		try {
			let storePath = path.join(app.getPath('appData'), 'soundboard/songs')
			return getAllSongs(storePath)
		} catch (error) {
			console.error(error)
		}
	})
	await ipcMain.handle(
		'songStorage/getSoundLength',
		async (_, soundName: string) => {
			try {
				const storePath = path.join(
					app.getPath('appData'),
					`soundboard/songs/${soundName}`
				)

				const buffer = readFileSync(storePath)
				return buffer.byteLength
			} catch (error) {
				console.error(error)
			}
		}
	)

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

export async function ensureSongDir(path: string) {
	ensureDir(path)
}

ipcMain.on('window/quit', () => app.quit())
