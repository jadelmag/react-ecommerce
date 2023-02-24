export interface ProductState {
	products: IProduct[]
	productsStatus: string
	productSingle: IProduct[]
	productSingleStatus: string
}

export interface IProductListProps {
	products: IProduct[]
}

export interface IProductProps {
	product: IProduct
}

export interface IProduct {
	id: number
	category: string
	images: string[]
	title: string
	brand: string
	price: number
	discountPercentage: number
	rating: number
	stock: number
	thumbnail: string
}

export interface IProductResponse {
	limit: number
	products: []
	skip: number
	total: number
}
