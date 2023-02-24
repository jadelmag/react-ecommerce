import { IProduct } from './product.interface'

export interface SearchState {
	searchProducts: IProduct[]
	searchProductsStatus: string
}
