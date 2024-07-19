import styles from './Login.module.scss'
import { CustomBar } from '@/components/Layout/CustomBar/CustomBar'
import { motion } from 'framer-motion'

export const Login = () => {
	return (
		<main className={styles.Main}>
			<CustomBar bg={false} />

			<motion.div
				animate={{ top: '-770px' }}
				transition={{ duration: 0.5, delay: 0.3 }}
				className={styles.title}
			>
				<div className={styles.textWrapper} />
				<h1>SoundBoard</h1>
			</motion.div>

			<form className={styles.LoginForm}>
				<h1 className='font-semibold text-[var(--textColor)] text-xl'>Login</h1>
			</form>
		</main>
	)
}
