import mongoose from "mongoose";
const { Schema, model } = mongoose;

const companySchema = new Schema({
  name:{
      type:String,
      required:[false, "Please fill your company name"]
  },
  userCount:{
      type:Number,
      default:0
  }
});

companySchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

companySchema.set("autoIndex", true);

const company = model("Company", companySchema);

export default company;
