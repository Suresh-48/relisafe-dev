import User from "../models/userModel.js";
import Company from "../models/companyModel.js";
import {
  getAll,
  getOne,
  deleteOne,
  createOne,
  updateOne,
} from "./baseController.js";

export const getUser = getOne(User);
export const getAllUser = getAll(User);
export const updateUser = updateOne(User);
export const deleteUser = deleteOne(User);

export async function login(req, res, next) {
  try {
    const data = req.body;
    const login = { email: data.email, password: data.password };

    const passwordRegex =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const passwordValidation = passwordRegex.test(data.password);

    if (!passwordValidation) {
      res.status(400).json({
        message:
          "Password Should Contain UpperCase, LowerCase, Number and Special Character",
      });
    } else {
      const user = await User.findOne(login);

      const randomId =
        Math.random().toString(30).substring(2, 10) +
        Math.random().toString(30).substring(2, 10);
      const date = Date.now();

      if (user) {
        await User.findByIdAndUpdate(
          { _id: user._id },
          { sessionId: randomId, lastLogin: date }
        );
        res.status(200).json({
          message: "Login Created",
          user,
        });
      } else {
        res.status(400).json({
          message: "Invalid Credential",
        });
      }
    }
  } catch (err) {
    console.log("err", err);
  }
}

export async function createUser(req, res, next) {
  try {
    const data = req.body;

    const passwordRegex =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const passwordValidation = passwordRegex.test(data.password);

    const phoneNumberRegex = /^\d{10}$/;
    const validatePhone = phoneNumberRegex.test(data.phone);

    if (!passwordValidation) {
      res.status(400).json({
        message:
          "Password Should Contain UpperCase, LowerCase, Number and Special Character",
      });
    } else if (!validatePhone && data.phone.length !== 10) {
      res.status(400).json({
        message: "Mobile Number Must be 10 Digit Number ",
      });
    } else {
      const exist = await User.find({
        companyId: data.companyId,
        email: data.email,
      });
      if (exist.length === 0) {
        const user = await User.create(data);

        const userCount = await User.find({ companyId: data.companyId });

        await Company.findByIdAndUpdate(
          { _id: data.companyId },
          { userCount: userCount.length }
        );

        res.status(201).json({
          message: "CompanyUser Created SuccessFully",
          user,
        });
      } else {
        res.status(409).json({
          message: "User Already Exist",
          exist,
        });
      }
    }
  } catch (err) {
    console.log("err", err);
  }
}

export async function getCompanyUsers(req, res, next) {
  try {
    const data = req.query;

    const usersList = await User.find({ companyId: data.companyId }).populate("companyId")
    
    res.status(201).json({
      message: "List Of users In Company",
      usersList,
    });
  } catch (err) {
    console.log("err", err);
  }
}
