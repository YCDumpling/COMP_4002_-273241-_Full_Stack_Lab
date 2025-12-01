import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req: Request, res: Response) => {
  try {
    console.log("Starting database seed...");

    // clear old data
    await prisma.employee.deleteMany();
    await prisma.role.deleteMany();
    console.log("Cleared existing data");

    // create default employees
    const employees = [
      { name: "Alice Johnson", department: "Engineering" },
      { name: "Bob Smith", department: "Engineering" },
      { name: "Charlie Brown", department: "Marketing" },
      { name: "Diana Prince", department: "Marketing" },
      { name: "Eve Adams", department: "Sales" },
      { name: "Frank Wright", department: "Sales" },
      { name: "Grace Lee", department: "HR" },
      { name: "Henry Ford", department: "Finance" },
      { name: "Ivy Chen", department: "Finance" },
      { name: "Jack Ryan", department: "Operations" },
    ];

    const createdEmployees = await prisma.employee.createMany({
      data: employees,
    });
    console.log(`Created ${createdEmployees.count} employees`);

    // create default roles
    const roles = [
      { name: "Software Engineer", department: "Engineering" },
      { name: "Senior Engineer", department: "Engineering" },
      { name: "Marketing Manager", department: "Marketing" },
      { name: "Content Creator", department: "Marketing" },
      { name: "Sales Representative", department: "Sales" },
      { name: "Account Manager", department: "Sales" },
      { name: "HR Manager", department: "HR" },
      { name: "Financial Analyst", department: "Finance" },
      { name: "Accountant", department: "Finance" },
      { name: "Operations Manager", department: "Operations" },
    ];

    const createdRoles = await prisma.role.createMany({
      data: roles,
    });
    console.log(`Created ${createdRoles.count} roles`);

    res.json({
      success: true,
      message: "Database seeded successfully",
      employees: createdEmployees.count,
      roles: createdRoles.count,
    });
  } catch (error) {
    console.error("Seed error:", error);
    res.status(500).json({ success: false, error: String(error) });
  }
});

export default router;
