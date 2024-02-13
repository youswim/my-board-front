import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PostDetail = (props) => {
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const {postId} = useParams();

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

    return(
        <div>
            {loading ? <p>Loading...</p> : <div><div>{title}</div><div>{content}</div></div>}
        </div>
    )
}

export default PostDetail;