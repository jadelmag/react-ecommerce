import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartState, ICartItem } from '../interfaces/cart.interface'

const fetchFromLocalStorage = () => {
	const cart = localStorage.getItem('cart')
	if (cart) {
		const item: string | null = localStorage.getItem('cart')
		if (item === null) return []
		return JSON.parse(item)
	} else {
		return []
	}
}

const storeInLocalStorage = (data: ICartItem[]) => {
	localStorage.setItem('cart', JSON.stringify(data))
}

const initialState: CartState = {
	carts: fetchFromLocalStorage(),
	itemsCount: 0,
	totalAmount: 0,
	isCartMessageOn: false,
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<ICartItem>) => {
			const isItemInCart = state.carts.find((item) => item.id === action.payload.id)
			if (isItemInCart) {
				const tempCart = state.carts.map((item: ICartItem) => {
					if (item.id === action.payload.id) {
						const tempQty = item.quantity + action.payload.quantity
						const tempTotalPrice = tempQty * item.price

						return {
							...item,
							quantity: tempQty,
							totalPrice: tempTotalPrice,
						}
					} else {
						return item
					}
				})

				state.carts = tempCart
				storeInLocalStorage(state.carts)
			} else {
				state.carts.push(action.payload)
				storeInLocalStorage(state.carts)
			}
		},

		removeFromCart: (state, action: PayloadAction<number>) => {
			const tempCart = state.carts.filter((item: ICartItem) => item.id !== action.payload)
			state.carts = tempCart
			storeInLocalStorage(state.carts)
		},

		clearCart: (state) => {
			state.carts = []
			storeInLocalStorage(state.carts)
		},

		getCartTotal: (state) => {
			state.totalAmount = state.carts.reduce((cartTotal, cartItem) => {
				return (cartTotal += cartItem.totalPrice)
			}, 0)

			state.itemsCount = state.carts.length
		},

		toggleCartQty: (state, action: PayloadAction<{ id: number; type: string }>) => {
			const tempCart = state.carts.map((item) => {
				if (item.id === action.payload.id) {
					let tempQty = item.quantity
					let tempTotalPrice = item.totalPrice

					if (action.payload.type === 'INC') {
						tempQty++
						if (tempQty === item.stock) tempQty = item.stock
						tempTotalPrice = tempQty * item.discountedPrice
					}

					if (action.payload.type === 'DEC') {
						tempQty--
						if (tempQty < 1) tempQty = 1
						tempTotalPrice = tempQty * item.discountedPrice
					}

					return { ...item, quantity: tempQty, totalPrice: tempTotalPrice }
				} else {
					return item
				}
			})

			state.carts = tempCart
			storeInLocalStorage(state.carts)
		},

		setCartMessageOn: (state) => {
			state.isCartMessageOn = true
		},

		setCartMessageOff: (state) => {
			state.isCartMessageOn = false
		},
	},
})

export const {
	addToCart,
	setCartMessageOff,
	setCartMessageOn,
	getCartTotal,
	toggleCartQty,
	clearCart,
	removeFromCart,
} = cartSlice.actions
export const getAllCarts = (state) => state.cart.carts
export const getCartItemsCount = (state) => state.cart.itemsCount
export const getCartMessageStatus = (state) => state.cart.isCartMessageOn

export default cartSlice.reducer
