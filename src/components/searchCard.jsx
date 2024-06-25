import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faRepeat,
  faStar,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "../components/Home/Badge";
import styles from "./searchCard.module.css"; // Corrected import for CSS module
import { faClock } from "@fortawesome/free-regular-svg-icons";

const badges = [
  {
    id: "swap",
    className: "text-main z-2",
    style: { backgroundColor: "#FFF1E1", paddingRight: "6px" },
    icon: faRepeat,
    text: "للاستبدال",
    borderRightColor: "#FFF1E1",
  },
  {
    id: "sell",
    className: "text-white bg-main z-1",
    style: { paddingRight: "18px" },
    icon: faTag,
    text: "للبيع",
    borderRightColor: "var(--main-color)",
  },
  {
    id: "rent",
    className: "text-white bg-sec z-0",
    style: { paddingRight: "18px" },
    icon: faTag,
    text: "للإيجار",
    borderRightColor: "var(--secondary-color)",
  },
];

const SearchCard = (props) => {
  const navigate = useNavigate();
  const { product } = props;

  return (
    <div className="">
      <div
        onClick={() => navigate(`/product/${product.product_id}`)}
        className={`${styles.product} my-4 d-md-flex rounded-3`}
      >
        <div
          className={`position-relative overflow-hidden flex-grow-1 ${styles.head}`}
        >
          <div className="position-absolute p-2 z-1 w-100 d-flex justify-content-between align-items-center">
            <div className={`${styles.rate} text-white rounded-pill ps-2 pe-1`}>
              <span className={`${styles["average-rate"]} align-text-bottom`}>
                <FontAwesomeIcon icon={faStar} /> {product.total_rate}
              </span>{" "}
              <span className=" align-text-bottom">(495)</span>
            </div>
          </div>
          <img
            className={`w-100 h-100 object-fit-cover d-block ${styles.image}`}
            src={product.image}
            alt={product.title}
          />
        </div>
        <div className={`${styles.body} flex-grow-1 d-flex flex-column p-2`}>
          <div className="d-flex justify-content-between gap-2">
            <div>
              <h5>{product.title}</h5>
              <p className="fw-semibold overflow-hidden text-ellipsis mt-2 mb-1">
                {product.desc}
              </p>
              <div className={styles.location}>
                <FontAwesomeIcon className="ms-1" icon={faLocationDot} />
                {product.city}{" "}
              </div>
            </div>

          </div>
          <div className="flex-grow-1 flex-wrap-reverse  d-flex align-items- justify-content-between flex-column">
            <div
              className={`d-flex my-1 align-items-start flex-column gap-3 ms-5 ${styles.deal}`}
            >
              <div className="d-flex flex-row gap-3">
                {product.rent && <div className="d-flex  align-items-center gap-1 fw-bold fs-6">
                  <FontAwesomeIcon icon={faTag} />
                  <span className="fw-semibold text-nowrap">
                    <span style={{ fontSize: "13px", color: "#", fontWeight: "lighter" }}>الإيجار: </span>
                    {product.rent.amount} جنيه
                  </span>
                </div>}
                {product.rent &&
                  <span className={`text-nowrap ${styles.duration}`}>
                    <FontAwesomeIcon icon={faClock} style={{ marginLeft: "5px" }} />
                    لمدة {product.rent.duration} {product.rent.enum_durations}
                  </span>}
              </div>
              {product.sell && <div className="d-flex  align-items-center gap-1 fw-bold fs-6">
                <FontAwesomeIcon icon={faTag} />
                <span className="fw-semibold text-nowrap">
                  <span style={{ fontSize: "13px", color: "#", fontWeight: "lighter" }}>البيع: </span>
                  {product.sell.amount} جنيه
                </span>
              </div>}
            </div>
            <div className="flex-grow-1 d-flex align-items-end">
              {badges
                .filter((badge) => product[badge.id])
                .map((badge, i) => (
                  <Badge
                    key={badge.id}
                    {...badge}
                    style={{ ...badge.style, paddingRight: i ? "18px" : "6px", maxWidth: "100px" }}
                  >
                    {badge.text}
                  </Badge>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(SearchCard);
