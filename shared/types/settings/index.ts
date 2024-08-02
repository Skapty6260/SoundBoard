export interface IUserSettings {
	app: {
		close_behavior: 'exit' | 'hide'
	}
}

export const InitialUserSettings: IUserSettings = {
	app: {
		close_behavior: 'hide',
	},
}

export type TUserSettings_KEYS = keyof IUserSettings
