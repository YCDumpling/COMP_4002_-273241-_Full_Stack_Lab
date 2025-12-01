import express from "express";
import * as employeeController from "../controllers/employeeController";

const router = express.Router();


router.get("/", employeeController.getAllEmployees);
router.get("/departments", employeeController.getEmployeeDepartments);
router.get("/department/:name", employeeController.getEmployeesByDepartment);
router.post("/", employeeController.addEmployee);

export default router;
