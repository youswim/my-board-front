import {Routes, Route} from 'react-router-dom'
import PostList from "./postList";
import CreatePost from './createPost';


function App() {
  return (
    <div className="App">
      <h1>홈화면</h1>
      
      <Routes>
        <Route path="/" element={<PostList/>}/>
        <Route path="/new-post" element={<CreatePost/>}/>
      </Routes>
      <a></a>
    </div>
  );
}

export default App;
