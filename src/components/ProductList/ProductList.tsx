import React from 'react'
import { IProduct, IProductListProps } from '../../interfaces/product.interface';
import Product from '../Product/Product'
import './ProductList.scss'

const ProductList = ({ products }: IProductListProps): JSX.Element => {
	return (
		<div className="product-lists grid bg-whitesmoke my-3">
			{products.map((product: IProduct) => {
				return <Product key={product.id} product={product} />
			})}
		</div>
	)
}

export default ProductList
