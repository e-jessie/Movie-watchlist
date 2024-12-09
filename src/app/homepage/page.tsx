"use client"
import { useState, useEffect } from "react";
import MovieCard from "../../components/moviecard";
import { Movie } from "../../types/movie";
import Image from "next/image";
import { Loader } from "../../../public/icons/loader"
import ProtectedRoute from "@/components/ProtectedRoute";
import LogoutButton from "@/components/LogoutButton";
import SearchBar from "@/components/searchbar";
import { useRouter } from "next/navigation";



export default function HomePage() {
  const router = useRouter();


  const [movies, setMovies] = useState<Movie[]>([]);
  const [user, setUser] = useState<{ name: string, watchlist: Movie[] }>();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false)


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
      if (!response.ok) throw new Error(json.message)

      setUser(json.user)
      setLoading(false)

    } catch (error) {
      console.log(error);

    }
  };


  useEffect(() => {
    console.log("useEffect triggered");
  
    const fetchUser = async () => {
      console.log("Fetching user...");
      const token = localStorage.getItem("token"); // Move this inside fetchUser to avoid scope issues.
  
      if (!token) {
        console.log("No token found, redirecting...");
        router.push("/auth/signup");
        return;
      }
  
      try {
        const response = await fetch("/api/user", {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        });
  
        const json = await response.json();
        if (!response.ok) throw new Error(json.message);
  
        setUser(json.user);
      } catch (err) {
        console.error("Error fetching user:", err);
        router.push("/auth/signup");
      }
    };
  
    const fetchMovies = async () => {
      try {
        console.log("Fetching movies...");
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        if (!response.ok) throw new Error("Failed to fetch movies");
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
  
    // Call the functions inside useEffect.
    fetchUser();
    fetchMovies();
  }, [router]); // `token` is dynamically retrieved within fetchUser, so no need to include it here.
  


  const closeModal = () => {
    setSelectedMovie(null);
  };

  if (user)
    return (
      <ProtectedRoute>
        <div>
          <div className="backdrop-blur-sm text-white px-10 py-10 flex flex-col gap-6">
            {user && <h1 className="text-heading-1">Hey, {user.name}</h1>}
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
                    onClick={() => setSelectedMovie(movie)}
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
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={closeModal}
            >
              <div
                className="bg-white rounded-lg p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
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
                      : user.watchlist.some((movie) => movie.id === selectedMovie.id)
                        ? "bg-red-500 hover:bg-red-700"
                        : "bg-blue-500 hover:bg-blue-700"
                      }`}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader />
                        Loading...
                      </span>
                    ) : user.watchlist.some((movie) => movie.id === selectedMovie.id) ? (
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
      </ProtectedRoute>

    );
  return null
}

