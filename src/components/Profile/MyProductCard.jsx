import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "../Home/ProductItem.module.css";
import styles from "./MyProductCard.module.css";
import {
  faLocationDot,
  faPen,
  faTag,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ minWidth, product }) => {
  const navigate = useNavigate();
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
      style={{ minWidth }}
      onClick={() => navigate(`/product/1`)}
      className={`${classes.product} d-flex rounded-3 bg-white my-3`}
    >
      <div
        style={{ backgroundColor: "var(--pink-color)" }}
        className={`position-relative overflow-hidden rounded-end-3 ${styles.head}`}
      >
        <img
          className={`w-100 h-100 object-fit-cover`}
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
        <div className="d-flex gap-1 align-items-center my-2">
          <button
            style={{ color: "var(--address-color)" }}
            className="border bg-transparent border-2 rounded-2 px-1"
          >
            <FontAwesomeIcon
              icon={faPen}
              style={{ fontSize: "0.8rem" }}
              className="text-success ms-1"
            />
            <span>تعديل</span>
          </button>
          <button
            style={{ color: "var(--address-color)" }}
            className="border bg-transparent border-2 rounded-2 px-1"
          >
            <FontAwesomeIcon
              icon={faTrash}
              style={{ fontSize: "0.8rem" }}
              className="text-danger ms-1"
            />
            <span>حذف</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductItem);
