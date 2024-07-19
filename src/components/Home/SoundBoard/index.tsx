import { motion } from 'framer-motion'
import styles from './soundboard.module.scss'
import { SoundBoardControls } from './elements/controls'
import { SoundBoardBoard } from './elements/board'

const SoundBoard = () => {
	return (
		<motion.section
			animate={{ opacity: 1 }}
			initial={{ opacity: 0 }}
			transition={{ duration: 1, delay: 0.5 }}
			className={styles.container}
		>
			<nav>
				<SoundBoardControls />
			</nav>
			<div className={styles.board}>
				<SoundBoardBoard />
			</div>
		</motion.section>
	)
}

export default SoundBoard
