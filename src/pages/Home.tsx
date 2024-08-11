import { CategoriesSidebar } from '@/components/Home/Categories/Sidebar'
import SoundBoard from '@/components/Home/SoundBoard'

import { RootLayout } from './layout'
import { useViewContext } from '@/providers/ViewProvider'

const Home = () => {
	const { sidebar, toggleSidebar } = useViewContext()

	// window.api.window.openAuthWindow()

	return (
		<RootLayout customNavBar={{ enableSidebar: true }}>
			<main className='h-screen mainBg overflow-hidden w-full flex flex-col backdrop:blur-xl text-[var(--textColor)]'>
				<div className='h-[calc(100vh-100px)] top-[100px] relative w-full flex'>
					{sidebar.status && (
						<CategoriesSidebar
							sidebar={sidebar}
							toggleSidebar={toggleSidebar}
						/>
					)}

					<SoundBoard />
				</div>
			</main>
		</RootLayout>
	)
}

export default Home
