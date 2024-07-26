import { motion } from 'framer-motion'

import styles from './Sidebar.module.scss'
import { Categories } from './Categories'
import { useEffect, useState } from 'react'
import { CategoriesModal } from '@/components/Modals/CategoriesModal'

import { FaSearch } from 'react-icons/fa'

export const CategoriesSidebar: React.FC<{
	sidebar: { status: boolean; firstTime: boolean }
	toggleSidebar: any
}> = ({ sidebar, toggleSidebar }) => {
	const [modal, setModal] = useState<{ opened: boolean }>({ opened: false })

	const [searchQuery, setSearchQuery] = useState<string>('')
	const [timer, setTimer] = useState<any>(0)

	useEffect(() => {
		window.api.store.getValue('view_sidebar').then((value: boolean) => {
			toggleSidebar({
				status: value,
				firstTime: false,
			})
		})
	}, [])

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

	return (
		<motion.aside
			animate={{ left: 0, position: 'relative' }}
			initial={{ position: 'absolute' }}
			transition={{
				duration: 0.3,
				delay: sidebar.firstTime == true ? 0 : 0.5,
			}}
			exit={{ left: -100 }}
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
