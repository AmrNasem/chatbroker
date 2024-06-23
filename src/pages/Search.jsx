import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { backend } from '../App';
import SearchCard from '../components/searchCard';

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  // Extract search term from URL query string
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('q') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${backend}/products`);
        const data = await response.json();
        setProducts(Array.isArray(data.data) ? data.data : []); // Ensure data.data is an array
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]); // Set an empty array on error
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="row d-flex flex-column" >
        {filteredProducts.map(product => (
          <div style={{ minWidth: "90% " }} key={product.id} className="col-md-4">
            <SearchCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
