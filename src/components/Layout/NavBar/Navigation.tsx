import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import { FaCircleUser, FaBarsStaggered } from 'react-icons/fa6'
import { IoSettingsOutline } from 'react-icons/io5'

import styles from './Navigation.module.scss'
import { NavItems } from './NavItems'
import { useMemo, useState } from 'react'
import { UserDropdown } from '@/components/Dropdowns/UserSettings'
import { useViewContext } from '@/providers/ViewProvider'

export const Navigation = () => {
	const [userSettings, openUserSettings] = useState<boolean>(false)
	const { sidebar, toggleSidebar } = useViewContext()

	useMemo(() => {
		window.api.store
			.setValue('view_soundboard', !sidebar)
			.then((value: any) => console.log(value))
	}, [toggleSidebar])

	const handleClick = () => {
		toggleSidebar(!sidebar)
	}

	return (
		<>
			<motion.nav
				animate={{ top: 10 }}
				transition={{ duration: 0.3, delay: 0.3 }}
				exit={{ position: 'relative' }}
				className={styles.navContainer}
			>
				<motion.button
					initial={{ left: -100, opacity: 0 }}
					animate={{ left: 10, opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.4 }}
					onClick={handleClick}
					className='absolute left-5 ml-5 font-bold text-4xl'
				>
					<FaBarsStaggered />
				</motion.button>

				<NavItems />

				<motion.ul
					initial={{ scale: 0, right: -100 }}
					animate={{ scale: 1, right: 10 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className={styles.ul2Container}
				>
					<li className={`${styles.settings}`}>
						<Link to={'/settings'} className={styles.Link}>
							<i>
								<IoSettingsOutline />
							</i>
						</Link>
					</li>

					<li className={styles.userSettings}>
						<motion.button
							whileTap={{ rotate: 90, scale: 0.75 }}
							transition={{ duration: 0.15 }}
							onClick={() => openUserSettings(!userSettings)}
							className={
								userSettings == true ? 'text-[var(--activeColor)]' : ''
							}
						>
							<FaCircleUser />
						</motion.button>
					</li>
				</motion.ul>
			</motion.nav>
			<AnimatePresence>{userSettings && <UserDropdown />}</AnimatePresence>
		</>
	)
}
