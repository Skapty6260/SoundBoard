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
	variant = 'primary',
	data,
	style,
	motionStyles,
	staticElements,
}: {
	variant?: 'primary' | 'secondary' | 'string'
	data: DropdownData[] | string[]
	style: any
	motionStyles: {
		ul: any
		li: any
	}
	staticElements?: any
}) {
	switch (variant) {
		case 'primary': {
			return (
				<motion.ul {...motionStyles.ul} className={style.ulContainer}>
					{/* Static elements */}
					{staticElements}

					{/* Data elements */}
					{data.map((item, key) => {
						return (
							<motion.li
								{...motionStyles.li}
								className={style.liElement}
								key={key}
							>
								{typeof item !== 'string' && 'type' in item ? (
									item.type == 'button' ? (
										<DropDownButton
											styles={{
												buttonContainer:
													'group flex space-x-4 text-left items-start justify-start text-xl w-full p-3 before:absolute before:w-[85%] before:h-[2px] py-5 before:bg-[var(--textColor)] before:rounded-xl before:opacity-15 before:top-0 before:left-1/2 before:-translate-x-1/2',
												icon: 'absolute left-4 text-3xl group-hover:scale-[85%] duration-300 group-hover:-rotate-[20deg] group-active:rotate-0',
												title:
													'font-semibold pl-7 group-hover:text-[var(--activeColor)]',
											}}
											item={item}
										/>
									) : (
										<DropDownLink item={item} />
									)
								) : null}
							</motion.li>
						)
					})}
				</motion.ul>
			)
		}

		case 'secondary': {
			return (
				<motion.ul {...motionStyles.ul} className={style.ulContainer}>
					{data.map((item, key) => {
						return (
							<motion.li
								{...motionStyles.li}
								className={style.liElement}
								key={key}
							>
								{typeof item !== 'string' && 'type' in item ? (
									item.type == 'button' && 'handler' in item ? (
										// @ts-ignore
										<button onClick={() => item.handler(item)}>
											{item.title}
										</button>
									) : null
								) : null}
							</motion.li>
						)
					})}
				</motion.ul>
			)
		}

		case 'string': {
			if (data.length == 0) return <></>

			return (
				<motion.ul {...motionStyles.ul} className={style.ulContainer}>
					{staticElements}

					{data.map((item, key: number) => {
						if (typeof item !== 'string') return
						return (
							<motion.li
								{...motionStyles.li}
								className={style.liElement}
								key={key}
							>
								{item}
							</motion.li>
						)
					})}
				</motion.ul>
			)
		}
	}
}
