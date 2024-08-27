import React, { useState } from "react";
import userImg from "../assets/images/user.jpg";
import noImg from "../assets/images/no-img.png";

import "./Blogs.css";

export default function Blogs({ onBack, onCreateBlog }) {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newBlog = {
      image: image || noImg,
      title,
      content,
    };

    onCreateBlog(newBlog);

    setImage(null);
    setTitle("");
    setContent("");
    setShowForm(false);
  }

  return (
    <div className="blogs">
      <div className="blogs-left">
        <img src={userImg} alt="User Image" />
      </div>
      <div className="blogs-right">
        {showForm ? (
          <div className="blogs-right-form">
            <h1>New Post</h1>
            <form onSubmit={handleSubmit}>
              <div className="img-upload">
                <label htmlFor="file-upload" className="file-upload">
                  <i className="bx bx-upload"></i> Upload Image
                </label>
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleImageChange}
                />
              </div>
              <input
                type="text"
                placeholder="Add Title (Max 60 Characteres)"
                className="title-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="text-input"
                placeholder="Add Text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <button type="submit" className="submit-btn">
                Submit Button
              </button>
            </form>
          </div>
        ) : (
          <button className="post-btn" onClick={() => setShowForm(true)}>
            Create New Post
          </button>
        )}

        <button className="blogs-close-btn" onClick={onBack}>
          Back <i className="bx bx-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}
