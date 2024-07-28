import { Router } from "express";
import {addExpense, getAllExpenses, getExpenses, downloadBalance} from "../controllers/expenseController.js"
import isAuthenticated from "../middlewares/authMiddleware.js"
const router = Router();

router.post("/", isAuthenticated, addExpense);
router.get("/user", isAuthenticated, getExpenses);
router.get("/overall", isAuthenticated, getAllExpenses);
router.get("/download", isAuthenticated, downloadBalance);

export default router;