import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { STATUS } from '../../utils/status'
import Loader from '../../components/Loader/Loader'
import ProductList from '../../components/ProductList/ProductList'
import {
	fetchAsyncSearchProduct,
	getSearchProducts,
	getSearchProductsStatus,
	clearSearch,
} from '../../store/searchSlice'
import { useAppDispatch, useAppSelector } from '../../store/store';
import './SearchPage.scss'

const SearchPage = (): JSX.Element => {
	const dispatch = useAppDispatch()
	const { searchTerm } = useParams()
	const searchProducts = useAppSelector(getSearchProducts)
	const searchProductsStatus = useAppSelector(getSearchProductsStatus)

	useEffect(() => {
		dispatch(clearSearch())
		if (searchTerm) {
			dispatch(fetchAsyncSearchProduct(searchTerm))
		}
	}, [searchTerm])

	if (searchProducts.length === 0) {
		return (
			<div
				className="container"
				style={{
					minHeight: '70vh',
				}}
			>
				<div className="fw-5 text-danger py-5">
					<h3>No Products found.</h3>
				</div>
			</div>
		)
	}

	return (
		<main>
			<div className="search-content bg-whitesmoke">
				<div className="container">
					<div className="py-5">
						<div className="title-md">
							<h3>Search results:</h3>
						</div>
						<br />
						{searchProductsStatus === STATUS.LOADING ? (
							<Loader />
						) : (
							<ProductList products={searchProducts} />
						)}
					</div>
				</div>
			</div>
		</main>
	)
}

export default SearchPage
