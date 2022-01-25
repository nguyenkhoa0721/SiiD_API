const mongoose = require("mongoose");

const commentSchema= new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, "user required"]
    },
    history: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'history',
        required: [true, "history required"]
    },
    content: {
        type: String,
        required: [true, "content required"]
    },
    files: [{
        type: String
    }]
    },
    {timestamps: true}
);

commentSchema.set("toObject", { virtuals: true });
commentSchema.set("toJSON", { virtuals: true });

commentSchema.pre(/^find/, function(next){
    this.populate('createdBy').populate('files');
    next();
});
const comment = mongoose.model("comment",commentSchema);
module.exports = comment;