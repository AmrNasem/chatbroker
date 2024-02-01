import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const SingleReview = ({ review }) => {
  return (
    <div
      className="rounded-3 my-3 px-3 py-2"
      style={{ backgroundColor: "#F8F8F8" }}
    >
      <div className="d-flex gap-2 align-items-center">
        <div
          className="rounded-circle overfow-hidden"
          style={{ width: "30px", height: "30px" }}
        >
          <img
            className="w-100 h-100 d-block object-fit-cover"
            src={require("../../assets/avatar.png")}
            alt=""
          />
        </div>
        <h6 className="text-main">{review.authorName}</h6>
      </div>
      <div className="d-flex gap-2 align-items-center">
        <div
          className="d-flex align-items-center"
          style={{ gap: "2px", fontSize: "0.7rem" }}
        >
          {[...Array(5).keys()].map((i) => (
            <FontAwesomeIcon
              key={i}
              icon={faStar}
              className={`${
                i < review.rate ? "text-warning" : "text-secondary"
              }`}
            />
          ))}
        </div>
        <span
          className="text-danger fw-semibold d-block"
          style={{ fontSize: "0.9rem" }}
        >
          عملية شراء معتمدة
        </span>
      </div>
      <h6>{review.title}</h6>
      <p style={{ fontSize: "0.95rem", color: "var(--address-color)" }}>
        {review.description}
      </p>
      <button
        style={{ fontSize: "0.8rem" }}
        className="d-block me-auto text-secondary border-0 bg-transparent"
      >
        أبلغ عن إساءة
      </button>
    </div>
  );
};

export default SingleReview;
