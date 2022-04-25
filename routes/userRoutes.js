import { Router } from "express";
const router = Router();

import { createUser, getAllUser, getUser, updateUser, deleteUser, login, getCompanyUsers } from "../controllers/userController.js";

router.route("/").post(createUser).get(getAllUser);

router.route("/list").get(getCompanyUsers)
router.route("/login").post(login);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
