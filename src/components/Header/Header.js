import classes from "./Header.module.css";
import {
  faBell,
  faHeart,
  faMessage,
  faSquarePlus,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Categories from "./Categories";
import Auth from "../Auth/Auth";
import Overlay from "../../UI/Overlay";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const closeAuthHandler = useCallback(
    () => navigate(location.pathname),
    [navigate, location]
  );

  return (
    <header className="bg-white z-1 position-relative">
      <div
        className={`d-flex align-items-center gap-3 py-3 border-bottom ${classes["main-header"]}`}
      >
        <Link to="/" className="ms-3">
          <img
            src={require("../../assets/LEPGO.png")}
            style={{ width: "90px" }}
            alt="Lepgo"
          />
        </Link>
        <button
          className={`px-2 py-1 bg-transparent d-flex align-items-center gap-2 text-nowrap ${classes.button}`}
        >
          <div className="position-relative">
            <span
              className={`position-absolute top-0 end-0 rounded-circle ${classes.bullet}`}
            ></span>

            <FontAwesomeIcon icon={faBell} className="fs-5" />
          </div>
          <span className="d-none d-lg-inline-block">الإشعارات</span>
        </button>
        <form
          className={`d-flex flex-grow-1 border rounded-2 overflow-hidden ${classes.search}`}
        >
          <button className="px-2 py-1 border-0 bg-transparent text-black-50">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <input
            type="text"
            className="flex-grow-1 border-0 p-2"
            placeholder="إنت بتدور على إيه؟"
          />
        </form>
        <Link
          to="new-product"
          className={`px-lg-2 py-1 text-decoration-none d-flex align-items-center gap-2 text-nowrap ${classes.button}`}
        >
          <span>إضافة منتج للحجز</span>
          <FontAwesomeIcon icon={faSquarePlus} className="fs-5" />
        </Link>
        <Link
          to="?auth=login"
          className={`px-2 py-1 text-decoration-none bg-transparent d-flex align-items-center gap-2 text-nowrap ${classes.button}`}
        >
          <span>حسابي</span>
          <FontAwesomeIcon icon={faUser} className="fs-5" />
        </Link>
        {params.get("auth") && (
          <Overlay onClick={closeAuthHandler}>
            <Auth onClick={closeAuthHandler} />
          </Overlay>
        )}
        <Link
          className={`px-xl-2 py-1 text-decoration-none d-flex align-items-center gap-2 text-nowrap ${classes.button}`}
          to="/chat"
        >
          <span className="d-none d-xl-inline-block">الدردشة</span>
          <div className="position-relative">
            <span
              className={`position-absolute top-0 end-0 rounded-circle text-white d-flex justify-content-center align-items-center ${classes.amount}`}
            >
              0
            </span>
            <FontAwesomeIcon icon={faMessage} className="fs-5" />
          </div>
        </Link>
        <Link
          className={`px-xl-2 py-1 text-decoration-none d-flex align-items-center gap-2 text-nowrap ${classes.button}`}
          to="/favorites"
        >
          <span className="d-none d-xl-inline-block">المفضلة</span>
          <div className="position-relative">
            <span
              className={`position-absolute top-0 end-0 rounded-circle text-white d-flex justify-content-center align-items-center ${classes.amount}`}
            >
              0
            </span>
            <FontAwesomeIcon icon={faHeart} className="fs-5" />
          </div>
        </Link>
        <Link
          to="/cart"
          className={`px-xl-2 py-1 text-decoration-none d-flex align-items-center gap-2 text-nowrap ${classes.button}`}
        >
          <span className="d-none d-xl-inline-block">عربة التسوق</span>
          <div className="position-relative">
            <span
              className={`position-absolute top-0 end-0 rounded-circle text-white d-flex justify-content-center align-items-center ${classes.amount}`}
            >
              0
            </span>
            <FontAwesomeIcon icon={faShoppingCart} className="fs-5" />
          </div>
        </Link>
      </div>
      <Categories className="d-flex align-items-center overflow-auto gap-3" />
    </header>
  );
};

export default memo(Header);
