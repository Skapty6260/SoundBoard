export const ExtensionsSubPage_Content: React.FC<{
	field: 'Addons' | 'Themes'
	activeTab: string
	styles: any
}> = ({ activeTab, styles, field }) => {
	if (activeTab == 'Browse') {
		return <div>Browse extensions repository</div>
	} else if (activeTab == 'Installed') {
		return <div>Installed extensions</div>
	} else {
		return <div>Your created extensions</div>
	}
}
