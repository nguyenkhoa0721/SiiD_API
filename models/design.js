const mongoose = require("mongoose");

const designSchema = new mongoose.Schema(
  {
    imageFile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "file",
    },
    designFile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "file",
    },
    originName: String,
    waterMark: Boolean,
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

designSchema.pre(/^find/, function (next) {
  this.populate("imageFile").populate("designFile");
  next();
});

const desgin = mongoose.model("design", designSchema);
module.exports = desgin;
