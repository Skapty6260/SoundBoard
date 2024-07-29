import styles from './style.module.scss'

interface IProps {
	Fields: { name: string }[]
	ActiveField: string | null
	ListItem: React.JSXElementConstructor<{ item: any }>
	variant?: 'primary' | 'secondary' | 'tertiary'
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
								<ListItem item={item} />
							</li>
						)
					})}
				</ul>
			)

		case 'secondary':
			return (
				<ul
					className={`${styles.tabsListContainerSecondary} ${styles.tabListSecondary}`}
				>
					{Fields.map((item, index) => {
						return (
							<li
								key={index}
								className={ActiveField === item.name ? styles.active : ''}
							>
								<ListItem item={item} />
							</li>
						)
					})}
				</ul>
			)

		case 'tertiary':
			return (
				<ul
					className={`${styles.tabsListContainerTertiary} ${styles.tabListTertiary}`}
				>
					{Fields.map((item, index) => {
						return (
							<li
								key={index}
								className={ActiveField === item.name ? styles.active : ''}
							>
								<ListItem item={item} />
							</li>
						)
					})}
				</ul>
			)
	}
}
