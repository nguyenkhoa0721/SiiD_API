const mongoose = require("mongoose");

const commentSchema= new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, "user required"]
    },
    design: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'design',
        required: [true, "design required"]
    },
    content: {
        type: String,
        required: [true, "content required"]
    },
    files: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'file'
    }],
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment',
    }},
    {timestamps: true}
);

commentSchema.pre(/^find/, function(next){
    this.populate('createdBy').populate('files');
    next();
});
const comment = mongoose.model("comment",commentSchema);
module.exports = comment;