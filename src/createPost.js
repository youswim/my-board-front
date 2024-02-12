import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = (props) => {
  const inputTitle = useRef();
  const inputContent = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const requestCreatePost = () => {
    try {
      const response = fetch("http://localhost:8080/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: inputTitle.current.value,
          content: inputContent.current.value,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }
    } catch (error) {
      setError("Error posting data");
      console.error("Error posting data:", error);
    } finally {
      setLoading(false);
    }
    navigate("/");
  };

  return (
    <div>
      <h1>새 게시물 등록</h1>
      제목{" "}
      <input
        type="text"
        ref={inputTitle}
        placeholder="제목을 입력하세요."
      ></input>
      본문{" "}
      <input
        type="text"
        ref={inputContent}
        placeholder="본문을 입력하세요."
      ></input>
      <button onClick={requestCreatePost} disabled={loading}>{loading ? "등록중" : "등록하기"}</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CreatePost;
