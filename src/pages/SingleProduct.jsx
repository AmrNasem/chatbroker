import React, { memo } from "react";
import ProductDetails from "../components/Product/ProductDetails";
import ProductPreview from "../components/Product/ProductPreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import classes from "./SingleProduct.module.css";

const SingleProduct = () => {
  return (
    <main className="container my-4 d-flex gap-4 flex-wrap flex-xl-nowrap">
      <div
        className={`d-flex gap-4 flex-wrap w-100 flex-lg-nowrap ${classes.details}`}
      >
        <ProductPreview className="flex-grow-1" />
        <ProductDetails className="flex-grow-1" />
      </div>
      <div className="flex-grow-1">
        <div style={{ border: "1px solid #707070" }} className="rounded-3 p-2">
          <h5 className="text-main text-center">للمزيد من البيانات</h5>
          <p
            className="text-sec text-center fw-semibold"
            style={{ fontSize: "0.8rem" }}
          >
            تواصل مع البائع
          </p>
          <div
            style={{ height: "100px", border: "1px solid #707070" }}
            className="position-relative rounded-3 bg-light my-5"
          >
            <div
              style={{
                transform: "translateY(-50%)",
                border: "1px solid #707070",
              }}
              className="bg-light text-main position-absolute end-0 rounded-pill d-flex align-items-center gap-2"
            >
              <div
                style={{ maxWidth: "33px", maxHeight: "33px" }}
                className="rounded-circle overflow-hidden"
              >
                <img
                  src={require("../assets/avatar.png")}
                  className="w-100 h-100 object-fit-cover"
                  alt=""
                />
              </div>
              <span
                className="d-block ms-3 fw-semibold text-truncate"
                style={{ fontSize: "0.8rem" }}
              >
                عمرو نسيم عبد القادر
              </span>
            </div>
            <button
              style={{ fontSize: "0.9rem" }}
              className="text-white bg-sec border-0 text-nowrap rounded-2 px-2 py-1 position-absolute start-50 top-100 translate-middle"
            >
              <FontAwesomeIcon icon={faComments} className="ms-1" />
              تواصل معي
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default memo(SingleProduct);
