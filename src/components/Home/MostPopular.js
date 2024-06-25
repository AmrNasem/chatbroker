import { Container } from "react-bootstrap";
import ProductItem from "./ProductItem";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardSkeleton from "../Skeleton/CardSkeleton";
import { fetchProducts } from "../../store/products-slice";

const MostPopular = () => {
  const { products, error, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  console.log(products, error, loading);

  useEffect(() => {
    if (!products) dispatch(fetchProducts());
  }, [dispatch, products]);

  if (!(products?.length || loading || error)) return;

  return (
    <Container className="my-5">
      <h4 className="mb-4">الأكثر رواجًا</h4>
      <div className="d-flex gap-4 py-3 px-2 overflow-auto scrollbar-none">
        {loading ? (
          <div className="d-flex gap-4 my-4 overflow-auto scrollbar-none">
            {[...Array(3).keys()].map((key) => (
              <CardSkeleton
                delay={key}
                key={key}
                style={{ minWidth: "240px" }}
              />
            ))}
          </div>
        ) : error ? (
          <p className="flex-grow-1 text-center fw-semibold my-2">{error}</p>
        ) : (
          products.map((product, index) => (
            <ProductItem width="230px" key={index} product={product} />
          ))
        )}
      </div>
    </Container>
  );
};

export default memo(MostPopular);
