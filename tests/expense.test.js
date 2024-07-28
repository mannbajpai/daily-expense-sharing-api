
import { connect, connection } from "mongoose";
import { addExpense, getUserExpenses, getOverallExpenses } from "../services/expenseService.js";
import { deleteMany } from "../models/Expense.js";
import User, { deleteMany as _deleteMany } from "../models/User.js";

describe("Expense Service", () => {
  let user;

  beforeAll(async () => {
    const uri = "mongodb://localhost:27017/test_db";
    await connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  beforeEach(async () => {
    // Create a test user
    user = await new User({ name: "Test User", email: "test@example.com", password: "password123" }).save();
  });

  afterEach(async () => {
    await deleteMany({});
    await _deleteMany({});
  });

  afterAll(async () => {
    await connection.close();
  });

  it("should add an expense", async () => {
    const expenseData = { description: "Lunch", amount: 100, splitMethod: "equal", participants: [user._id] };
    const expense = await addExpense(expenseData);
    expect(expense).toHaveProperty("_id");
    expect(expense.description).toBe(expenseData.description);
  });

  it("should retrieve user expenses", async () => {
    const expenseData = { description: "Lunch", amount: 100, splitMethod: "equal", participants: [user._id] };
    await addExpense(expenseData);

    const expenses = await getUserExpenses(user._id);
    expect(expenses).toHaveLength(1);
    expect(expenses[0].description).toBe(expenseData.description);
  });

  it("should retrieve overall expenses", async () => {
    const expenseData = { description: "Dinner", amount: 150, splitMethod: "equal", participants: [user._id] };
    await addExpense(expenseData);

    const expenses = await getOverallExpenses();
    expect(expenses).toHaveLength(1);
    expect(expenses[0].description).toBe(expenseData.description);
  });
});
