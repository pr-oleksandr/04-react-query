import css from "./MovieModal.module.css";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";

interface MovieModalProps {
  onClose: () => void;
  movie: Movie;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {

    useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div onClick={handleBackdropClick} className={css.backdrop} role="dialog" aria-modal="true">
      <div className={css.modal}>
        <button onClick={onClose} className={css.closeButton} aria-label="Close modal">
          &times;
        </button>
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt="movie_title"
          className={css.image}
        />
        <div className={css.content}>
        <h2>{movie.title }</h2>
                  <p>{ movie.overview }</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
