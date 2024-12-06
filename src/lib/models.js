import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    watchlist: [{ type: Schema.Types.ObjectId, ref: 'Movie' }], 
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};


const movieSchema = new Schema(
    {
        id: { type: Number, required: true, unique: true },
        title: { type: String, required: true },
        original_title: String,
        overview: String,
        release_date: Date,
        genre_ids: [Number],
        backdrop_path: String,
        poster_path: String,
        original_language: String,
        popularity: Number,
        vote_average: Number,
        vote_count: Number,
        video: Boolean,
        adult: Boolean,
    },

);

const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);


const User = mongoose.models.User || mongoose.model("User", userSchema);

export { User, Movie };
