import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../components/Home/ProductItem";
import offersStyles from "./Offers.module.css";
import { fetchOffers } from "../store/offers-slice";
import CardSkeleton from "../components/Skeleton/CardSkeleton";

const Offers = () => {
  const dispatch = useDispatch();
  const { offers, loading, error } = useSelector((state) => state.offers);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Ensure offers is an array before mapping
  return (
    <main>
      <div className="container my-5">
        <h3 className="mb-5 me-4 text-main">العروض</h3>
        {loading ? (
          <div className="d-flex gap-4 my-4 flex-wrap">
            {[...Array(3).keys()].map((key) => (
              <CardSkeleton key={key} style={{ minWidth: "240px" }} />
            ))}
          </div>
        ) : error ? (
          <h5 className="flex-grow-1 text-center text-danger my-3 fw-semibold my-2">
            {error}
          </h5>
        ) : offers.length ? (
          <div className={offersStyles.offersContainer}>
            {offers.map((product) => (
              <ProductItem
                product={product}
                key={product.id}
                maxWidth="240px"
                className="flex-grow-1"
              />
            ))}
          </div>
        ) : (
          <h5 className="flex-grow-1 text-center my-3 fw-semibold my-2">
            لا يوجد عروض!
          </h5>
        )}
      </div>
    </main>
  );
};

export default Offers;
