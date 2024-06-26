import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "../Home/ProductItem.module.css";
import styles from "./MyProductCard.module.css";
import {
  faBagShopping,
  faLocationDot,
  faPen,
  faRepeat,
  faTag,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { memo, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Confirm from "../../UI/Confirm";
import { backend } from "../../App";
import { useSelector } from "react-redux";

const ProductItem = ({ minWidth, product, setProfile }) => {
  const [confirm, setConfirm] = useState(false);
  const [closing, setClosing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const token = useSelector((state) => state.auth.token);

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

  const handleClosure = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setConfirm(false);
      setClosing(false);
    }, 200);
  }, []);

  const handleDeleteProduct = useCallback(async () => {
    setDeleting(true);
    try {
      const res = await fetch(`${backend}/products/${product.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("خطأ في حذف المنتج");
      const data = await res.json();
      console.log(data);
      setProfile((prev) => ({
        ...prev,
        products: prev.products.filter((p) => p.id !== product.id),
      }));
      handleClosure();
    } catch (err) {
      console.log(err.message);
    }
    setDeleting(false);
  }, [handleClosure, product, setProfile, token]);

  return (
    <>
      <Link
        style={{ minWidth }}
        to={`/product/${product.id}`}
        className={`${classes.product} text-decoration-none d-flex flex-sm-row flex-column rounded-3 bg-white my-3`}
      >
        <div
          style={{ backgroundColor: "var(--pink-color)" }}
          className={`w-100 position-relative overflow-hidden rounded-top-3 ${styles.head}`}
        >
          <img
            className={`w-100 h-100 object-fit-cover`}
            src={product.image}
            alt={product.title}
          />
        </div>
        <div className={`${classes.body} flex-grow-1 d-flex flex-column p-2`}>
          <h5>{product.title}</h5>
          <p className={`fw-semibold ${classes.ellipsis} mt-2 mb-1`}>
            {product.desc}
          </p>
          <div className={`my-2 ${classes.location}`}>
            <FontAwesomeIcon className="ms-1" icon={faLocationDot} />
            {product.city}{" "}
          </div>
          {product.rent && (
            <div
              className={`d-flex gap-2 my-1 align-items-center ${classes.deal}`}
            >
              <FontAwesomeIcon icon={faTag} />
              <span className={`fw-semibold`}>الإيجار:</span>
              <span className="fw-semibold text-sec">
                {product.rent.amount} جنيه
              </span>
              <span className={`fw-semibold`}>لمدة:</span>
              <span className="text-sec fw-semibold">
                {product.rent.duration} {product.rent.enum_durations}
              </span>
            </div>
          )}
          {product.sell && (
            <div
              className={`d-flex gap-2 my-1 align-items-center ${classes.deal}`}
            >
              <FontAwesomeIcon style={{ color: "red" }} icon={faBagShopping} />
              <span className="fw-semibold">السعر:</span>
              <span className="text-sec fw-semibold">
                {product.sell.amount} جنيه
              </span>
            </div>
          )}
          {product.swap && (
            <div
              className={`d-flex gap-2 my-1 align-items-center ${classes.deal}`}
            >
              <FontAwesomeIcon icon={faRepeat} />
              <span className="fw-semibold">تبديل مع: </span>
              <span className="fw-semibold text-sec">
                {product.swap.swap_with}{" "}
              </span>
            </div>
          )}
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
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setConfirm(true);
              }}
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
      </Link>
      {confirm && (
        <Confirm
          actionHandler={handleDeleteProduct}
          closureHandler={handleClosure}
          closing={closing}
          loading={deleting}
        >
          هل تريد حقًا حذف هذا المنتج{" "}
          <span className="fw-semibold">({product.title})</span>؟
        </Confirm>
      )}
    </>
  );
};

export default memo(ProductItem);
