import mongoose, {Schema, model} from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        maxlength: [30, "Username must not be more than 30 characters"]
    },
    password: {
        type: String,
        required: true,
        select: false,
    },

});

export default mongoose.models.User || model("User", userSchema);