import classes from "./Header.module.css";
import { } from "@fortawesome/free-regular-svg-icons";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Aside from "./Aside";

const MobileHeader = () => {
  const [displayAside, setDisplayAside] = useState(false);
  const [closingAside, setClosingAside] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const navigate = useNavigate();

  const closeAsideHandler = useCallback(() => {
    setClosingAside(true);
    setTimeout(() => {
      setDisplayAside(false);
    }, 200);
  }, []);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/?q=${searchInput}`);
  };

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
        onSubmit={handleSearchSubmit}
        onClick={() => navigate(`/search`)}
      >
        <button type="submit" className="px-2 py-1 border-0 bg-transparent text-black-50">
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <input
          type="text"
          className="flex-grow-1 border-0 p-2"
          placeholder="إنت بتدور على إيه؟"
          value={searchInput}
          onChange={handleSearchChange}
        />
      </form>
      <button
        onClick={() => setDisplayAside(true)}
        className={`px-2 py-1 bg-transparent d-flex align-items-center gap-2 text-nowrap ${classes.button}`}
      >
        <FontAwesomeIcon icon={faBars} className="fs-5" />
      </button>
      {displayAside && (
        <Aside closing={closingAside} onClick={closeAsideHandler} />
      )}
    </header>
  );
};

export default memo(MobileHeader);
