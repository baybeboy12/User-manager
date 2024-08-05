import db from "../models/index";
import crudService from "../services/crudService";
import loginRegisterService from "../services/loginRegisterService";
import userController from "../controllers/userController";
import checkUserJWT from "../middleware/JWTActions";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", { data: json.stringify(data) });
  } catch (error) {
    console.log(error);
  }
};
let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};
let postCRUD = async (req, res) => {
  let message = await crudService.createNewUser(req.body);
  res.send(message);
};
const handleRegister = async (req, res) => {
  try {
    let data = await loginRegisterService.register(req.body);
    return res.status(200).json({ EM: data.EM, EC: data.EC, DT: "" });
  } catch (error) {
    return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });
  }
};

const handleLogin = async (req, res) => {
  console.log(req.body);
  let data = await loginRegisterService.handleLogin(req.body);
  //set cookies
  if (data && data.DT && data.DT.access_token) {
    res.cookie("jwt", data.DT.access_token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
  }

  return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
};

const handleGetDataFromToken = (req, res) => {
  console.log("check");
  return res.send("check");
  // if (req.user) {
  //   let user = req.user;
  //   return res.status(200).json({ EC: 0, DT: { user, token: req.token } });
  // } else {
  //   return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });
  // }
};

module.exports = {
  handleRegister,
  handleLogin,
  handleGetDataFromToken,
};
