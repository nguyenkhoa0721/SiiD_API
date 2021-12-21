const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
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
    inviteClient: String,
    inviteDesign: String,
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
