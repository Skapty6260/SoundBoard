// import styles from './style.module.scss'
import { SelectInputDropdown } from '@/components/Dropdowns/SelectInput'
import { useState } from 'react'
import { CiBoxList } from 'react-icons/ci'
import { DropdownData } from '../../DropDown'

interface IProps {
	options: string[] | (() => Promise<any>)
	variant: 'modal' | 'default'
	selected: string[]
	onSelect: (item: DropdownData) => void
	onlyOne?: boolean
	disableIcon?: boolean
	inputProps?: any
}

export const SelectInput: React.FC<IProps> = ({
	options,
	selected,
	variant = 'default',
	onlyOne = false,
	onSelect,
	disableIcon = false,
	inputProps,
}) => {
	const [toggled, toggle] = useState<boolean>(false)

	switch (variant) {
		case 'default':
			return (
				<>
					<button
						{...inputProps}
						onClick={() => toggle(!toggled)}
						className='bg-[var(--neutralColor)] relative text-center justify-center w-[50vw] flex flex-wrap items-center space-x-1 py-1 px-3 rounded-[15px] text-[var(--textColor)]'
					>
						{disableIcon == true ? null : (
							<i className='pr-2 opacity-60'>
								<CiBoxList />
							</i>
						)}
						<ul className='flex space-x-1'>
							{onlyOne == true ? (
								<li>
									<button>{selected}</button>
								</li>
							) : (
								selected.map((value: string, index: number) => (
									<li key={index} className='flex-[1 0 50%]'>
										<button>
											{selected.length - 1 == index ? value : `${value},`}
										</button>
									</li>
								))
							)}
						</ul>
						{toggled && (
							<SelectInputDropdown onSelect={onSelect} values={options} />
						)}
					</button>
				</>
			)
		case 'modal':
			return <button>123</button>
	}
}
