import { DropDown, DropdownData } from '@/components/ui/DropDown'
import { useEffect, useState } from 'react'

interface IProps {
	values: string[] | (() => Promise<string[]>)
	onSelect: (item: DropdownData) => void
}

const styles = {
	ul: 'absolute rounded-xl left-0 z-[1] w-full overflow-x-hidden px-4 py-3 bg-[var(--neutralColor2)]',
	li: 'w-full overflow-hidden relative',

	motionUl: {
		animate: { top: 35, opacity: 1 },
		initial: { top: '-10%', opacity: 0 },
		transition: { duration: 0.3 },
		exit: { top: '-100%' },
	},

	motionLi: {
		animate: { scale: 1 },
		initial: { scale: 0 },
		transition: { duration: 0.4 },
		exit: { scale: 0 },
	},
}

export const SelectInputDropdown: React.FC<IProps> = ({ values, onSelect }) => {
	const [data, setData] = useState<DropdownData[]>([])

	useEffect(() => {
		if (values instanceof Function) {
			values().then((cb: string[]) =>
				setData(
					cb.map((value: string) => {
						return {
							title: value,
							icon: <></>,
							type: 'button',
							handler: (item: DropdownData) => onSelect(item),
						}
					})
				)
			)
		} else {
			setData(
				values.map((value: string) => {
					return {
						title: value,
						icon: <></>,
						type: 'button',
						handler: (item: DropdownData) => onSelect(item),
					}
				})
			)
		}
	}, [])

	return (
		<DropDown
			data={data}
			variant='secondary'
			style={{ ulContainer: styles.ul, liElement: styles.li }}
			motionStyles={{
				ul: styles.motionUl,
				li: styles.motionLi,
			}}
		/>
	)
}
