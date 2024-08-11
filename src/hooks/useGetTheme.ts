import { ThemeType } from '@/providers/ThemeProvider'
import { useEffect, useMemo, useState } from 'react'

export const useGetTheme = () => {
	const [currentTheme, setCurrentTheme] = useState<ThemeType>('light')

	useEffect(() => {
		console.warn('Theme Provider Rerendered')

		window.api.settings
			.getSettingsField('settings_view_selectedTheme')
			.then((theme: string) => {
				if (theme == currentTheme) return
				else {
					setCurrentTheme(theme.toLowerCase() as ThemeType)
				}
			})
	}, [])

	useMemo(() => {
		switch (currentTheme) {
			case 'light':
				document.body.className = 'light'
				break
			case 'dark':
				document.body.className = 'dark'
				break
			case 'custom':
				document.body.className = 'custom'
				break
			default:
				document.body.className = 'light'
		}
	}, [currentTheme])

	return { currentTheme, setCurrentTheme }
}
