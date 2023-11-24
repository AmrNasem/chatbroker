import { memo, useEffect } from "react";
import classes from "./Categories.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/categories-slice";
import Spinner from "../../UI/Spinner";

const Categories = (props) => {
  const { categories, error, loading } = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!categories && !loading && !error) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories, loading, error]);

  return (
    <div className={`${classes.categories} ${props.className} py-1`}>
      {error ? (
        <p>{error}</p>
      ) : categories ? (
        categories.map((cat) => (
          <Link
            key={cat.id}
            className="text-decoration-none d-block text-nowrap p-2 d-inline-block"
            to={`/category/${cat.id}`}
          >
            {cat.title_ar}
          </Link>
        ))
      ) : (
        <Spinner className="mx-auto my-1" stroke={4} side={40} />
      )}
    </div>
  );
};

export default memo(Categories);
