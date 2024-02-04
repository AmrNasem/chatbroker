import { useSelector } from "react-redux";
import FavoriteCard from "../components/FavoriteCard"
import favorites from "./Favorites.module.css"
import ProductItem from "../components/Home/ProductItem";

const Favorites = () => {
  const favoriteProducts = useSelector((state) => state.favorites.list);
  return (
    <>
      <p className={favorites.title}>المفضلة ({favoriteProducts.length} منتجات)</p>
      <div className={favorites.offersContainer} >
        {favoriteProducts.map((product, index) => (
          <div className={favorites.card} key={index}>
            <FavoriteCard />
          </div>
        )
        )}
      </div>
    </>
  )
}

export default Favorites;