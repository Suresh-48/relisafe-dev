import mongoose from "mongoose";
const { Schema, model } = mongoose;

const FMECASchema = new Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  operatingPhase: {
    type: String,
  },
  function: {
    type: String,
  },
  failureMode: {
    type: String,
  },
  searchFM: {
    enum: ["FMD97", "NPRD"],
    type: String,
  },
  failureModeRatioAlpha: {
    type: String,
  },
  cause: {
    type: String,
  },
  detectableMeansDuringOperation: {
    type: String,
  },
  detectableMeansToMaintainer: {
    type: String,
  },
  BuiltInTest: {
    type: String,
  },
  subSystemEffect: {
    type: String,
  },
  systemEffect: {
    type: String,
  },
  endEffect: {
    type: String,
  },
  endEffectRatioBeta: {
    type: String,
  },
  safetyImpact: {
    type: String,
  },
  referenceHazardId: {
    type: String,
  },
  realibilityImpact: {
    type: String,
  },
  serviceDisruptionTime: {
    type: String,
  },

  frequency: {
    type: String,
  },
  severity: {
    type: String,
  },
  riskIndex: {
    type: String,
  },
  designControl: {
    type: String,
  },
  maintenanceControl: {
    type: String,
  },
  exportConstraints: {
    type: String,
  },
  immediteActionDuringNonOperationalPhase: {
    type: String,
  },
  immediteActionDuringOperationalPhase: {
    type: String,
  },
  userField1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userField2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userField3: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userField4: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userField5: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userField6: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userField7: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userField8: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userField9: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userField10: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

FMECASchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

FMECASchema.set("autoIndex", true);

const FMECA = model("FMECA", FMECASchema);

export default FMECA;
