const User = require('./../models/user');
const sendRes = require("../utils/send-res");
//const slugify = require("slugify");
exports.getProfile = async (req, res, next) => {
    let query = User.findById(req.params.id);
    let query1 = User.findOne({username: req.params.id});
    try {
        let doc = await query;
        if (!doc) 
            return sendRes.resError(res,"Invalid user ID")
        else 
            return sendRes.resSuccess(res,doc);
    } catch (err){
        let doc = await query1;
        if (!doc) 
            return sendRes.resError(res,"Invalid user ID")
        else 
            return sendRes.resSuccess(res,doc);        
    }
};
exports.updateProfile = async (req, res, next) => {
    try {
        const doc = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!doc) {
            return sendRes.resError(res, "Invalid user ID");
        }   
        return sendRes.resSuccess(res,doc);     
    } catch (err) {
        return sendRes.resError(res, "Something's wrong");
    }  
}
exports.preUpdateAvatar = (req,res,next) => {
    let fs = require ("fs-extra");
    req.dirname1 = `public/user/${req.user}`;
    if (!fs.existsSync(req.dirname1))
    {
        fs.mkdirsSync(req.dirname1);
    }
    next();
}
exports.updateAvatar = async (req, res, next) => {
    try{
        //req.file.path=slugify(req.file.path);
        const doc = await User.findByIdAndUpdate(req.user, {avatar: req.file.path}, {
            new: true, //tra ve cai moi thay vi cai cu~
        });
        if (!doc) {
            return sendRes.resError(res, "Invalid user ID");
        }
        return sendRes.resSuccess(res, doc);
    } catch (err) {
        console.log(err);
        return sendRes.resError(res, "Something's wrong");
    }

}
