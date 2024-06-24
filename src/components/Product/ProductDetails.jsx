import { faHeart, faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./ProductDetails.module.css";
import {
  faStar,
  faLocationDot,
  faStarHalf,
} from "@fortawesome/free-solid-svg-icons";
import { memo, useMemo, useState } from "react";
import SingleReview from "./SingleReview";
import Spinner from "../../UI/Spinner";

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
// const reviews = [
//   {
//     authorName: "دينا أحمد",
//     rate: 3,
//     title: "عنوان للتعليق",
//     description: "جيد وسعره مناسب ولكن ليس كما هو في الصورة.",
//   },
//   {
//     authorName: "محمد حجي",
//     rate: 4,
//     title: "عنوان للتعليق",
//     description: "جيد وسعره مناسب ولكن ليس كما هو في الصورة.",
//   },
//   {
//     authorName: "كريم إسماعيل",
//     rate: 1,
//     title: "عنوان للتعليق",
//     description: "سيء للغاية ولن أشتريه مرة أخرى",
//   },
//   {
//     authorName: "دينا أحمد",
//     rate: 3,
//     title: "عنوان للتعليق",
//     description: "جيد وسعره مناسب ولكن ليس كما هو في الصورة.",
//   },
//   {
//     authorName: "محمد حجي",
//     rate: 4,
//     title: "عنوان للتعليق",
//     description: "جيد وسعره مناسب ولكن ليس كما هو في الصورة.",
//   },
//   {
//     authorName: "كريم إسماعيل",
//     rate: 1,
//     title: "عنوان للتعليق",
//     description: "سيء للغاية ولن أشتريه مرة أخرى",
//   },
// ];

const ProductDetails = ({ className, details, error, loading }) => {
  const [page, setPage] = useState(1);
  const averageRate =
    useMemo(
      () =>
        details?.reviews.reduce((prev, cur) => prev + cur.rate, 0) /
        details?.reviews.length,
      [details]
    ) || 0;

  const {
    city_name_ar: city,
    governorate: { governorate_name_ar: gov },
  } = details?.city;
  return (
    <div className={className}>
      {loading ? (
        <Spinner side={50} color="var(--secondary-color)" className="mx-auto" />
      ) : (
        details && (
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
                  onClick={(e) => e.stopPropagation()}
                  className={`border-0 rounded-circle ${classes["add-to-fav"]}`}
                  title="أضف إلى المفضلة"
                >
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>
              <button className="border-0 bg-sec text-white rounded-pill py-1 px-4">
                {details.available ? "متاح" : "غير متاح"}
              </button>
            </div>
            <h6 className="my-2" style={{ color: "var(--product-text-color)" }}>
              {details.title}
            </h6>
            <h5 className="text-main mb-4">{details.desc}</h5>
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
            {details.sell && (
              <div className="d-flex gap-2 my-3 w-75 align-items-center justify-content-between">
                <h6 style={{ color: "#424750" }} className="fw-semibold">
                  السعر
                </h6>
                <h6 className="text-main mb-0">{details.sell.amount} جنيه</h6>
              </div>
            )}
            {details.rent && (
              <div className="d-flex gap-2 my-3 w-75 align-items-center justify-content-between">
                <h6 style={{ color: "#424750" }} className="fw-semibold">
                  للإيجار
                </h6>
                <div className="d-flex gap-2 align-items-center">
                  <h6 className="text-main mb-0">{details.rent.amount} جنيه</h6>
                  <p className="text-sec mb-0">
                    لمدة {details.rent.duration} {details.rent.enum_durations}
                  </p>
                </div>
              </div>
            )}
            {details.swap && (
              <div className="d-flex gap-2 my-3 w-75 align-items-center justify-content-between">
                <h6 style={{ color: "#424750" }} className="fw-semibold">
                  تبديل مع
                </h6>
                <h6 className="text-main mb-0">{details.swap.swap_with}</h6>
              </div>
            )}
            {details.rent && (
              <div className="my-3">
                <h6 className="text-main">شروط الحجز</h6>
                <div
                  style={{ maxHeight: "350px" }}
                  className=" overflow-auto scrollbar-none p-2 border my-3 rounded-3"
                >
                  {details.rent.conditions.split("\n").map((text, i) => (
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
              <div>
                {details.reviews
                  .slice(0, page * itemsPerPage)
                  .map((review, i) => (
                    <SingleReview key={i} review={review} />
                  ))}
                {!details?.reviews.length && (
                  <p className="text-center text-danger my-3 fw-semibold">
                    لا توجد مراجعات!
                  </p>
                )}
              </div>
              {page < Math.ceil(details.reviews.length / itemsPerPage) && (
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
