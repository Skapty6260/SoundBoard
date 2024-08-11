import { TabListComponent } from '@/components/ui'

import { BiSearchAlt } from 'react-icons/bi'
import { useState } from 'react'

export const Extension_ThemesPage: React.FC<{ styles: any }> = ({ styles }) => {
	const [activeTab, setActiveTab] = useState<
		'Browse' | 'Installed' | 'Your Themes'
	>('Browse')
	// document.body.style.setProperty('--textColor', 'red')

	return (
		<section className={styles.container}>
			<header className='font-bold text-3xl'>
				<h1>Themes</h1>
				<div className={styles.search}>
					<i>
						<BiSearchAlt />
					</i>
					<input type='text' placeholder='search for theme...' />
				</div>
			</header>

			{/* tabs */}
			<TabListComponent
				Fields={[
					{ name: 'Browse' },
					{ name: 'Installed' },
					{ name: 'Your Themes' },
				]}
				variant='tertiary'
				ActiveField={activeTab}
				ListItem={({ item }) => (
					<button
						className='w-full h-full flex justify-center items-center hover:bg-[var(--semiTransparent2)] py-2 px-3 bg-[#00000092] duration-300'
						onClick={() => setActiveTab(item.name)}
					>
						{item.name}
					</button>
				)}
			/>
		</section>
	)
}
