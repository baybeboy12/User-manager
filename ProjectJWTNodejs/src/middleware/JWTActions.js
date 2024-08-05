import jwt from "jsonwebtoken";
require("dotenv").config();

const nonSecureRoutes = ["/login", "/register"];

const createJWT = (payload) => {
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key);
  } catch (error) {
    console.log(error);
  }
  return token;
};
const verifyJWT = (token) => {
  let key = process.env.JWT_SECRET;
  let decoded = null;
  try {
    decoded = jwt.verify(token, key);
  } catch (error) {
    console.log(error);
  }
  return decoded;
};
const checkUserJWT = (req, res, next) => {
  if (nonSecureRoutes.includes(req.path)) {
    return next();
  }
  let cookies = req.cookies;
  if (cookies && cookies.jwt) {
    let token = cookies.jwt;
    let decoded = verifyJWT(token);
    if (decoded) {
      req.token = token;
      req.user = decoded;
      next();
    } else {
      return res
        .status(401)
        .json({ EM: "Please login again!", EC: "-1", DT: "" });
    }
  } else {
    return;
    res.status(401).json({ EM: "Please login again!", EC: "-1", DT: "" });
  }
};
const chekcUserPermission = (req, res, next) => {
  if (nonSecureRoutes.includes(req.path) || req.path === "/usertoken") {
    return next();
  }
  if (req.user) {
    let email = req.user.email;
    let roles = req.user.groupWithRole.Roles;
    let currentURL = req.path;
    if (!roles || roles.length === 0) {
      return res
        .status(403)
        .json({ EM: "You don't have permission!", EC: "-1", DT: "" });
    }
    let canAccess = roles.some((item) => item.url === currentURL);
    if (canAccess === true) {
      next();
    } else {
      return res
        .status(403)
        .json({ EM: "You don't have permission!", EC: "-1", DT: "" });
    }
  } else {
    return res
      .status(401)
      .json({ EM: "Not authorized the user", EC: "-1", DT: "" });
  }
};
module.exports = { createJWT, verifyJWT, checkUserJWT, chekcUserPermission };
