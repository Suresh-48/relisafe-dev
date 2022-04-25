import mttrPrediction from "../models/mttrPredictionModel.js";
import { deleteOne } from "./baseController.js";

export async function createMttrPrediction(req, res, next) {
  try {
    const data = req.body;
    const exist = await mttrPrediction.find({
      companyId: data.companyId,
      projectId: data.projectId,
      productId: data.productId,
    });

    if (exist.length == 0) {
      const createData = await mttrPrediction.create({
        repairable: data.repairable,
        levelOfReplace: data.levelOfReplace,
        levelOfRepair: data.levelOfRepair,
        spare: data.spare,
        mct: data.mct,
        mlh: data.mlh,
        totalLabourHr: data.totalLabourHr,
        mMax: data.mMax,
        mttr: data.mttr,
        remarks: data.remarks,
        taskType: data.taskType,
        time: data.time,
        noOfLabours: data.noOfLabours,
        skills: data.skills,
        tools: data.tools,
        toolsPartNo: data.toolsPartNo,
        toolType: data.toolType,
        companyId: data.companyId,
        projectId: data.projectId,
        productId: data.productId,
      });
      res.status(201).json({
        message: "Mttr Prediction Created Successfully",
        data: createData,
      });
    } else {
      res.status(208).json({
        message: "Already Exist",
        data: exist,
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function updateMttrPrediction(req, res, next) {
  try {
    const data = req.body;

    const editedData = {
      repairable: data.repairable,
      levelOfReplace: data.levelOfReplace,
      levelOfRepair: data.levelOfRepair,
      spare: data.spare,
      mct: data.mct,
      mlh: data.mlh,
      totalLabourHr: data.totalLabourHr,
      mMax: data.mMax,
      mttr: data.mttr,
      remarks: data.remarks,
      taskType: data.taskType,
      time: data.time,
      noOfLabours: data.noOfLabours,
      skills: data.skills,
      tools: data.tools,
      toolsPartNo: data.toolsPartNo,
      toolType: data.toolType,
      companyId: data.companyId,
      projectId: data.projectId,
      productId: data.productId,
    };

    const editDetail = await mttrPrediction.findByIdAndUpdate(data.mttrId, editedData, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      message: " Updated Mttr Prediction Successfully",
      editDetail,
    });
  } catch (error) {
    next(error);
  }
}

export async function getMttrPrediction(req, res, next) {
  try {
    const id = req.params.id;

    const mttrData = await mttrPrediction
      .findOne({ _id: id })
      .populate("companyId")
      .populate("projectId")
      .populate("productId");

    res.status(200).json({
      message: "Get All Mttr Prediction Details Successfully",
      data: mttrData,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllMttrPrediction(req, res, next) {
  try {
    const mttrData = await mttrPrediction.find().populate("companyId").populate("projectId").populate("productId");
    res.status(200).json({
      message: "Get Mttr Prediction Details Sucessfully",
      data: mttrData,
    });
  } catch (error) {
    next(error);
  }
}
export const deleteMttrPrediction = deleteOne(mttrPrediction);
