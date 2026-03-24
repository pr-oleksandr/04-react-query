import "./App.module.css";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [showLoader, setShowloader] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSubmit = async (value: string) => {
    try {
      setError(false);
      setShowloader(true);
      const response = await fetchMovies(value);
      if (!response.length) {
        setMovieList([]);
        toast.error("No movies found for your request");
        return;
      }

      setMovieList(response);
    } catch (error) {
      setError(true);
      console.error(error);
    } finally {
      setShowloader(false);
    }
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSubmit} />
      {error ? (
        <ErrorMessage />
      ) : showLoader ? (
        <Loader />
      ) : (
        <MovieGrid onSelect={setSelectedMovie} movies={movieList} />
      )}
      {selectedMovie && <MovieModal onClose={() => setSelectedMovie(null)} movie={selectedMovie} />}
    </>
  );
}

export default App;
