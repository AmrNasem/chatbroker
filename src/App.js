import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import MobileHeader from "./components/Header/MobileHeader";
import Footer from "./components/Footer";

export const backend = "https://api.lepgo.online/api/v1";

function App() {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const changeSize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", changeSize);
    return () => window.removeEventListener("resize", changeSize);
  }, []);

  return (
    <div className="App d-flex flex-column">
      {screenSize < 768 ? <MobileHeader /> : <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
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
        <Route
          path="/new-product"
          element={
            <main>
              <h2>New product</h2>
            </main>
          }
        />
        <Route
          path="/offers"
          element={
            <main>
              <h2>All offers</h2>
            </main>
          }
        />
        <Route
          path="/product/:productId"
          element={
            <main>
              <h2>Product 1</h2>
            </main>
          }
        />
        <Route
          path="/category/:categoryId"
          element={
            <main>
              <h2>Category 1</h2>
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
