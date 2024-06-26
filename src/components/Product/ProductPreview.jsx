import React, { memo, useEffect, useState } from "react";
import classes from "./ProductPreview.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player/lazy";
import { useParams } from "react-router-dom";
import { validateImages } from "../../utils/general";

const ProductPreview = ({
  className,
  style,
  media,
  setImages,
  invalid,
  product,
}) => {
  const [active, setActive] = useState(null);
  const [dragging, setDragging] = useState(false);
  const { productId } = useParams();

  useEffect(() => {
    // Ensure active is set to the first item in media array if available
    setActive(media.length > 0 ? media[0] : null);
  }, [media]);

  const viewImage = (files) => {
    files.forEach((file) => {
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newMedia = {
            id: Math.random().toString(),
            type: file.type,
            file,
            preview: e.target.result,
          };
          setImages((prev) => ({
            ...prev,
            value: [...prev.value, newMedia],
            invalid: validateImages([...prev.value, newMedia]),
          }));
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleFileSelection = (e) => {
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

  console.log("Active Media: ", active);
  console.log("Media Array: ", media);

  return (
    <div
      className={`p-2 rounded-2 ${
        invalid ? "border invalid" : ""
      } ${className}`}
      style={{ backgroundColor: "var(--card-color)", ...style }}
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
          htmlFor="add-media"
          onDragEnter={handleDragEnter}
          onDragLeave={() => setDragging(false)}
          onDragOver={handleDragOver}
          onDrop={handleDragDropImage}
          style={{ height: "400px", cursor: "pointer" }}
          className={`${
            media.length ? "" : "bg-white p-3"
          } rounded-2 d-flex flex-column position-relative gap-3 justify-content-between`}
        >
          {active ? (
            <>
              {active.video ? (
                <ReactPlayer
                  url={active.video}
                  width="100%"
                  height="100%"
                  controls
                />
              ) : (
                <img
                  className="w-100 h-100 object-fit-cover d-block"
                  src={active.image}
                  alt=""
                />
              )}
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
                Drop Here
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
                <h5 className="mb-0">Click or drag and drop here</h5>
              </div>
            </>
          )}
          <input
            type="file"
            accept="image/jpeg, image/jpg, image/png, image/bmp, video/mp4, video/avi, video/mov, video/mkv, video/webm, video/ogg"
            onChange={handleFileSelection}
            id="add-media"
            hidden
            multiple
          />
        </label>
      ) : (
        <div style={{ height: "400px" }} className="rounded-2 overflow-hidden">
          {active && active.video ? (
            <ReactPlayer
              url={active.video}
              width="100%"
              height="100%"
              controls
            />
          ) : (
            <a
              href={
                product.images360.length !== 0
                  ? `https://chat-broker-api.azurewebsites.net/product/${productId}/360-image`
                  : null
              }
            >
              <img
                className="w-100 h-100 object-fit-cover d-block"
                src={active?.image}
                alt=""
              />
            </a>
          )}
        </div>
      )}
      {!!media.length && (
        <div
          className={`d-flex gap-2 ${
            setImages ? "px-2" : ""
          } pt-2 overflow-auto scrollbar-none flex-grow-1`}
        >
          {media.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item)}
              className={`${
                active?.id === item.id ? classes.active : "border"
              } bg-transparent position-relative transition-main rounded-2 ${
                classes.image
              }`}
            >
              {setImages && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setImages((prev) => ({
                      ...prev,
                      value: prev.value.filter((img) => img.id !== item.id),
                      invalid: validateImages(
                        prev.value.filter((img) => img.id !== item.id)
                      ),
                    }));
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
              {item.video ? (
                <ReactPlayer url={item.video} width="100%" height="100%" />
              ) : (
                <img
                  className="w-100 h-100 object-fit-cover d-block rounded-1"
                  src={item.image}
                  alt=""
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(ProductPreview);
