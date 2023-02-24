import { createSlice } from '@reduxjs/toolkit'
import { SidebarState } from '../interfaces/sidebar.interface'

const initialState: SidebarState = {
	isSidebarOn: false,
}

const sidebarSlice = createSlice({
	name: 'sidebar',
	initialState,
	reducers: {
		setSidebarOn: (state) => {
			state.isSidebarOn = true
		},

		setSidebarOff: (state) => {
			state.isSidebarOn = false
		},
	},
})

export const { setSidebarOn, setSidebarOff } = sidebarSlice.actions
export const getSidebarStatus = (state) => state.sidebar.isSidebarOn
export default sidebarSlice.reducer
