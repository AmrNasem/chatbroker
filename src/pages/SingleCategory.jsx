import { useEffect, useState } from "react";
import MostPopular from "../components/Home/MostPopular";
import ProductItem from "../components/Home/ProductItem";
import { backend } from "../App";
import { useParams } from "react-router-dom";
import CardSkeleton from "../components/Skeleton/CardSkeleton";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../store/categories-slice";

const SingleCategory = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { currentCategory, categories } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (!currentCategory && categories)
      dispatch(setCategory(categories.find((cat) => cat.id === +categoryId)));
  }, [currentCategory, categories, categoryId, dispatch]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${backend}/categories/${categoryId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "حدث خطأ ما");
        setProducts(data.data);
        console.log(data);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [categoryId]);

  return (
    <main>
      <Container className="my-5">
        {currentCategory && <h4 className="">{currentCategory.title}</h4>}
        <div className="d-flex gap-4 py-3 px-2 overflow-auto scrollbar-none">
          {loading ? (
            [...Array(3).keys()].map((i) => (
              <CardSkeleton delay={i} key={i} style={{ minWidth: "240px" }} />
            ))
          ) : error ? (
            <h5 className="text-center text-danger flex-grow-1">{error}</h5>
          ) : !products.length ? (
            <h5 className="text-center flex-grow-1">لا توجد منتجات!</h5>
          ) : (
            products.map((product, index) => (
              <ProductItem maxWidth="240px" key={index} product={product} />
            ))
          )}
        </div>
      </Container>
      <MostPopular />
    </main>
  );
};

export default SingleCategory;
