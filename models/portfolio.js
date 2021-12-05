const mongoose = require("mongoose");
//const slugify = require("slugify");

const portfolioSchema= new mongoose.Schema({
    slug: String,
    description: {
        type: String,
        required: [true, "description required"]
    },
    experience: {
        type: String,
        required: [true, "experience required"]
    },
    workflow: {
        type: String,
        required: [true, "workflow required"]
    },
    email: {
        type: String,
        required: [true, "email required"],
        unique: true,
        lowercase: true,
        validate: validator.isEmail,
    },
    phone: {
        type: String,
        required: [true, "phone required"],
        unique: true
    },
    inspiration: {
        type: String,
        required: [true, "inspiration required"]
    },
    timestamps: true
});

const portfolio = mongoose.model("portfolio",portfolioSchema);
module.exports = portfolio;