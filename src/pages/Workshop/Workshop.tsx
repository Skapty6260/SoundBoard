// import React from 'react'

import { RootLayout } from '../layout'

const Workshop = () => {
	return (
		<RootLayout>
			<main className='h-screen mainBg overflow-hidden w-full flex flex-col backdrop:blur-xl text-[var(--textColor)]'>
				<div className='h-[calc(100vh-120px)] top-[120px] relative w-full flex'>
					<h1>Workbench</h1>
				</div>
			</main>
		</RootLayout>
	)
}

export default Workshop
