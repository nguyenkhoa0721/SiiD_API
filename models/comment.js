const mongoose = require("mongoose");

const commentSchema= new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: [true, "user required"]
    },
    design: {
        type: mongoose.Schema.ObjectId,
        ref: 'design',
        required: [true, "design required"]
    },
    content: {
        type: String,
        required: [true, "content required"]
    },
    files: [{
        type: mongoose.Schema.ObjectId,
        ref: 'file'
    }],
    parent: {
        type: mongoose.Schema.ObjectId,
        ref: 'comment',
    },
    timestamps: true
});

commentSchema.pre(/^find/, function(next){
    this.populate('user').populate('files');
    next();
});
const comment = mongoose.model("comment",commentSchema);
module.exports = comment;