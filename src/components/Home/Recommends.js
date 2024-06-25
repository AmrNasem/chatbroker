import { Container } from "react-bootstrap";
import ProductItem from "./ProductItem";
import { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardSkeleton from "../Skeleton/CardSkeleton";
import { backend } from "../../App";

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

  // const products = useSelector((state) => state.products.items);

  const token = useSelector((state) => state.auth.token);
  const [recommendations, setRecommendations] = useState({
    value: [],
    loading: true,
    error: "",
  });

  console.log(recommendations, token);

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
    !recommendations.error
  )
    return;

  return (
    <Container className="my-5">
      <h4 className="mb-4">منتجات قد تعجبك</h4>
      {recommendations.loading ? (
        mySkeleton
      ) : recommendations.error ? (
        <h5 className="flex-grow-1 text-center text-danger my-3 fw-semibold my-2">
          {recommendations.error}
        </h5>
      ) : (
        <>
          <div
            className="d-grid gap-4 justify-content-center"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            }}
          >
            {recommendations.value
              .slice(0, page * itemsPerPage)
              .map((product, index) => (
                <ProductItem minWidth="230px" key={index} product={product} />
              ))}
          </div>
          {page < Math.ceil(recommendations.value.length / itemsPerPage) &&
            (recommendations.loading ? (
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
      )}
    </Container>
  );
};

export default memo(Recommends);
