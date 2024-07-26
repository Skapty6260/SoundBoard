import { motion } from 'framer-motion'
import styles from './soundboard.module.scss'
import { SoundBoardControls } from './elements/controls'
import { SoundBoardBoard } from './elements/board'
import { useEffect, useState } from 'react'
import { useViewContext } from '@/providers/ViewProvider'

const SoundBoard = () => {
	const [refresh, setRefresh] = useState(false)
	const { soundboardView, toggleSoundboardView } = useViewContext()

	useEffect(() => {
		window.api.store.getValue('view_soundboard').then((value: any) => {
			toggleSoundboardView(value)
		})
	}, [])

	return (
		<motion.section
			animate={{ opacity: 1 }}
			initial={{ opacity: 0 }}
			transition={{ duration: 1, delay: 0.5 }}
			className={styles.container}
		>
			<nav>
				<SoundBoardControls
					refresh={refresh}
					setRefresh={setRefresh}
					soundboardView={soundboardView}
					toggleSoundboardView={toggleSoundboardView}
				/>
			</nav>
			<div className={styles.board}>
				<SoundBoardBoard
					loading={refresh}
					setLoading={setRefresh}
					variant={soundboardView}
				/>
			</div>
		</motion.section>
	)
}

export default SoundBoard
