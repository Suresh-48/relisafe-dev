import { Router } from "express";
const router = Router();

import {
  projectCreation,
  updateProject,
  getProject,
  getAllProjectList,
  deleteProject,
} from "../controllers/projectCreationController.js";

router.route("/").get(getAllProjectList);

router.route("/").post(projectCreation);

router.route("/:id").get(getProject).patch(updateProject).delete(deleteProject);

export default router;
