import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import classes from "./Header.module.css";
import {
  faBell,
  faHeart,
  faMessage,
  faSquarePlus,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import { Link } from "react-router-dom";
import Categories from "./Categories";

const Aside = () => {
  return (
    <aside
      className={`py-3 z-5 bg-white ${classes.aside} h-100`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={`h-100 overflow-auto ${classes.main}`}>
        <button
          className={`px-3 my-2 py-1 bg-transparent fw-semibold d-flex align-items-center gap-2 text-nowrap border-0 ${classes.button}`}
        >
          <FontAwesomeIcon icon={faUser} className="fs-5" />
          <span>حسابي</span>
        </button>
        <Link
          to="new-product"
          className={`px-3 my-2 py-1 text-decoration-none fw-semibold d-flex align-items-center gap-2 text-nowrap border-0 ${classes.button}`}
        >
          <FontAwesomeIcon icon={faSquarePlus} className="fs-5" />
          <span>إضافة منتج للحجز</span>
        </Link>
        <button
          className={`px-3 my-2 py-1 bg-transparent fw-semibold d-flex align-items-center gap-2 text-nowrap border-0 ${classes.button}`}
        >
          <div className="position-relative">
            <span
              className={`position-absolute top-0 end-0 rounded-circle ${classes.bullet}`}
            ></span>
            <FontAwesomeIcon icon={faBell} className="fs-5" />
          </div>
          <span>الإشعارات</span>
        </button>
        <Link
          className={`px-3 my-2 py-1 text-decoration-none fw-semibold d-flex align-items-center gap-2 text-nowrap border-0 ${classes.button}`}
          to="/chat"
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
          to="/favorites"
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
        <Link
          to="/cart"
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
        </Link>
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
    </aside>
  );
};

export default memo(Aside);
