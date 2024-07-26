import { TSoundboardView } from '@shared/types/app'
import {
	Dispatch,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'

export type ViewContextType = {
	sidebar: {
		status: boolean
		firstTime: boolean
	}
	toggleSidebar: Dispatch<
		SetStateAction<{ status: boolean; firstTime: boolean }>
	>

	soundboardView: TSoundboardView
	toggleSoundboardView: Dispatch<SetStateAction<TSoundboardView>>
}

export const ViewContext = createContext<ViewContextType>({
	sidebar: {
		status: false,
		firstTime: true,
	},
	toggleSidebar: () => {},

	soundboardView: 'Cols',
	toggleSoundboardView: () => {},
})

export const ViewProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [sidebar, setSidebar] = useState<{
		status: boolean
		firstTime: boolean
	}>({
		status: false,
		firstTime: true,
	})
	const [soundboardView, setSoundboardView] = useState<TSoundboardView>('Cols')

	// Sync with store (get)
	useEffect(() => {
		window.api.store.getValue('view_sidebar').then((value: boolean) => {
			if (value == sidebar.status) return
			setSidebar({ status: value, firstTime: false })
		})
	}, [])

	// Sync with store (set)
	useEffect(() => {
		window.api.store.setValue('view_sidebar', sidebar.status)
	}, [sidebar])
	useEffect(() => {
		window.api.store.setValue('view_soundboard', soundboardView)
	}, [soundboardView])

	return (
		<ViewContext.Provider
			value={{
				sidebar,
				toggleSidebar: setSidebar,
				soundboardView,
				toggleSoundboardView: setSoundboardView,
			}}
		>
			{children}
		</ViewContext.Provider>
	)
}

export const useViewContext = () => useContext(ViewContext)
