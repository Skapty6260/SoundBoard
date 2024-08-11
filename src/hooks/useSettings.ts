import { ThemeType, useThemeContext } from '@/providers/ThemeProvider'
import { SETTINGS_STORE_KEYS } from '@e/events/store/settings'
import { HashTable } from '@shared/types'
import { useMemo, useState } from 'react'

export interface ISettingsField {
	name: string
	fieldOptions: IFieldOptions[]
}

export interface IFieldOptions {
	optionName: string
	optionData: string
	optionSettings: IFieldOptionSettings
}

export interface IFieldOptionSettings {
	optionValueType: 'select' | 'switch' | 'input' | 'choice' | 'selectOne'
	optionInitialValue: any
	optionValues: Array<any> | (() => Promise<string[]>)
}

const initialFields: HashTable<ISettingsField> = {
	view: {
		name: 'View',
		fieldOptions: [
			{
				optionName: 'Select Theme',
				optionData: 'selectedTheme',
				optionSettings: {
					optionValues: ['Dark', 'Light'],
					optionInitialValue: ['Dark'],
					optionValueType: 'selectOne',
				},
			},
			{
				optionName: 'Enabled Themes',
				optionData: 'enabledThemes',
				optionSettings: {
					optionValues: ['Dark', 'Light', 'Custom'],
					optionInitialValue: ['Dark', 'Light'],
					optionValueType: 'select',
				},
			},
		],
	},

	// Application
	app: {
		name: 'App',
		fieldOptions: [
			{
				optionName: 'App close behavior',
				optionData: 'closeBehavior',
				optionSettings: {
					optionValues: ['hide on tray', 'quit app'],
					optionInitialValue: 'hide on tray',
					optionValueType: 'choice',
				},
			},
		],
	},

	// Accounts
	accounts: {
		name: 'Accounts',
		fieldOptions: [
			{
				optionName: 'Columns',
				optionData: 'accounts',
				optionSettings: {
					optionValues: ['true', 'false'],
					optionInitialValue: 'false',
					optionValueType: 'switch',
				},
			},
		],
	},

	// Audio
	audio: {
		name: 'Audio',
		fieldOptions: [
			{
				optionName: 'Input Device',
				optionData: 'inputDevice',
				optionSettings: {
					optionValues: () => {
						return navigator.mediaDevices.enumerateDevices().then(devices => {
							const filtered = devices.filter(
								(d: any) => d.kind === 'audioinput'
							)

							let names: string[] = []

							if (filtered !== null && filtered !== undefined) {
								filtered.map((d: any) => names.push(d.label))
							} else names.push('No devices founded.')

							return names
						})
					},
					optionInitialValue: ['none'],
					optionValueType: 'selectOne',
				},
			},
			{
				optionName: 'Output Device',
				optionData: 'outputDevice',
				optionSettings: {
					optionValues: () => {
						return navigator.mediaDevices.enumerateDevices().then(devices => {
							const filtered = devices.filter(
								(d: any) => d.kind === 'audiooutput'
							)

							let names: string[] = []

							if (filtered !== null && filtered !== undefined) {
								filtered.map((d: any) => names.push(d.label))
							} else names.push('No devices founded.')

							return names
						})
					},
					optionInitialValue: ['none'],
					optionValueType: 'selectOne',
				},
			},
		],
	},

	// SoundBoard
	board: {
		name: 'Board',
		fieldOptions: [
			{
				optionName: 'Board Overflow',
				optionData: 'overflowBehavior',
				optionSettings: {
					optionValues: ['Scroll', 'Pagination'],
					optionInitialValue: 'Scroll',
					optionValueType: 'choice',
				},
			},

			{
				optionName: 'Board Enabled Views',
				optionData: 'enabledViews',
				optionSettings: {
					optionInitialValue: ['Cols', 'Rows', 'Cells', 'List'],
					optionValues: ['Cols', 'Rows', 'Cells', 'List'],
					optionValueType: 'select',
				},
			},
		],
	},
}

export const useSettings = () => {
	const [changed, change] = useState<{ field: string; value: any }>({
		field: '',
		value: '',
	})
	// const [Fields, setFields] = useState<HashTable<ISettingsField>>(fieldsSchema)
	const { toggle } = useThemeContext()
	const initialSettings = initialFields

	const getAllFields = async () => {
		const resp = await window.api.settings.getAllSettings()
		console.log(resp)
		return resp == null ? initialSettings : resp
	}

	const setField = async (field: SETTINGS_STORE_KEYS, value: any) => {
		const resp = await window.api.settings.setSettingsField(field, value)
		change({ field: field, value: value })
		return resp || 'Field not found'
	}

	const getField = async (name: SETTINGS_STORE_KEYS) => {
		const resp = await window.api.settings.getSettingsField(name)
		return resp == null ? initialSettings[name.split('_', 2)[1]] : resp
	}

	// Sync settings
	useMemo(() => {
		switch (changed.field) {
			case 'settings_view_selectedTheme': {
				if (typeof changed.value !== 'string') return
				toggle(changed.value.toLowerCase() as ThemeType)
				break
			}
		}
	}, [changed])

	return {
		initialSettings,
		getField,
		getAllFields,
		setField,
	}
}
