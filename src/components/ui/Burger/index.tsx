import styles from './burger.module.scss'
import { useState } from 'react'

export const Hamburger: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false)

	if (isOpen == true) {
		return (
			<button onClick={() => setIsOpen(!isOpen)} className={styles.logoIcon}>
				<div className={styles.hamburgerIconContainer}>
					<div className={styles.hamburgerLine1Open} />
					<div className={styles.hamburgerLine3Open} />
				</div>
			</button>
		)
	} else
		return (
			<button onClick={() => setIsOpen(!isOpen)} className={styles.logoIcon}>
				<div className={styles.hamburgerIconContainer}>
					<div className={styles.hamburgerLine1} />
					<div className={styles.hamburgerLine2} />
					<div className={styles.hamburgerLine3} />
				</div>
			</button>
		)
}
