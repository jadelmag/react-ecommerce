export interface CartState {
	carts: ICartItem[]
	itemsCount: number
	totalAmount: number
	isCartMessageOn: boolean
}

export interface ICartProps {
	carts: ICart[]
}

export interface ICart {
	id: number
	thumbnail: string
	title: string
	discountedPrice: number
	quantity: number
	totalPrice: number
	price: number
	type: string
	stock: number
}

export interface ICartItem {
	brand: string
	category: string
	description: string
	discountPercentage: number
	discountedPrice: number
	id: number
	images: string[]
	price: number
	quantity: number
	rating: number
	stock: number
	thumbnail: string
	title: string
	totalPrice: number
}
