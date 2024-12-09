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

        const user = authResult.user;
        return new Response(JSON.stringify({ message: "User found!", user }), { status: 200 });


  
    } catch (error) {
        console.error("Error in PUT /api/watchlist:", error);
        return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
    }
}
