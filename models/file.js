const mongoose = require("mongoose");

const fileSchema= new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, "user required"]
    },
    path: {
        type: String,
        required: [true, "path required"]
    }},
    {timestamps: true}
);

fileSchema.set("toObject", { virtuals: true });
fileSchema.set("toJSON", { virtuals: true });

fileSchema.pre(/^find/, function(next){
    this.populate('createdBy');
    next();
});
const file = mongoose.model("file", fileSchema);
module.exports = file;