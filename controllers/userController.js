import User from "../models/User.js";

export const createUser = async (req,res) => {
    try {
        const { name, email, password, mobileNumber } = req.body;
        const user = new User({ name, email, password, mobileNumber });
        await user.save();
        res.status(201).json({ message: "User created successfully", user });
      } catch (error) {
        res.status(400).json({ message: "Error creating user", error });
      }
}

export const getUserDetails = async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
      } catch (error) {
        res.status(400).json({ message: "Error retrieving user details", error });
      }
};