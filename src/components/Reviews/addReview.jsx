import { memo, useEffect, useState } from "react";
import Modal from "../../UI/Modal";
import classes from "../Auth/Auth.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faStar } from "@fortawesome/free-solid-svg-icons";
import { backend } from "../../App";
import { useSelector } from "react-redux";
import Spinner from "../../UI/Spinner";
import { useParams } from "react-router-dom";

const rates = [
  {
    rate: 1,
    text: "سيء جدا",
  },
  {
    rate: 2,
    text: "سيء",
  },
  {
    rate: 3,
    text: "جيد",
  },
  {
    rate: 4,
    text: "جيد جدا",
  },
  {
    rate: 5,
    text: "ممتاز",
  },
];

const AddReview = ({ onClick, closing, setReviews }) => {
  const [review, setReivew] = useState({ loading: false, error: "" });
  const token = useSelector((state) => state.auth.token);
  const [formData, setFormData] = useState({ rate: null, comment: "" });
  const [touched, setTouched] = useState({ rate: false, comment: false });

  const { productId } = useParams();

  const invalidRate = touched.rate && !formData.rate;
  const invalidComment = touched.comment && !formData.comment.trim();

  useEffect(() => {
    if (formData.rate) setTouched((prev) => ({ ...prev, rate: true }));
  }, [formData.rate]);

  const handleAddReview = async (e) => {
    e.preventDefault();

    if (formData.comment.trim() && formData.rate) {
      const formdata = new FormData();
      console.log(productId);
      formdata.append("product_id", +productId);
      formdata.append("rate", formData.rate.rate);
      formdata.append("comment", formData.comment.trim());

      try {
        setReivew((prev) => ({ ...prev, error: "", loading: true }));
        const res = await fetch(`${backend}/reviews/store`, {
          method: "POST",
          body: formdata,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        const data = await res.json();
        console.log(data);
        if (!res.ok) throw new Error(data.message || "حدثت مشكلة ما!");
        setReivew((prev) => ({ ...prev, loading: false }));
        setReviews((prev) => [data.review, ...prev]);
        onClick();
      } catch (error) {
        setReivew((prev) => ({
          ...prev,
          error: error.message,
          loading: false,
        }));
      }
    } else setTouched({ comment: true, rate: true });
  };

  return (
    <Modal
      onClick={onClick}
      closing={closing}
      className={`${classes.auth} ${closing ? classes.closing : ""
        } bg-white position-fixed top-50 start-50 overflow-auto scrollbar-none p-4 rounded-3`}
    >
      <div className=" text-start fw-semibold text-nowrap text-decoration-none">
        <span className="text-sec">Chat </span>
        <span className="text-main">Broker</span>
      </div>
      <h4 className="text-main text-center my-4">كيف كانت تجربتك</h4>
      {formData.rate && (
        <h5 className="text-main text-center my-4">{formData.rate.text}</h5>
      )}
      <div>
        <div
          style={{ width: "fit-content" }}
          className={`${invalidRate ? "invalid border border-danger" : "border-0"
            } p-2 rounded-2 mx-auto`}
        >
          {rates.map((r) => (
            <button
              onClick={() => setFormData((prev) => ({ ...prev, rate: r }))}
              key={r.rate}
              className={`bg-transparent d-inline-block mx-1 border-0 ${!formData.rate || r.rate > formData.rate.rate
                  ? "opacity-50"
                  : ""
                }`}
            >
              <FontAwesomeIcon className={`text-sec`} icon={faStar} />
            </button>
          ))}
        </div>
        {invalidRate && (
          <p
            style={{ fontSize: "0.8rem" }}
            className={`d-flex gap-1 align-items-center mt-1 mb-0 fw-semibold text-danger`}
          >
            <FontAwesomeIcon icon={faCircleExclamation} />
            <span className="d-block">التقييم مطلوب</span>
          </p>
        )}
      </div>
      <form onSubmit={handleAddReview} className="w-100">
        <div className="my-4">
          <textarea
            className={`${invalidComment ? "invalid border border-danger" : "border-0"
              } outline-none w-100 d-block rounded-2 p-2`}
            style={{
              backgroundColor: "#efefef",
              height: "150px",
              resize: "none",
            }}
            value={formData.comment}
            placeholder="ضع رأيك هنا"
            id="comment"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, comment: e.target.value }))
            }
            onBlur={() =>
              setTouched((prev) => ({
                ...prev,
                comment: true,
              }))
            }
          ></textarea>
          {invalidComment && (
            <p
              style={{ fontSize: "0.8rem" }}
              className={`d-flex gap-1 align-items-center mt-1 mb-0 fw-semibold text-danger`}
            >
              <FontAwesomeIcon icon={faCircleExclamation} />
              <span className="d-block">التعليق مطلوب</span>
            </p>
          )}
        </div>
        {review.error && (
          <p className="text-danger text-center my-2">{review.error}</p>
        )}
        {review.loading ? (
          <Spinner
            color="var(--secondary-color)"
            className="mx-auto"
            side={35}
            stroke={4}
          />
        ) : (
          <button
            type="submit"
            className="btn border-0 text-white bg-sec d-block border-0 mx-auto mt-5 my-1 px-4"
          >
            تقديم
          </button>
        )}
      </form>
    </Modal>
  );
};

export default memo(AddReview);