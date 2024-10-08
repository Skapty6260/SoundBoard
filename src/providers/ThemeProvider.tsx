import { useGetTheme } from '@/hooks/useGetTheme'
import {
	Dispatch,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
} from 'react'

export type ThemeType = 'light' | 'dark' | 'custom'

export type ThemeContextType = {
	theme: ThemeType
	toggle: Dispatch<SetStateAction<ThemeType>>
}

export const ThemeContext = createContext<ThemeContextType>({
	theme: 'dark',
	toggle: () => {},
})

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { currentTheme, setCurrentTheme } = useGetTheme()

	useEffect(() => {
		window.api.settings
			.getSettingsField('settings_view_selectedTheme')
			.then((theme: any) => {
				console.log(theme)
			})
	}, [])

	return (
		<ThemeContext.Provider
			value={{ theme: currentTheme, toggle: setCurrentTheme }}
		>
			{children}
		</ThemeContext.Provider>
	)
}

export const useThemeContext = () => useContext(ThemeContext)
