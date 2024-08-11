import styles from '../soundboard.module.scss'

import {
	FaTable,
	FaTableList,
	FaTableCells,
	FaTableColumns,
} from 'react-icons/fa6'
import { RiSettings5Fill } from 'react-icons/ri'
import { BsFillGrid1X2Fill } from 'react-icons/bs'
import { FaMicrophone } from 'react-icons/fa'
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

const SBViews = [
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
]

const SBTop = [
	{ name: '', icon: <FaMicrophone /> },
	{ name: '', icon: <BsFillGrid1X2Fill /> },
	{ name: '', icon: <div />, separator: true },
]

const SBBottom = [
	{ name: '', icon: <div />, separator: true },
	{
		name: 'Refresh',
		icon: <MdOutlineRefresh />,
	},
	{ name: '', icon: <RiSettings5Fill /> },
]

const SidebarData = [...SBTop, ...SBViews, ...SBBottom]

interface ISidebarData {
	icon: React.ReactNode
	name: string
	separator?: boolean
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
					<li
						key={key}
						className={`w-full h-full ${
							item.separator == true ? 'cursor-not-allowed' : ''
						}`}
					>
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
