import React from 'react'
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, CategoryProduct, ProductSingle, Cart, Search } from './pages'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Sidebar from './components/Sidebar/Sidebar'

import { store } from "./store/store";

import './App.scss'

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<BrowserRouter>
					<Header />
					<Sidebar />

					<Routes>
						{/* home page route */}
						<Route path="/" element={<Home />} />
						{/* single product route */}
						<Route path="/product/:id" element={<ProductSingle />} />
						{/* category wise product listing route */}
						<Route path="/category/:category" element={<CategoryProduct />} />
						{/* cart */}
						<Route path="/cart" element={<Cart />} />
						{/* searched products */}
						<Route path="/search/:searchTerm" element={<Search />} />
					</Routes>
					<Footer />
				</BrowserRouter>
			</Provider>
		</div >
	)
}

export default App
