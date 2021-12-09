const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.ObjectId,
      ref: "project",
    },
    design: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "design",
      },
    ],
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    changeNote: String,
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

historySchema.pre(/^find/, function (next) {
  this.populate("createdBy");
  next();
});

const history = mongoose.model("history", historySchema);
module.exports = history;
