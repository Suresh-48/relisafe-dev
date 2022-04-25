import { Router } from "express";
const router = Router();

import {
    createSparePartsAnalysis,
    updateSparePartsAnalysis,
    getAllSparePartsAnalysis,
    getSparePartsAnalysis,
    deleteSparePartsAnalysis,
} from "../controllers/sparePartsAnalysisController.js";

router.route("/").get(getAllSparePartsAnalysis);
router.route("/").post(createSparePartsAnalysis);
router.route("/update").patch(updateSparePartsAnalysis)

router.route("/:id")
      .get(getSparePartsAnalysis)
      .delete(deleteSparePartsAnalysis)

export default router;
