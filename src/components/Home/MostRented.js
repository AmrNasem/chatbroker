import { Container } from "react-bootstrap";
import ProductItem from "./ProductItem";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardSkeleton from "../Skeleton/CardSkeleton";
import { fetchProducts } from "../../store/products-slice";

const MostRented = () => {
  const { products, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) dispatch(fetchProducts());
  }, [dispatch, products]);

  return (
    <Container className="my-5">
      <h4 className="mb-4">الأكثر إيجارًا</h4>
      <div className="d-flex gap-4 py-3 px-2 overflow-auto scrollbar-none">
        {error ? (
          <p className="flex-grow-1 text-center fw-semibold my-2">{error}</p>
        ) : products ? (
          products
            .slice(3, 9)
            .map((product, index) => (
              <ProductItem minWidth="230px" key={index} product={product} />
            ))
        ) : (
          <div className="d-flex gap-4 my-4 overflow-auto scrollbar-none">
            {[...Array(3).keys()].map((key) => (
              <CardSkeleton
                delay={key}
                key={key}
                style={{ minWidth: "240px" }}
              />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default memo(MostRented);
