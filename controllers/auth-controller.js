const User = require("../models/user");
const jwt = require("jsonwebtoken");

const sendRes = require("../utils/send-res");

const signToken = async (req, res, id) => {
  //tạo token mới
  return jwt.sign({ id: id }, process.env.JWT_CODE, {
    //này là hạn của token
    expiresIn: process.env.JWT_EXPIRES,
  });
};
exports.isLogged = (req, res, next) => {
  const token = req.headers["authorization"] 
  if (!token) {
    return sendRes.resError(res, "Missing token in header", 401)
  }
  if (!token.startsWith("Bearer")) {
    return sendRes.resError(res, "Missing Bearer in token", 401)
  }

  try {
    const decoded = jwt.verify(token.slice(7), process.env.JWT_CODE);
    req.user = decoded["id"];
    //set req.user = id trong jwt
  } catch (err) {
    console.log(err)
    return sendRes.resError(res, "Invalid Token", 401)
  }
  next();
  //return sendRes.resSuccess(res,"Nice");
}
exports.signup = async (req, res) => {
  let errors = {};
  const user = new User(req.body);

  //check email trong database đã tồn tại chưa
  const existUser = await User.findOne({ email: req.body.email });
  if (existUser) {
    errors.email = "Email exists";
    //gửi về client báo trường email: email exists
    return sendRes.resError(res, errors, 422);
  }

  try {
    //lưu user
    await user.save();
    //tạo token và gửi thông qua cookie
    return sendRes.resSuccess(res, {
      token: await signToken(req, res, user._id),
    });
  } catch (err) {
    //check lỗi valid trong mongo
    if (err.name === "ValidationError") {
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      return sendRes.resError(res, errors, 422);
    }
    //gửi về lỗi này
    return sendRes.resError(res, "something went wrong", 500);
  }
};

exports.login = async (req, res) => {
  //tách email, password trong body
  const { email, password } = req.body;

  //check xem user nó nhập thiếu trường nào không
  let error = {};
  if (!email) error.email = "Email required";
  if (!password) error.password = "Password required";
  if (Object.keys(error).length) {
    return sendRes.resError(res, error, 422);
  }

  //tim user với cái email trong db
  const user = await User.findOne({ email: email });
  //check thử có user với email đó không hoặc kiểm tra password có đúng không
  if (!user || !(await user.correctPassword(password, user.password))) {
    return sendRes.resError(res, "Unauthorized", 401);
  } else {
    return sendRes.resSuccess(res, {
      token: await signToken(req, res, user._id),
    });
  }
};

exports.logout = async (req, res) => {
  return sendRes.resSuccess(res, "logout");
};
