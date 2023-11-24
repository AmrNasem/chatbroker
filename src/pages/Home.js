import { memo } from "react";
import Slider from "../components/Home/Slider";
import HomeCategories from "../components/Home/HomeCategories";

const Home = () => {
  return (
    <main>
      <Slider />
      <HomeCategories />
    </main>
  );
};

export default memo(Home);
