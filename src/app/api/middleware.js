import jwt from "jsonwebtoken";
import { User } from "@/lib/models";
import connectDB from "@/lib/mongodb";

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = async (req) => {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return { status: 401, message: "Authorization header missing or invalid" };
    }

    const token = authHeader.split(" ")[1];

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);

        await connectDB();

        const user = await User.findById(decodedToken.userId).populate("watchlist");
        if (!user) {
            return { status: 404, message: "User not found" };
        }

        return { status: 200, user };
    } catch (error) {
        console.error("Authentication error:", error);
        return { status: 401, message: "Invalid or expired token" };
    }
};
