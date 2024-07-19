import styles from './settings.module.scss'
import { motion } from 'framer-motion'

import { SlideRightAnimation } from '@shared/animations/framer_appear'
import { INavItem } from '@/components/Layout/NavBar/NavItems'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const NavData: INavItem[] = [
	{ title: 'Sounds', path: '/' },
	{ title: 'Workshop', path: '/workshop' },
	{ title: 'Editor', path: '/editor' },
]

const Settings = () => {
	const [data, setData] = useState('')

	// useEffect(() => {
	// 	window.api.songStorage
	// }, [])

	useEffect(() => {
		console.log(JSON.stringify(data))
	}, [data])

	return (
		<div className={`${styles.app} mainBg Poppins`}>
			<motion.nav {...SlideRightAnimation} className={styles.navbar}>
				<h1 className={styles.logo}>SoundBoard</h1>

				<ul className={styles.ul1}>
					{NavData.map((item, key) => {
						return (
							<motion.li key={key} className='text-[var(--invTextColor)]'>
								<Link to={item.path}>{item.title}</Link>
							</motion.li>
						)
					})}
				</ul>

				<ul className={styles.ul2}></ul>
			</motion.nav>

			<aside className={styles.dashboard}>
				<h1>SETTINGS</h1>
			</aside>
		</div>
	)
}

export default Settings
