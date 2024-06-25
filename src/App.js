import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import { Route, Routes, useSearchParams } from "react-router-dom";
import Home from "./pages/Home";
import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import MobileHeader from "./components/Header/MobileHeader";
import Footer from "./components/Footer";
import Offers from "./pages/Offers";
import SingleCategory from "./pages/SingleCategory";
import Favorites from "./pages/Favorites";
import SingleProduct from "./pages/SingleProduct";
import Auth from "./components/Auth/Auth";
import NewProduct from "./pages/NewProduct";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./pages/Profile";
import { getCookie } from "./utils/general";
import { authenticateUser } from "./store/auth-slice";
import Chat from "./pages/Chat";
import { fetchFavorites } from "./store/favoritesSlice";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";

export const backend = "https://chat-broker-api.azurewebsites.net/api/v1";

function App() {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const { user: authedUser, token } = useSelector((state) => state.auth);
  const [params, setParams] = useSearchParams();
  const dispatch = useDispatch();
  const [authClosing, setAuthClosing] = useState(false);

  const closeAuthHandler = useCallback(() => {
    setAuthClosing(true);
    setTimeout(() => {
      setParams((prev) => {
        prev.delete("auth");
        return prev;
      });
      setAuthClosing(false);
    }, 200);
  }, [setParams]);

  useEffect(() => {
    const user = getCookie("userData");
    if (user) dispatch(authenticateUser(JSON.parse(user)));
  }, [dispatch]);

  useEffect(() => {
    const changeSize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", changeSize);
    return () => window.removeEventListener("resize", changeSize);
  }, []);

  useEffect(() => {
    if (token) dispatch(fetchFavorites(token));
  }, [dispatch, token]);

  return (
    <div className="App d-flex flex-column">
      {!authedUser && params.get("auth") && (
        <Auth closing={authClosing} onClick={closeAuthHandler} />
      )}
      {screenSize < 768 ? <MobileHeader /> : <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        {authedUser && (
          <>
            <Route path="/profile/*" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/favorites" element={<Favorites />} />
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
        <Route path="/category/:categoryId" element={<SingleCategory />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search" element={<Search />} />
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
