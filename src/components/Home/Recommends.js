import { Container } from "react-bootstrap";
import ProductItem from "./ProductItem";
import { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardSkeleton from "../Skeleton/CardSkeleton";
import { backend } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";

const mySkeleton = (
  <div className="d-flex gap-4 my-4 flex-wrap">
    {[...Array(3).keys()].map((key) => (
      <CardSkeleton key={key} style={{ minWidth: "240px" }} />
    ))}
  </div>
);

const itemsPerPage = 20;

const Recommends = () => {
  const [page, setPage] = useState(1);

  const { products, loading } = useSelector((state) => state.products);

  const token = useSelector((state) => state.auth.token);
  const [recommendations, setRecommendations] = useState({
    value: [],
    loading: true,
    error: "",
  });

  console.log(recommendations, products);

  const getRecommendation = useCallback(async () => {
    try {
      setRecommendations((prev) => ({ ...prev, error: "", loading: true }));
      const res = await fetch(`${backend}/products/recommend`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) throw new Error(data.message || "خطأ في التحميل");
      setRecommendations({
        error: "",
        value: data.products,
        loading: false,
      });
    } catch (error) {
      setRecommendations((prev) => ({
        ...prev,
        error: error.message,
        loading: false,
      }));
    }
  }, [token]);

  useEffect(() => {
    getRecommendation();
  }, [getRecommendation]);

  if (
    !recommendations.value?.length &&
    !recommendations.loading &&
    !products?.length &&
    !loading
  )
    return;

  const getContent = (items, suspense) => (
    <>
      <div
        className="d-grid gap-4 justify-content-center"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
        }}
      >
        {items.slice(0, page * itemsPerPage).map((product, index) => (
          <ProductItem minWidth="230px" key={index} product={product} />
        ))}
      </div>
      {page < Math.ceil(items.length / itemsPerPage) &&
        (suspense ? (
          mySkeleton
        ) : (
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className={`btn d-block border-0 mx-auto my-5 fw-semibold`}
            style={{
              color: "var(--main-color)",
              backgroundColor: "#D9D9D9",
            }}
          >
            مشاهدة المزيد
          </button>
        ))}
    </>
  );

  return (
    <Container className="my-5 ">
      <div className="d-flex align-items-baseline">
        <h4 className="mb-4">منتجات قد تعجبك</h4>
        <h6 className="me-4 p-2 rounded-pill" style={{ backgroundColor: "#fff1e1", color: "var(--main-color)" }}>Powered by <span className="fw-bolder">AI</span>  <FontAwesomeIcon icon={faRobot} /></h6>
      </div>
      {recommendations.value?.length
        ? getContent(recommendations.value, recommendations.loading)
        : recommendations.loading
          ? mySkeleton
          : loading
            ? mySkeleton
            : getContent(products, loading)}
      {/* {recommendations.loading ? (
        mySkeleton
      ) : recommendations.error ? (
        <h5 className="flex-grow-1 text-center text-danger my-3 fw-semibold my-2">
          {recommendations.error}
        </h5>
      )} */}
    </Container>
  );
};

export default memo(Recommends);
