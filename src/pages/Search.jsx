import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchCard from "../components/searchCard";
import { backend } from "../App";
import Spinner from "../UI/Spinner";
const Search = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`${backend}/search/auto_complete?q=${query}`);
        const data = await res.json();
        console.log(data);
        if (!res.ok) throw new Error(data.message || "خطأ في البحث!");
        setResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error.message);
        setError(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [query]);
  console.log(results);
  return (
    <main>
      <div className="container my-5">
        {loading ? (
          <Spinner
            side={50}
            color="var(--secondary-color)"
            className="mx-auto"
          />
        ) : error ? (
          <p className="text-center text-danger fw-semibold my-2">{error}</p>
        ) : results.data.length ? (
          <div>
            <h4>
              {results.count > 2 && results.count}{" "}
              {results.count <= 10
                ? "نتائج"
                : results.count === 2
                ? "نتيجتان"
                : "نتيجة"}{" "}
              {results.count === 1 && "واحدة"} ({query})
            </h4>
            {results.data.map((product) => (
              <SearchCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <h3 className="text-center fw-semibold my-2">لا يوجد نتائج!</h3>
        )}
      </div>
    </main>
  );
};

export default Search;
