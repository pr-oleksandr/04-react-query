import axios from "axios";
import type { Movie } from "../types/movie";

const myKey = import.meta.env.VITE_TMDB_TOKEN;

export interface FetchMoviesResponse {
    results: Movie[];
    total_pages: number,
}

export async function fetchMovies(movieName: string, page: number): Promise<FetchMoviesResponse> {
    
    const { data } = await axios.get<FetchMoviesResponse>("https://api.themoviedb.org/3/search/movie", {
        params: {
            query: movieName,
            page
        },
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    })
    console.log(data);

    return data

}