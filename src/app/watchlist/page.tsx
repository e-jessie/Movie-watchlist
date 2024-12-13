"use client";

import { useState, useEffect } from "react";
import { Movie } from "../../types/movie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader } from "../../../public/icons/loader";
import { PageLoader } from "../../../public/icons/pageloader"
import Link from "next/link";


function WatchlistPage({ token }: { token: string }) {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string, watchlist: Movie[], recommendations: Movie[] }>();
  const [pageLoad, setPageLoad] = useState(true)
  const [loading, setLoading] = useState(0)


  useEffect(() => {
    const fetchUser = async () => {

      try {
        const response = await fetch("/api/recommendation", {
          method: "GET",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },

        })
        const json = await response.json()
        console.log("API Response:", json); // checking log response from backend
        if (!response.ok) throw new Error(json.message)

        setUser(json.user)

        setPageLoad(false)
      }
      catch (err) {
        console.log(err);
        setPageLoad(false)
        router.push("/auth/signup")
      }
    }

    fetchUser()
  }, [router, token]);

  const removeFromWatchlist = async (movie: Movie) => {
    console.log(movie);

    setLoading(movie.id)

    try {
      const response = await fetch("/api/watchlist", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(movie)
      })

      const json = await response.json()
      console.log("API Response:", json); // checking log response from backend
      if (!response.ok) throw new Error(json.message)

      setUser((user) => user ? { ...user, watchlist: json.user.watchlist } : user)
      setLoading(0)

    } catch (error) {
      console.log(error);

    }
  };



  if (pageLoad) {
    return (
      <div>
        <PageLoader />
      </div>
    )
  }
  else {
    return (
      <div className="container flex flex-col gap-4 mx-auto p-4">
        <Link href="/homepage" className="text-blue-500 hover:underline w-[200px] mt-4">
          Back to Homepage
        </Link>
        <h1 className="text-3xl font-bold mb-4">Your Watchlist</h1>
        {user && user.watchlist.length > 0 ? (
          <div className="flex flex-col gap-[150px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {user.watchlist.map((movie, index) => (
                <div key={movie.id || `watchlist-${index}`} className="flex flex-col gap-3 bg-white rounded-xl shadow-md p-4 m-4 hover:scale-105 transition-transform duration-300">
                  <div className="h-[500px] flex flex-col max-w-sm gap-2">
                    {movie.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                        className="rounded-xl mb-4"
                        width={150}
                        height={100}
                      />
                    ) : (
                      <div className="h-[270px] w-[150px] bg-gray-500 rounded-xl mb-4 flex items-center justify-center">
                        <Image
                          src="/images/filmlyIcon.png"
                          alt={movie.title}
                          width={150}
                          height={150}
                        />
                      </div>
                    )}
                    <h2 className="text-lg font-bold">{movie.title}</h2>
                    {movie.overview ? (
                      <p className="text-sm text-gray-700 overflow-y-auto">{movie.overview}</p>
                    ) : (
                      <p className="text-sm text-red-400 overflow-y-auto"> No Description</p>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={() => removeFromWatchlist(movie)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mt-auto"
                    >
                      {loading === movie.id ? (
                        <span className="flex items-center gap-2">
                          <Loader />
                          Loading...
                        </span>
                      ) : 'Remove'}
                    </button>
                    <button
                      onClick={() => router.push(`/stream/${movie.id}`)}
                      className="px-4 py-2 bg-emerald-400 text-white rounded hover:bg-emerald-600"
                    >
                      Watch
                    </button>
                  </div>

                </div>
              ))}
            </div>

            <div>
              <h1 className="text-3xl my-10">Recommendations Based on your watchlist</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {user.recommendations.map((movie, index) => (
                  <div key={movie.id || `watchlist-${index}`} className="flex flex-col gap-3 bg-white rounded-xl shadow-md p-4 m-4 hover:scale-105 transition-transform duration-300">
                    <div className="h-[500px] flex flex-col max-w-sm gap-2">
                      {movie.poster_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                          alt={movie.title}
                          className="rounded-xl mb-4"
                          width={150}
                          height={100}
                        />
                      ) : (
                        <div className="h-[270px] w-[150px] bg-gray-500 rounded-xl mb-4 flex items-center justify-center">
                          <Image
                            src="/images/filmlyIcon.png"
                            alt={movie.title}
                            width={150}
                            height={150}
                          />
                        </div>
                      )}
                      <h2 className="text-lg font-bold">{movie.title}</h2>
                      {movie.overview ? (
                        <p className="text-sm text-gray-700 overflow-y-auto">{movie.overview}</p>
                      ) : (
                        <p className="text-sm text-red-400 overflow-y-auto"> No Description</p>
                      )}
                    </div>
                    <div className="flex justify-between">
                      {/* <button
                        onClick={() => removeFromWatchlist(movie)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mt-auto"
                      >
                        {loading === movie.id ? (
                          <span className="flex items-center gap-2">
                            <Loader />
                            Loading...
                          </span>
                        ) : 'Remove'}
                      </button> */}
                      <button
                        onClick={() => router.push(`/stream/${movie.id}`)}
                        className="px-4 py-2 bg-emerald-400 text-white rounded hover:bg-emerald-600"
                      >
                        Watch
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-rose-900">Your watchlist is empty.</p>
        )}
      </div>

    )
  }
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

  }, [router, token]);

  if (!token) return <PageLoader />; // Show loading state while checking auth

  return <WatchlistPage token={token} />
}