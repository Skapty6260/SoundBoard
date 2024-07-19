import { useLocation } from 'react-router'
import styles from './Navigation.module.scss'
import { Link } from 'react-router-dom'

const data: INavItem[] = [
	{ title: 'Sounds', path: '/' },
	{ title: 'Workshop', path: '/workshop' },
	{ title: 'Editor', path: '/editor' },
]

export interface INavItem {
	title: string
	path: any
}

export const NavItems = () => {
	const location = useLocation()

	return (
		<ul className={styles.ulContainer}>
			{data.map((item, key) => {
				return (
					<li
						key={key}
						className={location.pathname == item.path ? styles.active : ''}
					>
						<Link to={item.path}>{item.title}</Link>
					</li>
				)
			})}
		</ul>
	)
}
