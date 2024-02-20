import {Routes, Route} from 'react-router-dom'
import PostList from "./postList";
import CreatePost from './createPost';
import PostDetail from './postDetail';
import PostEdit from './postEdit';


function App() {

  return (
    <div className="App">
      <h1>홈화면</h1>
      
      <Routes>
        <Route path="/" element={<PostList/>}/>
        <Route path="/new-post" element={<CreatePost/>}/>
        <Route path="/post/:postId" element={<PostDetail/>}/>
        <Route path="/edit-post/:postId" element={<PostEdit/>}/>
      </Routes>
      <a></a>
    </div>
  );
}

export default App;
