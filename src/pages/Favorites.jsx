import { useSelector } from "react-redux";
import FavoriteCard from "../components/FavoriteCard"
import favorites from "./Favorites.module.css"
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { fetchFavorites } from '../store/favoritesSlice';

const Favorites = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const favoriteProducts = useSelector((state) => state.favorites.list);

  const [visibleItems = 5, setVisibleItems] = useState();

  const handleShowMore = () => {
    setVisibleItems(visibleItems + 5);
  };

  const visibleData = favoriteProducts.slice(0, visibleItems);
  return (
    <>
      <p className={favorites.title}>المفضلة ({favoriteProducts.length} منتجات)</p>
      <div className={favorites.offersContainer} >
        {visibleData.map((product) => (
          <div className={favorites.card} key={product.id}>
            <FavoriteCard product={product} />
          </div>
        )
        )}
        {visibleItems < favoriteProducts.length && (
          <button onClick={handleShowMore} className={favorites.showMore}>Show More</button>
        )}
      </div>
    </>
  )
}

export default Favorites;
