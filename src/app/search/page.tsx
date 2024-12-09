"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MovieCard from "@/components/moviecard";
import Link from "next/link";
import Image from "next/image";
import { Loader } from "../../../public/icons/loader";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

export default function SearchResultsPage() {
  const searchParams = useSearchParams(); 
  const query = searchParams.get("query"); 
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<{ name: string, watchlist: Movie[] }>();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);



  const toggleWatchlist = async (movie: Movie) => {
    setLoading(true)
    const token = localStorage.getItem('token')

    try {
      const response = await fetch("/api/watchlist", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(movie)
      })

      const json = await response.json()
      console.log("API Response:", json); 
      if (!response.ok) throw new Error(json.message)

      setUser(json.user)
      setLoading(false)

    } catch (error) {
      console.log(error);

    }
  };


  useEffect(() => {
    if (!query) return;

    const fetchSearchResults = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${encodeURIComponent(
            query
          )}`
        );
        if (!response.ok) throw new Error("Failed to fetch search results");
        const data = await response.json();
        setSearchResults(data.results || []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);


  const closeModal = () => {
    setSelectedMovie(null);
  };


  return (
    <div className="container mx-auto p-4">
        <Link href="/homepage" className="text-blue-500 hover:underline">
            Back to Homepage
        </Link>
        <h1 className="text-3xl font-bold mb-6">
            Search Results for &quot;{query}&quot;
        </h1>        
        {isLoading && <p className="text-gray-700 mt-4">Searching...</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {searchResults.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                {searchResults.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        title={movie.title}
                        posterPath={movie.poster_path}
                        overview={movie.overview}
                    />
                ))}
            </div>
        )}
        {selectedMovie && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">{selectedMovie.title}</h2>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                  alt={selectedMovie.title}
                  width={150}
                  height={100}
                  className="rounded-lg mb-4"
                />
                <p className="text-gray-700">{selectedMovie.overview}</p>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => {
                      toggleWatchlist(selectedMovie);
                    }}
                    disabled={loading}
                    className={`px-4 py-2 rounded text-white ${loading
                      ? "bg-gray-300 cursor-not-allowed" 
                      : user?.watchlist.some((movie) => movie.id === selectedMovie.id)
                        ? "bg-red-500 hover:bg-red-700" 
                        : "bg-blue-500 hover:bg-blue-700"
                      }`}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader />
                        Loading...
                      </span>
                    ) : user?.watchlist.some((movie) => movie.id === selectedMovie.id) ? (
                      "Remove from watchlist"
                    ) : (
                      "Add to watchlist"
                    )}

                  </button>
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
    </div>
  );
}
