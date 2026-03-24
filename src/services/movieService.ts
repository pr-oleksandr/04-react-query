import axios from "axios";
import type { Movie } from "../types/movie";

const myKey = import.meta.env.VITE_TMDB_TOKEN;

interface FetchMoviesResponse {
  results: Movie[];
}

export async function fetchMovies(movieName: string): Promise<Movie[]> {
    const { data } = await axios.get<FetchMoviesResponse>("https://api.themoviedb.org/3/search/movie", {
        params: {
            query: movieName,
        },
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    })

    return data.results

}