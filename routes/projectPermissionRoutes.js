import { Router } from "express";
const router = Router();

import {
  createProjectPermission,
  updateProjectPermission,
  getProjectPermission,
  getAllProjectPermission,
  deleteProjectPermission,
  getUserMenuList,
} from "../controllers/projectPermissionController.js";

router.route("/").get(getAllProjectPermission);

router.route("/").post(createProjectPermission);

router
  .route("/:id")
  .get(getProjectPermission)
  .patch(updateProjectPermission)
  .delete(deleteProjectPermission);

router.route("/menu/list").get(getUserMenuList);

export default router;
