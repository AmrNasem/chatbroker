import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import searchCardstyle from "./searchCard.module.css";
import {
  faLocationDot,
  faStar,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";
import Badge from "./Home/Badge";


const searchCard = (props) => {
  let { product } = props;

  return (
    <div
      className={`${searchCardstyle.product} my-4 d-md-flex rounded-3`}
    >
      <div
        className={`position-relative overflow-hidden flex-grow-1 ${searchCardstyle.head}`}
      >
        <div className="position-absolute p-2 z-1 w-100 d-flex justify-content-between align-items-center">
          <div
            className={`${searchCardstyle.rate} text-white rounded-pill ps-2 pe-1`}
          >
            <span
              className={`${searchCardstyle["average-rate"]} align-text-bottom`}
            >
              <FontAwesomeIcon icon={faStar} /> {product.total_rate}
            </span>{" "}
            <span className=" align-text-bottom">(495)</span>
          </div>
        </div>
        <img
          className={`w-100 h-100 object-fit-cover d-block ${searchCardstyle.image}`}
          src={product.image}
          alt={product.title}
        />
      </div>
      <div
        className={`${searchCardstyle.body} flex-grow-1 d-flex flex-column p-2`}
      >
        <div className="d-flex justify-content-between gap-2">
          <div>
            <h5>{product.title}</h5>
            <p className="fw-semibold overflow-hidden text-ellipsis mt-2 mb-1">
              {product.desc}
            </p>
            <div className={searchCardstyle.location}>
              <FontAwesomeIcon className="ms-1" icon={faLocationDot} />
              {product.city}{" "}
            </div>
          </div>
          <div
            className={`d-flex gap-1 my-1 align-items-center flex-column ${searchCardstyle.deal}`}
          >
            <div className="d-flex  align-items-center gap-1 fw-bold fs-6">
              <FontAwesomeIcon icon={faTag} />
              <span className="fw-semibold text-nowrap">
                {product.amount} جنيه
              </span>
            </div>
            <span className={`text-nowrap ${searchCardstyle.duration}`}>
              لمدة {product.duration} {product.enum_durations}
            </span>
          </div>
        </div>
        <div className="flex-grow-1 flex-wrap-reverse  d-flex align-items-start justify-content-between">
          <div className="d-flex">
            <Badge className={searchCardstyle.badge} swap />
            <Badge className={searchCardstyle.badge} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(searchCard);
