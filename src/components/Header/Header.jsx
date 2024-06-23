import classes from "./Header.module.css";
import {
  faBell,
  faHeart,
  faMessage,
  faSquarePlus,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faChartSimple, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Categories from "./Categories";
import { useSelector } from "react-redux";
import Notifications from "./Notifications";
import FavoriteCard from "../../components/FavoriteCard";

const Header = () => {
  const [, setParams] = useSearchParams();
  const authedUser = useSelector((state) => state.auth.user);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [notificationsVanishing, setNotificationsVanishing] = useState(false);
  const favorites = useSelector((state) => state.favorites.list);

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleNotificationsClosure = () => {
    setNotificationsVanishing(true);
    setTimeout(() => {
      setNotificationsVisible(false);
      setNotificationsVanishing(false);
    }, 200);
  };

  useEffect(() => {
    window.addEventListener("click", handleNotificationsClosure);
    return () =>
      window.removeEventListener("click", handleNotificationsClosure);
  }, []);

  const handleToggleNotifications = () => {
    if (authedUser)
      if (notificationsVisible) handleNotificationsClosure();
      else setNotificationsVisible(true);
    else
      setParams((prev) => {
        prev.set("auth", "login");
        return prev;
      });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('{{url}}/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <header className="bg-white z-1 position-relative">
      <div
        className={`d-flex align-items-center gap-3 py-3 border-bottom ${classes["main-header"]}`}
      >
        <Link
          to="/"
          className="ms-3 fw-semibold text-nowrap fs-4 text-decoration-none"
        >
          <span className="text-sec">Chat </span>
          <span className="text-main">Broker</span>
        </Link>
        <div onClick={(e) => e.stopPropagation()} className="position-relative">
          <button
            onClick={handleToggleNotifications}
            className={`px-2 py-1 bg-transparent d-flex align-items-center gap-2 text-nowrap ${classes.button}`}
          >
            <div className="position-relative">
              <span
                className={`position-absolute top-0 end-0 rounded-circle ${notificationsVisible ? "bg-sec" : "bg-main"
                  } ${classes.bullet}`}
              ></span>

              <FontAwesomeIcon icon={faBell} className="fs-5" />
            </div>
            <span className="d-none d-lg-inline-block">الإشعارات</span>
          </button>
          {notificationsVisible && (
            <Notifications
              className={`${classes.notifications} ${notificationsVanishing ? classes.vanishing : ""
                } position-absolute end-0 shadow rounded-2`}
            />
          )}
        </div>
        <form
          className={`d-flex flex-grow-1 border rounded-2 overflow-hidden ${classes.search}`}
          onSubmit={handleSearchSubmit}
        // onClick={() => navigate(`/search`)}

        >
          <button className="px-2 py-1 border-0 bg-transparent text-black-50">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <input
            type="text"
            className="flex-grow-1 border-0 p-2"
            placeholder="إنت بتدور على إيه؟"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </form>
        <Link
          to={"/dashboard"}
          className={`px-lg-2 py-1 text-decoration-none d-flex align-items-center gap-2 text-nowrap ${classes.button}`}
        >
          <span>الإحصائيات</span>
          <FontAwesomeIcon icon={faChartSimple} className="fs-5" />
        </Link>
        <Link
          to={authedUser ? "/new-product" : "?auth=login"}
          className={`px-lg-2 py-1 text-decoration-none d-flex align-items-center gap-2 text-nowrap ${classes.button}`}
        >
          <span>إضافة منتج</span>
          <FontAwesomeIcon icon={faSquarePlus} className="fs-5" />
        </Link>
        <Link
          to={authedUser ? "/profile" : "?auth=login"}
          className={`px-2 py-1 text-decoration-none bg-transparent d-flex align-items-center gap-2 text-nowrap ${classes.button}`}
        >
          <span>{authedUser ? authedUser.name : "حسابي"}</span>
          <FontAwesomeIcon icon={faUser} className="fs-5" />
        </Link>
        <Link
          className={`px-xl-2 py-1 text-decoration-none d-flex align-items-center gap-2 text-nowrap ${classes.button}`}
          to={authedUser ? "/chat" : "?auth=login"}
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
          to={authedUser ? "/favorites" : "?auth=login"}
        >
          <span className="d-none d-xl-inline-block">المفضلة</span>
          <div className="position-relative">
            <span
              className={`position-absolute top-0 end-0 rounded-circle text-white d-flex justify-content-center align-items-center ${classes.amount}`}
            >
              {favorites?.length || 0}
            </span>
            <FontAwesomeIcon icon={faHeart} className="fs-5" />
          </div>
        </Link>
        {/* <Link
          to={authedUser ? "/cart" : "?auth=login"}
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
        </Link> */}
      </div>
      <Categories className="d-flex align-items-center overflow-auto gap-3" />

      {/* Display filtered products */}
      <div className="container mt-3">
        <div className="row">
          {filteredProducts.map(product => (
            <div key={product.id} className="col-md-4">
              <FavoriteCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
