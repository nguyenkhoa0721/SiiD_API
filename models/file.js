const mongoose = require("mongoose");

const fileSchema= new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: [true, "user required"]
    },
    path: {
        type: String,
        required: [true, "path required"]
    },
    timestamps: true
});

fileSchema.pre(/^find/, function(next){
    this.populate('user');
    next();
});
const file = mongoose.model("file", fileSchema);
module.exports = file;