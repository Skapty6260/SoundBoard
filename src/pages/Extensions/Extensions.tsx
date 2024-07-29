import { motion } from 'framer-motion'
import styles from './extensions.module.scss'
import { TabListComponent } from '@/components/ui'
import { useState } from 'react'
import { Extension_ThemesPage } from './themes'
import { ExtensionsSidebar } from './sidebar'

import gifThemes from '@/assets/backgrounds/themes.gif'
import gifAddons from '@/assets/backgrounds/addons.gif'
import gifForDevelopers from '@/assets/backgrounds/for-developers.gif'

import { Extension_AddonsPage } from './addons'
import { Extension_ForDevelopersPage } from './for-developers'

const Extensions = () => {
	const [activeField, setActiveField] = useState<string>('Addons')

	return (
		<main className='h-screen w-full Poppins'>
			<motion.img
				animate={
					activeField == 'Themes'
						? { background: '#200170d7' }
						: activeField == 'For Developers'
						? { background: '#16082b' }
						: { background: '#000' }
				}
				initial={{ background: '#000' }}
				transition={{ duration: 0.2 }}
				className='w-full h-screen object-cover'
				src={
					activeField == 'Themes'
						? gifThemes
						: activeField == 'Addons'
						? gifAddons
						: activeField == 'For Developers'
						? gifForDevelopers
						: ''
				}
			/>

			<motion.section
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.3, delay: 0.6 }}
				className={styles.topSection}
			>
				<ExtensionsSidebar />

				<div className='flex flex-col w-full h-full justify-center items-center'>
					<TabListComponent
						Fields={[
							{ name: 'Addons' },
							{ name: 'Themes' },
							{ name: 'For Developers' },
						]}
						variant='secondary'
						ActiveField={activeField}
						ListItem={({ item }) => (
							<button
								className='w-full h-full px-5 py-4 text-xl duration-200 transition-all'
								onClick={() => setActiveField(item.name)}
							>
								{item.name}
							</button>
						)}
					/>

					{activeField === 'Addons' && <Extension_AddonsPage />}
					{activeField === 'Themes' && <Extension_ThemesPage />}
					{activeField === 'For Developers' && <Extension_ForDevelopersPage />}
				</div>
			</motion.section>
		</main>
	)
}

export default Extensions
