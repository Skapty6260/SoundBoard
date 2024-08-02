import path from 'path'
import { fileURLToPath } from 'node:url'
import { BrowserWindowConstructorOptions } from 'electron'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const mainWindow: BrowserWindowConstructorOptions = {
	// frame: false,
	center: true,
	fullscreen: false,
	title: 'Soundboard',
	roundedCorners: true,
	titleBarStyle: 'hidden',
	transparent: true,
	trafficLightPosition: {
		x: 15,
		y: 10,
	},
	vibrancy: 'under-window',
	// autoHideMenuBar: true,
	visualEffectState: 'active',

	width: 800,
	height: 600,

	minHeight: 600,
	minWidth: 800,

	webPreferences: {
		preload: path.join(__dirname, 'preload.mjs'),
		sandbox: false,
		// allowRunningInsecureContent: false,
		webSecurity: false,
		nodeIntegration: true,
		contextIsolation: true,
	},

	icon: path.join(`${process.env.VITE_PUBLIC}`, 'icon.png'),
}

const authWindow: BrowserWindowConstructorOptions = {
	width: 600,
	height: 640,
	resizable: false,
	modal: true,

	maximizable: false,
	minimizable: false,
	alwaysOnTop: true,

	webPreferences: {
		sandbox: false,
		nodeIntegrationInSubFrames: true,
	},

	frame: false,
	autoHideMenuBar: true,
}

export const trayConfig = {}

export const windowsConfig = {
	main: mainWindow,
	auth: authWindow,
}
