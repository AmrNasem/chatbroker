import MostRented from "../components/Home/MostRented";
import ProductItem from "../components/Home/ProductItem";
import SCategory from "./SingleCategory.module.css";
import React, { useEffect, useState } from 'react';

const SingleCategory = ({ id }) => {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`https://chat-broker-api.azurewebsites.net/api/v1/categories/${13}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          setCategory(data.data);
        } else {
          throw new Error('No category data found');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);
  console.log(category)
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <p className={SCategory.title}>{category.title}</p>
      <div className={SCategory.offersContainer}>
        {category.map((product, index) => (
          <div className={SCategory.card} key={index}>
            <ProductItem product={category.data} />
          </div>
        ))}
      </div>
      <MostRented />
    </>
  );
};

export default SingleCategory;
