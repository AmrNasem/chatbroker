import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import favoriteCard from "./FavoriteCard.module.css";
import {
  faLocationDot,
  faStar,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { memo, useState } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Badge from "./Home/Badge";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorites } from "../store/favoritesSlice";
import { backend } from "../App";

const FavoriteCard = (props) => {
  const navigate = useNavigate();
  let { product } = props;
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);

  const handleRemoveFavorites = async (e) => {
    e.stopPropagation();
    setLoading(true);
    try {
      const res = await fetch(`${backend}/favorites/${product.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!res.ok) throw new Error("Could not remove from favorites");
      dispatch(removeFromFavorites(product));
    } catch (error) {
      console.error("Error deleting favorite: ", error.message);
    }
    setLoading(false);
    // dispatch(deleteFavorite({ authToken, favoriteId: product.id }));
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
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
              {product.desc}
            </p>
            <div className={favoriteCard.location}>
              <FontAwesomeIcon className="ms-1" icon={faLocationDot} />
              {product.city}{" "}
            </div>
          </div>
          <div
            className={`d-flex gap-1 my-1 align-items-center flex-column ${favoriteCard.deal}`}
          >
            <div className="d-flex  align-items-center gap-1 fw-bold fs-6">
              <FontAwesomeIcon icon={faTag} />
              <span className="fw-semibold text-nowrap">
                {product.amount} جنيه
              </span>
            </div>
            <span className={`text-nowrap ${favoriteCard.duration}`}>
              لمدة {product.duration} {product.enum_durations}
            </span>
          </div>
        </div>
        <div className="flex-grow-1 flex-wrap-reverse  d-flex align-items-start justify-content-between">
          <div className="d-flex">
            <Badge className={favoriteCard.badge} swap />
            <Badge className={favoriteCard.badge} />
          </div>
          <div
            onMouseOver={() => setAnimate(true)}
            onMouseLeave={() => setAnimate(false)}
            className={`d-flex me-auto align-items-center cursor-pointer gap-1 ${favoriteCard.fav}`}
            onClick={handleRemoveFavorites}
          >
            {
              <p
                className={`${favoriteCard.title} ${
                  animate ? `${favoriteCard.visible}` : ""
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
