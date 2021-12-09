const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    clients: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "user",
      },
    ],
    designers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "user",
      },
    ],
    projectName: {
      type: String,
      required: true,
    },
    state: [
      {
        type: String,
        required: true,
        enum: {
          values: ["pending", "inprogress", "done"],
        },
      },
    ],
    payment: {
      type: mongoose.Schema.ObjectId,
      ref: "payment",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

projectSchema.virtual("histories", {
  ref: "history",
  localField: "_id",
  foreignField: "project",
});

const project = mongoose.model("project", projectSchema);
module.exports = project;
