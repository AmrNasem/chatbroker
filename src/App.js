import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import MobileHeader from "./components/Header/MobileHeader";

function App() {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const changeSize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", changeSize);
    return () => window.removeEventListener("resize", changeSize);
  }, []);

  return (
    <div className="App">
      {screenSize < 768 ? <MobileHeader /> : <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<h2>Chat</h2>} />
        <Route path="/favorites" element={<h2>Favorites</h2>} />
        <Route path="/cart" element={<h2>Cart</h2>} />
        <Route path="/new-product" element={<h2>New product</h2>} />
      </Routes>
    </div>
  );
}

export default App;
