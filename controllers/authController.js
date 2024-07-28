import { loginUser, registerUser } from "../services/authServices.js";

export const register = async (req, res) => {
    try {
        const userData = req.body;
        const user = await registerUser(userData);
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(400).json({ message: "Error registering user", error: error.message });
    }
};

export const login = async (req, res, next) => {

    await loginUser(req.body.email, req.body.password)
        .then((user) => {
            req.login(user, (err) => {
                if (err) return next(err);
                return res.status(200).json({ message: "Login successful", user });
            });
        })
        .catch((error) => {
            res.status(400).json({ message: "Error logging in", error: error.message });
        });
};

export const logout = (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
    });
    res.status(200).json({ message: "Logged out successfully" });
};