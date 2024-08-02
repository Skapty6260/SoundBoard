import { useState } from 'react'
import styles from './style.module.scss'
import { FaSearch } from 'react-icons/fa'

export const SearchInput: React.FC<{
	searchQuery: string
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}> = ({ setSearchQuery, searchQuery }) => {
	const [timer, setTimer] = useState<any>(0)

	const handleSearch = (val: string) => {
		let prevVal = searchQuery
		if (prevVal != val) {
			clearTimeout(timer)
			setTimer(
				setTimeout(() => {
					setSearchQuery(val)
				}, 500)
			)
		}
	}

	return (
		<div className={styles.search}>
			<i>
				<FaSearch />
			</i>
			<input
				type='text'
				onChange={e => handleSearch(e.target.value)}
				placeholder='Search...'
				className={styles.searchInput}
			/>
		</div>
	)
}
