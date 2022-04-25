import Company from "../models/companyModel.js";
import { getAll, getOne, deleteOne, updateOne } from "./baseController.js";

export const getCompany = getOne(Company);
export const getAllCompany = getAll(Company);
export const updateCompany = updateOne(Company);
export const deleteCompany = deleteOne(Company);

export async function createCompany(req, res, next) {
  try {
    const data = req.body;
    const exist = await Company.find({ name: data.name });

    if (exist.length === 0) {
      const company = await Company.create(data);

      res.status(201).json({
        message: "Company Created SuccessFully",
        company,
      });
    } else {
      res.status(400).json({
        message: "Company Name Already Exist",
        exist
      });
    }
  } catch (err) {
    console.log("err", err);
  }
}
