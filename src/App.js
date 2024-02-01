import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import { Route, Routes, useSearchParams } from "react-router-dom";
import Home from "./pages/Home";
import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import MobileHeader from "./components/Header/MobileHeader";
import Footer from "./components/Footer";
import { Offers } from "./pages/Offers";
import SingleProduct from "./pages/SingleProduct";
import Auth from "./components/Auth/Auth";
import NewProduct from "./pages/NewProduct";
import { useSelector } from "react-redux";
import Overlay from "./UI/Overlay";

export const backend = "https://chat-broker-api.azurewebsites.net/api/v1";

function App() {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const authedUser = useSelector((state) => state.auth.user);
  const [params, setParams] = useSearchParams();

  const closeAuthHandler = useCallback(
    () =>
      setParams((prev) => {
        prev.delete("auth");
        return prev;
      }),
    [setParams]
  );

  useEffect(() => {
    const changeSize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", changeSize);
    return () => window.removeEventListener("resize", changeSize);
  }, []);

  return (
    <div className="App d-flex flex-column">
      {!authedUser && params.get("auth") && (
        <Overlay className="px-2" onClick={closeAuthHandler}>
          <Auth onClick={closeAuthHandler} />
        </Overlay>
      )}
      {screenSize < 768 ? <MobileHeader /> : <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        {authedUser && (
          <>
            <Route
              path="/profile"
              element={
                <main>
                  <h2>Profile</h2>
                </main>
              }
            />
            <Route
              path="/chat"
              element={
                <main>
                  <h2>Chat</h2>
                </main>
              }
            />
            <Route
              path="/favorites"
              element={
                <main>
                  <h2>Favorites</h2>
                </main>
              }
            />
            <Route
              path="/cart"
              element={
                <main>
                  <h2>Cart</h2>
                </main>
              }
            />
            <Route path="/new-product" element={<NewProduct />} />
          </>
        )}
        <Route path="/offers" element={<Offers />} />
        <Route path="/product/:productId" element={<SingleProduct />} />
        <Route
          path="/category/:categoryId"
          element={
            <main>
              <h2>Category</h2>
            </main>
          }
        />
        <Route
          path="/*"
          element={
            <main>
              <h2 className="text-center my-3">Page not found</h2>
            </main>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
