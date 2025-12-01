import express from "express";
import * as roleController from "../controllers/roleController";

const router = express.Router();


router.get("/", roleController.getAllRoles);
router.get("/departments", roleController.getRoleDepartments);
router.get("/department/:name", roleController.getRolesByDepartment);
router.post("/", roleController.addRole);

export default router;
