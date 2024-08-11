import { ipcMain } from 'electron'
import { initStore, STORE_KEYS, getValue, setValue } from './store'
import {
	getSettingsField,
	setSettingsField,
	initSettingsStore,
	SETTINGS_STORE_KEYS,
	getAllSettings,
} from './store/settings'

// Custom events
import './auth/open-auth-window'
import './player/play_output'
import './song_store/open_folder'
import './song_store/get_all'
import './windows/modal'
import './windows/quit'

ipcMain.handle('store/get', (_, key: STORE_KEYS) => getValue(key))
ipcMain.handle('store/set', (_, key: STORE_KEYS, value: any) =>
	setValue(key, value)
)
ipcMain.handle('settings/get', (_, key: SETTINGS_STORE_KEYS) =>
	getSettingsField(key)
)
ipcMain.handle('settings/set', (_, key: SETTINGS_STORE_KEYS, value: any) =>
	setSettingsField(key, value)
)
ipcMain.handle('settings/get-all', () => getAllSettings())

export { initStore, initSettingsStore }
