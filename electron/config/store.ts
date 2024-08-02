import { ICategory, ISound } from '@shared/types/SoundTypes'
import { Schema } from 'electron-store'

export interface IStorageSchema {
	// App Config
	soundStoragePath: string

	// View
	view_soundboard: string
	view_sidebar: boolean

	// User Settings
	app_closeBehavior: 'quit' | 'hide'

	// Data
	userAccounts: string[]
	soundCategories: ICategory[]
	sounds: ISound[]
}

export const storeSchema: Schema<IStorageSchema> = {
	app_closeBehavior: {
		type: 'string',
		default: 'hide',
	},
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
