const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const portfolioSchema= new mongoose.Schema({
    slug: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, "user required"]
    },
    gallery: [{
        type: mongoose.Schema.ObjectId,
        ref: 'file',
    }]
    },
    {timestamps: true}
);

portfolioSchema.set("toObject", { virtuals: true });
portfolioSchema.set("toJSON", { virtuals: true });

var User = mongoose.model('user');

portfolioSchema.pre("save", function (next) {
    var self = this;
    User.findById( self.createdBy, function (err, user) {
        if (err)
        {
            self.slug="error";
            next();
        }
        else 
        {
            var preSlug=user.name+" "+user.username;
            self.slug = slugify(preSlug)
            next();
        }
    });
});
portfolioSchema.pre(/^find/, function(next){
    this.populate('createdBy');
    this.populate('gallery');
    next();
}); 
const portfolio = mongoose.model("portfolio",portfolioSchema);
module.exports = portfolio;