// src/pages/index.tsx
import { useState, useEffect } from "react";
import MovieCard from "../../components/moviecard";
//import { Movie } from "../../types/movie";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY`
      );
      const data = await response.json();
      setMovies(data.results);
    };
    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Popular Movies</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            overview={movie.overview}
          />
        ))}
      </div>
    </div>
  );
}
