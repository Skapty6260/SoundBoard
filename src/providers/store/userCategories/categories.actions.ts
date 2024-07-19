import { createAsyncThunk } from '@reduxjs/toolkit'
import { ICategory } from '@shared/types/SoundTypes'

const initializeCategories = (): Promise<ICategory[]> =>
	new Promise((resolve, reject) => {
		const storeData = window.api.store.getValue('soundCategories')

		if (storeData) resolve(storeData)
		else reject(null)
	})

export const addCategory = (category: ICategory | string) =>
	new Promise((resolve, reject) => {
		window.api.store
			.setValue('soundCategories', category)
			.then(resolve)
			.catch(reject)
	})

// const toggleOpenCategory = (categoryKey: number) => {
// 	new Promise((resolve, reject) => {
// 		//  Get all categories from store
// 		// Find category in array by index
// 		//  Change opened property
// 		//  Save to store
// 	})
// }

export const initCategories = createAsyncThunk(
	'initCategories',
	async (_, { rejectWithValue }): Promise<ICategory[] | any> => {
		try {
			const response = await initializeCategories()

			return response
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)
