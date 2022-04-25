import productTreeStructure from "../models/productTreeStructure.js";
import { deleteOne, getAll } from "./baseController.js";

export async function getProductTreeStructure(req, res, next) {
  try {
    const data = req.query;

    const projectData = await productTreeStructure
      .findOne({ projectId: data.projectId })
      .populate("projectId")
      .populate("companyId");

    res.status(201).json({
      message: "Get Project Tree Structure",
      data: projectData,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllProductTreeStructure(req, res, next) {
  try {
    const projectData = await productTreeStructure.find().populate("projectId").populate("companyId");

    res.status(201).json({
      message: "Get All Project Tree Structure",
      data: projectData,
    });
  } catch (error) {
    next(error);
  }
}

export const deleteproductTreeStructure = deleteOne(productTreeStructure);
