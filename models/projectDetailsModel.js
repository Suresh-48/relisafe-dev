import mongoose from "mongoose";
const { Schema, model } = mongoose;

const projectDetailSchema = new Schema({
  operationalPhase: {
    type: String,
  },
  productLifeYears: {
    type: String,
  },
  productLifekm: {
    type: String,
  },
  productLifeMiles: {
    type: String,
  },
  productLifeOperationCycle: {
    type: String,
  },

  daysOperationPerYear: {
    type: String,
  },

  avgOperationalHrsPerDay: {
    type: String,
  },
  avgPowerHrsPerDay: {
    type: String,
  },
  avgCyclePerOperationalHrs: {
    type: String,
  },
  avgCyclePerPowerOnHrs: {
    type: String,
  },
  avgAnnualOperationalHrs: {
    type: String,
  },
  avgAnnualPowerOnHrs: {
    type: String,
  },
  avgAnnualMileageKm: {
    type: String,
  },

  avgAnnualMileageInMiles: {
    type: String,
  },
  avgAnnualOperationCycles: {
    type: String,
  },
  avgAnnualPowerOnCycles: {
    type: String,
  },
  avgSpeedKm: {
    type: String,
  },
  avgSpeedMiles: {
    type: String,
  },
  frTarget: {
    type: String,
  },
  frUnit: {
    enum: ["FRUnit1", "FRUnit2", "FRUnit3"],
    type: String,
  },
  currency: {
    enum: ["Dollar", "Rupees", "Euro"],
    type: String,
  },
  priceValidity: {
    type: String,
  },
  deliveryTerms: {
    enum: ["Terms1", "Terms2", "Terms3"],
    type: String,
  },
  deliveryLocation: {
    type: String,
  },
  environment: {
    enum: ["environment1", "environment2", "environment3"],
    type: String,
  },
  temperature: {
    type: String,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
});

projectDetailSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

projectDetailSchema.set("autoIndex", true);

const projectDetail = model("projectDetail", projectDetailSchema);

export default projectDetail;
