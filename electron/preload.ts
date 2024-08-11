import { contextBridge } from 'electron'

import { ipcRenderer } from 'electron'
import { STORE_KEYS } from './events/store'
import { TModalNames } from './config/modals'
import { SETTINGS_STORE_KEYS } from './events/store/settings'

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

const player = {
	play_toOutput: (sound_path: string) =>
		ipcRenderer.invoke('player/playOutput', sound_path),
	play_toInput: (sound_path: string) =>
		ipcRenderer.invoke('player/playMicrophone', sound_path),
}

const _window = {
	quit: (behavior: 'quit' | 'hide') =>
		ipcRenderer.invoke('window/quit', behavior),
	openModal: (modal: TModalNames) =>
		ipcRenderer.invoke('window/openModal', modal),
	openAuthWindow: () => ipcRenderer.invoke('openAuthWindow'),
}

const store = {
	getValue: (key: STORE_KEYS) => ipcRenderer.invoke('store/get', key),
	setValue: (key: STORE_KEYS, value: any) =>
		ipcRenderer.invoke('store/set', key, value),
}

const settings = {
	getSettingsField: (key: SETTINGS_STORE_KEYS) =>
		ipcRenderer.invoke('settings/get', key),
	setSettingsField: (key: SETTINGS_STORE_KEYS, value: any) =>
		ipcRenderer.invoke('settings/set', key, value),
	getAllSettings: () => ipcRenderer.invoke('settings/get-all'),
}

const songStorage = {
	openSongFolder: () => ipcRenderer.invoke('song_store/open_folder'),
	getAllSongs: () => ipcRenderer.invoke('song_store/get_songs'),
	getSoundLength: (path: string) =>
		ipcRenderer.invoke('songStorage/getSoundLength', path),
}

export const API = {
	ipcRenderer: IPCrenderer,
	window: _window,
	store: store,
	settings: settings,
	player: player,
	songStorage: songStorage,
}

contextBridge.exposeInMainWorld('api', API)
