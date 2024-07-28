import styles from './style.module.scss'

interface IProps {
	Fields: { name: string }[]
	ActiveField: string | null
	ListItem: React.JSXElementConstructor<{ item: any; index: number }>
	variant?: 'primary' | 'secondary'
}

export const TabListComponent: React.FC<IProps> = ({
	Fields,
	ActiveField,
	ListItem,
	variant = 'primary',
}) => {
	switch (variant) {
		case 'primary':
			return (
				<ul
					className={`${styles.tabList} ${styles.tabsListContainer} ${styles.defaultTabItem}`}
				>
					{Fields.map((item, index) => {
						return (
							<li
								key={index}
								className={ActiveField === item.name ? styles.active : ''}
							>
								<ListItem item={item} index={index} />
							</li>
						)
					})}
				</ul>
			)

		case 'secondary':
			return <div></div>
	}
}
