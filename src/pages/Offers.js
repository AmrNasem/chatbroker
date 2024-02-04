import ProductItem from "../components/Home/ProductItem"
import offers from "./Offers.module.css"

export const Offers = () => {
  return (
    <>
      <p className={offers.title}>العروض</p>
      <div className={offers.offersContainer} >
        {[...Array(15)].map((product, index) => (
          <div className={offers.card} key={index}>
            <ProductItem />
          </div>
        )
        )}
      </div>
    </>
  )
}