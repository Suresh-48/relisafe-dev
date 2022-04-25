import mongoose from "mongoose";
const { Schema, model } = mongoose;

const projectCreationSchema = new Schema({
  projectName: {
    type: String,
  },
  projectDesc: {
    type: String,
  },
  projectNumber: {
    type: String,
  },
  projectOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
});

projectCreationSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

projectCreationSchema.set("autoIndex", true);

const project = model("Project", projectCreationSchema);

export default project;
