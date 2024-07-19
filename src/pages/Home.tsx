import { CategoriesSidebar } from '@/components/Home/Categories/Sidebar'
import SoundBoard from '@/components/Home/SoundBoard'

import { RootLayout } from './layout'

const Home = () => {
	return (
		<RootLayout>
			<main className='h-screen mainBg overflow-hidden w-full flex flex-col backdrop:blur-xl text-[var(--textColor)]'>
				<div className='h-[calc(100vh-100px)] top-[100px] relative w-full flex'>
					<CategoriesSidebar />

					<SoundBoard />
				</div>
			</main>
		</RootLayout>
	)
}

export default Home
