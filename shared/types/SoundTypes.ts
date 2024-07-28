export interface ISound {
	name: string
	author: string
	shortcut: string
	length: number // MS
}

export interface ICategory {
	title: string
	opened: boolean
	sounds: ISound[]
}
