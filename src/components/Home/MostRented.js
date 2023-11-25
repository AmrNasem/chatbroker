import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffers } from "../../store/offers-slice";
import { Container } from "react-bootstrap";
import OfferItem from "./OfferItem";
import Spinner from "../../UI/Spinner";
import ProductItem from "./ProductItem";

const MostRented = () => {
  // const { offers, error } = useSelector((state) => state.offers);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!offers) dispatch(fetchOffers());
  // }, [dispatch, offers]);

  return (
    <Container className="my-5">
      <h4 className="mb-4">الأكثر إيجارًا</h4>
      {/* {error ? (
        <p className="flex-grow-1 text-center fw-semibold my-2">{error}</p>
      ) : offers ? (
      ) : (
        <Spinner className="mx-auto" />
      )} */}
      <div className="d-flex gap-4 py-3 px-2 overflow-auto remove-scrollbar">
        {/* {offers.most_offers.map((offer) => (
            <OfferItem
              key={offer.id}
              discount={offer.discount}
              img={offer.image}
              title={offer.title}
            />
          ))} */}
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </div>
    </Container>
  );
};

export default MostRented;
