import React, { memo, useCallback, useEffect, useState } from "react";
import ProductDetails from "../components/Product/ProductDetails";
import ProductPreview from "../components/Product/ProductPreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import classes from "./SingleProduct.module.css";
import styles from "../components/Product/ProductPreview.module.css";
import { backend } from "../App";
import { useParams } from "react-router";
import Spinner from "../UI/Spinner";
import { chatURL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openChat } from "../store/chat-slice";
import Alert from "../UI/Alert";

const SingleProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newChat, setNewChat] = useState({ loading: false, error: null });
  const [closing, setClosing] = useState(false);
  const [purchase, setPurchase] = useState({ loading: false, error: null });

  console.log(product);

  const handleClosure = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setNewChat((prev) => ({ ...prev, error: null }));
      setClosing(false);
    }, 300);
  }, []);

  useEffect(() => {
    const getSingleProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${backend}/products/${productId}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setProduct(data.data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    getSingleProduct();
  }, [productId]);

  const handleNewConversation = async () => {
    if (!token) return navigate("?auth=login");
    try {
      setNewChat((prev) => ({ ...prev, error: null, loading: true }));
      const res = await fetch(`${chatURL}/startConversation`, {
        method: "POST",
        body: JSON.stringify({
          senderId: user.id,
          recieverId: product.user.id,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "حدثت مشكلة ما!");
      const { conversation, ...rest } = data.payload;
      console.log({ ...conversation, ...rest });
      setNewChat((prev) => ({ ...prev, loading: false }));
      dispatch(openChat({ chat: { ...conversation, ...rest } }));
      navigate("/chat");
    } catch (error) {
      setNewChat((prev) => ({ ...prev, error: error.message, loading: false }));
    }
  };

  const handlePayment = async (e) => {
    if (!token) return navigate("?auth=login");

    try {
      setPurchase((prev) => ({ ...prev, error: null, loading: true }));
      const res = await fetch(`${backend}/stripe/checkout`, {
        method: "POST",
        body: JSON.stringify({
          email: user.email,
          products: [
            {
              product_id: productId,
              price: product[e.target.id].amount,
              model: e.target.id,
            },
          ],
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) throw new Error(data.message || "حدثت مشكلة ما!");
      setPurchase((prev) => ({ ...prev, loading: false }));
      window.open(data.url);
    } catch (error) {
      setPurchase((prev) => ({
        ...prev,
        error: error.message,
        loading: false,
      }));
      console.log(error.messagey);
    }
  };

  return (
    <main className="container my-4 d-flex gap-4 flex-wrap flex-xl-nowrap">
      <div
        className={`d-flex gap-4 flex-wrap w-100 flex-lg-nowrap ${classes.details}`}
      >
        {loading ? (
          <Spinner
            side={50}
            color="var(--secondary-color)"
            className="mx-auto"
          />
        ) : error ? (
          <p>No Images</p>
        ) : (
          <div className={`${styles.navigator} w-100`}>
            <div className="position-sticky" style={{ top: "1rem" }}>
              <ProductPreview
                images={product.images}
                loading={loading}
                error={error}
              />
              {product.sell && !(product.user.id === user?.id) && (
                <button
                  disabled={purchase.loading}
                  onClick={handlePayment}
                  id="sell"
                  className={`d-block w-100 ${
                    purchase.loading ? "opacity-50" : ""
                  } text-white bg-main my-3 p-3 rounded-1 border-0`}
                >
                  اشتري الآن
                </button>
              )}
              {product.rent && !(product.user.id === user?.id) && (
                <button
                  disabled={purchase.loading}
                  onClick={handlePayment}
                  id="rent"
                  className={`d-block w-100 ${
                    purchase.loading ? "opacity-50" : ""
                  } text-white bg-sec my-3 p-3 rounded-1 border-0`}
                >
                  استأجر الآن
                </button>
              )}
            </div>
          </div>
        )}
        {loading ? (
          <Spinner
            side={50}
            color="var(--secondary-color)"
            className="mx-auto"
          />
        ) : error ? (
          <p>No Details</p>
        ) : (
          <ProductDetails
            details={product}
            loading={loading}
            error={error}
            className="flex-grow-1"
          />
        )}
      </div>
      {user?.id !== product?.user.id && (
        <div style={{ minWidth: "250px" }} className="flex-grow-1">
          {loading ? (
            <Spinner
              side={50}
              color="var(--secondary-color)"
              className="mx-auto"
            />
          ) : (
            <div
              style={{ border: "1px solid #707070" }}
              className="rounded-3 p-2"
            >
              <h5 className="text-main text-center">للمزيد من البيانات</h5>
              <p
                className="text-sec text-center fw-semibold"
                style={{ fontSize: "0.8rem" }}
              >
                تواصل مع البائع
              </p>
              <div
                style={{ height: "100px", border: "1px solid #707070" }}
                className="position-relative rounded-3 bg-light my-5"
              >
                <div
                  style={{
                    transform: "translateY(-50%)",
                    border: "1px solid #707070",
                  }}
                  className="bg-light text-main position-absolute end-0 rounded-pill d-flex align-items-center gap-2"
                >
                  <div
                    style={{ maxWidth: "33px", maxHeight: "33px" }}
                    className="rounded-circle overflow-hidden"
                  >
                    <img
                      src={
                        product?.user.image || require("../assets/person.jpeg")
                      }
                      className="w-100 h-100 object-fit-cover"
                      alt=""
                    />
                  </div>
                  <span
                    className="d-block ms-3 fw-semibold text-truncate"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {product?.user.name}
                  </span>
                </div>
                {newChat.loading ? (
                  <div
                    className={`position-absolute start-50 top-100 translate-middle`}
                  >
                    <Spinner
                      color="var(--secondary-color)"
                      side={35}
                      stroke={4}
                    />
                  </div>
                ) : (
                  <button
                    onClick={handleNewConversation}
                    style={{ fontSize: "0.9rem" }}
                    className={`text-white text-decoration-none bg-sec border-0 text-nowrap rounded-2 px-2 py-1 position-absolute start-50 top-100 translate-middle`}
                  >
                    <FontAwesomeIcon icon={faComments} className="ms-1" />
                    تواصل معي
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      {newChat.error && (
        <Alert closing={closing} closureHandler={handleClosure}>
          {newChat.error}
        </Alert>
      )}
    </main>
  );
};

export default memo(SingleProduct);
