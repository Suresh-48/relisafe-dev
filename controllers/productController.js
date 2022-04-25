import assembly from "../models/assemblyModel.js";
import electronical from "../models/electronicalModel.js";
import mechanical from "../models/mechanicalModel.js";
import product from "../models/productModel.js";
import productTreeStructure from "../models/productTreeStructure.js";
import { getAll, deleteOne, getOne, updateOne } from "./baseController.js";

export async function createProduct(req, res, next) {
  try {
    const data = req.body;

    let existTree = await productTreeStructure.find({
      projectId: data.projectId,
      companyId: data.companyId,
    });

    const treeStructure = existTree[0]?.treeStructure;

    if (data.parentId === undefined || data.parentId === null) {
      const productData = data.parentId
        ? {
            projectId: data.projectId,
            companyId: data.companyId,
            parentId: data.parentId,
            productName: data.productName,
          }
        : {
            projectId: data.projectId,
            companyId: data.companyId,
            productName: data.productName,
          };

      const createData = await product.create(productData);

      const productSubData = {
        projectId: data.projectId,
        companyId: data.companyId,
        productId: createData.id,
        parentId: createData._id,
      };

      const createAssembly = await assembly.create(productSubData);
      const createElectronic = await electronical.create(productSubData);
      const createMechanical = await mechanical.create(productSubData);

      if (existTree.length === 0) {
        const createNode = [
          {
            id: createData._id,
            indexCount: "1",
            type: "Product",
            name: data.productName,
            children: [
              {
                id: createAssembly._id,
                productId: createData._id,
                name: "Assembly 1",
                type: "Assembly",
                indexCount: "1",
                children: [],
              },
              {
                id: createElectronic._id,
                productId: createData._id,
                name: "Electronics 1",
                type: "Electronics",
                indexCount: "1",
                children: [],
              },
              {
                id: createMechanical._id,
                productId: createData._id,
                name: "Mechanical 1",
                type: "Mechanical",
                indexCount: "1",
                children: [],
              },
            ],
          },
        ];
        await productTreeStructure.create({
          projectId: data.projectId,
          companyId: data.companyId,
          productId: createData._id,
          treeStructure: createNode,
        });
        res.status(201).json({
          message: "Product Name Created Successfuly",
        });
      } else {
        const treeIndex = treeStructure.length;
        const addNode = [
          ...treeStructure,
          {
            id: createData._id,
            indexCount: `${treeIndex + 1}`,
            type: "Product",
            name: data.productName,
            children: [
              {
                id: createAssembly._id,
                productId: createData._id,
                name: `Assembly ${treeIndex + 1}`,
                type: `Assembly`,
                indexCount: `${treeIndex + 1}`,
                children: [],
              },
              {
                id: createElectronic._id,
                productId: createData._id,
                name: `Electronics ${treeIndex + 1}`,
                type: `Electronics`,
                indexCount: `${treeIndex + 1}`,
                children: [],
              },
              {
                id: createMechanical._id,
                productId: createData._id,
                name: `Mechanical ${treeIndex + 1}`,
                type: `Mechanical`,
                indexCount: `${treeIndex + 1}`,
                children: [],
              },
            ],
          },
        ];
        await productTreeStructure.findByIdAndUpdate(existTree[0].id, {
          treeStructure: addNode,
        });
        res.status(201).json({
          message: "Product Name Created Successfuly",
        });
      }
    } else {
      for (let i = 0; i < treeStructure.length; i++) {
        insertNodeIntoTree(treeStructure[i], data.parentId, existTree[0].id, data.productName);
      }
      async function insertNodeIntoTree(node, nodeId, id, productName) {
        if (node.id == nodeId) {
          if (node.type !== "Assembly") {
            res.status(400).json({
              message: `Sub-Product Not Allowed In ${node.type}`,
            });
          } else {
            const productSubData = {
              projectId: data.projectId,
              companyId: data.companyId,
              productId: node.productId,
              parentId: data.parentId,
              name: data.productName,
            };
            const createData =
              node.type === "Assembly"
                ? await assembly.create(productSubData)
                : node.type === "Electronics"
                ? await electronical.create(productSubData)
                : await mechanical.create(productSubData);

            const addNode = {
              id: createData._id,
              productId: node.productId,
              name: productName,
              type: node.type,
              indexCount: `${node.indexCount}.${node.children.length + 1}`,
              children: [],
            };

            await node.children.push(addNode);
            await productTreeStructure.findByIdAndUpdate(id, {
              treeStructure: treeStructure,
            });
            res.status(201).json({
              message: "Product Name Created Successfuly",
            });
          }
        } else if (node.children != null) {
          for (let i = 0; i < node.children.length; i++) {
            insertNodeIntoTree(node.children[i], nodeId, id, productName);
          }
        }
      }
    }
  } catch (error) {
    next(error);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const data = req.body;

    const treeStructureId = data.productTreeStructureId;

    const existTree = await productTreeStructure.findOne({
      _id: treeStructureId,
    });

    const treeStructure = existTree?.treeStructure;

    const filterNode = treeStructure.findIndex((list) => list.id == data.productId);

    if (filterNode > -1) {
      treeStructure[filterNode].name = data.productName;
      if (treeStructure[filterNode].type === "Product") {
        await product.findByIdAndUpdate(data.productId, {
          productName: data.productName,
        });
      }
      await productTreeStructure.findByIdAndUpdate(existTree.id, {
        treeStructure: treeStructure,
      });
      res.status(201).json({
        message: "Product Name Updated Successfuly",
        deleteProduct,
      });
    } else {
      for (let i = 0; i < treeStructure.length; i++) {
        findNodeFromTree(treeStructure[i], data.productId, existTree.id, data.productName);
      }
    }

    async function findNodeFromTree(node, nodeId, id, productName) {
      if (node.id == nodeId) {
        node.name = productName;

        node.type === "Assembly"
          ? await assembly.findByIdAndUpdate(nodeId, { name: productName })
          : node.type === "Electronics"
          ? await electronical.findByIdAndUpdate(nodeId, {
              name: productName,
            })
          : await mechanical.findByIdAndUpdate(nodeId, { name: productName });

        await productTreeStructure.findByIdAndUpdate(id, {
          treeStructure: treeStructure,
        });
        res.status(201).json({
          message: "Product Name Updated Successfuly",
          deleteProduct,
        });
      } else if (node.children != null) {
        for (let i = 0; i < node.children.length; i++) {
          findNodeFromTree(node.children[i], nodeId, id, productName);
        }
      }
    }
  } catch (error) {
    next(error);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const data = req.query;

    const treeStructureId = data.productTreeStructureId;

    const existTree = await productTreeStructure.findOne({
      _id: treeStructureId,
    });

    const treeStructure = existTree?.treeStructure;
    const filterNode = treeStructure.findIndex((list) => list.id == data.deleteNodeId);

    if (filterNode > -1) {
      treeStructure[filterNode].children.forEach(async (node) => {
        await deleteNodeFromTree(node);
      });
      treeStructure.splice(filterNode, 1);

      await product.findByIdAndDelete({ _id: data.deleteNodeId });
      await productTreeStructure.findByIdAndUpdate(existTree.id, {
        treeStructure: treeStructure,
      });
    } else {
      const getDetail =
        (await data.type) === "Assembly"
          ? await assembly.findOne({ _id: data.deleteNodeId })
          : data.type === "Electronics"
          ? await electronical.findOne({ _id: data.deleteNodeId })
          : await mechanical.findOne({ _id: data.deleteNodeId });
      for (let i = 0; i < treeStructure.length; i++) {
        findNodeFromTree(treeStructure[i], data.deleteNodeId, getDetail.parentId, existTree.id);
      }
    }

    async function findNodeFromTree(node, nodeId, parentId, id) {
      if (node.id == parentId) {
        const index = node.children.findIndex((value) => value.id == nodeId);
        if (node.type === "Product") {
          {
            node.children[index].children.forEach(async (node) => {
              await deleteNodeFromTree(node);
            });
          }
        } else {
          await deleteNodeFromTree(node.children[index]);
        }
        {
          node.type !== "Product" ? node.children.splice(index, 1) : (node.children[index].children = []);
          node.type !== "Product" &&
            node.children.forEach((data, i) => {
              data.indexCount = `${node.indexCount}.${i + 1}`;
            });
        }
        await productTreeStructure.findByIdAndUpdate(id, {
          treeStructure: treeStructure,
        });
      } else if (node.children != null) {
        for (let i = 0; i < node.children.length; i++) {
          findNodeFromTree(node.children[i], nodeId, parentId, id);
        }
      }
    }
    async function deleteNodeFromTree(node) {
      (await node.type) === "Assembly"
        ? await assembly.findByIdAndDelete({ _id: node.id })
        : node.type === "Electronics"
        ? await electronical.findByIdAndDelete({ _id: node.id })
        : await mechanical.findByIdAndDelete({ _id: node.id });

      if (node.children !== 0) {
        for (let i = 0; i < node.children.length; i++) {
          deleteNodeFromTree(node.children[i]);
        }
      }
    }
    res.status(201).json({
      message: "Node Deleted Successfuly",
      deleteProduct,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllProduct(req, res, next) {
  try {
    const getAllProductDetails = await product.find().populate("companyId").populate("projectId");

    res.status(201).json({
      message: "Get All Product Details Successfully ",
      data: {
        getAllProductDetails,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getProduct(req, res, next) {
  try {
    const productId = req.params.id;

    const getProductDetails = await product.findOne({ _id: productId }).populate("companyId").populate("projectId");

    res.status(201).json({
      message: "Get Product Details Successfully",
      data: {
        getProductDetails,
      },
    });
  } catch (error) {
    next(error);
  }
}
