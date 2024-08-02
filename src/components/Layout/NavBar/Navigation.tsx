import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import { FaCircleUser } from 'react-icons/fa6'
import { IoSettingsOutline } from 'react-icons/io5'

import styles from './Navigation.module.scss'
import { NavItems } from './NavItems'
import { useState } from 'react'
import { UserDropdown } from '@/components/Dropdowns/UserSettings'
import { useViewContext } from '@/providers/ViewProvider'
import { BiExtension, BiSolidExtension } from 'react-icons/bi'
import { Hamburger } from '@/components/ui/Burger'

export interface INavBarProps {
	enableSidebar?: boolean
	settingsActive?: boolean
	extensionsActive?: boolean
}

export const Navigation = (props: INavBarProps) => {
	const [userSettings, openUserSettings] = useState<boolean>(false)
	const { sidebar, toggleSidebar } = useViewContext()

	const handleClick = () => {
		toggleSidebar({
			status: !sidebar.status,
			firstTime: true,
		})
	}

	return (
		<>
			<motion.nav
				animate={{ top: 10 }}
				transition={{ duration: 0.3, delay: 0.3 }}
				exit={{ position: 'relative' }}
				className={styles.navContainer}
			>
				{props.enableSidebar && (
					<motion.button
						initial={{ left: -100, opacity: 0 }}
						animate={{ left: 10, opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						onClick={handleClick}
						className='absolute left-5 ml-5'
					>
						<Hamburger />
					</motion.button>
				)}

				<NavItems />

				<motion.ul
					initial={{ scale: 0, right: -100 }}
					animate={{ scale: 1, right: 10 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className={styles.ul2Container}
				>
					<li
						className={
							props.settingsActive == true
								? styles.settingsActive
								: styles.settings
						}
					>
						<Link to={'/settings'} className={styles.Link}>
							<i>
								<IoSettingsOutline />
							</i>
						</Link>
					</li>

					<li className={styles.extensions}>
						<Link to={'/extensions'} className={styles.Link}>
							<i
								className={
									props.extensionsActive == true
										? 'text-[var(--textColor)]'
										: ''
								}
							>
								{props.extensionsActive == true ? (
									<BiSolidExtension />
								) : (
									<BiExtension />
								)}
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
