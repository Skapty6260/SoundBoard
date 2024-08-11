import { RootExtensionsLayout } from '@/components/Layout/Extensions/Root'

const DeveloperDashboardPage = () => {
	return (
		<RootExtensionsLayout
			activeField='For Developers'
			setActiveField={() => null}
			NavbarFields={[
				{ name: 'Addons' },
				{ name: 'Themes' },
				{ name: 'For Developers' },
			]}
			BackgroundComponent={({}) => null}
			Children={({}) => null}
		/>
	)
}

export default DeveloperDashboardPage
