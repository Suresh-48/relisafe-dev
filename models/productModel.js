import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  productName: {
    type: String,
  },
  parentId:{
    type:String
  }
});

productSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

productSchema.set("autoIndex", true);

const product = model("Product", productSchema);

export default product;
