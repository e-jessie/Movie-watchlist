"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MovieCard from "@/components/moviecard";
import Link from "next/link";

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
    </div>
  );
}
