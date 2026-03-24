import css from "./App.module.css";
import { useState } from "react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import type { Movie } from "../../types/movie";
import {
  fetchMovies,
  type FetchMoviesResponse,
} from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from 'react-paginate';

const Paginate = (ReactPaginate as any).default || ReactPaginate;

function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [movieValue, setMovieValue] = useState("");
  const [page, setPage] = useState(1);

  const {
    data = { results: [], total_pages: 0 },
    isError,
    isLoading, 
  } = useQuery<FetchMoviesResponse>({
    queryKey: ["movie", movieValue, page],
    queryFn: () => fetchMovies(movieValue, page),
    enabled: movieValue !== "",
    placeholderData: (previousData) => previousData,
  });

  useEffect(() => {
    if (!isLoading && movieValue && data.results.length === 0) {
      toast.error("No movies found for your request");
    }
  }, [data, isLoading, movieValue]);

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={(value) => {
        setMovieValue(value)
        setPage(1)
      }} />
      {isError ? (
        <ErrorMessage />
      ) : isLoading ? (
        <Loader />
      ) : (
        <MovieGrid onSelect={setSelectedMovie} movies={data.results} />
      )}
      {data.results.length > 0 && <Paginate
        pageCount={data.total_pages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({ selected }: {selected: number}) => setPage(selected + 1)}
        forcePage={page - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"
      />}
      {selectedMovie && (
        <MovieModal
          onClose={() => setSelectedMovie(null)}
          movie={selectedMovie}
        />
      )}
    </>
  );
}

export default App;
