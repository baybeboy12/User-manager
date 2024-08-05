import { where } from "sequelize";
import db from "../models";
const getGroupWithRoles = async (user) => {
  try {
    const roles = await db.Group.findOne({
      where: { id: user.groupId },
      attributes: ["id", "name", "description"],
      include: {
        model: db.Role,
        attributes: ["id", "url", "description"],
        through: {
          attributes: [],
        },
      },
    });

    return roles || [{}]; // Trả về [{}] nếu không tìm thấy roles
  } catch (error) {
    console.error("Error fetching group with roles:", error);
    return [{}]; // Trả về [{}] trong trường hợp có lỗi
  }
};

module.exports = { getGroupWithRoles };
