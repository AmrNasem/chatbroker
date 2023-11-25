import { memo } from "react";
import classes from "./OfferItem.module.css";
import { Link } from "react-router-dom";
const OfferItem = (props) => {
  return (
    <Link
      to={`/product/${props.id}`}
      className={`text-decoration-none rounded-2 overflow-hidden ${classes.offer}`}
    >
      <div className={`overflow-hidden ${classes.image}`}>
        <img
          className="d-block w-100 h-100 object-fit-cover"
          src={props.img}
          alt="Offer"
        />
      </div>
      <div className="p-2 text-center">
        <h5 className="fs-6 text-black mb-0 mt-2 fw-bold">
          خصم {props.discount}%
        </h5>
        <p className={`mb-1 ${classes.class}`}>{props.title}</p>
      </div>
    </Link>
  );
};

export default memo(OfferItem);
