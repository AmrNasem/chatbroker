import { memo } from "react";
import classes from "./OfferItem.module.css";
const OfferItem = (props) => {
  return (
    <div className={`rounded-2 overflow-hidden ${classes.offer}`}>
      <img className="d-block w-100" src={props.img} alt="Offer" />
      <div className="p-2 text-center">
        <h5 className="fs-6 mb-0 mt-2 fw-bold">خصم {props.discount}%</h5>
        <p className={`mb-1 ${classes.class}`}>{props.title}</p>
      </div>
    </div>
  );
};

export default memo(OfferItem);
