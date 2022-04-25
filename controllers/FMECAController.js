import FMECA from "../models/FMECAModel.js";
import { deleteOne } from "./baseController.js";

export async function createFMECA(req, res, next) {
  try {
    const data = req.body;

    const exist = await FMECA.find({
      productId: data.productId,
      projectId: data.projectId,
      companyId: data.companyId,
    });
    if (exist.length === 0) {
      const createData = await FMECA.create({
        projectId: data.projectId,
        companyId: data.companyId,
        productId: data.productId,
        operatingPhase: data.operatingPhase,
        function: data.function,
        failureMode: data.failureMode,
        searchFM: data.searchFM,
        cause: data.cause,
        failureModeRatioAlpha: data.failureModeRatioAlpha,
        detectableMeansDuringOperation: data.detectableMeansDuringOperation,
        detectableMeansToMaintainer: data.detectableMeansToMaintainer,
        BuiltInTest: data.BuiltInTest,
        subSystemEffect: data.subSystemEffect,
        systemEffect: data.systemEffect,
        endEffect: data.endEffect,
        endEffectRatioBeta: data.endEffectRatioBeta,
        safetyImpact: data.safetyImpact,
        referenceHazardId: data.referenceHazardId,
        realibilityImpact: data.realibilityImpact,
        serviceDisruptionTime: data.serviceDisruptionTime,
        frequency: data.frequency,
        severity: data.severity,
        riskIndex: data.riskIndex,
        designControl: data.designControl,
        maintenanceControl: data.maintenanceControl,
        exportConstraints: data.exportConstraints,
        immediteActionDuringOperationalPhase: data.immediteActionDuringOperationalPhase,
        immediteActionDuringNonOperationalPhase: data.immediteActionDuringNonOperationalPhase,
        userField1: data.userField1,
        userField2: data.userField2,
        userField3: data.userField3,
        userField4: data.userField4,
        userField5: data.userField5,
        userField6: data.userField6,
        userField7: data.userField7,
        userField8: data.userField8,
        userField9: data.userField9,
        userField110: data.userField10,
      });
      res.status(201).json({
        message: "FMECA Created Successfully",
        data: {
          createData,
        },
      });
    } else {
      res.status(403).json({
        message: "FMECA Already Exist",
        data: {
          exist,
        },
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function updateFMECA(req, res, next) {
  try {
    const data = req.body;

    const editData = {
      projectId: data.projectId,
      companyId: data.companyId,
      productId: data.productId,
      operatingPhase: data.operatingPhase,
      function: data.function,
      failureMode: data.failureMode,
      searchFM: data.searchFM,
      failureModeRatioAlpha: data.failureModeRatioAlpha,
      cause: data.cause,
      failureModeRatioAlpha: data.failureModeRatioAlpha,
      detectableMeansDuringOperation: data.detectableMeansDuringOperation,
      detectableMeansToMaintainer: data.detectableMeansToMaintainer,
      BuiltInTest: data.BuiltInTest,
      subSystemEffect: data.subSystemEffect,
      systemEffect: data.systemEffect,
      endEffect: data.endEffect,
      endEffectRatioBeta: data.endEffectRatioBeta,
      safetyImpact: data.safetyImpact,
      referenceHazardId: data.referenceHazardId,
      realibilityImpact: data.realibilityImpact,
      serviceDisruptionTime: data.serviceDisruptionTime,
      frequency: data.frequency,
      severity: data.severity,
      riskIndex: data.riskIndex,
      designControl: data.designControl,
      maintenanceControl: data.maintenanceControl,
      exportConstraints: data.exportConstraints,
      immediteActionDuringOperationalPhase: data.immediteActionDuringOperationalPhase,
      immediteActionDuringNonOperationalPhase: data.immediteActionDuringNonOperationalPhase,
      immediteActionDuringOperationalPhase: data.immediteActionDuringOperationalPhase,
      userField1: data.userField1,
      userField2: data.userField2,
      userField3: data.userField3,
      userField4: data.userField4,
      userField5: data.userField5,
      userField6: data.userField6,
      userField7: data.userField7,
      userField8: data.userField8,
      userField9: data.userField9,
      userField110: data.userField10,
    };

    const editDetail = await FMECA.findByIdAndUpdate(data.fmecaId, editData, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      message: "FMECA Updated Successfully",
      editDetail,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllFMECA(req, res, next) {
  try {
    const sparePartsData = await FMECA.find()
      .populate("userField1")
      .populate("userField2")
      .populate("userField3")
      .populate("userField4")
      .populate("userField5")
      .populate("userField6")
      .populate("userField7")
      .populate("userField8")
      .populate("userField9")
      .populate("userField10")
      .populate("companyId")
      .populate("productId")
      .populate("projectId");

    res.status(201).json({
      message: "Get All FMECA Details Successfully",
      data: sparePartsData,
    });
  } catch (error) {
    next(error);
  }
}

export async function getFMECA(req, res, next) {
  try {
    const id = req.params.id;

    const sparePartsData = await FMECA.findOne({ _id: id })
      .populate("userField1")
      .populate("userField2")
      .populate("userField3")
      .populate("userField4")
      .populate("userField5")
      .populate("userField6")
      .populate("userField7")
      .populate("userField8")
      .populate("userField9")
      .populate("userField10")
      .populate("companyId")
      .populate("productId")
      .populate("projectId");

    res.status(200).json({
      message: "Get FMECA Details Successfully",
      data: sparePartsData,
    });
  } catch (error) {
    next(error);
  }
}

export const deleteFMECA = deleteOne(FMECA);
