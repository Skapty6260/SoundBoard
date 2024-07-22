import { ICategory } from '@shared/types/SoundTypes'
import { TSoundboardView } from '@shared/types/app'
import Store, { Schema } from 'electron-store'

interface IStorageSchema {
	// App Config
	soundStoragePath: string

	// View
	view_soundboard: string
	view_sidebar: boolean

	// Data
	userAccounts: string[]
	soundCategories: ICategory[]
	sounds: string[]
}
export type STORE_KEYS = keyof IStorageSchema

const schema: Schema<IStorageSchema> = {
	view_soundboard: {
		type: 'string',
		default: 'Сols',
	},
	view_sidebar: {
		type: 'boolean',
		default: false,
	},
	soundStoragePath: {
		type: 'string',
		default: '',
	},
	soundCategories: {
		type: 'array',
		default: [
			{
				title: 'Preinstalled',
				opened: false,
				sounds: [],
			},
		],
	},
	userAccounts: {
		type: 'array',
		default: ['Vasya', 'petya'],
	},
	sounds: {
		type: 'array',
		default: [],
	},
}

let store = new Store<IStorageSchema>({ schema })

export async function initStore() {
	store = await new Store<IStorageSchema>({ schema })
	return store
}

// Store methods
export async function getValue(key: STORE_KEYS): Promise<any | null> {
	return new Promise((resolve, reject) => {
		const value = store.get(key)
		if (value) {
			resolve(value)
		}

		reject(null)
	})
}

export async function setValue(key: STORE_KEYS, value: any) {
	try {
		await store.set(key, value)
		return [key, value]
	} catch (e) {
		console.error(e)
		return null
	}
}

export async function getLocalStorageDir() {
	return '123'
	// const dir = ''
	// // Switch with OS check;
	// await setValueIfNotExist('localStorageDir', dir)
}
