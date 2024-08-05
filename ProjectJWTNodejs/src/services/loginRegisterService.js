import { where } from "sequelize";
import db from "../models";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import { getGroupWithRoles } from "../services/JWTService";
import { createJWT } from "../middleware/JWTActions";

const salt = bcrypt.genSaltSync(10);
require("dotenv").config();
let hashUserPassword = (password) => {
  let hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};
const checkEmail = async (userEmail) => {
  let Users = await db.Users.findOne({
    where: {
      email: userEmail,
    },
  });
  if (Users) {
    return true;
  } else {
    return false;
  }
};

const checkPhoneNumber = async (userPhoneNumber) => {
  console.log(userPhoneNumber);
  let Users = await db.Users.findOne({
    where: {
      phone: userPhoneNumber,
    },
  });
  if (Users) {
    return true;
  } else {
    return false;
  }
};
const register = async (rawUserData) => {
  try {
    //check email/phonenumber are existed
    let checkEmailExist = await checkEmail(rawUserData.email);
    if (checkEmailExist) {
      return {
        EM: "Email already exists",
        EC: "1",
        DT: "",
      };
    }
    let checkPhoneNumberExist = await checkPhoneNumber(rawUserData.phone);
    if (checkPhoneNumberExist) {
      return {
        EM: "Phone number already exists",
        EC: "1",
        DT: "",
      };
    }
    //hash password
    let hashPassword = hashUserPassword(rawUserData.password);
    //create new Users
    await db.Users.create({
      email: rawUserData.email,
      userName: rawUserData.username,
      password: hashPassword,
      phone: rawUserData.phone,
      groupId: 4,
    });
    return {
      EM: "Register success",
      EC: "0",
      DT: "",
    };
  } catch (error) {
    console.log("=>>Check register error: ", error);
    return {
      EM: "error from server",
      EC: "-1",
      DT: "",
    };
  }
};
const checkPassword = async (userPassword, hashPassword) => {
  return bcrypt.compareSync(userPassword, hashPassword); //true or false
};
const handleLogin = async (rawData) => {
  try {
    console.log(rawData);
    //check email/phonenumber is not existed
    let Users = await db.Users.findOne({
      where: {
        [Op.or]: [{ email: rawData.valueLogin }, { phone: rawData.valueLogin }],
      },
    });
    if (Users) {
      console.log("=>>Found Users");
      let ischeckPassword = await checkPassword(
        rawData.password,
        Users.password
      );
      if (ischeckPassword) {
        let groupWithRole = await getGroupWithRoles(Users);
        let payload = {
          email: Users.email,
          groupWithRole,
          userName: Users.userName,
          phone: Users.phone,
        };
        let token = createJWT(payload);
        return {
          EM: "ok!",
          EC: "0",
          DT: token,
        };
      }
    }
    return {
      EM: "Your email/phone number or password not correct",
      EC: "1",
      DT: "",
    };
  } catch (error) {
    console.log("=>>Check register error: ", error);
    return {
      EM: "error from server",
      EC: "-1",
      DT: "",
    };
  }
};
module.exports = {
  register,
  handleLogin,
};
