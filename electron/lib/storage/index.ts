import { ICategory } from '@shared/types/SoundTypes'
import Store, { Schema } from 'electron-store'

interface IStorageSchema {
	soundStoragePath: string
	userAccounts: string[]
	soundCategories: ICategory[]
}
export type STORE_KEYS = keyof IStorageSchema

const schema: Schema<IStorageSchema> = {
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
