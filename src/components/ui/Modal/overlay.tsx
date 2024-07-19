import styles from './modal.module.scss'

export const ModalOverlay = ({ onClick }: { onClick: () => void }) => {
	return <div className={styles.ModalOverlay} onClick={onClick}></div>
}
