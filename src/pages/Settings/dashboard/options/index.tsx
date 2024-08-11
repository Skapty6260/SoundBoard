import { HashTable } from '@shared/types'
import styles from '../../settings.module.scss'

export const SettingsOptionsList: React.FC<{
	activeField: string | null
	Fields: HashTable<ISettingsField>
}> = ({ activeField, Fields }) => {
	if (activeField == null)
		return (
			<ul className={`${styles.optionsList} ${styles.settingsBlock}`}>
				<div className='w-full h-full text-5xl text-[#ffffff2e] font-bold flex justify-center text-center items-center'>
					Select Field to see options
				</div>
			</ul>
		)

	return (
		<ul className={`${styles.optionsList} ${styles.settingsBlock}`}>
			{Object.keys(Fields).map((key: string) => {
				if (Fields[key].name === activeField)
					return Fields[key].fieldOptions.map((subfield: any, i: number) => {
						return (
							<li key={i} className={styles.subfield}>
								<p className='text-[var(--invTextColor)] font-bold text-2xl'>
									{subfield.optionName}
								</p>
								<div className={styles.subfieldOptionsSelector}>
									<SubfieldAppearance
										field={Fields[key]}
										optionData={subfield.optionData}
										subfield={subfield.optionSettings}
									/>
								</div>
							</li>
						)
					})
			})}
		</ul>
	)
}

import {
	IFieldOptionSettings,
	ISettingsField,
	useSettings,
} from '@/hooks/useSettings'
import { useState } from 'react'
import { SelectInput } from '@/components/ui'
import { DropdownData } from '@/components/ui/DropDown'

const SubfieldAppearance: React.FC<{
	field: any
	optionData: string
	subfield: IFieldOptionSettings
}> = ({ field, optionData, subfield }) => {
	const { setField } = useSettings()

	const initial = subfield.optionInitialValue
	const values = subfield.optionValues

	const handleClick = (
		value: any,
		select: React.Dispatch<React.SetStateAction<any>>
	) => {
		// @ts-ignore
		setField(`settings_${field.name.toLowerCase()}_${optionData}`, value)
		select(value)
	}

	switch (subfield.optionValueType) {
		case 'choice': {
			// @ts-ignore
			const [selected, select] = useState<any>(initial)

			return (
				<ul className='flex space-x-4 items-center overflow-x-hidden overflow-y-scroll text-[var(--invTextColor)]'>
					{values instanceof Function
						? 'Loading...'
						: values.map((value, index) => {
								return (
									<li key={index}>
										<button
											onClick={() => handleClick(value, select)}
											className={
												value == selected
													? 'bg-[var(--activeColor)] py-1 px-3 rounded-[15px] cursor-default transition-all duration-300'
													: 'cursor-pointer opacity-50 transition-all duration-300'
											}
										>
											{value}
										</button>
									</li>
								)
						  })}
				</ul>
			)
		}

		case 'select':
			return (
				<SelectInput
					options={values}
					selected={initial}
					variant='default'
					onSelect={(item: DropdownData) => {
						console.log(item.title)
					}}
				/>
			)

		case 'switch': {
			const [status, toggle] = useState<string>(initial)

			return (
				<div className='flex space-x-4 items-center'>
					<button
						onClick={() =>
							handleClick(status == 'true' ? 'false' : 'true', toggle)
						}
					>
						{status}
					</button>
				</div>
			)
		}

		case 'selectOne': {
			// @ts-ignore
			const [selected, select] = useState<any>(initial)

			return (
				<SelectInput
					onSelect={(item: DropdownData) => {
						handleClick(item.title, select)
					}}
					options={values}
					selected={selected}
					disableIcon={true}
					variant='default'
					onlyOne={true}
				/>
			)
		}
	}
}
