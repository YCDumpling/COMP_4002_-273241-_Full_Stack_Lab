import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";


export async function getAllEmployees(req: Request, res: Response) {
    try {
        const employees = await employeeService.getAllEmployees();
        res.json(employees);
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ error: "Failed to fetch employees" });
    }
}

export async function getEmployeeDepartments(req: Request, res: Response) {
    try {
        const departments = await employeeService.getEmployeeDepartments();
        res.json(departments);
    } catch (error) {
        console.error("Error fetching departments:", error);
        res.status(500).json({ error: "Failed to fetch departments" });
    }
}


export async function getEmployeesByDepartment(req: Request, res: Response) {
    try {
        const { name } = req.params;
        const employees = await employeeService.getEmployeesByDepartment(name);
        res.json(employees);
    } catch (error) {
        console.error("Error fetching employees by department:", error);
        res.status(500).json({ error: "Failed to fetch employees by department" });
    }
}


export async function addEmployee(req: Request, res: Response) {
    try {
        const { department, name } = req.body;
        await employeeService.addEmployee(department, name);
        const employees = await employeeService.getAllEmployees();
        res.status(201).json(employees);
    } catch (error) {
        console.error("Error adding employee:", error);
        res.status(500).json({ error: "Failed to add employee" });
    }
}
