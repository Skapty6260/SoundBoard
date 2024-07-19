import styles from '../soundboard.module.scss'

import {
	FaTable,
	FaTableList,
	FaTableCells,
	FaTableColumns,
} from 'react-icons/fa6'
import { MdOutlineRefresh } from 'react-icons/md'

export const SoundBoardControls = () => {
	const handleClick = (view: string) => {
		console.log(view)
	}

	const handleRefresh = () => {}

	return (
		<ul className={styles.ViewControls}>
			<li>
				<button className={styles.controls_refresh} onClick={handleRefresh}>
					<MdOutlineRefresh />
				</button>
			</li>
			<li>
				<button onClick={() => handleClick('Cols')}>
					<FaTableColumns />
				</button>
			</li>
			<li>
				<button onClick={() => handleClick('Rows')}>
					<FaTable />
				</button>
			</li>
			<li>
				<button onClick={() => handleClick('List')}>
					<FaTableList />
				</button>
			</li>
			<li>
				<button onClick={() => handleClick('Cells')}>
					<FaTableCells />
				</button>
			</li>
		</ul>
	)
}
