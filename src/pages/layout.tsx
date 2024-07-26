import { CustomBar } from '@/components/Layout/CustomBar/CustomBar'
import { INavBarProps, Navigation } from '@/components/Layout/NavBar/Navigation'
import { memo } from 'react'

interface ILayoutProps {
	children: React.ReactNode
	customBarProps?: any

	customNavBar?: INavBarProps
}

const Layout = (props: ILayoutProps) => {
	return (
		<>
			<CustomBar {...props.customBarProps} />
			<Navigation {...props.customNavBar} />

			{props.children}
		</>
	)
}

export const RootLayout = memo(Layout)
