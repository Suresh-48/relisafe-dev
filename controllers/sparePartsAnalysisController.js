import sparePartsAnalysisList from "../models/sparePartsAnalysisModel.js";
import { deleteOne } from "./baseController.js";

export async function createSparePartsAnalysis(req, res, next) {
  try {
    const data = req.body;

    const exist = await sparePartsAnalysisList.find({
      productId: data.productId,
      projectId: data.projectId,
      companyId: data.companyId,
    });
    if (exist.length === 0) {
      const createData = await sparePartsAnalysisList.create({
        spare: data.spare,
        recommendedSpare: data.recommendedSpare,
        warrantySpare: data.warrantySpare,
        deliveryTimeDays: data.deliveryTimeDays,
        afterSerialProductionPrice1: data.afterSerialProductionPrice1,
        price1MOQ: data.price1MOQ,
        afterSerialProductionPrice2: data.afterSerialProductionPrice2,
        price2MOQ: data.price2MOQ,
        afterSerialProductionPrice3: data.afterSerialProductionPrice3,
        price3MOQ: data.price3MOQ,
        annualPriceEscalationPercentage: data.annualPriceEscalationPercentage,
        lccPriceValidity: data.lccPriceValidity,
        projectId: data.projectId,
        companyId: data.companyId,
        productId: data.productId,
      });
      res.status(201).json({
        status: "Spare Parts Analysis Created Successfully",
        message: "Success",
        data: {
          createData,
        },
      });
    } else {
      res.status(403).json({
        message: "Spare Parts Analysis Already Exist",
        data: {
          exist,
        },
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function updateSparePartsAnalysis(req, res, next) {
  try {
    const data = req.body;

    const editData = {
      spare: data.spare,
      recommendedSpare: data.recommendedSpare,
      warrantySpare: data.warrantySpare,
      deliveryTimeDays: data.deliveryTimeDays,
      afterSerialProductionPrice1: data.afterSerialProductionPrice1,
      price1MOQ: data.price1MOQ,
      afterSerialProductionPrice2: data.afterSerialProductionPrice2,
      price2MOQ: data.price2MOQ,
      afterSerialProductionPrice3: data.afterSerialProductionPrice3,
      price3MOQ: data.price3MOQ,
      annualPriceEscalationPercentage: data.annualPriceEscalationPercentage,
      lccPriceValidity: data.lccPriceValidity,
      projectId: data.projectId,
      companyId: data.companyId,
      productId: data.productId,
    };

    const editDetail = await sparePartsAnalysisList.findByIdAndUpdate(data.spareId, editData, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      message: "Spare Parts Analysis Updated Successfully",
      editDetail,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllSparePartsAnalysis(req, res, next) {
  try {
    const sparePartsData = await sparePartsAnalysisList
      .find()
      .populate("projectId")
      .populate("companyId")
      .populate("productId");

    res.status(201).json({
      message: "Gel All Spare Parts Analysis Details",
      data: sparePartsData,
    });
  } catch (error) {
    next(error);
  }
}

export async function getSparePartsAnalysis(req, res, next) {
  try {
    const id = req.params.id;

    const sparePartsData = await sparePartsAnalysisList
      .findOne({ _id: id })
      .populate("projectId")
      .populate("companyId")
      .populate("productId");

    res.status(200).json({
      message: "Gel Spare Parts Analysis Details",
      data: sparePartsData,
    });
  } catch (error) {
    next(error);
  }
}

export const deleteSparePartsAnalysis = deleteOne(sparePartsAnalysisList);
