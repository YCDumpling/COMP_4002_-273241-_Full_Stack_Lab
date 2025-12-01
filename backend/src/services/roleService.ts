import prisma from "../../prisma/client";
import { Role } from "@prisma/client";


export async function getAllRoles() {
    const roles = await prisma.role.findMany();

    const roleDirectory: Record<string, string[]> = {};
    
    roles.forEach((role: Role) => {
        if (!roleDirectory[role.department]) {
            roleDirectory[role.department] = [];
        }
        roleDirectory[role.department].push(role.name);
    });
    
    return roleDirectory;
}

export async function getRoleDepartments() {
    const departments = await prisma.role.findMany({
        select: { department: true },
        distinct: ['department']
    });
    
    return departments.map((d: { department: string }) => d.department);
}


export async function getRolesByDepartment(department: string) {
    const roles = await prisma.role.findMany({
        where: { department }
    });
    
    return roles.map((r: Role) => r.name);
}


export async function addRole(department: string, name: string) {
    await prisma.role.create({
        data: { name, department }
    });
}
