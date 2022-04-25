import { Router } from "express";
const router = Router();

import {
  createProductBreakdownStructure,
  deleteproductBreakdownStructure,
  getAllproductBreakdownStructure,
  getProductBreakdownStructure,
  updateProductBreakdownStructure,
} from "../controllers/productBreakdownStructureController.js";

router.route("/").get(getAllproductBreakdownStructure).post(createProductBreakdownStructure);

router.route("/update/detail").patch(updateProductBreakdownStructure);

router.route("/get/detail").get(getProductBreakdownStructure);

router.route("/:id").delete(deleteproductBreakdownStructure);

export default router;
