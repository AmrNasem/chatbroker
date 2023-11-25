import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffers } from "../../store/offers-slice";
import { Container } from "react-bootstrap";
import OfferItem from "./OfferItem";
import Spinner from "../../UI/Spinner";

const Offers = () => {
  const { offers, error } = useSelector((state) => state.offers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!offers) dispatch(fetchOffers());
  }, [dispatch, offers]);

  return (
    <Container className="my-5">
      <div className="my-4 gap-3 d-flex justify-content-between align-items-center">
        <h4>العروض المتاحة</h4>
        <button
          style={{
            color: "var(--main-color)",
            border: "2px solid var(--main-color)",
          }}
          className="btn fw-semibold"
        >
          جميع العروض
        </button>
      </div>
      {error ? (
        <p className="flex-grow-1 text-center fw-semibold my-2">{error}</p>
      ) : offers ? (
        <div className="d-flex gap-3 overflow-auto remove-scrollbar">
          {offers.most_offers.map((offer) => (
            <OfferItem
              key={offer.id}
              discount={offer.discount}
              img={offer.image}
              title={offer.title}
            />
          ))}
        </div>
      ) : (
        <Spinner className="mx-auto" />
      )}
    </Container>
  );
};

export default Offers;
