import React, { useEffect, useState } from "react";

const PostList = (props) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/post");
        const res = await response.json();

        setData(res.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {data.map((element) => {
            return (<div key={element.id}>{element.id} : {element.title}</div>)
          })}
        </div>
      )}
    </div>
  );
};

export default PostList;
