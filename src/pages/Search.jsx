import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchCard from "../components/searchCard";
import { backend } from "../App";
const Search = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams(location.search);
      const query = queryParams.get("q");

      try {
        const response = await fetch(`${backend}/search/auto_complete?q=${query}`);
        const data = await response.json();

        if (data && Array.isArray(data.data)) {
          setResults(data.data);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
      }
    };

    fetchData();
  }, [location.search]);
  console.log(results)
  return (
    <div>
      {results.length > 0 ? (
        results.map((product) => (
          <SearchCard key={product.id} product={product} />
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default Search;
