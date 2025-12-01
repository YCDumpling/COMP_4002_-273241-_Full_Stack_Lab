import express from "express";
import { requireAuth } from "@clerk/express";
import * as employeeController from "../controllers/employeeController";
import { findOrCreateUser } from "../middleware/findOrCreateUser";

const router = express.Router();

router.get("/", findOrCreateUser, employeeController.getAllEmployees);
router.get("/departments", findOrCreateUser, employeeController.getEmployeeDepartments);
router.get("/department/:name", findOrCreateUser, employeeController.getEmployeesByDepartment);
router.post("/", requireAuth(), findOrCreateUser, employeeController.addEmployee);

export default router;
