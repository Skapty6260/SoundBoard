import { motion } from 'framer-motion'
import DropDownButton from './ListElements/button'
import DropDownLink from './ListElements/Link'

export interface DropdownData {
	title: string
	icon: React.ReactNode
	type: 'button' | 'link'
	handler?: (e: any) => void
	path?: string
}

export function DropDown({
	data,
	style,
	motionStyles,
	staticElements,
}: {
	data: DropdownData[]
	style: any
	motionStyles: {
		ul: any
		li: any
	}
	staticElements?: any
}) {
	return (
		<motion.ul {...motionStyles.ul} className={style.ulContainer}>
			{/* Static elements */}
			{staticElements}

			{/* Data elements */}
			{data.map((item, key) => {
				return (
					<motion.li {...motionStyles.li} className={style.liElement} key={key}>
						{item.type == 'button' ? (
							<DropDownButton item={item} />
						) : (
							<DropDownLink item={item} />
						)}
					</motion.li>
				)
			})}
		</motion.ul>
	)
}
