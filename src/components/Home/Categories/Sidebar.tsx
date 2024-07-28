import { motion } from 'framer-motion'

import styles from './Sidebar.module.scss'
import { Categories } from './Categories'
import { useEffect, useRef, useState } from 'react'
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
			if (value == sidebar.status) return
			if (value == null) return

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

	const ref = useRef<any>(null)
	useEffect(() => {
		let styles = window.getComputedStyle(ref.current)
		let width = parseInt(styles.width, 10)

		let x = 0

		const onMouseMoveResize = (e: MouseEvent) => {
			let dx = e.clientX - x
			x = e.clientX
			width = width + dx
			ref.current.style.width = `${width}px`
		}

		const onMouseUpResize = () => {
			document.removeEventListener('mousemove', onMouseMoveResize)
		}

		const onMouseDownResize = (e: MouseEvent) => {
			x = e.clientX

			ref.current.style.width = x + 'px'

			document.addEventListener('mousemove', onMouseMoveResize)
			document.addEventListener('mouseup', onMouseUpResize)
		}

		ref?.current?.addEventListener('mousedown', onMouseDownResize)

		return () => {
			ref?.current?.removeEventListener('mousedown', onMouseDownResize)
		}
	}, [])

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
			ref={ref}
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

			<div className={styles.resizeContainer} />
		</motion.aside>
	)
}
