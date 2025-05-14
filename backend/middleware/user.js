const JWT_SECRET = require("../config");
const { User, Account } = require("../db");
const { createUser, checkUser } = require("../type");
const jwt = require("jsonwebtoken");

async function signupMiddleWare(req, res, next) {
  const createPayload = req.body;
  const parsePayload = createUser.safeParse(createPayload);
  if (parsePayload.success) {
    const isExist = await User.findOne({
      username: req.body.username,
    });
    if (!isExist) {
      next();
    } else {
      res.status(403).json({
        msg: "Username already exist!",
      });
    }
  } else {
    res.status(403).json({
      msg: "Wrong Input!",
    });
  }
}

async function signinMiddleWare(req, res, next) {
  const createPayload = req.body;
  const parsePayload = checkUser.safeParse(createPayload);
  if (parsePayload.success) {
    const isExist = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    if (isExist) {
      req.customUser = isExist;
      next();
    } else {
      res.status(403).json({
        msg: "Account doesn't exist!",
      });
    }
  } else {
    res.status(403).json({
      msg: "Wrong Input!",
    });
  }
}

function authMiddleWare(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer")) {
    return res.json({
      msg: "Wrong auth! Please login again.",
    });
  }
  const token = auth.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {

    if (!err) {
      req.userId = decoded.id;
      next();
    } else {
      return res.json({
        msg: "Wrong auth! Please login again.",
      });
    }
  });
}

module.exports = {
  signupMiddleWare,
  signinMiddleWare,
  authMiddleWare,
};
