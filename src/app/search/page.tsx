"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MovieCard from "@/components/moviecard";
import Link from "next/link";
import Image from "next/image";
import { Loader } from "../../../public/icons/loader";
import { PageLoader } from "../../../public/icons/pageloader";
import { Exit } from "../../../public/icons/exit";
import ScrollToTop from "@/components/ScrollToTop";
import { Bell } from "../../../public/icons/bell";
import { CalendarPopup } from "@/components/Calender";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

function SearchResultsPage({ token }: { token: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<{ name: string, watchlist: Movie[] }>();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);




  const toggleWatchlist = async (movie: Movie) => {
    setLoading(true)

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
    <div className="container mx-auto p-4 flex flex-col gap-8">
      {isLoading && <PageLoader />}
      <Link href="/homepage" className="text-blue-500 hover:underline w-[200px] mt-4">
        Back to Homepage
      </Link>
      <h1 className="text-3xl font-bold mb-6">
        Search Results for &quot;{query}&quot;
      </h1>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {searchResults.length === 0 && !isLoading && !error && (
        <h1 className="flex justify-center text-xl text-red-500">Your search for <span className="font-extrabold">&quot;{query}&quot;</span> returned no results.</h1>
      )}
      {searchResults.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {searchResults.map((movie) => (
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
      {selectedMovie && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-md w-full relative m-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 max-w-[300px]">{selectedMovie.title}</h2>
            <div className="absolute top-0 right-0 p-4 w-20 h-20" onClick={closeModal}><Exit /></div>
            <div>
              <div className="flex items-baseline gap-4">
                {selectedMovie.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                    alt={selectedMovie.title}
                    width={150}
                    height={100}
                    className="rounded-lg mb-4"
                  />
                ) : (
                  <div className="h-[100px] w-[150px] bg-gray-500 rounded-xl mb-4 flex items-center justify-center">
                    <Image
                      src="/images/filmlyIcon.png"
                      alt={selectedMovie.title}
                      width={150}
                      height={150}
                    />
                  </div>
                )}
                <Bell onClick={() => setShowCalendar(false)} />

                {showCalendar && (
                  <CalendarPopup
                    movieTitle={selectedMovie.title}
                    movieDescription={selectedMovie.overview}
                    onClose={() => setShowCalendar(false)} 
                  />
                )}
              </div>
              {selectedMovie.overview ? (
                <p className="text-gray-700 overflow-y-auto">{selectedMovie.overview}</p>
              ) : (
                <p className="text-sm text-red-400 overflow-y-auto"> No Description</p>
              )}
            </div>
            <div className="flex gap-4 mt-4 justify-between">
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
                onClick={() => router.push(`/stream/${selectedMovie.id}`)}
                className="px-4 py-2 bg-emerald-400 text-white rounded hover:bg-emerald-600"
              >
                Watch
              </button>
            </div>
          </div>
        </div>
      )}

      <     ScrollToTop />
    </div>
  );
}

export default function ProtectedPage() {
  const router = useRouter();
  const [token, setToken] = useState<null | string>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')


    if (!token) {
      console.log("No token found, redirecting...");
      router.push("/auth/signup");
      return;
    }

    setToken(token)

  }, [router]);

  if (!token) return <p>Loading...</p>;

  return <SearchResultsPage token={token} />
}