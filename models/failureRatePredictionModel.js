import mongoose from "mongoose";
const { Schema, model } = mongoose;

const failureRatePredictionSchema = new Schema({
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
  predicted: {
    type: Number,
  },
  field: {
    type: Number,
  },
  dutyCycle: {
    type: Number,
  },
  otherFr: {
    type: Number,
  },
  frDistribution: {
    type: String,
  },
  allocated: {
    type: Number,
  },
  frRemarks: {
    type: String,
  },
  failureRateOffset: {
    type: Number,
  },
  frOffsetOperand: {
    type: String,
  },
  standard: {
    type: String,
  },
  assemblyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assembly",
  },
  electronicalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Electronical",
  },
  mechanicalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mechanical",
  },
});

failureRatePredictionSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

failureRatePredictionSchema.set("autoIndex", true);

const failureRatePrediction = model("FailureRatePrediction", failureRatePredictionSchema);

export default failureRatePrediction;
