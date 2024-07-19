export interface IContextButton {
	title: string
	icon: React.ReactNode
	onClick: (e: any, rightClickItem: any) => void
	isSpacer?: boolean
}

interface IProps {
	rightClickItem: any
	positionX: any
	positionY: any
	isToggled: boolean
	buttons: IContextButton[]
	contextMenuRef: any
}

export const ContextMenu = ({
	rightClickItem,
	positionX,
	positionY,
	isToggled,
	buttons,
	contextMenuRef,
}: IProps) => {
	return (
		<menu
			style={{
				top: positionY + 2 + 'px',
				left: positionX + 2 + 'px',
			}}
			ref={contextMenuRef}
			className={`context-menu ${isToggled ? 'active' : ''}`}
		>
			{buttons.map((btn, key) => {
				function handleClick(e: any) {
					e.stopPropagation
					btn.onClick(e, rightClickItem)
				}

				if (btn.isSpacer) return <hr key={key}></hr>

				return (
					<button
						onClick={handleClick}
						key={key}
						className='context-menu-button'
					>
						<span>{btn.icon}</span>
						<span>{btn.title}</span>
					</button>
				)
			})}
		</menu>
	)
}
