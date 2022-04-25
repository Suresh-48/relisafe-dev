import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [false, "please fill your email"],
  },
  password: {
    type: String,
    required: [false, "Please fill your password"],
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  name: {
    type: String,
    required: [false, "Please fill your user name"],
  },
  lastLogin: {
    type: Date,
  },
  lastLogout: {
    type: Date,
  },
  sessionId: {
    type: String,
  },
  role: {
    type: String,
    enum: ["SuperAdmin", "Admin", "User"],
  },
  phone:{
    type:String,
  }
});

userSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

userSchema.set("autoIndex", true);

const user = model("User", userSchema);

export default user;
