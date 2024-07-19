import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { authReducer, authActions } from './auth/auth.slice'
import {
	soundsCategoriesReducer,
	soundsCategoriesActions,
} from './userCategories/categories.slice'
import { viewReducer, viewActions } from './view/slice'

const rootReducer = combineReducers({
	authReducer,
	soundsCategoriesReducer,
	viewReducer,
})

export const store = configureStore({
	reducer: rootReducer,
})

// Get the type of our store variable
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

// Re:export
export {
	authReducer,
	authActions,
	soundsCategoriesReducer,
	soundsCategoriesActions,
	viewReducer,
	viewActions,
}
