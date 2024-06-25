import { memo } from "react";
import Slider from "../components/Home/Slider";
import HomeCategories from "../components/Home/HomeCategories";
import Offers from "../components/Home/Offers";
import MostPopular from "../components/Home/MostPopular";
import Recommends from "../components/Home/Recommends";
import Chatbot from "../components/Home/Chatbot";

const Home = () => {
  return (
    <main className="position-relative">
      <Slider />
      <HomeCategories />
      <Offers />
      <MostPopular />
      <Recommends />
      <div className="position-absolute start-0 top-0 h-100">
        <Chatbot />
      </div>
    </main>
  );
};

export default memo(Home);
