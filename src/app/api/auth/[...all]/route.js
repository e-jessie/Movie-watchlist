import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import { User } from "@/lib/models";

const JWT_SECRET = process.env.JWT_SECRET;

const loginUser = async (req) => {
    const { email, password } = await req.json();

    if (!email || !password) {
        return {
            status: 400,
            body: { message: "Email and password are required" },
        };
    }

    try {
        await connectDB();

        const user = await User.findOne({ email }).populate("watchlist");
        user.watchlist = user.watchlist.reverse()


        if (!user) {
            return {
                status: 401,
                body: { message: "Invalid credentials" },
            };
        }

        user.watchlist = user.watchlist.reverse()


        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return {
                status: 401,
                body: { message: "Invalid credentials" },
            };
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email, name: user.name },
            JWT_SECRET,
            { expiresIn: "30d" }
        );

        return {
            status: 200,
            body: {
                message: "Login successful",
                token,
                user
            },
        };
    } catch (error) {
        console.error("Error during sign-in:", error);
        return {
            status: 500,
            body: { message: "Internal server error" },
        };
    }
};

const signupUser = async (req) => {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
        return {
            status: 400,
            body: { message: "Email, password, and name are required" },
        };
    }

    try {
        await connectDB();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return {
                status: 400,
                body: { message: "User already exists" },
            };
        }

        const user = new User({ email, password, name });
        await user.save();

        const token = jwt.sign(
            { userId: user._id, email: user.email, name: user.name },
            JWT_SECRET,
            { expiresIn: "30d" }
        );

        return {
            status: 201,
            body: {
                message: "User registered successfully",
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                },
            },
        };
    } catch (error) {
        console.error("Error during sign-up:", error);
        return {
            status: 500,
            body: { message: "Internal server error" },
        };
    }
};

export async function POST(req) {
    const { pathname } = req.nextUrl;

    if (pathname.endsWith("/login")) {
        const result = await loginUser(req);
        return new Response(JSON.stringify(result.body), { status: result.status });
    }

    if (pathname.endsWith("/signup")) {
        const result = await signupUser(req);
        return new Response(JSON.stringify(result.body), { status: result.status });
    }

    return new Response(
        JSON.stringify({ success: false, message: "Route not found" }),
        { status: 404 }
    );
}
