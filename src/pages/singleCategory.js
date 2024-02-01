import MostRented from "../components/Home/MostRented"
import ProductItem from "../components/Home/ProductItem"
import SCategory from "./SingleCategory.module.css"

export const SingleCategory = () => {
  return (
    <>
      <p className={SCategory.title}>اسم الفئة</p>
      <div className={SCategory.offersContainer} >
        {[...Array(15)].map((product, index) => (
          <div className={SCategory.card}>
            <ProductItem key={index} />
          </div>
        )
        )}
      </div>
      <MostRented />
    </>
  )
}