import projectDetail from "../models/projectDetailsModel.js";
import { deleteOne } from "./baseController.js";

export async function createProjectDetail(req, res, next) {
  try {
    const data = req.body;

    const exist = await projectDetail.find({ projectId: data.projectId, companyId: data.companyId });

    if (exist.length == 0) {
      const createData = await projectDetail.create({
        operationalPhase: data.operationalPhase,
        productLifeYears: data.productLifeYears,
        productLifekm: data.productLifekm,
        productLifeMiles: data.productLifeMiles,
        productLifeOperationCycle: data.productLifeOperationCycle,
        daysOperationPerYear: data.daysOperationPerYear,
        avgOperationalHrsPerDay: data.avgOperationalHrsPerDay,
        avgPowerHrsPerDay: data.avgPowerHrsPerDay,
        avgCyclePerOperationalHrs: data.avgCyclePerOperationalHrs,
        avgCyclePerPowerOnHrs: data.avgCyclePerPowerOnHrs,
        avgAnnualOperationalHrs: data.avgAnnualOperationalHrs,
        avgAnnualPowerOnHrs: data.avgAnnualPowerOnHrs,
        avgAnnualMileageKm: data.avgAnnualMileageKm,
        avgAnnualMileageInMiles: data.avgAnnualMileageInMiles,
        avgAnnualOperationCycles: data.avgAnnualOperationCycles,
        avgAnnualPowerOnCycles: data.avgAnnualPowerOnCycles,
        avgSpeedKm: data.avgSpeedKm,
        avgSpeedMiles: data.avgSpeedMiles,
        frTarget: data.frTarget,
        frUnit: data.frUnit,
        currency: data.currency,
        priceValidity: data.priceValidity,
        deliveryTerms: data.deliveryTerms,
        deliveryLocation: data.deliveryLocation,
        environment: data.environment,
        temperature: data.temperature,
        companyId: data.companyId,
        projectId: data.projectId,
      });

      res.status(201).json({
        message: "Project Details Created Successfully",
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

export async function updateProjectDetail(req, res, next) {
  try {
    const data = req.body;

    const editedData = {
      operationalPhase: data.operationalPhase,
      productLifeYears: data.productLifeYears,
      productLifekm: data.productLifekm,
      productLifeMiles: data.productLifeMiles,
      productLifeOperationCycle: data.productLifeOperationCycle,
      daysOperationPerYear: data.daysOperationPerYear,
      avgOperationalHrsPerDay: data.avgOperationalHrsPerDay,
      avgPowerHrsPerDay: data.avgPowerHrsPerDay,
      avgCyclePerOperationalHrs: data.avgCyclePerOperationalHrs,
      avgCyclePerPowerOnHrs: data.avgCyclePerPowerOnHrs,
      avgAnnualOperationalHrs: data.avgAnnualOperationalHrs,
      avgAnnualPowerOnHrs: data.avgAnnualPowerOnHrs,
      avgAnnualMileageKm: data.avgAnnualMileageKm,
      avgAnnualMileageInMiles: data.avgAnnualMileageInMiles,
      avgAnnualOperationCycles: data.avgAnnualOperationCycles,
      avgAnnualPowerOnCycles: data.avgAnnualPowerOnCycles,
      avgSpeedKm: data.avgSpeedKm,
      avgSpeedMiles: data.avgSpeedMiles,
      frTarget: data.frTarget,
      frUnit: data.frUnit,
      currency: data.currency,
      priceValidity: data.priceValidity,
      deliveryTerms: data.deliveryTerms,
      deliveryLocation: data.deliveryLocation,
      environment: data.environment,
      temperature: data.temperature,
      companyId: data.companyId,
      projectId: data.projectId,
    };

    const editDetail = await projectDetail.findByIdAndUpdate(data.projectDetailId, editedData, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      message: " Updated Project Details Successfully",
      editDetail,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllProjectDetail(req, res, next) {
  try {
    const projectData = await projectDetail.find().populate("companyId").populate("projectId");
    res.status(200).json({
      message: "Get Project Details Successfully",
      data: projectData,
    });
  } catch (error) {
    next(error);
  }
}

export async function getProjectDetail(req, res, next) {
  try {
    const id = req.params.id;

    const projectData = await projectDetail.findOne({ projectId: id }).populate("companyId").populate("projectId");

    res.status(200).json({
      message: "Get All Project Details Successfully",
      data: projectData,
    });
  } catch (error) {
    next(error);
  }
}

export const deleteProjectDetail = deleteOne(projectDetail);
