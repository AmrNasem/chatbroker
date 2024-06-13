import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import classes from "./Header.module.css";
import {
  faBell,
  faHeart,
  faMessage,
  faSquarePlus,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Categories from "./Categories";
import { useSelector } from "react-redux";
import Notifications from "./Notifications";
import Modal from "../../UI/Modal";

const Aside = ({ onClick, closing }) => {
  const authedUser = useSelector((state) => state.auth.user);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <Modal
      onClick={onClick}
      closing={closing}
      className={`${classes.aside} ${
        closing ? classes["slide-out"] : ""
      } py-3 bg-white position-fixed top-0 end-0 overflow-hidden h-100`}
    >
      <div
        className={`transition-main position-relative h-100 ${
          notificationsVisible ? "start-100" : "start-0"
        } d-flex`}
        style={{ width: "200%" }}
      >
        <div className={`w-50 overflow-auto ${classes.main}`}>
          <Link
            to={authedUser ? "/profile" : "?auth=login"}
            className={`px-3 my-2 py-1 text-decoration-none bg-transparent fw-semibold d-flex align-items-center gap-2 text-nowrap border-0 ${classes.button}`}
          >
            <FontAwesomeIcon icon={faUser} className="fs-5" />
            <span>{authedUser ? authedUser.name : "حسابي"}</span>
          </Link>
          <Link
            to={authedUser ? "/new-product" : "?auth=login"}
            className={`px-3 my-2 py-1 text-decoration-none fw-semibold d-flex align-items-center gap-2 text-nowrap border-0 ${classes.button}`}
          >
            <FontAwesomeIcon icon={faSquarePlus} className="fs-5" />
            <span>إضافة منتج</span>
          </Link>
          <button
            onClick={() =>
              authedUser
                ? setNotificationsVisible((prev) => !prev)
                : navigate("?auth=login")
            }
            className={`px-3 my-2 py-1 bg-transparent fw-semibold d-flex align-items-center gap-2 text-nowrap border-0 ${classes.button}`}
          >
            <div className="position-relative">
              <span
                className={`position-absolute top-0 end-0 rounded-circle ${
                  notificationsVisible ? "bg-sec" : "bg-main"
                } ${classes.bullet}`}
              ></span>
              <FontAwesomeIcon icon={faBell} className="fs-5" />
            </div>
            <span>الإشعارات</span>
          </button>
          <Link
            className={`px-3 my-2 py-1 text-decoration-none fw-semibold d-flex align-items-center gap-2 text-nowrap border-0 ${classes.button}`}
            to={authedUser ? "/chat" : "?auth=login"}
          >
            <div className="position-relative">
              <span
                className={`position-absolute top-0 end-0 rounded-circle text-white d-flex justify-content-center align-items-center ${classes.amount}`}
              >
                0
              </span>
              <FontAwesomeIcon icon={faMessage} className="fs-5" />
            </div>
            <span>الدردشة</span>
          </Link>
          <Link
            className={`px-3 my-2 py-1 text-decoration-none fw-semibold d-flex align-items-center gap-2 text-nowrap border-0 ${classes.button}`}
            to={authedUser ? "/favorites" : "?auth=login"}
          >
            <div className="position-relative">
              <span
                className={`position-absolute top-0 end-0 rounded-circle text-white d-flex justify-content-center align-items-center ${classes.amount}`}
              >
                0
              </span>
              <FontAwesomeIcon icon={faHeart} className="fs-5" />
            </div>
            <span>المفضلة</span>
          </Link>
          {/* <Link
            to={authedUser ? "/cart" : "?auth=login"}
            className={`px-3 my-2 py-1 text-decoration-none fw-semibold d-flex align-items-center gap-2 text-nowrap border-0 ${classes.button}`}
          >
            <div className="position-relative">
              <span
                className={`position-absolute top-0 end-0 rounded-circle text-white d-flex justify-content-center align-items-center ${classes.amount}`}
              >
                0
              </span>
              <FontAwesomeIcon icon={faShoppingCart} className="fs-5" />
            </div>
            <span>عربة التسوق</span>
          </Link> */}
          <div>
            <h4
              style={{ color: "var(--secondary-color)" }}
              className="mx-3 mt-4 mb-0"
            >
              الفئات
            </h4>
            <Categories />
          </div>
        </div>
        <div className="w-50">
          <button
            onClick={() => setNotificationsVisible(false)}
            className="btn text-main border-0"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
          {notificationsVisible && <Notifications className="h-100" mobile />}
        </div>
      </div>
    </Modal>
  );
};

export default memo(Aside);
