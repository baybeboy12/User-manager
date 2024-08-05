import express from "express";
import apiController from "../controllers/apiController";
import userController from "../controllers/userController";
import groupController from "../controllers/groupController";
import { checkUserJWT } from "../middleware/JWTActions";
import { chekcUserPermission } from "../middleware/JWTActions";
let router = express.Router();

let initApiRoutes = (app) => {
  router.all(
    "*",
    checkUserJWT
    // chekcUserPermission
  );

  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);
  router.get("/usertoken", apiController.handleGetDataFromToken);

  router.get(
    "/user/read",

    userController.readFunc
  );
  router.post("/user/create", userController.createFunc);
  router.put("/user/update", userController.updateFunc);
  router.delete("/user/delete", userController.deleteFunc);

  router.get("/group/read", groupController.readFunc);
  return app.use("/", router);
};

module.exports = initApiRoutes;
