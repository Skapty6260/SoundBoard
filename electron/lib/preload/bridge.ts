import { ipcRenderer } from 'electron'
import { STORE_KEYS } from '../storage'

const IPCrenderer = {
	on(...args: Parameters<typeof ipcRenderer.on>) {
		const [channel, listener] = args
		return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
	},
	off(...args: Parameters<typeof ipcRenderer.off>) {
		const [channel, ...omit] = args
		return ipcRenderer.off(channel, ...omit)
	},
	send(...args: Parameters<typeof ipcRenderer.send>) {
		const [channel, ...omit] = args
		return ipcRenderer.send(channel, ...omit)
	},
	invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
		const [channel, ...omit] = args
		return ipcRenderer.invoke(channel, ...omit)
	},
}

const _window = {
	minimize: () => ipcRenderer.send('window/minimize'),
	maximize: () => ipcRenderer.send('window/maximize'),

	show: () => ipcRenderer.send('window/show'),
	hide: () => ipcRenderer.send('window/hide'),

	quit: () => ipcRenderer.send('window/quit'),
}

const message = {
	send: (...args: any[]) => ipcRenderer.send('message', ...args),
}

const store = {
	getValue: (key: STORE_KEYS) => ipcRenderer.invoke('store/get', key),
	setValue: (key: STORE_KEYS, value: any) =>
		ipcRenderer.invoke('store/set', key, value),
}

const songStorage = {
	openSongFolder: () => ipcRenderer.invoke('songStorage/openFolder'),
	getAllSongs: () => ipcRenderer.invoke('songStorage/getAllSongs'),
}

export const API = {
	ipcRenderer: IPCrenderer,
	window: _window,
	message: message,
	store: store,
	songStorage: songStorage,
}
