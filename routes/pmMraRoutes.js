import { Router } from "express";
const router = Router();

import { createPmMra, getAllPmMra, getPmMra, updatePmMra, deletePmMra } from "../controllers/pmMraController.js";

router.route("/").get(getAllPmMra);

router.route("/").post(createPmMra);

router.route("/update").patch(updatePmMra);

router.route("/:id").get(getPmMra).delete(deletePmMra);

export default router;
