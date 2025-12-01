import express from "express";
import { requireAuth } from "@clerk/express";
import * as roleController from "../controllers/roleController";
import { findOrCreateUser } from "../middleware/findOrCreateUser";

const router = express.Router();

router.get("/", findOrCreateUser, roleController.getAllRoles);
router.get("/departments", findOrCreateUser, roleController.getRoleDepartments);
router.get("/department/:name", findOrCreateUser, roleController.getRolesByDepartment);
router.post("/", requireAuth(), findOrCreateUser, roleController.addRole);

export default router;
