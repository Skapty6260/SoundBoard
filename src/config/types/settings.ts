export interface IUserSettings {
	title: string
	icon: React.ReactNode
	type: 'button' | 'link'
	handler?: (e: any) => void
	path?: string
}
