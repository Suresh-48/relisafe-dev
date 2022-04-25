import pmMra from "../models/pmMraModel.js";

import { createOne, getAll, getOne, updateOne, deleteOne } from "./baseController.js";

export async function createPmMra(req, res, next) {
  try {
    const data = req.body;

    const exist = await pmMra.find({
      productId: data.productId,
      projectId: data.projectId,
      companyId: data.companyId,
    });
    if (exist.length === 0) {
      const createData = await pmMra.create({
        LossOfEvident: data.LossOfEvident,
        criticalityAccept: data.criticalityAccept,
        significantItem: data.significantItem,
        LubricationservceTsk: data.LubricationservceTsk,
        conditionMonitrTsk: data.conditionMonitrTsk,
        restoreDiscrdTsk: data.restoreDiscrdTsk,
        failureFindTsk: data.failureFindTsk,
        combinationOfTsk: data.combinationOfTsk,
        reDesign: data.reDesign,
        rcmNotes: data.rcmNotes,
        pmTaskId: data.pmTaskId,
        pmTaskType: data.pmTaskType,
        taskIntrvlFreq: data.taskIntrvlFreq,
        taskIntrvlUnit: data.taskIntrvlUnit,
        LatitudeFreqTolrnc: data.LatitudeFreqTolrnc,
        scheduleMaintenceTsk: data.scheduleMaintenceTsk,
        tskInteralDetermination: data.tskInteralDetermination,
        taskDesc: data.taskDesc,
        tskTimeML1: data.tskTimeML1,
        tskTimeML2: data.tskTimeML2,
        tskTimeML3: data.tskTimeML3,
        tskTimeML4: data.tskTimeML4,
        tskTimeML5: data.tskTimeML5,
        tskTimeML6: data.tskTimeML6,
        tskTimeML7: data.tskTimeML7,
        skill1: data.skill1,
        skillOneNos: data.skillOneNos,
        skillOneContribution: data.skillOneContribution,
        skill2: data.skill2,
        skillTwoNos: data.skillTwoNos,
        skillTwoContribution: data.skillTwoContribution,
        skill3: data.skill3,
        skillThreeNos: data.skillThreeNos,
        skillThreeContribution: data.skillThreeContribution,
        replacInPM: data.replacInPM,
        replaceQty: data.replaceQty,
        addiReplaceSpare1: data.addiReplaceSpare1,
        addiReplaceSpare1Qty: data.addiReplaceSpare1Qty,
        addiReplaceSpare2: data.addiReplaceSpare2,
        addiReplaceSpare2Qty: data.addiReplaceSpare2Qty,
        addiReplaceSpare3: data.addiReplaceSpare3,
        addiReplaceSpare3Qty: data.addiReplaceSpare3Qty,
        consumable1: data.consumable1,
        consumable1Qty: data.consumable1Qty,
        consumable2: data.consumable2,
        consumable2Qty: data.consumable2Qty,
        consumable3: data.consumable3,
        consumable3Qty: data.consumable3Qty,
        consumable4: data.consumable4,
        consumable4Qty: data.consumable4Qty,
        consumable5: data.consumable5,
        consumable5Qty: data.consumable5Qty,
        userField1: data.userField1,
        userField2: data.userField2,
        userField3: data.userField3,
        userField4: data.userField4,
        userField5: data.userField5,
        projectId: data.projectId,
        companyId: data.companyId,
        productId: data.productId,
      });
      res.status(201).json({
        status: "PM MRA Created Successfully",
        message: "Success",
        data: {
          createData,
        },
      });
    } else {
      res.status(403).json({
        message: "PM MRA Already Exist",
        data: {
          exist,
        },
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function updatePmMra(req, res, next) {
  try {
    const data = req.body;
    

    const editData = {
      LossOfEvident: data.LossOfEvident,
      criticalityAccept: data.criticalityAccept,
      significantItem: data.significantItem,
      LubricationservceTsk: data.LubricationservceTsk,
      conditionMonitrTsk: data.conditionMonitrTsk,
      restoreDiscrdTsk: data.restoreDiscrdTsk,
      failureFindTsk: data.failureFindTsk,
      combinationOfTsk: data.combinationOfTsk,
      reDesign: data.reDesign,
      rcmNotes: data.rcmNotes,
      pmTaskId: data.pmTaskId,
      pmTaskType: data.pmTaskType,
      taskIntrvlFreq: data.taskIntrvlFreq,
      taskIntrvlUnit: data.taskIntrvlUnit,
      LatitudeFreqTolrnc: data.LatitudeFreqTolrnc,
      scheduleMaintenceTsk: data.scheduleMaintenceTsk,
      tskInteralDetermination: data.tskInteralDetermination,
      taskDesc: data.taskDesc,
      tskTimeML1: data.tskTimeML1,
      tskTimeML2: data.tskTimeML2,
      tskTimeML3: data.tskTimeML3,
      tskTimeML4: data.tskTimeML4,
      tskTimeML5: data.tskTimeML5,
      tskTimeML6: data.tskTimeML6,
      tskTimeML7: data.tskTimeML7,
      skill1: data.skill1,
      skillOneNos: data.skillOneNos,
      skillOneContribution: data.skillOneContribution,
      skill2: data.skill2,
      skillTwoNos: data.skillTwoNos,
      skillTwoContribution: data.skillTwoContribution,
      skill3: data.skill3,
      skillThreeNos: data.skillThreeNos,
      skillThreeContribution: data.skillThreeContribution,
      replacInPM: data.replacInPM,
      replaceQty: data.replaceQty,
      addiReplaceSpare1: data.addiReplaceSpare1,
      addiReplaceSpare1Qty: data.addiReplaceSpare1Qty,
      addiReplaceSpare2: data.addiReplaceSpare2,
      addiReplaceSpare2Qty: data.addiReplaceSpare2Qty,
      addiReplaceSpare3: data.addiReplaceSpare3,
      addiReplaceSpare3Qty: data.addiReplaceSpare3Qty,
      consumable1: data.consumable1,
      consumable1Qty: data.consumable1Qty,
      consumable2: data.consumable2,
      consumable2Qty: data.consumable2Qty,
      consumable3: data.consumable3,
      consumable3Qty: data.consumable3Qty,
      consumable4: data.consumable4,
      consumable4Qty: data.consumable4Qty,
      consumable5: data.consumable5,
      consumable5Qty: data.consumable5Qty,
      userField1: data.userField1,
      userField2: data.userField2,
      userField3: data.userField3,
      userField4: data.userField4,
      userField5: data.userField5,
      projectId: data.projectId,
      companyId: data.companyId,
      productId: data.productId,
    };

    const editDetail = await pmMra.findByIdAndUpdate(data.pmMraId, editData, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      message: "Pm MRA Updated Successfully",
      editDetail,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllPmMra(req, res, next) {
  try {
    const pmMraData = await pmMra.find().populate("projectId").populate("companyId").populate("productId");

    res.status(201).json({
      message: "Get All Pm_MRA Details Successfully ",
      data: pmMraData,
    });
  } catch (error) {
    next(error);
  }
}

export async function getPmMra(req, res, next) {
  try {
    const id = req.params.id;

    const pmMradata = await pmMra.findOne({ _id: id }).populate("projectId").populate("companyId").populate("productId");

    res.status(200).json({
      message: "Get Pm_MRA Details Successfully",
      data: pmMradata,
    });
  } catch (error) {
    next(error);
  }
}

export const deletePmMra = deleteOne(pmMra);
