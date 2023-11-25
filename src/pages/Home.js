import { memo } from "react";
import Slider from "../components/Home/Slider";
import HomeCategories from "../components/Home/HomeCategories";
import Offers from "../components/Home/Offers";

const Home = () => {
  return (
    <main>
      <Slider />
      <HomeCategories />
      <Offers />
    </main>
  );
};

export default memo(Home);
