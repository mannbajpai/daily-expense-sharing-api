import { Router } from "express";
import { addUser, getUserDetails } from "../controllers/userController.js";

const router = Router();

router.post("/", addUser);
router.get("/:id", getUserDetails);

export default router;