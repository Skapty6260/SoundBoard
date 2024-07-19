export interface ISound {
	name: string
	path: string
	author: string
	length: number // MS
}

export interface ICategory {
	title: string
	opened: boolean
	sounds: ISound[]
}
