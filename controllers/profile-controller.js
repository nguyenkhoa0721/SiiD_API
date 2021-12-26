const User = require('./../models/user');
const sendRes = require("../utils/send-res");

exports.getProfile = async (req, res, next) => {
    let query = User.findById(req.params.id);
    let query1 = User.findOne({username: req.params.id})
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
exports.updateAvatar = async (req, res, next) => {
    try{
        const doc = await User.findByIdAndUpdate(req.user, {avatar: req.file.path}, {
            new: true, //tra ve cai moi thay vi cai cu~
        });
        if (!doc) {
            return sendRes.resError(res, "Invalid user ID");
        }
        return sendRes.resSuccess(res, doc);
    } catch (err) {
        return sendRes.resError(res, "Something's wrong");
    }

}
