import { RootLayout } from '../layout'
import { motion } from 'framer-motion'
import styles from './extensions.module.scss'
import { TabListComponent } from '@/components/ui'
import { useState } from 'react'

const Extensions = () => {
	const [activeField, setActiveField] = useState<string>('Addons')

	return (
		<RootLayout customNavBar={{ extensionsActive: true }}>
			<main className='h-screen w-full mainBg Poppins'>
				<motion.section
					initial={{ paddingTop: 0, opacity: 0 }}
					animate={{ opacity: 1, paddingTop: '150px' }}
					transition={{ duration: 0.3, delay: 0.6 }}
					className={styles.topSection}
				>
					<TabListComponent
						Fields={[
							{ name: 'Addons' },
							{ name: 'Themes' },
							{ name: 'For Developers' },
						]}
						variant='secondary'
						ActiveField={activeField}
						ListItem={({ item, index }) => (
							<li className='rounded-full' key={index}>
								<button
									className='w-full h-full px-5 py-4 text-xl'
									onClick={() => setActiveField(item.name)}
								>
									{item.name}
								</button>
							</li>
						)}
					/>
				</motion.section>
			</main>
		</RootLayout>
	)
}

export default Extensions
