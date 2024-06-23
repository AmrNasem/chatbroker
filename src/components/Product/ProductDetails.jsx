import { faHeart, faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./ProductDetails.module.css";
import {
  faStar,
  faLocationDot,
  faStarHalf,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { memo, useEffect, useMemo, useState } from "react";
import SingleReview from "./SingleReview";
import Spinner from "../../UI/Spinner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../store/favoritesSlice";
import { backend } from "../../App";

const getStar = (index, rate) =>
  rate < index + 1 && index < rate ? (
    <div
      key={index}
      className="position-relative d-flex align-items-center justify-content-center"
    >
      <FontAwesomeIcon className="invisible" icon={faStar} />
      <FontAwesomeIcon
        icon={faStarHalf}
        className="position-absolute top-0 end-0 text-warning"
        style={{
          transform: "rotateY(180deg)",
        }}
      />
      <FontAwesomeIcon
        icon={faStarHalf}
        className="position-absolute top-0 start-0 text-secondary"
      />
    </div>
  ) : (
    <FontAwesomeIcon
      key={index}
      icon={faStar}
      className={`${index < rate ? "text-warning" : "text-secondary"}`}
    />
  );

const itemsPerPage = 2;

const ProductDetails = ({ className, product, error, loading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.list);
  const authToken = useSelector((state) => state.auth.token);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (favorites && product) {
      setIsFav(
        favorites.find((item) => item.product_id === (product.rent ? product.rent : product.sell ? product.sell : product.swap).id) ? true : false
      );
    }
  }, [favorites, product]);

  console.log(product)
  const handleToggleFav = async (e) => {
    e.stopPropagation();

    if (!authToken) return navigate("?auth=login");

    try {
      setIsFav((prev) => !prev);
      const formData = new FormData();
      formData.append("product_id", (product.rent ? product.rent : product.sell ? product.sell : product.swap).id);

      const res = await fetch(
        `${backend}/favorites/${isFav ? (product.rent ? product.rent : product.sell ? product.sell : product.swap).id : "store"}`,
        {
          method: isFav ? "DELETE" : "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",
          },
          body: isFav ? undefined : formData,
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong!");
      dispatch(
        isFav ? removeFromFavorites((product.rent ? product.rent : product.sell ? product.sell : product.swap).id) : addToFavorites(data.data)
      );
    } catch (error) {
      console.error("Error toggling favorite status:", error.message);
      setIsFav((prev) => !prev);
    }
  };

  const [page, setPage] = useState(1);
  const averageRate =
    useMemo(
      () =>
        product?.reviews.reduce((prev, cur) => prev + cur.rate, 0) /
        product?.reviews.length,
      [product]
    ) || 0;

  return (
    <div className={className}>
      {loading ? (
        <Spinner side={50} color="var(--secondary-color)" className="mx-auto" />
      ) : (
        product && (
          <>
            <div
              className={`d-flex gap-3 my-3 align-items-center justify-content-between`}
            >
              <div className="d-flex gap-2 align-items-center">
                <span className="border-0 d-block text-white bg-sec rounded-pill py-1 px-4">
                  <FontAwesomeIcon className="ms-2" icon={faRectangleList} />
                  التفاصيل
                </span>
                <button
                  onClick={handleToggleFav}
                  className={`border-0 rounded-circle ${classes["add-to-fav"]}`}
                  title="أضف إلى المفضلة"
                  style={{
                    color: "#707070",
                    backgroundColor: "var(--card-color)",
                  }}
                >
                  {isFav ? (
                    <FontAwesomeIcon
                      icon={faHeartSolid}
                      style={{ color: "red" }}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faHeart} />
                  )}
                </button>
              </div>
              <button className="border-0 bg-sec text-white rounded-pill py-1 px-4">
                {product.available ? "متاح" : "غير متاح"}
              </button>
            </div>
            <h6 className="my-2" style={{ color: "var(--product-text-color)" }}>
              {product.title}
            </h6>
            <h5 className="text-main mb-4">{(product.rent ? product.rent : product.sell ? product.sell : product.swap).descount}</h5>
            <div className="d-flex gap-2 my-3 w-75 align-items-center justify-content-between">
              <h6 style={{ color: "#424750" }} className="fw-semibold">
                المكان
              </h6>
              <div className="d-flex gap-2 align-items-center">
                <FontAwesomeIcon className="text-main" icon={faLocationDot} />
                <span
                  className="d-block"
                  style={{ color: "var(--product-text-color" }}
                >
                  {product.city.city_name_ar}
                </span>
              </div>
            </div>
            <div className="d-flex gap-2 my-3 w-75 align-items-center justify-content-between">
              <h6 style={{ color: "#424750" }} className="fw-semibold">
                السعر
              </h6>
              <div className="d-flex gap-2 align-items-center">
                <h6 className="text-main mb-0">{(product.rent ? product.rent : product.sell ? product.sell : product.swap).amount} جنيه</h6>
                <p className="text-sec mb-0">
                  لمدة {(product.rent ? product.rent : product.sell ? product.sell : product.swap).duration} {(product.rent ? product.rent : product.sell ? product.sell : product.swap).enum_durations}
                </p>
              </div>
            </div>
            {product.rent && <div className="my-3">
              <h6 className="text-main">شروط الحجز</h6>
              <div
                style={{ maxHeight: "350px" }}
                className=" overflow-auto scrollbar-none p-2 border my-3 rounded-3"
              >
                {product.rent ? product.rent.conditions.split("\n").map((text, i) => (
                  <p
                    key={i}
                    className="my-3"
                    style={{
                      color: "var(--product-text-color)",
                      fontSize: "0.95rem",
                    }}
                  >
                    {text}
                  </p>
                )) : null}
              </div>
            </div>}
            <div className="my-5">
              <h5 className="text-center">مراجعة المستخدمين</h5>
              <div className="d-flex gap-2 align-items-center justify-content-center">
                <div
                  className="d-flex align-items-center"
                  style={{ gap: "2px", fontSize: "0.8rem" }}
                >
                  {[...Array(5).keys()].map((i) => getStar(i, averageRate))}
                </div>
                <span
                  style={{ fontSize: "0.95rem" }}
                  className="fw-semibold d-block"
                >
                  {parseInt(averageRate) === averageRate
                    ? averageRate
                    : averageRate.toFixed(1)}{" "}
                  من 5
                </span>
              </div>
              <div>
                {product.reviews
                  .slice(0, page * itemsPerPage)
                  .map((review, i) => (
                    <SingleReview key={i} review={review} />
                  ))}
                {!product?.reviews.length && (
                  <p className="text-center text-danger my-3 fw-semibold">
                    لا توجد مراجعات!
                  </p>
                )}
              </div>
              {page < Math.ceil(product.reviews.length / itemsPerPage) && (
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  className={`btn text-main d-block border-0 mx-auto my-5 fw-semibold`}
                  style={{
                    backgroundColor: "#D9D9D9",
                  }}
                >
                  مشاهدة المزيد
                </button>
              )}
            </div>
          </>
        )
      )}
    </div>
  );
};

export default memo(ProductDetails);
