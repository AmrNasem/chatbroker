import { useDispatch, useSelector } from "react-redux";
import FavoriteCard from "../components/FavoriteCard";
import favorites from "./Favorites.module.css";
import { memo, useEffect, useState } from "react";
import { fetchFavorites } from "../store/favoritesSlice";

const Favorites = () => {
  const dispatch = useDispatch();

  const authToken = useSelector((state) => state.auth.token);
  const {
    list: favoriteProducts,
    status,
    error,
  } = useSelector((state) => state.favorites);

  useEffect(() => {
    if (!favoriteProducts?.length) dispatch(fetchFavorites(authToken));
  }, [dispatch, authToken, favoriteProducts]);

  const [visibleItems = 5, setVisibleItems] = useState();

  const handleShowMore = () => {
    setVisibleItems((prev) => prev + 5);
  };

  const visibleData = favoriteProducts?.slice(0, visibleItems);
  console.log(visibleData);
  return (
    <main className={`px-4 py-5 ${favorites.page}`}>
      {status === "loading" ? (
        <h4 className="text-center">جارٍ التحميل...</h4>
      ) : !!favoriteProducts?.length ? (
        <>
          <p className={`pe-3 ${favorites.title}`}>
            المفضلة ({favoriteProducts.length} منتجات)
          </p>
          <div className={favorites.offersContainer}>
            {visibleData.map((product) => (
              <FavoriteCard product={product} key={product.id} />
            ))}
            {visibleItems < favoriteProducts.length && (
              <button onClick={handleShowMore} className={favorites.showMore}>
                Show More
              </button>
            )}
          </div>
        </>
      ) : (
        <h5 className="text-center">{error}</h5>
      )}
    </main>
  );
};

export default memo(Favorites);
