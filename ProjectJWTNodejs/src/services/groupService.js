import { where } from "sequelize";
import db from "../models";
const Group = db.Group;
const getAllGroups = async () => {
  try {
    let group = await Group.findAll({
      order: [["name", "asc"]],
    });
    return {
      EM: "Get all groups successfully",
      EC: 0,
      DT: group,
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
module.exports = { getAllGroups };
