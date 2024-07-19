import { createSlice } from '@reduxjs/toolkit'

interface IViewRedux {
	sidebar: boolean
}

const initialState: IViewRedux = {
	sidebar: false,
}

export const viewSlice = createSlice({
	name: 'view',
	initialState,
	reducers: {
		toggleSidebar: (state: any = initialState) => {
			state.sidebar = !state.sidebar
		},
	},
})

export const viewReducer = viewSlice.reducer
export const viewActions = viewSlice.actions
