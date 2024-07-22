import { TSoundboardView } from '@shared/types/app'
import {
	Dispatch,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'

export type ViewContextType = {
	sidebar: boolean
	toggleSidebar: Dispatch<SetStateAction<boolean>>

	soundboardView: TSoundboardView
	toggleSoundboardView: Dispatch<SetStateAction<TSoundboardView>>
}

export const ViewContext = createContext<ViewContextType>({
	sidebar: false,
	toggleSidebar: () => {},

	soundboardView: 'Cols',
	toggleSoundboardView: () => {},
})

export const ViewProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [sidebar, setSidebar] = useState<boolean>(false)
	const [soundboardView, setSoundboardView] = useState<TSoundboardView>('Cols')

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
