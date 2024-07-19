export interface IStorageConfig_Category {
	title: string
	opened: boolean
	sounds: {
		name: string
		path: string
		author: string
		length: number
	}[]
}

export interface IStorageConfig {
	categories: IStorageConfig_Category[]
	customThemes: any
	accounts: any
}

export type GetStore = () => Promise<any[]>
