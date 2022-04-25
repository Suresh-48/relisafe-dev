import mongoose from "mongoose";
const { Schema, model } = mongoose;

const mechanicalSchema = new Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "projectCreation",
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  parentId: {
    type: String,
  },
});

mechanicalSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

mechanicalSchema.set("autoIndex", true);

const mechanical = model("Mechanical", mechanicalSchema);

export default mechanical;
