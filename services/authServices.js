import User from "../models/User.js";

export const registerUser = async (userData) => {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        throw new Error("Email already registered");
    }
    const user = new User(userData);
    await user.save();
    return user;
}

export const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Incorrect email");
    }
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
        throw new Error("Incorrect password");
    }
    return user;
}