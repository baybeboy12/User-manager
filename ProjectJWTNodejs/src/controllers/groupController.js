import groupService from "../services/groupService";

const readFunc = async (req, res) => {
  try {
    let data = await groupService.getAllGroups();
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
module.exports = { readFunc };
