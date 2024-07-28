import { Schema, model } from "mongoose"

const ExpenseSchema = new Schema({
  amount: {
    type: Number,
    required: true
  },
  splitMethod: {
    type: String,
    enum: ['equal', 'exact', 'percentage'],
    required: true
  },
  paidBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  participants: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      amount: Number, // for exact split
      percentage: Number, // for percentage split
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  }
});

export default model("Expense", ExpenseSchema);