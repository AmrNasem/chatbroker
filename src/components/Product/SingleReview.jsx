import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useCallback, useState } from "react";
import { backend } from "../../App";
import { useSelector } from "react-redux";
import Alert from "../../UI/Alert";

const SingleReview = ({ review, setReviews }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = useSelector((state) => state.auth.token);
  const [closing, setClosing] = useState(false);

  const handleClosure = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setError("");
      setClosing(false);
    }, 300);
  }, []);

  const handleDeleteReview = async () => {
    try {
      setError("");
      setLoading(true);
      const res = await fetch(`${backend}/reviews/${review.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) throw new Error(data.message || "حدثت مشكلة ما!");
      setReviews((prev) => prev.filter((r) => r.id !== review.id));
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };
  return (
    <div className="rounded-3 mt-3 p-3" style={{ backgroundColor: "#F8F8F8" }}>
      <div className="d-flex gap-2 align-items-center justify-content-between">
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
          <h6 className="text-main">{review.user.name}</h6>
        </div>
        <button
          disabled={loading}
          onClick={handleDeleteReview}
          style={{ fontSize: "0.8rem" }}
          className={`btn border border-danger bg-transparent text-danger py-1 fw-semibold ${
            loading ? "opacity-50" : ""
          }`}
        >
          حذف مراجعتك
        </button>
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
      {review.title && <h6>{review.title}</h6>}
      <p style={{ fontSize: "0.95rem", color: "var(--address-color)" }}>
        {review.comment}
      </p>
      <button
        style={{ fontSize: "0.8rem" }}
        className="d-block me-auto text-secondary border-0 bg-transparent"
      >
        أبلغ عن إساءة
      </button>
      {error && (
        <Alert closing={closing} closureHandler={handleClosure}>
          {error}
        </Alert>
      )}
    </div>
  );
};

export default memo(SingleReview);
