import userService from "../services/userService";

const readFunc = async (req, res) => {
  try {
    console.log(req.user);
    if (req.query.page && req.query.limit) {
      let page = parseInt(req.query.page);
      let limit = parseInt(req.query.limit);
      let data = await userService.getUserWithPagination(page, limit);
      return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
    } else {
      let data = await userService.getAllUsers();
      return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
    }
  } catch (error) {
    console.log(error);
  }
};
const createFunc = async (req, res) => {
  try {
    let data = await userService.createNewUser(req.body);
    return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong",
      EC: 1,
      DT: [],
    };
  }
};
const updateFunc = async (req, res) => {
  try {
    console.log(req.body);
    let data = await userService.updateUser(req.body);
    return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong",
      EC: 1,
      DT: [],
    };
  }
};
const deleteFunc = async (req, res) => {
  let id = req.body.id;
  if (!id) {
    return res
      .status(200)
      .json({ EM: "Missing required parameter", EC: "1", DT: "" });
  }
  let data = await userService.deleteUser(id);
  return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
};

module.exports = {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
};
