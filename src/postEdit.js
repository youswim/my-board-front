import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PostEdit = (props) => {

    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {postId} = useParams();

    const navigate = useNavigate()


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:8080/post/" + postId);
            const res = await response.json();
    
            setTitle(res.title);
            setContent(res.content);
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);

    const editPost = async () => {
      try {
        const response = await fetch("http://localhost:8080/post/" + postId, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            content: content,
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
        navigate("/post/" + postId);
      }
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };



    return (
        <div>
            {loading ? 
            <p>Loading...</p> : 
            <div>
                title : <input type="text" value={title} onChange={handleTitleChange}/>
                content : <input type="text" value={content} onChange={handleContentChange}/>
                <button onClick={editPost}>수정 완료하기</button>
            </div>}
        </div>
    )
}

export default PostEdit