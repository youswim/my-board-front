import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PostDetail = (props) => {
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [responseMessage, setResponseMessage] = useState('');
    const {postId} = useParams();
    const navigate = useNavigate();

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

    const deleteData = async () => {
        try {
            const response = await fetch("http://localhost:8080/post/" + postId, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error deleting resource:', errorData);
                setResponseMessage('Error deleting resource');
              }
        } catch (error) {
            console.error('Error:', error);
            setResponseMessage('Error occurred during the request');
        }

    }

    return(
        <div>
            {loading ? <p>Loading...</p> : <div><div>{title}</div><div>{content}</div></div>}
            <button onClick={()=>{deleteData(); navigate("/");}}>게시물 삭제하기</button>
            <button onClick={()=>{navigate("/edit-post/" + postId)}}>게시글 수정하기</button>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    )
}

export default PostDetail;