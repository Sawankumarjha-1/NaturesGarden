import React, { useState, useEffect } from "react";
const GettingProductData = (route) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const fetchData = async () => {
    await fetch(`http://192.168.29.216:5000/api/${route}`)
      .then((response) => response.json())
      .then((res) => {
        if (res.status == 401) {
          setLoading(false);
          return setError(res.message);
        }
        if (res.status == 200) {
          setLoading(false);
          return setData(res.data);
        }
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return { data, error, isLoading };
};
export default GettingProductData;
