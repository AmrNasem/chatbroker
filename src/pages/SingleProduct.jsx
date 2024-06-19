import React, { memo, useEffect, useState } from "react";
import ProductDetails from "../components/Product/ProductDetails";
import ProductPreview from "../components/Product/ProductPreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import classes from "./SingleProduct.module.css";
import { backend } from "../App";
import { useParams } from "react-router";
import Spinner from "../UI/Spinner";
import { Link } from "react-router-dom";

const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSingleProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${backend}/products/${productId}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data.data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    getSingleProduct();
  }, [productId]);

  const images = product ? product.images.map(image => image) : [];

  const videos = [
    { image: "https://img.youtube.com/vi/CH50zuS8DD0/0.jpg", video: "https://www.youtube.com/embed/CH50zuS8DD0" },
    ...(product?.videos?.map(video => ({ image: video })) || [])
  ];
  const media = [...images, ...videos];

  return (
    <main className="container my-4 d-flex gap-4 flex-wrap flex-xl-nowrap">
      <div className={`d-flex gap-4 flex-wrap w-100 flex-lg-nowrap ${classes.details}`}>
        {loading ? (
          <Spinner side={50} color="var(--secondary-color)" className="mx-auto" />
        ) : error ? (
          <p>No Images</p>
        ) : (
          <ProductPreview images={media} loading={loading} error={error} className="flex-grow-1" />
        )}
        {loading ? (
          <Spinner side={50} color="var(--secondary-color)" className="mx-auto" />
        ) : error ? (
          <p>No Details</p>
        ) : (
          <ProductDetails details={product} loading={loading} error={error} className="flex-grow-1" />
        )}
      </div>
      <div className="flex-grow-1">
        {loading ? (
          <Spinner side={50} color="var(--secondary-color)" className="mx-auto" />
        ) : (
          <div style={{ border: "1px solid #707070" }} className="rounded-3 p-2">
            <h5 className="text-main text-center">للمزيد من البيانات</h5>
            <p className="text-sec text-center fw-semibold" style={{ fontSize: "0.8rem" }}>
              تواصل مع البائع
            </p>
            <div style={{ height: "100px", border: "1px solid #707070" }} className="position-relative rounded-3 bg-light my-5">
              <div
                style={{ transform: "translateY(-50%)", border: "1px solid #707070" }}
                className="bg-light text-main position-absolute end-0 rounded-pill d-flex align-items-center gap-2"
              >
                <div style={{ maxWidth: "33px", maxHeight: "33px" }} className="rounded-circle overflow-hidden">
                  <img
                    src={product?.user.image}
                    className="w-100 h-100 object-fit-cover"
                    alt=""
                  />
                </div>
                <span className="d-block ms-3 fw-semibold text-truncate" style={{ fontSize: "0.8rem" }}>
                  {product?.user.name}
                </span>
              </div>
              <Link
                to="/chat"
                style={{ fontSize: "0.9rem" }}
                className="text-white text-decoration-none bg-sec border-0 text-nowrap rounded-2 px-2 py-1 position-absolute start-50 top-100 translate-middle"
              >
                <FontAwesomeIcon icon={faComments} className="ms-1" />
                تواصل معي
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default memo(SingleProduct);
