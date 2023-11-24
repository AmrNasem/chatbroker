import { memo, useEffect } from "react";
import classes from "./Categories.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/categories-slice";
import Spinner from "../../UI/Spinner";

const Categories = (props) => {
  const { categories, error } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  console.log(categories);
  useEffect(() => {
    if (!categories) {
      dispatch(fetchCategories("https://api.lepgo.online/api/v1/categories"));
    }
  }, [dispatch, categories]);
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
