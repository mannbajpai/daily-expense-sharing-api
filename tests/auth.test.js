
import { connect, connection } from "mongoose";
import request from "supertest";
import app from "../index.js";
import User from "../models/User.js";
import Expense from "../models/Expense.js";

describe("Expense Controller", () => {
  let user;

  beforeAll(async () => {
    const uri = "mongodb://localhost:27017/test_db";
    await connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  beforeEach(async () => {
    await connection.db.dropDatabase();

    // Create a user and log in to get a token
    user = await new User({ name: "Test User", email: "test@example.com", password: "password123" }).save();

    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password123" });

  });

  afterAll(async () => {
    await connection.close();
  });

  it("should add a new expense", async () => {
    const expenseData = { description: "Dinner", amount: 200, splitMethod: "equal", participants: [user._id] };

    const response = await request(app)
      .post("/api/expenses")
      .set("Authorization", `Bearer ${token}`)
      .send(expenseData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("message", "Expense added successfully");
  });

  it("should retrieve user expenses", async () => {
    const expenseData = { description: "Lunch", amount: 150, splitMethod: "equal", participants: [user._id] };
    await new Expense(expenseData).save();

    const response = await request(app)
      .get("/api/expenses/user")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].description).toBe("Lunch");
  });

  it("should retrieve overall expenses", async () => {
    const expenseData = { description: "Snack", amount: 50, splitMethod: "equal", participants: [user._id] };
    await new Expense(expenseData).save();

    const response = await request(app)
      .get("/api/expenses")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].description).toBe("Snack");
  });
});
