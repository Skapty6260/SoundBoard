import styles from '../extensions.module.scss'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { VscTools } from 'react-icons/vsc'
import { AiOutlineMessage } from 'react-icons/ai'
import { SiReadthedocs } from 'react-icons/si'
import { TbGridDots } from 'react-icons/tb'
import { GrView } from 'react-icons/gr'
import { FaGithubAlt } from 'react-icons/fa'
import { SidebarLayout } from '@/components/Layout/Sidebar'

interface ISidebarData {
	icon: React.ReactNode
	url?: string
	button?: boolean
}

const sidebarData = [
	{
		url: '/',
		icon: <MdOutlineKeyboardBackspace />,
	},

	{
		button: true,
		icon: <TbGridDots />,
	},

	{
		url: '/developer-profile',
		icon: <VscTools />,
	},

	{
		url: '/theme-customization-preview',
		icon: <GrView />,
	},

	{
		url: '/main-github-repos',
		icon: <FaGithubAlt />,
	},

	{
		url: '/contact-app-developer',
		icon: <AiOutlineMessage />,
	},

	{
		url: '/documentation',
		icon: <SiReadthedocs />,
	},
]

export const ExtensionsSidebar = () => {
	return (
		<SidebarLayout<ISidebarData>
			items={sidebarData}
			ListItem={({ item, key }) => {
				return (
					<li key={key}>
						{item.button ? (
							<button>{item.icon}</button>
						) : (
							<Link to={item.url}>{item.icon}</Link>
						)}
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
