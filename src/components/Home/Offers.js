import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffers } from "../../store/offers-slice";
import { Container } from "react-bootstrap";
import OfferItem from "./OfferItem";
import { Link } from "react-router-dom";
import OfferSkeleton from "../Skeleton/OfferSkeleton";

const Offers = () => {
  const dispatch = useDispatch();
  const { offers, loading, error } = useSelector((state) => state.offers);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  if (!(offers?.length || error || loading)) return;

  const filteredOffers =
    offers?.filter(
      (offer) => offer.sell?.discount !== 0 || offer.rent?.discount !== 0
    ) || [];

  console.log(offers);
  return (
    <Container className="my-5">
      <div className="my-4 gap-3 d-flex justify-content-between align-items-center">
        <h4>العروض المتاحة</h4>
        <Link
          to="/offers"
          style={{
            color: "var(--main-color)",
            border: "2px solid var(--main-color)",
          }}
          className="btn text-decoration-none fw-semibold"
        >
          جميع العروض
        </Link>
      </div>
      {error ? (
        <p className="flex-grow-1 text-center fw-semibold my-2">{error}</p>
      ) : loading ? (
        <div className="d-flex gap-3 overflow-auto scrollbar-none">
          {[...Array(3).keys()].map((key) => (
            <OfferSkeleton
              delay={key}
              style={{ minWidth: "200px" }}
              key={key}
            />
          ))}
        </div>
      ) : (
        <div className="d-flex gap-3 overflow-x-auto py-3 px-2 scrollbar-none">
          {filteredOffers.map((offer) => (
            <OfferItem key={offer.id} id={offer.id} offer={offer} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default Offers;
