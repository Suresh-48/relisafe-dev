import { Router } from "express";
const router = Router();

import { getAllCompany, getCompany, updateCompany, deleteCompany, createCompany } from "../controllers/companyController.js";

router.route("/").get(getAllCompany);

router.route("/").post(createCompany);

router.route("/:id").get(getCompany).patch(updateCompany).delete(deleteCompany);

export default router;
