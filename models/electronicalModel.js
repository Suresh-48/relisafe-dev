import mongoose from "mongoose";
const { Schema, model } = mongoose;

const electronicalSchema = new Schema({
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
  parentId: {
    type: String,
  },
});

electronicalSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

electronicalSchema.set("autoIndex", true);

const electronical = model("Electronical", electronicalSchema);

export default electronical;
