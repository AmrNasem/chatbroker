import { memo, useEffect } from "react";
import classes from "./Categories.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/categories-slice";
import Skeleton from "../Skeleton/Skeleton";

const Categories = (props) => {
  const { categories, error } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!categories) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  return (
    <div
      className={`${classes.categories} ${props.className} remove-scrollbar py-1`}
    >
      {error ? (
        <p className="flex-grow-1 text-center fw-semibold my-2">{error}</p>
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
        // <Spinner className="mx-auto my-1" stroke={4} side={40} />
        [...Array(10).keys()].map((item) => (
          <Skeleton className={`w-title my-3 my-md-2`} key={item} />
        ))
      )}
    </div>
  );
};

export default memo(Categories);
