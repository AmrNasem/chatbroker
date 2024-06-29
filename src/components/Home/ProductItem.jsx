import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./ProductItem.module.css";
import {
  faLocationDot,
  faStar,
  faTag,
  faRepeat,
  faHeart as faHeartSolid,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import { memo, useEffect, useState } from "react";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import Badge from "./Badge";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../store/favoritesSlice";
import { backend } from "../../App";

const badges = [
  {
    id: "swap",
    className: "text-main z-2",
    style: { backgroundColor: "#FFF1E1" },
    icon: faRepeat,
    text: "للاستبدال",
    borderRightColor: "#FFF1E1",
  },
  {
    id: "sell",
    className: "text-white bg-main z-1",
    icon: faBagShopping,
    text: "للبيع",
    borderRightColor: "var(--main-color)",
  },
  {
    id: "rent",
    className: "text-white bg-sec z-0",
    icon: faTag,
    text: "للإيجار",
    borderRightColor: "var(--secondary-color)",
  },
];

const ProductItem = ({
  minWidth = "250px",
  maxWidth,
  className,
  width,
  product,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.list);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (favorites && product) {
      setIsFav(
        favorites.find((item) => item.product_id === product.id) ? true : false
      );
    }
  }, [favorites, product]);

  if (!product)
    product = {
      id: "1",
      total_rate: 4.5,
      image: require("../../assets/prod3.png"),
      title: "إم دبليو",
      desc: "أكثر السيارات رفاهية وفخامةوجودة حيث أنها تمتلك وجه أمامية",
      city: "الدقهلية/المنصورة/أجا",
      amount: 500,
      duration: 1,
      enum_durations: "يوم",
    };

  const { token, user } = useSelector((state) => state.auth);

  const handleToggleFav = async (e) => {
    e.stopPropagation();

    if (!token) return navigate("?auth=login");

    try {
      setIsFav((prev) => !prev);
      const formData = new FormData();
      formData.append("product_id", product.id);

      const res = await fetch(
        `${backend}/favorites/${isFav ? product.id : "store"}`,
        {
          method: isFav ? "DELETE" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: isFav ? undefined : formData,
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong!");
      dispatch(
        isFav ? removeFromFavorites(product.id) : addToFavorites(data.data)
      );
    } catch (error) {
      console.log(error.message);
      setIsFav((prev) => !prev);
      removeFromFavorites(product.id);
    }
  };

  return (
    <div
      style={{ minWidth, maxWidth, width }}
      onClick={() => navigate(`/product/${product.id}`)}
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
          {user?.id !== product.user_id && (
            <button
              onClick={handleToggleFav}
              className={`border-0 rounded-circle ${classes["add-to-fav"]}`}
              title="أضف إلى المفضلة"
              style={{ color: "#707070", backgroundColor: "var(--card-color)" }}
            >
              {isFav ? (
                <FontAwesomeIcon icon={faHeartSolid} style={{ color: "red" }} />
              ) : (
                <FontAwesomeIcon icon={faHeart} />
              )}
            </button>
          )}
        </div>
        <img
          className={`w-100 h-100 object-fit-cover ${classes.image}`}
          src={product.image}
          alt={product.title}
        />
      </div>
      <div className={`${classes.body} flex-grow-1 d-flex flex-column p-2`}>
        <h5 className={classes.ellipsis}>{product.title}</h5>
        <p className={`fw-semibold mt-2 mb-1 ${classes.ellipsis}`}>
          {product.desc}
        </p>
        <div className={`my-2 ${classes.location}`}>
          <FontAwesomeIcon className="ms-1" icon={faLocationDot} />
          {product.city}{" "}
        </div>
        {product.rent && (
          <div className="d-flex  align-items-center gap-1 fw-bold fs-6">
            <FontAwesomeIcon icon={faTag} />
            <span className="fw-semibold text-nowrap">
              <span
                className="text-semibold"
                style={{
                  fontSize: "13px",
                  color: "#",
                }}
              >
                الإيجار:{" "}
              </span>
              <span className="text-sec">{product.rent.amount} جنيه</span>
            </span>
            <span className={`text-nowrap me-1`}>
              <span className="fw-semibold" style={{ fontSize: "13px" }}>
                لمدة:{" "}
              </span>{" "}
              <span className="text-sec fw-semibold">
                {product.rent.duration} {product.rent.enum_durations}
              </span>
            </span>
          </div>
        )}
        {product.sell && (
          <div className="d-flex  align-items-center gap-1 fw-bold fs-6">
            <FontAwesomeIcon style={{ color: "red" }} icon={faBagShopping} />
            <span className="fw-semibold text-nowrap">
              <span
                className="text-semibold"
                style={{
                  fontSize: "13px",
                  color: "#",
                }}
              >
                البيع:{" "}
              </span>
              <span className="text-sec">{product.sell.amount} جنيه</span>
            </span>
          </div>
        )}
        {product.swap && (
          <div
            className={`d-flex gap-2 my-1 align-items-center ${classes.deal}`}
          >
            <FontAwesomeIcon icon={faRepeat} />
            <span
              style={{ fontSize: "13px" }}
              className="fw-semibold text-nowrap"
            >
              تبديل مع:{" "}
            </span>
            <span className="fw-semibold text-sec text-truncate">
              {product.swap.swap_with}{" "}
            </span>
          </div>
        )}
        <div className="flex-grow-1 d-flex align-items-end">
          {badges
            .filter((badge) => product[badge.id])
            .map((badge, i) => (
              <Badge
                key={badge.id}
                {...badge}
                style={{ ...badge.style, paddingRight: i ? "18px" : "8px" }}
              >
                {badge.text}
              </Badge>
            ))}
        </div>
      </div>
    </div>
  );
};

export default memo(ProductItem);
