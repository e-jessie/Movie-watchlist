import { authenticate } from "../middleware";

export async function GET(req) {
    try {
        const authResult = await authenticate(req);
        if (authResult.status !== 200) {
            return new Response(
                JSON.stringify({ message: authResult.message }),
                { status: authResult.status }
            );
        }

        const { watchlist } = authResult.user;

        // Step 1: Build genreMovieObj and convert to movie IDs array
        const genreMovieObj = {};
        watchlist.forEach((movie) => {
            const genre_ids = String(movie.genre_ids);
            if (!genreMovieObj[genre_ids]) {
                genreMovieObj[genre_ids] = movie.id;
            }
        });

        const movieIds = Object.values(genreMovieObj).slice(0, 5); // Max 5 movie IDs

        const similarMoviesPromises = movieIds.map(async (id) => {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch similar movies for ID: ${id}, Status: ${response.status}`);
            }

            const data = await response.json();
            return data.results; // Each response contains 20 movies
        });


        const similarMoviesResults = await Promise.all(similarMoviesPromises);

        // Step 3: Flatten the results and limit to 20 movies
        const allSimilarMovies = similarMoviesResults.flat(); 
        const uniqueMovies = Array.from(
            new Map(allSimilarMovies.map((movie) => [movie.id, movie])).values()
        );


        const limitedMovies = uniqueMovies.slice(0, 20);

        return new Response(
            JSON.stringify({
                message: "Movies retrieved successfully!",
                movies: limitedMovies,
            }),
            { status: 200 }
        );

    } catch (error) {
        console.error("Error in GET /api/recommendation:", error);
        return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
    }
}

