import { RootExtensionsPageLayout } from '@/components/Layout/Extensions'

const DeveloperDashboardPage = () => {
	return (
		<RootExtensionsPageLayout
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
