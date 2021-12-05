const mongoose = require("mongoose");

const reviewSchema= new mongoose.Schema({
    content: {
        type: String,
        required: [true, "content required"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, "rating required"]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: [true, "user required"]
    },
    project: {
        type: mongoose.Schema.ObjectId,
        ref: 'project',
        required: [true, "project required"]
    },
    timestamps: true
});

reviewSchema.pre(/^find/, function(next){
    this.populate('user').populate('project');
    next();
});
const review = mongoose.model("review",reviewSchema);
module.exports = review;