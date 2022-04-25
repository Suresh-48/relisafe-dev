import { Router } from "express";
import {
  deleteproductTreeStructure,
  getAllProductTreeStructure,
  getProductTreeStructure,
} from "../controllers/productTreeStructureController.js";

const router = Router();

router.route("/").get(getAllProductTreeStructure);

router.route("/delete").delete(deleteproductTreeStructure);

router.route("/detail").get(getProductTreeStructure);

export default router;
