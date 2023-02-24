import { configureStore } from '@reduxjs/toolkit'
import sidebarReducer from './sidebarSlice'
import categoryReducer from './categorySlice'
import productReducer from './productSlice'
import cartReducer from './cartSlice'
import searchReducer from './searchSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
	reducer: {
		sidebar: sidebarReducer,
		category: categoryReducer,
		product: productReducer,
		cart: cartReducer,
		search: searchReducer,
	},
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector
