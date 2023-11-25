import { memo } from "react";
import Slider from "../components/Home/Slider";
import HomeCategories from "../components/Home/HomeCategories";
import Offers from "../components/Home/Offers";
import MostRented from "../components/Home/MostRented";

const Home = () => {
  return (
    <main>
      <Slider />
      <HomeCategories />
      <Offers />
      <MostRented />
    </main>
  );
};

export default memo(Home);
