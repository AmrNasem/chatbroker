import { useCallback, useState } from "react";
import { backend } from "../App";

const useRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (
      {
        endpoint,
        body,
        headers,
        stringify = true,
        method = "GET",
        // credentials = "include",
      },
      applyData
    ) => {
      setLoading(true);
      setError(null);
      console.log(endpoint);
      try {
        const res = await fetch(`${backend}/${endpoint}`, {
          method,
          headers: headers ? headers : {},
          // credentials,
          body: body ? (stringify ? JSON.stringify(body) : body) : null,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        applyData(data.payload);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      }
      setLoading(false);
    },
    []
  );

  return {
    fetchData,
    loading,
    error,
  };
};

export default useRequest;
