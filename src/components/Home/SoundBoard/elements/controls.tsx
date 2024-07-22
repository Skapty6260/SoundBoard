import styles from '../soundboard.module.scss'

import {
	FaTable,
	FaTableList,
	FaTableCells,
	FaTableColumns,
} from 'react-icons/fa6'
import { MdOutlineRefresh } from 'react-icons/md'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { TSoundboardView } from '@shared/types/app'

interface IProps {
	refresh: boolean
	setRefresh: Dispatch<boolean>

	soundboardView: TSoundboardView
	toggleSoundboardView: Dispatch<SetStateAction<TSoundboardView>>
}

export const SoundBoardControls = (props: IProps) => {
	const [variant, setVariant] = useState<TSoundboardView>(props.soundboardView)

	useMemo(() => {
		setVariant(props.soundboardView)
	}, [props.soundboardView])

	const handleClick = (view: TSoundboardView) => {
		props.toggleSoundboardView(view)
	}

	return (
		<ul
			className={`${styles.ViewControls} ${
				props.refresh == true ? styles.ViewControls_refresh : ''
			}`}
		>
			<li
				className={
					props.refresh == true ? styles.refreshActive : styles.controls_refresh
				}
			>
				<button
					disabled={props.refresh == true}
					onClick={() => props.setRefresh(true)}
				>
					<MdOutlineRefresh />
				</button>
			</li>
			<li className={variant == 'Cols' ? styles.active : ''}>
				<button
					disabled={props.refresh == true}
					onClick={() => handleClick('Cols')}
				>
					<FaTableColumns />
				</button>
			</li>
			<li className={variant == 'Rows' ? styles.active : ''}>
				<button
					disabled={props.refresh == true}
					onClick={() => handleClick('Rows')}
				>
					<FaTable />
				</button>
			</li>
			<li className={variant == 'List' ? styles.active : ''}>
				<button
					disabled={props.refresh == true}
					onClick={() => handleClick('List')}
				>
					<FaTableList />
				</button>
			</li>
			<li className={variant == 'Cells' ? styles.active : ''}>
				<button
					disabled={props.refresh == true}
					onClick={() => handleClick('Cells')}
				>
					<FaTableCells />
				</button>
			</li>
		</ul>
	)
}
