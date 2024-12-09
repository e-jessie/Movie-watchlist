"use client";

import { useState, useEffect } from "react";
import { Movie } from "../../types/movie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader } from "../../../public/icons/loader";
import Link from "next/link";


export default function WatchlistPage() {
  const router = useRouter();
  const token = localStorage.getItem("token")
  const [user, setUser] = useState<{ name: string, watchlist: Movie[], recommendations: Movie[] }>();
  const [pageLoad, setPageLoad] = useState(true)
  const [loading, setLoading] = useState(0)

  if (!token) {
    router.push("/auth/signup")
  }


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
    const token = localStorage.getItem('token')

    try {
      const response = await fetch("/api/watchlist", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(movie)
      })

      const json = await response.json()
      console.log("API Response:", json); // checking log response from backend
      if (!response.ok) throw new Error(json.message)

      setUser(json.user)
      setLoading(0)

    } catch (error) {
      console.log(error);

    }
  };



  if (pageLoad) {
    return <h1>Loading...</h1>
  }
  else {
    return (
      <div className="container flex flex-col gap-4 mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Your Watchlist</h1>
        <Link href="/homepage" className="text-blue-500 hover:underline w-[200px]">
          Back to Homepage
        </Link>
        {user && user.watchlist.length > 0 ? (
          <div className="flex flex-col gap-[150px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {user.watchlist.map((movie, index) => (
                <div key={movie.id || `watchlist-${index}`} className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex flex-col justify-between">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      width={150}
                      height={100}
                      className="rounded-lg mb-4"
                    />
                    <h2 className="text-lg font-bold">{movie.title}</h2>
                    <p className="text-sm text-gray-700">{movie.overview}</p>
                  </div>

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
                </div>
              ))}
            </div>

            <div>
              <h1 className="text-3xl my-10">Recommendations Based on your watchlist</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {user.recommendations.map((movie, index) => (
                  <div key={movie.id || `watchlist-${index}`} className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex flex-col justify-between">
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        width={150}
                        height={100}
                        className="rounded-lg mb-4"
                      />
                      <h2 className="text-lg font-bold">{movie.title}</h2>
                      <p className="text-sm text-gray-700">{movie.overview}</p>
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

