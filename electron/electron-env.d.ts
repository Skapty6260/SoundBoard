/// <reference types="vite-plugin-electron/electron-env" />

import { API } from './preload'

declare namespace NodeJS {
	interface ProcessEnv {
		APP_ROOT: string
		/** /dist/ or /public/ */
		VITE_PUBLIC: string
		SOUNDS_DIR: string
		STATE: string
	}
}

// Used in Renderer process, expose in `preload.ts`
declare global {
	interface Window {
		api: typeof API
	}
}
