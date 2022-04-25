import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productTreeStructureSchema = new Schema({
  treeStructure:{
    type:Object
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
});

productTreeStructureSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

productTreeStructureSchema.set("autoIndex", true);

const productTreeStructure = model(
  "ProductTreeStructure",
  productTreeStructureSchema
);

export default productTreeStructure;
