import { Router } from "express";
const router = Router();

import {
  createMttrPrediction,
  updateMttrPrediction,
  getMttrPrediction,
  getAllMttrPrediction,
  deleteMttrPrediction,
} from "../controllers/mttrPredictionController.js";

router.route("/").get(getAllMttrPrediction);

router.route("/").post(createMttrPrediction);

router.route("/:id").get(getMttrPrediction).patch(updateMttrPrediction).delete(deleteMttrPrediction);

export default router;
