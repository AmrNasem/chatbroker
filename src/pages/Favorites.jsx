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
    if (!favoriteProducts) dispatch(fetchFavorites(authToken));
  }, [dispatch, authToken, favoriteProducts]);

  const [visibleItems, setVisibleItems] = useState(5);

  const handleShowMore = () => {
    setVisibleItems((prev) => prev + 5);
  };

  const visibleData = favoriteProducts?.slice(0, visibleItems);

  return (
    <main className={`px-4 py-5 ${favorites.page}`}>
      {status === "loading" ? (
        <h4 className="text-center">جارٍ التحميل...</h4>
      ) : favoriteProducts ? (
        favoriteProducts.length ? (
          <>
            <p className={`pe-3 ${favorites.title}`}>
              المفضلة ({favoriteProducts.length} منتجات)
            </p>
            <div className={favorites.offersContainer}>
              {visibleData.map((product) => (
                <FavoriteCard product={product} key={product.id} />
              ))}
            </div>
            {visibleItems < favoriteProducts.length && (
              <button
                onClick={handleShowMore}
                className={`mx-auto d-block py-2 px-3 ${favorites.showMore}`}
              >
                عرض المزيد
              </button>
            )}
          </>
        ) : (
          <h5 className="text-center">المفضلة فارغة!</h5>
        )
      ) : (
        <h5 className="text-center text-danger">{error}</h5>
      )}
    </main>
  );
};

export default memo(Favorites);
