import { useAppSelector } from '@/hooks/redux'
import { Login } from './(Auth)/Login'
import { CustomBar } from '@/components/Layout/CustomBar/CustomBar'
import { Navigation } from '@/components/Layout/NavBar/Navigation'
import { memo } from 'react'

interface ILayoutProps {
	children: React.ReactNode
	customBarProps?: any
}

const Layout = (props: ILayoutProps) => {
	const authStatus = useAppSelector(state => state.authReducer)

	if (authStatus.status == false) return <Login />

	return (
		<>
			<CustomBar {...props.customBarProps} />
			<Navigation />

			{props.children}
		</>
	)
}

export const RootLayout = memo(Layout)
