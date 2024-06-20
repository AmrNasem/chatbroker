import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import TotalExchangeChart from './Column Chart';

const StatisticsCard = ({ statisticsTitle, color, value, ChangeInValue }) => {
  const [isIncreased, setIsIncreased] = useState(true);
  // This flag should come from the backend
  setIsIncreased(true)
  return (
    <div className="container" dir="ltr">
      <div className="cursor-pointer bg-white p-4 shadow-sm hover:shadow">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="h5 fs-3 fw-normal" style={{ color: "#a1a0ae" }}>{statisticsTitle}</h3>
          </div>
          <div className="d-flex align-items-end justify-content-between ">
            <div className='d-flex flex-column align-items-center'>
              <p className="text-primary fw-bolder fs-5 mb-0">{value}</p>
              <p className={`fs-6 ${isIncreased ? "text-success" : "text-danger"}`}>
                {ChangeInValue} {isIncreased ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />}
              </p>
            </div>
            <TotalExchangeChart color={color} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;