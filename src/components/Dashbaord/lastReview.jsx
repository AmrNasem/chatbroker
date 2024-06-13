import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './lastReview.css';

const reviews = [
  {
    id: 1,
    text: "منتج رائع للغاية! أنصح الجميع بتجربته.",
    date: "2024-06-01",
    photo: "https://via.placeholder.com/50"
  },
  {
    id: 2,
    text: "جودة ممتازة وسعر معقول.",
    date: "2024-06-05",
    photo: "https://via.placeholder.com/50"
  },
  {
    id: 3,
    text: "أفضل منتج استخدمته هذا العام.",
    date: "2024-06-10",
    photo: "https://via.placeholder.com/50"
  },
  {
    id: 4,
    text: "منتج رائع للغاية! أنصح الجميع بتجربته.",
    date: "2024-06-01",
    photo: "https://via.placeholder.com/50"
  },
  {
    id: 5,
    text: "جودة ممتازة وسعر معقول.",
    date: "2024-06-05",
    photo: "https://via.placeholder.com/50"
  },
  {
    id: 6,
    text: "أفضل منتج استخدمته هذا العام.",
    date: "2024-06-10",
    photo: "https://via.placeholder.com/50"
  },
  {
    id: 7,
    text: "منتج رائع للغاية! أنصح الجميع بتجربته.",
    date: "2024-06-01",
    photo: "https://via.placeholder.com/50"
  },
  {
    id: 8,
    text: "جودة ممتازة وسعر معقول.",
    date: "2024-06-05",
    photo: "https://via.placeholder.com/50"
  },
  {
    id: 9,
    text: "أفضل منتج استخدمته هذا العام.",
    date: "2024-06-10",
    photo: "https://via.placeholder.com/50"
  },
  {
    id: 10,
    text: "منتج رائع للغاية! أنصح الجميع بتجربته.",
    date: "2024-06-01",
    photo: "https://via.placeholder.com/50"
  },
  {
    id: 11,
    text: "جودة ممتازة وسعر معقول.",
    date: "2024-06-05",
    photo: "https://via.placeholder.com/50"
  },
  {
    id: 12,
    text: "أفضل منتج استخدمته هذا العام.",
    date: "2024-06-10",
    photo: "https://via.placeholder.com/50"
  },
  {
    id: 13,
    text: "منتج رائع للغاية! أنصح الجميع بتجربته.",
    date: "2024-06-01",
    photo: "https://via.placeholder.com/50"
  },
  {
    id: 14,
    text: "جودة ممتازة وسعر معقول.",
    date: "2024-06-05",
    photo: "https://via.placeholder.com/50"
  },
  {
    id: 15,
    text: "أفضل منتج استخدمته هذا العام.",
    date: "2024-06-10",
    photo: "https://via.placeholder.com/50"
  },
];

const LastReview = () => {
  const [visibleItems, setVisibleItems] = useState(5);

  const handleShowMore = () => {
    setVisibleItems((prev) => prev + 5);
  };

  const visibleReviews = reviews.slice(0, visibleItems);

  return (
    <div className='mt-4'>
      <h4 className='pb-0 fw-normal fs-6 fw-bold' style={{ color: "#4d4f5c" }}>Last Review</h4>
      <div className="container p-4 bg-white">
        <table className="table table-borderless text-center table-custom-color">
          <thead>
            <tr style={{ backgroundColor: "#f5f6fa" }}>
              <th>Product</th>
              <th>Review</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {visibleReviews.map((data, index) => (
              <tr key={index} className='align-middle'>
                <td>
                  <img src={data.photo} alt="Review" style={{ width: '50px' }} />
                </td>
                <td>{data.text}</td>
                <td>{data.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {visibleItems < reviews.length && (
          <div className="d-flex justify-content-center mt-3">
            <button className=" button-custom" onClick={handleShowMore}>Show More</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LastReview;
