const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    index: true,
    unique: true,
  },
  phone: String,
  name: {
    type: String,
    required: [true, "name required"],
  },
  email: {
    type: String,
    required: [true, "email required"],
    unique: true,
    lowercase: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  birth: Date
},{timestamps: true});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

//trước khi lưu gì đó vào DB, nó sẽ check xem password có đổi ko => nếu đổi thì hash lại password rồi lưu vào DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.changePasswordAt = Date.now() - 1000;
});

//hàm để check xem password nhập nào có giôngs trong database
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const user = mongoose.model("user", userSchema);
module.exports = user;
