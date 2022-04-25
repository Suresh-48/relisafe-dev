import mongoose from "mongoose";
const { Schema, model } = mongoose;

const mttrPredictionSchema = new Schema({
  repairable: {
    enum: ["Yes", "No"],
    type: String,
  },
  levelOfReplace: {
    enum: ["Simple", "Medium", "Complex"],
    type: String,
  },
  levelOfRepair: {
    enum: ["Immediate", "Average", "Low"],
    type: String,
  },
  spare: {
    enum: ["Immediate", "Average", "Low"],
    type: String,
  },
  mct: {
    type: String,
  },
  mlh: {
    type: String,
  },
  totalLabourHr: {
    type: String,
  },
  mMax: {
    type: String,
  },
  mttr: {
    type: String,
  },
  remarks: {
    type: String,
  },
  taskType: {
    enum: ["Preparation", "Fault Isolation", "Disassembly", "InterChange", "Reassemble"],
    type: String,
  },
  time: {
    type: String,
  },
  noOfLabours: {
    type: String,
  },
  skills: {
    enum: ["Skill1", "Skill2", "Skill3", "Skill4", "Skill5"],
    type: String,
  },
  tools: {
    type: String,
  },
  toolsPartNo: {
    type: String,
  },
  toolType: {
    enum: ["Standard", "Special", "Others"],
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
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

mttrPredictionSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

mttrPredictionSchema.set("autoIndex", true);

const mttrPredcition = model("mttrPrediction", mttrPredictionSchema);

export default mttrPredcition;
