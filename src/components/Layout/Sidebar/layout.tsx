interface IProps<T extends any> {
	items: Array<T>
	customStyles?: {
		container?: {
			type: 'inline' | 'class'
			styles: any
		}
		ul?: {
			type: 'inline' | 'class'
			styles: any
		}
	}
	ListItem: React.JSXElementConstructor<{ item: any; key: number }>
}

export const SidebarLayout: <T>({
	items,
	ListItem,
	customStyles,
}: IProps<T>) => React.ReactElement = ({ items, ListItem, customStyles }) => {
	return (
		<nav
			className={`h-screen overflow-y-scroll ${
				customStyles?.container?.type === 'class'
					? customStyles?.container?.styles
					: ''
			}`}
		>
			<ul
				className={`flex flex-col ${
					customStyles?.ul?.type === 'class' ? customStyles?.ul?.styles : ''
				}
			`}
			>
				{items.map((item: (typeof items)[0], index: number) => {
					return <ListItem item={item} key={index} />
				})}
			</ul>
		</nav>
	)
}
