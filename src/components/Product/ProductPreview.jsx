import React, { memo, useEffect, useState } from "react";
import classes from "./ProductPreview.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { validateImages } from "../../utils/general";

const ProductPreview = ({ className, images, setImages, invalid }) => {
  const [active, setActive] = useState(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    setActive((prev) => images.find((img) => prev?.id === img.id) || images[0]);
  }, [images]);

  const viewImage = (files) => {
    files.forEach((file) => {
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage = {
            id: Math.random().toString(),
            image: e.target.result,
            file,
          };
          setImages((prev) => ({
            ...prev,
            value: [...prev.value, newImage],
            invalid: validateImages([...prev.value, newImage]),
          }));
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleImageSelction = (e) => {
    const files = e.target.files;
    viewImage([...files]);
  };

  const handleDragDropImage = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    setDragging(false);
    viewImage([...files]);
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
        className={`p-2 rounded-2 position-sticky ${
          invalid ? "border invalid" : ""
        }`}
        style={{ backgroundColor: "var(--card-color)", top: "1rem" }}
      >
        {invalid && (
          <p
            style={{ fontSize: "0.9rem" }}
            className="d-flex gap-1 align-items-center justify-content-center fw-semibold text-danger"
          >
            <FontAwesomeIcon icon={faExclamationCircle} />
            <span className="d-block">{invalid}</span>
          </p>
        )}
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
                  src={active.image}
                  alt=""
                />
                <h4
                  style={{
                    backgroundColor: "#f0f0f0",
                    opacity: dragging ? 0.8 : 0,
                  }}
                  className="user-select-none d-block transition-main position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
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
              accept="image/jpeg, image/jpg, image/png, image/bmp"
              onChange={handleImageSelction}
              id="add-photo"
              hidden
              multiple
            />
          </label>
        ) : (
          <div
            style={{ height: "400px" }}
            className="rounded-2 overflow-hidden"
          >
            <img
              className="w-100 h-100 object-fit-cover d-block"
              src={active?.image}
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
                      setImages((prev) => {
                        const newImages = prev.value.filter(
                          (item) => item.id !== img.id
                        );
                        return {
                          ...prev,
                          value: newImages,
                          invalid: validateImages(newImages),
                        };
                      });
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
                  src={img.image}
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
