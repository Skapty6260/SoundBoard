// import { InitialUserSettings, TUserSettings_KEYS } from '@shared/types/settings'

// export const useSettings = () => {
// 	const getStore = async () => {
// 		const settings = await window.api.store.getValue('settings')

// 		if (!settings) return InitialUserSettings
// 		if (settings == null) return InitialUserSettings
// 		return settings
// 	}

// 	const getValue = (key: TUserSettings_KEYS) =>
// 		new Promise((resolve, reject) => {
// 			window.api.store
// 				.getValue()
// 				.then((value: any) => {
// 					if (!value) reject('No settings found')
// 					if (value[key] == null) return InitialUserSettings[key]
// 					else resolve(value[key])
// 				})
// 				.catch((error: any) => {
// 					reject(error)
// 				})
// 		})

// 	return { getStore, getValue }
// }
