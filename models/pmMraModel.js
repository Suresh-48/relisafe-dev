import mongoose from "mongoose";
const { Schema, model } = mongoose;

const pmMraSchema = new Schema({
  LossOfEvident: {
    enum: ["Yes", "No"],
    type: String,
  },
  criticalityAccept: {
    enum: ["Yes", "No"],
    type: String,
  },
  significantItem: {
    enum: ["Yes", "No"],
    type: String,
  },
  LubricationservceTsk: {
    enum: ["Yes", "No"],
    type: String,
  },
  conditionMonitrTsk: {
    enum: ["Yes", "No"],
    type: String,
  },
  restoreDiscrdTsk: {
    enum: ["Yes", "No"],
    type: String,
  },
  failureFindTsk: {
    enum: ["Yes", "No"],
    type: String,
  },
  combinationOfTsk: {
    enum: ["Yes", "No"],
    type: String,
  },
  reDesign: {
    enum: ["Yes", "No"],
    type: String,
  },
  rcmNotes: {
    type: String,
  },
  pmTaskId: {
    type: String,
  },
  pmTaskType: {
    type: String,
  },
  taskIntrvlFreq: {
    type: String,
  },
  taskIntrvlUnit: {
    enum: ["Frequency1", "Frequency2", "Frequency3"],
    type: String,
  },
  LatitudeFreqTolrnc: {
    type: String,
  },
  scheduleMaintenceTsk: {
    type: String,
  },
  tskInteralDetermination: {
    type: String,
  },
  taskDesc: {
    type: String,
  },
  tskTimeML1: {
    type: String,
  },
  tskTimeML2: {
    type: String,
  },
  tskTimeML3: {
    type: String,
  },
  tskTimeML4: {
    type: String,
  },
  tskTimeML5: {
    type: String,
  },
  tskTimeML6: {
    type: String,
  },
  tskTimeML7: {
    type: String,
  },
  skill1: {
    type: String,
  },
  skillOneNos: {
    type: String,
  },
  skillOneContribution: {
    type: String,
  },
  skill2: {
    type: String,
  },
  skillTwoNos: {
    type: String,
  },
  skillTwoContribution: {
    type: String,
  },
  skill3: {
    type: String,
  },
  skillThreeNos: {
    type: String,
  },
  skillThreeContribution: {
    type: String,
  },
  replacInPM: {
    type: String,
  },
  replaceQty: {
    type: String,
  },
  addiReplaceSpare1: {
    type: String,
  },
  addiReplaceSpare1Qty: {
    type: String,
  },
  addiReplaceSpare2: {
    type: String,
  },
  addiReplaceSpare2Qty: {
    type: String,
  },
  addiReplaceSpare3: {
    type: String,
  },
  addiReplaceSpare3Qty: {
    type: String,
  },
  consumable1: {
    type: String,
  },
  consumable1Qty: {
    type: String,
  },
  consumable2: {
    type: String,
  },
  consumable2Qty: {
    type: String,
  },
  consumable3: {
    type: String,
  },
  consumable3Qty: {
    type: String,
  },
  consumable4: {
    type: String,
  },
  consumable4Qty: {
    type: String,
  },
  consumable5: {
    type: String,
  },
  consumable5Qty: {
    type: String,
  },
  userField1: {
    type: String,
  },
  userField2: {
    type: String,
  },
  userField3: {
    type: String,
  },
  userField4: {
    type: String,
  },
  userField5: {
    type: String,
  },
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
});

pmMraSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

pmMraSchema.set("autoIndex", true);

const pmMra = model("pmMra", pmMraSchema);

export default pmMra;
