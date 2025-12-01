import prisma from "../../prisma/client";
import { Employee } from "@prisma/client";


export async function getAllEmployees() {
    const employees = await prisma.employee.findMany();
    
    const employeeDirectory: Record<string, string[]> = {};
    
    employees.forEach((emp: Employee) => {
        if (!employeeDirectory[emp.department]) {
            employeeDirectory[emp.department] = [];
        }
        employeeDirectory[emp.department].push(emp.name);
    });
    
    return employeeDirectory;
}


export async function getEmployeeDepartments() {
    const departments = await prisma.employee.findMany({
        select: { department: true },
        distinct: ['department']
    });
    
    return departments.map((d: { department: string }) => d.department);
}


export async function getEmployeesByDepartment(department: string) {
    const employees = await prisma.employee.findMany({
        where: { department }
    });
    
    return employees.map((e: Employee) => e.name);
}


export async function addEmployee(department: string, name: string) {
    await prisma.employee.create({
        data: { name, department }
    });
}
