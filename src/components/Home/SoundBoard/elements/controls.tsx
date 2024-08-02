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
import { SidebarLayout } from '@/components/Layout/Sidebar'

interface IProps {
	refresh: boolean
	setRefresh: Dispatch<boolean>

	soundboardView: TSoundboardView
	toggleSoundboardView: Dispatch<SetStateAction<TSoundboardView>>
}

const SidebarData = [
	{
		name: 'Rows',
		icon: <FaTable />,
	},
	{
		name: 'List',
		icon: <FaTableList />,
	},
	{
		name: 'Cell',
		icon: <FaTableCells />,
	},
	{
		name: 'Cols',
		icon: <FaTableColumns />,
	},
	{
		name: 'Refresh',
		icon: <MdOutlineRefresh />,
	},
]

interface ISidebarData {
	icon: React.ReactNode
	name: string
}

export const SoundBoardControls = (props: IProps) => {
	const [_, setVariant] = useState<TSoundboardView>(props.soundboardView)

	useMemo(() => {
		setVariant(props.soundboardView)
	}, [props.soundboardView])

	const handleClick = (view: TSoundboardView) => {
		props.toggleSoundboardView(view)
	}

	return (
		<SidebarLayout<ISidebarData>
			items={SidebarData}
			ListItem={({ item, key }) => {
				return (
					<li key={key} className='w-full h-full'>
						<button
							onClick={
								item.name == 'Refresh'
									? () => props.setRefresh(true)
									: () => handleClick(item.name as TSoundboardView)
							}
							className={
								props.refresh == true && item.name == 'Refresh'
									? styles.refreshActive
									: props.soundboardView == item.name
									? styles.active
									: ''
							}
						>
							{item.icon}
						</button>
					</li>
				)
			}}
			customStyles={{
				container: {
					type: 'class',
					styles: styles.sidebar,
				},
			}}
		/>
	)
}
