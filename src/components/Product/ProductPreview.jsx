import React, { useState } from "react";
import classes from "./ProductPreview.module.css";

const images = [
  require("../../assets/villa.png"),
  require("../../assets/villa2.png"),
  require("../../assets/villa.png"),
  require("../../assets/villa3.png"),
  require("../../assets/villa2.png"),
  require("../../assets/villa2.png"),
  require("../../assets/villa.png"),
  require("../../assets/villa3.png"),
];
const ProductPreview = ({ className }) => {
  const [active, setActive] = useState(images[0]);

  return (
    <div className={`${classes.navigator} w-100 ${className}`}>
      <div
        className="p-2 rounded-2"
        style={{ backgroundColor: "var(--card-color)" }}
      >
        <div
          className="mb-2 bg-light rounded-2 overflow-hidden"
          style={{ height: "450px" }}
        >
          <img
            className="w-100 h-100 object-fit-cover d-block"
            src={active}
            alt=""
          />
        </div>
        <div className="d-flex gap-2 overflow-auto scrollbar-none flex-grow-1">
          {images.map((img, i) => (
            <button
              value={i}
              key={i}
              onClick={() => setActive(img)}
              className={`${
                active === img ? classes.active : "border"
              } bg-transparent overflow-hidden transition-main rounded-2 ${
                classes.image
              }`}
            >
              <img
                className="w-100 h-100 object-fit-cover d-block"
                src={img}
                alt=""
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
