import FailureRatePrediction from "../models/failureRatePredictionModel.js";
import { getAll, getOne, deleteOne, createOne, updateOne } from "./baseController.js";

export async function createFailureRatePrediction(req, res, next) {
  try {
    const data = req.body;

    const existData = {
      productId: data.productId,
      projectId: data.projectId,
      companyId: data.companyId,
    };
    data.assemblyId
      ? (existData.assemblyId = data?.assemblyId)
      : data.electronicalId
      ? (existData.electronicalId = data?.electronicalId)
      : (existData.mechanicalId = data?.mechanicalId);

    const exist = await FailureRatePrediction.find(existData);

    if (exist.length === 0) {
      let createData = {
        predicted: data.predicted,
        field: data.field,
        dutyCycle: data.dutyCycle,
        otherFr: data.otherFr,
        frDistribution: data.frDistribution,
        allocated: data.allocated,
        frRemarks: data.frRemarks,
        failureRateOffset: data.failureRateOffset,
        frOffsetOperand: data.frOffsetOperand,
        standard: data.standard,
        productId: data.productId,
        projectId: data.projectId,
        companyId: data.companyId,
      };
      data.assemblyId
        ? (createData.assemblyId = data?.assemblyId)
        : data.electronicalId
        ? (createData.electronicalId = data?.electronicalId)
        : (createData.mechanicalId = data?.mechanicalId);
      const createFailureRatePrediction = await FailureRatePrediction.create(createData);

      res.status(201).json({
        message: "Failure Rate Prediction Created Successfuly",
        data: {
          createFailureRatePrediction,
        },
      });
    } else {
      res.status(403).json({
        message: "Failure Rate Prediction Already Exist",
        data: {
          exist,
        },
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function updateFailureRatePrediction(req, res, next) {
  try {
    const data = req.body;

    const updateFailureRatePrediction = await FailureRatePrediction.findByIdAndUpdate(data.failureRatePredictionId, {
      predicted: data.predicted,
      field: data.field,
      dutyCycle: data.dutyCycle,
      otherFr: data.otherFr,
      frDistribution: data.frDistribution,
      allocated: data.allocated,
      frRemarks: data.frRemarks,
      failureRateOffset: data.failureRateOffset,
      frOffsetOperand: data.frOffsetOperand,
      standard: data.standard,
    });

    res.status(201).json({
      message: "Failure Rate Prediction Update Successfuly",
      data: {
        updateFailureRatePrediction,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getFailureRatePrediction(req, res, next) {
  try {
    const id = req.params.id;
    const frpData = await FailureRatePrediction.findOne({ _id: id })
      .populate("productId")
      .populate("projectId")
      .populate("companyId")
      .populate("assemblyId")
      .populate("electronicalId")
      .populate("mechanicalId");

    res.status(200).json({
      status: "success",
      message: "Get Failure Rate Prediction Successfully",
      data: frpData,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllFailureRatePrediction(req, res, next) {
  try {
    const frpData = await FailureRatePrediction.find({})
      .populate("productId")
      .populate("projectId")
      .populate("companyId")
      .populate("assemblyId")
      .populate("electronicalId")
      .populate("mechanicalId");

    res.status(200).json({
      status: "success",
      message: "Get All Failure Rate Prediction Successfully",
      data: frpData,
    });
  } catch (error) {
    next(error);
  }
}

export const deleteFailureRatePrediction = deleteOne(FailureRatePrediction);
