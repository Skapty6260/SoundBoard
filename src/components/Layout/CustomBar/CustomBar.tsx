import { IoIosCloseCircle } from 'react-icons/io'

export const CustomBar = ({ bg }: { bg?: boolean }) => {
	const handleClose = (e: any) => {
		e.preventDefault()
		window.api.settings
			.getSettingsField('settings_app_closeBehavior')
			.then((value: 'quit' | 'hide' | null) => {
				const spliced = value?.split(' ')

				if (spliced == undefined && spliced == null)
					return window.api.window.quit('hide')
				// @ts-ignore
				window.api.window.quit(spliced[0])
			})
	}

	const background = bg == false ? null : 'bg-[var(--neutralColor)]'

	return (
		<div className={`w-screen absolute z-[100] h-[10px] ${background} top-0`}>
			<div className='absolute top-0.5 right-1 text-3xl flex items-center space-x-2'>
				<button
					onClick={e => handleClose(e)}
					className={
						bg == false
							? 'text-red-200 hover:text-red-400'
							: 'text-red-600 hover:text-red-700'
					}
				>
					<IoIosCloseCircle />
				</button>
			</div>
		</div>
	)
}
