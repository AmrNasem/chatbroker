import React, { memo, useEffect, useState } from "react";
import classes from "./ProductPreview.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const imgs = [
  {
    id: 1,
    src: require("../../assets/villa.png"),
  },
  {
    id: 2,
    src: require("../../assets/villa2.png"),
  },
  {
    id: 3,
    src: require("../../assets/villa.png"),
  },
  {
    id: 4,
    src: require("../../assets/villa3.png"),
  },
  {
    id: 5,
    src: require("../../assets/villa2.png"),
  },
  {
    id: 6,
    src: require("../../assets/villa2.png"),
  },
  {
    id: 7,
    src: require("../../assets/villa.png"),
  },
  {
    id: 8,
    src: require("../../assets/villa3.png"),
  },
];
const ProductPreview = ({ className, images, setImages }) => {
  images = images || imgs;
  const [active, setActive] = useState(images[0]);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    setActive((prev) => images.find((img) => prev?.id === img.id) || images[0]);
  }, [images]);

  const handleImageSelction = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const newImage = {
        id: Math.random().toString(),
        src: event.target.result,
      };
      setActive(newImage);
      setImages((prev) => [newImage, ...prev]);
    };
    reader.readAsDataURL(file);
  };

  const handleDragDropImage = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = (event) => {
      const newImage = {
        id: Math.random().toString(),
        src: event.target.result,
      };
      setActive(newImage);
      setImages((prev) => [newImage, ...prev]);
    };
    reader.readAsDataURL(e.dataTransfer.files[0]);
    setDragging(false);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  return (
    <div className={`${classes.navigator} w-100 ${className}`}>
      <div
        className="p-2 rounded-2 position-sticky"
        style={{ backgroundColor: "var(--card-color)", top: "1rem" }}
      >
        {setImages ? (
          <label
            htmlFor="add-photo"
            onDragEnter={handleDragEnter}
            onDragLeave={() => setDragging(false)}
            onDragOver={handleDragOver}
            onDrop={handleDragDropImage}
            style={{ height: "400px", cursor: "pointer" }}
            className={`${
              images.length ? "" : "bg-white p-3"
            } rounded-2  d-flex flex-column position-relative gap-3 justify-content-between`}
          >
            {active ? (
              <>
                <img
                  className="w-100 h-100 object-fit-cover d-block"
                  src={active.src}
                  alt=""
                />
                <h4
                  style={{
                    backgroundColor: "#f0f0f0",
                    opacity: dragging ? 0.8 : 0,
                  }}
                  className="d-block transition-main position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                >
                  <img
                    style={{ width: "2.5rem" }}
                    className="d-block ms-3"
                    src={require("../../assets/add_photo_alternate.png")}
                    alt=""
                  />
                  أفلت هنا
                </h4>
              </>
            ) : (
              <>
                <img
                  className="d-block w-50 mx-auto"
                  src={require("../../assets/Uploading-bro.png")}
                  alt=""
                />
                <div className="d-flex gap-3 align-items-center justify-content-center">
                  <img
                    style={{ width: "2.75rem" }}
                    className="d-block"
                    src={require("../../assets/add_photo_alternate.png")}
                    alt=""
                  />
                  <h5 className="mb-0">اضغط أو قم بالسحب والإفلات هنا</h5>
                </div>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelction}
              id="add-photo"
              hidden
            />
          </label>
        ) : (
          <div
            style={{ height: "400px" }}
            className="rounded-2 overflow-hidden"
          >
            <img
              className="w-100 h-100 object-fit-cover d-block"
              src={active.src}
              alt=""
            />
          </div>
        )}
        {!!images.length && (
          <div
            className={`d-flex gap-2 ${
              setImages ? "px-2" : ""
            } pt-2 overflow-auto scrollbar-none flex-grow-1`}
          >
            {images.map((img, i) => (
              <button
                value={i}
                key={i}
                onClick={() => setActive(img)}
                className={`${
                  active?.id === img.id ? classes.active : "border"
                } bg-transparent position-relative transition-main rounded-2 ${
                  classes.image
                }`}
              >
                {setImages && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setImages((prev) =>
                        prev.filter((item) => item.id !== img.id)
                      );
                    }}
                    style={{
                      width: "18px",
                      height: "18px",
                      fontSize: "0.7rem",
                    }}
                    className="bg-white rounded-circle justify-content-center align-items-center d-flex border-secondary border position-absolute top-0 start-100 translate-middle"
                  >
                    <FontAwesomeIcon className="d-block" icon={faClose} />
                  </span>
                )}
                <img
                  className="w-100 h-100 object-fit-cover d-block rounded-1"
                  src={img.src}
                  alt=""
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ProductPreview);
