import React, { useEffect, useState } from "react";
import Weather from "./Weather";
import Calendar from "./Calendar";
import "./News.css";
import NewsModal from "./NewsModal";
import Bookmarks from "./Bookmarks";

import userImg from "../assets/images/user.jpg";
import techImg from "../assets/images/tech.jpg";
import blogImg1 from "../assets/images/blog1.jpg";
import blogImg2 from "../assets/images/blog2.jpg";
import blogImg3 from "../assets/images/blog3.jpg";
import blogImg4 from "../assets/images/blog4.jpg";
import sportsImg from "../assets/images/sports.jpg";
import scienceImg from "../assets/images/science.jpg";
import worldImg from "../assets/images/world.jpg";
import healthImg from "../assets/images/health.jpg";
import nationImg from "../assets/images/nation.jpg";
import noImg from "../assets/images/no-img.png";

import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY_NEWS;

const categories = [
  "general",
  "world",
  "business",
  "technology",
  "entertainment",
  "sports",
  "science",
  "health",
  "nation",
];

const categoryTranslations = {
  general: "geral",
  world: "mundo",
  business: "negócios",
  technology: "tecnologia",
  entertainment: "entretenimento",
  sports: "esportes",
  science: "ciência",
  health: "saúde",
  nation: "nação",
};

export default function News({ onShowBlogs, blogs }) {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarksModal, setShowBookmarksModal] = useState(false);

  useEffect(() => {
    async function fetchNews() {
      let url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=pt&country=br&apikey=${API_KEY}`;

      if (searchQuery) {
        url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=pt&apikey=${API_KEY}`;
      }

      const response = await axios.get(url);
      const fetchedNews = response.data.articles;

      fetchedNews.forEach((article) => {
        if (!article.image) {
          article.img = noImg;
        }
      });

      setHeadline(fetchedNews[0]);
      setNews(fetchedNews.slice(1, 7));

      const savedBookmarks =
        JSON.parse(localStorage.getItem("bookmarks")) || [];

      setBookmarks(savedBookmarks);
    }

    // fetchNews();
  }, [selectedCategory, searchQuery]);

  function handleCategoryClick(e, category) {
    e.preventDefault();
    setSelectedCategory(category);
  }

  function handleSearch(e) {
    e.preventDefault();
    setSearchQuery(searchInput);
    setSearchInput("");
  }

  function handleArticleClick(article) {
    setSelectedArticle(article);
    setShowModal(true);
  }

  function handleBookmarkClick(article) {
    setBookmarks((prevBookmarks) => {
      // Verificação se o Artigo já é um Favorito
      const updateBookmarks = prevBookmarks.find(
        (bookmark) => bookmark.title === article.title
      )
        ? prevBookmarks.filter((bookmark) => bookmark.title !== article.title)
        : [...prevBookmarks, article];

      localStorage.setItem("bookmarks", JSON.stringify(updateBookmarks));

      return updateBookmarks;
    });
  }

  return (
    <div className="news">
      <header className="news-header">
        <h1 className="logo">News & Blogs</h1>
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Seach news..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </header>
      <div className="news-content">
        <div className="navbar">
          <div className="user" onClick={onShowBlogs}>
            <img src={userImg} alt="user profile image" />
            <p>Mary's Blog</p>
          </div>
          <nav className="categories">
            <h1 className="nav-heading">Categories</h1>
            <div className="nav-links">
              {categories.map((category) => {
                return (
                  <a
                    key={category}
                    href="#"
                    className="nav-link"
                    onClick={(e) => handleCategoryClick(e, category)}
                  >
                    {categoryTranslations[category]}
                  </a>
                );
              })}

              <a
                href="#"
                className="nav-link"
                onClick={() => setShowBookmarksModal(true)}
              >
                Bookmarks <i className="fa-solid fa-bookmark"></i>
              </a>
            </div>
          </nav>
        </div>
        <div className="news-section">
          {headline && (
            <div
              className="headline"
              onClick={() => handleArticleClick(headline)}
            >
              <img src={headline.image || noImg} alt={headline.title} />
              <h2 className="headline-title">
                {headline.title}
                <i
                  className={`${
                    bookmarks.some(
                      (bookmark) => bookmark.title === headline.title
                    )
                      ? "fa-solid"
                      : "fa-regular"
                  } fa-bookmark bookmark`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookmarkClick(headline);
                  }}
                ></i>
              </h2>
            </div>
          )}

          <div className="news-grid">
            {news.map((article, index) => {
              return (
                <div
                  key={index}
                  className="news-grid-item"
                  onClick={() => handleArticleClick(article)}
                >
                  <img src={article.image || noImg} alt={article.title} />
                  <h3>
                    {article.title.length > 70
                      ? `${article.title.substring(0, 70)}...`
                      : article.title}
                    <i
                      className={`${
                        bookmarks.some(
                          (bookmark) => bookmark.title === article.title
                        )
                          ? "fa-solid"
                          : "fa-regular"
                      } fa-bookmark bookmark`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookmarkClick(article);
                      }}
                    ></i>
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
        <NewsModal
          show={showModal}
          article={selectedArticle}
          onClose={() => setShowModal(false)}
        />
        <Bookmarks
          show={showBookmarksModal}
          bookmarks={bookmarks}
          onClose={() => setShowBookmarksModal(false)}
          onSelecteArticle={handleArticleClick}
          onDeleteBookmark={handleBookmarkClick}
        />
        <div className="my-blogs">
          <h1 className="my-blogs-heading">My blogs</h1>
          <div className="blog-posts">
            {blogs.map((blog, index) => (
              <div key={index} className="blog-post">
                <img src={blog.image || noImg} alt={blog.title} />
                <h3>{blog.title}</h3>

                <div className="post-buttons">
                  <button className="edit-post">
                    <i className="bx bxs-edit"></i>
                  </button>

                  <button className="delete-post">
                    <i className="bx bxs-x-circle"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="weather-calendar">
          <Weather />
          <Calendar />
        </div>
      </div>
      <footer className="news-footer">
        <p>
          <span>News & Blogs App</span>
        </p>
        <p>&copy; All rights Reserved. By Juan</p>
      </footer>
    </div>
  );
}
