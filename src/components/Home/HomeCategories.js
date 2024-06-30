import classes from "./HomeCategories.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories, setCategory } from "../../store/categories-slice";
import Skeleton from "../Skeleton/Skeleton";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 10,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  cssEase: "linear",
  centerMode: true,
  centerPadding: "0px",
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 8,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 6,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 430,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 320,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

const HomeCategory = () => {
  const { categories, error, loading } = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (categories && categories.length < 10)
    settings.slidesToShow = categories.length;

  useEffect(() => {
    if (!categories) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  if (!(categories?.length || error || loading)) return;

  return (
    <Container className="my-5">
      {error ? (
        <p className="flex-grow-1 text-center fw-semibold my-2">{error}</p>
      ) : categories ? (
        <Slider {...settings} className="overflow-hidden">
          {categories.map((item) => {
            return (
              <button
                className="border-0 bg-transparent"
                onClick={() => {
                  dispatch(setCategory(item));
                  navigate(`/category/${item.id}`);
                }}
                key={item.id}
              >
                <div className="text-center">
                  <div
                    className={`rounded-circle mx-auto overflow-hidden d-flex align-items-center justify-content-center ${classes.image}`}
                  >
                    <img
                      src={item.image || require("../../assets/Artboard.png")}
                      className="w-100 d-block object-fit-cover"
                      alt={item.title}
                    />
                  </div>
                  <p className={classes.title}>{item.title}</p>
                </div>
              </button>
            );
          })}
        </Slider>
      ) : (
        <div className="d-flex gap-4 overflow-auto scrollbar-none">
          {[...Array(10).keys()].map((key) => (
            <div key={key}>
              <Skeleton
                delay={key}
                className="rounded-circle"
                style={{ width: "90px", height: "90px" }}
              />
              <Skeleton
                delay={key}
                style={{ height: "0.6em", marginTop: "10px" }}
              />
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default HomeCategory;
