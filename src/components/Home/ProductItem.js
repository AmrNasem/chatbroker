import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./ProductItem.module.css";
import {
  faLocationDot,
  faStar,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import Badge from "./Badge";

const ProductItem = (props) => {
  const navigate = useNavigate();
  let { product } = props;
  if (!product)
    product = {
      total_rate: 4.5,
      image: require("../../assets/prod3.png"),
      title: "إم دبليو",
      desc: "أكثر السيارات رفاهية وفخامةوجودة حيث أنها تمتلك وجه أمامية",
      city: "الدقهلية/المنصورة/أجا",
      amount: 500,
      duration: 1,
      enum_durations: "يوم",
    };

  return (
    <div
      onClick={() => navigate(`product/1`)}
      className={`${classes.product} d-flex flex-column rounded-3`}
    >
      <div className={`position-relative overflow-hidden ${classes.head}`}>
        <div className="position-absolute p-2 z-1 w-100 d-flex justify-content-between align-items-center">
          <div className={`${classes.rate} text-white rounded-pill ps-2 pe-1`}>
            <span className={`${classes["average-rate"]} align-text-bottom`}>
              <FontAwesomeIcon icon={faStar} /> {product.total_rate}
            </span>{" "}
            <span className=" align-text-bottom">(495)</span>
          </div>
          <button
            onClick={(e) => e.stopPropagation()}
            className={`border-0 rounded-circle ${classes["add-to-fav"]}`}
            title="أضف إلى المفضلة"
            style={{ color: "#707070", backgroundColor: "var(--card-color)" }}
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
        <img
          className={`w-100 h-100 object-fit-cover ${classes.image}`}
          src={product.image}
          alt={product.title}
        />
      </div>
      <div className={`${classes.body} flex-grow-1 d-flex flex-column p-2`}>
        <h5>{product.title}</h5>
        <p className="fw-semibold overflow-hidden text-ellipsis mt-2 mb-1">
          {product.desc}
        </p>
        <div className={classes.location}>
          <FontAwesomeIcon className="ms-1" icon={faLocationDot} />
          {product.city}{" "}
        </div>
        <div className={`d-flex gap-2 my-1 align-items-center ${classes.deal}`}>
          <FontAwesomeIcon icon={faTag} />
          <span className="fw-semibold">{product.amount} جنيه</span>
          <span className={classes.duration}>
            لمدة {product.duration} {product.enum_durations}
          </span>
        </div>
        <div className="flex-grow-1 d-flex align-items-end">
          <Badge className="" swap />
          <Badge className="" />
        </div>
      </div>
    </div>
  );
};

export default memo(ProductItem);
