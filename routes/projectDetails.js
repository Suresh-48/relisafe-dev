import { Router } from "express";
const router = Router();

import {
  createProjectDetail,
  getProjectDetail,
  getAllProjectDetail,
  updateProjectDetail,
  deleteProjectDetail,
} from "../controllers/projectDetailsController.js";

router.route("/").get(getAllProjectDetail);

router.route("/").post(createProjectDetail);

router.route("/:id").get(getProjectDetail).patch(updateProjectDetail).delete(deleteProjectDetail);

export default router;
