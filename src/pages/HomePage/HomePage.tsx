import React, { useEffect } from 'react';
import HeaderSlider from "../../components/Slider/HeaderSlider";
import { getAllCategories } from '../../store/categorySlice';
import ProductList from "../../components/ProductList/ProductList";
import { fetchAsyncProducts, getAllProducts, getAllProductsStatus } from '../../store/productSlice';
import Loader from "../../components/Loader/Loader";
import { STATUS } from '../../utils/status';
import { IProduct } from '../../interfaces/product.interface';
import { useAppDispatch, useAppSelector } from '../../store/store';
import "./HomePage.scss";

const HomePage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(getAllCategories);

  useEffect(() => {
    dispatch(fetchAsyncProducts(50));
  }, []);

  const products = useAppSelector(getAllProducts);
  const productStatus = useAppSelector(getAllProductsStatus);
  // randomizing the products in the list
  const tempProducts: IProduct[] = [];
  if (products.length > 0) {
    for (const i in products) {
      let randomIndex: number = Math.floor(Math.random() * products.length);

      while (tempProducts.includes(products[randomIndex])) {
        randomIndex = Math.floor(Math.random() * products.length);
      }
      tempProducts[i] = products[randomIndex];
    }
  }

  const catProductsOne = products.filter((product: IProduct) => product.category === categories[0]);
  const catProductsTwo = products.filter((product: IProduct) => product.category === categories[1]);
  const catProductsThree = products.filter((product: IProduct) => product.category === categories[2]);
  const catProductsFour = products.filter((product: IProduct) => product.category === categories[3]);

  return (
    <main>
      <div className='slider-wrapper'>
        <HeaderSlider />
      </div>
      <div className='main-content bg-whitesmoke'>
        <div className='container'>
          <div className='categories py-5'>
            <div className='categories-item'>
              <div className='title-md'>
                <h3>See our products</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={tempProducts} />}
            </div>

            <div className='categories-item'>
              <div className='title-md'>
                <h3>{categories[0]}</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsOne} />}
            </div>

            <div className='categories-item'>
              <div className='title-md'>
                <h3>{categories[1]}</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsTwo} />}
            </div>

            <div className='categories-item'>
              <div className='title-md'>
                <h3>{categories[2]}</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsThree} />}
            </div>

            <div className='categories-item'>
              <div className='title-md'>
                <h3>{categories[3]}</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsFour} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default HomePage