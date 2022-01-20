const Portfolio = require('./../models/portfolio');
const File = require ('./../models/file');

const sendRes = require("../utils/send-res");


exports.getPortfolio = async (req, res, next) => {
    try {
        const doc = await Portfolio.findOne({createdBy: req.user});
        if (!doc) {
            return sendRes.resError(res, "Missing portfolio");
        }
        return sendRes.resSuccess(res, doc);   
    } catch (err) {
        return sendRes.resError(res, "Something's wrong");
    }
};
exports.getAllDesign = async (req, res, next) => {
    try {
        const doc = await File.find({createdBy: req.user}, 'path');
        return sendRes.resSuccess(res, doc);  
        //khong co thi data=null 
    } catch (err) {
        return sendRes.resError(res, "Something's wrong");
    }
};
exports.updatePortfolio = async (req, res, next) => {
    try {
        const doc = await Portfolio.findOneAndUpdate({createdBy: req.user}, req.body, {
            new: true,
        });
        if (!doc) {
            return sendRes.resError(res, "Update failed.");
        }   
        return sendRes.resSuccess(res,doc);     
    } catch (err) {
        return sendRes.resError(res, "Something's wrong");
    }  
}

