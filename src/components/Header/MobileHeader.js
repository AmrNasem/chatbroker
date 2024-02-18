import classes from "./Header.module.css";
import {} from "@fortawesome/free-regular-svg-icons";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Aside from "./Aside";
import Overlay from "../../UI/Overlay";

const MobileHeader = () => {
  const [dispalyAside, setDisplayAside] = useState(false);

  const closeAsideHandler = useCallback(() => setDisplayAside(false), []);

  return (
    <header
      className={`${classes["main-header"]} d-flex align-items-center gap-3 py-3 border-bottom bg-white`}
    >
      <Link
        to="/"
        className="ms-3 fw-semibold text-nowrap fs-4 text-decoration-none"
      >
        <span className="text-sec">Chat </span>
        <span className="text-main">Broker</span>
      </Link>
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
      <button
        onClick={() => setDisplayAside(true)}
        className={`px-2 py-1 bg-transparent d-flex align-items-center gap-2 text-nowrap ${classes.button}`}
      >
        <FontAwesomeIcon icon={faBars} className="fs-5" />
      </button>
      {dispalyAside && (
        <Overlay onClick={closeAsideHandler}>
          <Aside />
        </Overlay>
      )}
    </header>
  );
};

export default memo(MobileHeader);
