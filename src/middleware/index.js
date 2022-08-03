const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../user/model");

exports.hashPass = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error });
  }
}; //hashes the password, using 8 salt or "fuel"

exports.comparePasswords = async (req, res, next) => {
  try {
    //   const user = await User.findOne({ email: req.body.email });
    //   const comparisonBool = await bcrypt.compare(req.body.password, user.password);
    //   if (comparisonBool) {
    //     req.user = user;
    //     next();
    //   } else {
    //     throw new Error();
    //   } old code, now condensed below
    console.log("This is compare passwords");
    req.user = await User.findOne({ username: req.body.username });
    if (
      req.user &&
      (await bcrypt.compare(req.body.password, req.user.password))
    ) {
      next();
    } else {
      throw new Error({ msg: "Incorrect credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error });
  }
}; //compare password works

exports.tokenAuth = async (req, res, next) => {
  try {
    console.log("This is tokenCheck");
    const token = req.header("Authorization");
    const decodedToken = await jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decodedToken._id);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error });
  }
}; //login get, using authorization in header.