"use client"
import { useState, useEffect } from "react";
import MovieCard from "../../components/moviecard";
import { Movie } from "../../types/movie";


export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  //useEffect(() => {
    // const fetchMovies = async () => {
    //   try {
    //     const response = await fetch(
    //       `https://api.themoviedb.org/3/movie/popular?api_key={process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    //     );
    //     if (!response.ok) throw new Error("Failed to fetch movies");
    //     const data = await response.json();
    //     setMovies(data.results || []);
    //   }
    //   catch (error) {
    //     console.error("Error fetching movies:", error);
    //     setMovies([]);
    //   }
    // };
    // fetchMovies();
    
  //}, []);
  useEffect(() => {
    console.log("useEffect triggered");  // Log to confirm useEffect is being called
    const fetchMovies = async () => {
      try {
        console.log("Fetching movies...");  // Log before making the fetch request
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        console.log("Response:", response);  // Log the response to check if it's being fetched
        if (!response.ok) throw new Error("Failed to fetch movies");
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]); // Set movies to an empty array to avoid crashing
      }
    };
    fetchMovies();
  }, []);  // Empty dependency array to run once on mount
  

  return (
    //<div className="container mx-auto">
    <div>
      <div className="backdrop-blur-sm text-white px-10 py-16 flex flex-col gap-5">
        <h1 className="text-heading-1">Welcome to FILMLY </h1>
        <p className="text-heading-4">Popular Movies, TV Shows and people to discover. Explore Now.</p>
        <div className="searchbar ">

        </div>
      </div>
      <div className="movies px-10 py-4 text-gray-700 bg-white">
        <h1 className="text-3xl font-bold mb-4">Popular Movies</h1>
        {!movies.length ? (
          <p className="text-gray-700 text-center">Loading movies...</p>
        ) : (
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
        )}
      </div>
      
  </div>
  );
}

// import Image from "next/image";

// export default function Homepage() {
//   // Sample movie data for demonstration
//   const movies = [
//     { id: 1, title: "Movie 1", image: "/images/movie1.jpg" },
//     { id: 2, title: "Movie 2", image: "/images/movie2.jpg" },
//     { id: 3, title: "Movie 3", image: "/images/movie3.jpg" },
//     { id: 4, title: "Movie 4", image: "/images/movie4.jpg" },
//     { id: 5, title: "Movie 5", image: "/images/movie5.jpg" },
//   ];

//   return (
//     <div className="bg-gray-100 min-h-screen p-8">
//       <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Welcome to FILMLY</h1>
//       <p className="text-lg text-gray-700 mb-12 text-center">
//         Browse through our collection of amazing movies and add them to your watchlist.
//       </p>

//       {/* Movie Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {movies.map((movie) => (
//           <div
//             key={movie.id}
//             className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300"
//           >
//             <Image
//               src={movie.image}
//               alt={movie.title}
//               width={40}
//               height={4}
//               className="w-full h-[200px] object-cover"
//             />
//             <div className="p-4">
//               <h2 className="text-lg font-bold text-gray-800">{movie.title}</h2>
//               <p className="text-sm text-gray-600 mt-2">This is a short description of the movie.</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
