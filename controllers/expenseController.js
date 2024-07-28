import Expense from "../models/Expense.js";
import User from "../models/User.js";
import calculateExpense from "../utils/calculateExpense.js";

export default addExpense = async (req, res) => {
    try {
        const { title, amount, participants, splitMethod } = req.body;

        // Validate input data
        if (!title || !amount || !participants || !splitMethod) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const expense = new Expense({
            title,
            amount,
            paidBy: req.user._id,
            participants,
            splitMethod,
        });

        // Calculate expense distribution
        const splitData = calculateExpense(amount, participants, splitMethod);
        expense.participants = splitData;

        await expense.save();
        res.status(201).json({ message: "Expense added successfully", expense });
    } catch (error) {
        res.status(400).json({ message: "Error adding expense", error });
    }
}

export const getUserExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ participants: { $elemMatch: { user: req.user._id } } });
        res.json(expenses);
    } catch (error) {
        res.status(400).json({ message: "Error retrieving user expenses", error });
    }
}

export const getOverallExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find().populate("paidBy participants.user");
        res.json(expenses);
    } catch (error) {
        res.status(400).json({ message: "Error retrieving overall expenses", error });
    }
}

export const downloadBalanceSheet = async (req, res) => {
    try {
        // Fetch user's expenses
        const expenses = await Expense.find({ participants: { $elemMatch: { user: req.user._id } } });

        // Prepare data for balance sheet
        const balanceSheet = expenses.map((expense) => {
            return {
                title: expense.title,
                amount: expense.amount,
                paidBy: expense.paidBy.name,
                splitMethod: expense.splitMethod,
                participants: expense.participants.map((participant) => ({
                    name: participant.user.name,
                    amount: participant.amount,
                    percentage: participant.percentage,
                })),
            };
        });

        // Generate a CSV file or PDF (this example uses a simple JSON response)
        res.json(balanceSheet);
    } catch (error) {
        res.status(400).json({ message: "Error generating balance sheet", error });
    }
}

