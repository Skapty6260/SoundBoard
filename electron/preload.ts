import { contextBridge } from 'electron'

import { ipcRenderer } from 'electron'
import { STORE_KEYS } from './events/store'

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
	quit: () => ipcRenderer.send('window/quit'),
}

const store = {
	getValue: (key: STORE_KEYS) => ipcRenderer.invoke('store/get', key),
	setValue: (key: STORE_KEYS, value: any) =>
		ipcRenderer.invoke('store/set', key, value),
}

const songStorage = {
	openSongFolder: () => ipcRenderer.invoke('song_store/open_folder'),
	getAllSongs: () => ipcRenderer.invoke('song_store/get_songs'),
	getSoundLength: (path: string) =>
		ipcRenderer.invoke('songStorage/getSoundLength', path),
	playSound: (path: string) =>
		ipcRenderer.invoke('songStorage/playSound', path),
}

export const API = {
	ipcRenderer: IPCrenderer,
	window: _window,
	store: store,
	songStorage: songStorage,
}

contextBridge.exposeInMainWorld('api', API)
