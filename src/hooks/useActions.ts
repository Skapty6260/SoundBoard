import { bindActionCreators } from 'redux'
import { useAppDispatch } from './redux'
import { useMemo } from 'react'
import {
	authActions,
	soundsCategoriesActions,
	viewActions,
} from '@/providers/store'

const rootActions = {
	...soundsCategoriesActions,
	...authActions,
	...viewActions,
}

export const useActions = () => {
	const dispatch = useAppDispatch()

	return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
