import { Router } from "express";
import { getUserDetails } from "../controllers/userController.js";
import isAuthenticated from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/:id", isAuthenticated, getUserDetails);

export default router;