import React, { useEffect, useRef } from "react";
import "./Modal.css";
import "./Bookmarks.css";
import demoImg from "../assets/images/demo.jpg";

export default function Bookmarks({
  show,
  bookmarks,
  onClose,
  onSelecteArticle,
  onDeleteBookmark,
}) {
  const modalRef = useRef();

  useEffect(() => {
    // Função para detectar cliques fora do modal
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    // Adicionar o evento de clique ao montar
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Remover o evento de clique ao desmontar
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <span className="close-button">
          <i className="fa-solid fa-xmark" onClick={onClose}></i>
        </span>
        <h2 className="bookmarks-heading">Bookmarked News</h2>
        <div className="bookmark-list">
          {bookmarks.map((article, index) => (
            <div
              className="bookmark-item"
              key={index}
              onClick={(e) => {
                onClose();
                onSelecteArticle(article);
              }}
            >
              <img src={article.image} alt={article.title} />
              <h3>{article.title}</h3>
              <span
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteBookmark(article);
                }}
              >
                <i className="fa-regular fa-circle-xmark"></i>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
