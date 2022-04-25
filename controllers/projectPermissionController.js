import projectPermission from "../models/projectPermissionModel.js";
import { deleteOne } from "./baseController.js";

export async function createProjectPermission(req, res, next) {
  try {
    const data = req.body;
    const exist = await projectPermission.find({
      projectId: data.projectId,
      authorizedPersonnel: data.authorizedPersonnel,
    });

    if (exist.length == 0) {
      const createData = await projectPermission.create({
        modules: data.modules,
        accessType: data.accessType,
        authorizedPersonnel: data.authorizedPersonnel,
        companyId: data.companyId,
        projectId: data.projectId,
        createdBy: data.createdBy,
      });

      res.status(201).json({
        message: "Project Permission Created Successfuly",
        data: {
          createData,
        },
      });
    } else {
      const existModules = exist[0].modules;
      let count = 0;
      await data.modules.forEach(async (list, i) => {
        const idx = existModules.findIndex((moduleName) => moduleName.name === list);
        if (idx > -1) {
          existModules[idx].type = data.accessType;
          count = count + 1;
        } else {
          existModules.push({ name: list, type: data.accessType });
          count = count + 1;
        }
        if (count === data.modules.length) {
          const userPermissionUpdate = await projectPermission.findByIdAndUpdate(
            { _id: exist[0]._id },
            { modules: existModules }
          );
          res.status(201).json({
            message: "User Permission Updated",
            userPermissionUpdate,
          });
        }
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function updateProjectPermission(req, res, next) {
  try {
    const data = req.body;
    const permissionId = data.projectPermissionId;
    const editedData = {
      modules: data.modules,
      accessType: data.accessType,
      authorizedPersonnel: data.authorizedPersonnel,
      companyId: data.companyId,
      projectId: data.projectId,
      modifiedBy: data.modefiedBy,
    };

    const editDetail = await projectPermission.findByIdAndUpdate(permissionId, editedData, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      message: "  Project Permission Updated Successfully",
      editDetail,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllProjectPermission(req, res, next) {
  try {
    const projectData = await projectPermission
      .find()
      .populate("authorizedPersonnel")
      .populate("createdBy")
      .populate("modefiedBy")
      .populate("projectId")
      .populate("companyId");

    res.status(201).json({
      message: "Get All Project Permission Lists Successfuly",
      data: projectData,
    });
  } catch (error) {
    next(error);
  }
}

export async function getProjectPermission(req, res, next) {
  try {
    const id = req.params.id;

    const projectData = await projectPermission
      .findOne({ projectId: id })
      .populate("authorizedPersonnel")
      .populate("createdBy")
      .populate("modefiedBy")
      .populate("projectId")
      .populate("companyId");

    res.status(200).json({
      status: "success",
      message: "Get Project Details Successfully",
      data: projectData,
    });
  } catch (error) {
    next(error);
  }
}

export const deleteProjectPermission = deleteOne(projectPermission);

export async function getUserMenuList(req, res, next) {
  try {
    const data = req.query;
    const userMenuList = await projectPermission
      .findOne({ authorizedPersonnel: data.userId, projectId: data.projectId })
      .populate("authorizedPersonnel")
      .populate("createdBy")
      .populate("modefiedBy")
      .populate("projectId")
      .populate("companyId");

    res.status(200).json({
      message: "Get User Menu List",
      data: userMenuList,
    });
  } catch (error) {
    next(error);
  }
}
