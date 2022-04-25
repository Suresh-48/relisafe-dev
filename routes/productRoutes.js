import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateProduct,
} from "../controllers/productController.js";
const router = Router();

router.route("/").get(getAllProduct).post(createProduct);
router.route("/update").patch(updateProduct)
router.route("/delete").delete(deleteProduct)

router.route("/:id")
  .get(getProduct);

export default router;
