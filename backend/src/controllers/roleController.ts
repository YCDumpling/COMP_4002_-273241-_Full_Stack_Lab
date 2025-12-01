import { Request, Response } from "express";
import * as roleService from "../services/roleService";


export async function getAllRoles(req: Request, res: Response) {
    try {
        const roles = await roleService.getAllRoles();
        res.json(roles);
    } catch (error) {
        console.error("Error fetching roles:", error);
        res.status(500).json({ error: "Failed to fetch roles" });
    }
}

export async function getRoleDepartments(req: Request, res: Response) {
    try {
        const departments = await roleService.getRoleDepartments();
        res.json(departments);
    } catch (error) {
        console.error("Error fetching departments:", error);
        res.status(500).json({ error: "Failed to fetch departments" });
    }
}


export async function getRolesByDepartment(req: Request, res: Response) {
    try {
        const { name } = req.params;
        const roles = await roleService.getRolesByDepartment(name);
        res.json(roles);
    } catch (error) {
        console.error("Error fetching roles by department:", error);
        res.status(500).json({ error: "Failed to fetch roles by department" });
    }
}


export async function addRole(req: Request, res: Response) {
    try {
        const { department, name } = req.body;
        await roleService.addRole(department, name);
        const roles = await roleService.getAllRoles();
        res.status(201).json(roles);
    } catch (error) {
        console.error("Error adding role:", error);
        res.status(500).json({ error: "Failed to add role" });
    }
}
