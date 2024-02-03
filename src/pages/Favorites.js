import FavoriteCard from "../components/FavoriteCard"
import favorites from "./Favorites.module.css"

const Favorites = () => {
  return (
    <>
      <p className={favorites.title}>المفضلة (5 منتجات)</p>
      <div className={favorites.offersContainer} >
        {[...Array(15)].map((product, index) => (
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