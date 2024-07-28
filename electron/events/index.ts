import { app, ipcMain } from 'electron'
import { initStore, STORE_KEYS } from './store'
import { getValue, setValue } from './store'

// Custom events
import './auth/open-auth-window'
import './player/play_output'
import './song_store/open_folder'
import './song_store/get_all'

ipcMain.handle('store/get', (_, key: STORE_KEYS) => getValue(key))
ipcMain.handle('store/set', (_, key: STORE_KEYS, value: any) =>
	setValue(key, value)
)
ipcMain.on('window/quit', () => app.quit())
ipcMain.handle('ping', () => 'pong')

export { initStore }
