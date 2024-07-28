import Expense from "../models/Expense.js";
import User from "../models/User.js";
import calculateExpense from "../utils/calculateExpense.js";

export const createExpense = async (expenseData) => {
    // Calculate expense distribution
    const splitData = calculateExpense(
        expenseData.amount,
        expenseData.participants,
        expenseData.splitMethod
    );

    const expense = new Expense({
        ...expenseData,
        participants: splitData,
    });

    await expense.save();
    return expense;
};

export const getUserExpenses = async (userId) => {
    return await Expense.find({
        participants: { $elemMatch: { user: userId } },
    }).populate("paidBy participants.user", "name email"); // Populating user details
};

export const getOverallExpenses = async () => {
    return await Expense.find().populate("paidBy participants.user", "name email");
};

export const downloadBalanceSheet = async (userId) => {
    const expenses = await Expense.find({
        participants: { $elemMatch: { user: userId } },
    });

    // Generate balance sheet data
    const balanceSheet = expenses.map((expense) => ({
        title: expense.title,
        amount: expense.amount,
        paidBy: expense.paidBy.name,
        splitMethod: expense.splitMethod,
        participants: expense.participants.map((participant) => ({
            name: participant.user.name,
            amount: participant.amount,
            percentage: participant.percentage,
        })),
    }));

    return balanceSheet;
};