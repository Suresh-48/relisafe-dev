import mongoose from "mongoose";
const { Schema, model } = mongoose;

const assemblySchema = new Schema({
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

assemblySchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

assemblySchema.set("autoIndex", true);

const assembly = model("Assembly", assemblySchema);

export default assembly;
