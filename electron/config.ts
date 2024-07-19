import { BrowserWindowConstructorOptions } from 'electron'

export const windowConfiguration: BrowserWindowConstructorOptions = {
	// frame: false,
	center: true,
	fullscreen: false,
	title: 'Soundboard',
	roundedCorners: true,
	titleBarStyle: 'hidden',
	transparent: true,
	trafficLightPosition: {
		x: 15,
		y: 10,
	},
	vibrancy: 'under-window',
	// autoHideMenuBar: true,
	visualEffectState: 'active',

	width: 800,
	height: 600,

	minHeight: 600,
	minWidth: 800,
}
