import { Container } from "react-bootstrap";
import ProductItem from "./ProductItem";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/products-slice";
import CardSkeleton from "../Skeleton/CardSkeleton";

const mySkeleton = (
  <div className="d-flex gap-4 my-4 flex-wrap">
    {[...Array(3).keys()].map((key) => (
      <CardSkeleton key={key} style={{ minWidth: "240px" }} />
    ))}
  </div>
);

const Recommends = () => {
  const { products, error, lastPage, page, loading } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  console.log(products);

  if (!(products?.length || loading || error)) return;

  return (
    <Container className="my-5">
      <h4 className="mb-4">منتجات قد تعجبك</h4>
      {error ? (
        <p className="flex-grow-1 text-center fw-semibold my-2">{error}</p>
      ) : products ? (
        <>
          <div
            className="d-grid gap-4 justify-content-center"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            }}
          >
            {products.map((product, index) => (
              <ProductItem minWidth="230px" key={index} product={product} />
            ))}
          </div>
          {page <= lastPage &&
            (loading ? (
              mySkeleton
            ) : (
              <button
                onClick={() => dispatch(fetchProducts(page))}
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
      ) : (
        mySkeleton
      )}
    </Container>
  );
};

export default memo(Recommends);
