import { createUser, getUserById } from "../services/userService.js"

export const addUser = async (req, res) => {
    try {
        const userData = req.body;
        const user = await createUser(userData);
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        res.status(400).json({ message: "Error creating user", error: error.message });
    }
};

export const getUserDetails = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: "Error retrieving user details", error: error.message });
    }
};