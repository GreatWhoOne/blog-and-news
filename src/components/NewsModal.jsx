import React, { useRef, useEffect } from "react";
import "./NewsModal.css";
import "./Modal.css";
import demoImg from "../assets/images/demo.jpg";

export default function NewsModal({ show, article, onClose }) {
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
        {article && (
          <>
            <img
              src={article.image}
              alt={article.title}
              className="modal-image"
            />
            <h2 className="modal-title">{article.title}</h2>
            <p className="modal-source">Fonte: {article.source.name}</p>
            <p className="modal-date">
              {new Date(article.publishedAt).toLocaleString("pt-BR", {
                month: "long",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="modal-content-text">{article.content}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="read-more-link"
            >
              Leia mais
            </a>
          </>
        )}
      </div>
    </div>
  );
}
