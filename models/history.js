const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
    },
    designs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "design",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
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
