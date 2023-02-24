export const formatPrice = (price: number): string => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(price)
}

export const calculateRealPrize = (price: number, discount: number): number => {
	const discountedPrice: number = price - price * (discount / 100)
	return discountedPrice
}
