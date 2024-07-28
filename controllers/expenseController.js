import { getUserExpenses, getOverallExpenses, downloadBalanceSheet, createExpense } from "../services/expenseService.js"

export const addExpense = async (req, res) => {
    try {
        const expenseData = {
            title: req.body.title,
            amount: req.body.amount,
            paidBy: req.user._id,
            participants: req.body.participants,
            splitMethod: req.body.splitMethod,
        };

        const expense = await createExpense(expenseData);

        res.status(201).json({ message: "Expense added successfully", expense });
    } catch (error) {
        res.status(400).json({ message: "Error adding expense", error: error.message });
    }
};

export const getExpenses = async (req, res) => {
    try {
        const expenses = await getUserExpenses(req.user._id);
        res.json(expenses);
    } catch (error) {
        res.status(400).json({ message: "Error retrieving user expenses", error: error.message });
    }
};

export const getAllExpenses = async (req, res) => {
    try {
        const expenses = await getOverallExpenses();
        res.json(expenses);
    } catch (error) {
        res.status(400).json({ message: "Error retrieving overall expenses", error: error.message });
    }
};

export const downloadBalance = async (req, res) => {
    try {
        const balanceSheet = await downloadBalanceSheet(req.user._id);
        res.status(200).json({ balanceSheet });
    } catch (error) {
        res.status(400).json({ message: "Error downloading balance sheet", error: error.message });
    }
};
