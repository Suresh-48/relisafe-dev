import Project from "../models/projectCreationModel.js";
import projectPermission from "../models/projectPermissionModel.js";
import { deleteOne } from "./baseController.js";

export async function projectCreation(req, res, next) {
  try {
    const data = req.body;

    const exist = await Project.find({ projectNumber: data.projectNumber });

    if (exist.length == 0) {
      const createData = await Project.create({
        projectName: data.projectName,
        projectDesc: data.projectDesc,
        projectNumber: data.projectNumber,
        projectOwner: data.projectOwner,
        companyId: data.companyId,
      });

      const permissionData = {
        modules: [
          { name: "PBS", type: "Write" },
          { name: "Failure Rate Prediction", type: "Write" },
          { name: "MTTR Prediction", type: "Write" },
          { name: "FMECA", type: "Write" },
          { name: "RBD", type: "Write" },
          { name: "FTA", type: "Write" },
          { name: "PM MRA", type: "Write" },
          { name: "Spare Part Analysis", type: "Write" },
        ],
        accessType: "Write",
        authorizedPersonnel: data.projectOwner,
        createdBy: data.projectOwner,
        projectId: createData._id,
        companyId: data.companyId,
      };
      const createUserPermission = await projectPermission.create(permissionData);

      res.status(201).json({
        status: "Created",
        message: "Project Created Successfully",
        data: {
          createData,
          createUserPermission,
        },
      });
    } else {
      res.status(208).json({
        status: "Already Exist",
        message: "Project Already Exist",
        data: {
          exist,
        },
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function updateProject(req, res, next) {
  try {
    const data = req.body;

    const projectId = req.params.id;

    const exist = await Project.find({
      _id: { $nin: [projectId] },
      projectNumber: data.projectNumber,
    });

    if (exist.length == 0) {
      const editedData = {
        projectName: data.projectName,
        projectDesc: data.projectDesc,
        projectNumber: data.projectNumber,
        projectOwner: data.projectOwner,
        companyId: data.companyId,
      };

      const editDetail = await Project.findByIdAndUpdate(projectId, editedData, {
        new: true,
        runValidators: true,
      });

      res.status(201).json({
        status: "Created",
        message: " Updated Project Successfully",
        editDetail,
      });
    } else {
      res.status(208).json({
        status: "Already Exist",
        message: "Project Number Already Exist",
        data: {
          exist,
        },
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function getAllProjectList(req, res, next) {
  try {
    const projectData = await Project.find().populate("projectOwner").populate("companyId");
    res.status(200).json({
      status: "success",
      message: "Get All Project List Successfully",
      data: projectData,
    });
  } catch (error) {
    next(error);
  }
}

export async function getProject(req, res, next) {
  try {
    const id = req.params.id;

    const projectData = await Project.findOne({ _id: id }).populate("projectOwner").populate("companyId");
    res.status(200).json({
      status: "success",
      message: "Get Project List Successfully",
      data: projectData,
    });
  } catch (error) {
    next(error);
  }
}

export const deleteProject = deleteOne(Project);
