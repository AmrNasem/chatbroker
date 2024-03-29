import { useMemo } from "react";
import Spinner from "../../UI/Spinner";
import MyProductCard from "./MyProductCard";
import ProfileHeader from "./ProfileHeader";

const MyProducts = ({ products, loading, error, setProfile }) => {
  console.log(products);
  console.log(loading);
  console.log(error);
  const range = useMemo(() => Math.ceil(products?.length / 2) || 0, [products]);

  return (
    <div className="bg-light rounded-3 my-3 overflow-hidden">
      <ProfileHeader title="منتجاتي" />
      {error ? (
        <p className="text-center text-danger">{error.message} المنتجات!</p>
      ) : loading ? (
        <Spinner
          side={50}
          stroke={4}
          color="var(--secondary-color)"
          className="mx-auto my-3"
        />
      ) : (
        <div className="d-flex gap-lg-5 mx-4 flex-lg-row flex-column my-2">
          {!!products.slice(0, range).length && (
            <div className="flex-grow-1">
              {products.slice(0, range).map((prod) => (
                <MyProductCard
                  setProfile={setProfile}
                  key={prod.id}
                  product={prod}
                />
              ))}
            </div>
          )}
          {products.length > 1 && (
            <div
              className="d-none d-lg-block"
              style={{
                width: "1.5px",
                backgroundColor: "#ddd",
              }}
            ></div>
          )}
          {!!products.slice(range).length && (
            <div className="flex-grow-1">
              {products.slice(range).map((prod) => (
                <MyProductCard
                  setProfile={setProfile}
                  key={prod.id}
                  product={prod}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
