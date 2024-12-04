// src/app/watchlist/watchlist.tsx
import { useState, useEffect } from "react";
import MovieCard from "../../components/moviecard";
import { Movie } from "../../types/movie";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    setWatchlist(storedWatchlist);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Watchlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {watchlist.map((movie) => (
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
