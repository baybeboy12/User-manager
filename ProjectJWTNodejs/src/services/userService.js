import { where } from "sequelize";
import db from "../models";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
const salt = bcrypt.genSaltSync(10);
let hashUserPassword = (password) => {
  let hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};

const getAllUsers = async () => {
  try {
    let users = await db.Users.findAll({
      attributes: ["id", "email", "userName", "phone"],
      includes: { model: db.Group, attributes: ["name", "description"] },
      nest: true,
    });
    if (users) {
      return {
        EM: "Get all users successfully",
        EC: 0,
        DT: users,
      };
    } else {
      return {
        EM: "Get all users successfully",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong",
      EC: 1,
      DT: [],
    };
  }
};
const getUserWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.Users.findAndCountAll({
      limit: limit,
      offset: offset,
      attributes: ["id", "email", "userName", "phone", "sex", "address"],
      include: { model: db.Group, attributes: ["id", "name", "description"] },
    });
    let data = {
      totalRows: count,
      totalPages: Math.ceil(count / limit),
      users: rows,
    };
    return {
      EM: "fetch ok",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong",
      EC: 1,
      DT: [],
    };
  }
};
const createNewUser = async (data) => {
  console.log(data);
  try {
    let hashPasswordFromBcrypt = await hashUserPassword(data.password);
    await db.Users.create({
      email: data.email,
      password: hashPasswordFromBcrypt,
      userName: data.username,
      phone: data.phone,
      groupId: data.group,
      address: data.address,
      sex: data.sex,
    });
    return {
      EM: "create ok",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong",
      EC: 1,
      DT: [],
    };
  }
};
const updateUser = async (data) => {
  try {
    const user = await db.Users.update(
      {
        userName: data.userName,
        groupId: data.group,
        address: data.address,
        sex: data.sex,
      },
      { where: { id: data.id } }
    );
    return {
      EM: "update ok",
      EC: 0,
      DT: user,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong",
      EC: 1,
      DT: [],
    };
  }
};
const deleteUser = async (id) => {
  try {
    let Users = await db.Users.findOne({
      where: {
        id: id,
      },
    });
    if (!Users) {
      return {
        EM: "Users not found",
        EC: 1,
        DT: [],
      };
    }
    await Users.destroy();
    return {
      EM: "delete ok",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong",
      EC: 1,
      DT: [],
    };
  }
};
module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  getUserWithPagination,
};
