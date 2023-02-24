import React, { useEffect } from 'react';
import ProductList from "../../components/ProductList/ProductList";
import { useParams } from 'react-router-dom';
import { getAllProductsByCategory, fetchAsyncProductsOfCategory, getCategoryProductsStatus } from '../../store/categorySlice';
import Loader from '../../components/Loader/Loader';
import { STATUS } from '../../utils/status';
import { useAppDispatch, useAppSelector } from '../../store/store';
import "./CategoryProductPage.scss";

const CategoryProductPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { category } = useParams();
  const categoryProducts = useAppSelector(getAllProductsByCategory);
  const categoryProductsStatus = useAppSelector(getCategoryProductsStatus);

  useEffect(() => {
    if (category !== undefined) {
      dispatch(fetchAsyncProductsOfCategory(category));
    }
  }, [dispatch, category]);

  return (
    <div className='cat-products py-5 bg-whitesmoke'>
      <div className='container'>
        <div className='cat-products-content'>
          <div className='title-md'>
            <h3>See our <span className='text-capitalize'>{category?.replace("-", " ")}</span></h3>
          </div>

          {
            categoryProductsStatus === STATUS.LOADING ? <Loader /> : <ProductList products={categoryProducts} />
          }
        </div>
      </div>
    </div>
  )
}

export default CategoryProductPage