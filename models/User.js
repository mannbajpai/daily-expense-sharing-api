import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
})

userSchema.pre('save', async (next) => {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isValidPassword = async(password) => {
    return await bcrypt.compare(password, this.password);
}

export default model("User", UserSchema);