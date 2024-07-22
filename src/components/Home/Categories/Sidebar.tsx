import { motion } from 'framer-motion'

import styles from './Sidebar.module.scss'
import { Categories } from './Categories'
import { useEffect, useState } from 'react'
import { CategoriesModal } from '@/components/Modals/CategoriesModal'
import { useViewContext } from '@/providers/ViewProvider'

import { FaSearch } from 'react-icons/fa'

export const CategoriesSidebar = () => {
	const [modal, setModal] = useState<{ opened: boolean }>({ opened: false })
	const { sidebar } = useViewContext()

	const [searchQuery, setSearchQuery] = useState<string>('')
	const [timer, setTimer] = useState<any>(0)

	const handleSearch = (val: string) => {
		let prevVal = searchQuery
		if (prevVal != val) {
			clearTimeout(timer)
			setTimer(
				setTimeout(() => {
					setSearchQuery(val)
				}, 500)
			)
		}
	}

	if (sidebar == false) return null
	return (
		<motion.aside
			animate={{ left: 0, position: 'relative' }}
			initial={{ position: 'absolute' }}
			exit={{ position: 'relative' }}
			transition={{ duration: 0.3, delay: 0 }}
			className={styles.container}
		>
			<motion.header>
				<button
					onClick={() => setModal({ opened: true })}
					className={styles.addCategory}
				>
					<p></p>
					<span>+</span>
				</button>

				<hr className='my-3 w-[90%] animate-pulse -py-1.5 rounded-[50%] left-[50%] -translate-x-1/2 absolute' />

				<div className={styles.search}>
					<i>
						<FaSearch />
					</i>
					<input
						onChange={(e: any) => handleSearch(e.target.value)}
						type='text'
						placeholder='Search...'
					/>
				</div>
			</motion.header>

			<Categories searchQuery={searchQuery} />

			{
				<CategoriesModal
					close={() => setModal({ opened: false })}
					isOpened={modal.opened}
				/>
			}
		</motion.aside>
	)
}
