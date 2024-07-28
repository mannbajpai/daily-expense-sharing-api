import { getUserById } from "../services/userService.js"


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