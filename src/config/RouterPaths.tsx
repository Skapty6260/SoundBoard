import { RouteObject } from 'react-router'
import { Home, Editor, Workshop, Login, Settings, Extensions } from '@/pages'

export const RouterPaths: RouteObject[] = [
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/settings',
		element: <Settings />,
	},
	{
		path: '/editor',
		element: <Editor />,
	},
	{
		path: '/workshop',
		element: <Workshop />,
	},
	{
		path: '/extensions',
		element: <Extensions />,
	},
]
