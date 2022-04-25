import { Router } from "express";
const router = Router();

import {
  createFailureRatePrediction,
  getAllFailureRatePrediction,
  getFailureRatePrediction,
  updateFailureRatePrediction,
  deleteFailureRatePrediction,
} from "../controllers/failureRatePredictionController.js";

router.route("/").get(getAllFailureRatePrediction);

router.route("/").post(createFailureRatePrediction);

router.route("/update") .patch(updateFailureRatePrediction)

router
  .route("/:id")
  .get(getFailureRatePrediction)
  .delete(deleteFailureRatePrediction);

export default router;
