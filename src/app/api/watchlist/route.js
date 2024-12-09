import { Movie } from "@/lib/models";
import { authenticate } from "../middleware";

export async function PATCH(req) {
    try {
        const authResult = await authenticate(req);
        if (authResult.status !== 200) {
            return new Response(
                JSON.stringify({ message: authResult.message }),
                { status: authResult.status }
            );
        }

        const user = authResult.user;

        const requestData = await req.json();
        const { id, title } = requestData

        if (!id || typeof id !== 'number' || !title) {
            return new Response(JSON.stringify({ message: "id must be a number and title is required" }), { status: 400 });
        }


        const existingMovie = user.watchlist.find((movie) => movie.id === id);

        if (existingMovie) {
            user.watchlist = user.watchlist.filter((movie) => movie.id !== id);
            await user.save();
            return new Response(JSON.stringify({ message: "Movie removed from watchlist", user }), { status: 200 });
        } else {
            let movie = await Movie.findOne({ id });
            if (!movie) {
                movie = new Movie({
                    ...requestData
                });

                
                await movie.save();
            }

            user.watchlist.push(movie);
            await user.save();
            console.log(user);
            
            return new Response(JSON.stringify({ message: "Movie added to watchlist", user }), { status: 200 });
        }
    } catch (error) {
        console.error("Error in PUT /api/watchlist:", error);
        return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
    }
}
