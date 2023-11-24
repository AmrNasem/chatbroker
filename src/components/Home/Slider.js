import React, { memo, useState } from "react";
import { Container, Carousel } from "react-bootstrap";

const items = [
  require("../../assets/slider1.png"),
  require("../../assets/slider4.png"),
  require("../../assets/prod3.png"),
  require("../../assets/prod4.png"),
];

const Slider = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <Container>
      <Carousel className="z-0" activeIndex={index} onSelect={handleSelect}>
        {items.map((item, index) => (
          <Carousel.Item
            key={index}
            style={{ background: "#CBBCA4" }}
            interval={3000}
          >
            <div className="d-flex gap-3 justify-content-center align-items-center">
              <img
                style={{ height: "283px", width: "374px" }}
                src={item}
                alt="Product"
              />
              <div className="d-none d-md-block">
                <h3 className="slider-title">هناك خصم كبير</h3>
                <p className="slider-text">خصم يصل ٥٠٪ عند شرائك</p>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default memo(Slider);
