const Comment = require('./../models/comment');
const File = require ('./../models/file');
const slugify = require("slugify");

const sendRes = require("../utils/send-res");
exports.preCreateComment = (req,res,next) => {
    let fs = require ("fs-extra");
    req.dirname1 = `public/user/${req.user}`;
    if (!fs.existsSync(req.dirname1))
    {
        fs.mkdirsSync(req.dirname1);
    }
    next();
}
exports.createComment = async (req, res, next) => {
    const comment = new Comment(req.body);
    //form-data có files, content
    comment.design = req.params.id;
    comment.createdBy = req.user;
    
    const files=[];
    req.files.forEach(function (file) {
        file.path=slugify(file.path);
        files.push(file.path);
    })
    comment.files=files;
    //filter ra path
    try {
        await comment.save();
        return sendRes.resSuccess(res,comment);
    } catch (err) {
        return sendRes.resError(res, "Save comment failed");
    }
};
exports.deleteComment = async (req, res, next) => {
    try {
        const doc = await Comment.findByIdAndDelete(req.params.id);
        if (!doc) {
            return sendRes.resError(res, "Invalid comment ID");
        }
        return sendRes.resSuccess(res, null);
    } catch (err) {
        return sendRes.resError(res, "Something's wrong");
    };
};
exports.updateComment = async (req, res, next) => {
    //content only, them/xoa hinh them sau
    try {
        const doc = await Comment.findByIdAndUpdate(req.params.id, req.body);
        if (!doc) {
            return sendRes.resError(res, "Invalid comment ID");
        }
        return sendRes.resSuccess(res, null);
    } catch (err) {
        return sendRes.resError(res, "Something's wrong");
    };
};
exports.getAllComments = async (req, res, next) => {
    try {
        const doc = await Comment.find({design: req.params.id}, '-design');
        return sendRes.resSuccess(res, doc);  
        //khong co thi data=null 
    } catch (err) {
        return sendRes.resError(res, "Something's wrong");
    }
}