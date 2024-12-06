"use client";
import { useState, useEffect } from "react";
import { Movie } from "../../types/movie";
import Image from "next/image";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    setWatchlist(storedWatchlist);
  }, []);

  const removeFromWatchlist = (movieId: number) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== movieId);
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Watchlist</h1>
      {watchlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {watchlist.map((movie, index) => (
            <div key={movie.id || `watchlist-${index}`} className="bg-white rounded-lg shadow-md p-4">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={150}
                height={100}
                className="rounded-lg mb-4"
              />
              <h2 className="text-lg font-bold">{movie.title}</h2>
              <p className="text-sm text-gray-700">{movie.overview}</p>
              <button
                onClick={() => removeFromWatchlist(movie.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mt-2"
              >
                Remove from Watchlist
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-rose-900">Your watchlist is empty.</p>
      )}
    </div>
  );
}
