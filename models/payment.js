const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    budget: Number,
    paid: Number,
    historyPaid: [
      {
        paidBy: {
          type: mongoose.Schema.ObjectId,
          ref: "user",
        },
        amount: Number,
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

projectSchema.virtual("project", {
  ref: "project",
  localField: "_id",
  foreignField: "payment",
});

const payment = mongoose.model("payment", paymentSchema);
module.exports = payment;
