import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import { Route, Routes, useSearchParams } from "react-router-dom";
import Home from "./pages/Home";
import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import MobileHeader from "./components/Header/MobileHeader";
import Footer from "./components/Footer";
import SingleProduct from "./pages/SingleProduct";
import Auth from "./components/Auth/Auth";
import NewProduct from "./pages/NewProduct";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./pages/Profile";
import { getCookie } from "./utils/general";
import { authenticateUser } from "./store/auth-slice";
import Chat from "./pages/Chat";
import io from "socket.io-client";
import {
  connectSocket,
  disconnectSocket,
  receiveMessage,
  setOnlineUsers,
} from "./store/chat-slice";

export const backend = "https://chat-broker-api.azurewebsites.net/api/v1";

function App() {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const authedUser = useSelector((state) => state.auth.user);
  const [params, setParams] = useSearchParams();
  const dispatch = useDispatch();
  const [authClosing, setAuthClosing] = useState(false);
  const [messageSound, setMessageSound] = useState(false);

  const handlePlaySound = () => {
    setMessageSound(true);
    setTimeout(() => {
      setMessageSound(false);
    }, 2000);
  };

  useEffect(() => {
    if (!authedUser) return;
    const soc = io(
      `https://chat-server-dgx4.onrender.com?userId=${authedUser.id}`,
      {
        transports: ["websocket"],
        autoConnect: false,
      }
    );
    soc.on("users", (data) => dispatch(setOnlineUsers(data)));
    soc.on("getMessage", (data) => {
      dispatch(receiveMessage(data));
      handlePlaySound();
    });
    dispatch(connectSocket(soc));
    return () => {
      soc.off("users");
      soc.off("getMessage");
      dispatch(disconnectSocket());
    };
  }, [authedUser, dispatch]);

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
        <Route
          path="/offers"
          element={
            <main>
              <h2>All offers</h2>
            </main>
          }
        />
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
      {messageSound && (
        <audio
          hidden
          autoPlay
          src={require("./assets/message-notification.mp3")}
        ></audio>
      )}
    </div>
  );
}

export default App;
