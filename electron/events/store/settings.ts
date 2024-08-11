import { ISettingStorageSchema, settingsStoreSchema } from '../../config/store'
import Store from 'electron-store'

export type SETTINGS_STORE_KEYS = keyof ISettingStorageSchema

let store: Store

export async function initSettingsStore() {
	// @ts-ignore
	store = await new Store<ISettingStorageSchema>({ settingsStoreSchema })
	return store
}

export async function getAllSettings(): Promise<any> {
	try {
		let value = store.store
		return value
	} catch (e) {
		console.error(e)
		return null
	}
}

export async function getSettingsField(key: SETTINGS_STORE_KEYS): Promise<any> {
	try {
		const value = await store.get(key)
		if (value) {
			return value
		} else return null
	} catch (e) {
		console.error(e)
		return null
	}
}

export async function setSettingsField(key: SETTINGS_STORE_KEYS, value: any) {
	try {
		await store.set(key, value)
		return [key, value]
	} catch (e) {
		console.error(e)
		return null
	}
}
