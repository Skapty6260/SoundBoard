import path from 'path'
import { fileURLToPath } from 'node:url'
import { windowsConfig } from './windows'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '../..')

export interface IElectronModal {
	title: string
	content: string
	path: string
	windowConfig: Electron.BrowserWindowConstructorOptions
}

export const electronModals: { [key: string]: IElectronModal } = {
	createCategory: {
		title: 'Create Category',
		content: 'Create a new category',
		path: path.join(process.env.APP_ROOT, '/pages/(Auth)/Login.tsx'),
		windowConfig: {
			width: 500,
			height: 300,
			resizable: false,
			modal: true,
			webPreferences: {
				nodeIntegration: true,
				contextIsolation: false,
			},
		},
	},

	auth: {
		title: 'Authorization',
		content: 'Create account',
		path: path.join(process.env.APP_ROOT, '/pages/(Auth)/Login.tsx'),
		windowConfig: windowsConfig.auth,
	},
}

export type TModalNames = keyof typeof electronModals
