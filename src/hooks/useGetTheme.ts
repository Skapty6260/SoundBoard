import { ThemeType } from '@/providers/ThemeProvider'
import { useMemo, useState } from 'react'

export const useGetTheme = () => {
	const [currentTheme, setCurrentTheme] = useState<ThemeType>('light')

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
