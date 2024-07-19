import styles from './Sidebar.module.scss'
import { memo, useEffect, useMemo, useState } from 'react'
import { ISound, ICategory } from '@shared/types/SoundTypes'
import { motion } from 'framer-motion'

import { IoMdArrowDropup } from 'react-icons/io'

const CategoryOpened = memo(({ data }: { data: ISound[] }) => {
	return (
		<motion.ul
			animate={{ left: -3, opacity: 1 }}
			transition={{ duration: 0.3 }}
			exit={{ position: 'relative' }}
			className={styles.openedCategory}
		>
			{data.map((item: ISound, key: any) => {
				return <li key={key}>{item.name}</li>
			})}
		</motion.ul>
	)
})

export const Categories = () => {
	const [data, setData] = useState<ICategory[]>([
		{
			title: 'Preinstalled',
			opened: false,
			sounds: [],
		},
	])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [error, setError] = useState<boolean>(false)

	useEffect(() => {
		window.api.store
			.getValue('soundCategories')
			.then((value: any) => {
				setData(value)
				setIsLoading(false)
				setError(false)
			})
			.catch(() => {
				setError(true)
				setIsLoading(false)
			})
	}, [])

	useMemo(() => {
		if (!data) return
		if (data == null) return

		window.api.store
			.getValue('soundCategories')
			.then((value: any) => {
				setIsLoading(false)
				setError(false)
			})
			.catch(() => {
				setError(true)
				setIsLoading(false)
			})
	}, [data])

	if (isLoading)
		return (
			<ul className={styles.categoriesContainer}>
				<li>Loading...</li>
			</ul>
		)
	if (error)
		return (
			<ul className={styles.categoriesContainer}>
				<li>Error</li>
			</ul>
		)
	if (!data) return

	const handleClick = (item: ICategory) => {
		let temp = data
		let index = data.findIndex(i => i.title == item.title)

		temp[index].opened = !temp[index].opened
		setData([...temp])
		window.api.store.setValue('soundCategories', [...temp])
	}

	return (
		<>
			<ul className={styles.categoriesContainer}>
				{data.map((item: ICategory, key: any) => {
					return (
						<li key={key} className={styles.category}>
							<button onClick={() => handleClick(item)}>
								<i className={item.opened ? 'rotate-180' : ''}>
									<IoMdArrowDropup />
								</i>
								<p className={item.opened == true ? styles.opened : ''}>
									{item.title}
								</p>
							</button>

							{item.opened ? <CategoryOpened data={item.sounds} /> : null}
						</li>
					)
				})}
			</ul>
		</>
	)
}
