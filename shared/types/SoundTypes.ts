export interface ISound {
	name: string
	author: string
	shortcut: string
	ext: 'mp3' | 'ogg'
	length: number // MS
}

export interface ICategory {
	title: string
	opened: boolean
	sounds: ISound[]
}
