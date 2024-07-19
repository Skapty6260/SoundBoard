import { createPortal } from 'react-dom'
import { ModalOverlay } from './overlay'

import { GrClose } from 'react-icons/gr'
import styles from './modal.module.scss'
import { motion } from 'framer-motion'

interface IModalProps {
	children: React.ReactNode
	header: string
	close: () => void
}

const Modal = ({ children, header, close }: IModalProps) => {
	return createPortal(
		<>
			<ModalOverlay onClick={close} />
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className={styles.Modal}
			>
				<header>
					<span>{header}</span>
					<button onClick={close}>
						<GrClose />
					</button>
				</header>

				<hr />

				<div>{children}</div>
			</motion.div>
		</>,
		document.getElementById('modal-root')!
	)
}

export default Modal
