import { createSlice } from '@reduxjs/toolkit'

interface IAuth {
	accounts: IAccount[]
	status: boolean
}

export interface IAccount {
	name: string
	avatarurl: string
	jwt: string
}

const initialState: IAuth = {
	accounts: [
		{
			name: 'Petya',
			avatarurl:
				'https://app-time.ru/uploads/games/cover/2023/01/3101202320381980.jpg',
			jwt: '123',
		},

		{
			name: 'Vasya',
			avatarurl:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK_xQykqn3okj0nL5Qf6iSBfuxrTJiM7CoKA&s',
			jwt: '666',
		},
	],
	status: true,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		getAuthStatus: (state: any = initialState) => {
			return state.status
		},

		getAccounts: (state: any = initialState) => {
			return state.accounts
		},
	},
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions
