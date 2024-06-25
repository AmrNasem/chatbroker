import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from "../components/Home/ProductItem";
import offersStyles from "./Offers.module.css";
import { fetchOffers } from '../store/offers-slice';

const Offers = () => {
  const dispatch = useDispatch();
  const { offers, loading, error } = useSelector((state) => state.offers);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Ensure offers is an array before mapping
  return (
    <>
      <p className={offersStyles.title}>العروض</p>
      <div className={offersStyles.offersContainer}>
        {offers.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </div>
    </>
  );
};

export default Offers;
