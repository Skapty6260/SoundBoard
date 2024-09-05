import { useEffect, useState } from 'react'

export const Extension_ForDevelopersSidebarGuide: React.FC<{
	setGuide: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setGuide }) => {
	const [position, setPosition] = useState<number>(15)
	const [itemsPassed, setPassed] = useState<number>(0)
	const [guideText, setText] = useState<string>('Go to home page')

	useEffect(() => {
		if (itemsPassed < 7) {
			setTimeout(() => {
				setPassed(itemsPassed + 1)
				setPosition(position + 65)

				switch (itemsPassed) {
					case 0:
						setText('List of extensions (This page)')
						break
					case 1:
						setText('Manage your created extensions (Developing page)')
						break
					case 2:
						setText('Themes Preview (for themes developing)')
						break
					case 3:
						setText('Main github Repos')
						break
					case 4:
						setText('Contact App Developer')
						break
					case 5:
						setText('Open documentation')
						break
				}
			}, 3000)
		} else {
			setGuide(false)
		}
	}, [itemsPassed])

	return (
		<div
			className='bg-[#00000072] w-screen h-screen absolute z-[200] left-0 top-0'
			onClick={() => setGuide(false)}
		>
			<p
				className='font-bold text-3xl absolute bg-[var(--neutralColor)] text-[var(--textColor)] px-4 py-2'
				style={{
					top: position + 'px',
					left: '80px',
				}}
			>
				{guideText}
			</p>
		</div>
	)
}
