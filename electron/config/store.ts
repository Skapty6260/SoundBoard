import { ICategory } from '@shared/types/SoundTypes'
import { Schema } from 'electron-store'
import { IUserSettings } from './user_settings'

export interface IStorageSchema {
	// App Config
	soundStoragePath: string

	// View
	view_soundboard: string
	view_sidebar: boolean

	// User Settings
	settings: IUserSettings

	// Data
	userAccounts: string[]
	soundCategories: ICategory[]
	sounds: string[]
}

export const storeSchema: Schema<IStorageSchema> = {
	settings: {
		type: 'object',
		default: {},
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
