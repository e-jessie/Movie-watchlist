"use client"
import { useState, useEffect } from "react";
import MovieCard from "../../components/moviecard";
import { Movie } from "../../types/movie";
import Image from "next/image";
import ProtectedRoute from "@/components/ProtectedRoute";
import LogoutButton from "@/components/LogoutButton";
import SearchBar from "@/components/searchbar";


export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  const isInWatchlist = (movie: Movie): boolean => {
    return watchlist.some((m) => m.id === movie.id);
  };
  
  const toggleWatchlist = (movie: Movie) => {
    if (isInWatchlist(movie)) {
      const updatedWatchlist = watchlist.filter((m) => m.id !== movie.id);
      setWatchlist(updatedWatchlist);
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    }
    else {
      const updatedWatchlist = [...watchlist, movie];
      setWatchlist(updatedWatchlist);
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));    }
  };
  

  useEffect(() => {
    console.log("useEffect triggered");

    const storedUsername = localStorage.getItem("username")
    setUsername(storedUsername);

    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    setWatchlist(storedWatchlist);

    const fetchMovies = async () => {
      try {
        console.log("Fetching movies..."); 
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        console.log("Response:", response); 
        if (!response.ok) throw new Error("Failed to fetch movies");
        const data = await response.json();
        console.log(data.results)
        setMovies(data.results || []);
      } 
      catch (error) {
        console.error("Error fetching movies:", error);
        // setMovies([]); 
      }
    };
    fetchMovies();
  }, []); 

  const addToWatchlist = (movie: Movie) => {
    const currentWatchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");  
    if (!currentWatchlist.find((m: Movie) => m.id === movie.id)) {
      const updatedWatchlist = [...currentWatchlist, movie];
      setWatchlist(updatedWatchlist);
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    }
  };
  
  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <ProtectedRoute>
      <div>
        <div className="backdrop-blur-sm text-white px-10 py-10 flex flex-col gap-6">
          {username && <h1 className="text-heading-1">Hey, {username}</h1>}
          <h1 className="text-heading-2">Welcome to FILMLY </h1>
          <p className="text-heading-4">Popular Movies and TV Shows to discover. Explore Now.</p>
          <SearchBar />
          <div>
            <LogoutButton />
          </div>
        </div>
        <div className="movies px-10 py-4 text-gray-700 bg-white">
          <h1 className="text-3xl font-bold mb-4">Popular Movies</h1>
            {!movies.length ? (
              <p className="text-gray-700 text-center">Loading movies...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {movies.map((movie) => (
                  <div
                    key={movie.id}
                    onClick={() => setSelectedMovie(movie)} // Open modal on click
                  >
                    <MovieCard
                      key={movie.id}
                      title={movie.title}
                      posterPath={movie.poster_path}
                      overview={movie.overview}
                    />
                  </div>
                ))}
              </div>
            )}
        </div>
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
                    addToWatchlist(selectedMovie);
                    closeModal();
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Add to Watchlist
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
    </ProtectedRoute>

  );
}

