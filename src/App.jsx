import { useState } from "react";
import News from "./components/News";
import Blogs from "./components/Blogs";

function App() {
  const [showNews, setShowNews] = useState(true);
  const [showBlogs, setShowBlogs] = useState(false);
  const [blogs, setBlogs] = useState([]);

  function handleCreateBlog(newBlog) {
    setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
  }

  function handleShowBlogs() {
    setShowNews(false);
    setShowBlogs(true);
  }

  function handleBackToNews() {
    setShowNews(true);
    setShowBlogs(false);
  }

  return (
    <div className="container">
      <div className="news-blogs-app">
        {showNews && <News onShowBlogs={handleShowBlogs} blogs={blogs} />}
        {showBlogs && (
          <Blogs onBack={handleBackToNews} onCreateBlog={handleCreateBlog} />
        )}
      </div>
    </div>
  );
}

export default App;
