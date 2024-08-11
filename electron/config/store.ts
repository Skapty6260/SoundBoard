import { TSoundboardView } from '@shared/types/app'
import { ICategory, ISound } from '@shared/types/SoundTypes'
import { Schema } from 'electron-store'

export interface IStorageSchema {
	// App Config
	soundStoragePath: string

	// View
	view_soundboard: string
	view_sidebar: boolean

	// Data
	userAccounts: string[]
	soundCategories: ICategory[]
	sounds: ISound[]
}

export interface ISettingStorageSchema {
	// View
	settings_view_soundboard: string
	settings_view_sidebar: boolean
	settings_view_selectedTheme: string
	settings_view_enabledThemes: string[]

	// App
	settings_app_closeBehavior: 'quit' | 'hide'
	settings_app_soundStoragePath: string

	// Accounts
	settings_accounts_accounts: { name: string; avatarURL: string }[]

	// Audio
	settings_audio_inputDevice: string
	settings_audio_outputDevice: string
	settings_audio_volume: number

	// Board
	settings_board_boardView: TSoundboardView
	settings_board_enabledViews: ['Cols', 'Rows', 'Cells', 'List']
	settings_board_overflowBehavior: 'scroll' | 'pagination'
}

export const storeSchema: Schema<IStorageSchema> = {
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

export const settingsStoreSchema: Schema<ISettingStorageSchema> = {
	settings_view_soundboard: {
		type: 'string',
		default: 'Сols',
	},
	settings_view_sidebar: {
		type: 'boolean',
		default: false,
	},
	settings_view_selectedTheme: {
		type: 'string',
		default: 'light',
	},
	settings_view_enabledThemes: {
		type: 'array',
		default: ['light', 'dark'],
	},
	settings_app_closeBehavior: {
		type: 'string',
		default: 'hide',
	},
	settings_app_soundStoragePath: {
		type: 'string',
		default: '',
	},
	settings_accounts_accounts: {
		type: 'array',
		default: [],
	},
	settings_audio_inputDevice: {
		type: 'string',
		default: 'none',
	},
	settings_audio_outputDevice: {
		type: 'string',
		default: 'none',
	},
	settings_audio_volume: {
		type: 'number',
		minimum: 0,
		maximum: 1,
		default: 0.5,
	},
	settings_board_boardView: {
		type: 'string',
		default: 'Сols',
	},
	settings_board_enabledViews: {
		type: 'array',
		default: ['Cols', 'Rows', 'Cells', 'List'],
	},
	settings_board_overflowBehavior: {
		type: 'string',
		default: 'scroll',
	},
}
