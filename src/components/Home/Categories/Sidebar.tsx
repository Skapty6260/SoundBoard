import { motion } from 'framer-motion'

import styles from './Sidebar.module.scss'
import { Categories } from './Categories'
import { useState } from 'react'
import { CategoriesModal } from '@/components/Modals/CategoriesModal'
import { useAppSelector } from '@/hooks/redux'

export const CategoriesSidebar = () => {
	const [modal, setModal] = useState<{ opened: boolean }>({ opened: false })
	const { sidebar } = useAppSelector((state: any) => state.viewReducer)

	if (sidebar == false) return null
	return (
		<motion.aside
			animate={{ left: 0, position: 'relative' }}
			initial={{ position: 'absolute' }}
			exit={{ position: 'relative' }}
			transition={{ duration: 0.3, delay: 0 }}
			className={styles.container}
		>
			<button
				onClick={() => setModal({ opened: true })}
				className={styles.addCategory}
			>
				<p></p>
				<span>+</span>
			</button>

			<hr className='my-3 w-[90%] animate-pulse -py-1.5 rounded-[50%] left-[50%] -translate-x-1/2 absolute' />

			<Categories />

			{
				<CategoriesModal
					close={() => setModal({ opened: false })}
					isOpened={modal.opened}
				/>
			}
		</motion.aside>
	)
}
