import { ICategory } from '@shared/types/SoundTypes'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { initCategories } from './categories.actions'

const initialState: ICategory[] = [
	{
		title: 'Preinstalled',
		opened: false,
		sounds: [
			{
				name: 'Rick Roll',
				path: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
				author: 'SoundHelix',
				length: 0,
			},
			{
				name: 'Sound 2',
				path: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
				author: 'SoundHelix',
				length: 0,
			},
		],
	},
]

export const soundsCategoriesSlice = createSlice({
	name: 'soundsCategories',
	initialState,
	reducers: {
		toggleOpenCategory: (
			state = initialState,
			action: PayloadAction<number>
		) => {
			state[action.payload].opened = !state[action.payload].opened
		},

		addCategory: (
			state = initialState,
			action: PayloadAction<ICategory | string>
		) => {
			state.push(
				typeof action.payload !== 'string'
					? action.payload
					: { title: action.payload, opened: false, sounds: [] }
			)
		},
	},
	extraReducers: builder => {
		builder
			.addCase(initCategories.pending, state => {
				state = [
					{
						title: 'Loading...',
						opened: false,
						sounds: [],
					},
				]
			})

			.addCase(initCategories.fulfilled, (state, { payload }) => {
				state = payload
			})

			.addCase(initCategories.rejected, state => {
				state = initialState
			})
	},
})

export const soundsCategoriesReducer = soundsCategoriesSlice.reducer
export const soundsCategoriesActions = soundsCategoriesSlice.actions
