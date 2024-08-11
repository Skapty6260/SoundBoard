import styles from './style.module.scss'

interface IProps {
	Fields: { name: string }[] | any
	ActiveField: string | null
	ListItem: React.JSXElementConstructor<{ item: any; index?: number }>
	variant?: 'primary' | 'secondary' | 'tertiary' | 'primary-hashmap'
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
					{Fields.map((item: any, index: number) => {
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

		case 'primary-hashmap':
			return (
				<ul
					className={`${styles.tabList} ${styles.tabsListContainer} ${styles.defaultTabItem}`}
				>
					{Object.keys(Fields).map((item: any, index: number) => {
						return <ListItem item={Fields[item]} index={index} />
					})}
				</ul>
			)

		case 'secondary':
			return (
				<ul
					className={`${styles.tabsListContainerSecondary} ${styles.tabListSecondary}`}
				>
					{Fields.map((item: any, index: number) => {
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
					{Fields.map((item: any, index: number) => {
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
