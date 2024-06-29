import { memo } from "react";
import classes from "./OfferItem.module.css";
import { Link } from "react-router-dom";
import { faBagShopping, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OfferItem = (offer) => {
  return (
    <Link
      to={`/product/${offer.id}`}
      className={`text-decoration-none rounded-2 overflow-hidden ${classes.offer}`}
    >
      <>
        <div className={`overflow-hidden ${classes.image}`}>
          <img
            className="d-block w-100 h-100 object-fit-cover"
            src={offer.offer.image}
            alt="Offer"
          />
        </div>
        <div className="p-3 text-center d-flex ms-2 me-2 flex-column">
          <h5 className={`my-2 text-main text-center ${classes.class}`}>
            {offer.offer.title}
          </h5>
          {offer.offer.rent && offer.offer.rent.discount !== 0 && (
            <h5
              style={{ color: `#616083 !important` }}
              className={` fs-6 text-black mb-0 mt-2 fw-bold flex-row d-flex gap-5`}
            >
              <div
                className="flex-grow-1 d-flex flex-row fw-lighter align-items-center gap-1"
                style={{ color: "var(--main-color) " }}
              >
                <FontAwesomeIcon icon={faTag} />
                الإيجار:
              </div>
              <div className={`${classes.percent}`}>
                {offer.offer.rent.discount}%
              </div>
            </h5>
          )}
          {offer.offer.sell && offer.offer.sell.discount !== 0 && (
            <h5
              className={`fs-6 text-black mb-0 mt-2 fw-bold flex-row d-flex gap-5`}
            >
              <div
                className="flex-grow-1 d-flex flex-row fw-lighter align-items-center gap-1"
                style={{ color: "var(--main-color)" }}
              >
                <FontAwesomeIcon
                  style={{ color: "red" }}
                  icon={faBagShopping}
                />
                البيع:
              </div>
              <div className={`${classes.percent}`}>
                {offer.offer.sell.discount}%
              </div>
            </h5>
          )}
        </div>
      </>
    </Link>
  );
};

export default memo(OfferItem);
