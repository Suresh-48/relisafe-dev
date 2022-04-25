import productBreakdownStructure from "../models/productBreakdownStructureModel.js";
import { getAll, deleteOne } from "./baseController.js";

export async function createProductBreakdownStructure(req, res, next) {
  try {
    const data = req.body;

    const exist = await productBreakdownStructure.find({
      productId: data.productId,
      projectId: data.projectId,
      companyId: data.companyId,
    });

    if (exist.length === 0) {
      const createProductBreakdownStructure = await productBreakdownStructure.create({
        category: data.category,
        reference: data.reference,
        partType: data.partType,
        partNumber: data.partNumber,
        quantity: data.quantity,
        environment: data.environment,
        temperature: data.temperature,
        productId: data.productId,
        projectId: data.projectId,
        companyId: data.companyId,
      });

      res.status(201).json({
        message: "Product Breakdown Structure Created Successfuly",
        data: {
          createProductBreakdownStructure,
        },
      });
    } else {
      res.status(403).json({
        message: "Product Breakdown Structure Already Exist",
        data: {
          exist,
        },
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function updateProductBreakdownStructure(req, res, next) {
  try {
    const data = req.body;

    const editData = {
      category: data.category,
      reference: data.reference,
      partType: data.partType,
      partNumber: data.partNumber,
      quantity: data.quantity,
      environment: data.environment,
      temperature: data.temperature,
    };

    const updateProductBreakdownStructure = await productBreakdownStructure.findByIdAndUpdate(
      data.productBreakdownStructureId,
      editData,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(201).json({
      message: "Product Breakdown Structure Update Successfuly",
      data: {
        updateProductBreakdownStructure,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getProductBreakdownStructure(req, res, next) {
  try {
    const data = req.query;

    const getProductBreakdownStructure = await productBreakdownStructure
      .findOne({
        projectId: data.projectId,
        _id: data.productBreakdownStructureId,
      })
      .populate("productId")
      .populate("projectId")
      .populate("companyId")
      .populate("assemblyId")
      .populate("electronicalId")
      .populate("mechanicalId");

    res.status(201).json({
      message: "Get Product Breakdown Structure Details",
      data: {
        getProductBreakdownStructure,
      },
    });
  } catch (error) {
    next(error);
  }
}
export async function getAllproductBreakdownStructure(req, res, next) {
  try {
    const getAllData = await productBreakdownStructure
      .find()
      .populate("productId")
      .populate("projectId")
      .populate("companyId")
      .populate("assemblyId")
      .populate("electronicalId")
      .populate("mechanicalId");

    res.status(201).json({
      message: "Get All Product Breakdown Structure Details",
      data: {
        getAllData,
      },
    });
  } catch (error) {
    next(error);
  }
}

export const deleteproductBreakdownStructure = deleteOne(productBreakdownStructure);
