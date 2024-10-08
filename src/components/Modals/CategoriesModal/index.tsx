import Modal from '@/components/ui/Modal'
import styles from './model.module.scss'
import { useState } from 'react'
import { SelectInput } from '@/components/ui/Inputs/Select'

export const CategoriesModal = ({
	close,
	isOpened,
}: {
	close: () => void
	isOpened: boolean
}) => {
	const [name, setName] = useState<string>('')

	const handleName = (e: any) => {
		setName(e.target.value)
	}

	const handleSubmit = () => {
		window.api.store.getValue('soundCategories').then(data => {
			window.api.store.setValue('soundCategories', [
				...data,
				{ title: name, opened: false, sounds: [] },
			])
		})
	}

	if (!isOpened) return null
	return (
		<Modal close={close} header='New Category'>
			<form className={styles.container}>
				<input
					type='text'
					placeholder='Category name'
					value={name}
					onChange={handleName}
				/>
				<SelectInput
					onSelect={() => console.log('selected')}
					options={['Preinstalled']}
					variant='modal'
					selected={['Preinstalled']}
				/>

				<button className={styles.createButton} onClick={handleSubmit}>
					Create Category
				</button>
			</form>
		</Modal>
	)
}
