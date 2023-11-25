import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./ProductItem.module.css";
import {
  faLocationDot,
  faStar,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const ProductItem = () => {
  return (
    <div className={`${classes.product} rounded-3`}>
      <div
        className={`position-relative bg-secondary overflow-hidden ${classes.head}`}
      >
        <div className="position-absolute p-2 z-1 w-100 d-flex justify-content-between align-items-center">
          <div className={`${classes.rate} text-white rounded-pill ps-2 pe-1`}>
            <span className={`${classes["average-rate"]} align-text-bottom`}>
              <FontAwesomeIcon icon={faStar} /> 4.5
            </span>{" "}
            <span className=" align-text-bottom">(495)</span>
          </div>
          <button
            className={`border-0 rounded-circle ${classes["add-to-fav"]}`}
            title="أضف إلى المفضلة"
            style={{ color: "#707070", backgroundColor: "var(--card-color)" }}
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
        <img
          className={`w-100 ${classes.image}`}
          src={require("../../assets/prod3.png")}
          alt="Product"
        />
      </div>
      <div className={`${classes.body} p-2`}>
        <h5>أم دبليو</h5>
        <p className="fw-semibold overflow-hidden text-ellipsis mt-3 mb-1">
          أكثر السيارات رفاهية وفخامة وجودة حيث أنها تمتلك وجه أمامي
        </p>
        <div className={classes.location}>
          <FontAwesomeIcon className="ms-1" icon={faLocationDot} />
          الدقهيلة/المنصورة/أجا
        </div>
        <div className={`d-flex gap-2 my-1 align-items-center ${classes.deal}`}>
          <FontAwesomeIcon icon={faTag} />
          <span className="fw-semibold">500 جنيه</span>
          <span className={classes.duration}>لمدة 1 يوم</span>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductItem);
