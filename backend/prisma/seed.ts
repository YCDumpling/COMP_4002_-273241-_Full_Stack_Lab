import { PrismaClient } from "@prisma/client";
import { employeeSeedData, roleSeedData } from "./seedData";

const prisma = new PrismaClient();

// This method will add default values to the database
async function main() {
    console.log("Starting database seed...");
    
    // Clear tables
    await prisma.employee.deleteMany();
    await prisma.role.deleteMany();
    
    console.log("Cleared existing data");

    // Insert employees to db
    const createdEmployees = await prisma.employee.createMany({
        data: employeeSeedData,
        skipDuplicates: true
    });

    console.log(`Created ${createdEmployees.count} employees`);

    // Insert roles to db
    const createdRoles = await prisma.role.createMany({
        data: roleSeedData,
        skipDuplicates: true
    });

    console.log(`Created ${createdRoles.count} roles`);
    console.log("Database seed completed!");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
