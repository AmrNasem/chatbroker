import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import "./TrendingSearch.css";

const searches = [
  "فيلا الساحل الشمال",
  "فيلا حديثة",
  "عربية مرسيدس",
  "فيلا الساحل الشمال",
  "فيلا حديثة",
  "عربية مرسيدس",
  "فيلا الساحل الشمال",
  "فيلا حديثة"
];

const TrendingSearch = () => {
  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredSearches = searches.filter(search =>
    search.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className='mt-4'>
      <h4 className='pb-0 fw-normal fs-6 fw-bold' style={{ color: "#4d4f5c" }}>Trending Search</h4>
      <div className="container bg-white p-4" dir='rtl'>
        <div className="form-group position-relative d-flex justify-content-between">
          <input
            type="text"
            className="form-control"
            placeholder="انت بتدور على ايه"
            value={searchInput}
            onChange={handleInputChange}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="position-absolute"
            style={{ top: '50%', left: '10px', transform: 'translateY(-50%)' }}
          />
        </div>
        <ul className="list-group mt-3">
          {filteredSearches.map((productName, index) => (
            <li
              key={index}
              className="listItem list-group-item d-flex align-items-center border-0"
              style={{ color: "#4d4f5c" }}
            >
              <FontAwesomeIcon icon={faArrowTrendUp} className='me-2' />
              {productName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrendingSearch;
