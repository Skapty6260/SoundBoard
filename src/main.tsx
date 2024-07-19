import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { RouterPaths } from '@/config/RouterPaths'

import './index.scss'
import { ThemeProvider } from './providers/ThemeProvider'
import { AnimatePresence } from 'framer-motion'
import { Provider } from 'react-redux'
import { store } from './providers/store'

export const Router = createBrowserRouter(RouterPaths)

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<ThemeProvider>
			<AnimatePresence>
				<RouterProvider router={Router} />
			</AnimatePresence>
		</ThemeProvider>
	</Provider>
)
