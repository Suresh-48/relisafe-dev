import { Router } from "express";
import { createFMECA, getFMECA, getAllFMECA, updateFMECA, deleteFMECA } from "../controllers/FMECAController.js";

const router = Router();

router.route("/").get(getAllFMECA).post(createFMECA);

router.route("/:id").get(getFMECA).delete(deleteFMECA);

router.route("/update").patch(updateFMECA);

export default router;
