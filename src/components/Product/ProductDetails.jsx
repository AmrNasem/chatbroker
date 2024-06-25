import { faHeart, faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./ProductDetails.module.css";
import {
  faStar,
  faLocationDot,
  faStarHalf,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { memo, useEffect, useCallback, useMemo, useState } from "react";
import SingleReview from "./SingleReview";
import Spinner from "../../UI/Spinner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../store/favoritesSlice";
import { backend } from "../../App";
import AddReview from "../Reviews/AddReview";

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

const itemsPerPage = 10;
// const initialReviews = [
//   {
//     user: { name: "دينا أحمد" },
//     rate: 3,
//     comment: "جيد وسعره مناسب ولكن ليس كما هو في الصورة.",
//   },
//   {
//     user: { name: "محمد حجي" },
//     rate: 4,
//     comment: "جيد وسعره مناسب ولكن ليس كما هو في الصورة.",
//   },
//   {
//     user: { name: "كريم إسماعيل" },
//     rate: 1,
//     comment: "سيء للغاية ولن أشتريه مرة أخرى",
//   },
//   {
//     user: { name: "دينا أحمد" },
//     rate: 3,
//     comment: "جيد وسعره مناسب ولكن ليس كما هو في الصورة.",
//   },
//   {
//     user: { name: "محمد حجي" },
//     rate: 4,
//     comment: "جيد وسعره مناسب ولكن ليس كما هو في الصورة.",
//   },
//   {
//     user: { name: "كريم إسماعيل" },
//     rate: 1,
//     comment: "سيء للغاية ولن أشتريه مرة أخرى",
//   },
// ];

const ProductDetails = ({ className, product, error, loading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.list);
  const authToken = useSelector((state) => state.auth.token);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (favorites && product) {
      setIsFav(
        favorites.find((item) => item.product_id === product.id) ? true : false
      );
    }
  }, [favorites, product]);

  const handleToggleFav = async (e) => {
    e.stopPropagation();

    if (!authToken) return navigate("?auth=login");

    try {
      setIsFav((prev) => !prev);
      const formData = new FormData();
      formData.append("product_id", product.id);

      const res = await fetch(
        `${backend}/favorites/${isFav ? product.id : "store"}`,
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
        isFav ? removeFromFavorites(product.id) : addToFavorites(data.data)
      );
    } catch (error) {
      console.log(error.message);
      setIsFav((prev) => !prev);
    }
  };

  const [newReviewClosing, setNewReviewClosing] = useState(false);
  const [newReview, setNewReview] = useState(false);
  const [reviews, setReviews] = useState(product.reviews);
  const user = useSelector((state) => state.auth.user);

  const handleNewReviewClosure = useCallback(() => {
    setNewReviewClosing(true);
    setTimeout(() => {
      setNewReview(false);
      setNewReviewClosing(false);
    }, 300);
  }, []);

  const [page, setPage] = useState(1);
  const averageRate =
    useMemo(
      () =>
        reviews?.reduce((prev, cur) => prev + cur.rate, 0) / reviews?.length,
      [reviews]
    ) || 0;

  const {
    city: { city_name_ar: city },
    governorate: { governorate_name_ar: gov },
  } = product;

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
            <h5 className="text-main mb-4">{product.desc}</h5>
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
                  {gov} / {city}
                </span>
              </div>
            </div>
            {product.sell && (
              <div className="d-flex gap-2 my-3 w-75 align-items-center justify-content-between">
                <h6 style={{ color: "#424750" }} className="fw-semibold">
                  السعر
                </h6>
                <h6 className="text-main mb-0">{product.sell.amount} جنيه</h6>
              </div>
            )}
            {product.rent && (
              <div className="d-flex gap-2 my-3 w-75 align-items-center justify-content-between">
                <h6 style={{ color: "#424750" }} className="fw-semibold">
                  للإيجار
                </h6>
                <div className="d-flex gap-2 align-items-center">
                  <h6 className="text-main mb-0">{product.rent.amount} جنيه</h6>
                  <p className="text-sec mb-0">
                    لمدة {product.rent.duration} {product.rent.enum_durations}
                  </p>
                </div>
              </div>
            )}
            {product.swap && (
              <div className="d-flex gap-2 my-3 w-75 align-items-center justify-content-between">
                <h6 style={{ color: "#424750" }} className="fw-semibold">
                  تبديل مع
                </h6>
                <h6 className="text-main mb-0">{product.swap.swap_with}</h6>
              </div>
            )}
            {product.rent && (
              <div className="my-3">
                <h6 className="text-main">شروط الحجز</h6>
                <div
                  style={{ maxHeight: "350px" }}
                  className=" overflow-auto scrollbar-none p-2 border my-3 rounded-3"
                >
                  {product.rent.conditions.split("\n").map((text, i) => (
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
                  ))}
                </div>
              </div>
            )}
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
              {!reviews?.find((review) => review.user.id === user.id) && (
                <button
                  onClick={() => setNewReview(true)}
                  className="btn border-0 text-white bg-sec d-block border-0 mx-auto mb-5 mt-3"
                >
                  أضف مراجعتك
                </button>
              )}
              <div>
                {reviews.slice(0, page * itemsPerPage).map((review, i) => (
                  <SingleReview
                    key={i}
                    review={review}
                    setReviews={setReviews}
                  />
                ))}
                {!reviews?.length && (
                  <p className="text-center text-danger my-3 fw-semibold">
                    لا توجد مراجعات!
                  </p>
                )}
              </div>
              {page < Math.ceil(reviews.length / itemsPerPage) && (
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
      {newReview && (
        <AddReview
          onClick={handleNewReviewClosure}
          closing={newReviewClosing}
          // productId={details.id}
          setReviews={setReviews}
        />
      )}
    </div>
  );
};

export default memo(ProductDetails);
