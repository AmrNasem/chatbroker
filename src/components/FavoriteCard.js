import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import favoriteCard from "./FavoriteCard.module.css";
import {
  faLocationDot,
  faRepeat,
  faStar,
  faTag,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { memo, useState } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Badge from "./Home/Badge";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorites } from "../store/favoritesSlice";
import { backend } from "../App";
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

const FavoriteCard = (props) => {
  const navigate = useNavigate();
  let { product } = props;
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  console.log(product)
  const handleRemoveFavorites = async (e) => {
    e.stopPropagation();
    setLoading(true);
    try {
      const res = await fetch(`${backend}/favorites/${product.product_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");
      dispatch(removeFromFavorites(product.product_id));
    } catch (error) {
      console.error("Error deleting favorite: ", error.message);
    }
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.product_id}`)}
      className={`${favoriteCard.product} my-4 d-md-flex rounded-3`}
    >
      <div
        className={`position-relative overflow-hidden flex-grow-1 ${favoriteCard.head}`}
      >
        <div className="position-absolute p-2 z-1 w-100 d-flex justify-content-between align-items-center">
          <div
            className={`${favoriteCard.rate} text-white rounded-pill ps-2 pe-1`}
          >
            <span
              className={`${favoriteCard["average-rate"]} align-text-bottom`}
            >
              <FontAwesomeIcon icon={faStar} /> {product.total_rate}
            </span>{" "}
            <span className=" align-text-bottom">(495)</span>
          </div>
        </div>
        <img
          className={`w-100 h-100 object-fit-cover d-block ${favoriteCard.image}`}
          src={product.image}
          alt={product.title}
        />
      </div>
      <div
        className={`${favoriteCard.body} flex-grow-1 d-flex flex-column p-2`}
      >
        <div className="d-flex justify-content-between gap-2">
          <div>
            <h5>{product.title}</h5>
            <p className="fw-semibold overflow-hidden text-ellipsis mt-2 mb-1">
              {(product.rent ? product.rent : product.sell ? product.sell : product.swap).descount}
            </p>
            <div className={favoriteCard.location}>
              <FontAwesomeIcon className="ms-1" icon={faLocationDot} />
              {product.city}{" "}
            </div>
          </div>
        </div>
        <div className="flex-grow-1 flex-wrap-reverse  d-flex justify-content-between flex-column">
          <div
            className={`d-flex my-1 align-items-start flex-column gap-3 ms-5 ${favoriteCard.deal}`}
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
                <span className={`text-nowrap ${favoriteCard.duration}`}>
                  <FontAwesomeIcon icon={faClock} style={{ marginLeft: "5px" }} />
                  لمدة {product.rent.duration} {product.rent.enum_durations}
                </span>}
              {product.rent && product.rent.discount !== 0 &&
                <span className={`text-nowrap ${favoriteCard.duration}`}>
                  <FontAwesomeIcon icon={faTags} style={{ marginLeft: "5px" }} />
                  خصم {product.rent.discount}%
                </span>}
            </div>
            {product.sell && <div className="d-flex  align-items-center gap-1 fw-bold fs-6">
              <FontAwesomeIcon icon={faTag} />
              <span className="fw-semibold text-nowrap">
                <span style={{ fontSize: "13px", color: "#", fontWeight: "lighter" }}>البيع: </span>
                {product.sell.amount} جنيه
              </span>
              {product.sell.discount !== 0 &&
                <span className={`text-nowrap ${favoriteCard.duration}`}>
                  <FontAwesomeIcon icon={faTags} style={{ marginLeft: "5px" }} />
                  خصم {product.sell.discount}%
                </span>}
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
          <div
            onMouseOver={() => setAnimate(true)}
            onMouseLeave={() => setAnimate(false)}
            className={`d-flex me-auto align-items-center cursor-pointer gap-1 ${favoriteCard.fav}`}
            onClick={handleRemoveFavorites}
          >
            {
              <p
                className={`${favoriteCard.title} ${animate ? `${favoriteCard.visible}` : ""
                  }`}
              >
                إزاله من المفضلة
              </p>
            }
            <button
              disabled={loading}
              className={`border-0 rounded-circle ${favoriteCard["add-to-fav"]}`}
              title="أضف إلى المفضلة"
              style={{ backgroundColor: "var(--card-color)" }}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(FavoriteCard);
